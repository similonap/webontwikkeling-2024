# Testing

Testen van applicaties gebeurt op verschillende niveaus. Hoewel niet iedereen dezelfde niveaus van elkaar onderscheidt, maakt men in het algemeen een onderscheid tussen **unit testing** en **end-to-end testing**.

Unit testing omvat het testen van individuele onderdelen van de code, zoals functies of methoden. Meestal wordt hier een white-box principe gehanteerd: de tester kent de inhoud van de unit en mag code schrijven die gebruik maakt van deze kennis. Typische frameworks voor unit testing van Express applicaties zijn Mocha en Jest.

End-to-end testing omvat het testen "zoals een gebruiker". Deze vorm volgt het black-box principe. In essentie omvat dit het automatiseren van volledige browserinteracties. Typische frameworks zijn Cypress of Selenium.

## Jest

Jest is een testframework dat origineel ontwikkeld werd door Facebook. Het is een van de meest populaire testframeworks voor JavaScript. Jest is een all-in-one oplossing die zowel de testrunner als de assertion library bevat. Jest is zeer eenvoudig in gebruik en heeft een goede documentatie.

### Installatie

Om Jest te installeren, voer je volgend commando uit:

```bash
npm i --save-dev jest ts-jest @types/jest
```

### Configuratie

Om Jest te kunnen gebruiken (met TypeScript), voer je dit commando uit:

```bash
npx ts-jest config:init
```

Om te zorgen dat je al je Jest-tests kan laten lopen met npm test, voeg je dit toe aan package.json:

```json
"scripts": {
  "test": "jest"
}
```

Het kan zijn dat je in vscode fouten krijgt bij het gebruik van jest maar de testen wel kan uitvoeren. Je kan de volgende lijn in je tsconfig.json bestand zetten om dit op te lossen:

```json
"types": ["jest", "node"]
```

### Node.js testen

#### Basis

Om een bepaalde functie te kunnen testen, moet je deze functie exporteren. Daarom is het belangrijk om zoveel mogelijk modules te gebruiken die je kan exporteren.

Stel dat je een functie hebt die een string omzet naar hoofdletters in een bestand `string-utils.ts`:

```typescript
export function toUpperFunction(input: string): string {
    let chars: string = "";
    for (let char of input) {
        const code = char.charCodeAt(0);
        if (code >= 97 && code <= 122) {  // Checking if the character is a lowercase letter
            chars += String.fromCharCode(code - 32);  // Converting to uppercase
        } else {
            chars += char;  // Adding non-lowercase characters unchanged
        }
    }
    return chars;
}
```

Om deze functie te testen, maak je een bestand `string-utils.test.ts`:

```typescript
import { toUpperFunction } from "./string-utils";

describe("toUpperFunction", () => {
    it("should convert a string to uppercase", () => {
        expect(toUpperFunction("hello")).toBe("HELLO");
    });

    it("should not convert a string that is already uppercase", () => {
        expect(toUpperFunction("HELLO")).toBe("HELLO");
    });

    it("should not convert a string that is not a letter", () => {
        expect(toUpperFunction("123")).toBe("123");
    });
});
```

`it` is een functie die een test definieert. De eerste parameter is een beschrijving van de test, de tweede parameter is een functie die de test uitvoert. Je kan ook `test` gebruiken in plaats van `it`.

We kunnen nu de tests uitvoeren met `npm test`. We krijgen dan volgende output:

```bash
PASS  ./string-utils.test.ts
  toUpperFunction
    ✓ should convert a string to uppercase (2 ms)
    ✓ should not convert a string that is already uppercase
    ✓ should not convert a string that is not a letter
```

Jammer genoeg is hier de tester hier niet in geslaagd om de bug te vinden. De functie `toUpperFunction` is namelijk niet correct. Als de input speciale tekens bevat zoals de duitse karacters met umlauten, dan zal de functie deze niet omzetten naar hoofdletters. De volgende test zou dit kunnen aantonen:

```typescript
it("should convert a string with umlauts to uppercase", () => {
    expect(toUpperFunction("äöü")).toBe("ÄÖÜ");
});
```

Deze test zal falen. De correcte implementatie van de functie zou zijn:

```typescript
export function toUpperFunction(input: string): string {
    return input.toUpperCase();
}
```

#### Exceptions

Als je een functie hebt die een exception kan gooien, kan je dit testen met `toThrow`:

```typescript
export function calculateSquareRoot(num: number): number {
    if (num < 0) {
        throw new Error("Cannot calculate the square root of a negative number.");
    }
    return Math.sqrt(num);
}
```

We kunnen deze nu testen met:

