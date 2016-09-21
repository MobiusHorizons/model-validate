export default function required(object, field){
    if ((field in object) && object[field] != null){
        let value = object[field];
        switch (typeof(value)){
            case 'string':
                return (value.trim().length != 0) ?
                    {_valid : true} : {value : false, reason : 'String is empty'};

            case 'number':
            default :
                return {_valid : true}
        }
    }
    return {_valid : false, reason : `'${field}' is null or undefined`};
}
