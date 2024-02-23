# Mocken van dependencies

Unit testen wordt vaak lastiger wanneer je code interageert met "de buitenwereld": filesystemen, databanken, invoer van de gebruiker, uitvoer naar de terminal, externe servers,...

Om deze reden wordt vaak gebruik gemaakt van "mocks": waarden die de plaats innemen van onderdelen die het moeilijk maken om unit testen te schrijven. Deze leveren vooraf vastgelegde data af eerder dan de echte handelingen uit te voeren. Achteraf kunnen we ook controleren dat deze gebruikt zijn zoals verwacht. Dit past binnen het black box principe dat gehanteerd wordt voor unit testen. Jest bevat ingebouwde functionaliteit voor het maken van mocks.

Hieronder bekijken we enkele voorbeelden:

### Mocken van het Request en de Response

Het is mogelijk de route handlers af te zonderen. Dat levert een meer geïsoleerde unit test op. In plaats van een Request te doen via `supertest`, kan je een object gebruiken. Dit vereist wel dat je je code wat anders organiseert. Meerbepaald: je moet de geteste functies benoemen en achteraf via `app.get` en dergelijke registreren.

```typescript
// app.ts

// meeste code zoals tevoren
const greeter = (req: Request, res: Response) => {
  res.status(200).send('Hallo Wereld');
}
app.get('/hello', greeter);

export { greeter };
```

Nu is het dus mogelijk dezelfde code uit te voeren zoals je een gewone functie oproept, door zelf een `Request` en een `Response` als argument te geven:

```typescript
// app.test.ts
import { greeter } from './app';

describe('GET /hello', () => {
  it('should return Hallo Wereld', () => {
    let res: any = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(), // wegens chaining in de implementatie
    };
    greeter({} as any, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('Hallo Wereld');
  });
});
```

Dit voorbeeld bevat eigenlijk twee types van mocks. De request en de response zelf zijn mocks, in de zin dat het geen echte request en response zijn. Ze hebben ook niet het juiste type en, om niet verdwaald te raken in de details van het typesysteem, hebben we ze gewoon als `any` beschouwd.

Voor res hebben we twee onderdelen voorzien, namelijk `send` en `status`. Dit zijn de mocks die typisch bedoeld worden als het over Jest gaat. Het zijn niet gewoon plaatsvervangende objecten, ze zijn echt van het type `Mock`, een speciaal soort functie. In het geval van send maakt het niet echt uit wat deze functie doet. In het geval van `status` moet de functie in kwestie het object (dus `res`) teruggeven waar ze deel van uitmaakt,  zodat de volgende call de gemockte versie van `send` gebruikt.

De `expect`s op het einde staan dan toe om na te gaan dat de verwachte stappen zijn uitgevoerd. Het resultaat van deze functies was niet belangrijk, maar we willen wel weten dat ze op een bepaalde manier zijn uitgevoerd, d.w.z. dat de code gedaan heeft wat we dachten dat ze zou doen.

### Mocken van het bestandensysteem

Stel, je hebt een Express-route die informatie leest van een bestand. Normaal gesproken zou je de `fs` module van Node.js gebruiken om het bestand te lezen. Voor testdoeleinden kun je echter de `fs` module mocken om consistente en gecontroleerde testresultaten te garanderen.

```typescript
import fs from 'fs';

const readFile = (req: Request, res: Response) => {
  fs.readFile('/pad/naar/bestand.txt', 'utf8', (err: any, data: any) => {
    if (err) {
      res.status(500).send('Fout bij het lezen van het bestand');
    } else {
      res.status(200).send(data);
    }
  });
};
app.get("readFile", readFile);
```

In een Jest-test kunnen we zorgen dat de oproep van `fs.readFile` vervangen wordt:

```typescript
describe('readFile met mock request en response', () => {
  it('should read file content', () => {
    const mockReadFile = jest
      .spyOn(fs, 'readFile')
      .mockImplementation(((path: any, options: any, callback: any) => {
        callback(null, 'Mock bestandsinhoud' as any);
      }) as any);
    let res: any = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    readFile({} as any, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('Mock bestandsinhoud');
    mockReadFile.mockRestore();
  });
});
```

In dit voorbeeld gebruiken we `spyOn` om een functie uit een bestaande module te vervangen door een mock. Deze mock krijgt een implementatie die compatibel is (wat betreft de signatuur) met de oorspronkelijke `fs.readFile`. Hier is vrij veel gebruik gemaakt van `any`, omdat één waarde vervangen door een totaal ander type waarde niet makkelijk uit te drukken is.

