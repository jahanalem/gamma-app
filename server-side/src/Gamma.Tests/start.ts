//const expect = require('chai').expect;
import { expect } from 'chai';
import 'mocha';


describe("First Test", () => {
    it('should add numbers correctly', function () {
        const num1 = 2;
        const num2 = 3;
        expect(num1 + num2).to.equal(5);
    })
})



// import { helloTest } from '../src/hello-test';


// describe('First test', 
//   () => { 
//     it('should return true', () => { 
//       const result = helloTest();
//       expect(result).to.equal(true); 
//   }); 
// });


// it('should not give a result of 6', function() {
//     const num1 = 3;
//     const num2 = 3;
//     expect(num1 + num2).not.to.equal(6);
// })