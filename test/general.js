const powerIndex = require('../');
const expect = require("chai").expect;

/**
 * General tests for order-preserving power index calculation methods
 * taking a weight array and a numeric quota (threshold)
 * 
 * @param {function} power
 */
function powerTest(power) {
  return function () {
    it('should give equal power for equal 4 votes', function (done) {
      expect(power([1, 1, 1, 1], 3))
        .to.eql([0.25, 0.25, 0.25, 0.25]);
      done();
    });
    it('should give the odd one out no power', function (done) {
      expect(power([1, 2, 2, 4, 4], 8)[0])
        .to.equal(0);
      done();
    });
    it('should be order-preserving (i.e. give more power to those with a higher weight)',
      function (done) {
        const weights = Array(5).fill(0).map(Math.random);
        const quota = weights.reduce((x, y) => x + y) * 0.6;
        const powers = power(weights, quota);
        powers.forEach((p, i1) => {
          expect(p).to.be.within(0, 1);
          for (let i2 = powers.length - 1; i2 > i1; --i2) {
            if (weights[i1] >= weights[i2]) {
              expect(p).to.be.at.least(powers[i2]);
            } else {
              expect(p).to.be.at.most(powers[i2]);
            }
          }
        });
        done();
      });
    it('should know a dictator when it sees one', function (done) {
      const weights = [1, 3, 9, 27];
      const quota = 21;
      const powers = power(weights, quota);
      powers.forEach((p, index) => {
        if (weights[index] > quota) {
          expect(p).to.equal(1);
        } else {
          expect(p).to.equal(0);
        }
      });
      done();
    });

  }
}

describe('Banzhaf power index', powerTest(powerIndex.banzhafPenrose));
describe('Shapley-Shubik power index', powerTest(powerIndex.shapleyShubik));