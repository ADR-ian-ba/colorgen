import { NormalHeader, SnackFail, SnackSuccess } from "../components"
import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

const VerifyPage = () => {

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const email = queryParams.get("email")
  const otp = queryParams.get("otp")

  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)

  useEffect(() => {
    if (success || fail) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setFail(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, fail]);


  const data={
    email: email,
    otp: otp
  }

  function verify(){
    fetch("http://localhost:4000/verify", {
      method: "POST",
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
      console.log(data)
      if(data === "success"){
        setSuccess(true)
        
        setTimeout(()=>{
          window.location.href = "/login"
        }, 500)
      }else{
        setFail(true)
      }
    })
    .catch(error=>{
      setFail(true)
    })
  }

  return (
    <main>
        <NormalHeader/>

        <div className="verify-container">
            <h1>Colorgen</h1>
            <h5>ve<span>rify</span></h5>
            <button onClick={verify}>Press to verify</button>
            {success && <SnackSuccess text="verify succesfull"/>}
            {fail && <SnackFail text="verify Failed"/>}
          
        </div>
    </main>
  )
}
export default VerifyPage