```typescript
import { calculateSquareRoot } from "./math-utils";

describe("calculateSquareRoot", () => {
    it("should calculate the square root of a positive number", () => {
        expect(calculateSquareRoot(4)).toBe(2);
    });

    it("should throw an error when calculating the square root of a negative number", () => {
        expect(() => calculateSquareRoot(-4)).toThrow("Cannot calculate the square root of a negative number.");
    });
});
```

Let op dat we hier een arrow functie gebruiken om de functie `calculateSquareRoot` op te roepen. Dit is nodig omdat we anders de exception niet zouden kunnen opvangen en de test zou falen.

#### Asynchronous code

Als je een functie hebt die asynchroon werkt, kan je dit testen met `async` en `await`:

```typescript
export async function fetchUser(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id === 1) {
                resolve("John Doe");
            } else {
                reject(new Error("User not found"));
            }
        }, 1000);
    });
}
```

We kunnen deze nu testen met:

```typescript
import { fetchUser } from "./user-service";

describe("fetchUser", () => {
    it("should fetch a user by id", async () => {
        const user = await fetchUser(1);
        expect(user).toBe("John Doe");
    });

    it("should throw an error when the user is not found", async () => {
        try {
            await fetchUser(2);
        } catch (error: any) {
            expect(error.message).toBe("User not found");
        }
    });
});
```

#### Test setup en teardown

Als je bepaalde code wil uitvoeren voor en na elke test, kan je dit doen met `beforeEach`, `afterEach`, `beforeAll` en `afterAll`. Deze kunnen zich in de `describe` blokken bevinden of globaal in het bestand.

```typescript
beforeAll(() => {
    console.log("Before all tests");
});

beforeEach(() => {
    console.log("Before each test");
});

afterEach(() => {
    console.log("After each test");
});

afterAll(() => {
    console.log("After all tests");
});
```

Dit wordt gebruikt om bijvoorbeeld een database connectie te openen en te sluiten voor en na elke test.

### Express testen

Als we een Express applicatie willen testen, kunnen we gebruik maken van de `supertest` library. Deze library maakt het mogelijk om HTTP requests te versturen naar een Express applicatie en de response te testen.

We moeten deze dan ook nog installeren:

```bash
npm i --save-dev supertest @types/supertest
```

Stel dat we een Express applicatie hebben die een GET request afhandelt op de route `/hello`:

```typescript
import express from "express";

const app = express();

app.get("/hello", (req, res) => {
    res.send("Hello, world!");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

export default app;
```

Let wel op dat we nu wel de app moeten exporteren. Dit is nodig om de app te kunnen testen.

We kunnen deze nu testen met:

```typescript
import request from "supertest";

import app from "./index";

describe("GET /hello", () => {
    it("should return Hello, world!", async () => {
        const response = await request(app).get("/hello");
        expect(response.status).toBe(200);
        expect(response.text).toBe("Hello, world!");
    });
});
```

Als je deze test nu uitvoert met `npm test`, dan krijg je de volgende error:

```bash
Jest did not exit one second after the test run has completed.

'This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.
```

Om dit op te lossen kunnen we de app code in een apart bestand zetten en de code in `index.ts` aanpassen:

```typescript
import app from "./app";

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
```

en de rest van de code in `app.ts`:

```typescript
import express from "express";

const app = express();

app.get("/hello", (req, res) => {
    res.send("Hello, world!");
});

export default app;
```

#### Query parameters

Als je een route hebt die query parameters verwacht, kan je deze testen met:

```typescript
app.get("/hello", (req, res) => {
    const name = req.query.name;
    res.send(`Hello, ${name}!`);
});
```

en de test:

```typescript
describe("GET /hello", () => {
    it("should return Hello, world!", async () => {
        const response = await request(app).get("/hello").query({ name: "world" });
        expect(response.status).toBe(200);
        expect(response.text).toBe("Hello, world!");
    });

    it("should return Hello, John!", async () => {
        const response = await request(app).get("/hello").query({ name: "John" });
        expect(response.status).toBe(200);
        expect(response.text).toBe("Hello, John!");
    });
});
```

#### POST requests

Als je een route hebt die POST requests afhandelt, kan je deze testen met:

```typescript
app.post("/hello", (req, res) => {
    const name = req.body.name;
    res.send(`Hello, ${name}!`);
});
```

en de test:

```typescript
describe("POST /hello", () => {
    it("should return Hello, world!", async () => {
        const response = await request(app).post("/hello").send({ name: "world" });
        expect(response.status).toBe(200);
        expect(response.text).toBe("Hello, world!");
    });

    it("should return Hello, John!", async () => {
        const response = await request(app).post("/hello").send({ name: "John" });
        expect(response.status).toBe(200);
        expect(response.text).toBe("Hello, John!");
    });
});
```

