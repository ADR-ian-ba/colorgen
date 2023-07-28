import { NormalHeader } from "../components"
import { Link } from "react-router-dom"

const ImagePage = () => {
  return (
    <main className="image-pallete">
      <NormalHeader/>

      <div className="container">
        <div className="top-nav">
            <Link to="/generate"><button>Back</button></Link>
        </div>
      </div>


    </main>
  )
}
export default ImagePage