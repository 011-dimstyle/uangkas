import React, { createContext, useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Pemasukan from "@/Page/Pemasukan";
import Pengeluaran from "@/Page/Pengeluaran";
import History from "@/Page/History";
import Setting from "@/Page/Setting";
import { Linkbutton } from "@/components/ui/button";


interface ColorType {
  bgColor: string;
  textColor: string;
  accent1: string;
  accent2: string;
  hoverEffect: string;
}

export const Theme = {
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

interface ThemeValueType{ 
  Theme: keyof typeof Theme,
  Color: ColorType
}

interface ThemeType{
  ThemeValue : ThemeValueType,
  SetThemeValue : React.Dispatch<React.SetStateAction<ThemeValueType>>
}

export const ThemeContext = createContext<ThemeType | null>(null);







function AppBody(): React.ReactElement | undefined {
  const themecontext = useContext(ThemeContext);

  if (!themecontext) return;
  const color = themecontext.ThemeValue.Color;
  const theme = themecontext.ThemeValue.Theme;

  return (
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
        <div className="w-full flex flex-col items-center gap-5 ">
          <Linkbutton to="/" imgsrc={`pencilnote-${theme}.svg`}>
            Pemasukan
          </Linkbutton>
          <Linkbutton to="/pengeluaran" imgsrc={`receipt-${theme}.svg`}>
            Pengeluaran
          </Linkbutton>
          <Linkbutton to="/history" imgsrc={`history-${theme}.svg`}>History</Linkbutton>
          <Linkbutton to="/setting" imgsrc={`setting-${theme}.svg`}>
            Settings
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
        <section className="w-full h-[calc(100%-40px) overflow-auto">
          <Routes>
            <Route path="/" element={<Pemasukan />} />
            <Route path="/pengeluaran" element={<Pengeluaran />} />
            <Route path="/history" element={<History />} />
            <Route path="/setting" element={<Setting />} />
          </Routes>
        </section>
      </main>
    </div>
  );
}

export default function App(): React.ReactElement {
  let theme: keyof typeof Theme = "dark";
  let color = Theme[theme];
  const  [themeState, setThemeState]  = useState<ThemeValueType>({
    Theme : theme,
    Color: color
  });


  return (
    <ThemeContext.Provider value={{ThemeValue: themeState, SetThemeValue : setThemeState}}>
      <AppBody />
    </ThemeContext.Provider>
  );
}
