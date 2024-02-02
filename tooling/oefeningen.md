# Oefening

## Devcontainer opzetten

- Je kan de volgende invite link gebruiken om de repository te clonen: [Github Classroom](https://classroom.github.com/a/ml4mFUyT)
- Open visual studio code
- Volg de instructies in de [Devcontainers](tooling/devcontainers.md) sectie om een devcontainer op te zetten.

## Git en Terminal

- Pas het `README.md` bestand aan en vervang de content met je eigen naam en je AP email adres.
- Gebruik het commando `git add` om je wijzigingen toe te voegen aan de staging area.
- Gebruik het commando `git commit` om je wijzigingen te committen. Geef je commit een zinvolle boodschap.
- Gebruik het commando `git push` om je wijzigingen naar de remote repository te pushen.
- Ga na of je wijzigingen zichtbaar zijn door via de browser naar de repository te gaan.
- Maak een nieuwe map `labos` in de root van je project. Dit moet je aan de hand van de terminal doen. Ga vervolgens naar de map `labos` in de terminal.
- Maak een nieuwe map `tooling` in de map `labos` en ga naar de map `tooling` in de terminal.
- Maak een nieuw bestand `oefeningen.md` aan in de map `tooling` en open het bestand in visual studio code.
- Maak een wijziging in het bestand en voeg vervolgens alle wijzigingen toe aan de staging area, commit en push ze naar de remote repository.

## Voorbereiding project

We gaan in dit vak later een json bestand nodig hebben dat we gaan gebruiken als basis van een API. Iedereen mag zelf beslissen welke soort data hij/zij in het bestand steekt. Het is wel belangrijk dat het bestand aan een aantal voorwaarden voldoet:

- Het bestand moet een array van objecten bevatten (minimum 10).
- Elk object moet minstens de volgende soort properties bevatten :
- Een id property met een unieke waarde.
- Property met een korte string als waarde: Dit kan bijvoorbeeld een naam zijn.
- Property met een lange string als waarde: Dit kan bijvoorbeeld een beschrijving zijn.
- Property met een number als waarde: Dit kan bijvoorbeeld de leeftijd zijn.
- Property met een boolean als waarde: Dit kan aangeven of iemand bijvoorbeeld een actieve status heeft.
- Property met een datum als waarde: Dit kan de geboortedatum zijn.
- Property met een image URL als waarde: Dit kan de URL van een profielfoto zijn.
- Property waarvan de waarde een string is met een beperkt aantal mogelijke waarden.
- Property met een array van strings als waarde: Dit kunnen bijvoorbeeld hobby's zijn.
- Property met een ander object als waarde. Dit object moet op zijn beurt ook een aantal properties bevatten, vooral een id property. Die id verwijst naar een ander object in een andere array die we later gaan maken.
- Property met een array van objecten als waarde. Dit object moet ook een aantal properties bevatten, vooral een id property. Die id verwijst naar een ander object in een andere array die we later gaan maken.

Let op dat dit een minimale vereiste is. Je mag gerust meer properties toevoegen als dat nodig is voor je idee.

Een voorbeeld van een object in het bestand kan er als volgt uitzien:

```json
{
    "id": 3,
    "name": "Shadow Assassin",
    "description": "Een kaart die de sluipende stilte en dodelijkheid van een meesterhuurmoordenaar vastlegt.",
    "releaseYear": 2005,
    "isActive": true,
    "releaseDate": "2005-11-02",
    "imageUrl": "https://example.com/images/shadow-assassin.jpg",
    "category": "Stealth",
    "themes": ["Darkness", "Mystery", "Strategy"],
    "specialAbilities": [
        {
        "abilityId": 1,
        "name": "Invisible Strike",
        "description": "Deze aanval kan niet worden geblokkeerd of ontweken door tegenstanders."
        },
        {
        "abilityId": 2,
        "name": "Shadow Bind",
        "description": "Immobiliseert de tegenstander voor drie beurten."
        }
    ],
    "attackPoints": 3000,
    "defensePoints": 2500,
    "seriesInfo": {
        "id": "1",
        "name": "Nightfall Warriors",
        "totalCards": 135,
        "creator": "Jasper Gold",
        "originCountry": "Japan",
        "seriesDescription": "Een epische serie die de strijd tussen licht en duisternis verkent door de lens van legendarische krijgers en magische wezens."
    }
}
```

of 

```
{
    "id": 1,
    "name": "Eclipse Hunter",
    "description": "Een futuristische RPG die je meeneemt op een reis door een door oorlog verscheurde wereld, waar technologie en magie botsen.",
    "releaseYear": 2022,
    "isActive": true,
    "releaseDate": "2022-09-15",
    "imageUrl": "https://example.com/images/eclipse-hunter.jpg",
    "genre": "RPG",
    "platforms": ["PC", "Console", "Mobile"],
    "features": [
        {
            "featureId": 1,
            "name": "Dynamic World",
            "description": "De wereld past zich aan je beslissingen aan, wat resulteert in een unieke gameplay voor elke speler."
        },
        {
            "featureId": 2,
            "name": "Co-op Mode",
            "description": "Speel samen met vrienden in een uitgebreide co-op modus."
        }
    ],
    "difficultyLevel": "Medium",
    "developerInfo": {
        "id": "dev1",
        "name": "Aurora Games",
        "foundedYear": 2010,
        "founder": "Emilia Tan",
        "headquarters": "Sweden",
        "studioDescription": "Een innovatieve gamestudio die zich richt op het creëren van diepgaande en meeslepende game-ervaringen."
    }
}
```

Je kan hiervoor chatgpt gebruiken om een voorbeeld dataset te genereren. 