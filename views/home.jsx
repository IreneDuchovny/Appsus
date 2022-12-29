
const { Link } = ReactRouterDOM

export function Home() {

    return <section className="home">
        <div className="main-page-container flex space-around">
            <Link to="/mail">
                <div className="mail-container">

                    <img src="assets/img/mail-logo.png" alt="" />
                    <h2>E-mails </h2>
                </div></Link>
            <Link to="/note">
                <div className="notes-container">
                    <img src="assets/img/notes-logo.png" alt="" />
                    <h2>Notes </h2>
                </div></Link>
            <Link to="/book">
                <div className="books-container">
                    <img src="assets/img/books-logo.png" alt="" />
                    <h2> Books</h2>
                </div></Link>

        </div>
    </section>
}