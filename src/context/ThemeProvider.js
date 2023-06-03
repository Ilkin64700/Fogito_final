import React, { createContext, useEffect, useState } from 'react'
import { RiPaintBrushFill } from 'react-icons/ri';

export const ThemeContext=createContext();

const ThemeProvider = ({children}) => {
  const colors = [
    {
      icon: <RiPaintBrushFill className="paint-icons text-primary" />,
      name: " Blue",
      code:"blue",
    },
    {
      icon: <RiPaintBrushFill className="paint-icons text-danger" />,
      name: " Red",
      code:"red",
    },
    {
      icon: <RiPaintBrushFill className="paint-icons text-info" />,
      name: " Cyan",
      code:"cyan",
    },
    {
      icon: <RiPaintBrushFill className="paint-icons text-success" />,
      name: " Green",
      code:"green",
    },
    {
      icon: <RiPaintBrushFill className="paint-icons text-warning" />,
      name: " Orange",
      code:"orange",
    },
  ];


    const [theme,setTheme]=useState(localStorage.getItem("themechoice"))
    const [paintcolor,setPaintColor]=useState("")


    useEffect(() => {
        document.body.classList.add(theme)
        localStorage.setItem("themechoice",theme)
      }, [theme])
    
      useEffect(() => {
        if(localStorage.getItem("themechoice"))
        setTheme(localStorage.getItem("themechoice"))
      }, [])

  return (
    <ThemeContext.Provider value={{theme,setTheme,paintcolor,setPaintColor,colors}}>
    {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider