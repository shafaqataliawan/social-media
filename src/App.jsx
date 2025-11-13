import { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Messages from './pages/Messages'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
import { AppProvider } from './context/AppContext'
import Footer from './components/Footer'

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <AppProvider>
      <div className="app">
        <nav className="topnav">
          <div className="brand">Social<span> Media</span></div>
          <button className="hamburger" aria-label="Menu" onClick={()=>setMobileOpen(v=>!v)}>
            <span/>
            <span/>
            <span/>
          </button>
          <div className={`navlinks ${mobileOpen ? 'open' : ''}`} onClick={()=>setMobileOpen(false)}>
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/explore">Explore</NavLink>
            <NavLink to="/messages">Messages</NavLink>
            <NavLink to="/notifications">Notifications</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </div>
        </nav>

        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </AppProvider>
  )
}
