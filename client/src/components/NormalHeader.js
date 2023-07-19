import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { useContext } from "react"

const NormalHeader = () => {

  const {username, login, setUsername, setLogin, setFavPallete} = useContext(UserContext)

  function logout(){
    setLogin(false)
    setUsername("")
    localStorage.clear()
    setFavPallete([])
  }

  return (
    <header>
    <Link to="/" className="home"><h2>Colorgen</h2></Link>

    <nav>
      <ul>
          {login ? (
            <>
            <div className="" style={{fontWeight:"bold", color:"rgb(0, 220, 103)", cursor:"default"}}>{username}</div>
            <div className="" onClick={logout} style={{cursor: "pointer"}}>Logout</div>
            </>
          ) : (
            <>
              <Button variant="outlined" className="login" component={Link} to="/login">Login</Button>
              <Button variant="contained" className="register" disableElevation component={Link} to="/register" >Register</Button>
            </>    
          )}
            
      </ul>
    </nav>
</header>
  )
}
export default NormalHeader