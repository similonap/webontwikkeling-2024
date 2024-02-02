# Node Client

## Data

We gaan in dit vak later een json bestand nodig hebben dat we gaan gebruiken als basis van een API. Iedereen mag zelf beslissen welke soort data hij/zij in het bestand steekt. Het is wel belangrijk dat het bestand aan een aantal voorwaarden voldoet:

* Het bestand moet een array van objecten bevatten (minimum 10).
* Elk object moet minstens de volgende soort properties bevatten :
* Een id property met een unieke waarde.
* Property met een korte string als waarde: Dit kan bijvoorbeeld een naam zijn.
* Property met een lange string als waarde: Dit kan bijvoorbeeld een beschrijving zijn.
* Property met een number als waarde: Dit kan bijvoorbeeld de leeftijd zijn.
* Property met een boolean als waarde: Dit kan aangeven of iemand bijvoorbeeld een actieve status heeft.
* Property met een datum als waarde: Dit kan de geboortedatum zijn.
* Property met een image URL als waarde: Dit kan de URL van een profielfoto zijn.
* Property waarvan de waarde een string is met een beperkt aantal mogelijke waarden.
* Property met een array van strings als waarde: Dit kunnen bijvoorbeeld hobby's zijn.
* Property met een ander object als waarde. Dit object moet op zijn beurt ook een aantal properties bevatten
  * Een id met een unieke waarde
  * Een aantal properties (mogen string, booleans, numbers, image url, ...)
  * Dit object is afkomstig van een 2de json bestand.&#x20;

Let op dat dit een minimale vereiste is. Je mag gerust meer properties toevoegen als dat nodig is voor je idee.

**Voorbeelden:**

**Fantasy Card Game**

{% code title="cards.json" %}
```json
[
  {
    "id": "FTC-001",
    "name": "Aether Knight",
    "description": "A legendary knight who harnesses the ethereal powers of the Aether, wielding them to maintain balance across the realms.",
    "age": 457,
    "isActive": true,
    "birthDate": "1567-03-05",
    "imageUrl": "https://example.com/images/aether-knight.jpg",
    "rarity": "Legendary",
    "abilities": ["Teleportation", "Energy Manipulation", "Dimensional Travel"],
    "element": "Aether",
    "guildAffiliation": {
      "id": "GUILD-009",
      "name": "Order of the Cosmic Veil",
      "guildMaster": "Celestial Mage",
      "guildEmblemUrl": "https://example.com/images/guilds/cosmic-veil-emblem.jpg",
      "foundedYear": 1423,
      "motto": "Balance in All, All in Balance"
    }
  },
  ...
]
```
{% endcode %}

{% code title="guilds.json" %}
```json
[
  {
        "id": "GUILD-009",
        "name": "Order of the Cosmic Veil",
        "guildMaster": "Celestial Mage",
        "guildEmblemUrl": "https://example.com/images/guilds/cosmic-veil-emblem.jpg",
        "foundedYear": 1423,
        "motto": "Balance in All, All in Balance"
},
...
]
```
{% endcode %}
