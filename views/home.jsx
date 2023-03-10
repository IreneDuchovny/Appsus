
const { Link, useNavigate } = ReactRouterDOM

export function Home({ setIsBook, setIsMail, setIsNote }) {
    const nav = useNavigate()
    function goMail(to) {
        setIsMail(true)
        setIsNote(false)
        setIsBook(false)
        nav(to)
    }

    function goNote(to) {
        setIsMail(false)
        setIsNote(true)
        setIsBook(false)
        nav(to)
    }

    function goBook(to) {
        setIsMail(false)
        setIsNote(false)
        setIsBook(true)
        nav(to)
    }


    return <section className="home">
        <div className="main-page-container flex space-around">
            <Link to="/mail">
                <div className="mail-container" onClick={() => { goMail('/mail') }}>
                    <img src="assets/img/mail-logo.png" alt="" />
                    <h2>E-mails </h2>
                </div></Link>
            <Link to="/note">
                <div className="notes-container" onClick={() => { goNote('/note') }}>
                    <img src="assets/img/notes-logo.png" alt="" />
                    <h2>Notes </h2>
                </div></Link>
            <Link to="/book">
                <div className="books-container" onClick={() => { goBook('/book') }}>
                    <img src="assets/img/books-logo.png" alt="" />
                    <h2> Books</h2>
                </div></Link>
        </div>
    </section>
}