#### HTML responses

Als je een route hebt die HTML responses teruggeeft, kan je deze testen met:

```typescript
app.get("/hello", (req, res) => {
    res.send("<h1>Hello, world!</h1>");
});
```

en de test:

```typescript
describe("GET /hello", () => {
    it("should return Hello, world!", async () => {
        const response = await request(app).get("/hello");
        expect(response.status).toBe(200);
        expect(response.text).toBe("<h1>Hello, world!</h1>");
    });
});
```

of je kan de HTML parsen met `node-html-parser` en dan de inhoud van de h1 tag testen:

```typescript
import { parse } from "node-html-parser";

describe("GET /hello", () => {
    it("should return Hello, world!", async () => {
        const response = await request(app).get("/hello");
        expect(response.status).toBe(200);
        const root = parse(response.text);
        const h1 = root.querySelector("h1");
        if (h1) {
            expect(h1.innerText).toBe("Hello, world!");
        }
    });
});
```

### Coverage

Jest kan ook gebruikt worden om de code coverage te berekenen. Dit is het percentage van de code dat door de tests gedekt wordt. Hoe hoger dit percentage, hoe beter je code getest is. Eerst moet je wel in je `package.json` de volgende lijn toevoegen bij de scripts.

```json
"scripts": {
  "coverage": "jest --coverage"
}
```

Nu kan je de coverage berekenen met `npm run coverage`. Je krijgt dan een overzicht van de coverage van je code.

Je krijgt een uitgebreid overzicht van welke lijnen er wel en niet getest zijn. Dit kan je helpen om te zien welke delen van je code nog niet getest zijn en waar je nog extra tests moet schrijven. Je kan dit verslag vinden in de map `coverage/lcov-report/index.html`.

### Mocking

Unit testen wordt vaak lastiger wanneer je code interageert met "de buitenwereld": filesystemen, databanken, invoer van de gebruiker, uitvoer naar de terminal, externe servers,...

Om deze reden wordt vaak gebruik gemaakt van "mocks": waarden die de plaats innemen van onderdelen die het moeilijk maken om unit testen te schrijven. Deze leveren vooraf vastgelegde data af eerder dan de echte handelingen uit te voeren. Achteraf kunnen we ook controleren dat deze gebruikt zijn zoals verwacht. Dit past binnen het black box principe dat gehanteerd wordt voor unit testen. Jest bevat ingebouwde functionaliteit voor het maken van mocks.

#### Database

We hebben gekozen om onze database altijd in een aparte module te steken die onze collection exporteert. Dit maakt het makkelijk om deze te mocken. We gaan hierbij gebruik maken van de `mock` functie van Jest om de functies van de database module te mocken.

```typescript
app.get("/pets", async (req, res) => {
    let pets : Pet[] = await getPets();
    res.render("pets", { pets });
});
```

Met de volgende `types.ts`

```typescript
import { ObjectId } from "mongodb"

export interface Pet {
    _id?: ObjectId,
    name: string,
    age: number,
    type: PetType,
    breed: string
}

export type PetType = "dog" | "cat" | "hamster"
```

en `database.ts:`

```typescript
import {Collection, MongoClient} from "mongodb";
import dotenv from "dotenv";
import { Pet, PetType } from "./types";

dotenv.config();

if (!process.env.MONGODB_URI) {
    process.exit(0);
}

const client = new MongoClient(process.env.MONGODB_URI);

const petCollection: Collection<Pet> = client.db("pet-shelter").collection("pets");

export async function getPets() {
    return await petCollection.find().sort({"name": "asc"}).toArray();
}


export async function seed() {
    if (await petCollection.countDocuments() === 0) {
        const pets: Pet[] = [
            { name: "Buddy", age: 2, type: "dog", breed: "Golden Retriever" },
            { name: "Daisy", age: 3, type: "dog", breed: "Beagle" },
            // ...
        ];
        console.log("No data... seeding");

        await petCollection.insertMany(pets);

    }
}

export async function connect() {
    await client.connect();
    console.log("Connected to database");
    await seed();
}

export async function close() {
    try {
        await client.close()
    } catch (e) {
        console.error(e);
    }
}
```

Dan kunnen we de test schrijven op de volgende manier:

