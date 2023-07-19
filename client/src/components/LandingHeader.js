import { Button } from "@mui/material"
import { Link } from "react-router-dom"

const LandingHeader = () => {
  return (
    <header>
        <Link to="/" className="home"><h2>Colorgen</h2></Link>

        <nav>
          <ul>
              <a href="#">about</a>
              <div className="spacer"></div>

                <Button variant="outlined" className="login" component={Link} to="/login">Login</Button>
                <Button variant="contained" className="register" disableElevation component={Link} to="/register" >Register</Button>
          </ul>
        </nav>
    </header>
  )
}
export default LandingHeader