import React,{ useEffect, useState, useRef } from "react"
import TextareaAutosize from "react-textarea-autosize"

function Card({accent1, theme} : { accent1 : string, theme : string }): React.ReactElement {

    return(
        <div className="w-50 p-5 pt-0" style={{backgroundColor : accent1}}>
            <img src={`/note-${theme}.svg`} width="100%"/>
            <div>
                <TextareaAutosize className="max-w-full resize-none outline-none" minRows={4} maxRows={4}/>
            </div>
        </div>
    
    )
}

export default function Catatan({accent1, theme } : {accent1 : string, theme : string}): React.ReactElement{
    const CatatanDiv = useRef<HTMLDivElement | null>(null);
    useEffect(()=>{
        if (!CatatanDiv.current) return

        //adding card
    },[])
    return(
        <div className="flex gap-10 w-full h-full overflow-hidden p-5 flex-wrap" ref={CatatanDiv}>
            
            <button
            onClick={()=>{
            }} 
            className="fixed flex justify-center items-center p-3 rounded-full w-15 h-15 text-4xl cursor-pointer bottom-10 right-10" style={{backgroundColor : accent1}}>+</button>
        </div>
    )
}

export { Card }