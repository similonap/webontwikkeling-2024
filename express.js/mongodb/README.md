# MongoDB

Tot nu toe hebben we enkel gewerkt met in-memory data. Dit wil zeggen dat we data in een array steken en deze array in het geheugen houden. Wanneer de server stopt, is deze data weg. Dit is niet handig wanneer we data willen bijhouden die we later willen opvragen. Daarom gaan we nu werken met een database. We zouden kunnen werken met een relationele database zoals MySQL, maar we gaan werken met MongoDB omdat dit beter aansluit bij de manier waarop we data bijhouden in TypeScript (JSON).

Door een database te gebruiken, kunnen we data bijhouden die we later kunnen opvragen. We kunnen data toevoegen, aanpassen, verwijderen en opvragen. Dit noemen we CRUD operaties (Create, Read, Update, Delete). 

## MongoDB vs Relational DB

MongoDB is een NoSQL database. Hier zijn enkele verschillen tussen een relationele database en een NoSQL database:
 
Een relationele database:

* data verspreid over tabellen
* gestructureerde data
* structuur moeilijk aan te passen
* goed voor ingewikkelde queries

Een NoSQL database:

* data wordt bijgehouden als "documents" / JSON
* dynamische data
* structuur is makkelijk aanpasbaar
* goed voor simpele queries

Je kan echter de logica van relationele databases mappen op die van NoSQL:

* een record in RDB komt overeen met een MongoDB"s document (JSON object)
* een tabel in RDB komt overeen met MongoDB"s collection
* `_id` is unieke identifier (indexed) voor elk document net zoals je een ID met primary key zou toevoegen aan een relationele database tabel

Laten we een eenvoudig voorbeeld nemen van een tabel met persoonsgegevens:

| firstName | lastName | email               |
| --------- | -------- | ------------------- |
| Sven      | Charleer | sven.charleer@ap.be |
| Andie     | Similon  | andie.similon@ap.be |

In NoSQL stellen we dit als volgt voor:

```typescript
[
  {
    firstname: "Sven",
    lastname: "Charleer",
    email: "sven.charleer@ap.be"
  },
  {
    firstname: "Andie",
    lastname: "Similon",
    email: "andie.similon@ap.be"
  },

]
```

## MongoDB Atlas

Om MongoDB te gebruiken, moeten we uiteraard een MongoDB server hebben. Het is mogelijk om een MongoDB server te installeren op je eigen machine, maar dit is niet altijd handig. Daarom kan je gebruik maken van MongoDB Atlas. Dit is een cloud service die ons toelaat een MongoDB server te gebruiken zonder dat we deze zelf moeten installeren.

Om MongoDB Atlas te gebruiken, kan je een account aanmaken op [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas) en hier een database aanmaken. Je kan dan een connectie string genereren die je later kan gebruiken om te connecteren op de database.

Let zeker op dat je voor deze cursus een gratis cluster aanmaakt. Dit is voldoende voor onze doeleinden.

## Devcontainer

Als je applicatie in productie draait moet je uiteraard gebruik maken van een mongodb server die online staat (zoaals MongoDB Atlas). Maar tijdens het ontwikkelen kan je gebruik maken van een mongodb server die lokaal draait. Dit kan je doen door een mongodb server te installeren op je eigen machine of door gebruik te maken van een devcontainer die een mongodb server bevat.

Er is jammer genoeg geen standaard devcontainer die typescript en mongodb bevat. Maar dankzij de flexibiliteit van devcontainers kunnen we zelf een devcontainer maken die typescript en mongodb bevat. Dit is buiten de scope van deze cursus, dus we gaan gebruik maken van een voorgemaakte template.

Als je wil connecteren met een lokale mongodb server in een devcontainer, kan je gebruik maken van volgende connectie string: `mongodb://localhost:27017`.

## MongoDB for VS Code

Om MongoDB te gebruiken in Visual Studio Code, kan je de MongoDB for VS Code extension installeren. Deze extension laat je toe om MongoDB databases te beheren vanuit VS Code.

Om deze extension te installeren, ga je naar de extensions tab in VS Code en zoek je naar "MongoDB for VS Code". Klik op install om de extension te installeren.

![alt text](<../../.gitbook/assets/mongovscode.png>)

{% hint style="info" %}
Als je gebruik maakt van MongoDB Atlas, kan je de connectie string die je daar hebt aangemaakt, gebruiken in de MongoDB for VS Code extension. Dit laat je toe om de database te beheren vanuit VS Code. Bij een lokale MongoDB server kan je de connectie string `mongodb://localhost:27017` gebruiken.
{% endhint %}

## MongoDB driver installeren

Om MongoDB te gebruiken in TypeScript, moeten we de MongoDB driver installeren. Dit is een package die ons toelaat te connecteren op een MongoDB server en database calls uit te voeren.

```bash
npm install mongodb
```

Deze package is volledig in TypeScript geschreven en is dus makkelijk te gebruiken in TypeScript. Je hoeft dus geen extra types te installeren.

## MongoDB gebruiken in TypeScript

```typescript
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function main() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        //...
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
doSomeDBCalls();
```

