/**
 * Convert number to array of 0s and 1s corresponding to the number's binary representation'
 * 
 * @param {number} number to convert
 * @returns binary representation as array of 0s and 1s (big endian) 
 */
function toBinary(num) {
  if (num === 0) {
    return [];
  }
  let rv = toBinary(num >> 1);
  rv.push(num & 1);
  return rv;
}

/**
 * Pad an array with zeros on the left
 * 
 * @param {array} array to pad
 * @param {Number} numDigits length of the target array
 * @returns shifted array, padded with 0
 */
function zeroPadLeft(array, numDigits) {
  let rv = array.slice(0);
  const digitsToAdd = numDigits - array.length;
  if (digitsToAdd > 0) {
    rv.unshift(...new Array(digitsToAdd).fill(0));
  }
  return rv;
}

/**
 * Element-wise sum of two same-length arrays
 * 
 * @param {array} v1 first vector
 * @param {array} v2 second vector
 * @returns sum of v1 and v2
 */
function addVectors(v1, v2) {
  let value = [];
  for (let i = v1.length - 1; i >= 0; --i) {
    value[i] = v1[i] + v2[i];
  }
  return value;
}

/**
 * sum of element-wise products of two vectors (i.e. same-length arrays)
 * 
 * @param {array} v1 first vector
 * @param {array} v2 second vector
 * @returns dot product of v1 and v2
 */
function scalarProduct(v1, v2) {
  let scProd = 0;
  for (let i = v1.length - 1; i >= 0; --i) {
    scProd += v1[i] * v2[i];
  }
  return scProd;
}

/**
 *  
 * @param {array} vector to normalize
 * @returns vector scaled to unit length
 */
function normalize(vector) {
  const sum = vector.reduce((x, y) => x + y);
  return vector.map(el => el / sum);
}

/**
 * Factorial function for natural numbers
 * 
 * @param {Number} n
 * @returns n!
 */
function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}

module.exports = {
  toBinary,
  zeroPadLeft,
  addVectors,
  scalarProduct,
  normalize,
  factorial
};