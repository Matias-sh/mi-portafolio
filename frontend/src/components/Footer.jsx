import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Shield, Terminal, Coffee } from 'lucide-react'

const Footer = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/matiasbritez',
      icon: Github,
      color: 'hover:text-white'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/matiasbritez',
      icon: Linkedin,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      url: 'mailto:matias.britez@example.com',
      icon: Mail,
      color: 'hover:text-cyber-cyan'
    }
  ]

  const skills = [
    'Penetration Testing',
    'Android Development',
    'Django',
    'React',
    'Python',
    'Kotlin'
  ]

  return (
    <footer className="relative bg-dark-surface/50 backdrop-blur-sm border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3 mb-4"
            >
              <div className="relative">
                <Shield className="w-8 h-8 text-cyber-cyan" />
                <div className="absolute inset-0 w-8 h-8 text-cyber-cyan animate-pulse opacity-50">
                  <Shield />
                </div>
              </div>
              <div>
                <span className="text-xl font-cyber text-cyber-cyan">
                  MATÍAS
                </span>
                <span className="text-xl font-cyber text-white ml-1">
                  BRITEZ
                </span>
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-400 max-w-md mb-6"
            >
              Desarrollador Android especializado en transición hacia Ciberseguridad Ofensiva. 
              Creando soluciones seguras y explorando vulnerabilidades.
            </motion.p>

            {/* Links sociales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex space-x-4"
            >
              {socialLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 bg-dark-card border border-dark-border rounded-lg text-gray-400 transition-all duration-300 ${link.color} hover:border-current`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </motion.div>
          </div>

          {/* Skills */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg font-cyber text-cyber-cyan mb-4 flex items-center"
            >
              <Terminal className="w-4 h-4 mr-2" />
              Skills
            </motion.h3>
            
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              {skills.map((skill, index) => (
                <li key={skill} className="text-gray-400 hover:text-cyber-green transition-colors duration-300">
                  <span className="text-cyber-green mr-2">></span>
                  {skill}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Contact Info */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg font-cyber text-cyber-cyan mb-4 flex items-center"
            >
              <Coffee className="w-4 h-4 mr-2" />
              Contacto
            </motion.h3>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-3 text-gray-400"
            >
              <p>📍 Buenos Aires, Argentina</p>
              <p>🎓 Licenciatura en Ciberdefensa - UNDEF</p>
              <p>💻 Disponible para proyectos</p>
            </motion.div>
          </div>
        </div>

        {/* Línea divisoria */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent my-8"
        />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm"
        >
          <p>
            © {new Date().getFullYear()} Matías Britez. Todos los derechos reservados.
          </p>
          <p className="mt-2 md:mt-0 font-mono">
            <span className="text-cyber-green">{'{'}</span>
            Hecho con 
            <span className="text-red-500 mx-1">❤</span>
            y mucho café
            <span className="text-cyber-green">{'}'}</span>
          </p>
        </motion.div>
      </div>

      {/* Efecto de gradiente en el borde superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-50" />
    </footer>
  )
}

export default Footer