/** @module ModelValidate */
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

/** Class for synchronous validation.*/
export class SyncValidator{
    /** get an instance of `SyncValidator` with any custom validators you want */
    constructor(validators = {}){
        this.validators = Object.assign({},defaultValidators,validators);
    }

    /**
    * Validate a `model` according to the validators set up in `mask`
    * @param model Object Data to be validated Ex: `{ phone : "123-456-7890" }`
    * @param mask Object  Validators to be applied to model. Ex: `{ phone : ['required', 'phone']}`
    *
    *   The following validators are provided by default
    * - **required**    checks for non-null, non-whitespace, non-empty strings or Numbers
    * - **phone**       validates 10 or 11 digit phone numbers reguardless of formatting characters
    * - **credit-card** validates credit card numbers according to a LUHN-10 check
    * - **zip-code**    validates American 5-digit and 9-digit zip codes* 
    */
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

