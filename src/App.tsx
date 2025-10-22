import React, { createContext, useContext } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Catatan from "./Catatan";

interface ColorType {
   bgColor: string;
    textColor: string;
    accent1: string;
    accent2: string;
    hoverEffect: string;
}

const Theme = {
  dark: {
    bgColor: "#1D2440",
    textColor: "#ffffff",
    accent1: "#12192F",
    accent2: "#1c398e",
    hoverEffect: "#12192F",
  },
  
  light: {
    bgColor: "#EFF2F9",
    textColor: "#000000",
    accent1: "#FFFFFF",
    accent2: "oklch(80.9% 0.105 251.813)",
    hoverEffect: "#6A74C8",
  },
};

export const ThemeContext = createContext<{data : ColorType ,key : keyof typeof Theme} | null>(null);

function Linkbutton({
  children,
  to,
  imgsrc
}: {
  children?: React.ReactNode;
  to: string;
  imgsrc: string
}): React.ReactElement {
  const color = useContext(ThemeContext)?.data;
  
  return (
    <Link to={to} className="button" style={{ backgroundColor: color?.bgColor}}>
      <img src={imgsrc} />
      {children}
    </Link>
  );
}

function AppBody(): React.ReactElement | undefined{
  const themecontext = useContext(ThemeContext);
  if(!themecontext) return
  const color = themecontext.data
  const theme = themecontext.key;

  return(
     <div
      className="min-w-screen min-h-screen flex"
      style={{ backgroundColor: color.bgColor, color: color.textColor }}
    >
      <nav
        className="flex flex-col items-center w-80 min-h-screen p-2"
        style={{ backgroundColor: color.accent1 }}
      >
        <div className="w-full h-1/4 flex flex-col justify-center items-center">
          <img src={`profile-${theme}.svg`} width="80px" />
        </div>
        <div className="w-full flex flex-col items-center">
          <Linkbutton to="/" imgsrc={`pencilnote-${theme}.svg`}>
            Catatan
          </Linkbutton>
        </div>
      </nav>
      <main className="flex flex-col w-[calc(100%-320px)]">
        <section
          className="w-full h-10 flex justify-center items-center p-2"
          style={{ backgroundColor: color.accent2 }}
        >
          <h1 className="text-[20px] font-semibold flex justify-center items-center">
            Uang Kas
          </h1>
        </section>
        <section className="w-full h-[calc(100%-40px)">
          <Routes>
            <Route
              path="/"
              element={<Catatan />}
            />
          </Routes>
        </section>
      </main>
    </div>
  )
}

export default function App(): React.ReactElement {
  let theme: keyof typeof Theme = "dark";
  let color = Theme[theme];

  return (
    <ThemeContext.Provider value={{data : color , key : theme}}>
      <AppBody />

    </ThemeContext.Provider>

  );
}
