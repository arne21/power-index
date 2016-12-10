# Power Index

Power indices are numerical measures of the relative power of voters/players/shareholders whose votes have different weights. 

Results differ slightly between methods.
All included power indices are simplifications assuming "yes" and "no" votes to be independent random events with the same probability.
The following methods are available:

### [Banzhaf index (a.k.a. Penrose-Banzhaf, Banzhaf-Coleman)](https://en.wikipedia.org/wiki/Banzhaf_power_index)

All combinations of "yes" and "no" votes are checked for
* whether they constitute a winning coalition (i.e. whether the weights of the "yes" voters sum up to at least the quota)
* the _pivotal_ voters in a winning coalition (i.e. voters whose switch from "yes" to "no" changes the overall outcome).

Each voter's Banzhaf power index is proportional to the number of times their vote is pivotal.


Calculation effort is in O(2^n) for n voters.

### [Shapley-Shubik index](https://en.wikipedia.org/wiki/Shapley%E2%80%93Shubik_power_index)

Ordered sequences of possible "yes" votes are considered. 
The voter to raise the cumulative vote sum to or above the quota is recorded.
The Shapley-Shubik index is the proportion of sequences where each voter was pivotal in this sense.

Calculation effort is in O(n!) for n voters 
(or, more precisely, n being the size of the largest coalition where the voter with the smallest weight is pivotal).
Currently (late 2016), this means >1s for n=12 and >1min for n=14 already 
(where the Banzhaf still takes only a fraction of a second).
Optimization is possible, but not yet implemented, 
for scenarios where several voters have the same weight.

## Usage

This module provides two methods, `banzhafPenrose` and `shapleyShubik`, with the same signature: 
the first argument is an array of voting weights, the second the quota. 
The return value is an array of power indices corresponding to each weight, 
normalized (i.e. they sum up to 1).

```
const powerIndex = require('power-index');

const weights = [9,9,7,3,1,1];
const quota = 16;

console.log(powerIndex.banzhafPenrose(weights, quota));
// Do not try this at home when weights.length > 15:
console.log(powerIndex.shapleyShubik(weights, quota));
```
