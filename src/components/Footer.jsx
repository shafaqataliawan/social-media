export default function Footer(){
  return (
    <footer className="site">
      <div className="inner">
        <div className="row">
          <strong>SocialVite</strong>
          <span className="badge">v0.1</span>
        </div>
        <div className="toolbar">
          <a href="/">Home</a>
          <a href="/explore">Explore</a>
          <a href="/messages">Messages</a>
          <a href="/notifications">Notifications</a>
          <a href="/profile">Profile</a>
        </div>
        <div className="small">© {new Date().getFullYear()} SocialVite • <a href="#">Privacy</a> • <a href="#">Terms</a></div>
      </div>
    </footer>
  )
}
