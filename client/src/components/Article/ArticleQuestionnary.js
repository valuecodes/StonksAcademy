import React from 'react'

export default function ArticleQuestionnary({questions,setQuestionAswer,readOnly}) {
    return (
        <div className='exerciseQuestions'>
            {questions.map(question =>
                <ul key={question.id} className='exerciseQuestion'>
                    {question.parameters.map((item,index)=>
                        <li key={index}>
                            <label>{item.name}</label>
                            <h3>{item.value}</h3>                                 
                        </li>
                    )}
                    <li>
                        <label>{question.solve.name}</label>
                        <input 
                            type='number' 
                            readOnly={readOnly}
                            value={question.solve.value} 
                            onChange={(e)=>setQuestionAswer(e,question.id)}
                        />   
                    </li>
                </ul>
            )}
        </div>
    )
}
