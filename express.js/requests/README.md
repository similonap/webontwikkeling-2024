# Request

Het Request object is een object dat door Express wordt aangemaakt en wordt meegegeven aan de callback functie van een route. Het bevat informatie over de request die de client verstuurd heeft. Je kan het gebruiken om bv. de inhoud van een `POST` request te lezen, de headers te lezen, de parameters van een route te lezen, etc.

Tot nu toe heb je dit object al gebruikt voor het uitlezen van query en route parameters. Enkele properties van het Request object zijn:

* `req.body`: bevat de inhoud van een `POST` request
* `req.headers`: bevat de headers van de request
* `req.params`: bevat de parameters van een route
* `req.query`: bevat de query parameters van een request
* `req.path`: bevat het pad van de request
* `req.method`: bevat de HTTP method van de request (GET, POST, PUT, DELETE, etc.)
* `req.ip`: bevat het IP adres van de client

### Request Headers

Request headers zijn een belangrijk onderdeel van een HTTP request. Ze bevatten informatie over de request zelf. Ze worden meegestuurd door de client en kunnen door de server gelezen worden. Headers bevatten bv. informatie over de browser die de request verstuurd, de taal van de client, de versie van de HTTP protocol, etc. Een header bestaat uit een naam en een waarde.

Zo kan je bijvoorbeeld aan de hand van de header `User-Agent` de browser van de client bepalen. De waarde van deze header is bv. `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36`.

Headers worden meegestuurd in de request. Je kan ze lezen via het Request object:

```typescript
app.get('/headers',(req,res)=>{
    let headers = req.headers;
    res.json(headers);
})
```

Wil je een specifieke header lezen, gebruik dan de property `req.headers`:

```typescript
app.get('/headers',(req,res)=>{
    let userAgent = req.headers['user-agent'];
    res.type('text/html')
    res.send(`Your browser is ${userAgent}`);
})
```

## Response Object

Het Response object is een object dat door Express wordt aangemaakt en wordt meegegeven aan de callback functie van een route. Het bevat methodes om de response van de server te configureren. Je kan bv. de inhoud van de response, de headers, de status code, etc. instellen.

We hebben dit object al gebruikt om bijvoorbeeld de content type van de response te configureren, de status code te wijzigen, response te sturen, etc. We zien hier nog een aantal nuttige methodes.

### Redirect

Een redirect is een HTTP response die instructies bevat voor de client om een nieuwe request te sturen naar een andere URL. Een redirect wordt gebruikt om bv. een gebruiker door te sturen naar een andere pagina. De client wordt automatisch doorverwezen naar de nieuwe URL.

Om een redirect te sturen, gebruik je de method `res.redirect`:

```typescript
app.get('/redirect',(req,res)=>{
    res.redirect('https://google.com');
})
```

### Status Code

De status code van een HTTP response geeft aan of de request geslaagd is of niet. De status code wordt automatisch ingesteld op 200 (OK) wanneer je een response verstuurd. Je kan de status code wijzigen met de method `res.status`:

```typescript
app.get('/status',(req,res)=>{
    res.status(404);
    res.send('Not found');
})
```

Wil je direct een response sturen met een bepaalde status code, gebruik dan de method `res.sendStatus`:

```typescript
app.get('/status',(req,res)=>{
    res.sendStatus(404);
})
```

Hier een tabel met de meest gebruikte status codes:

| Status Code | Omschrijving          | Wanneer te gebruiken                                        |
| ----------- | --------------------- | ----------------------------------------------------------- |
| 200         | OK                    | De request is geslaagd                                      |
| 201         | Created               | De request is geslaagd en een nieuwe resource is aangemaakt |
| 204         | No Content            | De request is geslaagd, maar er is geen inhoud om te tonen  |
| 400         | Bad Request           | De request is niet correct                                  |
| 401         | Unauthorized          | Missende of niet geslaagde authorisatie                     |
| 403         | Forbidden             | De client mag deze resource niet bekijken                   |
| 404         | Not Found             | De resource is niet gevonden                                |
| 500         | Internal Server Error | Er is een fout opgetreden op de server                      |

Het is belangrijk om de juiste status code te gebruiken zodat de client weet of er iets mis is gegaan of niet. En als er iets mis is gegaan, kan de client bv. een foutmelding tonen.

### Response headers

Net zoals bij een request, kan je ook bij een response headers instellen. Dit kan je doen met de method `res.set`:

```typescript
app.get('/headers',(req,res) => { 
    res.set('Content-Type','text/html');
    res.send('<h1>Hello World</h1>');
})
```

Als je een response verstuurd, kan je geen headers meer wijzigen. Als je dit toch probeert, krijg je de volgende foutmelding:

`Error: Can't set headers after they are sent.`

Bijvoorbeeld:

```typescript
app.get('/headers', (req, res) => {
    res.send('<h1>Hello World</h1>');
    res.set('Content-Type', 'text/html');
    // Error: Can't set headers after they are sent.
});
```

Dit komt omdat de headers al verstuurd worden door de send functie. Je kan dit oplossen door de headers te configureren voor je de response verstuurd:

```typescript
app.get('/headers',(req,res)=>{
    res.set('Content-Type','text/html');
    res.send('<h1>Hello World</h1>');
})
```

### Response Type

De response type wordt automatisch ingesteld op `text/html` wanneer je een response verstuurd. Je kan de response type wijzigen met de method `res.type`:

```typescript
app.get('/type',(req,res)=>{
    res.type('text/plain');
    res.send('Hello World');
})
```

Je kan ook de response type instellen op een van de volgende waarden: `html`, `text`, `json`, `xml`. Als je een van deze waarden gebruikt, wordt de content type automatisch ingesteld op de juiste waarde:

| Response Type    | Verkorte notatie | Omschrijving |
| ---------------- | ---------------- | ------------ |
| text/html        | html             | HTML         |
| text/plain       | text             | Plain text   |
| application/json | json             | JSON         |
| application/xml  | xml              | XML          |

