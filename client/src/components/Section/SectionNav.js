import React from 'react'
import './Section.css'

export default function SectionNav({sectionNav,setSectionNav}) {

    return (
        <div className='sectionNav'>
            {sectionNav.articlePages.map(article =>
                <button
                    key={article.id}
                    onClick={()=>setSectionNav({...sectionNav,current:article.id})}
                    className={`button ${article.id===sectionNav.current&&'selected'}`}
                >
                    {article.name}
                </button>
            )}
        </div> 
    )
}
