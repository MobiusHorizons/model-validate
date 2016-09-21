export required   from './required'
export phone      from './phone'
export creditCard from './credit-card'
export zipCode    from './zip-code'

import required   from './required'
import phone      from './phone'
import creditCard from './credit-card'
import zipCode    from './zip-code'

const defaultValidators = {
    'required'    : required,
    'phone'       : phone,
    'credit-card' : creditCard,
    'zip-code'    : zipCode,
}

export class SyncValidator{
    constructor(validators = {}){
        this.validators = Object.assign({},defaultValidators,validators);
    }

    validate(model, mask){
        // walk through each field in mask, and run the appropriate validator against model
        let output = {};
        for (let field in mask){
            let fieldValidators = mask[field];
            if (!Array.isArray(fieldValidators) && typeof(fieldValidators == 'object')){
                if (model[field] != null){
                    output[field] = this.validate(model[field], mask[field]);
                } else {
                    output[field] = {_valid : false, reason : 'Expected Object, but got got null'}
                }
            } else {
                if (!Array.isArray(fieldValidators)){
                    fieldValidators = [fieldValidators];
                }
                let valid = {};
                for (let i = 0; i < fieldValidators.length; i++){
                    let fieldValidator = fieldValidators[i];
                    if (fieldValidator && this.validators[fieldValidator]){
                        valid[fieldValidator] = this.validators[fieldValidator](model, field);
                    } else {
                        console.warn(`Invalid Validator: '${fieldValidator}'`);
                        valid[fieldValidator] = {_valid : false, reason : `Invalid Validator: '${fieldValidator}'`};
                    }
                }
                valid._valid = Object.keys(valid).every(field => valid[field]._valid)
                output[field] = valid;
            }
        }
        output._valid = Object.keys(output).every(field => output[field]._valid)
        return output;
    }
}

