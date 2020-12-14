export function Course(courseContent,userInfo=null){

    const startingSection = 'start'

    const createSections=(courseContent,userInfo)=>{
        let completedSections = userInfo ? userInfo.completedSections : []
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
                name:section.name,
                completed:completedSection?true:false,
                visited:false,
                sectionId: getSectionId(index),
                current: startingSection,
                score:completedSection?completedSection.score:null,
                component:section.component
            }})
    }

    const navigate = (direction,status,navigation,setCourse) => {
        if(status==='unavailable') return
        let current = direction
        let element = null
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
            setCourse({...navigation,current:current})
        }
    }

    const complete = (id,score,navigation,setCourse) => {
        const sectionIndex = navigation.sections.findIndex(item => item.id===id)
        const navCopy={...navigation}
        navCopy.sections[sectionIndex].completed=true
        navCopy.sections[sectionIndex].score=score
        setCourse(navCopy)
        return navCopy.sections[sectionIndex]
    }

    const getSectionId = (index)=>{
        return courseContent.name+index
    }
    
    function init(courseContent,userInfo){
        return createSections(courseContent,userInfo)
    }

    return{
        current:startingSection,
        sections: createSections(courseContent,userInfo),
        init,
        navigate,
        complete,
    }
}