{% hint style="warning" %}
Deze code maakt uitvoerig gebruik van mocks om de principes te laten zien. In de praktijk zou je eerder `supertest` gebruiken, enkel `fs.readFile` mocken en dan de uitvoer testen.
{% endhint %}

{% hint style="info" %}
Deze techniek, waarbij je tijdens de uitvoering stukken van een module overschrijft, heet _monkey patching_. Dit is vaak een snelle manier om mocks te installeren. Een alternatieve, explicietere manier is _dependency injection_.
{% endhint %}

#### Neveneffecten vermijden

Om te vermijden dat andere operaties die `fs.readFile` nodig hebben niet fout lopen, moeten we zorgen dat de mock enkel in deze testfunctie gebruikt wordt. Daarom voegen we in de testfile deze regel toe:

```
afterEach(() => jest.clearAllMocks());
```

Als we dit buiten de `describe`-blokken doen, gebeurt dit na elke test.

### Mocken van databasetoegang

Hier gebruiken we een vorm van _setter-based dependency injection_. We zorgen dat de waarde die we anders rechtstreeks zouden gebruiken op voorhand kan worden ingesteld.

{% hint style="info" %}
Dezelfde techniek kan toegepast worden voor andere databases dan MongoDB.
{% endhint %}

```typescript
// database.ts
import { MongoClient } from 'mongodb';

let client: MongoClient;

export function getClient() {
    if (client) {
        return client;
    }
    else {
        console.log("should set client before invoking getter!");
        return client; // zal undefined zijn!
    }
}

export function setClient(newClient: MongoClient) {
    client = newClient;
}
```

In de applicatie hebben we een handler die hier gebruik van maakt:

```typescript
interface Person {
  name: string,
  age: number
}

app.get("/readFromMongoDB", async (req: Request, res: Response) => {
  const data = await getClient().db("test").collection("people").find<Person>({}).toArray();
  res.render("people", { people: data });
});
```

```typescript
import * as db from './database'; // dit doen we omdat spyOn een module verwacht

describe("readFromMongoDB", () => {
  it("Should use people from the mock", async () => {
    const mockData = [{ name: "john", age: 42 }, { name: "mary", age: 11 }];
    const mockClient = {
      db: jest.fn().mockReturnThis(),
      collection: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      toArray: jest.fn().mockResolvedValue(mockData)
    }
    db.setClient(mockClient as any); // het is geen MongoClient, we doen alsof
    const response = await request(app).get('/readFromMongoDB').timeout(500);
    expect(response.status).toBe(200);
    expect(response.text).toContain('<li>');
    expect(response.text).toContain('john');
    expect(response.text).toContain('mary');
  })
});
```

We gebruiken `mockResolvedValue` om de teruggegeven waarde in een `Promise` te plaatsen, want de applicatie verwacht dat (er staat immers `const data = await ...`).

### Mocken van een extern request

We gebruiken `fetch` om requests op externe services te doen. Omdat dit iets is dat je vaak wil mocken (om te vermijden dat netwerkstoringen testen doen falen, om te vermijden dat je API-limieten bereikt,...) is hier speciale ondersteuning voor.

We installeren eerst [fetch-mock-jest](https://www.npmjs.com/package/fetch-mock-jest) (als development dependency).

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
import fetchMock from 'fetch-mock-jest';

describe("pokemon", () => {
  it("Should display Pokemon names based on request result", async () => {
    const mockResponse = { results: [{ name: "squirtle" }, { name: "wartortle" }] };
    // deze is automatisch gepatcht na de import
    fetchMock.get("https://pokeapi.co/api/v2/pokemon?limit=2", mockResponse);
    const response = await request(Server.getServer()).get('/pokemon');
    expect(response.status).toBe(200);
    expect(response.text).toContain('<li>');
    expect(response.text).toContain('squirtle');
    expect(response.text).toContain('wartortle');
  })
});
```

{% hint style="warning" %}
Mocks maken het vaak gemakkelijker om snel een grote reeks unit tests uit te voeren, maar je wil jezelf er wel van verzekeren dat de _echte_, volledige applicatie ook werkt. Daarom gebruik je ze beter niet in end-to-end testen.
{% endhint %}



### Monkey patching of dependency injection?

Monkey patching is vaak handig om "snelle" aanpassingen te doen. Zeker bij gebruik van packages, wanneer de broncode niet zo makkelijk toegankelijk is, kan dit handig werken. Het vereist dan ook geen aanpassing van de broncode. Het nadeel is dat het onbedoelde neveneffecten kan introduceren.

Dependency injection vereist dat je je code anders schrijft. Het zal duidelijker zijn wanneer bepaalde onderdelen vervangen (kunnen) worden, maar het brengt extra werk met zich mee.
