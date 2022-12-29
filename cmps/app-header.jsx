const { Link, NavLink , useNavigate} = ReactRouterDOM
const { useState } = React
export function AppHeader() {
   const [isMail, setIsMail] = useState(false)
    const [isNote, setIsNote] = useState(false)
    const nav = useNavigate()

  function goMail(to) {

    setIsMail(true)
    setIsNote(false)
    nav(to);
  }

  function goNote(to) {

    setIsMail(false)
    setIsNote(true)
    nav(to);
  }

    return <header className="app-header">
        
        <Link to="/">
        { isMail ? <div><img src="assets/img/mail-logo.png"/></div> : (isNote ?<div><img src="assets/img/notes-logo.png"/></div> : <img src="assets/img/appsus-logo-1.png" alt="" />)}

            {/* <h3>Apsus!</h3> */}
        </Link>
       
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <a onClick={() => goMail('mail')}>Mail</a>
            <a onClick={() =>goNote('note')}>Note</a>
        </nav>
    </header>
}
