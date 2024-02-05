# Labo 2

## Theorie

Bekijk voor het labo aan te vangen eerst de volgende topics:

* [Wat is NodeJS](../nodejs-+-typescript/wat-is-nodejs.md)
* [Waarom TypeScript?](../nodejs-+-typescript/waarom-typescript.md)
* [Eerste NodeJS App](../nodejs-+-typescript/projectmaken.md)
* [Input Lezen](../nodejs-+-typescript/input-lezen.md) (nog geen menu)
* [Basis types](../nodejs-+-typescript/type-systeem/basic-types.md) (enkel string, number en boolean)

## Oefeningen

De meeste oefeningen hieronder zijn sterk gebaseerd op de oefeningen die je hebt gemaakt in de cursus webtechnologie. Je kan deze oefeningen gebruiken als basis voor de oefeningen hieronder. Het belangrijkste verschil hier is dat je nu gebruik zal maken van NodeJS en TypeScript. Let er dus op dat alle variabelen types hebben en dat je de juiste types gebruikt.

### Voorbereiding

Maak een nieuwe directory `labo2` aan in de root van je project.

### Hello, Name!

Maak een nieuw project aan in de `labo2` directory met de naam `hello-name` en installeer de readline-sync module.

We willen een programma maken dat de naam van de gebruiker vraagt en vervolgens "Hello, <name>!" toont. 

```
What's your name? Andie
Hello, Andie!
```

### BMI Calculator

Maak een nieuw project aan in de `labo2` directory met de naam `bmi-calculator`.

We gaan in deze oefening een BMI calculator maken. De gebruiker zal zijn gewicht en lengte moeten ingeven en de applicatie zal de BMI berekenen en tonen.

$$
BMI = \frac{gewicht}{lengte^2}
$$

Het gewicht wordt ingegeven in kilogram en de lengte in meter.

#### Voorbeeld interactie

De gebruiker zal zijn gewicht en lengte moeten ingeven. Dit kan je doen door gebruik te maken van de `readline` module. Deze module laat toe om input te lezen van de gebruiker.

```bash
Geef je gewicht in (in kg): 80
Geef je lengte in (in m): 1.80
Je BMI is 24.69
```

Zorg ervoor dat je de BMI afrondt op 2 cijfers na de komma.

### BMI Calculator voor meerdere personen

Maak een nieuw project aan in de `labo2` directory met de naam `bmi-calculator-multi`.

We gaan de applicatie uitbreiden zodat we de BMI van meerdere personen kunnen berekenen. De gebruiker zal een lijst van personen moeten ingeven. Voor elke persoon zal hij zijn gewicht en lengte moeten ingeven. De applicatie zal vervolgens de BMI van elke persoon berekenen en tonen.

#### Voorbeeld interactie

```bash
Geef het aantal personen in: 2
Geef de naam van persoon 1 in: Jan
Geef het gewicht van Jan in (in kg): 80
Geef de lengte van Jan in (in m): 1.80
Jan heeft een BMI van 24.69
Geef de naam van persoon 2 in: Piet
Geef het gewicht van Piet in (in kg): 90
Geef de lengte van Piet in (in m): 1.75
Piet heeft een BMI van 29.39
```

### Interest Calculator

Maak een nieuw project aan in de `labo2` directory met de naam `interest-calculator`.

We gaan in deze oefening een interest calculator maken. De gebruiker zal een bedrag en een interest percentage moeten ingeven. De applicatie zal vervolgens het bedrag na 1 jaar, 2 jaar en 5 jaar tonen.

Het totaal bedrag kan berekend worden met de volgende formule:

$$
Totaal = bedrag \times (1 + \frac{interest}{100})^jaren
$$

#### Voorbeeld interactie

```bash
Geef het bedrag in: 1000
Geef het interest percentage in: 5
Na 1 jaar heb je 1050
Na 2 jaar heb je 1102.5
Na 5 jaar heb je 1276.28
```

### Uren en minuten

Maak een nieuw project aan in de `labo2` directory met de naam `uren-en-minuten`.

We gaan in deze oefening een programma maken dat een aantal minuten moet omzetten naar uren en minuten. De gebruiker zal een aantal minuten moeten ingeven en de applicatie zal vervolgens het aantal uren en minuten tonen.

Je kan dit doen door gebruik te maken van de modulo operator. Deze operator geeft de rest van een deling terug.

#### Voorbeeld interactie

```bash
Geef het aantal minuten in: 150
Dit is 2 uur en 30 minuten
```

### Wisselgeld

Maak een nieuw project aan in de `labo2` directory met de naam `wisselgeld`.

We gaan in deze oefening een programma maken dat een bedrag moet omzetten naar het kleinste aantal briefjes en munten. De gebruiker zal een bedrag moeten ingeven en de applicatie zal vervolgens het aantal briefjes en munten tonen.

Je kan dit doen door gebruik te maken van de modulo operator. Deze operator geeft de rest van een deling terug.

#### Voorbeeld interactie

```bash
Geef het bedrag in: 123
Dit is 1 briefje van 100, 1 briefje van 20, 1 munt van 2 en 1 munt van 1
```

### Name from email

Maak een nieuw project aan in de `labo2` directory met de naam `name-from-email`.

We gaan in deze oefening een programma maken dat de naam van een email adres moet tonen. De gebruiker zal een email adres moeten ingeven en de applicatie zal vervolgens de naam tonen. De naam wordt hierbij als volgt geformatteerd: `<eerste (hoofd)letter van voornaam>. <achternaam>`.

Je mag er van uitgaan dat het email adres altijd correct ingegeven wordt. Vervolgens zal de applicatie vragen of de gebruiker nog een email adres wil ingeven (adhv `keyInYNStrict`).

#### Voorbeeld interactie

```bash
Geef het email adres in: andie.similon@ap.be
De naam is A. Similon
Wil je nog een email adres ingeven? (y/n) y
Geef het email adres in: sven.maes@ap.be
De naam is S. Maes
Wil je nog een email adres ingeven? (y/n) n
Nog een goede dag!
```

### Text-box

Maak een nieuw project aan in de `labo2` directory met de naam `text-box`.

We gaan in deze oefening een programma maken dat een tekst moet tonen in een text-box. De gebruiker zal een tekst moeten ingeven en de applicatie zal vervolgens de tekst tonen in een text-box. Hij zal de gebruiker blijven vragen om een tekst in te geven tot de gebruiker een lege tekst ingeeft.

Je kan dit doen door gebruik te maken van de `console.log` functie en de `repeat` functie van een string.

#### Voorbeeld interactie

```bash
Geef de tekst in: Hello World
+-------------+
| Hello World |
+-------------+
Geef de tekst in: Hey broer
+-----------+
| Hey broer |
+-----------+
Geef de tekst in: 
Tot ziens!
```
