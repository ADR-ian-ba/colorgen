import {Link} from "react-router-dom"
import Button from "@mui/material/Button"
import { Footer, LandingHeader, NormalHeader } from "../components"
import { UserContext } from "../context/UserContext"
import { useContext } from "react"

const LandingPage = () => {

  const {username, login, setUsername, setLogin} = useContext(UserContext)

  return (
    <main>
      <NormalHeader/>

      <section className="hero-section">
        <div className="image">
          <div className="hero-img"></div>
        </div>
        
        <div className="text">
          <h1>Colorgen</h1>
          <p>your own, Free to use color pallete generator ready to use at your dispossal</p>
          
          <Button variant="contained" className="generate" disableElevation component={Link} to="/generate">Generate</Button>
          {login ? 
            <></>
          :
            <Button variant="outlined" className="login" component={Link} to="/login">Login</Button>
          }
        </div>

      </section>

      <Footer/>

    </main>
  )
}
export default LandingPage