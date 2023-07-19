import React, { useState, useEffect} from "react"
import { Tooltip } from "@mui/material"
import { UserContext } from "../context/UserContext"
import { useContext} from "react"
import isDarkColor from 'is-dark-color'
import {SnackSuccess } from "../components"
import { HexColorPicker } from "react-colorful";
import {ReactComponent as Exit} from "../assets/delete.svg"
import {ReactComponent as Copy} from "../assets/copy.svg"

const ntc = require('../algorythm/ntc.js');


const Color = (props) => {

    const {colorArray, setColorArray, lockArray, setLockArray, count, setCount} = useContext(UserContext)
    const {isDropActive, setIsDropActive} = useContext(UserContext)
    
    const [showPick, setShowPick] = useState(false)
    const [pickColor, setPickColor] = useState("");

    const [hover, setHover] = useState(false)
    const [close, setClose] = useState(true)
    const [openDialog, setOpenDialog] = useState(false) 

    const [success, setSuccess] = useState(false)
    const [fail, setFail] = useState(false)
    const [text, setText] = useState("")
    let timer

    const id = props.id

    useEffect(()=>{
      if(fail || success){
        setTimeout(()=>{
          setFail(false)
          setSuccess(false)
          setText("")
        },500)
        return () => clearTimeout(timer)
      }
    }, [success, fail])

    function handleMouseEnter(){
      setHover(true)
    }
  
    function handleMouseLeave(){
      setHover(false)
    }

    function setLockClose(){
      setClose(false)
      const foundColor = colorArray.find(color => color.id === id)
      foundColor.lock = true
      console.log(foundColor)
    }

    function setLockOpen(){
      setClose(true)
      const foundColor = colorArray.find(color => color.id === id)
      foundColor.lock = false
      console.log(foundColor)
    }

    function deleteColor(){
      const foundColor = colorArray.find(color => color.id === id)
      console.log(foundColor)
      setColorArray(prevColorArray => prevColorArray.filter(color => color.id !== id));
      setCount(count-1)
    }

    function copyHex(){
      const hex = props.hexName
      navigator.clipboard.writeText(hex)
      setText("Hex Copied !")
      setSuccess(true)
    }

    function copyName(){
      const name = props.realName
      navigator.clipboard.writeText(name)
      setText("Name Copied !")
      setSuccess(true)
    }

    function copyRgb(){
      const name = props.rgb
      navigator.clipboard.writeText(name)
      setText("rgb Copied !")
      setSuccess(true)
    }

    function copyCmyk(){
      const name = props.cmyk
      navigator.clipboard.writeText(name)
      setText("cmyk Copied !")
      setSuccess(true)
    }

    function copyHsl(){
      const name = props.hsl
      navigator.clipboard.writeText(name)
      setText("hsl Copied !")
      setSuccess(true)
    }

    function copyLab(){
      const name = props.lab
      navigator.clipboard.writeText(name)
      setText("lab Copied !")
      setSuccess(true)
    }

    function copyHsv(){
      const name = props.hsv
      navigator.clipboard.writeText(name)
      setText("hsv Copied !")
      setSuccess(true)
    }
  
  function copyAll(){
    const name = `${props.realName}, ${props.hexName}`
    navigator.clipboard.writeText(name)
    setText("Copied to clipboard")
    setSuccess(true)
  }
 
    function revealShowPick(){
      setShowPick(true)
      setPickColor(props.hexName)
    }

    function cancel(){
      setShowPick(false)
    }

    function save(){
      const name = ntc.name(pickColor)
      const foundColor = colorArray.find(color => color.id === id)
      foundColor.hexName = pickColor
      foundColor.color = pickColor
      foundColor.realName = name[1]
      const color= colorArray

      const updatedColorArray = colorArray.map((item, i) => {
          return {
            ...item, // Copy the existing properties of the item
            color: color[i].color,
            hexName: color[i].hexName,
            realName: color[i].realName,
          };
      })
      setColorArray(updatedColorArray)
      setShowPick(false)
    }

    function openingDialog(){
      setOpenDialog(true)
    }

    function closingDialog(){
      setOpenDialog(false)
    }

  return (

  <>

    {openDialog ? (
      <>
        <div className="dialog">
          <div className="view-container">

            <div className="nav-view">
              <Exit onClick={closingDialog}/>
              <p>View color</p>
              <Copy onClick={copyAll}/>
            </div>

            <div className="view-color" style={{ backgroundColor: showPick ? pickColor : props.hexName }}>
              <div className="name" onClick={copyName}>
                <p style={{ color : isDarkColor(props.hexName) ? "white" : "black" }}>RealName</p>
                <p style={{ color : isDarkColor(props.hexName) ? "white" : "black" }}>{props.realName}</p>
              </div>
              <div className="name" onClick={copyHex}>
                <p style={{ color : isDarkColor(props.hexName) ? "white" : "black" }}>HexName</p>
                <p style={{ color : isDarkColor(props.hexName) ? "white" : "black" }}>Hex: {props.hexName}</p>
              </div>
              <div className="name" onClick={copyRgb}>
                <p style={{ color : isDarkColor(props.hexName) ? "white" : "black" }}>RGB</p>
                <p style={{ color : isDarkColor(props.hexName) ? "white" : "black" }}>rgb {props.rgb}</p>
              </div>
              <div className="name" onClick={copyHsl}>
                <p style={{ color : isDarkColor(props.hexName) ? "white" : "black" }}>Hsl</p>
                <p style={{ color : isDarkColor(props.hexName) ? "white" : "black" }}>hsl {props.hsl}</p>
              </div>
              <div className="name" onClick={copyCmyk}>
                <p style={{ color : isDarkColor(props.hexName) ? "white" : "black" }}>CMYK</p>
                <p style={{ color : isDarkColor(props.hexName) ? "white" : "black" }}>cmyk {props.cmyk}</p>
              </div>
              <div className="name" onClick={copyLab}>
                <p style={{ color : isDarkColor(props.hexName) ? "white" : "black" }}>LAB</p>
                <p style={{ color : isDarkColor(props.hexName) ? "white" : "black" }}>lab {props.lab}</p>
              </div>
              <div className="name" onClick={copyHsv}>
                <p style={{ color : isDarkColor(props.hexName) ? "white" : "black" }}>HSV</p>
                <p style={{ color : isDarkColor(props.hexName) ? "white" : "black" }}>hsv {props.hsv}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    ):(
      <></>
    )}
    

    <div 
      className="color" 
      style={{ backgroundColor: showPick ? pickColor : props.hexName }}
      onMouseEnter={isDropActive ? undefined : handleMouseEnter}
      onMouseLeave={isDropActive ? undefined : handleMouseLeave}>



        {showPick ? (
          <>
          </>
        ):(
        <>
          <p className="realName" style={{ color : isDarkColor(props.hexName) ? "white" : "black" }} onClick={copyName}>{props.realName}</p>
          <h2 className="hexName" style={{ color : isDarkColor(props.hexName) ? "white" : "black" }} onClick={copyHex}>{props.hexName}</h2>

          {close ? (
          <Tooltip title="Lock" arrow>
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon" style={{ opacity: hover ? 1 : 0 }} onClick={setLockClose}>
              <g id="Interface / Lock_Open">
                <path id="Vector" d="M9 9H7.2002C6.08009 9 5.51962 9 5.0918 9.21799C4.71547 9.40973 4.40973 9.71547 4.21799 10.0918C4 10.5196 4 11.0801 4 12.2002V17.8002C4 18.9203 4 19.4801 4.21799 19.9079C4.40973 20.2842 4.71547 20.5905 5.0918 20.7822C5.51921 21 6.07901 21 7.19694 21L16.8031 21C17.921 21 18.48 21 18.9074 20.7822C19.2837 20.5905 19.5905 20.2842 19.7822 19.9079C20 19.4805 20 18.9215 20 17.8036V12.1969C20 11.079 20 10.5192 19.7822 10.0918C19.5905 9.71547 19.2837 9.40973 18.9074 9.21799C18.4796 9 17.9203 9 16.8002 9H9ZM9 9V6.12012C9 4.39699 10.3 3 11.9037 3C12.7277 3 13.4708 3.36879 13.9993 3.96113" stroke={isDarkColor(props.hexName) ? 'white' : 'black'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
            </svg>
          </Tooltip>

          ) : (
          <Tooltip title="Unlock" arrow>
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon" style={{ opacity: hover ? 1 : 1 }} onClick={setLockOpen}>
              <g id="Interface / Lock">
                <path id="Vector" d="M9.23047 9H7.2002C6.08009 9 5.51962 9 5.0918 9.21799C4.71547 9.40973 4.40973 9.71547 4.21799 10.0918C4 10.5196 4 11.0801 4 12.2002V17.8002C4 18.9203 4 19.4801 4.21799 19.9079C4.40973 20.2842 4.71547 20.5905 5.0918 20.7822C5.5192 21 6.07902 21 7.19694 21H16.8031C17.921 21 18.48 21 18.9074 20.7822C19.2837 20.5905 19.5905 20.2842 19.7822 19.9079C20 19.4805 20 18.9215 20 17.8036V12.1969C20 11.079 20 10.5192 19.7822 10.0918C19.5905 9.71547 19.2837 9.40973 18.9074 9.21799C18.4796 9 17.9203 9 16.8002 9H14.7689M9.23047 9H14.7689M9.23047 9C9.10302 9 9 8.89668 9 8.76923V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V8.76923C15 8.89668 14.8964 9 14.7689 9" stroke={isDarkColor(props.hexName) ? 'white' : 'black'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
            </svg>
          </Tooltip>

          )}

          <Tooltip title="Move" arrow className="icon drag" style={{opacity : hover ? 1 : 0 ,}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.24268 7H11.2427V11.0001H11.2477V13.0001H11.2427V17H9.24268V13.0001L4.82846 13L6.65685 14.8284L5.24264 16.2426L1 12L5.24264 7.75732L6.65685 9.17154L4.82839 11H9.24264L9.24268 7Z" fill={isDarkColor(props.hexName) ? 'white' : 'black'} />
            <path d="M15.2527 7.00012H13.2527V11.0001H13.2477V13.0001H13.2527V17.0001H15.2527V13.0001L19.667 13L17.8385 14.8285L19.2527 16.2427L23.4954 12L19.2527 7.75739L17.8385 9.17161L19.6669 11H15.2527L15.2527 7.00012Z" fill={isDarkColor(props.hexName) ? 'white' : 'black'} />
          </svg>
          </Tooltip>
          
          <Tooltip title="View" className="icon" style={{opacity : hover ? 1 : 0}} onClick={openingDialog} arrow>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill={isDarkColor(props.hexName) ? 'white' : 'black'} />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C17.5915 3 22.2898 6.82432 23.6219 12C22.2898 17.1757 17.5915 21 12 21C6.40848 21 1.71018 17.1757 0.378052 12C1.71018 6.82432 6.40848 3 12 3ZM12 19C7.52443 19 3.73132 16.0581 2.45723 12C3.73132 7.94186 7.52443 5 12 5C16.4756 5 20.2687 7.94186 21.5428 12C20.2687 16.0581 16.4756 19 12 19Z" fill={isDarkColor(props.hexName) ? 'white' : 'black'} />
          </svg>
          </Tooltip>

          <Tooltip title="Gradient" onClick={revealShowPick} arrow>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon" style={{opacity : hover ? 1 : 0}}>
              <path d="M4 4H8V8H4V4Z" fill={isDarkColor(props.hexName) ? 'white' : 'black'} />
              <path d="M4 10H8V14H4V10Z" fill={isDarkColor(props.hexName) ? 'white' : 'black'} />
              <path d="M8 16H4V20H8V16Z" fill={isDarkColor(props.hexName) ? 'white' : 'black'} />
              <path d="M10 4H14V8H10V4Z" fill={isDarkColor(props.hexName) ? 'white' : 'black'} />
              <path d="M14 10H10V14H14V10Z" fill={isDarkColor(props.hexName) ? 'white' : 'black'} />
              <path d="M10 16H14V20H10V16Z" fill={isDarkColor(props.hexName) ? 'white' : 'black'} />
              <path d="M20 4H16V8H20V4Z" fill={isDarkColor(props.hexName) ? 'white' : 'black'} />
              <path d="M16 10H20V14H16V10Z" fill={isDarkColor(props.hexName) ? 'white' : 'black'} />
              <path d="M20 16H16V20H20V16Z" fill={isDarkColor(props.hexName) ? 'white' : 'black'} />
            </svg>
          </Tooltip>
          
          <Tooltip title="Copy" arrow>
            <svg onClick={copyAll} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon" style={{opacity : hover ? 1 : 0}}>
              <path d="M13 7H7V5H13V7Z" fill={isDarkColor(props.hexName) ? 'white' : 'black'} />
              <path d="M13 11H7V9H13V11Z" fill={isDarkColor(props.hexName) ? 'white' : 'black'} />
              <path d="M7 15H13V13H7V15Z" fill={isDarkColor(props.hexName) ? 'white' : 'black'} />
              <path fill={isDarkColor(props.hexName) ? 'white' : 'black'} fill-rule="evenodd" clip-rule="evenodd" d="M3 19V1H17V5H21V23H7V19H3ZM15 17V3H5V17H15ZM17 7V19H9V21H19V7H17Z"/>
            </svg>
          </Tooltip>

          
          <Tooltip title="Delete" arrow>
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={deleteColor} className="icon" style={{opacity : hover ? 1 : 0}}>
              <g id="Menu / Close_MD">
                <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke={isDarkColor(props.hexName) ? 'white' : 'black'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
            </svg>
          </Tooltip>
        </>
        )}
        


        {showPick && 
          <div className="color-picker">

            <HexColorPicker color={pickColor} onChange={setPickColor} className="hex-color-picker"></HexColorPicker>
            <button onClick={save}style={{ backgroundColor: isDarkColor(pickColor) ? "white" : "black", color: isDarkColor(pickColor) ? "black" : "white" }}>save</button>
            <button onClick={cancel}style={{ backgroundColor: isDarkColor(pickColor) ? "white" : "black", color: isDarkColor(pickColor) ? "black" : "white" }}>cancel</button>

          </div>
        } 




        {success && <SnackSuccess text={text}/>}

      </div>
    </>
  )
}
export default Color
