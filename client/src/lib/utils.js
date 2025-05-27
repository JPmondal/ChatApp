export function formatMsgTime(date){
    const newDate =  new Date(date).toLocaleDateString('en-US', { 
        hour : '2-digit',
        minute : '2-digit',
        hour12 : false,
     }).split(" ")[1]
    
     return newDate

}