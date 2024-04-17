# Limit & Sort

In de onderstaande deel van de cursus gaan we dieper in op de `limit` en `sort` methodes van de MongoDB driver. We gaan er vanuit dat we een collection hebben met de naam `students`. 

```typescript
const collection : Collection<Student> = client.db("school").collection<Student>("students");
```

Zo voorkomen we dat we altijd deze regel code moeten herhalen.

## Sort 

Je kan de `sort` methode gebruiken om de resultaten van een query te sorteren. Je moet eerst een `find` query uitvoeren en dan de `sort` methode aanroepen. Je kan deze gewoon achter de `find` methode aanroepen. Je kan de richting van de sortering aangeven door een object mee te geven. Als je een 1 meegeeft, dan sorteert hij oplopend. Als je een -1 meegeeft, dan sorteert hij aflopend. 

```typescript
const result = await collection.find({}).sort({ name: 1 }).toArray();
```

Je kan ook meerdere velden meegeven om op te sorteren. Als je meerdere velden meegeeft, dan sorteert hij eerst op het eerste veld. Als er meerdere documenten zijn met dezelfde waarde voor het eerste veld, dan sorteert hij op het tweede veld. 

```typescript
const result = await collection.find({}).sort({ name: 1, age: -1 }).toArray();
```

## Limit (en Skip)

Je kan de `limit` methode gebruiken om het aantal resultaten te beperken. Je moet eerst een `find` query uitvoeren en dan de `limit` methode aanroepen. Je kan deze gewoon achter de `find` methode aanroepen. 

```typescript
const result = await collection.find({}).limit(5).toArray();
```

Vaak wordt de `limit` methode gebruikt in combinatie met de `skip` methode. De `skip` methode slaat een aantal resultaten over. 

```typescript
const result = await collection.find({}).skip(5).limit(5).toArray();
```

Deze query zal alle documenten van de collectie ophalen, maar de eerste 5 overslaan. Daarna zal hij de volgende 5 documenten ophalen. Dit is handig om te gebruiken in combinatie met paginering.