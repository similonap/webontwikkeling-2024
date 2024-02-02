# Terminal en Bash

Bash, een afkorting voor Bourne Again SHell, is een veelgebruikte command-line interface (CLI) of terminal op Linux en Unix-achtige besturingssystemen. Devcontainers gebruiken standaard een bash shell.

Wat we vooral willen bereiken met dit onderdeel dat je vlot de basiscommando's van bash kan gebruiken om je weg te vinden in een mappen structuur, bestanden kan aanmaken, verwijderen, kopiëren, verplaatsen, ... 

## Terminal

### Open een terminal

Om een nieuwe terminal te openen in visual studio code klik je op `Terminal` in de menubalk en vervolgens op `New Terminal`. Dit opent een nieuwe terminal in de onderkant van je scherm. 

![Alt text](../.gitbook/assets/newterminal.png)

Merk op dat je zelfs al werk je in windows je een bash terminal krijgt en nergens iets van een C schijf of dergelijke ziet. Dit komt omdat je in een devcontainer werkt. 

Even de structuur van de terminal uitleggen. De prompt is het stukje tekst dat je ziet voor je cursor. In de afbeelding hierboven is dat `node ➜ /workspaces/Deel1-Node-en-Typescript (main)`:
- `node` is de naam van de gebruiker. Dit is standaard in een nodejs devcontainer, je mag dit negeren.
- `➜` is een pijltje dat je mag negeren.
- `/workspaces/Deel1-Node-en-Typescript` is de huidige map waarin je zit. Dit is de map waarin je terminal opent.
- `(main)` is de naam van de branch waarin je zit in de git repository.
- `$` is de prompt zelf. Dit is een teken dat je commando's kan beginnen typen.
- De cursor is het knipperende streepje dat aangeeft waar je tekst zal verschijnen als je begint te typen.

### Open in Integrated Terminal

Je kan ook een terminal openen in een specifieke map door eerst naar de map te navigeren in de file explorer en dan rechts te klikken en te kiezen voor `Open in Integrated Terminal`.

![Alt text](../.gitbook/assets/openintegrated.png)

Omdat we hier de terminal openen in de `folder` directory, zal de terminal ook openen in die map.

![Alt text](../.gitbook/assets/open_in_terminal.png)

