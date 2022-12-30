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

    return <header className="app-header flex space-between ">
        
        <Link to="/">
        { isMail ? <div><img src="assets/img/mail-logo.png"/></div> : (isNote ?<div><img src="assets/img/notes-logo.png"/></div> : <img src="assets/img/appsus-logo-1.png" alt="" />)}

            {/* <h3>Apsus!</h3> */}
        </Link>
       <div className="search-bar-header">
        <input className="searchbar-input" type="text" placeholder="Search" />
       </div>
        <nav>
          <div className="main-nav-btns flex ">
          <button className="go-home-btn">  <NavLink to="/">Home</NavLink></button>
          <button className="go-about-btn"><NavLink to="/about">About</NavLink></button>
          <button className="go-home-btn"> <a onClick={() => goMail('mail')}>E-mail</a></button>
          <button className="go-note-btn"><a onClick={() =>goNote('note')}>Note</a></button>
          </div>
        </nav>
    </header>
}