```typescript
import request from "supertest";
import app from "./app";
import { getPets } from "./database";
import { ObjectId, WithId } from "mongodb";
import { Pet } from "./types";

jest.mock("./database");

const mockGetPets = jest.mocked(getPets);

const mockPets : WithId<Pet>[] = [
    { _id: new ObjectId("65f1a1b2c3d4e5f6a1b2c3d4"), name: "Buddy", age: 2, type: "dog", breed: "Golden Retriever" },
    { _id: new ObjectId("65f1a1b2c3d4e5f6a1b2c3d5"), name: "Daisy", age: 3, type: "dog", breed: "Beagle" },
];

describe("GET /pets", () => {
    
    it("should return 200 and render the list of pets", async () => {
        // Arrange
        mockGetPets.mockResolvedValue(mockPets);

        // Act
        const res = await request(app).get("/pets");

        // Assert
        expect(res.status).toBe(200);
        expect(res.text).toContain("Buddy");
        expect(res.text).toContain("Daisy");
        expect(mockGetPets).toHaveBeenCalledTimes(1);
    });

    it("should return 200 even if the pet list is empty", async () => {
        // Arrange
        mockGetPets.mockResolvedValue([]);
        
        // Act
        const res = await request(app).get("/pets");

        // Assert
        expect(res.status).toBe(200);
        expect(mockGetPets).toHaveBeenCalled();
    });

    it("should handle database errors gracefully", async () => {
        // Arrange
        mockGetPets.mockRejectedValue(new Error("Database connection failed"));

        // Act
        const res = await request(app).get("/pets");

        // Assert
        expect(res.status).toBe(500);
    });
});
```

Het Arrange, Act, Assert (AAA) patroon is een vaste structuur voor unit tests die de leesbaarheid vergroot door de test in drie logische stappen op te splitsen: eerst zet je alle benodigde data en mocks klaar (Arrange), vervolgens voer je de specifieke actie of functie uit die je wilt testen (Act), en tot slot controleer je of het resultaat en de bijwerkingen overeenkomen met je verwachtingen (Assert).&#x20;

#### Fetch

We gebruiken fetch om requests op externe services te doen. Omdat dit iets is dat je vaak wil mocken (om te vermijden dat netwerkstoringen testen doen falen, om te vermijden dat je API-limieten bereikt,...) is hier speciale ondersteuning voor.

We installeren eerst `@fetch-mock/jest` (als development dependency).

```
npm install --save-dev @fetch-mock/jest
```

De clientcode:

```typescript
interface Pokemon {
    name: string,
    url: string,
}

app.get("/pokemon", async (req: Request, res: Response) => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2");
    const pokemon = (await response.json()).results as Pokemon[];
    res.render("pokemon", { names: pokemon.map(({name}) => name) });
});
```

De testcode:

```typescript
const POKE_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=2";

beforeEach(() => {
    fetchMock.mockGlobal();
});

afterEach(() => {
    fetchMock.mockRestore();
});

describe("GET /pokemon", () => {
    it("renders pokemon names from the API", async () => {
        // Arrange
        fetchMock.get(POKE_API_URL, {
            results: [
                { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
                { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
            ],
        });
        // Act
        const res = await request(app).get("/pokemon");
        // Assert
        expect(res.status).toBe(200);
        expect(res.text).toContain("bulbasaur");
        expect(res.text).toContain("ivysaur");
        expect(fetchMock).toHaveFetched(POKE_API_URL);
    });
});

```

Vergeet niet de `fetchMock.mockGlobal()` en `fetchMock.mockRestore()` uit te voeren na elke test anders zal de echte fetch functie worden uitgevoerd en dit willen we niet.

#### Neveneffecten vermijden

Om te vermijden dat testen elkaar beinvloeden. Bijvoorbeeld bij&#x20;

```typescript
afterEach(() => jest.clearAllMocks());
```

Als we dit buiten de describe-blokken doen, gebeurt dit na elke test.

Bijvoorbeeld:

```typescript
app.get('/lezen', async (req, res) => {
  try {
    const data = await readFile('somepath.txt', 'utf-8');
    res.send(data);
  } catch (err) {
    res.status(500).send('Error');
  }
});
```

en de volgende tests:

```typescript
import request from 'supertest';
import { readFile } from 'fs/promises';
import app from './index';

jest.mock('fs/promises');

const mockedReadFile = jest.mocked(readFile);

describe('GET /lezen', () => {
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('geeft de tekst terug bij succes', async () => {
    // Arrange
    mockedReadFile.mockResolvedValue('Mock data!');
    // Act
    const res = await request(app).get('/lezen');
    // Assert
    expect(res.text).toBe('Mock data!');
    expect(mockedReadFile).toHaveBeenCalledTimes(1);
  });

  it('geeft een 500 bij een fout', async () => {
    // Arrange
    mockedReadFile.mockRejectedValue(new Error('File not found'));
    // Act
    const res = await request(app).get('/lezen');
    // Assert
    expect(res.status).toBe(500);
    expect(mockedReadFile).toHaveBeenCalledTimes(1); 
  });
});
```

Probeer eens de `clearAllMocks` weg te halen en kijk wat er gebeurd.
