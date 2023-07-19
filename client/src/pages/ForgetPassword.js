import { NormalHeader, SnackFail, SnackSuccess } from "../components"
import { useState, useEffect } from "react"

const ForgetPassword = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)
  const [text, setText] = useState("")
  let timer;


  useEffect(()=>{
    if(fail || success){
      setTimeout(()=>{
        setFail(false)
        setSuccess(false)
        setText("")
      },3000)
      return () => clearTimeout(timer)
    }
  }, [success, fail])

  function forgetPassword(e){
    e.preventDefault()
    setIsLoading(true)
    const data = {email}

    fetch("http://localhost:4000/forgetpassword", {
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
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
        setIsLoading(false)
        setSuccess(true)
        setText(data.exp)
      }else{
        setIsLoading(false)
        setFail(true)
        setText(data.exp)
      }
    })
    .catch(error=>{
      console.log(error)
      setFail(true)
      setText("sorry something went wrong")
    })
  }

  return (
    <main>
        <NormalHeader/>
        <div className="register-container">
        
          <form onSubmit={forgetPassword}>
          <h1>Forgot<span>Password</span></h1> 

          <label>Email</label>
          <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="user account email"/>

              {isLoading ? 
                <span class="loader"></span>
              :
                <button>Send Email</button>  
              }
          
          </form>

          {success && <SnackSuccess text={text}/>}
          {fail && <SnackFail text={text}/>}
        </div>
    </main>
  )
}
export default ForgetPassword