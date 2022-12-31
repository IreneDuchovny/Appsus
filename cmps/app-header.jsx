import { SearchBar } from "./search-bar.jsx"

const { Link, NavLink , useNavigate} = ReactRouterDOM
const { useState } = React
export function AppHeader() {
   const [isMail, setIsMail] = useState(false)
    const [isNote, setIsNote] = useState(false)
    const nav = useNavigate()

  function closeMenu(){
      document.body.classList.toggle('menu-open')
  }

  function goMail(to) {

    setIsMail(true)
    setIsNote(false)
    closeMenu()
    nav(to);
  }

  function goNote(to) {

    setIsMail(false)
    setIsNote(true)
    closeMenu()
    nav(to);
  }

  function goHome() {

    setIsMail(false)
    setIsNote(false)
    closeMenu()
    nav('/');
  }

  function goAbout() {

    setIsMail(false)
    setIsNote(false)
    closeMenu()
    nav('/about');
  }

  function openMenu() {
    // add body wikth class menu-open
    document.body.classList.toggle('menu-open')
  }

    return <header className="app-header flex space-between ">
        
        <Link to="/">
        { isMail ? <div><img src="assets/img/mail-logo.png"/></div> : (isNote ?<div><img src="assets/img/notes-logo.png"/></div> : <img src="assets/img/appsus-logo-1.png" alt="" />)}

            {/* <h3>Apsus!</h3> */}
        </Link>
        <button className="menu-toggle-btn" onClick={()=> openMenu()}>☰</button>
       <div className="search-bar-header">
        <SearchBar /> 
        </div>
        <nav>
          
          <ul style={{width: 'fit-content'}} className="main-nav-btns flex clean-list ">
          <li className="go-home-btn" onClick={() => goHome()}>Home</li>
          <li className="go-about-btn" onClick={() => goAbout()}>About</li>
          <li className="go-mail-btn"onClick={() => goMail('mail')}>E-mail</li>
          <li className="go-note-btn" onClick={() =>goNote('note')}>Note</li>
          <img src="assets/img/avatar.png"/>
          </ul>
          
          
         
        </nav>
        
    </header>
}
