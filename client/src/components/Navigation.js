const Navigation = (props) => {
  return (
    <nav className="utility-nav">
        <p>{props.text}</p>
        <ul className='nav-item-ul'>
        {props.children}
        </ul>
    </nav>
  )
}
export default Navigation