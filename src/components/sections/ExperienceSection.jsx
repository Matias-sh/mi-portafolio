import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Briefcase,
  Calendar,
  MapPin,
  ExternalLink,
  Award,
  TrendingUp,
  Code,
  Users
} from 'lucide-react'

// Datos de experiencia
import experienceData from '../../data/experience.json'

const ExperienceSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const getTechIcon = (tech) => {
    // Mapeo de tecnologías a colores
    const techColors = {
      'Django': 'bg-green-500',
      'Python': 'bg-blue-500',
      'Kotlin': 'bg-purple-500',
      'Android': 'bg-green-600',
      'PostgreSQL': 'bg-blue-600',
      'Git': 'bg-orange-500',
      'Docker': 'bg-blue-400',
      'Java': 'bg-red-500',
      'JavaScript': 'bg-yellow-500'
    }
    return techColors[tech] || 'bg-gray-500'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long' 
    })
  }

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date()
    const diffTime = Math.abs(end - start)
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30))
    
    if (diffMonths < 12) {
      return `${diffMonths} ${diffMonths === 1 ? 'mes' : 'meses'}`
    } else {
      const years = Math.floor(diffMonths / 12)
      const months = diffMonths % 12
      if (months === 0) {
        return `${years} ${years === 1 ? 'año' : 'años'}`
      } else {
        return `${years} ${years === 1 ? 'año' : 'años'} ${months} ${months === 1 ? 'mes' : 'meses'}`
      }
    }
  }

  return (
    <section id="experience" className="relative py-20 bg-dark-surface/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(0,255,255,0.03)_50%,transparent_52%)] bg-[length:60px_60px]" />
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
                <Briefcase className="inline w-4 h-4 mr-2" />
                Experiencia Profesional
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-cyber font-bold text-white mb-6">
              Mi Trayectoria <span className="text-cyber-green">Profesional</span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Desde desarrollo Android hasta backend con Django, mi evolución profesional 
              hacia la <span className="text-cyber-cyan font-semibold">ciberseguridad ofensiva</span>
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyber-cyan via-cyber-green to-purple-500" />
            
            <div className="space-y-12">
              {experienceData.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
                >
                  
                  {/* Timeline Node */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-cyber-cyan rounded-full border-4 border-dark-bg z-10">
                    <div className="absolute inset-0 rounded-full bg-cyber-cyan animate-ping opacity-20" />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="card-cyber p-8 hover:border-cyber-cyan/50 transition-all duration-300"
                    >
                      
                      {/* Company Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {experience.position}
                          </h3>
                          <div className="flex items-center space-x-2 mb-2">
                            <Briefcase className="w-5 h-5 text-cyber-green" />
                            <span className="text-cyber-green font-semibold text-lg">
                              {experience.company}
                            </span>
                            {experience.companyUrl !== '#' && (
                              <ExternalLink className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                          <div className="flex items-center text-gray-400 text-sm space-x-4">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{experience.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {formatDate(experience.startDate)} - {' '}
                                {experience.current ? 'Presente' : formatDate(experience.endDate)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Duration Badge */}
                        <div className="ml-4 flex flex-col items-end">
                          <span className="px-3 py-1 bg-cyber-cyan/20 text-cyber-cyan rounded-full text-xs font-mono font-bold">
                            {calculateDuration(experience.startDate, experience.endDate)}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            {experience.type}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-6">
                        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                          {experience.description}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div className="mb-6">
                        <div className="flex items-center mb-3">
                          <Code className="w-4 h-4 text-cyber-cyan mr-2" />
                          <span className="text-sm font-mono text-cyber-cyan uppercase tracking-wider">
                            Tecnologías
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getTechIcon(tech)}/20 border border-current`}
                              style={{
                                color: `var(--tw-${getTechIcon(tech).replace('bg-', '').replace('-500', '').replace('-600', '').replace('-400', '')}-400)`,
                                borderColor: `var(--tw-${getTechIcon(tech).replace('bg-', '').replace('-500', '').replace('-600', '').replace('-400', '')}-400)`
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      {experience.achievements && experience.achievements.length > 0 && (
                        <div>
                          <div className="flex items-center mb-3">
                            <Award className="w-4 h-4 text-cyber-green mr-2" />
                            <span className="text-sm font-mono text-cyber-green uppercase tracking-wider">
                              Logros Destacados
                            </span>
                          </div>
                          <ul className="space-y-2">
                            {experience.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="flex items-start space-x-2">
                                <TrendingUp className="w-4 h-4 text-cyber-green mt-1 flex-shrink-0" />
                                <span className="text-gray-300 text-sm">
                                  {achievement}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Briefcase,
                label: 'Años de Experiencia',
                value: '3+',
                color: 'cyber-cyan'
              },
              {
                icon: Code,
                label: 'Proyectos Completados',
                value: '15+',
                color: 'cyber-green'  
              },
              {
                icon: Users,
                label: 'Equipos de Trabajo',
                value: '5+',
                color: 'purple-400'
              }
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="card-cyber p-6 text-center hover:border-cyber-cyan/50 transition-all duration-300"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-${stat.color}/20 mb-4`}>
                    <Icon className={`w-6 h-6 text-${stat.color}`} />
                  </div>
                  <div className={`text-3xl font-bold text-${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 font-mono text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center space-x-4 px-6 py-3 bg-dark-surface border border-dark-border rounded-lg">
              <Calendar className="w-5 h-5 text-cyber-green animate-pulse" />
              <span className="font-mono text-cyber-green">
                {'>'} Actualmente disponible para nuevos desafíos en ciberseguridad
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection