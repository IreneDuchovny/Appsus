
export function About() {
    return (
        <div className="about-container">
            <div className="about-header">About Our App</div>
            <p>Welcome to our app! We are thrilled to offer you a place to keep your notes and emails organized and in one place.</p>
            <p>With the Notes tab, you can easily jot down ideas, make lists, or save important information. And the Email tab allows you to send and receive messages from your contacts.</p>
            <p>We hope you enjoy using our app as much as we enjoyed building it for you.</p>
            <br />
            <h1>Meet the Team</h1>
            <br />
            <div className="team-section flex ">
                <div className="team-member">
                    <img src="assets/img/irene-duchovny.jpg" alt="Irene" />
                    <h3>Irene Duchovny</h3>
                    <p> Fullstack developer </p>
                    <div className="social-links">
                    <a href="https://github.com/IreneDuchovny" target="_blank"><i className="fab fa-github github-btn"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/irene-duchovny-82826013/" target="_blank"> <i className="fab fa-linkedin"></i>
                    </a></div>
                </div>
                <div className="team-member">
                    <img src="https://ca.slack-edge.com/T043N4KE97B-U049AMXDTPY-9ec00af7e7df-512" alt="Eli" />
                    <h3>Eli Shalev</h3>
                    <p>Fullstack developer </p>
                    <a href="https://github.com/eli-shallev" target="_blank"><i className="fab fa-github"></i>
                    </a>
                </div>
            </div>

        </div>
    )
}
