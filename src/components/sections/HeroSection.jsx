import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Terminal, Shield, Code, Zap, Github, Linkedin, Mail } from 'lucide-react'

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const roles = [
    'Android Developer',
    'Cybersecurity Enthusiast', 
    'Penetration Tester',
    'Red Team Operator',
    'CTF Player'
  ]

  // Efecto de escritura de máquina
  useEffect(() => {
    const currentRole = roles[currentIndex]
    let charIndex = 0
    let isDeleting = false
    
    const typeSpeed = isDeleting ? 50 : 150
    const deleteSpeed = 50
    const pauseTime = 2000

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentRole.length) {
        setDisplayText(currentRole.substring(0, charIndex + 1))
        charIndex++
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentRole.substring(0, charIndex - 1))
        charIndex--
      } else if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => {
          isDeleting = true
        }, pauseTime)
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        setCurrentIndex((prev) => (prev + 1) % roles.length)
      }
    }, isDeleting ? deleteSpeed : typeSpeed)

    return () => clearTimeout(timer)
  }, [displayText, currentIndex])

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-white' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: Mail, href: '#contact', label: 'Email', color: 'hover:text-cyber-cyan' }
  ]

  const skills = [
    { icon: Code, label: 'Development', delay: 0.2 },
    { icon: Shield, label: 'Security', delay: 0.4 },
    { icon: Terminal, label: 'Hacking', delay: 0.6 },
    { icon: Zap, label: 'Innovation', delay: 0.8 }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(0,255,255,0.1)_1px,transparent_1px)] [background-size:50px_50px] animate-pulse" />
        
        {/* Floating hexagons */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 border border-cyber-cyan/20 rotate-45"
            style={{
              clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              rotate: [45, 405, 45]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              repeatType: 'loop'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Saludo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block"
          >
            <span className="px-4 py-2 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-full text-cyber-cyan font-mono text-sm uppercase tracking-wider">
              <Terminal className="inline w-4 h-4 mr-2" />
              System Online
            </span>
          </motion.div>

          {/* Nombre */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-cyber font-bold"
          >
            <span className="text-white">MATÍAS</span>
            <br />
            <span className="text-cyber-cyan text-glow">BRITEZ</span>
          </motion.h1>

          {/* Rol dinámico */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-xl md:text-2xl lg:text-3xl font-mono text-gray-300 h-12 flex items-center justify-center"
          >
            <span className="text-cyber-green">&gt;</span>
            <span className="ml-2 text-white">{displayText}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="ml-1 text-cyber-cyan"
            >
              |
            </motion.span>
          </motion.div>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Técnico en Programación especializado en desarrollo Android con{' '}
            <span className="text-cyber-cyan font-semibold">Kotlin</span> y{' '}
            <span className="text-cyber-cyan font-semibold">Jetpack Compose</span>.
            <br />
            En transición hacia <span className="text-cyber-green font-semibold">Ciberseguridad Ofensiva</span> 
            {' '}y <span className="text-cyber-green font-semibold">Red Team Operations</span>.
          </motion.p>

          {/* Skills Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex justify-center space-x-8 mt-8"
          >
            {skills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: skill.delay, duration: 0.5 }}
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="group flex flex-col items-center space-y-2"
                >
                  <div className="p-4 bg-dark-surface/50 border border-dark-border rounded-xl group-hover:border-cyber-cyan/50 transition-all duration-300">
                    <Icon className="w-8 h-8 text-gray-400 group-hover:text-cyber-cyan transition-colors duration-300" />
                  </div>
                  <span className="text-sm text-gray-500 group-hover:text-cyber-cyan font-mono transition-colors duration-300">
                    {skill.label}
                  </span>
                </motion.div>
              )
            })}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-12"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-cyber px-8 py-4 text-lg font-semibold"
            >
              Ver Proyectos
            </motion.a>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-cyber-green text-cyber-green font-mono uppercase tracking-wider transition-all duration-300 hover:bg-cyber-green hover:text-dark-bg relative overflow-hidden"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
              }}
            >
              Contactar
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex justify-center space-x-6 mt-8"
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 bg-dark-surface/30 border border-dark-border rounded-lg text-gray-400 transition-all duration-300 ${social.color} hover:border-current`}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center space-y-2 text-gray-500"
          >
            <span className="font-mono text-sm">Scroll Down</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>

      {/* Terminal cursor effect */}
      <div className="absolute top-4 left-4 font-mono text-cyber-green text-sm opacity-50">
        <div className="animate-pulse">root@portfolio:~$ whoami</div>
      </div>
    </section>
  )
}

export default HeroSection