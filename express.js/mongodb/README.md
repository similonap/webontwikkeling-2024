# MongoDB

## MongoDB vs Relational DB

MongoDB is een NoSQL database.

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

* een record in RDB komt overeen met een MongoDB's document (JSON object)
* een tabel in RDB komt overeen met MongoDB's collection
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
    firstname: 'Sven',
    lastname: 'Charleer',
    email: 'sven.charleer@ap.be'
  },
  {
    firstname: 'Andie',
    lastname: 'Similon',
    email: 'andie.similon@ap.be'
  },

]
```

## MongoDB gebruiken in TypeScript

```typescript
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority
const client = new MongoClient(uri);
let doSomeDBCalls = async () => {
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

Eerst en vooral moet je zorgen dat de module mongodb geinstalleerd is (lijn 1). Je hebt ook jouw connectie string nodig om te connecteren op de server. [Zie labo 10 voor het aanmaken van een externe database.](https://app.gitbook.com/@apwt/s/g-pro-webontwikkeling-1/\~/drafts/-Mb5bfZm7dZCJFC0zlCq/labos/week-11) Daarna maak je het client object aan dat ons toelaat te connecteren op de database en database calls uit te voeren.

{% hint style="danger" %}
Let op: alle functies op client sturen een promise terug. Het duurt namelijk eventjes vooraleer de database resultaten terugstuurt, dus roep deze functies altijd op binnen een async methode zodat je await kan gebruiken!
{% endhint %}

{% hint style="danger" %}
Wanneer iets misloopt, zullen de client functies een exception gooien. Zorg dat je deze opvangt. Je kan ook finally gebruiken om de client mooi af te sluiten zodat de connectie naar de database na een crash niet onnodig blijft openstaan.
{% endhint %}

## Admin functies

### Oplijsten van databases

Het is mogelijk aan de hand van de `admin()` functie op de client een lijst van databases op te vragen:

```typescript
const databasesList = await client.db().admin().listDatabases();

console.log("Databases:");
for (let database of databasesList.databases) {
  console.log(` - ${database.name}`);
}
```

## CRUD

CRUD staat voor create, read, update, delete. Met deze operaties kunnen we objecten toevoegen, aanpassen, ophalen en verwijderen.

Om een bepaalde collectie in een bepaalde database op te roepen, gebruiken we volgende syntax:

`client.db(<naam van database>).collection(<naam van collectie>).<functie>`

**Create**

Voor het toevoegen van 1 element gebruiken we de functie insertOne. Door een object mee te geven als parameter wordt dit object toegevoegd aan de database:

```typescript
import { MongoClient, ObjectId } from "mongodb";

interface Pokemon {
    _id?: ObjectId,
    name: string,
    age: number
}
let pikachu: Pokemon = {name:'pikachu', age:12};
const result = await client.db('Les').collection('pokemon').insertOne(pikachu);
console.log(`New listing created with the following id: ${result.insertedId}`);
```

{% hint style="info" %}
Let op: elk object krijgt automatisch een \_id wanneer die wordt toegevoegd aan de database. MongoDB kiest hier zelf een uniek id. Om later deze property te kunnen aanspreken, hebben we dit veld voorzien in de interface van Pokemon. We maken die echter optioneel zodat we die zelf geen waarde geven.
{% endhint %}

Wanneer we verschillende elementen willen toevoegen, gebruiken we insertMany. Deze functie verwacht een array van objecten:

```typescript
 import { MongoClient, ObjectId } from "mongodb";

 interface Pokemon {
    _id?: ObjectId,
    name: string,
    age: number
}
 const pokemon: Pokemon[] = [
            {name: 'pichu', age:7},
            {name: 'flareon',age:3}
        ];
let result = await client.db('Les').collection('pokemon').insertMany(pokemon);
console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
console.log(result.insertedIds);
```

MongoDB laat toe verschillende types in 1 collectie toe te voegen:

```typescript
const pokemon: any[] = [
            {name: 'pichu', age:7},
            {trainer: 'ash'}
        ];
let result = await client.db('Les').collection('pokemon').insertMany(pokemon);
console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
console.log(result.insertedIds);
```

Alhoewel dit mogelijk is, is dit niet altijd een goed idee.

**Read**

Net zoals we een select kunnen doen op een relationele database, gebruiken we find and findOne om onze objecten terug op te roepen.

findOne geeft ons 1 element terug, nl. het eerste element dat matcht met de query:

```typescript
let result: Pokemon = await client.db('Les').collection('pokemon').findOne<Pokemon>({});
console.log(result);
```

Merk op dat we als parameter {} meegeven. Dit komt overeen met een lege "where" clause in relationele database termen. Wanneer we bepaalde velden willen matchen, moeten we een object meegeven. Dit object bevat properties. Deze properties komen overeen met de namen van de properties van het object waar je naar zoekt:

```typescript
let result: Pokemon = await client.db('Les').collection('pokemon').findOne<Pokemon>({name:'eevee'});
console.log(result);
```

Pokemon objecten hebben de property name. Hierboven zoeken we dus alle Pokemon met "name" gelijk aan "eevee".

{% hint style="info" %}
Je kan ook reguliere expressies gebruiken indien je de relationele query `WHERE ... LIKE %...%` wil nabootsen.
{% endhint %}

Wanneer we meerdere objecten willen ophalen, gebruiken we find:

```typescript
let cursor =  client.db('Les').collection('pokemon').find<Pokemon>({});
let result = await cursor.toArray();
console.log(result);
```

{% hint style="info" %}
Let op: find geeft niet direct een resultaat terug, maar een cursor. Je kan dit cursor object gebruiken om de resultaten op te halen, door bv. toArray() te gebruiken (deze geeft een promise terug!).
{% endhint %}

**Limit/Sort**

Net zoals in relationele databases kunnen we ook gebruik maken van de sort en limit functies:

```typescript
let cursor =  client.db('Les').collection('pokemon').find<Pokemon>({}).sort({age:-1}).limit(3);
```

In dit voorbeeld sorteren we op age (een negatief of positief getal bepaalt de richting van de sort op dit veld) en tonen we enkel de eerste 3 resultaten adhv limit(3).

**Operators**

We kunnen properties vergelijken aan de hand van exacte waarden, reguliere expressies, maar ook operators. Stel we willen alle pokemon met een leeftijd groter dan 3:

```typescript
cursor =  client.db('Les').collection('pokemon').find<Pokemon>({age:{$gt:3}});
```

Het object dat find meekrijgt bevat de property waarop we willen testen: age. Ipv een exact getal geven we dit nu de waarde van een object: {$gt:3}.

Dit object bepaalt dat age groter ($gt) moet zijn dan 3.

```typescript
cursor =  client.db('Les').collection('pokemon').find<Pokemon>({age:{$gt:3,$lt:7}});
```

Hierboven zeggen we dat age nu ook nog kleiner moet zijn dan 7:

$gt:3 komt overeen met groter dan 3\
$lt:7 komt overeen met kleiner dan 7

Door deze 2 properties in 1 object te plaatsen en mee te geven aan age, moeten de 2 waarden voldaan zijn.

Voor meer operators kan je kijken op [https://docs.mongodb.com/manual/reference/operator/query/](https://docs.mongodb.com/manual/reference/operator/query/)

Wat als je wilt dat maar 1 van de 2 waarden moeten voldoen? Dan gebruik je logische operators:

```typescript
cursor =  client.db('Les').collection('pokemon').find<Pokemon>({$or:[{age:{$gt:3}},{age:{$lt:7}}]});
```

De $or operator verwacht een array als waarde. Je schrijft dus {$or:\[ ... ]} als find parameter. De $or operator zegt dat 1 van de condities in deze array moeten voldoen. In het voorbeeld hierboven hebben we 2 condities geplaatst. age > 3 OF age < 7.

Voor meer operators, kijk op [https://docs.mongodb.com/manual/reference/operator/query-logical/](https://docs.mongodb.com/manual/reference/operator/query-logical/)

**Update**

Het aanpassen van objecten doen we met updateOne en updateMany. Deze functies verwachten 2 parameters. De eerste parameter is identiek aan find: de query waar de objecten moeten aan voldoen. Geef je niets mee, dan wordt de update uitgevoerd op alle objecten in de collectie.

De tweede parameter bepaalt wat moet aangepast worden in de objecten die matchen met de query. Dit doen we via de $set operator.

```typescript
client.db('Les').collection('pokemon').updateOne({}, {$set:{age:2}}
```

In het voorbeeld hierboven worden alle leeftijden van alle objecten op 2 gezet.

```typescript
client.db('Les').collection('pokemon').updateOne({name:'eevee'}, {$set:{age:2}}
```

Door een waarde aan de eerste parameter mee te geven, kunnen we bepalen welke objecten aangepast moeten worden. Hier passen we enkel "eevee" aan.

Update kan ook gebruikt worden om duplicaten te vermijden wanneer we inserts doen. Stel we willen charmander updaten met een leeftijd van 2. Maar we weten niet of charmander al bestaat! We kunnen een find doen, indien die bestaat een update, indien die niet bestaat een insert doen. Dat is heel wat werk en kan makkelijker:

```typescript
client.db('Les').collection('pokemon').updateOne(
    {name:'charmander'}, 
    {$set:{name:'charmander',age:2}}, 
    {upsert:true})
```

Door gebruik te maken van upsert vragen we MongoDB om een update te doen indien het object bestaat, maar een insert te doen indien die niet bestaat.

UpdateMany laat ons dan toe de aanpassingen op verschillende objecten te doen. Let op, geef je als eerste parameter {} mee, dan verander je alle objecten!

```typescript
client.db('Les').collection('pokemon').updateMany({age:2}, {$set:{age:1}})
```

De code hierboven verandert alle pokemon met leeftijd 2 naar leeftijd 1.

**Delete**

Om objecten te verwijderen, gebruiken we deleteOne en deleteMany. Dit werkt zoals find maar verwijdert de matches die overeenkomen met de eerste parameter:

```typescript
client.db('Les').collection('pokemon').deleteOne({name:'pikachu'})
```

De code hierboven verwijdert 1 pikachu.

```typescript
client.db('Les').collection('pokemon').deleteMany({age:{$gt:3}})
```

De code hierboven verwijdert alle pokemon met leeftijd groter dan 3.

```typescript
await client.db('Les').collection('pokemon').deleteMany({});
```

Let op: De code hierboven verwijdert de volledige inhoud van de collectie omdat je {} meegeeft!
