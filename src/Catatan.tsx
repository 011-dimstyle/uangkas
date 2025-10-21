import React, { useEffect, useState, useRef, useContext } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ThemeContext } from "./App";

function Card({
  index,
  note,
  setNote
}: {
  index: number,
  note: React.ReactNode[],
  setNote : React.Dispatch<React.SetStateAction<React.ReactNode[]>>

}): React.ReactElement | undefined {
  const Cardref = useRef<HTMLTextAreaElement | null>(null);
  const themecontext = useContext(ThemeContext)

  if(!themecontext) return
  const accent1 = themecontext.data.accent1;
  const  theme = themecontext.key;

  useEffect(()=>{
    if(!Cardref.current) return
    
    Cardref.current.focus();
  },[])
  return (
    <div
      key={index}
      className="card"
      style={{ backgroundColor: accent1 }}
    >
      <img src={`/note-${theme}.svg`} width="100%" />
      <div>
        <TextareaAutosize
          className="max-w-full resize-none outline-none"
          style={{ scrollbarWidth: "none" }}
          minRows={4}
          maxRows={4}
          onBlur={e => {
            e.currentTarget.disabled = true;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.disabled = true;
            }
          }}
          ref={Cardref}
        />
      </div>
      <div className="flex justify-end items-center gap-4 cursor-pointer mt-3">
        <button className="cursor-pointer">
          <img src={`edit-${theme}.svg`} onClick={() => {
            if (!Cardref.current) return;
            Cardref.current.disabled = false;
            Cardref.current.focus();
          }} />
        </button>
        <button className="cursor-pointer" onClick={()=>{
          // note.splice(index, 1)
          // setNote(...note)
        }}>
          <img src={`delete.svg`} />
        </button>
      </div>
    </div>
  );
}

export default function Catatan(): React.ReactElement | undefined{
  const firstNoteState: React.ReactNode[] = [];
  const [note, setNote] = useState<React.ReactNode[]>(firstNoteState);

  const themecontext = useContext(ThemeContext)
  if(!themecontext) return
  const accent1 = themecontext.data.accent1;

  return (
    <div className="flex gap-10 w-full h-full overflow-hidden p-5 flex-wrap">
      {note}
      <button
        onClick={() => {
          setNote([...note, <Card index={note.length} note={note} setNote={setNote}/>]);
        }}
        className="fixed flex justify-center items-center p-3 rounded-full w-15 h-15 text-4xl cursor-pointer bottom-10 right-10"
        style={{ backgroundColor: accent1 }}
      >
        +
      </button>
    </div>
  );
}

export { Card };
