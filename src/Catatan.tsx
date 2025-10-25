import React, { useEffect, useState, useRef, useContext } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ThemeContext } from "./App";

type cardobjtype = Record<string, React.ReactNode>;
type cardtexttype = Record<string, string>;
let cardarr: cardobjtype = {};
let title: cardtexttype = {}; 
let cardarrcounter: number = 0;

function Card({
  index,
  
  setNote,
}: {
  index: string;
  setNote: React.Dispatch<React.SetStateAction<cardobjtype>>;
}): React.ReactElement | undefined {
  const Cardref = useRef<HTMLTextAreaElement | null>(null);
  const CardText = useRef<HTMLParagraphElement | null>(null);
  const themecontext = useContext(ThemeContext);

  if (!themecontext) return;
  const accent1 = themecontext.data.accent1;
  const theme = themecontext.key;

  useEffect(() => {
    if (!Cardref.current) return;
    Cardref.current.focus();

    if (!CardText.current) return;
    CardText.current.innerText = title[index] ?? "";
    console.log(title)
  }, []);
  return (
    <div key={index} className="card" style={{ backgroundColor: accent1 }}>
      <img src={`/note-${theme}.svg`} width="100%" />
      <div>
        <TextareaAutosize
          className="max-w-full resize-none outline-none"
          style={{ scrollbarWidth: "none" }}
          minRows={4}
          maxRows={4}
          onBlur={(e) => {
            if(!CardText.current) return
            CardText.current.style.display = "block"
            e.currentTarget.style.display = "none";
            title[index] = e.currentTarget.value
            CardText.current.innerText = e.currentTarget.value;
          }}
          onKeyDown={(e) => {
            if(!CardText.current) return
            if (e.key === "Enter" ) {
              CardText.current.style.display = "block"
              e.currentTarget.style.display = "none";
              title[index] = e.currentTarget.value;
              CardText.current.innerText = e.currentTarget.value;
            }
          }}
          ref={Cardref}
        />
        <p ref={CardText} className="h-24 break-words whitespace-normal overflow-auto" style={{display : "none", scrollbarWidth : "none"}}></p>
      </div>
      <div className="flex justify-end items-center gap-4 cursor-pointer mt-3">
        <button className="cursor-pointer">
          <img
            src={`edit-${theme}.svg`}
            onClick={() => {
              if (!Cardref.current || !CardText.current) return;
              Cardref.current.value = CardText.current.innerText  
              
              CardText.current.innerText = "";
              CardText.current.style.display = "none";
              
              Cardref.current.style.display = "block"
              Cardref.current.focus();
            }}
          />
        </button>
        <button
          className="cursor-pointer"
          onClick={() => {
            delete cardarr[index];
            delete title[index];
            setNote(cardarr);
          }}
        >
          <img src={`delete.svg`} />
        </button>
      </div>
    </div>
  );
}

export default function Catatan(): React.ReactElement | undefined {
  const firstNoteState: cardobjtype = {};
  const [note, setNote] = useState<cardobjtype>(firstNoteState);  
  const themecontext = useContext(ThemeContext);
  if (!themecontext) return;
  const accent1 = themecontext.data.accent1;

  useEffect(() => {
    cardarr = {...note};
    console.log()
  }, [note]);
  return (
    <div className="flex gap-10 w-full h-full overflow-hidden p-5 flex-wrap">
      {Object.entries(note)
      .map((noteRecord) => noteRecord[1])}
      <button
        onClick={() => {
          const index = `Card${cardarrcounter}`;  
          cardarrcounter++;
          note[index] = <Card index={index} setNote={setNote} />,
          setNote(note);
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
