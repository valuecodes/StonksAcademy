export function Course(courseContent,completedSections=null,setCourse){
    this.setCourse = setCourse

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
                course:courseContent.name,
                id:index,
                completed:completedSection?true:false,
                visited:false,
                name:section.name,
                sectionId: getSectionId(index),
                current: startingSection,
                score:completedSection?completedSection.score:null,
                component:section.component
            }})
    }

    const navigate = (direction,status,navigation) => {

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
            element.scrollIntoView({behavior: "smooth"});
            navigation.sections.forEach(item => {
                item.current=current
            })
            this.setCourse({...navigation,current:current})
        }
    }

    const complete = (id,score,navigation) => {
        const sectionIndex = navigation.sections.findIndex(item => item.id===id)
        const navCopy={...navigation}
        navCopy.sections[sectionIndex].completed=true
        navCopy.sections[sectionIndex].score=score
        this.setCourse(navCopy)
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

    return{
        current:startingSection,
        nextCourse:courseContent.nextCourse,
        sections: createSections(courseContent,completedSections),
        init,
        navigate,
        complete,
        moveToStart,
    }
}