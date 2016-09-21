'use strict';

let ModelValidate = require('../dist');
let should = require('chai').should();

module.exports = function(){
  it('should allow custom validators', () => {
    let custom = (object, field) => ({_valid : object[field]})
    let validator = new ModelValidate.SyncValidator({
      custom : custom,
    });

    let model = {field1 : true, field2 :false};
    let valid = validator.validate(model, {
      field1 : ['custom'],
      field2 : ['custom']
    });

    valid.should.be.an('object');
    valid.should.have.property('_valid').equal(false);
    valid.field1.should.have.property('_valid').equal(true);
    valid.field2.should.have.property('_valid').equal(false);
  })

  it('should allow custom validators mixed in with the defaults', () => {
    let custom = (object, field) => ({_valid : true})
    let validator = new ModelValidate.SyncValidator({
      custom : custom,
    });

    let model = {field1 : 'should be true', field2 : '  '};
    let valid = validator.validate(model, {
      field1 : ['required','custom'],
      field2 : ['required','custom']
    });

    valid.should.be.an('object');
    valid.should.have.property('_valid').equal(false);
    valid.field1.should.have.property('_valid').equal(true);
    valid.field2.should.have.property('_valid').equal(false);
  })

  it('should allow custom validators to overwrite the defaults', () => {
    let custom = (object, field) => ({_valid : true})
    let validator = new ModelValidate.SyncValidator({
      phone : custom,
    });

    let model = {field1 : 'should be true', field2 : '  '};
    let valid = validator.validate(model, {
      field1 : ['required','phone'],
      field2 : ['required','phone']
    });

    valid.should.be.an('object');
    valid.should.have.property('_valid').equal(false);
    valid.field1.should.have.property('_valid').equal(true);
    valid.field2.should.have.property('_valid').equal(false);
  })
}


