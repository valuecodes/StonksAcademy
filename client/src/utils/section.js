export function calculateSectionScore(section){
    let { correct, total, time } = section.score 
    let { attempts } = section

    if(!time) time=20
    if(!attempts) attempts=1
    
    let questionPercent = +((correct/total)*100).toFixed(0)    
    let timePercent = +(((5 - (Math.floor(time/30))) / 5)*100).toFixed(0)
    let attemptsPercent = +(((5-(attempts-1)) / 5)*100).toFixed(0)
    if(attemptsPercent<0) attemptsPercent=0
    if(timePercent<0) timePercent=0
    
    let totalPercent = +((questionPercent*2+timePercent+attemptsPercent)/4).toFixed(0)
    return{
        questions:`${correct}/${total}`,
        time,
        attempts,
        questionPercent,
        timePercent,
        attemptsPercent,
        totalPercent,
        totalPoints:totalPercent
    }
}