import { calculateSectionScore } from "./section"

export function Course(courseContent,completedSections=null){
    const startingSection = 'start'

    const createSections=(courseContent,completedSections=[])=>{
        return courseContent.sections.map((section,index) => {
            let completedSection = null
            
            if(completedSections){
                completedSection = completedSections
                    .find(item => item.sectionId===getSectionId(index))
            }
            
            return{
                ...section,
                attempts:completedSection?completedSection.attempts:0,
                course:courseContent.name,
                id:index,
                sectionId:getSectionId(index),
                completed:completedSection?true:false,
                visited:false,
                name:section.name,
                last: startingSection,
                current: startingSection,
                score:completedSection?completedSection.score:null,
                component:section.component
            }})
    }

    const navigate = (direction,status,navigation,setCourse) => {

        if(status==='unavailable') return

        let current = direction
        let element = null

        if(current==='next'){
            let sectionsLength = navigation.sections.length
            current=navigation.current
            current++
            if(current===sectionsLength){
                current='recap'
            }
        }
        
        if(current==='start'){
            element = document.getElementById('tableOfContent')
        }else if(current==='recap'){
            element = document.getElementById('recap')            
        }else{
            element = document.getElementById(getSectionId(current))
        }

        if(element){
            const last = navigation.current
            element.scrollIntoView({behavior: "smooth"});
            navigation.sections.forEach(item => {
                item.last = last
                item.current = current
            })
            setCourse({...navigation,current:current,last})
        }
    }

    const complete = (id,score,attempts=1,navigation,setCourse) => {
        const sectionIndex = navigation.sections.findIndex(item => item.id===id)
        const navCopy={...navigation}
        navCopy.sections[sectionIndex].completed=true
        navCopy.sections[sectionIndex].score=score
        navCopy.sections[sectionIndex].attempts=attempts
        setCourse(navCopy)
        return navCopy.sections[sectionIndex]
    }

    const getSectionId = (index)=>{
        return courseContent.name+index
    }
    
    function init(courseContent,completedSections){
        return createSections(courseContent,completedSections)
    }

    function moveToStart(){
        const element = document.getElementById('tableOfContent')
        element.scrollIntoView();
    }

    const getTotalScore=(completedSections)=>{
        return calculateTotalScore(completedSections)
    }

    return{
        current:startingSection,
        last:startingSection,
        name: courseContent.name,
        nextCourse:courseContent.nextCourse,
        sections: createSections(courseContent,completedSections),
        introduction: courseContent.introduction, 
        init,
        navigate,
        complete,
        moveToStart,
        getTotalScore,
    }
}

export function calculateTotalScore(completedSections){
    let score = { 
        correct:0,
        wrong:0,
        notAnswered:0,
        total:0,
        time:0, 
        attempts:0,
        totalPoints:0
    }

    completedSections.forEach(item => {
        if(item.score){
            Object.keys(item.score).forEach(key => score[key]+=item.score[key])
        }
    })

    let completeCount=0

    completedSections.forEach(item =>{
        if(item.score){
            completeCount++
            let newScore =  calculateSectionScore(item)
            score.attempts+=newScore.attempts
            score.totalPoints+=newScore.totalPercent                
        }
    })
    
    score.questions = `${score.correct}/${score.total}`
    score.questionPercent = +((score.correct/score.total)*100).toFixed(0)
    score.timePercent = +(((5 - (Math.floor(score.time/(30*completedSections.length)))) / 5)*100).toFixed(0)
    score.attemptsPercent = +(((5-(score.attempts-(completeCount))) / 5)*100).toFixed(0)
    if(score.timePercent<0) score.timePercent = 0
    if(score.attemptsPercent<0) score.attemptsPercent = 0        

    score.totalPercent = +((score.questionPercent*2+score.timePercent+score.attemptsPercent)/4).toFixed(0)
    score.attempts = `${score.attempts}/${completeCount}`
    return score
}