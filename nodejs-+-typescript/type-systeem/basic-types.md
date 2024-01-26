# Basic types

Tot nu toe hebben we nog niet concreet gezien wat het grote verschil is tussen TypeScript en JavaScript. Zoals de naam zegt is de belangrijkste toevoeging van TypeScript is het toevoegen van types. Dit is een concept dat we kennen uit andere talen zoals C# en Java. Types zorgen ervoor dat je variabelen kan declareren met een bepaald type. Dit zorgt ervoor dat je code minder foutgevoelig is en dat je code leesbaarder is voor een programmeurs. Zeker als je functies gaat gebruiken van anderen is het belangrijk dat je weet welke types je moet meegeven en welke types je terugkrijgt. Dit is niet altijd even duidelijk in JavaScript. In TypeScript is dit wel duidelijk.

We gaan verder in dit onderdeel kijken welke types er allemaal zijn in TypeScript maar we gaan beginnen met een klein voorbeeldje van waarom types handig kunnen zijn. Stel dat je de volgende variabele tegenkomt in een stuk code:

```typescript
let id = 1;
```

Het is hier overduidelijk dat de id een getal is. Maar stel je voor dat ergens anders in je code deze variabele wordt aangepast:

```typescript
id = "123e4567-e89b-12d3-a456-426614174000";
```

en dat we ook een functie hebben die deze id gebruikt en eventueel verhoogt met 1:

```typescript
function increaseId(id) {
    return id + 1;
}
```

Dit is een soort fout die je makkelijk kan maken en die je niet snel zal opmerken. JavaScript zal dit gewoon uitvoeren en geen foutmelding geven maar dit kan wel voor problemen zorgen. In TypeScript zou dit niet mogelijk zijn. We zouden een foutmelding krijgen bij het toekennen van de string aan de variabele id en ook bij het aanroepen van de functie increaseId. Dit is een van de vele voordelen van TypeScript. Ze noemen dit in de programmeerwereld: **strongly typed**. Eenmaal je een variabele een type heeft gekregen dan kan dit type nooit meer veranderd worden. De waarde mag wel veranderd worden als het type hetzelfde blijft.

```typescript
let thing = "My Message";
thing = "Another Message!"; // OK!
thing = 0; // Niet OK!
```

of

```typescript 
let thing = 0;
thing = 5; // OK!
thing = "My Message"; // Niet OK!
```

## Number




