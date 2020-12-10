import React,{ useState,useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import MaterialIcon from './MaterialIcon'

export default function DragAndDrop(props) {

    const {
        columns,
        items,
        getScore,
        startExercise
    } = props

    const [dragAndDrop, setDragAndDrop] = useState([])
    const [score,setScore] = useState({wrong:0})

    useEffect(()=>{

        let newDragAndDrop=[]

        columns.forEach(column =>{
            newDragAndDrop.push({
                droppable: 'droppable.'+column.id,
                droppableIndex:column.id,
                ...column,
                draggables:items.filter(item => item.start===column.id)
                    .map((item,index) => { return{
                        id: `item-${column.id}-${index}`,
                        content: item.name,
                        target: item.target,
                        start: item.start,
                        correct: null,
                    }})
            }) 
        })
        setDragAndDrop(newDragAndDrop)
        calculateScore(newDragAndDrop)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const onDragEnd = (result) => {
        const { source, destination } = result;
        // dropped outside the list
        if(!destination) return;
        let updatedDragAndDrop=[...dragAndDrop]

        if (source.droppableId === destination.droppableId) {

            let listIndex = dragAndDrop.findIndex(item => item.droppable === source.droppableId) 
            const items = reorder(
                dragAndDrop[listIndex].draggables,
                source.index,
                destination.index
            );
            
            updatedDragAndDrop[listIndex].draggables = items
            setDragAndDrop(updatedDragAndDrop);

        } else {
            let sourceIndex = dragAndDrop.findIndex(item => item.droppable === source.droppableId) 
            let destinationIndex = dragAndDrop.findIndex(item => item.droppable === destination.droppableId) 
            
            let { result, movedItem } = move(
                dragAndDrop[sourceIndex].draggables,
                dragAndDrop[destinationIndex].draggables,
                source,
                destination
            );

            Object.keys(result).forEach(id =>{
                let index = updatedDragAndDrop.findIndex(item => item.droppable===id)
                updatedDragAndDrop[index].draggables = result[id]
            })
            movedItem.correct=null
            setDragAndDrop(updatedDragAndDrop);
            let destIndex = Number(destination.droppableId.split('.')[1])
            if(destIndex!==movedItem.start){
                if(destIndex===movedItem.target){
                    movedItem.correct=true            
                }else{
                    movedItem.correct=false
                    score.wrong++
                }                  
            }
            calculateScore(dragAndDrop)
        }
    };

    const calculateScore=(dragAndDrop)=>{
        
        let newScore={
            total:0,
            correct:0,
            wrong:score.wrong,
            notAnswered:0
        }

        dragAndDrop.forEach(column =>{
            column.draggables.forEach(item => {
                if(item.correct===true) newScore.correct++
                // if(item.correct===false) newScore.wrong++
                newScore.total++
            })
        })
        console.log(newScore)
        setScore(newScore)
        getScore(newScore)
    }

    return (
        <div className='dragAndDrop'>
            <DragDropContext onDragEnd={onDragEnd}>
                {dragAndDrop.map(item =>
                    (startExercise||!item.exercise)&&
                    <Droppable key={item.droppable} droppableId={item.droppable}>
                        {(provided, snapshot) => (
                            <div className={`droppableContainer ${item.starting?'starting':''}`}>
                            <h2 className='dragAndDropHeader'>{item.name}</h2>
                             <div
                                ref={provided.innerRef}
                                style={!item.exercise?getListStyle(snapshot.isDraggingOver,item.exercise):{}}
                            >
                                
                                <div className='draggingAreaContainer'>
                                <div className='draggingArea'>
                                    {item.icon && <MaterialIcon className='dndIcon' icon={item.icon}/>}
                                    {item.draggables.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className='draggableItem'
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}>
                                                    {item.content}
                                                </div> 
                                            )}
                                        </Draggable>
                                    ))}                                      
                                </div>
                                </div>
                                {provided.placeholder}
                            </div>
                            <p className='dragAndDropInfoText'>{item.infoText}</p>
                            </div> 
                        )}
                    </Droppable>      
                )}
            </DragDropContext>
        </div>
    )
}

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move=(source, destination, droppableSource, droppableDestination)=>{
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    const movedItem = removed

    return { result, movedItem }
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? 'lightgreen' : 'grey',
    color: isDragging ? 'black' : 'var(--text-light)',
    ...draggableStyle
});

const getListStyle = (isDraggingOver,exercise) => ({
    background: isDraggingOver ? 'lightgray' :'var(--background-color)' ,
    // padding: grid,
    // paddingTop:'5rem',
    // minHeight:'380px',
    // width: 250
});

