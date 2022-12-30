const { Link } = ReactRouterDOM

export function NoteSideBar(){


    return <ul className="note-side-bar flex column">
        <li><Link to="/note" >All</Link></li>
        <li><Link to="/note/note-txt" >Text</Link></li>
        <li><Link to="/note/note-img" >Image</Link></li>
        <li><Link to="/note/note-video" >Video</Link></li>
        <li><Link to="/note/note-todos" >Todo list</Link></li>
    </ul>
}