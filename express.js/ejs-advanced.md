# EJS Advanced

{% hint style="danger" %}
In EJS bestanden kan je geen TypeScript types gebruiken. Let hier zeker op dat je enkel aan de controller kant TypeScript kan gebruiken.
{% endhint %}

Om een variabel te tonen in een EJS template gebruiken we volgende notatie:

```markup
<%= variable_name %>
```

{% hint style="info" %}
Alles wat tussen <% %> staat, wordt door de EJS view engine geparsed. Wanneer <%= gebruikt wordt, zal de waarde de variabel naar de finale HTML render gestuurd worden.
{% endhint %}

We kunnen zo elke JavaScipt object raadplegen:

```markup
<%= name %>
<%= person.name %>
<%= people[0] %>
...
```

EJS laat ons toe JavaScript te gebruiken om meer controle te hebben over de dynamische inhoud van het template. Tussen <% %> kunnen we JavaScript plaatsen:

```markup
<% 
    let firstName = "John";
    let lastName = "Smith";
    let age = Math.random() * 100;
%>
```

Deze code zal uitgevoerd worden tijdens het parsen van de EJS file. De variabelen hier zijn ook aanspreekbaar in de rest van het template:

```markup
<% 
    let firstName = "John";
    let lastName = "Smith";
    let age = Math.random() * 100;
%>

<h1>Hi</h1>
<p>
    My name is <%= firstName %> <%= lastName %> 
    and I'm <%= age %> years old.
</p>
```

Zo kan je bv. ook een loop toevoegen. Merk op dat we <% %> gebruiken om JavaScript uit te voeren. <%= %> zal de waarde van de statement omzetten naar tekst. Daarom gebruiken we <% voor de for loop en <%= wanneer we i willen tonen.

```markup
<% for(let i=1; i<10;i++) {%>
    <%= i %>
<% }; %>
```

{% hint style="danger" %}
Let op de haakjes. Op lijn 1 openen we het haakje {. We moeten dit haakje dus ook sluiten. Dit doen we op lijn 3.&#x20;
{% endhint %}

Laten we loopen over een array met forEach. Hiervoor hebben we een functie nodig die iets met de output doet. In JavaScript/TypeScript (zonder EJS) zouden we dit zo doen:

```typescript
let names = ['george','geoff','jane'];
names.forEach( name => {
    //do something with name
}); 
```

Lijn 3 zou onze output moeten zijn naar EJS. Daar gaan we dus <%= voor moeten gebruiken. De andere lijnen moeten uitgevoerd worden en plaatsen we tussen <% %>.

Dit wordt dus:

```javascript
<% 
    let names = ['george','geoff','jane'];
    names.forEach( name => {
%>
    <%= name %>
<% 
    }); 
%>
```

<%= zal de waarde rechtstreeks omzetten naar een correcte string. Ze zal dus geen rekening houden met HTML tags. Probeer de volgende EJS code:

```markup
<% 
    let names = ['george','geoff','jane'];
    names.forEach( t => {
%>
    <%= '<strong>' + t + '</strong><br/>' %>
<% 
    }); 
%>
```

De output zal zijn:

```markup
<strong>george</strong><br/> <strong>geoff</strong><br/> <strong>jane</strong><br/>
```

Er wordt geen rekening met de tags gehouden, deze worden als strings gerenderd client side.

Door gebruik te maken van <%- ipv <%= wordt wel rekening gehouden met de tags:

```markup
<% 
    let names = ['george','geoff','jane'];
    names.forEach( t => {
%>
    <%- '<strong>' + t + '</strong><br/>' %>
<% 
    }); 
%>
```

{% hint style="info" %}
* <% %> voert JavaScript code uit
* <%= %> geeft de waarde terug als string (HTML Escaped, maw tags zichtbaar client-side
* <%- %> geeft d waarde terug en laat HTML toe
{% endhint %}

Je kan <%- ook gebruiken om andere templates te importeren. Bv. als je een header en/of footer template wil toevoegen:

```markup
<%- include('header'); %>
```
