# Functions

## Wiskundige functies

Maak een nieuw project aan met de naam `math`.

Schrijf de volgende functies:
- `add` die twee getallen optelt
- `subtract` die twee getallen van elkaar aftrekt
- `multiply` die twee getallen met elkaar vermenigvuldigt. Zorg voor een default waarde van 1 als de tweede parameter niet meegegeven wordt.
- `divide` die twee getallen deelt. Zorg voor een default waarde van 1 als de tweede parameter niet meegegeven wordt.

Zorg dat je deze kan schrijven met het function keyword en met een arrow function.

Gebruik deze functies om de volgende berekening uit te voeren:
```
(4 + 5) * (6 - 3) / 2 = 13.5
```

Print het resultaat van de berekening af.

## Array sum

Maak een nieuw project aan met de naam `array-sum`.

Maak een nieuwe functie `sum` die de som van alle getallen in een array berekent. Gebruik hiervoor een for loop en probeer ook eens de `reduce` functie van een array.

als je de volgende array meegeeft aan de functie:

```
[1, 2, 3, 4, 5]
```

dan moet de functie 15 teruggeven want 1 + 2 + 3 + 4 + 5 = 15.

## Movies 2

Deze oefening gaat verder op de Movies oefening. 

Maak 3 functies aan en probeer deze uit:
- de functie `wasMovieMadeInThe90s`: 
  - met de parameter movie van het type Movie
  - met return waarde true als de film in de jaren 90 gemaakt is, anders false
  - print of de film The Matrix in de jaren 90 gemaakt is adhv deze functie
- de functie `averageMetaScore` 
  - met de parameter movies die een array van het type Movie bevat
  - met return waarde de gemiddelde score van alle films in die array 
  - print het gemiddelde van metascore van de 3 films adhv deze functie 
- de functie `fakeMetaScore`
  - met de parameters
    - movie van het type Movie 
    - newscore die een nieuwe score bevat
  - met return waarde een nieuw Movie object met de nieuwe score
