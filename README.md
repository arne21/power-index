# Power Index

Power indices are numerical measures of the relative power of voters/players/shareholders whose votes have different weights. 

Results differ slightly between methods.
All included power indices simplifications assuming "yes" and "no" votes to be independent random events with the same probability.
The following methods are available:

### [Banzhaf index (a.k.a. Penrose-Banzhaf, Banzhaf-Coleman)](https://en.wikipedia.org/wiki/Banzhaf_power_index)

### [Shapley-Shubik index](https://en.wikipedia.org/wiki/Shapley%E2%80%93Shubik_power_index)

## Usage
```
const powerIndex = require('power-index');

const weights = [9,9,7,3,1,1];
const quota = 16;

console.log(powerIndex.banzhafPenrose(weights, quota));
// Do not try this at home when weights.length >= 15:
console.log(powerIndex.shapleyShubik(weights, quota));
```
