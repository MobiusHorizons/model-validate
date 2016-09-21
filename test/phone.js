'use strict';

let should  = require('chai').should();
let ModelValidate = require('../dist');

module.exports = function(){
  it ('Should succeed on empty object', () => {
    let model = {}
    let validator = new ModelValidate.SyncValidator();
    let valid = validator.validate(model, {
      phone : ['phone']
    });
    valid._valid.should.equal(true);
  })

  it ('Should succeed for zero length text', () => {
    let model = { phone : '' }
    let validator = new ModelValidate.SyncValidator();
    let valid = validator.validate(model, {
      phone : ['phone']
    });
    valid._valid.should.equal(true);
  })

  it ('Should fail for non-zero length text', () => {
    let model = { phone : 'abc' }
    let validator = new ModelValidate.SyncValidator();
    let valid = validator.validate(model, {
      phone : ['phone']
    });
    valid._valid.should.equal(false);
  })

  it ('Should succeed for 10-digit numbers', () => {
    let model = { phone : '1234567890' }
    let validator = new ModelValidate.SyncValidator();
    let valid = validator.validate(model, {
      phone : ['phone']
    });
    valid._valid.should.equal(true);
  })

  it ('Should succeed for 10-digit numbers with separators', () => {
    let model = { phone : '(123)-456-7890' }
    let validator = new ModelValidate.SyncValidator();
    let valid = validator.validate(model, {
      phone : ['phone']
    });
    valid._valid.should.equal(true);
  })

  it ('Should succeed for 11-digit numbers', () => {
    let model = { phone : '01234567890' }
    let validator = new ModelValidate.SyncValidator();
    let valid = validator.validate(model, {
      phone : ['phone']
    });
    valid._valid.should.equal(true);
  })

  it ('Should succeed for 11-digit numbers with separators', () => {
    let model = { phone : '0-(123)-456-7890' }
    let validator = new ModelValidate.SyncValidator();
    let valid = validator.validate(model, {
      phone : ['phone']
    });
    valid._valid.should.equal(true);
  })

  it ('Should fail for 7-digit numbers', () => {
    let model = { phone : '4567890' }
    let validator = new ModelValidate.SyncValidator();
    let valid = validator.validate(model, {
      phone : ['phone']
    });
    valid._valid.should.equal(false);
  })

  it ('Should fail for 7-digit numbers with separators', () => {
    let model = { phone : ' 456-7890' }
    let validator = new ModelValidate.SyncValidator();
    let valid = validator.validate(model, {
      phone : ['phone']
    });
    valid._valid.should.equal(false);
  })
}

