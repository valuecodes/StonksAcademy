export function camelCaseToString(s) {
    if(s===null) return ''

    if(s.split('').length<4){
        return s.toUpperCase()
    }
    
    let string = s.split(/(?=[A-Z])/).map(function(p) {
        return p.charAt(0).toUpperCase() + p.slice(1);
    }).join(' ');



    return string
}