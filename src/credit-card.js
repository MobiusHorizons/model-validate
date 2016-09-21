import luhn from 'luhn';

export function strip (ccnum = '') {
    if (typeof(ccnum) != 'string'){
        ccnum = ccnum.toString();
    }
    ccnum = ccnum.replace(/[^\d]/g, "" )
    // truncate to 16 characters;
    return ccnum.substr(0,16);
}

export default function validateCC(object, field){
    if (field in object && object[field]){
        let ccnum = strip(object[field]);
        let valid = luhn.validate(ccnum);
        if (!valid){
            return {_valid : false, reason : 'Luhn-10 check failed'};
        }
    }
    return {_valid : true};
}
