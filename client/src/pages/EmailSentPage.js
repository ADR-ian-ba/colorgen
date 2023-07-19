import { NormalHeader } from "../components"

const EmailSentPage = () => {
  return (
    <main>
        <NormalHeader/>
        <div className="email-sent">
            <h1>Colorgen</h1>
            <h3>email verification sent, please check your mail!</h3>
            <p>please also check in your spamm folder</p>
        </div>
   
    </main>
  )
}
export default EmailSentPage