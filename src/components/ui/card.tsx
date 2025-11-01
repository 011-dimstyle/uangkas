import React, { useContext} from 'react';

import { ThemeContext } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
function Card({
  name
}: { name : string
}): React.ReactElement | undefined {
  const themecontext = useContext(ThemeContext);

    if (!themecontext) return;
    const accent1 = themecontext.ThemeValue.Color.accent1;
    const bgCol = themecontext.ThemeValue.Color.bgColor
    const theme = themecontext.ThemeValue.Theme;


  return (
    <div className="card" style={{ backgroundColor: accent1 }}>
      <img src={`/note-${theme}.svg`} width="100%" />
      <h1 className="w-full overflow-x-auto mb-5 text-center">{name}</h1>
      <Input placeholder="Rp" type="text" onChange={e => {
        e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ""); 
      }} />
      <Button className="mt-2 w-full cursor-pointer border-solid border-1" style={{backgroundColor : bgCol, border : bgCol }}></Button>
    </div>
  );
}

export { Card }