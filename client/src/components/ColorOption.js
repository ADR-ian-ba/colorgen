import { useState } from "react"

const ColorOption = (props) => {

    const [select, setSelect] = useState(false)

    const styles = {
        backgroundColor: select ? "lightBlue" : "transparent",
      };

    function handleClick(){
        setSelect(!select)
    }

  return (
    <p className="pick" onClick={handleClick} style={styles}>
        {props.text}
    </p>
  )
}
export default ColorOption