import React, {useState, useContext} from 'react'
import { Button } from "@/components/ui/button";
import { ThemeContext , Theme} from '@/App';
export default function Setting() : React.ReactElement | undefined{
    const themecontext = useContext(ThemeContext);
    if(!themecontext) return
    const setThemeValue = themecontext.SetThemeValue
    return (
        <>
            <Button onClick={()=>{
                const theme = themecontext.ThemeValue.Theme =="dark" ? "light" : "dark";
                const color = Theme[theme];
                setThemeValue({Theme: theme , Color: color})
            }}>change</Button>
        </>
    )
}