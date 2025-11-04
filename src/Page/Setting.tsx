import React, { useContext, useState } from "react";
import { Sun, Moon, Brush } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeContext, Theme } from "@/App";
import { initdb, readalldb, adddatadb } from "@/services/db";
import { QueryResult } from "@tauri-apps/plugin-sql";
// import { invoke } from "@tauri-apps/api/core"

export default function Setting(): React.ReactElement | undefined {
  const [hasil, setHasil] = useState<QueryResult | null>(null)
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
          await initdb("table1")
        }}> create db 
      </Button>
      <Button onClick={async ()=>{
        await adddatadb("table1", {name: "dimss", amount: 10000})
      }}>
        insert data
      </Button>
      <Button onClick={async ()=>{
        console.log(await readalldb("table1"))
      }}>
        read data
      </Button>
      <div>
      </div>
    </div>
  );
}
