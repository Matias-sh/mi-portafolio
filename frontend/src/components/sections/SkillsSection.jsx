import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Shield, 
  Smartphone, 
  Server, 
  Terminal,
  Code,
  Database,
  Bug,
  Search,
  Target,
  Users,
  Radar,
  Layers
} from 'lucide-react'

const SkillsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [activeCategory, setActiveCategory] = useState('pentesting')
  const [skills, setSkills] = useState([])

  // Mock data - en producción esto vendría de la API
  const skillsData = {
    pentesting: [
      { name: 'OWASP Top 10', proficiency: 85, icon: Shield, description: 'Vulnerabilidades web críticas' },
      { name: 'Nmap', proficiency: 90, icon: Radar, description: 'Escaneo de puertos y servicios' },
      { name: 'Burp Suite', proficiency: 80, icon: Bug, description: 'Testing de aplicaciones web' },
      { name: 'Metasploit', proficiency: 75, icon: Target, description: 'Framework de explotación' },
      { name: 'OSINT', proficiency: 85, icon: Search, description: 'Inteligencia de fuentes abiertas' },
      { name: 'Social Engineering', proficiency: 70, icon: Users, description: 'Técnicas de ingeniería social' }
    ],
    mobile: [
      { name: 'Kotlin', proficiency: 95, icon: Code, description: 'Desarrollo Android nativo' },
      { name: 'Jetpack Compose', proficiency: 90, icon: Layers, description: 'UI moderna para Android' },
      { name: 'Android Architecture', proficiency: 88, icon: Smartphone, description: 'MVVM, Clean Architecture' },
      { name: 'Room Database', proficiency: 85, icon: Database, description: 'Base de datos local SQLite' }
    ],
    backend: [
      { name: 'Django', proficiency: 90, icon: Server, description: 'Framework web de Python' },
      { name: 'Python', proficiency: 92, icon: Code, description: 'Programación backend y scripting' },
      { name: 'PostgreSQL', proficiency: 80, icon: Database, description: 'Base de datos relacional' },
      { name: 'REST APIs', proficiency: 88, icon: Server, description: 'Diseño de APIs RESTful' }
    ],
    tools: [
      { name: 'Git', proficiency: 90, icon: Code, description: 'Control de versiones' },
      { name: 'Docker', proficiency: 75, icon: Server, description: 'Containerización' },
      { name: 'Linux', proficiency: 85, icon: Terminal, description: 'Administración de sistemas' },
      { name: 'Kali Linux', proficiency: 80, icon: Terminal, description: 'Distribución para pentesting' }
    ]
  }

  const categories = [
    { id: 'pentesting', name: 'Pentesting & Security', icon: Shield, color: 'cyber-cyan' },
    { id: 'mobile', name: 'Desarrollo Mobile', icon: Smartphone, color: 'cyber-green' },
    { id: 'backend', name: 'Backend Development', icon: Server, color: 'cyber-purple' },
    { id: 'tools', name: 'Tools & Platforms', icon: Terminal, color: 'cyber-orange' }
  ]

  useEffect(() => {
    setSkills(skillsData[activeCategory] || [])
  }, [activeCategory])

  const getColorClasses = (color) => {
    const colors = {
      'cyber-cyan': 'text-cyber-cyan border-cyber-cyan bg-cyber-cyan',
      'cyber-green': 'text-cyber-green border-cyber-green bg-cyber-green', 
      'cyber-purple': 'text-purple-400 border-purple-400 bg-purple-400',
      'cyber-orange': 'text-orange-400 border-orange-400 bg-orange-400'
    }
    return colors[color] || colors['cyber-cyan']
  }

  return (
    <section id="skills" className="relative py-20 bg-dark-bg">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyber-green/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref}>
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-full text-cyber-cyan font-mono text-sm uppercase tracking-wider">
                <Code className="inline w-4 h-4 mr-2" />
                Habilidades Técnicas
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-cyber font-bold text-white mb-6">
              Arsenal <span className="text-cyber-cyan">Tecnológico</span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Desde desarrollo móvil hasta pentesting avanzado, estas son las herramientas 
              y tecnologías que domino para crear y <span className="text-red-400">hackear</span> sistemas.
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category, index) => {
              const Icon = category.icon
              const isActive = activeCategory === category.id
              const colorClasses = getColorClasses(category.color)
              
              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? `${colorClasses.split(' ')[2]}/20 border-2 ${colorClasses.split(' ')[1]} ${colorClasses.split(' ')[0]}`
                      : 'bg-dark-surface border-2 border-dark-border text-gray-400 hover:border-cyber-cyan/50 hover:text-cyber-cyan'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-mono text-sm">{category.name}</span>
                </motion.button>
              )
            })}
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            key={activeCategory} // Force re-render on category change
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="card-cyber p-6 hover:border-cyber-cyan/50 transition-all duration-300 group"
                >
                  {/* Skill Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-cyber-cyan/10 rounded-lg group-hover:bg-cyber-cyan/20 transition-colors duration-300">
                        <Icon className="w-6 h-6 text-cyber-cyan" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {skill.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {skill.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-cyber-green">
                        {skill.proficiency}%
                      </div>
                      <div className="text-xs text-gray-500 font-mono">
                        LEVEL
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="skill-bar">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
                        className="skill-progress h-2 relative overflow-hidden"
                      >
                        {/* Animated glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                      </motion.div>
                    </div>
                    
                    {/* Proficiency Labels */}
                    <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
                      <span>BEGINNER</span>
                      <span>INTERMEDIATE</span>
                      <span>ADVANCED</span>
                      <span>EXPERT</span>
                    </div>
                  </div>

                  {/* Skill Level Badge */}
                  <div className="mt-4 flex justify-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                      skill.proficiency >= 90 ? 'bg-red-500/20 text-red-400' :
                      skill.proficiency >= 80 ? 'bg-cyber-cyan/20 text-cyber-cyan' :
                      skill.proficiency >= 70 ? 'bg-cyber-green/20 text-cyber-green' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {skill.proficiency >= 90 ? 'EXPERT' :
                       skill.proficiency >= 80 ? 'ADVANCED' :
                       skill.proficiency >= 70 ? 'INTERMEDIATE' : 'LEARNING'}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center space-x-4 px-6 py-3 bg-dark-surface border border-dark-border rounded-lg">
              <Terminal className="w-5 h-5 text-cyber-green animate-pulse" />
              <span className="font-mono text-cyber-green">
                {'>'} Siempre aprendiendo nuevas técnicas de hacking y desarrollo
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection