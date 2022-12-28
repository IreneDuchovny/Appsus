
export function Home() {

    return <section className="home">
        <div className="main-page-container flex space-around">
            <div className="mail-container">
                <img src="assets/img/mail-logo.png" alt="" />
                <h2>E-mails </h2>
            </div>
            <div className="notes-container">
                <img src="assets/img/notes-logo.png" alt="" />
                <h2>Notes </h2>
            </div>

            <div className="books-container">
                <img src="assets/img/books-logo.png" alt="" />
                <h2> Books</h2>
            </div>

        </div>
    </section>
}