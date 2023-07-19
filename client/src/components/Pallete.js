import isDarkColor from 'is-dark-color'
import { Tooltip } from '@mui/material';
import { UserContext } from "../context/UserContext"
import { useContext, useEffect} from "react"

const Pallete = (props) => {
  const {username, favPallete, setFavPallete} = useContext(UserContext)

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    console.log('Updated favPallete:', favPallete);
  }, [favPallete]);

  function deletePallette(){
    const data = {
      id : props.id,
      username: username
    }

    fetch("http://localhost:4000/deletepallette", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify(data)
    })
    .then(response=>{
      if(response.ok){
        return response.json()
      }else{

      }
    })
    .then(data=>{
      if(data.type === "success"){
        console.log(typeof data.dbPallette)

        let palette = []
        for(let i = 0; i<data.dbPallette.length; i++){
          palette.push(data.dbPallette[i])
        }

        setFavPallete(palette)
        console.log(favPallete)
        console.log(typeof favPallete)


      }else{

      }
    })
    .catch(error=>{
      console.log(error)
    })

  } 


  return (
    <div className="every-each-pallete">

        <div className="container-each">
            {props.hexList.map((hex)=>(
                <div className="each-pallete" style={{backgroundColor: hex}} onClick={() => copyToClipboard(hex)}>
                  <p style={{ color : isDarkColor(hex) ? "white" : "black"}} >{hex}</p>
                </div>
            ))} 
        </div>
        
        <div className="container-utility">

          <Tooltip title="Share" className="icon"arrow>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 6.12549 15.0077 6.24919 15.0227 6.37063L8.08261 9.84066C7.54305 9.32015 6.80891 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15C6.80891 15 7.54305 14.6798 8.08261 14.1593L15.0227 17.6294C15.0077 17.7508 15 17.8745 15 18C15 19.6569 16.3431 21 18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C17.1911 15 16.457 15.3202 15.9174 15.8407L8.97733 12.3706C8.99229 12.2492 9 12.1255 9 12C9 11.8745 8.99229 11.7508 8.97733 11.6294L15.9174 8.15934C16.457 8.67985 17.1911 9 18 9Z" fill="currentColor" />
            </svg>
          </Tooltip>

          <Tooltip title="View" className="icon"arrow>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="#000000"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C17.5915 3 22.2898 6.82432 23.6219 12C22.2898 17.1757 17.5915 21 12 21C6.40848 21 1.71018 17.1757 0.378052 12C1.71018 6.82432 6.40848 3 12 3ZM12 19C7.52443 19 3.73132 16.0581 2.45723 12C3.73132 7.94186 7.52443 5 12 5C16.4756 5 20.2687 7.94186 21.5428 12C20.2687 16.0581 16.4756 19 12 19Z" fill="#000000" />
            </svg>
          </Tooltip>

          <Tooltip title="Delete" className="icon" onClick={deletePallette} arrow>
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
              <g id="Menu / Close_MD">
                <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
            </svg>
          </Tooltip>
        </div>


    </div>

  )
}
export default Pallete

//props.hexList is a list

{/* <Tooltip  title={<p style={{fontSize: "20px", height:"fit-content", margin:"0"}}>{hex}</p>} placement="top" followCursor>
</Tooltip> */}