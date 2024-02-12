# Labo 3

## Theorie

Bekijk voor het labo aan te vangen eerst de volgende topics:

* [Basis types](../nodejs-+-typescript/type-systeem/basic-types.md) (enkel string, number en boolean)
* [Arrays](../nodejs-+-typescript/type-systeem/arrays.md)
* [Input Lezen](../nodejs-+-typescript/input-lezen.md) (menu)

## Oefeningen

### Som van getallen

Maak een nieuw project aan in de `labo3` directory met de naam `som-van-getallen`.

We willen een programma maken dat de som van een aantal getallen berekent. De gebruiker zal eerst moeten ingeven hoeveel getallen hij wil optellen. Vervolgens zal hij de getallen moeten ingeven. Het programma zal dan de som van de getallen tonen.

De getallen moeten opgeslagen worden in een array. Je mag een for loop gebruiken om de som te berekenen.

#### Voorbeeld interactie

```bash
Hoeveel getallen wil je optellen? 3
Geef getal 1 in: 5
Geef getal 2 in: 3
Geef getal 3 in: 7
De som van de getallen is 15
```

### Pokemon team

Gegeven is de volgende array van 20 pokemon:

```
let pokemon: string[] = [
    "Bulbasaur",
    "Ivysaur",
    "Venusaur",
    "Charmander",
    "Charmeleon",
    "Charizard",
    "Squirtle",
    "Wartortle",
    "Blastoise",
    "Caterpie",
    "Metapod",
    "Butterfree",
    "Weedle",
    "Kakuna",
    "Beedrill",
    "Pidgey",
    "Pidgeotto",
    "Pidgeot",
    "Rattata",
    "Raticate",
    "Spearow",
];
```

* Maak een variabele `team`van het type string\[]. Deze array bevat de pokemon van de gebruiker van het programma.
* Gebruik een lus om de pokemon te tonen aan de gebruiker. Toon eerst de index gevolgd door de naam van de pokemon. Je gebruikt dus nog NIET de ingebouwde `keyInSelect` van de readline-sync library.

```
0. Bulbasaur
1. Ivysaur
2. Venusaur
3. Charmander
4. Charmeleon
...
```

* Vraag daarna aan de gebruiker welke pokemon er moet toegevoegd worden aan het team. Dit doe je aan de hand van de index van de pokemon. Dit doe je tot de gebruiker STOP ingeeft. Je kan dit doen aan de hand van een `do while` loop.

```
Welke pokemon wil je in je team? [0-20]: 4
Welke pokemon wil je in je team? [0-20]: 3
Welke pokemon wil je in je team? [0-20]: STOP
```

* Als de gebruiker een pokemon ingeeft die al in het team zet dan krijgt hij hiervan een melding en wordt de pokemon niet toegevoegd:

```
Welke pokemon wil je in je team? [0-20]: 4
Welke pokemon wil je in je team? [0-20]: 3
Welke pokemon wil je in je team? [0-20]: 4
Deze pokemon zit al in je team
Welke pokemon wil je in je team? [0-20]: 2
Welke pokemon wil je in je team? [0-20]: STOP
```

* Als de pokemon niet bekend is (dus het ingegeven nummer groter is dan de lengte van de array) wordt er ook een melding gegeven:

```
Welke pokemon wil je in je team? [0-20]: 21
Deze pokemon ken ik niet
Welke pokemon wil je in je team? [0-20]: 4
```

* Als je STOP hebt ingegeven dan wordt het team van de gebruiker op het scherm getoond:

```
Welke pokemon wil je in je team? [0-20]: 1
Welke pokemon wil je in je team? [0-20]: 2
Welke pokemon wil je in je team? [0-20]: 3
Welke pokemon wil je in je team? [0-20]: 4
Welke pokemon wil je in je team? [0-20]: 5
Welke pokemon wil je in je team? [0-20]: 6
Welke pokemon wil je in je team? [0-20]: STOP
Jouw team van pokemon is: 
1. Ivysaur
2. Venusaur
3. Charmander
4. Charmeleon
5. Charizard
6. Squirtle
```

**Voorbeeld interactie (heel het programma):**

![](../.gitbook/assets/pokemon.gif)
