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

export function formatNumber(value,format){

    value = +value.toFixed(0)
    let text = value.toLocaleString('en-US', { minimumFractionDigits: 0 }).replaceAll(',', ' ') 

    // if(sign){
    //     if(value>0) text = '+'+text
    //     if(value<0) text = '-'+text
    // }    

    if(format==='%'){
        return text+' %'
    }
    if(format==='Y'){
        return text+' Years'
    }
    return text+' €'
}

export function formatDate(date=new Date()){
    date = new Date(date)
    return date.toLocaleDateString('en-GB')
}