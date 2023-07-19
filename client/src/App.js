import './App.css';
import './styles/index.css'
import {Route, Routes} from "react-router-dom"
import { VerifyPage, LandingPage, LoginPage, RegisterPage, GeneratePage, EmailSentPage, MyPallete, ForgetPassword, ForgetUsername, VerifyForgetPasswordPage, PublicPalletePage } from './pages';
import { UserContextProvider, UserContext } from './context/UserContext';
import { useEffect, useContext } from 'react';


function App() {
  const {username, login, setUsername, setLogin, favPallete, setFavPallete} = useContext(UserContext)

  useEffect(() => {
    console.log('Updated favPallete:', favPallete);
  }, [favPallete]);

  function getTokenFromLocalStorage() {
    try{
      return localStorage.getItem('token');
    } catch(error){
    console.log(error)
    return null
    }
  }

  function validateToken(){
    const token= getTokenFromLocalStorage()
    console.log(token)

    fetch("http://localhost:4000/validateToken", {
      method: "POST",
      headers: {
        "Authorization": token
      }
    })
    .then(response =>{
      if(response.ok){
        return response.json()
      }else{
        //do nothing
      }
    })
    .then(data =>{
      if(data === "there is no token"){

      }else{
        console.log(data.username, data.authorization)
        setLogin(data.authorization)
        setUsername(data.username)

        let palette = []
        for(let i = 0; i<data.completeColor.length; i++){
          palette.push(data.completeColor[i])
        }

        setFavPallete(palette)
      }
    })
    .catch(error =>{
      console.log("cannot fetch")
    })
  }

  useEffect(()=>{
    validateToken()
  }, [])

  return (
      <Routes>
        <Route index element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/generate" element={<GeneratePage/>}/>
        <Route path="/verify" element={<VerifyPage/>}/>
        <Route path="/emailsent" element={<EmailSentPage/>}/>
        <Route path="/mypallete" element={<MyPallete/>}/>
        <Route path="/publicpallete" element={<PublicPalletePage/>}/>
        <Route path="/forgetpassword" element={<ForgetPassword/>}/>
        <Route path="/forgetusername" element={<ForgetUsername/>}/>
        <Route path="/verifyforgetpassword" element={<VerifyForgetPasswordPage/>}/>
      </Routes>

  );
}

export default App;
