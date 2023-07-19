import { ColorOption, NormalHeader, Palletep } from "../components"
import { UserContext } from "../context/UserContext"
import { useContext, useState } from "react"
import {ReactComponent as Exit} from "../assets/delete.svg"

const PublicPalletePage = () => {

    const {favPallete} = useContext(UserContext)

    const [openDialog, setOpenDialog] = useState(false)

    function opd(){
      setOpenDialog(!openDialog)
    }
  return (
    <main className="my-pallete">
        
        {openDialog ? (
        <>
        <div className="dialog">

          <div className="view-container">

            <div className="nav-view">
              <Exit onClick={opd}/>
              <p>FIlter</p>
            </div>

            <div className="grid-container">
              <p>Color</p>

              <ColorOption text="red"/>

            </div>

          </div>

        </div>
        </>
      ):(
        <>
        </>
      )}
      <NormalHeader/>



      <div className="container">
        <div className="top-nav">
          <button>Back</button>
          <button onClick={opd}>Filter</button>
        </div>

        <div className="my-pallete-container">
          {favPallete.map((pallete)=>(
              <Palletep hexList={pallete}/>
          ))}

        </div>
        


      </div>
    </main>
  )
}
export default PublicPalletePage