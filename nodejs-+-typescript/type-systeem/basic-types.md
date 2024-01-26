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

We gaan nu in detail een aantal basis types bekijken in TypeScript en de werking ervan bespreken.

### number

In TypeScript is er geen verschil tussen gehele getallen (integers) en floating point getallen zoals in andere programmeertalen (bv C#). Dus alle getallen of er nu getallen na de komma staan of niet worden uitgedrukt met het `number` data type.&#x20;

Je kan in TypeScript een number variabele declareren als volgt:

```typescript
let a : number = 0;
```

Je kan allerhande operaties uitvoeren op getallen, zoals vermenigvuldiging (\*), delen (/), optellen (+), aftrekken (-), en nog veel meer

Naast de gewone getallen die jullie allemaal al kennen heb je ook "speciale numerieke waarden" die tot dit data type behoren: `Infinity`, `-Infinity` en `NaN`

*   &#x20;**Infinity** stelt het wiskundige ∞ symbool voor. Het is een speciale waarde die groter is dan alle mogelijke waarden. Als je iets van wiskunde kent dan weet je dat als je deelt door 0 dat je dan eigenlijk het getal oneindig krijgt. Dit is ook zo in TypeScript

    ```
    console.log(1/0); // Infinity
    ```

    Deze value zal je waarschijnlijk niet vaak tegenkomen, maar het is een indicatie dat je per ongeluk waarschijnlijk door 0 hebt gedeeld
*   **NaN** stelt voor dat de waarde het gevolg is van een rekenfout. Bijvoorbeeld als je een stuk tekst probeert te delen door getal

    ```
    console.log( "not a number" / 2 );
    ```

    Dus `NaN` zal je vaak tegen komen als je iets verkeerd gedaan hebt in je berekening. Je komt NaN ook vaak tegen tijdens het converteren van een datatype naar een ander. Hoe we dit doen zien we later in detail, maar hier heb je al een voorproefje:

    ```
    console.log(parseInt("1")) // 1
    console.log(parseInt("getal")); // NaN
    ```

De reden waarvoor dat ze gekozen hebben om deze getallen uit te drukken is vrij eenvoudig. De ontwerpers van JavaScript wilden niet dat de programma's crashen als je een wiskundige fout maakt zoals bij andere programmeertalen.

### string

Een string in TypeScript moet omringd zijn met quotes.

```typescript
let str : string = "Hello";
let str2 : string = 'Single quotes are ok too';
let phrase : string = `can embed another ${str}`;
```

In TypeScript zijn er drie types van quotes

1. Double quotes: `"Hello"`.
2. Single quotes: `'Hello'`.
3. Backticks: `` `Hello` ``.

Double en single quotes zijn "eenvoudige" quotes. Er is geen verschil tussen de twee in TypeScript. Je mag dus kiezen om single of double quotes te gebruiken. Zorg er wel voor dat je deze keuze wel over heel je project hetzelfde houdt.

De derde soort quotes is een speciaal soort.  Ze laten ons toe om variabelen en expressies in strings te plaatsen door ze te omringen door `${...}`&#x20;

```typescript
let name : string = "Andie";

// met een variable
console.log( `Hello, ${name}!` ); // Hello, Andie!

// met een expression
console.log( `the result is ${1 + 2}` ); // the result is 3
```

Alles wat tussen de `${...}` staat wordt geëvalueerd en het resultaat wordt deel van de string.&#x20;

Je kan eender welke variabele omzetten van een ander datatype omzetten naar een string aan de hand van de `toString()` methode.

```typescript
let number : number = 4;

let str : string = number.toString();
```

### boolean

Het boolean type heeft maar twee verschillende waarden: `true` en `false`

Het type wordt vaak gebruikt om ja/nee waarden in op te slagen. `true` betekent ja of waar. En `false` betekent nee of niet waar.

```typescript
let isLightOn : boolean = true;
```

De bovenstaande code zou een variabele kunnen voorstellen die aangeeft of het licht aan is of niet.&#x20;

Boolean waarden kunnen ook afkomstig zijn uit het resultaat van vergelijkingen:

```typescript
let isGroterDan : boolean = 4 > 1;
console.log(isGroterDan) // true
```

Vergelijkingen of comparisons zien we later in detail in een verder hoofdstuk.

### null

De speciale `null` waarde hoort niet thuis in een van de types die hierboven zijn beschreven.

Het vormt een apart type dat alleen de `null` value bevat.

```typescript
let collegeDegree = null;
```

Het is een speciale waarde die "niets" of"leeg" voorstelt. De code hierboven zegt gewoon dat de gebruiker bijvoorbeeld geen `collegeDegree` heeft. Dus bijvoorbeeld zit deze gebruiker nog in het middelbaar en heeft dus geen diploma.

### undefined

Net zoals `null` is `undefined` een waarde die op zichzelf staat met zijn eigen type. De betekenis is zeer gelijkaardig maar toch iets anders. Het zegt dat de waarde nog niet is toegekend.&#x20;

```typescript
let message;

console.log(message); // undefined
```

We hebben hier boven dus nog geen waarde toegekend aan de variabele `message`

### object en array

Er zijn ook nog types die wie complexe types noemen. Hier behoren de objecten en de arrays. We gaan hier op dit moment nog niet verder op in omdat dit een te complex gegeven is om nu al te behandelen. Deze types worden nog duidelijk in een verder hoofdstuk.

### eigen data types

In TypeScript is het mogelijk om je eigen complexe data types te gaan aanmaken. Dit is ook iets wat we in een later hoofdstuk gaan doen.&#x20;
