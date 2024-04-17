# Gebruik in Express.js

Tot nu toe hebben we enkel de MongoDB driver gebruikt in een Node.js applicatie. In dit hoofdstuk gaan we de MongoDB driver gebruiken in een Express.js applicatie. Over het algemeen is het gebruik van de MongoDB driver in een Express.js applicatie niet veel anders dan in een Node.js applicatie. We gaan echter wel enkele best practices bespreken.

## Database module

Het is een goed idee om een aparte module (in een apart bestand) aan te maken waarin je al je database gerelateerde code plaatst. Dit zorgt ervoor dat je code beter georganiseerd is en dat je je database code makkelijker kan hergebruiken. 

We zullen afspreken dat we deze module `database.ts` noemen. In deze module plaatsen we alle code die gerelateerd is aan de database. 

```typescript
import { MongoClient } from "mongodb";

export const client = new MongoClient("mongodb://localhost:27017");

async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

export async function connect() {
    try {
        await client.connect();
        console.log("Connected to database");
        process.on("SIGINT", exit);
    } catch (error) {
        console.error(error);
    }
}
```

In dit voorbeeld maken we een connectie met de MongoDB database. We maken ook een functie `exit` die we gebruiken om de connectie met de database te sluiten. We gebruiken de `process.on` methode om een event listener toe te voegen voor het `SIGINT` event. Dit event wordt getriggerd als je `CTRL+C` drukt in de terminal. Zo zorgen we ervoor dat de connectie met de database netjes wordt afgesloten als je de applicatie stopt.

Vervolgens kunnen we deze module gebruiken in onze Express.js applicatie.

```typescript
import express from "express";

import { connect } from "./database";

const app = express();

app.listen(3000, async () => {
    await connect();
    console.log("Server is running on port 3000");
});
```

## Collections exporteren

Het is een goed idee om de collections die je gebruikt in je applicatie te exporteren vanuit je `database.ts` module. Dit zorgt ervoor dat je de collections makkelijk kan hergebruiken in andere modules. 

```typescript
export const studentsCollection: Collection<Student> = client.db("example").collection<Student>("student");
```

Je kan zo alle collections exporteren die je nodig hebt in je applicatie.

## Database vullen bij opstart

Het is een goed idee om je database te vullen bij de opstart van je applicatie. Zo kan je ervoor zorgen dat je altijd data hebt om mee te werken. Deze code plaatsen we eveneens in de `database.ts` module. We noemen deze functie `seed`. Dit is afkomstig van het Engelse woord voor zaaien en betekent dat we de database vullen met data.

```typescript
async function seed() {
    const students : Student[] = [
        { name: "Alice", age: 20 },
        { name: "Bob", age: 21 },
        { name: "Charlie", age: 22 },
        { name: "David", age: 23 },
        { name: "Eve", age: 24 },
        { name: "Frank", age: 25 },
        { name: "Grace", age: 26 },
        { name: "Heidi", age: 27 },
        { name: "Ivan", age: 28 },
        { name: "Judy", age: 29 }
    ];
    if (await studentsCollection.countDocuments() === 0) {
        await studentsCollection.insertMany(students);
    }
}
```

We kunnen deze functie aanroepen in de `connect` functie.

```typescript
export async function connect() {
    try {
        await client.connect();
        console.log("Connected to database");
        await seed();
        process.on("SIGINT", exit);
    } catch (error) {
        console.error(error);
    }
}
```

## Data ophalen in routes

Nu we de connectie met de database hebben gemaakt en de database hebben gevuld met data, kunnen we deze data ophalen in onze Express.js applicatie. Het enige wat we nu moeten importeren is de collection die we willen gebruiken.

```typescript
import { studentsCollection } from "./database";
```

en dan kunnen we deze collection gebruiken in onze Express.js routes.

```typescript
app.get("/students", async (req, res) => {
    const students = await studentsCollection.find().toArray();
    res.json(students);
});
```

We zouden eventueel ook de functies om data op te halen kunnen exporteren vanuit de `database.ts` module. Dit zorgt ervoor dat we de code beter kunnen hergebruiken en blijft de code in onze routes overzichtelijk en leesbaar. Nog een voordeel hiervan is dat we de code later makkelijker kunnen testen.

```typescript
export async function getStudents() {
    return await studentsCollection.find().toArray();
}
```

en deze functie gebruiken in onze routes.

```typescript
app.get("/students", async (req, res) => {
    const students = await getStudents();
    res.json(students);
});
```

## Alles samen

Hieronder vind je een voorbeeld van hoe je de code kan structureren in je Express.js applicatie.

Types module (`types.ts`):

```typescript
import { ObjectId } from "mongodb";

export interface Student {
    _id?: ObjectId;
    name: string;
    age: number;
}
```

Database module (`database.ts`):

```typescript
import { Collection, MongoClient } from "mongodb";
import { Student } from "./types";

export const client = new MongoClient("mongodb://localhost:27017");
export const studentsCollection: Collection<Student> = client.db("example").collection<Student>("student");

async function exit() {
    try {
        await client.close();
        console.log('Disconnected from database');
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

async function seed() {
    const students : Student[] = [
        { name: "Alice", age: 20 },
        { name: "Bob", age: 21 },
        { name: "Charlie", age: 22 },
        { name: "David", age: 23 },
        { name: "Eve", age: 24 },
        { name: "Frank", age: 25 },
        { name: "Grace", age: 26 },
        { name: "Heidi", age: 27 },
        { name: "Ivan", age: 28 },
        { name: "Judy", age: 29 }
    ];
    if (await studentsCollection.countDocuments() === 0) {
        await studentsCollection.insertMany(students);
    }
}

async function getStudents() {
    return await studentsCollection.find().toArray();
}

export async function connect() {
    try {
        await client.connect();
        await seed();
        console.log('Connected to database');
        process.on('SIGINT', exit);
    } catch (error) {
        console.error(error);
    }
}
```

Je Express.js applicatie (`index.ts`):

```typescript
import express, { Express } from "express";
import path from "path";
import { connect, studentsCollection } from "./database";

const app : Express = express();

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, "views"));

app.set("port", process.env.PORT || 3000);

app.get("/students", async (req, res) => {
    let books = await studentsCollection.find().toArray();
    res.json(books);
});

app.listen(app.get("port"), async() => {
    await connect();
    console.log("Server started on http://localhost:" + app.get('port'));
});
```