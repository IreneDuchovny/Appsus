const { Link } = ReactRouterDOM

export function NoteSideBar(){


    return <ul className="note-side-bar clean-list flex ">
        <li><Link to="/note" ><i className="fa-solid fa-note-sticky"></i>&nbsp; All</Link></li>
        <li><Link to="/note/note-txt" ><i className="fa-solid fa-pen-fancy"></i>&nbsp; Text</Link></li>
        <li><Link to="/note/note-img" ><i className="fa-regular fa-image"></i>&nbsp; Image</Link></li>
        <li><Link to="/note/note-video" ><i className="fa-brands fa-youtube"></i>&nbsp; Video</Link></li>
        <li><Link to="/note/note-todos" ><i className="fa-solid fa-list-check"></i>&nbsp; Todo list</Link></li>
    </ul>
}