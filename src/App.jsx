import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'

// Importar componentes
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MatrixBackground from './components/MatrixBackground'
import ScrollToTop from './components/ScrollToTop'

// Importar páginas
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'

function App() {
  return (
    <Router basename="/mi-portafolio">
      <div className="relative min-h-screen bg-dark-bg text-white overflow-x-hidden">
        {/* Background Matrix Effect */}
        <MatrixBackground />
        
        {/* Main Content */}
        <div className="relative z-10">
          <Navbar />
          
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </motion.main>
          
          <Footer />
        </div>
        
        <ScrollToTop />
      </div>
    </Router>
  )
}

export default App