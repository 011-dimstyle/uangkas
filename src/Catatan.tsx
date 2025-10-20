import React, { useEffect, useState, useRef, useContext } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ThemeContext } from "./App";

let textCardRef: React.RefObject<HTMLTextAreaElement | null>[] = [];

function Card({
  textref,
  index

}: {
  textref: React.RefObject<HTMLTextAreaElement | null>,
  index: number
}): React.ReactElement | undefined {
  const themecontext = useContext(ThemeContext)
  if(!themecontext) return
  const accent1 = themecontext.data.accent1;
  const  theme = themecontext.key;

  return (
    <div
      className="w-50 p-5 pt-0 cursor-pointer rounded-lg"
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
          ref={textref}
        />
      </div>
      <div className="flex justify-end items-center gap-4 cursor-pointer mt-3">
        <button className="cursor-pointer">
          <img src={`edit-${theme}.svg`} onClick={() => {
            if (!textCardRef[index].current) return;
            textCardRef[index].current.disabled = false
            console.log(textCardRef[index].current)
          }} />
        </button>
        <button className="cursor-pointer">
          <img src={`delete.svg`} />
        </button>
      </div>
    </div>
  );
}

export default function Catatan({
}: {
}): React.ReactElement | undefined{
  const firstNoteState: React.ReactElement[] = [];
  const [note, setNote] = useState<React.ReactElement[]>(firstNoteState);
  const textreference = useRef<HTMLTextAreaElement | null>(null);

  const themecontext = useContext(ThemeContext)
  if(!themecontext) return
  const accent1 = themecontext.data.accent1;

  useEffect(() => {
    if (!textreference.current) return;
    textCardRef.push(textreference)
    textreference.current.focus()
  
  }, [note])

  return (
    <div className="flex gap-10 w-full h-full overflow-hidden p-5 flex-wrap">
      {note}
      <button
        onClick={() => {
          setNote([...note, <Card textref={textreference} index={note.length} />]);
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
