import React, { useContext } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeContext, Theme } from "@/App";
import { initdb } from "@/services/db";
// import { invoke } from "@tauri-apps/api/core"

export default function Setting(): React.ReactElement | undefined {
  const themecontext = useContext(ThemeContext);
  if (!themecontext) return;
  const setThemeValue = themecontext.SetThemeValue;
  return (
    <div className="p-5">
      <Button
        style={{ backgroundColor: themecontext.ThemeValue.Color.accent1 }}
        variant="outline"
        size="sm"
        onClick={() => {
          const theme = themecontext.ThemeValue.Theme == "dark" ? "light" : "dark";
          const color = Theme[theme];
          setThemeValue({ Theme: theme, Color: color });
        }}
      >
        {themecontext.ThemeValue.Theme === "dark" ? (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
        <Button onClick={async ()=>{
          console.log(await initdb())
        }}> say it </Button>
    </div>
  );
}
