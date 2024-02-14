# Functions

### Oefening: Short Notation

Maak een nieuw project aan met de naam `short-notation`

* Deze oefening maak je in bestand `short-notation.ts`.
* Schrijf de volgende functies in de kortst mogelijke arrow notaties:

```typescript
const printStuff = (amount: number, text: string):void => {
    console.log(`Hello ${text}, you are number ${amount}`);
}
const twoDArray = (element1: string, element2: string): string[] => {
    return [element1, element2];
}
const numberToString = (number: number): string => {
    return `${number}`;
}
```

### Oefening: Wiskundige functies

Maak een nieuw project aan met de naam `math`.

Schrijf de volgende functies:

* `add` die twee getallen optelt
* `subtract` die twee getallen van elkaar aftrekt
* `multiply` die twee getallen met elkaar vermenigvuldigt. Zorg voor een default waarde van 1 als de tweede parameter niet meegegeven wordt.
* `divide` die twee getallen deelt. Zorg voor een default waarde van 1 als de tweede parameter niet meegegeven wordt.

Zorg dat je deze kan schrijven met het function keyword en met een arrow function.

Gebruik deze functies om de volgende berekening uit te voeren:

```
(4 + 5) * (6 - 3) / 2 = 13.5
```

Print het resultaat van de berekening af.

### Oefening: Array sum

Maak een nieuw project aan met de naam `array-sum`.

Maak een nieuwe functie `sum` die de som van alle getallen in een array berekent. Gebruik hiervoor een for loop en probeer ook eens de `reduce` functie van een array.

als je de volgende array meegeeft aan de functie:

```
[1, 2, 3, 4, 5]
```

dan moet de functie 15 teruggeven want 1 + 2 + 3 + 4 + 5 = 15.

### Oefening: Movies (vervolg)

Deze oefening gaat verder op de Movies oefening.

Maak 3 functies aan en probeer deze uit:

* de functie `wasMovieMadeInThe90s`:
  * met de parameter movie van het type Movie
  * met return waarde true als de film in de jaren 90 gemaakt is, anders false
  * print of de film The Matrix in de jaren 90 gemaakt is adhv deze functie
* de functie `averageMetaScore`
  * met de parameter movies die een array van het type Movie bevat
  * met return waarde de gemiddelde score van alle films in die array
  * print het gemiddelde van metascore van de 3 films adhv deze functie
* de functie `fakeMetaScore`
  * met de parameters
    * movie van het type Movie
    * newscore die een nieuwe score bevat
  * met return waarde een nieuw Movie object met de nieuwe score

### Oefening: Filter

Maak een nieuw project aan met de naam `filter`

#### Deel 1

Schrijf een functie `filterPositive` die een array van getallen als parameter verwacht. De functie `filterPositive` moet een nieuwe array teruggeven met enkel de positieve getallen uit de array die als parameter werd meegegeven. Deze functie **MOET** aan de hand van een **`for`-loop** geschreven worden en mag **geen** gebruik maken van de **ingebouwde functie `filter` van een array**.

Roep de functie `filterPositive` aan met de volgende array als parameter:

```typescript
const numbers: number[] = [-4,-4,1,2,3,4,5];
console.log(filterPositive(numbers)); // 1,2,3,4,5
```

#### Deel 2

Schrijf een functie `filterNegative` die een array van getallen als parameter verwacht. De functie `filterNegative` moet een nieuwe array teruggeven met enkel de negatieve getallen uit de array die als parameter werd meegegeven.

Roep de functie `filterNegative` aan met de volgende array als parameter:

```typescript
const numbers: number[] = [-4,-4,1,2,3,4,5];
console.log(filterNegative(numbers)); // -4,-4
```

#### Deel 3

Schrijf een functie `filterEven` die een array van getallen als parameter verwacht. De functie `filterEven` moet een nieuwe array teruggeven met enkel de even getallen uit de array die als parameter werd meegegeven.

Roep de functie `filterEven` aan met de volgende array als parameter:

```typescript
const numbers: number[] = [-4,-4,1,2,3,4,5];
console.log(filterEven(numbers)); // -4,-4,2,4
```

#### Deel 4

Schrijf nu een functie `filter` die een array van getallen als eerste parameter verwacht en een functie als tweede parameter. De functie `filter` moet een nieuwe array teruggeven met enkel de getallen uit de array die als eerste parameter werd meegegeven waarvoor de functie die als tweede parameter werd meegegeven `true` teruggeeft.

Herschrijf de functies `filterPositive`, `filterNegative` en `filterEven` door gebruik te maken van de functie `filter`.

Voorbeeld van gebruik:

```typescript
const numbers: number[] = [-4,-4,1,2,3,4,5];
const isPositive = (number: number) => number >= 0;
console.log(filter(numbers, isPositive)); // 1,2,3,4,5
```

### Oefening: atLeastTwo

Maak een nieuw project aan met een bestand `atLeastTwo` met de volgende inhoud:

```typescript
interface TestFunction {
    (n: number): boolean
}
```

* Schrijf een arrow functie `isOdd` die deze interface implementeert die teruggeeft of een getal oneven is.
* Schrijf een arrow functie `isEven` die deze interface implementeert die teruggeeft of een getal even is.
* Verzin twee andere functie's die deze interface implementeert.
* Schrijf een arrow functie genaamd `atLeastTwo` die twee argumenten aanvaard. Het eerste argument is een array van getallen en de tweede argument is een functie van het type `TestFunction`
* Deze functie geeft true terug als minstens twee elementen voldoen aan de meegegeven functie.

Bijvoorbeeld:

```typescript
console.log(atLeastTwo([2,3,4,6,8], isOdd));
console.log(atLeastTwo([2,3,4,5,6,8], isOdd));
```

geeft de volgende output:

```
false
true
```
