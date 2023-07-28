import { useState, useRef, useEffect, useContext } from 'react';
import { UserContext } from "../context/UserContext"
import { Color, NormalHeader, Navigation, NavigationItem, SnackFail, SnackSuccess} from "../components"
import {ReactComponent as Algorythm} from "../assets/algorythm.svg"
import {ReactComponent as Plus} from "../assets/plus.svg"
import {ReactComponent as Minus} from "../assets/minus.svg"
import {ReactComponent as Share} from "../assets/share.svg"
import {ReactComponent as Eye} from "../assets/eye.svg"
import {ReactComponent as Check} from "../assets/check.svg"
import {ReactComponent as ColorWheel} from "../assets/color-wheel.svg"
import Sortable from 'sortablejs';
import { useHotkeys } from 'react-hotkeys-hook';
import { Link } from 'react-router-dom';
const generateMonochromatic = require("../algorythm/Function");

const GeneratePage = () => {

  const sortableContainer = useRef(null);

  const {username, login, setUsername, setLogin, isDropActive, setIsDropActive, colorArray, setColorArray, count, setCount, favPallete, setFavPallete} = useContext(UserContext)

  const [whatsOpen, setWhatsOpen] = useState(null)
  const [algorythmOpen, setAlgorythmOpen] = useState("Auto")
  const [colorBlind, setColorBlind] = useState("None")
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)
  const [text, setText] = useState("")
  let timer;
  
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if(fail || success){
      setTimeout(()=>{
        setFail(false)
        setSuccess(false)
        setText("")
      },1000)
      return () => clearTimeout(timer)
    }
  }, [success, fail])

  useEffect(() => {
    if (sortableContainer.current) {
      Sortable.create(sortableContainer.current, {
        animation:200,
        handle: '.drag', // handle's class
      });
    }
  }, []);
  
  const handleSortEnd = (event) => {
    const { oldIndex, newIndex } = event;
  
    if (oldIndex === newIndex) {
      return; // No change in position
    }
  
    setColorArray((prevColorArray) => {
      const updatedColorArray = Array.from(prevColorArray);
      const movedColor = updatedColorArray[oldIndex];
      updatedColorArray.splice(oldIndex, 1);
      updatedColorArray.splice(newIndex, 0, movedColor);
      return updatedColorArray;
    });
  };

  function test() {

    // let color = generateMonochromatic(count, 0, 360, 60, 60);
    //use algorythmOpen for dynami changing
    let color = generateMonochromatic(count, 
      Math.floor(Math.random() * 360) + 1, 
      Math.floor(Math.random() * 360) + 1, 
      Math.floor(Math.random() * 80) + 1, 
      Math.floor(Math.random() * 80) + 1,
      Math.floor(Math.random() * (101 - 50)) + 50,
      Math.floor(Math.random() * (101 - 100)) + 50
      )
      


    const updatedColorArray = colorArray.map((item, i) => {
      if (item.lock === true) {
        return item; // Return the unchanged item
      } else {
        return {
          ...item, // Copy the existing properties of the item
          color: color[i].color,
          hexName: color[i].hexName,
          realName: color[i].realName,
          rgb: color[i].rgb,
          hsl: color[i].hsl,
          cmyk: color[i].cmyk,
          lab: color[i].lab,
          hsv: color[i].hsv
        };
      }
    })
    setColorArray(updatedColorArray)
  }

  function generateId(){
    const id = Math.floor(Math.random() * 9999999999)
    return id
  }

  const handleKeyPress = () => {
    test();
  };

  useHotkeys('space', handleKeyPress);


  function handleOpen(item){
    //ihave item name
    if(whatsOpen !== item){
      setWhatsOpen(item)
    }else if(whatsOpen === item){
      setWhatsOpen(null)
    }
  }

  if(whatsOpen){
    setIsDropActive(true)
  }else if (whatsOpen === null){
    setIsDropActive(false)
  }

  function add(){
    if(count >= 8){

    }else{
      const id = generateId()
      setCount(count + 1)
      const newColor = { 
        color: "ffffff", 
        hexName: "#ffffff", 
        realName: "white" , 
        hsl: '(0, 0, 100)',
        rgb: "(255, 255, 255)", 
        cmyk:"(0, 0, 0, 0)", 
        lab:"(100, 0, -0)", 
        hsv:"(0, 0, 100)",
        lock:false, 
        id:id
      }
      setColorArray(prevList => [...prevList, newColor]);
    }
  }

  function min(){
    if(count <= 3){

    }else{
      setCount(count - 1)
      const array = [...colorArray]
      array.pop()
      setColorArray(array)
    }
  }

  useEffect(() => {
    console.log('Updated favPallete:', favPallete);
  }, [favPallete]);

  function save(){
    const data = {pallete : [],
                  username: username}
    for(let i=0; i<colorArray.length; i++){
      data.pallete.push(colorArray[i].hexName)
    }
    setLoading(true)

    fetch("http://localhost:4000/save",{
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response=>{
      if(response.ok){
        return response.json()
      }else{
        setLoading(false)
      }
    })
    .then(data =>{
      console.log(data.type)
      if(data.type === "success"){
        setLoading(false)

        console.log(typeof data.dbPallette)

        let palette = []
        for(let i = 0; i<data.dbPallette.length; i++){
          palette.push(data.dbPallette[i])
        }

        setFavPallete(palette)
        console.log(favPallete)
        console.log(typeof favPallete)

        setText(data.exp)
        setSuccess(true)

      }else{
        setLoading(false)
        setFail(true)
        setText(data.exp)
      }
    })
    .catch(error=>{
      console.log(error)
      setLoading(false)
      setFail(true)
      setText("sorry something went wrong")
    })
  }

  function notYetLogin(){
    setFail(true)
    setText("Plaese login")
  }

  return (
    <main className='generate-page-main'>
        <NormalHeader/>

        <div className="utility">

            <Navigation text="Space to generate color">

              <button onClick={test} className='phone-generate'>more</button>

              <div className="picked-color">
                {colorArray.map((picked, index)=>(
                  <div className='picked' style={{backgroundColor: picked.hexName}} key={index}></div>
                ))}
                              
                {
                  login ? (
                    loading ? (
                      <span class="loader"></span>
                    ) : (
                      <button onClick={save}>Save</button>
                    )
                  ) : (
                    <button onClick={notYetLogin}>Save</button>
                  )
                }
                
              </div>
              

              <div className="spacer"></div>

              <Link to="/image">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7 7C5.34315 7 4 8.34315 4 10C4 11.6569 5.34315 13 7 13C8.65685 13 10 11.6569 10 10C10 8.34315 8.65685 7 7 7ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10Z" fill="#000000" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3 3C1.34315 3 0 4.34315 0 6V18C0 19.6569 1.34315 21 3 21H21C22.6569 21 24 19.6569 24 18V6C24 4.34315 22.6569 3 21 3H3ZM21 5H3C2.44772 5 2 5.44772 2 6V18C2 18.5523 2.44772 19 3 19H7.31374L14.1924 12.1214C15.364 10.9498 17.2635 10.9498 18.435 12.1214L22 15.6863V6C22 5.44772 21.5523 5 21 5ZM21 19H10.1422L15.6066 13.5356C15.9971 13.145 16.6303 13.145 17.0208 13.5356L21.907 18.4217C21.7479 18.7633 21.4016 19 21 19Z" fill="#000000" />
                </svg>
              </Link>


              <Algorythm/>

              <NavigationItem item="algorythm" openFunction={handleOpen} open={whatsOpen === "algorythm"} logo={<ColorWheel/>}>
                <div className="item-container">
                  <div className="item-child" onClick={() => setAlgorythmOpen("Auto")}>
                    Auto
                  {algorythmOpen === "Auto" && <Check/>}</div>

                  <div className="item-child" onClick={() => setAlgorythmOpen("Monochromatic")}>
                    Monochromatic
                    {algorythmOpen === "Monochromatic" && <Check/>}</div>

                  <div className="item-child" onClick={() => setAlgorythmOpen("Analogus")}>
                    Analogus
                    {algorythmOpen === "Analogus" && <Check/>}</div>

                  <div className="item-child" onClick={() => setAlgorythmOpen("Complimentary")}>
                    Complimentary
                    {algorythmOpen === "Complimentary" && <Check/>}</div>

                  <div className="item-child" onClick={() => setAlgorythmOpen("SplitComp")}>
                    SplitComp
                    {algorythmOpen === "SplitComp" && <Check/>}</div>

                  <div className="item-child" onClick={() => setAlgorythmOpen("Triadic")}>
                    Triadic
                    {algorythmOpen === "Triadic" && <Check/>}</div>

                  <div className="item-child" onClick={() => setAlgorythmOpen("Tetradic")}>
                    Tetradic
                    {algorythmOpen === "Tetradic" && <Check/>}</div>

                </div>
              </NavigationItem>

              {/* <NavigationItem item="colorblind" openFunction={handleOpen} open={whatsOpen === "colorblind"} logo={<ColorBlind/>}>
                <div className="item-container">
                  <div className="item-child" onClick={() => setColorBlind("None")}>
                    None {colorBlind === "None" && <Check/>}</div>

                  <div className="item-child" onClick={() => setColorBlind("Protanopia")}>
                    Protanopia {colorBlind === "Protanopia" && <Check/>}</div>

                  <div className="item-child" onClick={() => setColorBlind("Deuteronopia")}>
                    Deuteronopia {colorBlind === "Deuteronopia" && <Check/>}</div>

                  <div className="item-child" onClick={() => setColorBlind("Tritanopia")}>
                    Tritanopia {colorBlind === "Tritanopia" && <Check/>}</div>

                  <div className="item-child" onClick={() => setColorBlind("Achromatopia")}>
                    Achromatopia {colorBlind === "Achromatopia" && <Check/>}</div>

                </div>
              </NavigationItem> */}

              <div className="counter">
                <Plus onClick={add} className="plus"/>
                <div className="number" style={{ pointerEvents: 'none', userSelect: 'none' }}>{count}</div>
                <Minus onClick={min} className="minus"/>
              </div>

              <div className="spacer"></div>

              <Link to="/mypallete" className='goto-pallete'><Share className="go-to-collection"/></Link>

              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 6.12549 15.0077 6.24919 15.0227 6.37063L8.08261 9.84066C7.54305 9.32015 6.80891 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15C6.80891 15 7.54305 14.6798 8.08261 14.1593L15.0227 17.6294C15.0077 17.7508 15 17.8745 15 18C15 19.6569 16.3431 21 18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C17.1911 15 16.457 15.3202 15.9174 15.8407L8.97733 12.3706C8.99229 12.2492 9 12.1255 9 12C9 11.8745 8.99229 11.7508 8.97733 11.6294L15.9174 8.15934C16.457 8.67985 17.1911 9 18 9Z" fill="currentColor" />
              </svg>

            </Navigation>

        </div>

        <div className="color-pallete sortable-container" ref={sortableContainer}>
          {colorArray.map((color, index) => (
            <Color
              id={color.id} 
              color={color.color} 
              hexName={color.hexName} 
              realName={color.realName} 
              hsl={color.hsl} 
              rgb={color.rgb} 
              cmyk={color.cmyk}
              lab={color.lab}
              hsv={color.hsv}
              key={index}
            />
          ))}
        </div>
        {success && <SnackSuccess text={text}/>}
        {fail && <SnackFail text={text}/>}

    </main>
  )
}
export default GeneratePage