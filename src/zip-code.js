export function strip (zip_code = '') {
    if (typeof(zip_code) != 'string'){
        zip_code = zip_code.toString();
    }
    zip_code = zip_code.replace(/[^\d-\s]/g, "" )
    return zip_code.trim(); // trim leading/trailing whitespace;
}

export default function validateZip(object, field){
    if (field in object && object[field]){
        let zip_code = strip(object[field]);
        // require between 10 and 11 decimals;
        let valid = /^\d{5}([-\s]\d{4})?$/.test(zip_code);
        if (!valid){
            return {_valid : false, reason : 'Zip must be 5 digits or have the full extended syntax'}
        }
    }
    return {_valid : true};
}
