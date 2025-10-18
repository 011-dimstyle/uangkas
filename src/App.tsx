import React  from 'react';
import {Link} from 'react-router-dom'

const Theme = {
  dark : {
    bgColor : "#1D2440",
    textColor : "#ffffff",
    accent1 : "#12192F",
    hoverEffect : "#12192F"
  },

  light : {
    bgColor : "#EFF2F9",
    textColor : "#000000",
    accent1 : "#FFFFFF",
    hoverEffect : "#6A74C8"
  }
}


function Linkbutton ({children, bgColor, to } : {children? : React.ReactNode, to :  string ,bgColor: string}): React.ReactElement{
  return (
    <Link to={to} className="button" style={{backgroundColor: bgColor}}>
      {children}
    </Link>
  )
}

export default function App(): React.ReactElement {
  let theme = Theme["dark"]
  
  return (
    <div className="min-w-screen min-h-screen" style={{backgroundColor : theme.bgColor, color: theme.textColor}}>

      <nav className="flex flex-col items-center w-80 h-screen p-2" style={{backgroundColor : theme.accent1 }}>
          <h1 className="text-2xl font-semibold w-full h-1/4 flex justify-center items-center">Uang Kas</h1>
          <div className="w-full flex flex-col items-center">
            <Linkbutton to="/home" bgColor={theme.accent1}>home</Linkbutton>
          </div>
      </nav>  
    </div>
  )
}