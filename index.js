const util = require('./util');

/**
 * Find all winning coalitions among the 2^n voting patterns
 * of n voters with given weights for the given quota
 * 
 * @param {array} weights voting weights
 * @param {Number} quota threshold for a measure to pass
 * @returns array of winning coalitions (each an array of 0s ("no" votes) and 1s ("yes" votes))
 */
function winningCoalitions(weights, quota) {
  let winningCoalitions = [];
  const numCoalitions = Math.pow(2, weights.length);
  for (let i = 0; i < numCoalitions; i++) {
    let ayes = util.zeroPadLeft(util.toBinary(i), weights.length);
    if (util.scalarProduct(ayes, weights) >= quota) {
      winningCoalitions.push(ayes);
    }
  }
  return winningCoalitions;
}

/**
 * Find pivotal voters in a winning coalition
 * 
 * @param {array} coalition (array of 0s ("no" voters) and 1s ("yes" voters))
 * @param {array} weights corresponding to the voters at the respective index
 * @param {number} quota threshold for a measure to pass
 * @returns pivotal voters ("yes" voters whose change of vote would change the outcome,
 *   as array of 1s (flip will change result) and 0s ("no" voters or no result change))
 */
function pivotalVoters(coalition, weights, quota) {
  let piv = coalition.slice();
  const total = util.scalarProduct(weights, coalition);
  piv.forEach(function (el, index, arr) {
    if (el && total - weights[index] >= quota) {
      arr[index] = 0;
    }
  });
  return piv;
}

/**
 * Banzhaf power index, a.k.a. Banzhaf-Penrose-Coleman power index
 * -- O(n^2) for n participants
 * 
 * @param {array} weights voting weights
 * @param {Number} quota threshold for a measure to pass
 * @returns Array of power indices corresponding to given weights (add up to 1)
 */
function banzhafPenrose(weights, quota) {
  const pivotalSum = winningCoalitions(weights, quota)
    .map(coalition => pivotalVoters(coalition, weights, quota))
    .reduce(util.addVectors);
  return util.normalize(pivotalSum);
}


/**
 * Shapley-Shubik power index -- O(n!) for n participants
 * 
 * @param {Array} weights  voting weights
 * @param {Number} quota threshold that must be reached (i.e. combined number of votes for a measure to pass)
 * @returns Array of power indices corresponding to given weights (add up to 1)
 */
function shapleyShubik(weights, quota) {
  let numPivots = weights.map(el => 0);
  _ss(weights, quota, weights.map((el, idx) => idx), 0, numPivots);
  return util.normalize(numPivots);
}

/**
 * Recursive shapley-Shubik power index calculation with values already partially calculated
 * 
 * @param {Array} weights voting weights
 * @param {Number} quota threshold (combined weights of yes votes for "pass")
 * @param {Array} hasToVote indices of votes not already cast
 * @param {Number} totalSoFar combined weight of "yes" votes so far 
 * @param {Array} numPivots number of times each voter has been pivotal so far (will be changed)
 */
function _ss(weights, quota, hasToVote, totalSoFar, numPivots) {
  hasToVote.forEach(function (idxVoter) {
    const newTotal = totalSoFar + weights[idxVoter];
    if (newTotal >= quota) {
      numPivots[idxVoter] += util.factorial(hasToVote.length - 1);
    } else {
      _ss(weights, quota, hasToVote.filter(el => el != idxVoter), newTotal, numPivots);
    }
  });
}

module.exports = {
  banzhafPenrose,
  shapleyShubik
};