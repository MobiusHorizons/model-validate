module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SyncValidator = exports.zipCode = exports.creditCard = exports.phone = exports.required = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _required2 = __webpack_require__(1);

	var _required3 = _interopRequireDefault(_required2);

	var _phone2 = __webpack_require__(2);

	var _phone3 = _interopRequireDefault(_phone2);

	var _creditCard2 = __webpack_require__(3);

	var _creditCard3 = _interopRequireDefault(_creditCard2);

	var _zipCode2 = __webpack_require__(5);

	var _zipCode3 = _interopRequireDefault(_zipCode2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	exports.required = _required3.default;
	exports.phone = _phone3.default;
	exports.creditCard = _creditCard3.default;
	exports.zipCode = _zipCode3.default;


	var defaultValidators = {
	    'required': _required3.default,
	    'phone': _phone3.default,
	    'credit-card': _creditCard3.default,
	    'zip-code': _zipCode3.default
	};

	var SyncValidator = exports.SyncValidator = function () {
	    function SyncValidator() {
	        var validators = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        _classCallCheck(this, SyncValidator);

	        this.validators = Object.assign({}, defaultValidators, validators);
	    }

	    _createClass(SyncValidator, [{
	        key: 'validate',
	        value: function validate(model, mask) {
	            var _this = this;

	            // walk through each field in mask, and run the appropriate validator against model
	            var output = {};
	            for (var field in mask) {
	                var fieldValidators = mask[field];
	                if (!Array.isArray(fieldValidators) && _typeof(fieldValidators == 'object')) {
	                    if (model[field] != null) {
	                        output[field] = this.validate(model[field], mask[field]);
	                    } else {
	                        output[field] = { _valid: false, reason: 'Expected Object, but got got null' };
	                    }
	                } else {
	                    (function () {
	                        if (!Array.isArray(fieldValidators)) {
	                            fieldValidators = [fieldValidators];
	                        }
	                        var valid = {};
	                        for (var i = 0; i < fieldValidators.length; i++) {
	                            var fieldValidator = fieldValidators[i];
	                            if (fieldValidator && _this.validators[fieldValidator]) {
	                                valid[fieldValidator] = _this.validators[fieldValidator](model, field);
	                            } else {
	                                console.warn('Invalid Validator: \'' + fieldValidator + '\'');
	                                valid[fieldValidator] = { _valid: false, reason: 'Invalid Validator: \'' + fieldValidator + '\'' };
	                            }
	                        }
	                        valid._valid = Object.keys(valid).every(function (field) {
	                            return valid[field]._valid;
	                        });
	                        output[field] = valid;
	                    })();
	                }
	            }
	            output._valid = Object.keys(output).every(function (field) {
	                return output[field]._valid;
	            });
	            return output;
	        }
	    }]);

	    return SyncValidator;
	}();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = required;
	function required(object, field) {
	    if (field in object && object[field] != null) {
	        var value = object[field];
	        switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
	            case 'string':
	                return value.trim().length != 0 ? { _valid: true } : { value: false, reason: 'String is empty' };

	            case 'number':
	            default:
	                return { _valid: true };
	        }
	    }
	    return { _valid: false, reason: '\'' + field + '\' is null or undefined' };
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.strip = strip;
	exports.default = validatePhone;
	function strip() {
	    var phone_number = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	    if (typeof phone_number != 'string') {
	        phone_number = phone_number.toString();
	    }
	    phone_number = phone_number.replace(/[^\d]/g, "");
	    return phone_number;
	}

	function validatePhone(object, field) {
	    if (field in object && object[field]) {
	        var phone_number = strip(object[field]);
	        // require between 10 and 11 decimals;
	        var valid = /^\d{10,11}$/.test(phone_number);
	        if (!valid) {
	            return { _valid: false, reason: 'Phone number must have 10 or 11 digits' };
	        }
	    }
	    return { _valid: true };
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.strip = strip;
	exports.default = validateCC;

	var _luhn = __webpack_require__(4);

	var _luhn2 = _interopRequireDefault(_luhn);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function strip() {
	    var ccnum = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	    if (typeof ccnum != 'string') {
	        ccnum = ccnum.toString();
	    }
	    ccnum = ccnum.replace(/[^\d]/g, "");
	    // truncate to 16 characters;
	    return ccnum.substr(0, 16);
	}

	function validateCC(object, field) {
	    if (field in object && object[field]) {
	        var ccnum = strip(object[field]);
	        var valid = _luhn2.default.validate(ccnum);
	        if (!valid) {
	            return { _valid: false, reason: 'Luhn-10 check failed' };
	        }
	    }
	    return { _valid: true };
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict",module.exports=function(){function a(a){var b=a.trim(),c=b.length,d=parseInt(b,10),e=0,f,g;if(c===0)return!0;if(isNaN(d)||!/^[0-9]+$/.test(b))return!1;for(var h=c;h>0;h--){f=Math.floor(d)%10,e+=f,h--,d/=10,f=Math.floor(d)%10,g=f*2;switch(g){case 10:g=1;break;case 12:g=3;break;case 14:g=5;break;case 16:g=7;break;case 18:g=9;break;default:g=g}d/=10,e+=g}return e%10===0}return{validate:a}}();

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.strip = strip;
	exports.default = validateZip;
	function strip() {
	    var zip_code = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	    if (typeof zip_code != 'string') {
	        zip_code = zip_code.toString();
	    }
	    zip_code = zip_code.replace(/[^\d-\s]/g, "");
	    return zip_code.trim(); // trim leading/trailing whitespace;
	}

	function validateZip(object, field) {
	    if (field in object && object[field]) {
	        var zip_code = strip(object[field]);
	        // require between 10 and 11 decimals;
	        var valid = /^\d{5}([-\s]\d{4})?$/.test(zip_code);
	        if (!valid) {
	            return { _valid: false, reason: 'Zip must be 5 digits or have the full extended syntax' };
	        }
	    }
	    return { _valid: true };
	}

/***/ }
/******/ ]);