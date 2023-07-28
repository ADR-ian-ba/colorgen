import { createContext, useState } from "react"

const UserContext = createContext()

const UserContextProvider = (props) => {
    
    const [login, setLogin] = useState(false)
    const [username, setUsername] = useState("")
    const [isDropActive, setIsDropActive] = useState(false)
    const [favPallete, setFavPallete] = useState([])
    const [count, setCount] = useState(4)
    const [colorArray , setColorArray] = useState([
        {
            color:"faca38", 
            hexName:"#faca38", 
            realName:"sunGlow",   
            rgb:"(250, 202, 56)", 
            hsl:"(46, 96, 60)",
            cmyk:"(0, 19, 78, 2)",
            lab:"(83, 4, 74)",
            hsv:"(45, 78, 98)",
            lock:false, 
            id:1},
        {
            color:"3868fa", 
            hexName:"#3868fa", 
            realName:"Ultramarine Blue", 
            rgb:"(56, 104, 250)", 
            hsl:"(226, 96, 60)",
            cmyk:"(78, 58, 0, 2)",
            lab:"(49, 35, -77)",
            hsv:"(225, 78, 98)",
            lock:false, 
            id:2},
        {
            color:"faca38", 
            hexName:"#faca38", 
            realName:"sunGlow", 
            rgb:"(250, 202, 56)", 
            hsl:"(46, 96, 60)",
            cmyk:"(0, 19, 78, 2)",
            lab:"(83, 4, 74)",
            hsv:"(45, 78, 98)",
            lock:false, 
            id:3},
        {
            color:"3868fa", 
            hexName:"#3868fa", 
            realName:"Ultramarine Blue", 
            rgb:"(56, 104, 250)", 
            hsl:"(226, 96, 60)",
            cmyk:"(78, 58, 0, 2)",
            lab:"(49, 35, -77)",
            hsv:"(225, 78, 98)",
            lock:false, 
            id:4},
      ])
    

    return(
        <UserContext.Provider value={{count, setCount, colorArray, setColorArray, login, setLogin, username, setUsername, favPallete, setFavPallete, isDropActive, setIsDropActive}}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext, UserContextProvider}