Eerst importeren we MongoClient van mongodb. Vervolgens maken we een connectie string aan. Deze string bevat de username, password en url van de MongoDB server. Als je MongoDB Atlas gebruikt, kan je deze connectie string vinden in de MongoDB Atlas console. Vervolgens maken we een nieuwe MongoClient aan met deze connectie string.

Vervolgens maken we een async functie aan die de connectie maakt met de MongoDB server. De reden dat we dit in een async functie doen, is omdat de connectie even kan duren. We willen niet dat de rest van de code uitgevoerd wordt vooraleer we verbonden zijn met de database. Bijna alle functies van de MongoDB driver zijn asynchroon en geven een promise terug. Daarom gebruiken we async/await om deze promises af te handelen.

In de try block maken we de connectie met de MongoDB server. In de catch block vangen we eventuele errors op. In de finally block sluiten we de connectie met de MongoDB server. Dit is belangrijk om te doen, anders blijft de connectie openstaan en kan dit problemen veroorzaken

## insertOne en insertMany

Voor het toevoegen van 1 element gebruiken we de functie `insertOne`. Door een object mee te geven als parameter wordt dit object toegevoegd aan de database:

```typescript
import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);

interface Pokemon {
    _id?: ObjectId,
    name: string,
    age: number
}

async function main() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        let pikachu: Pokemon = { name:"pikachu", age:12 };
        const result = await client.db("Les").collection("pokemon").insertOne(pikachu);
        console.log(`New document created with the following id: ${result.insertedId}`);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
main();
```

Aan de hand van de `db` en `collection` functies kunnen we de database en collectie selecteren waar we willen toevoegen. In dit geval voegen we een Pokemon object toe aan de collectie "pokemon".

{% hint style="info" %}
Let op: elk object krijgt automatisch een \_id wanneer die wordt toegevoegd aan de database. MongoDB kiest hier zelf een uniek id. Om later deze property te kunnen aanspreken, hebben we dit veld voorzien in de interface van Pokemon. We maken die echter optioneel zodat we die zelf geen waarde geven.
{% endhint %}

Wanneer we verschillende elementen willen toevoegen, gebruiken we `insertMany`. Stel dat we een array van Pokemon objecten hebben:

```typescript
const pokemon: Pokemon[] = [
  {name: "pichu", age:7},
  {name: "flareon",age:3}
];
```

dan kunnen we deze allemaal tegelijk toevoegen:

```typescript
const result = await client.db("Les").collection("pokemon").insertMany(pokemon);
console.log(`${result.insertedCount} new documents(s) created with the following id(s):`);
console.log(result.insertedIds);
```

MongoDB laat toe verschillende types in 1 collectie toe te voegen. Stel dat we een array van objecten hebben met verschillende properties:

```typescript
const pokemon: any[] = [
    {name: "pichu", age:7},
    {trainer: "ash"}
];
```

dan kunnen we deze toevoegen in 1 collectie:

```typescript
let result = await client.db("Les").collection("pokemon").insertMany(pokemon);
console.log(`${result.insertedCount} new documents(s) created with the following id(s):`);
console.log(result.insertedIds);
```

Alhoewel dit mogelijk is, is dit niet altijd een goed idee. Het is beter om een duidelijke structuur te hebben in je collecties. Dit maakt het makkelijker om queries uit te voeren. Maar het is wel een van de voordelen van NoSQL databases.

## findOne en find

Net zoals we een select kunnen doen op een relationele database, gebruiken we find and findOne om onze objecten terug op te roepen.

findOne geeft ons 1 element terug, nl. het eerste element dat matcht met de query:

```typescript
let result: Pokemon = await client.db("Les").collection("pokemon").findOne<Pokemon>({});
console.log(result);
```

Merk op dat we als parameter {} meegeven. Dit komt overeen met een lege "where" clause in relationele database termen. Wanneer we bepaalde velden willen matchen, moeten we een object meegeven. Dit object bevat properties. Deze properties komen overeen met de namen van de properties van het object waar je naar zoekt:

```typescript
let result: Pokemon = await client.db("Les").collection("pokemon").findOne<Pokemon>({name:"eevee"});
console.log(result);
```

Pokemon objecten hebben de property name. Hierboven zoeken we dus alle Pokemon met "name" gelijk aan "eevee".

Wanneer we meerdere objecten willen ophalen, gebruiken we find:

```typescript
let cursor =  client.db("Les").collection("pokemon").find<Pokemon>({});
let result = await cursor.toArray();
console.log(result);
```

{% hint style="info" %}
Let op: find geeft niet direct een resultaat terug, maar een cursor. Je kan dit cursor object gebruiken om de resultaten op te halen, door bv. toArray() te gebruiken (deze geeft een promise terug!).
{% endhint %}

Als we dit allemaal bij elkaar zetten, krijgen we volgende code:

```typescript
import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);

interface Pokemon {
    _id?: ObjectId,
    name: string,
    age: number
}

async function main() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        let pikachu: Pokemon = { name:"pikachu", age:12 };
        const result = await client.db("Les").collection("pokemon").insertOne(pikachu);
        console.log(`New document created with the following id: ${result.insertedId}`);

        let cursor =  client.db("Les").collection("pokemon").find<Pokemon>({});
        let pokemons = await cursor.toArray();
        console.log(pokemons);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
```