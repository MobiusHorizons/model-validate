'use strict';

let should  = require('chai').should();
let ModelValidate = require('../dist');

// validators
let required   = require('./required');
let phone      = require('./phone');
let creditCard = require('./credit-card');
let zipCode    = require('./zip-code');
let custom     = require('./custom');


describe ('SyncValidator', () => {
  it ('should initialize with no arguments', function(){
    let validator = new ModelValidate.SyncValidator();
    should.exist(validator);
    validator.should.have.property('validate');
    validator.validate.should.be.a('function');
  })
  describe('validate', () => {
    it ('should validate with an empty mask', () => {
      let validator = new ModelValidate.SyncValidator();
      let model = {};
      let valid = validator.validate(model, {});
      valid.should.be.an('object');
      valid.should.have.property('_valid').equal(true);
    })
    describe('required', required);
    describe('phone', phone);
    describe('credit-card', creditCard);
    describe('zip-code', zipCode);
    describe('custom', custom)

  })
})




