import React, { useEffect, useState, useRef, useContext } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ThemeContext } from "./App";

type cardobjtype = Record<string, React.ReactNode>;
let cardarr: cardobjtype = {};
let cardarrcounter: number = 0;

function Card({
  index,
  setNote,
}: {
  index: string;
  setNote: React.Dispatch<React.SetStateAction<cardobjtype>>;
}): React.ReactElement | undefined {
  const Cardref = useRef<HTMLTextAreaElement | null>(null);
  const themecontext = useContext(ThemeContext);

  if (!themecontext) return;
  const accent1 = themecontext.data.accent1;
  const theme = themecontext.key;

  useEffect(() => {
    if (!Cardref.current) return;

    Cardref.current.focus();
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
          <img
            src={`edit-${theme}.svg`}
            onClick={() => {
              if (!Cardref.current) return;
              Cardref.current.disabled = false;
              Cardref.current.focus();
            }}
          />
        </button>
        <button
          className="cursor-pointer"
          onClick={() => {
            let cardRemove: cardobjtype = {};
            Object.entries(cardarr)
              .filter((key) => key[0] != index)
              .forEach((key) => (cardRemove[key[0]] = key[1]));
            setNote(cardRemove);
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
    cardarr = note;
  }, [note]);
  return (
    <div className="flex gap-10 w-full h-full overflow-hidden p-5 flex-wrap">
      {Object.entries(note)
      .map((noteRecord) => noteRecord[1])}
      <button
        onClick={() => {
          const index = `Card${cardarrcounter}`;
          cardarrcounter++;
          setNote({
            ...note,
            [index]: <Card index={index} setNote={setNote} />,
          });
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
