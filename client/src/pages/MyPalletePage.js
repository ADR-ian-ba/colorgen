import { Footer, NormalHeader, Pallete } from "../components"
import { UserContext } from "../context/UserContext"
import { useContext} from "react"
import { Link } from "react-router-dom"

const MyPallete = () => {

  const {favPallete} = useContext(UserContext)
  function back(){
    window.location.href ="/generate"
  }

  return (
    <main className="my-pallete">
      <NormalHeader/>
      <div className="container">

        <div className="top-nav">
          <Link to="/generate"><button>Back</button></Link>

        </div>

        {favPallete.length >= 1 ? (
          <div className="my-pallete-container">
            {favPallete.map((pallete)=>(
                <Pallete hexList={pallete.color} id={pallete.id}/>
            ))}

          </div>
        ):(
        <>
          <h1>No Pallette Found</h1>
          <p >go to generate and generate some pallette</p>
        </>
        )}




      </div>

      <Footer/>
    </main>
  )
}
export default MyPallete