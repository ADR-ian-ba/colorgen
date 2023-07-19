import { useState, useEffect } from "react"
import { NormalHeader, SnackFail, SnackSuccess } from "../components"

const ForgetUsername = () => {

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

    function forgetUsername(e){
        e.preventDefault()
        setIsLoading(true)

        const data= {email}

        fetch("http://localhost:4000/forgetusername", {
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
            if(data.type === "success"){
                setSuccess(true)
                setText(data.exp)
                setIsLoading(false)
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
        
            <form onSubmit={forgetUsername}>
            <h1>Forgot<span>Username</span></h1> 

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
export default ForgetUsername