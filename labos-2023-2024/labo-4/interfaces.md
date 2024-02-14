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

### Persoon

Maak een nieuw project aan met de naam `persoon`.

Maak een **persoon.json** bestand aan met volgende data:

```
{
  "voornaam": "Jurgen",
  "achternaam": "Vervoort",
  "leeftijd": 27,
  "gemeente": "Heist-op-den-Berg",
  "straat": "Bergstraat",
  "huisnummer": "17c",
  "postcode": 2220,
  "hobbies": ["voetbal", "tafeltennis", "vissen"]
}
```

1. Maak een interface aan voor het object persoon.&#x20;
2. Lees het _persoon.json_ bestand in
3. Toon de naam en de hobbies op de console

**Voorbeeldinteractie**

```
Jurgen Vervoort
- voetbal
- tafeltennis
- vissen
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
