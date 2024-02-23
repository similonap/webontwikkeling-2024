# Static files

EJS files laten ons toe dynamische content beschikbaar te stellen via onze web app. Soms wil je ook statische HTML pages ter beschikking stellen. Jouw EJS bestanden gaan ook afbeeldingen willen tonen, gebruik maken van CSS bestanden en client-side JavaScript bevatten.&#x20;

We voegen volgende lijn code toe aan onze app:

```typescript
app.use(express.static('public'))
```

Dit bepaalt waar we onze statische bestanden kunnen plaatsen. Hierboven zeggen we dat de folder `public` alle statische bestanden zal bevatten.

Wanneer we bv. een test.html file maken en plaatsen in onze public folder, kunnen we volgende URL raadplegen:

```typescript
http://localhost:3000/test.html
```

Je kan ook folders toevoegen aan deze folder. Zo kan je afbeeldingen, CSS, JS en HTML ordenen in hun eigen folders:

```typescript
http://localhost:3000/images/profile.png
http://localhost:3000/css/style.css
http://localhost:3000/js/custom_code.js
...
```
