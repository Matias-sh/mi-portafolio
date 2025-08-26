import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Shield, 
  Code2, 
  Smartphone, 
  Brain, 
  Target, 
  BookOpen,
  Award,
  MapPin
} from 'lucide-react'

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const timeline = [
    {
      year: '2021',
      title: 'Inicio en Desarrollo Android',
      description: 'Primeros pasos en desarrollo móvil con Java y Android SDK',
      icon: Smartphone,
      color: '#10b981'
    },
    {
      year: '2022', 
      title: 'Especialización en Kotlin',
      description: 'Migración completa a Kotlin y adopción de Jetpack Compose',
      icon: Code2,
      color: '#3b82f6'
    },
    {
      year: '2023',
      title: 'Transición a Ciberseguridad',
      description: 'Inicio de estudios en pentesting y ethical hacking',
      icon: Shield,
      color: '#8b5cf6'
    },
    {
      year: '2024',
      title: 'Red Team Aspirant',
      description: 'Enfoque en operaciones ofensivas y CTF competitions',
      icon: Target,
      color: '#ef4444'
    }
  ]

  const achievements = [
    {
      icon: Award,
      title: 'Técnico Superior en Programación',
      description: 'Graduado con honores en desarrollo de software',
      metric: '2021'
    },
    {
      icon: BookOpen,
      title: 'Estudiante UNDEF',
      description: 'Licenciatura en Ciberdefensa en curso',
      metric: '2023-2026'
    },
    {
      icon: Brain,
      title: 'CTF Player',
      description: 'Participante activo en competencias de hacking',
      metric: '15+ CTFs'
    },
    {
      icon: MapPin,
      title: 'Buenos Aires',
      description: 'Trabajando remotamente desde Argentina',
      metric: 'Remote'
    }
  ]

  return (
    <section id="about" className="relative py-20 bg-dark-surface/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,255,255,0.8)_1px,transparent_0)] bg-[length:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="inline-block mb-4"
              >
                <span className="px-4 py-2 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-full text-cyber-cyan font-mono text-sm uppercase tracking-wider">
                  <Shield className="inline w-4 h-4 mr-2" />
                  Sobre mí
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-cyber font-bold text-white mb-6"
              >
                De <span className="text-cyber-green">Código</span> a{' '}
                <span className="text-cyber-cyan">Ciberseguridad</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-300 leading-relaxed space-y-4"
              >
                <p>
                  Soy un <strong className="text-cyber-green">desarrollador Android</strong> con 
                  sólida experiencia en Kotlin y Jetpack Compose, actualmente en transición 
                  hacia el fascinante mundo de la <strong className="text-cyber-cyan">ciberseguridad ofensiva</strong>.
                </p>
                
                <p>
                  Mi experiencia en desarrollo móvil me ha dado una perspectiva única sobre 
                  la seguridad desde el lado del <em>builder</em>, lo que ahora aplico como 
                  <strong className="text-red-400">red team operator</strong> y pentester.
                </p>

                <p>
                  Actualmente cursando la <strong className="text-cyber-cyan">Licenciatura en Ciberdefensa</strong> en 
                  UNDEF, donde profundizo en técnicas avanzadas de ethical hacking y análisis 
                  de vulnerabilidades.
                </p>
              </motion.div>
            </div>

            {/* Achievements Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="card-cyber p-4 hover:border-cyber-cyan/50 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-cyber-cyan/10 rounded-lg">
                        <Icon className="w-5 h-5 text-cyber-cyan" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-sm mb-1 truncate">
                          {achievement.title}
                        </h4>
                        <p className="text-gray-400 text-xs mb-2 line-clamp-2">
                          {achievement.description}
                        </p>
                        <span className="text-cyber-green font-mono text-xs">
                          {achievement.metric}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right Column - Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h3 className="text-3xl font-cyber font-bold text-white mb-4">
                Mi Evolución
              </h3>
              <p className="text-gray-400">
                El camino desde el desarrollo hasta la ciberseguridad
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-cyan via-cyber-green to-red-500" />

              <div className="space-y-8">
                {timeline.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.2 }}
                      className="relative flex items-start space-x-6"
                    >
                      {/* Timeline Node */}
                      <div 
                        className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 border-dark-bg"
                        style={{ backgroundColor: item.color }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pb-8">
                        <div className="card-cyber p-6 hover:border-cyber-cyan/50 transition-all duration-300">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xl font-semibold text-white">
                              {item.title}
                            </h4>
                            <span 
                              className="px-3 py-1 rounded-full font-mono text-sm font-bold text-white"
                              style={{ backgroundColor: item.color }}
                            >
                              {item.year}
                            </span>
                          </div>
                          <p className="text-gray-300 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Current Focus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2 }}
              className="card-cyber p-6 border-2 border-red-500/50 bg-red-500/5"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <Target className="w-6 h-6 text-red-400" />
                </div>
                <h4 className="text-xl font-semibold text-white">
                  Enfoque Actual
                </h4>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Especializándome en <strong className="text-red-400">Red Team Operations</strong>, 
                <strong className="text-cyber-cyan"> Web Application Penetration Testing</strong> y 
                <strong className="text-cyber-green"> Mobile Security Assessment</strong>. 
                Participando activamente en CTFs y contribuyendo a la comunidad de ciberseguridad.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection