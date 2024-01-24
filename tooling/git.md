# Git 

## Wat is versiebeheer?

Als je nog nooit met versiebeheer gewerkt hebt, kan het moeilijk zijn om je een goed beeld te vormen van hoe alle puzzelstukjes van Git in elkaar passen. Laat ons het dus eerst even hebben over wat Git precies is, voor we het leren gebruiken.

Git is een systeem voor versiebeheer, dat wil zeggen een systeem om oudere versies van je project op een ordelijke manier bij te houden. Als je geen oude versies bijhoudt, riskeer je belangrijke code te verliezen (bv. als je in een nieuwe versie een kritieke bug vindt die er in een oude versie niet was). Je kan klassieke backups maken door regelmatig al je code te zippen, maar voor je het weet, heb je enorm veel schijfruimte verbruikt of weet je niet meer in welk bestand de interessantste aanpassingen gebeurd zijn. Met een goed systeem voor versiebeheer gaat dat soort werk veel efficiënter.

Meestal bestaat dat project dat je met een versiebeheersysteem beheert uit code, maar dat hoeft niet. Je kan er vanalles mee bijhouden, van tekeningen in Illustrator tot recepten. Zelfs data in die je niet kan voorstellen als leesbare tekst is mogelijk, bijvoorbeeld audiobestanden, maar versiebeheersystemen komen het best tot hun recht als de data in een tekstformaat staat.

Je kan git versie beheer volledig lokaal doen, maar in de meeste gevallen zal je een remote repository gebruiken. Dat is een server waar je je code op plaatst, zodat je er vanop verschillende computers aan kan werken. Je kan je code dan ook delen met anderen, zodat zij er aan kunnen werken. Dat is handig als je met meerdere mensen aan een project werkt, maar ook als je je code wil delen met de wereld. Github is een van de bekendste websites waar je zo'n remote repository kan aanmaken.

## Installatie git op Windows

Ga naar de officiële Git-website git-scm.com en download de laatste versie van Git voor Windows. Dit bestand is een uitvoerbaar (.exe) bestand.

Volg de instructies van de installatie wizard. De standaardinstellingen zijn prima. Zorg er zeker voor dat je ook `Git Bash` installeert. Dit is een command line interface (CLI) die je toelaat om git commando's uit te voeren.

Nadat je de installatie hebt voltooid, kan je `git bash` openen door in het start menu te zoeken naar `git bash`. Je kan ook rechtsklikken in een map en kiezen voor `Git Bash Here`. Dit opent een command line interface in de map waarin je rechtsklikte. Dit is handig om git commando's uit te voeren in de juiste map.

## Git configureren

Git heeft een aantal instellingen die je kan aanpassen. Je kan dit doen via de command line interface. Open `git bash` en voer de volgende commando's uit:

```bash
git config --global user.name "Jouw Naam"
git config --global user.email "Jouw Email"
```

Vervang `Jouw Naam` en `Jouw Email` door je eigen naam en email adres. Deze gegevens worden gebruikt om je commits te identificeren. Je kan ook nog andere instellingen aanpassen, maar dat is niet nodig voor deze cursus.

## Git gebruiken

Git is een command line tool. Dat wil zeggen dat je het gebruikt door commando's in te typen in een command line interface. Het is op dit moment nog niet nodig om alle commando's te kennen. We zullen enkel de commando's gebruiken die nodig zijn om de oefeningen te maken. De belangrijkste commando's zijn: