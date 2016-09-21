export function strip (phone_number = '') {
    if (typeof(phone_number) != 'string'){
        phone_number = phone_number.toString();
    }
    phone_number = phone_number.replace(/[^\d]/g, "" )
    return phone_number;
}

export default function validatePhone(object, field){
    if (field in object && object[field]){
        let phone_number = strip(object[field]);
        // require between 10 and 11 decimals;
        let valid = /^\d{10,11}$/.test(phone_number);
        if (!valid){
            return {_valid : false, reason : 'Phone number must have 10 or 11 digits'}
        }
    }
    return {_valid : true};
}
