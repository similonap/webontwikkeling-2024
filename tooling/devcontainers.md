# Devcontainers

{% embed url="https://www.youtube.com/watch?v=Z7bCqFxC5cM" %}

{% hint style="danger" %}
In het filmpje wordt er gebruik gemaakt van `wsl --install` om wsl te installeren. Gebruik in de plaats `wsl --install --no-distribution` want anders zal deze ook Ubuntu installeren.
{% endhint %}

## Dev Environment

Een Dev Environment is simpelweg een systeem waar alle software, tools en hardware op geïnstalleerd zijn, zodat jij kunt programmeren aan een specifiek project. Met software en tools wordt echt alles bedoeld dat je gebruikt tijdens het programmeren:

* Code Editors (bv. VS Code of Visual Studio)
* Plugins (bv. een Markdown extension in VS Code)
* Compilers (bv. de .NET compiler voor C#)
* Sandbox omgevingen (bv. NodeJS)
* ...

Meestal heb je op één toestel meerdere Dev Environments geïnstalleerd. Het is nu eenmaal niet praktisch om rond te lopen met 5 laptops...

## Dev Environment Problemen

Een Dev Environment is dus vaak een complex systeem van allerlei software, tools en specifieke instellingen die samenwerken om een stuk software te ontwikkelen. Wat kan er allemaal misgaan?

**Oh Nee, mijn Laptop is Kapot!**

Je laptop gaat stuk, en je koopt een nieuwe. Nu moet je ALLE software en tools opnieuw installeren. Niet alleen dat, maar je zult er ook op moeten letten dat je EXACT dezelfde versie van die software en tools terug installeert! Weet jij nog of je versie 18.17.1 of versie 17.9.2 had geïnstalleerd op je laptop?

**Oh Nee, een Groepswerk!**

Je moet samenwerken met iemand anders. Het project werkt perfect op jouw Dev Environment, maar wilt om één of andere reden niet draaien op die van je teamgenoot. Tijd om ELKE tool en software die je gebruikt na te kijken op versie nummer!

**Oh Nee, een Oud Project Werkt Niet Meer!**

Voor je nieuwste projecten heb je NodeJS geupdate naar de nieuwste versie. Oeps! Nu werken je oude projecten, die gebruik maakten van een oude versie van NodeJS, niet meer!

**Deployment Hell**

Alles werkt perfect op jouw systeem, en ook op die van je teamgenoten. Maar tijdens het deployen naar de server, merk je dat je software niet werkt. Tijd om ELKE tool en software die je gebruikt (opnieuw) na te kijken op versie nummer!

## Docker to the Rescue!

We kunnen een Docker Container zo samenstellen dat alle tools en instellingen daarin geïnstalleerd staan. Je installeert niets meer op je eigen systeem, alles zit netjes verpakt in een Docker Container! Zo'n Docker Container waarin je je Dev Environment opslaat voor één specifiek project, dàt heet een DevContainer.

### Wat Heb je Nodig?

Je hebt in feite slechts 3 programma's nodig op je computer:

* Git
* Docker Desktop\*
* Visual Studio Code&#x20;

_\*Om Docker te laten werken moet je WSL geïnstalleerd hebben op je Windows computer. Dus in principe moet je 3 dingen installeren._

## Devcontainers (1st time setup)

### Installation

#### install WSL

Open Powershell **als administrator**.

Gebruik het volgende commando om na te kijken of je WSL hebt geinstalleerd, en zo ja, welke versie.

```
wsl --version
```

Als WSL geinstalleerd is, zou je output moeten krijgen zoals deze (versie nummers kunnen verschillen).

```
WSL version: 2.0.14.0
Kernel version: 5.15.133.1-1
WSLg version: 1.0.59
MSRDC version: 1.2.4677
Direct3D version: 1.611.1-81528511
DXCore version: 10.0.25131.1002-220531-1700.rs-onecore-base2-hyp
Windows version: 10.0.22621.3007
```

Indien WSL dus geinstalleerd is, kan je WSL updaten met het volgende command:

```
wsl --update
```

**Als je WSL&#x20;**_**NIET**_**&#x20;geinstalleerd hebt, dan installeer je WSL met het volgende commando:**

```
wsl --install
```

Meer informatie vind je op:[ https://learn.microsoft.com/en-us/windows/wsl/install](https://learn.microsoft.com/en-us/windows/wsl/install)

#### Install Docker Desktop

Ga naar [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

Download het installie-programma en voer het programma uit.

#### Install Git

Ga naar [https://git-scm.com/downloads](https://git-scm.com/downloads)

Download het installie-programma en voer het programma uit.

#### Install Visual Studio Code

Ga naar [https://code.visualstudio.com/](https://code.visualstudio.com/)

Download het installie-programma en voer het programma uit.

#### Install the VS Code Extensions

Open Visual Studio Code.

Open de Extensions tab vanuit de Sidebar.

Zoek naar het "Remote Development" extension pack van Microsoft. [https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)

Dit installeert 4 extensies in VS Code die je helpen met ontwikkeling in DevContainers.

### Starting a DevContainer from a Github Repo

Maak een nieuwe Github Repo (tijdens onze lessen gebruik je de Github url op Digitap) of gebruik een bestaande Github Repo.

* [ ] Kopieer de HTTPS Git URL (vanuit de groene "Code" knop op de repo pagina).
* [ ] Open VS Code.
* [ ] Open het Command Pallette (CTRL + SHIFT + P)
* [ ] Zoek naar het command "Dev Containers: Clone Repository in Container Volume..."
* [ ] Druk Enter
* [ ] Plak de HTTPS Git URL die je kopieerde vanuit je Github Repo
* [ ] Druk Enter

Als je Github Repo reeds een Devcontainer gebruikte (meestal een `devcontainer.json` bestand in een mapje genaamd `.devcontainer`), zal de devcontainer nu gestart worden. **De eerste keer zal een tijdje duren**, want Docker moet alle nodige bestanden downloaden.

Als je Github Repo nog geen Devcontainer gebruikte, zal VS Code je een aantal vragen stellen:

* [ ] Wat voor omgeving je wilt opzetten:
  * e.g. typescript & Node, Python, C#, ...
* [ ] Welke versie van die omgeving je wilt gebruiken:
  * e.g. The version of Node
* [ ] Welke extra tools je wilt gebruiken in je omgeving:
  * e.g. Angular CLI, database tools, ...
* [ ] Welke versie van die tools je wilt gebruiken.

Wanneer je alle vragen hebt beantwoord, wordt het `devcontainer.json` bestand aangemaakt en wordt de devcontainer opgestart.

### Trouble Shooting

#### WSL versie is niet up-to-date

Als je de DevContainer probeert te openen, maar je krijgt een foutmelding dat je WSL versie niet up-to-date is, dan moet je WSL updaten. Dit kan je doen door het volgende stappenplan te volgen:

* Open Powershell als administrator (rechtermuisknop op het Powershell icoontje, en kies voor Run as Administrator)
* Voer de volgende commando's uit:

```
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
wsl --set-default-version 2
wsl --update
```

* Hierna kan je best je computer herstarten om zeker te zijn dat alles goed werkt.
