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
* Property met een ander object als waarde. Dit object moet op zijn beurt ook een aantal properties bevatten, vooral een id property. Die id verwijst naar een ander object in een andere array die we later gaan maken. Het moet wel verwijzen naar een nieuw type object.

Let op dat dit een minimale vereiste is. Je mag gerust meer properties toevoegen als dat nodig is voor je idee.
