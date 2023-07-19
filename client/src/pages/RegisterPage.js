import {Link} from "react-router-dom"
import { NormalHeader, SnackFail, SnackSuccess } from "../components"
import { useState, useEffect } from "react"

const RegisterPage = () => {

  const[username, setUsername] = useState("")
  const[password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  let timer;

  useEffect(()=>{
    if(success || fail){
      const timer = setTimeout(()=>{
        setSuccess(false)
        setFail(false)
        setText("")
      }, 4000)
      return () => clearTimeout(timer);
    }
  }, [success, fail])

  function handleSubmit(e){
    setIsLoading(true)
    e.preventDefault()

    const data = {
      username:username,
      password:password,
      email:email,
    }

    fetch("http://localhost:4000/register",{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify(data)
    })
    .then(response =>{
      if (response.ok){
        return response.json()
      }else{
        setFail(true)
        setText("cant fetch to server")
      }
    })
    .then(data =>{
      if(data.type === "success"){
        setSuccess(true)
        setText(data.exp)
        setIsLoading(false)
        if(data.exp === "user already verified"){
          setTimeout(()=>{
            window.location.href="/login"
          }, 1000)
        }else{
          setTimeout(()=>{
          window.location.href="/emailsent"
        }, 1000)
        }

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
        
        <form onSubmit={handleSubmit}>
          <h1>Reg<span>ister</span></h1> 

          <label>Username</label>
          <input 
            type="text" 
            id="name"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeHolder="2 > username < 25"/>

          <label>Email</label>
          <input 
            type="email" 
            id="email" 
            value={email}
            onChange={e=>setEmail(e.target.value)}
            placeHolder="Email"/>

          <label>Password</label>
          <input 
            type="password" 
            id="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            placeHolder="Password > 1"/>
          
          {isLoading ? 
            <span class="loader"></span>
          :
          <>
            <button>Register</button>
            <p>already a member? <span><Link to="/login" className="login">Login</Link></span></p>
          </>
            
          }
          

        </form>
      {fail && <SnackFail text={text}/>}
      {success && <SnackSuccess text={text}/>}
      </div>

      
    </main>
  )
}
export default RegisterPage