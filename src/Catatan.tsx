import React from "react"
import NoteIcon from './Assets/note.svg?react';

export default function Catatan({buttonCol, textCol } : {buttonCol : string, textCol : string}): React.ReactElement{
    return(
        <div className="w-full h-full overflow-auto">
            <div>
                <NoteIcon style={{backgroundColor: textCol}} width={40}/>
            </div>
            <button className="fixed flex justify-center items-center p-3 rounded-full w-15 h-15 text-4xl cursor-pointer bottom-10 right-10" style={{backgroundColor : buttonCol}}>+</button>
        </div>
    )
}