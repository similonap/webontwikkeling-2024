# EJS

Dankzij Express kunnen we nu dynamisch HTML terugsturen naar de client. Bekijk eventjes dit voorbeeld:

```typescript
import express from "express";

const app = express();

app.set("port", 3000);

app.get('/',(req,res)=>{
    let randomGetal = Math.random()*100;
    res.type("text/html");
    res.send(`Het random getal is ${randomGetal}`);
});

app.listen(app.get("port"), () =>
  console.log("[server] http://localhost:" + app.get("port"))
);
```

Bezoek `http://localhost:3000` en merk op wat er gebeurt.

Bij elke refresh verandert de waarde van het random getal. Kijk naar de source code van deze pagina. Je ziet enkel een getal, geen scripts! Express stuurt een nieuwe inhoud van de pagina bij elke refresh! Laten we het voorbeeld even analyseren:

```typescript
let randomGetal = Math.random()*100;
```

Deze lijn geeft een willekeurig getal terug. We gebruiken Math.random dat een random getal geeft tussen 0 en 1 en vermenigvuldigen dat met 100.&#x20;

```typescript
res.send(`Het random getal is ${randomGetal}`);
```

In plaats van een vaste string, geven we nu het randomgetal mee. Elke refresh voert de callback in app.get uit, dus elke refresh zorgt voor een ander getal.

**Templates**

Volledige web paginas in variabelen steken is niet ideaal. Wanneer je weet dat ook nog CSS en scripts erbij moeten, dan is het duidelijk dat we een andere oplossing nodig hebben. Express laat toe templates te gebruiken.

&#x20;We kunnen bv een Hello World pagina maken:

```markup
<html>
<body>
Hello world!
</body>
</html>
```

Maar wat als we nu een willekeurige boodschap willen tonen? &#x20;

```markup
<html>
<body>
[DIT MOET DYNAMISCH ZIJN]
</body>
</html>
```

Templates laten ons toe HTML paginas te schrijven zoals we dat gewoon zijn maar met variabele inhoud. Express ondersteunt verschillende template "engines". Hier gaan we gebruik maken van EJS.

**EJS**

Om EJS (Embedded JavaScript templating) te gebruiken installeren we de ejs module:

```markup
npm install ejs
```

en we installeren ook de TypeScript types:

```
npm install --save-dev @types/ejs
```

We stellen onze express app in om EJS als default view engine te gebruiken:

```typescript
import express from "express";
import ejs from "ejs";

const app = express();

app.set("view engine", "ejs"); // EJS als view engine
app.set("port", 3000);
```

Net zoals we 'port' de waarde 3000 geven, zetten we de property 'view engine' op ejs.

**EJS renderen**

EJS bestanden lijken op HTML files maar bevatten wat extras. Laten we starten met een simpel EJS bestand.

```markup
<h1>Hello World!</h1>
This is yet another boring hello world app
```

Dit bestand bewaren we als **index.ejs** in de folder **/views**. Merk op, dit is HTML in een EJS bestand, niets speciaals.

{% hint style="danger" %}
Alle EJS files moeten de extensie .ejs hebben.

Alle EJS files moeten in de _views_ folder staan (die zich in de folder van jouw applicatie bevindt)
{% endhint %}

Nu passen we onze applicatie aan om de index.ejs te tonen (renderen: omzetten van EJS naar HTML):

```typescript
import express from "express";
const app : Express = express();

app.set('view engine', 'ejs'); // EJS als view engine
app.set('port', 3000);

app.get('/',(req,res)=>{
  res.render('index');
})

app.listen(app.get('port'), ()=>console.log( '[server] http://localhost:' + app.get('port')));
```

Merk op hoe eenvoudig onze route naar / is geworden:

```typescript
app.get('/',(req,res)=>{
    res.render('index');
})
```

Ipv `res.send` gebruiken we `res.render`. Render verwacht als parameter de naam van een template die zich in de views folder bevindt. Hier tonen we de index file. Ga naar localhost:3000/ om jouw EJS file als HTML te zien.

Je kan nu verschillende EJS files toevoegen. Render ze via verschillende routes en kijk hoe je nu volledige control hebt over routes en de html die getoond wordt.

**Dynamische content**

Templates helpen ons de HTML dynamisch te maken. Laten we ons voorbeeld aanpassen zodat we het willekeurig getal weer zien verschijnen. Eerst passen we onze TypeScript aan.

```typescript
app.get('/',(req,res)=>{
    let randomGetal = Math.random()*100;
    res.render('index', {aRandomNumber: randomGetal});
})
```

`res.render()` heeft ook een tweede optionele parameter: een object waar elke property een variabel is die beschikbaar zal zijn in de EJS file.

In dit voorbeeld heeft de tweede parameter maar 1 property: `aRandomNumber`. We geven dit de waarde van de variabele `randomGetal`. `aRandomNumber` zal dus bij elke refresh een willekeurig getal tussen 0 en 100 bevatten.

We kunnen ook meerdere properties meegeven:

```typescript
app.get('/',(req,res)=>{
    let randomGetal = Math.random()*100;
    let randomGetal2 = randomGetal * 2;
    res.render('index', 
        {    
            aRandomNumber: randomGetal,
            name: "Sven",
            age: 40,
            someOtherNumber: randomGetal2
        });
})
```

Express zal nu index tonen, maar geeft eerst deze lijst van properties mee. Deze properties zijn nu beschikbaar als variabelen in de EJS file!

Laten we de index.ejs file aanpassen:

```
<h1>Hello World!</h1>
<p>
    This is yet another boring hello world app.
</p>
<p>
    But this time we have a random 
    number which is <%= aRandomNumber %>
</p>
```

Wanneer je nu naar localhost:3000 gaat, zal je het random getal in de tekst zien staan.

**EJS variabelen**

Om de variabelen te gebruiken moet je de volgende exacte notatie gebruiken:

```markup
<%= variable_name %>
```

De naam moet volledig overeenkomen met de naam van de property die je in render() meegeeft.&#x20;
