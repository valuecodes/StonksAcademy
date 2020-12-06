export function camelCaseToString(s) {
    if(s===null) return ''

    s = s.replace(/-./g, x=>x.toUpperCase()[1])

    if(s.split('').length<4){
        return s.toUpperCase()
    }
    
    let string = s.split(/(?=[A-Z])/).map(function(p) {
        return p.charAt(0).toUpperCase() + p.slice(1);
    }).join(' ');

    return string
}

export function truncate(text, maxChars=50){
    return text.replace(/(.{77})..+/, "$1…")
}