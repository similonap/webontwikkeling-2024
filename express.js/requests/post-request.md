# POST Request

## POST Requests

`GET` requests zijn beperkt door de lengte van de url (meestal 2048). Dit wil zeggen dat je grote hoeveelheid data zoals bv lange paragrafen tekst, bestanden, grote JSON objecten, etc. niet kan doorsturen via een `GET` request. Ze brengen ook een veiligheidsrisico mee omdat hun inhoud in de URL staat. Je wil bijvoorbeeld niet dat je wachtwoord zomaar zichtbaar is in je browserbalk!

`GET` requests zijn ook niet geschikt voor operaties die een aanpassing teweegbrengen (zoals het versturen van een formulier). Dat komt onder meer omdat een paginarefresh zorgt dat het request opnieuw wordt uitgevoerd!

{% hint style="danger" %}
Let op. De inhoud van een `POST` request is ook leesbaar. Tenzij je gebruik maakt van encryptie, is de data niet veilig. Moderne browsers waarschuwen je automatisch wanneer je een website bezoekt die verkeer niet encrypteert.
{% endhint %}

Om `POST` requests makkelijk te behandelen voegen we volgende lijnen toe aan onze applicatie:

```typescript
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended:true}))
```

De waarde voor `limit` kies je zelf. Dit is de maximale grootte van het request. De tweede lijn zorgt ervoor dat de inhoud van de `POST` omgezet wordt in een handig JSON object.

Om een `POST` request te behandelen gebruiken we `app.post` ipv `app.get`.

```typescript
app.post('/sendData',(req, res)=>{
    // code hier
});
```

Laten we een simpel formulier maken om gegevens naar deze route te sturen:

```html
<form action="/sendData" method="post">
    <div>
        <label for="fname">First name?</label>
        <input name="fname" id="fname" value="George">
      </div>
      <div>
        <label for="lname">Last Name?</label>
        <input name="lname" id="lname" value="Smith">
      </div>
      <div>
        <button type='submit'>Send!</button>
      </div>
</form>
```

Dit voorbeeld stuurt 2 velden: `fname` en `lname`. Omdat het attribuut `method` van het `form`-element op `post` staat, worden de gegevens verstuurd als een `POST` request. Om de data die gestuurd is op te vragen, gebruiken we het Request object. Hierin bevindt zich de property `body` die de velden bevat van het `POST` request:

```typescript
app.post('/sendData',(req, res)=>{
    let data = req.body;
    res.json(data);
})
```

De velden fname en lname bevinden zich in `req.body`:

```typescript
app.post('/sendData',(req, res)=>{
    let firstName = req.body.fname;
    let lastName = req.body.lname;
    res.type('text/html')
    res.send(`Hello ${firstName} ${lastName}`);
})
```
