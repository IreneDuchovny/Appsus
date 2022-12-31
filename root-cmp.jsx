const { Route, Routes } = ReactRouterDOM
const { useState } = React
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { MailCompose } from "./apps/mail/cmps/mail-compose.jsx"
import { MailDetails } from "./apps/mail/cmps/mail-details.jsx"
import { BookIndex } from "./apps/book/pages/book-index.jsx"
import { BookDetails } from "./apps/book/pages/book-details.jsx"
import { BookEdit } from "./apps/book/pages/book-edit.jsx"



export function App() {

    const [isMail, setIsMail] = useState(false)
    const [isNote, setIsNote] = useState(false)
    const [isBook, setIsBook] = useState(false)



    function closeMenu() {
        document.body.classList.toggle('menu-open')
    }
    return <Router>
        <section className="app">
            <div className="main-screen" onClick={() => { closeMenu() }}></div>
            <AppHeader isBook={isBook}isMail={isMail} isNote={isNote} setIsBook={setIsBook} setIsMail={setIsMail} setIsNote={setIsNote }/>
            <Routes>
                <Route path="/" element={<Home setIsBook={setIsBook} setIsMail={setIsMail} setIsNote={setIsNote } />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} >
                    <Route path="/mail/:mailId" element={<MailDetails />} />
                    <Route element={<MailCompose />} path="/mail/new/:compose" />

                </Route>

                <Route path="/note" element={<NoteIndex />} />
                <Route path="/note/:noteType" element={<NoteIndex />} />

                <Route element={<BookIndex />} path='/book' />
                <Route element={<BookDetails />} path='/book/:bookId' />
                <Route element={<BookEdit />} path='/book/edit' />
                <Route element={<BookEdit />} path='/book/edit/:bookId' />

            </Routes>

        </section>
    </Router>
}
