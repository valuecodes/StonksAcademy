import React from 'react'

export default function ArticleSubNav({articleSubNav,setArticleSubNav}) {
    return (
        <div className='articleSubNav'>
            {articleSubNav.subpages.map(subpage =>
                <button
                    key={subpage.id}
                    onClick={()=>setArticleSubNav({...articleSubNav,current:subpage.id})}
                    className={`button ${subpage.id===articleSubNav.current&&'selected'}`}
                >
                    {subpage.name}
                </button>
            )}
        </div> 
    )
}
