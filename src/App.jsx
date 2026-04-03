import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import TopHeader from './components/TopHeader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Programs from './pages/Programs'
import Features from './pages/Features'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import './pages/About.css'
import './App.css'

function ScrollHandler() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

export default function App() {
  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/admin') || location.pathname.startsWith('/teacher')

  return (
    <div className="app">
      <ScrollHandler />
      {!isDashboard && <TopHeader />}
      {!isDashboard && <Navbar />}
      <main className={isDashboard ? "" : "main-content"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/features" element={<Features />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
    </div>
  )
}
