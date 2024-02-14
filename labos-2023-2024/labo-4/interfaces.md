# Interfaces

### Recepten

Maak een nieuw project aan met de naam `recepten`.

Je maakt eerst een interface voor het \`Recept\`\` object. Dit bevat een

* naam (tekst)
* beschrijving (tekst)
* personen (getal)
* ingredienten (array van ingredienten)

voor de ingredienten maak je een interface `Ingredient`. Dit bevat een

* naam (tekst)
* hoeveelheid (tekst) (bv "1 stuk", "1 kg")
* prijs (number)

Maak nu een object aan voor een lasagne recept. Je kan de ingredienten zelf kiezen. Print het recept af en bereken de totale kostprijs van het recept.

#### Voorbeeld interactie

```bash
Recept: Lasagne
Beschrijving: Lekkere lasagne
Personen: 4
Ingredienten:
- 1 pak lasagnevellen
- 500g gehakt
- 1 ui
- 1 teentje look
Totale kostprijs: 10 euro
```

### Movies

Maak een nieuw project aan met de naam `movies`.

Maak een JSON bestand `movie.json` met de volgende inhoud:

```json
{
    "title": "The Matrix",
    "year": 1999,
    "actors": ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    "metascore": 73,
    "seen": true
}
```

Maak een interface voor het bovenstaande Movie object en lees het in aan de hand van een `import` statement. Ken deze toe aan een variabele `movie` en print deze af.

Maak een tweede variable aan myfavoritemovie van het type Movie en geef die een object mee die de info over jouw favoriete film bevat en print deze af.

Maak een derde variable aan myworstmovie van het type Movie en geef die een object mee die de info over jouw meest gehate film bevat en print deze af.

#### Voorbeeld interactie

```bash
Movie from file:
The Matrix (1999)
Actors: Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss
Metascore: 73
Seen: NO

My favorite movie:
The Shawshank Redemption (1994)
Actors: Tim Robbins, Morgan Freeman, Bob Gunton
Metascore: 80
Seen: YES

My worst movie:
The Room (2003)
Actors: Tommy Wiseau, Juliette Danielle, Greg Sestero
Metascore: 9
Seen: YES
```

### Todo list

Maak een nieuw project met de naam `todo-list`. Gebruik de vorige todo list als basis.

Je maakt eerst een interface voor het `Todo` object. Dit bevat een&#x20;

* id (number)&#x20;
* title (string)&#x20;
* completed (boolean)

Bij het opstarten van het programma laad je de todos in vanuit een bestand `todos.json`.

{% file src="../../.gitbook/assets/todos.json" %}

Voor de rest moet de functionaliteit hetzelfde zijn als de vorige todo list maar deze keer gebruik je geen 2 arrays van strings meer maar een array van `Todo` objecten.
