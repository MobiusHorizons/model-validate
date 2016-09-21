
'use strict';

let should  = require('chai').should();
let ModelValidate = require('../dist');

module.exports = function(){
  it ('Should succeed on empty object', () => {
    let model = {}
    let validator = new ModelValidate.SyncValidator();
    let valid = validator.validate(model, {
      zipCode : ['zip-code']
    });
    valid._valid.should.equal(true);
  })

  it ('Should succeed on a 5 digit zip code', () => {
    let model = { zipCode : '12345'}
    let validator = new ModelValidate.SyncValidator();
    let valid = validator.validate(model, {
      zipCode : ['zip-code']
    });
    valid._valid.should.equal(true);
  })

  it ('Should succeed on a 9 digit zip', () => {
    let model = { zipCode : '12345-1234'}
    let validator = new ModelValidate.SyncValidator();
    let valid = validator.validate(model, {
      zipCode : ['zip-code']
    });
    valid._valid.should.equal(true);
  })

  it ('Should fail on a 9 digit zip without separator', () => {
    let model = { zipCode : '123451234'}
    let validator = new ModelValidate.SyncValidator();
    let valid = validator.validate(model, {
      zipCode : ['zip-code']
    });
    valid._valid.should.equal(false);
  })

  it ('Should fail on a 3 digit zip', () => {
    let model = { zipCode : '123'}
    let validator = new ModelValidate.SyncValidator();
    let valid = validator.validate(model, {
      zipCode : ['zip-code']
    });
    valid._valid.should.equal(false);
  })

  it ('Should fail on a 7 digit zip', () => {
    let model = { zipCode : '1234567'}
    let validator = new ModelValidate.SyncValidator();
    let valid = validator.validate(model, {
      zipCode : ['zip-code']
    });
    valid._valid.should.equal(false);
  })
}

