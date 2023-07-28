import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
        <div className="footer-img"></div>
        <div className="footer">
        <div className="container-about">
          <h3>ABOUT COLORGEN</h3>
          <p>Welcome to ColorGen, your go-to 
            online destination for generating 
            stunning color palettes effortlessly!
          </p>
          <p>
            ColorGen is a versatile and user-friendly 
            website designed to cater to all your color 
            needs.</p>
        </div>
        <div className="container-link">
          <h3>QUICK LINKS</h3>
          <Link to="/generate" className="link">Landing</Link>
          <Link to="/generate" className="link">Generate</Link>
          <Link to="/generate" className="link">Image pallette</Link>
          <Link to="/generate" className="link">artificial intelgence</Link>
        </div>
        <div className="container-support">
          <h3>SUPPORT ME</h3>
          <a href="https://www.buymeacoffee.com/adrianpurn0">Buy me a coffee ❤ </a>
        </div>
        <div className="container-follow">
          <h3>FOLLOW</h3>
          <a href="instagram.com/adr_iyan_">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7ZM9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12Z" fill="#000000" />
              <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M5 1C2.79086 1 1 2.79086 1 5V19C1 21.2091 2.79086 23 5 23H19C21.2091 23 23 21.2091 23 19V5C23 2.79086 21.2091 1 19 1H5ZM19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" fill="#000000" />
            </svg>
          </a>
        </div>

      </div>
    </>
  )
}
export default Footer