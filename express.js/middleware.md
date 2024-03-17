# Middleware

Middleware is een functie die toegang heeft tot de request en response objecten. Middleware kan de request en response objecten aanpassen, of de request doorsturen naar de volgende middleware functie in de stack. Je kan dus bijvoorbeeld een functie schrijven die wordt uitgevoerd voordat de request naar de route wordt gestuurd.

Je hebt al een aantal keer middleware gebruikt. Telkens je de `app.use()` functie gebruikt, voeg je middleware toe aan de stack. Je hebt bijvoorbeeld de `express.static()` functie gebruikt om statische bestanden te serveren. Deze functie is een middleware functie.

## Eigen middleware functie

### Logging voorbeeld

Wil je bijvoorbeeld een functie schrijven die een request logt voor elke request die binnenkomt? Dan kan je de volgende functie schrijven:

```typescript
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.get("/", (req, res) => {
    res.render("index");
})
```

Vergeet niet om de `next()` functie aan te roepen. Anders zal de request niet naar de volgende middleware functie in de stack gaan en zal deze request ook niet naar de route gaan.

### Locals voorbeeld

Soms is het handig om bepaalde variabelen beschikbaar te maken in alle views. Je kan deze variabelen toevoegen aan de `res.locals` object. Deze variabelen zijn dan beschikbaar in alle views. Zo moet je niet elke keer dezelfde variabelen doorgeven aan de `render()` functie. Je moet deze dan wel toevoegen aan de `res.locals` object in een middleware functie.

```typescript
app.use((req, res, next) => {
    res.locals.title = "My website";
    next();
});

app.get("/", (req, res) => {
    res.render("index");
})
```

Je kan nu in de `index.ejs` view de `title` variabele gebruiken zonder deze mee te geven aan de render functie.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><%= title %></title>
</head>
<body>
    <h1><%= title %></h1>
</body>
</html>
```

Je zou eventueel ook een `user` object kunnen toevoegen aan de `res.locals` object. Zo kan je in alle views de `user` variabele gebruiken. Je kan deze variabele dan bijvoorbeeld gebruiken om te bepalen of de gebruiker is ingelogd of niet.

### Security token voorbeeld

Stel dat je een API hebt waarbij je een security token moet meesturen met elke request. Je kan dan een middleware functie schrijven die de security token controleert. Als de security token niet klopt, dan kan je een error terugsturen. Als de security token wel klopt, dan kan je de request doorsturen naar de volgende middleware functie in de stack. We zullen de authorization header gebruiken om de security token mee te sturen.

```typescript
app.use((req, res, next) => {
    const token = req.headers.authorization;
    if (token !== "my-secret-token") {
        res.status(401).send("Unauthorized");
    } else {
        next();
    }
});

app.get("/", (req, res) => {
    res.send("Hello world");
})
```

Hij zal hier dus eerst de security token controleren. Als de security token niet klopt, dan zal hij een 401 status code terugsturen met de tekst "Unauthorized". Als de security token wel klopt, dan zal hij de request doorsturen naar de volgende middleware functie in de stack. In dit geval is dat de route. Hij zal dus "Hello world" terugsturen. Alle andere routes zullen ook de security token controleren.

### Middleware functies per route

Je kan ook middleware functies toevoegen aan een specifieke route. Je kan dan ook een extra middleware functie toevoegen aan de route. Deze middleware functie zal dan eerst worden uitgevoerd voordat de route wordt uitgevoerd.

```typescript
const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path}`);
    next();
}

app.get("/", loggingMiddleware, (req, res) => {
    res.render("index");
});

app.get("/admin", (req, res) => {
    res.render("admin");
});
```

In het bovenstaande voorbeeld zal de `loggingMiddleware` functie alleen worden uitgevoerd voor de "/" route. De "/admin" route zal de `loggingMiddleware` functie niet uitvoeren.
