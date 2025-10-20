import React, { useEffect, useState, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

function Card({
  accent1,
  theme,
  textref
  
}: {
  accent1: string;
  theme: string;
  textref: React.RefObject<HTMLTextAreaElement | null>
}): React.ReactElement {
  return (
    <div
      className="w-50 p-5 pt-0 cursor-pointer"
      style={{ backgroundColor: accent1 }}
    >
      <img src={`/note-${theme}.svg`} width="100%" />
      <div>
          <TextareaAutosize
      className="max-w-full resize-none outline-none"
      minRows={4}
      maxRows={4}
      onKeyDown={(e) => {
        // if(e.key === "Enter")
      }}
      ref={textref}
    />
      </div>
      <div className="flex gap-4 cursor-pointer">
        <button>edit</button>
        <button>delete</button>
      </div>
    </div>
  );
}

export default function Catatan({
  accent1,
  theme,
}: {
  accent1: string;
  theme: string;
}): React.ReactElement {
  const firstNoteState: React.ReactElement[] = [];
  const [note, setNote] = useState<React.ReactElement[]>(firstNoteState);
  const textreference = useRef<HTMLTextAreaElement | null>(null);

  useEffect(()=>{
    if (!textreference.current) return;
    textreference.current.focus()
  },[note])

  return (
    <div className="flex gap-10 w-full h-full overflow-hidden p-5 flex-wrap">
      {note}
      <button
        onClick={() => {
          setNote([...note, <Card theme={theme} accent1={accent1} textref={textreference}/>]);
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
