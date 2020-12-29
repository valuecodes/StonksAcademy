import React from 'react'

export default function CourseHeader({header,className=''}) {
    return (
        <div className={`screenHeader ${className}`}>
            <h1>{header}</h1>
        </div>
    )
}

