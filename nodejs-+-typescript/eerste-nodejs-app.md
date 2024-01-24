# Eerste NodeJS App

Nu we onze basis ontwikkelomgeving hebben omgezet gaan we nu eens onze eerste JavaScript programma bouwen. Je leest het goed, we bouwen eerst een JavaScript programma en niet een TypeScript programma.&#x20;

### Hello JavaScript

Maak eerst een nieuwe directory `HelloWorld` en open Visual Studio Code in deze directrory. Maak vervolgens een bestand `helloWorld.js` aan met de volgende inhoud:

```javascript
console.log("Hello World");
```

Dit programma bestaat uit één JavaScript-statement. Statements kunt u beschouwen als de opdrachten aan de JavaScript-runtime (in dit geval node.js). Het `console.log` statement zorgt ervoor dat er tekst op het scherm wordt getoond. Statements worden net zoals in C# afgesloten met een `;`&#x20;

{% hint style="info" %}
JavaScript is minder kieskeurig dan C#, de puntkomma mag u weg laten zonder dat JavaScript daar een probleem van maakt. Voor de duidelijkheid is het echter wel aan te bevelen de puntkomma toch te gebruiken, al was het alleen maar om slechte gewoonten te voorkomen als u ook regelmatig in een andere taal programmeert.
{% endhint %}

Het uitvoeren van dit programma gaan we aan de hand van het `node` commando doen in onze terminal. Open eerst je terminal in de directory waar je `helloWorld.js` bestand zich bevind. Je kan een terminal venster openen op de locatie waar je bestand zich bevind door rechtermuisknop te klikken op het bestand en dan `open in integrated terminal` te klikken.&#x20;

Vervolgens voer je het `helloWorld` programma uit door

```
node helloWorld.js
```

uit te voeren.

### Hello TypeScript

TypeScript kan niet zoals JavaScript rechtstreeks uitgevoerd worden door node.js. De code moet altijd eerst nog omgevormd worden naar JavaScript voordat de node runtime deze kan begrijpen en uitvoeren. Eerst maken we de TypeScript versie van ons programma hierboven. Maak een bestand aan genaamd `helloTypeScript.ts` en plaats daar de volgende inhoud in:

```typescript
console.log("Hello TypeScript");
```

Je merkt waarschijnlijk direct op: "Deze code is identiek hetzelfde als de vorige". Dat klopt. Op dit moment is er nog geen verschil tussen JavaScript en TypeScript. Ze hebben dezelfde statements, de syntax is hetzelfde en elke statement moet gevolgd worden door een `;` Het verschil zal pas duidelijk worden als we variabelen en types gaan introduceren. Op het moment is dus de TypeScript code identiek aan de JavaScript code, maar toch kan onze JavaScript runtime deze niet uitvoeren:

Hiervoor moeten we de `TypeScript Compiler` gebruiken om dit bestand om te zetten. Vooraleer we Typescript kunnen gebruiken in ons project moeten we via onze terminal de volgende commando's uitvoeren

```
npm install -g typescript
```

Deze bovenstaande commando's moet je maar 1 keer doen op jouw machine.

{% hint style="info" %}
Indien je gebruik maakt van devcontainers moet je typescript en ts-node niet meer globaal installeren. Normaal gezien zijn deze al voorgeinstalleerd in je container.
{% endhint %}

Bij elk nieuw project moet je wel &#x20;

```
tsc --init
npm install @types/node
```

uitvoeren

We zien later nog wat deze commando's in detail doen.&#x20;

Nu kan je via het `tsc` (TypeScript compiler) je TypeScript programma omzetten naar JavaScript.

```
tsc helloTypeScript.ts
```

Dit zal een nieuw bestand `helloTypeScript.js` aanmaken dat je wel via node kan uitvoeren. Merk weeral op dat momenteel de code die hier wordt aangemaakt nog altijd identiek hetzelfde is bij JavaScript en TypeScript.

### ts-node

Je merkt waarschijnlijk op dat deze manier van werken soms wat omslachtig is. Als je elke keer de code moet compileren naar JavaScript zal je veel tijd verliezen. Daarom is er een aparte versie van `node` gemaakt die automatisch het compileren op zich zal nemen.&#x20;

Je moet deze installeren door een keer&#x20;

```
npm install -g ts-node
```

uit te voeren. Daarna moet je deze stap op jouw machine niet meer uitvoeren.&#x20;

Nu kan je simpelweg je programma uitvoeren door

```
ts-node helloTypeScript.ts
```

in je terminal in te voeren.

![](broken-reference)

### Samengevat

**Commando's die je maar 1 keer moet uitvoeren op je computer:**

|                                                    |                                                                                            |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| <pre><code>npm install -g typescript
</code></pre> | Installeert de typescript compiler op jouw computer.                                       |
| <pre><code>npm install -g ts-node
</code></pre>    | Installeert een tool die het mogelijk maakt om rechtstreeks typescript code uit te voeren. |
|                                                    |                                                                                            |

**Commando's die je voor elk nieuwe project (of labo) moet uitvoeren:**

|                                                      |                                                                                       |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------- |
| <pre><code>tsc --init
</code></pre>                  | Maakt een nieuw tsconfig bestand aan. Het initialiseert een nieuw typescript project. |
| <pre><code>npm install @types/node
</code></pre>     | Installeert alle types die nodig zijn om met typescript en node js te werken.         |
| <pre><code>ts-node &#x3C;naam file>.ts
</code></pre> | Voert het programma uit dat je geschreven hebt in \<naam file>.ts                     |

