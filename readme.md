# ModelValidate [![Circle CI](https://circleci.com/gh/MobiusHorizons/model-validate.svg?style=svg)](https://circleci.com/gh/MobiusHorizons/model-validate)
> MVC validation for JavaScript

# SyncValidator

[src/index.js:20-71](https://github.com/MobiusHorizons/model-validate/blob/79e1abb27e0baf1059f003873c5c26234970a8bd/src/index.js#L20-L71 "Source code on GitHub")

Class for synchronous validation.

**Parameters**

-   `validators`   (optional, default `{}`)

## validate

[src/index.js:39-70](https://github.com/MobiusHorizons/model-validate/blob/79e1abb27e0baf1059f003873c5c26234970a8bd/src/index.js#L39-L70 "Source code on GitHub")

Validate a `model` according to the validators set up in `mask`

**Parameters**

-   `model`  Object Data to be validated Ex: `{ phone : "123-456-7890" }`
-   `mask`  Object  Validators to be applied to model. Ex: `{ phone : ['required', 'phone']}`

    The following validators are provided by default
    - **required**    checks for non-null, non-whitespace, non-empty strings or Numbers
    - **phone**       validates 10 or 11 digit phone numbers reguardless of formatting characters
    - **credit-card** validates credit card numbers according to a LUHN-10 check
    - **zip-code**    validates American 5-digit and 9-digit zip codes


## Example

``` javascript
import {SyncValidator} from 'model-validate';

// Get a validator with just the built-in validators
let validator = new SyncValidator();

// sample data including some errors
let model = {
  address : {
    firstName : 'John',
    address1  : '123 SomeRoad',
    address2  : 'apt 4',
    city      : 'New York',
    state     : '    ',
    zip       : '123456',
  },
  phone : '1-(123)-123-1234',

}

// get validation results
let results = validatator.validate(model, {
  // the mask object mirrors the structure of the model
  address : {
    firstName : ['required'],
    lastName  : ['required'],
    address1  : ['required'],
    city      : ['required'],
    state     : ['required'],
    zip       : ['required', 'zip-code'],
  },
  phone : ['required', 'phone'],
})

// This returns the following structure
{
  "address": {
    "firstName": {
      "required": {
        "_valid": true
      },
      "_valid": true
    },
    "lastName": {
      "required": {
        "_valid": false,
        "reason": "\'lastName\' is null or undefined"
      },
      "_valid": false
    },
    "address1": {
      "required": {
        "_valid": true
      },
      "_valid": true
    },
    "city": {
      "required": {
        "_valid": true
      },
      "_valid": true
    },
    "state": {
      "required": {
        "value": false,
        "reason": "String is empty"
      },
      "_valid": false
    },
    "zip": {
      "required": {
        "_valid": true
      },
      "zip-code": {
        "_valid": false,
        "reason": "Zip must be 5 digits or have the full extended syntax"
      },
      "_valid": false
    },
    "_valid": false
  },
  "phone": {
    "required": {
      "_valid": true
    },
    "phone": {
      "_valid": true
    },
    "_valid": true
  },
  "_valid": false
}

```

There is a `_valid` property at every level that describes the validity of everything at that level and lower. This way
you can decide to use the data or not simply based on `results._valid`, but you can show feedback to the user based on
the valididy of a specific validation.

For example `model.address.zip` passes the `required` validator, but not the `zip-code` validator because it has 6
digits instead of 5. So `results.address.zip.required._valid == true`, but `results.address.zip.zip-code._valid == false`



