# Basis Queries

Om MongoDB te gebruiken in TypeScript, moeten we de MongoDB driver installeren. Dit is een package die ons toelaat te connecteren op een MongoDB server en database calls uit te voeren.

```bash
npm install mongodb
```

Deze package is volledig in TypeScript geschreven en is dus makkelijk te gebruiken in TypeScript. Je hoeft dus geen extra types te installeren.

## connect

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
