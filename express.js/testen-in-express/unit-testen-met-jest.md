# Unit testen met Jest

Unit testen van Express-applicaties met Jest biedt een manier om de betrouwbaarheid van je applicatie te garanderen. Bij het schrijven van unit tests voor Express-applicaties in TypeScript, is het belangrijk om je te focussen op het isoleren van individuele functies of componenten van de applicatie, waarbij het gebruik van mocks tot een minimum wordt beperkt. Hieronder vind je een basisvoorbeeld van hoe je kunt beginnen met het testen van een Express-route in TypeScript met Jest.

Installeer eerst Jest en Supertest (om HTTP requests te doen): `npm i --save-dev jest typescript ts-jest supertest @types/jest @types/supertest`

{% hint style="info" %}
Dit zijn development dependencies, want de applicatie die aan de gebruiker wordt aangeboden heeft ze niet nodig. Ze zijn alleen nodig voor de ontwikkelaar.
{% endhint %}

Om Jest te kunnen gebruiken (met TypeScript), voer je dit commando uit: `npx ts-jest config:init`

Om te zorgen dat je al je Jest-tests kan laten lopen met `npm test`, voeg je dit toe aan package.json:

```json
"scripts": {
  "test": "jest"
}
```

Veronderstel nu dat je deze app met één route hebt:

```typescript
// app.ts
import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.get('/hello', (req: Request, res: Response) => {
  res.status(200).send('Hallo Wereld');
});

export default app;

```

Dan kan je een Jest-test schrijven als volgt. Je hoeft hier de applicatie niet voor op te starten: supertest interageert rechtstreeks met de app en gaat niet via de poort waarop we normaal `listen` uitvoeren.

```typescript
// app.test.ts
import request from 'supertest';
import app from './app';

describe('GET /hello', () => {
  it('should return Hallo Wereld', async () => {
    const response = await request(app).get('/hello');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hallo Wereld');
  });
});
```

Belangrijke onderdelen zijn hier:

* de filenaam: Jest herkent, met de configuratie die we hebben, files die eindigen op `.test.ts`
* `describe`: dit is een manier om testfuncties te groeperen
  * groepen kunnen genest zijn, dus je kan een `describe` in een describe plaatsen
  * de code in alle niveaus van `describe` voert uit voor de testen zelf lopen
* `it`: deze functie (ook `test` genaamd) verwacht een omschrijving van wat er moet gebeuren en callback die de testcode zelf bevat. Zoals je ziet in het voorbeeld, mag deze callback asynchroon zijn.
* request(app): dit is hoe `supertest` een HTTP-request creëert voor je app
* `expect`: dit levert een "expectation", een object waarmee je bepaalde verwachtingen expliciet kan maken
* `toBe`: dit is een voorbeeld van een _matcher_, een manier om zo'n verwachting uit te drukken. Er zijn ook matchers om na te gaan of een resultaat bepaalde tekst bevat, een bepaalde lengte heeft,... Je kan best de autocomplete van je editor gebruiken of [de documentatie van Jest raadplegen](https://jestjs.io/docs/using-matchers). Daar vind je nog meer matchers.

#### Cookies in je request plaatsen

Als je code verwacht dat een bepaalde cookie aanwezig is, kan je deze toevoegen aan je individuele requests door middel van set:

```typescript
// eerdere code...
const response = await request(app)
  .get("/route-die-cookies-gebruikt")
  .set('Cookie', ['cookie1=12345667', 'cookie2=blah']);
// verder zoals andere requests met supertest
```

Als je wil controleren wat er met cookies gebeurt over een volledige request-response cyclus, plaats je deze beter in de "cookie jar" van de "agent". Deze "agent" kan je zien als de browser:

```typescript
import { Cookie, CookieAccessInfo } from 'cookiejar';
const agent = request.agent(app);
agent.jar.setCookie(`cookie1=abc`);
const response = await agent.post('/myroute').send();
const maybeModifiedCookie = agent.jar.getCookie('cookie1', CookieAccessInfo.All);
// expect(maybeModifiedCookie)...
```
