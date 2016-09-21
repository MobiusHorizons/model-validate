'use strict';

let should  = require('chai').should();
let ModelValidate = require('../dist');

module.exports = function(){
  it ('Should succeed on empty object', () => {
    let model = {}
    let validator = new ModelValidate.SyncValidator();
    let valid = validator.validate(model, {
      creditCard : ['credit-card']
    });
    valid._valid.should.equal(true);
  })

  it ('Should succeed for Visa 4111 card', () => {
    let model = { creditCard : '4111111111111111'}
    let validator = new ModelValidate.SyncValidator();
    let valid = validator.validate(model, {
      creditCard : ['credit-card']
    });
    valid._valid.should.equal(true);
  })

  it ('Should fail for invalid luhn-10', () => {
    let model = { creditCard : '4111111111112111'}
    let validator = new ModelValidate.SyncValidator();
    let valid = validator.validate(model, {
      creditCard : ['credit-card']
    });
    valid._valid.should.equal(false);
  })

}

