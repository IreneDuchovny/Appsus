import { SearchBar } from "./search-bar.jsx"

const { Link, NavLink, useNavigate } = ReactRouterDOM

export function AppHeader({ isBook, isMail, isNote, setIsBook, setIsMail, setIsNote }) {
  const nav = useNavigate()

  function closeMenu() {
    document.body.classList.toggle('menu-open')
  }

  function goMail(to) {
    setIsMail(true)
    setIsNote(false)
    setIsBook(false)
    closeMenu()
    nav(to)
  }

  function goNote(to) {
    setIsMail(false)
    setIsNote(true)
    setIsBook(false)
    closeMenu()
    nav(to)
  }

  function goBook(to) {
    setIsMail(false)
    setIsNote(false)
    setIsBook(true)
    closeMenu()
    nav(to)
  }

  function goHome() {
    setIsMail(false)
    setIsNote(false)
    closeMenu()
    nav('/')
  }

  function goAbout() {
    setIsMail(false)
    setIsNote(false)
    closeMenu()
    nav('/about')
  }

  function openMenu() {
    document.body.classList.toggle('menu-open')
  }

  return <header className="app-header flex space-between ">

    <Link to="/">
      {isMail ? <div><img src="assets/img/mail-logo.png" /></div> : (isNote ? <div><img src="assets/img/notes-logo.png" /></div> : <img src="assets/img/appsus-logo-1.png" alt="" />)}

      {/* <h3>Apsus!</h3> */}
    </Link>
    <button className="menu-toggle-btn" onClick={() => openMenu()}>☰</button>
    <div className="search-bar-header">
      <SearchBar />
    </div>
    <nav>

      <ul className="main-nav-btns flex clean-list ">
        <li className="go-home-btn" onClick={() => goHome()}>Home</li>
        <li className="go-about-btn" onClick={() => goAbout()}>About</li>
        <li className="go-mail-btn" onClick={() => goMail('mail')}>E-mail</li>
        <li className="go-note-btn" onClick={() => goNote('note')}>Note</li>
        <li className="go-note-btn" onClick={() => goBook('book')}>Book</li>
        <img src="assets/img/avatar.png" />
      </ul>



    </nav>

  </header>
}
