# Labo 6 - Async en fetch

### Oefening: Bitcoin

Maak een nieuw project `bitcoin` waarin je jouw bronbestanden voor deze oefening kan plaatsen.

Gebruik de bitcoin api van coindesk om de prijs van bitcoin in euro op te vragen en deze op het scherm te tonen in EUR, USD en GBP.

{% embed url="https://api.coindesk.com/v1/bpi/currentprice.json" %}

**Verwachte output:**

```
The current price of bitcoin is 47,118.754 EUR
The current price of bitcoin is 51,027.9 USD
The current price of bitcoin is 40,273.719 GBP
```

### Oefening: slowSum

Maak een nieuw project aan met de naam `slowSum` waarin je jouw bronbestanden voor deze oefening kan plaatsen.

Plaats de onderstaande code in een bestand `index.ts`&#x20;

```typescript
const slowSum = (a: number, b: number) => {
    return new Promise<number>((resolve, reject) => {
        setTimeout(() => {
            resolve(a+b);
        },1000)
    });
}

const slowMult = (a: number, b: number) => {
    return new Promise<number>((resolve, reject) => {
        setTimeout(() => {
            resolve(a*b);
        },1500)
    });
}
```

Dit zijn 2 functies die een promise terug geven. Ze simuleren een trage som functie en een trage vermenigvuldigings functie.

1. Roep de `slowSum` functie aan met de getallen 1 en 5 en zorg dat ze het resultaat van deze functie op het scherm laat zien. (zie output)
2. Roep de `slowSum` functie opnieuw aan met de getallen 1 en 5 maar zorg deze keer dat na het optellen de vermenigvuldigings functie \``slowMult` wordt aangeroepen dat het resultaat vermenigvuldigd met 2 en dan op het scherm laat zien. (zie output)
3. Maak een eigen `slowDiv` functie dat een deling doet (laat deze 2000 milliseconden duren). Zorg ervoor dat als je een deling door nul doet dat je de promise afkeurt met de melding "You cannot divide by zero".
4. Roep deze functie aan met de getallen 6 en 3 en laat het resultaat op het scherm zien. (zie output)
5. Roep deze functie aan met de getallen 6 en 0 en laat de error op het scherm zien. (zie output)

**Verwachte output:**

```
➜  ts-node oefening1.ts
You cannot divide by zero
1 + 5 = 6
(6 / 3) = 2
(1 + 5) * 2 = 12
```

{% hint style="info" %}
Gebruik .then(...) om iets uit te voeren nadat de promise klaar is.
{% endhint %}

#### Uitbreiding:

Maak een kopie van het `index.ts` oefening en noem deze `index_async.ts`&#x20;

Gebruik nu **async/await** in plaats van promises.

### Oefening: fakeFetch

Maak een nieuw project aan met de naam `fakeFetch` waarin je jouw bronbestanden voor deze oefening kan plaatsen.

Vorm de onderstaande code om zodat het gebruik maakt van promises in plaats van callbacks. Daarna kan je de code omvormen zodat het gebruik maakt van **async/await** in plaats van promises.

```typescript
interface Callback {
    (n: number): void
}

const getRandom = (callback: Callback) => {
    setTimeout(() => {
        callback(Math.floor(Math.random() * 100))
    },1000);
}

getRandom((n) => {
    console.log(`The number was ${n}`);
});
```


### **Oefening: All**

Na hoeveel tijd zal deze code "done!" op het scherm tonen? Voer de code dus niet uit maar denk even zelf na.

```
const delay = (delay: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, delay);
    });
}

(async() => {
    await Promise.all([delay(1000), delay(10000), delay(15000)])
    console.log("Done!");
})();
```

### **Oefening: Cocktails**

Maak een nieuwe folder **cocktails** waarin je jouw bronbestanden voor deze oefening kan plaatsen.

Deze oefening maak je in bestand `cocktails.ts`.&#x20;

Maak gebruik van `Promise.all` om de drie volgende cocktails via de cocktail api met de volgende ids in te lezen: **11000**, **11001**, **11002** en vervolgens de naam van de drie cocktails op het scherm te laten zien.

Je kan een cocktail via een id via de volgende api call binnenhalen:

```
https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11000
```

**Verwachte output:**

```
Mojito
Old Fashioned
Long Island Tea
```