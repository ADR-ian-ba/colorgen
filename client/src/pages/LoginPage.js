import { Link } from "react-router-dom"
import { NormalHeader, SnackFail, SnackSuccess } from "../components"
import { UserContext } from "../context/UserContext"
import { useContext, useEffect, useState } from "react"

const LoginPage = () => {

  const {username, login, setUsername, setLogin} = useContext(UserContext)
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  let timer;


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



  function submitLogin(e){
    setIsLoading(true)
    e.preventDefault()

    const data ={
      name :name,
      password: password
    }

    fetch("http://localhost:4000/login", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response=>{
      if(response.ok){
        return response.json()
      }else{

      }
    })
    .then(data=>{
      if(data.type === "success"){
        console.log(data)
        localStorage.setItem("token", data.token)
        setUsername(data.username)
        setLogin(true)
        
        setSuccess(true)
        setText(data.exp)
        setIsLoading(false)

        setTimeout(()=>{
          window.location.href = "/generate"
        }, 1500)

      }else{
        setFail(true)
        setText(data.exp)
        setIsLoading(false)
      }
    })
    .catch(error=>{
      console.log(error)
      setFail(true)
      setText("sorry something went wrong")
      setIsLoading(false)
    })
  }

  return (
    <main>
      <NormalHeader/>
      <div className="register-container">
        
        <form action="" onSubmit={submitLogin}>
          <h1>Log<span>in</span></h1> 

          <label>Username</label>
          <input 
            type="text" 
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            placeHolder="Username"/>

          <label>Password</label>
          <input 
            type="password" 
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeHolder="Password"/>
          
          {isLoading ? 
            <span class="loader"></span>
          :
          <>
            <button>Login</button>
            <p>Not yet a member? <span><Link to="/register" className="login">Register</Link></span></p>
            <div className="forget">
            <Link className="forget-link" to="/forgetusername">forget <span>Username?</span></Link>
            <Link className="forget-link" to="/forgetpassword">forget <span>Password?</span></Link>
          </div>
          </>
            
          }
        </form>
        {success && <SnackSuccess text={text}/>}
        {fail && <SnackFail text={text}/>}
      </div>
    </main>
  )
}
export default LoginPage