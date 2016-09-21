'use strict';

let should  = require('chai').should();
let ModelValidate = require('../dist');

module.exports = function(){
  
  it ('Should fail on empty object', () => {
    let model = {}
    let validator = new ModelValidate.SyncValidator();
    let valid = validator.validate(model, {
      field : ['required']
    });
    valid._valid.should.equal(false);
  })

  it ('Should fail for an empty string', () => {
    let model = { field : '' }
    let validator = new ModelValidate.SyncValidator();
    let valid = validator.validate(model, {
      field : ['required']
    });
    valid._valid.should.equal(false);
  })
  it ('Should fail for whitespace', () => {
    let model = { field : ' ' }
    let validator = new ModelValidate.SyncValidator();
    let valid = validator.validate(model, {
      field : ['required']
    });
    valid._valid.should.equal(false);
  })
  it ('Should succeed for Numbers', () => {
    let model = { field : 0 }
    let validator = new ModelValidate.SyncValidator();
    let valid = validator.validate(model, {
      field : ['required']
    });
    valid._valid.should.equal(true);
  })
  it ('Should succeed for non-empty Strings', () => {
    let model = { field : ' some text including whitespace' }
    let validator = new ModelValidate.SyncValidator();
    let valid = validator.validate(model, {
      field : ['required']
    });
    valid._valid.should.equal(true);
  })
}
