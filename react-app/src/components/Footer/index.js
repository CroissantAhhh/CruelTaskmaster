import './Footer.css'

export default function Footer() {
    return (
        <div className="footer-container">
            <div className="about-me-info">
                <p>My name is Jason Zhou and I'm working to become better and better at web development. This website is only one of my many projects for my own practice in order to improve.</p>
            </div>
            <div className="my-info-links">
                <p>Check me out:</p>
                <div className="my-links">
                    <a href='https://www.linkedin.com/in/jazon-zhou/' target='_blank' rel='noreferrer'>
                        <img src='https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636743583/discord_group_projo_assets/linkedin-tile_xvsp19.svg' height="70px" width="70px" alt='linkedin icon' />
                    </a>
                    <a href='https://github.com/CroissantAhhh' target='_blank' rel='noreferrer'>
                        <img src='https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636755621/discord_group_projo_assets/github-icon-2_lhhfge.jpg' height="70px" width="70px" alt='github icon' />
                    </a>
                </div>
            </div>
        </div>
    )
}
