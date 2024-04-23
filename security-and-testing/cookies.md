# Cookies

## Stateless

HTTP is een stateless protocol. Dit betekent dat de server geen informatie bijhoudt over de client. Elke request is onafhankelijk van de vorige. Doe je een request naar de server, dan weet de server niet wie je bent of wat je vorige requests waren.

![HTTP is stateless](../.gitbook/assets/stateless.png)

Dit maakt het uiteraard moeilijk om bijvoorbeeld bij te houden of een gebruiker ingelogd is of niet.

![Facebook login](../.gitbook/assets/facebook-login.png)

Ook al heb je de eerste keer een login en paswoord meegegeven zal de tweede keer dat je de pagina bezoekt, de server niet weten wie je bent. Je zal dus opnieuw moeten inloggen.

![Facebook login2](../.gitbook/assets/facebook-login-2.png)

## Cookies

De oplossing voor dit probleem is gebruik maken van cookies. Cookies zijn kleine stukjes data die de client kan opslaan in de browser. Bij elke request naar de server worden deze cookies meegestuurd. De server kan deze cookies lezen en zo weet de server wie de client is.

### Cookies in Express

#### Installatie
Express heeft een middleware die het makkelijk maakt om cookies te gebruiken: `cookie-parser`. Je kan deze als volgt installeren:

```typescript
npm install cookie-parser
npm install --save-dev @types/cookie-parser
```

Vervolgens kan je deze middleware toevoegen aan je Express-applicatie:

```typescript
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
```

#### Cookies instellen

Stel dat we nu een formulier hebben waarbij de gebruiker zijn naam kan invullen. Als de gebruiker dit doet, willen we dat de gebruiker op de profielpagina terechtkomt en dat de naam van de gebruiker onthouden wordt de volgende keer dat de gebruiker de pagina bezoekt.

```typescript
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  res.cookie("username", req.body.username);
  res.redirect("/profile");
});
```

de `index.ejs` file:

```html
<form action="/" method="post">
  <input type="text" name="username" />
  <button type="submit">Submit</button>
</form>
```

#### Cookies uitlezen

Nu kunnen we de naam van de gebruiker uitlezen in de profielpagina:

```typescript
app.get("/profile", (req, res) => {
  let name: string = req.cookies.username;
  res.render("profile", { username: username });
});
```

de `profile.ejs` file:

```html
<h1>Welcome <%= username %></h1>
```

#### Cookies verwijderen

We kunnen ook cookies verwijderen aan de hand van de `clearCookie` methode:

```typescript
app.get("/removeName", (req, res) => {
  res.clearCookie("username");
  res.redirect("/");
});
```

en kunnen we een link toevoegen in de `profile.ejs` file:

```html
<a href="/removeName">Remove name</a>
```

### Onveilig login systeem

Cookies zijn niet veilig. De data die in cookies zit, is leesbaar voor iedereen. Als je bijvoorbeeld een login systeem maakt waarbij je de gebruikersnaam en het paswoord in een cookie opslaat, kan iedereen die cookie lezen en zo inloggen als iemand anders.

We gaan als voorbeeld dit wel eens een keer doen. We kijken hier met een if statement of de gebruikersnaam admin overeenkomt met de string "admin" en of het paswoord "hunter2" is. Als dit het geval is, dan zetten we de gebruikersnaam in een cookie en sturen we de gebruiker door naar de profielpagina. Anders sturen we de gebruiker terug naar de "/" route.

```typescript
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
    if (req.body.username === "admin" && req.body.password === "hunter2") {
        res.cookie("username", req.body.username);
        res.redirect("/profile");
    } else {
        res.redirect("/");
    }
});
```

de `index.ejs` file:

```html
<form action="/" method="post">
  <input type="text" name="username" />
  <input type="password" name="password" />
  <button type="submit">Submit</button>
</form>
```

In de profile route gaan we ook een if statement toevoegen. Als de gebruiker ingelogd is, dan tonen we de profielpagina. Anders sturen we de gebruiker terug naar de "/" route.

```typescript
app.get("/profile", (req, res) => {
    if (req.cookies.username === "admin") {
        res.render("profile", { username: req.cookies.username });
    } else {
        res.redirect("/");
    }
});
```

Dit lijkt op het eerste zicht een goede oplossing, maar dit is ver van waar. Als we nu even naar de cookies kijken in de development tools van de browser, zien we dat de gebruikersnaam gewoon uit te lezen valt en aan te passen is.

![Cookies in browser](../.gitbook/assets/cookie-browser.png)

Dus doe dit niet! We zien later hoe we dit wel moeten aanpakken.
