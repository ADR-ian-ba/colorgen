const NavigationItem = (props) => {
    function handleClick(){
        props.openFunction(props.item)
      }
    
      return (
        <li onClick={handleClick} item={props.item}>
          {props.logo}
    
          {props.open && props.children}
    
        </li>
      )
    }

export default NavigationItem