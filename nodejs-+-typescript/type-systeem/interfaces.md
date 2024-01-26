# Interfaces

Er bestaan een aantal datatypes in TypeScript die we "primitieve" of "eenvoudige" datatypes noemen. Dit is omdat de waarden altijd maar uit 1 enkel ding bestaat. In het hoofdstuk over arrays heb je gezien dat er ook nog een ander soort datatypes bestaat: de complexe datatypes. Deze worden opgebouwd uit meerdere primitieve datatypes. 

Een object is een ander voorbeeld van een complex datatype. In JavaScript en TypeScript kom je objecten haast overal tegen. Daarom is het belangrijk om deze te begrijpen en deze te kunnen gebruiken. 

## Type van een object

We kunnen een object beschrijven aan de hand van een interface . Deze interface beschrijft welke properties een object bevat en kan bevatten. We maken een eigen soort type dat we later kunnen gebruiken bij het declareren van onze variabelen.

Stel dat je het volgende object in JavaScript hebt:

```typescript
let andie = {
  name: "Andie",
  age: 40
}
```

Dit object heeft twee properties: `name` en `age`. De waarde van `name` is een string en de waarde van `age` is een number. Als we nu een tweede object willen aanmaken en perongeluk een typfout maken, dan zal TypeScript ons niet waarschuwen van deze fout:

```typescript
let debbie = {
  naem: "Debbie",
  age: 30
}
```

TypeScript zal dit als twee verschillende objecten zien. Dit is niet wat we willen. We willen dat TypeScript ons waarschuwt als we een typfout maken. We willen dus een type declareren dat zegt dat een object een `name` en een `age` property moet hebben. Dit kunnen we doen aan de hand van een interface:

```typescript
interface Person {
  name: string;
  age: number;
}
```

We hebben nu een interface gemaakt die we `Person` noemen. Deze interface beschrijft een object dat een `name` en een `age` property moet hebben. We kunnen nu een variabele declareren van het type `Person`:

```typescript
let andie: Person = {
  name: "Andie",
  age: 40
}
```

Als we nu een typfout maken, dan zal TypeScript ons waarschuwen:

```typescript
let debbie: Person = {
  naem: "Debbie",
  age: 30
} // Error: Property 'naem' does not exist on type 'Person'
```

Ook is het niet mogelijk om een property toe te voegen die niet in de interface staat:

```typescript
let debbie: Person = {
    name: "Debbie",
    age: 30,
    isAdmin: true
} // Error: Object literal may only specify known properties, and 'isAdmin' does not exist in type 'Person'
```

Ook het weglaten van bepaalde properties zal een foutmelding geven:

```typescript
let debbie: Person = {
    name: "Debbie"
} // Error: Property 'age' is missing in type '{ name: string; }' but required in type 'Person'
```

Uiteraard moet je ook de data types van de properties respecteren:

```typescript
let debbie: Person = {
    name: "Debbie",
    age: "30"
} // Error: Type 'string' is not assignable to type 'number'
```

## Objecten in objecten

Het is ook mogelijk om objecten in andere objecten te gaan steken. Bijvoorbeeld voor ons User object zouden we kunnen kiezen om ook een adres toe te voegen. We zouden deze als aparte eigenschappen kunnen opgeven van het user object maar het is beter om dit in een apart object te steken.

We passen dus de User interface hiervoor aan:

```typescript
interface User {
    name: string,
    age?: number,
    address: Address
}
```

Het type `Address` moeten we dan ook nog aanmaken aan de hand van een nieuwe interface.

```typescript
interface Address {
    street: string,
    number: number,
    city: string
}
```

Nu kunnen we een User object aanmaken gebruik makende van deze interface.

```typescript
let user : User = {
  name: "Andie",
  age: 30,
  address: {
    street: "Fakestreet",
    number: 133,
    city: "Fakegem"
  }
}
```

Wil je dan bijvoorbeeld de straat van deze gebruiker op het scherm tonen dan kan je dit doen aan de hand van de dot notatie:

```typescript
console.log(user.address.street);
```

Als we `address` zouden niet verplicht maken (optioneel):

```typescript
interface User {
    name: string,
    age?: number,
    address?: Address
}
```

dan moet je wel eerst nakijken of `address` wel is opgegeven:

```typescript
if (user.address) {
    console.log(user.address.street);
}
```

anders krijg je deze error:

```typescript
console.log(user.address.street); // Error: Object is possibly 'undefined'
```

