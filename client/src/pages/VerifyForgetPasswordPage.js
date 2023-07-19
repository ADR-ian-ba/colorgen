import { NormalHeader, SnackFail, SnackSuccess } from "../components"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

const VerifyForgetPasswordPage = () => {
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)
  const [text, setText] = useState("")
  let timer;

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const email = queryParams.get("email")
  const otp = queryParams.get("otp")


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

  function changePassword(e){
    e.preventDefault()
    setIsLoading(true)

    const data ={
        email: email,
        password: password,
        otp: otp
    }

    fetch("http://localhost:4000/verifyforgetpassword", {
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

            setTimeout(()=>{
              window.location.href = "/login"
            }, 1000)

        }else{
            setIsLoading(false)
            setFail(true)
            setText(data.exp)

        }
    })
    .catch(error=>{
        console.log(error)
        setIsLoading(false)
        setFail(true)
        setText("sorry something went wrong")
    })
  }

  return (
    <main>
        <NormalHeader/>
        <div className="register-container">
        
          <form onSubmit={changePassword}>
          <h1>Change<span>Password</span></h1> 

          <label>New Password</label>
          <input 
              type="text" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="New password > 1"/>


              {isLoading ? 
                <span class="loader"></span>
              :
                <button>Reset Password</button>  
              }
          
          </form>

          {success && <SnackSuccess text={text}/>}
          {fail && <SnackFail text={text}/>}
        </div>
    </main>
  )
}
export default VerifyForgetPasswordPage