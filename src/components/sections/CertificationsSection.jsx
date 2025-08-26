import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Award,
  Shield,
  Target,
  Book,
  Calendar,
  ExternalLink,
  CheckCircle,
  Clock,
  TrendingUp,
  Zap,
  Users,
  Globe
} from 'lucide-react'

const CertificationsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // Datos de certificaciones (actual y próximas)
  const certifications = [
    {
      id: 1,
      title: 'Técnico Superior en Programación',
      issuer: 'Instituto Tecnológico',
      status: 'completed',
      date: '2021-12-15',
      credentialId: 'TSP-2021-001',
      description: 'Formación integral en desarrollo de software con énfasis en programación orientada a objetos y metodologías ágiles.',
      skills: ['Java', 'Python', 'SQL', 'Metodologías Ágiles', 'Testing'],
      category: 'education',
      icon: Book,
      color: 'cyber-green'
    },
    {
      id: 2,
      title: 'Licenciatura en Ciberdefensa',
      issuer: 'UNDEF (Universidad de la Defensa Nacional)',
      status: 'in_progress',
      date: '2023-03-01',
      expectedCompletion: '2026-12-15',
      credentialId: 'LCD-2023-089',
      description: 'Carrera de grado especializada en ciberseguridad defensiva, análisis de amenazas y operaciones de seguridad.',
      skills: ['Ethical Hacking', 'Digital Forensics', 'Incident Response', 'Risk Assessment'],
      category: 'education',
      icon: Shield,
      color: 'cyber-cyan'
    },
    {
      id: 3,
      title: 'Certified Ethical Hacker (CEH)',
      issuer: 'EC-Council',
      status: 'planned',
      date: '2024-12-01',
      credentialId: 'Planificado',
      description: 'Certificación internacional en hacking ético y técnicas de penetration testing.',
      skills: ['Penetration Testing', 'Vulnerability Assessment', 'Network Security', 'Web Application Security'],
      category: 'certification',
      icon: Target,
      color: 'red-400'
    },
    {
      id: 4,
      title: 'OSCP (Offensive Security Certified Professional)',
      issuer: 'Offensive Security',
      status: 'planned',
      date: '2025-06-01',
      credentialId: 'Objetivo 2025',
      description: 'La certificación más respetada en pentesting práctico con examen hands-on de 24 horas.',
      skills: ['Advanced Penetration Testing', 'Exploit Development', 'Active Directory', 'Post-Exploitation'],
      category: 'certification',
      icon: Zap,
      color: 'purple-400'
    },
    {
      id: 5,
      title: 'AWS Certified Security - Specialty',
      issuer: 'Amazon Web Services',
      status: 'planned',
      date: '2025-03-01',
      credentialId: 'Planificado',
      description: 'Certificación en seguridad de la nube AWS, incluyendo governance, compliance y data protection.',
      skills: ['Cloud Security', 'AWS Security Services', 'Compliance', 'Data Protection'],
      category: 'cloud',
      icon: Globe,
      color: 'orange-400'
    },
    {
      id: 6,
      title: 'CISSP (Certified Information Systems Security Professional)',
      issuer: 'ISC2',
      status: 'planned',
      date: '2026-01-01',
      credentialId: 'Meta a largo plazo',
      description: 'Certificación de alto nivel en seguridad de la información y governance empresarial.',
      skills: ['Security Management', 'Risk Management', 'Security Architecture', 'Governance'],
      category: 'management',
      icon: Users,
      color: 'cyan-400'
    }
  ]

  const getStatusConfig = (status) => {
    const configs = {
      'completed': {
        color: 'bg-cyber-green/20 text-cyber-green border-cyber-green/30',
        icon: CheckCircle,
        label: 'Completado'
      },
      'in_progress': {
        color: 'bg-cyber-cyan/20 text-cyber-cyan border-cyber-cyan/30',
        icon: Clock,
        label: 'En Curso'
      },
      'planned': {
        color: 'bg-purple-500/20 text-purple-400 border-purple-400/30',
        icon: TrendingUp,
        label: 'Planificado'
      }
    }
    return configs[status] || configs['planned']
  }

  const getCategoryColor = (category) => {
    const colors = {
      'education': 'cyber-green',
      'certification': 'cyber-cyan',
      'cloud': 'orange-400',
      'management': 'purple-400'
    }
    return colors[category] || 'cyber-cyan'
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long' 
    })
  }

  // Estadísticas
  const stats = [
    {
      icon: Award,
      label: 'Certificaciones Obtenidas',
      value: certifications.filter(c => c.status === 'completed').length,
      color: 'cyber-green'
    },
    {
      icon: Clock,
      label: 'En Progreso',
      value: certifications.filter(c => c.status === 'in_progress').length,
      color: 'cyber-cyan'
    },
    {
      icon: Target,
      label: 'Objetivos 2024-2026',
      value: certifications.filter(c => c.status === 'planned').length,
      color: 'purple-400'
    },
    {
      icon: TrendingUp,
      label: 'Años de Estudio',
      value: '5+',
      color: 'red-400'
    }
  ]

  return (
    <section id="certifications" className="relative py-20 bg-dark-surface/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,255,0.1)_0%,transparent_50%)] bg-[length:100px_100px]" />
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
                <Award className="inline w-4 h-4 mr-2" />
                Certificaciones & Educación
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-cyber font-bold text-white mb-6">
              Mi Camino de <span className="text-cyber-cyan">Especialización</span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Formación académica y certificaciones profesionales en desarrollo de software y 
              <span className="text-red-400 font-semibold"> ciberseguridad ofensiva</span>, 
              con un plan estratégico hacia la excelencia técnica
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="card-cyber p-6 text-center hover:border-cyber-cyan/50 transition-all duration-300 group"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-${stat.color}/20 mb-4 group-hover:scale-110 transition-transform duration-300`}>
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

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => {
              const Icon = cert.icon
              const statusConfig = getStatusConfig(cert.status)
              const StatusIcon = statusConfig.icon
              const categoryColor = getCategoryColor(cert.category)

              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="card-cyber p-6 hover:border-cyber-cyan/50 transition-all duration-300 group"
                >
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 bg-${categoryColor}/20 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 text-${categoryColor}`} />
                    </div>
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${statusConfig.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      <span className="text-xs font-bold">
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>

                  {/* Title & Issuer */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyber-cyan transition-colors duration-300">
                      {cert.title}
                    </h3>
                    <p className="text-cyber-green font-semibold text-sm">
                      {cert.issuer}
                    </p>
                  </div>

                  {/* Date Info */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {cert.status === 'completed' ? 'Obtenido: ' : cert.status === 'in_progress' ? 'Iniciado: ' : 'Planificado: '}
                        {formatDate(cert.date)}
                      </span>
                    </div>
                    {cert.expectedCompletion && (
                      <div className="flex items-center space-x-2 text-gray-500 text-sm mt-1">
                        <Target className="w-4 h-4" />
                        <span>Meta: {formatDate(cert.expectedCompletion)}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {cert.description}
                  </p>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Zap className="w-4 h-4 text-cyber-cyan mr-2" />
                      <span className="text-sm font-mono text-cyber-cyan uppercase tracking-wider">
                        Skills
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-dark-surface border border-dark-border rounded text-xs font-mono text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-dark-border">
                    <span className="text-xs font-mono text-gray-500">
                      ID: {cert.credentialId}
                    </span>
                    {cert.status === 'completed' && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-dark-surface border border-dark-border rounded-lg text-gray-400 hover:text-white hover:border-cyber-cyan/50 transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Roadmap Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <h3 className="text-3xl font-cyber font-bold text-white mb-8">
              Roadmap de Certificaciones <span className="text-cyber-cyan">2024-2026</span>
            </h3>
            
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyber-cyan via-cyber-green to-purple-500" />
              
              <div className="space-y-8">
                {certifications.filter(c => c.status === 'planned').map((cert, index) => {
                  const Icon = cert.icon
                  return (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 1 + index * 0.2 }}
                      className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
                    >
                      
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-purple-500 rounded-full border-4 border-dark-bg z-10">
                        <div className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-20" />
                      </div>

                      <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                        <div className="card-cyber p-6">
                          <div className="flex items-center space-x-3 mb-3">
                            <Icon className="w-6 h-6 text-purple-400" />
                            <h4 className="text-lg font-bold text-white">
                              {cert.title}
                            </h4>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Meta: {formatDate(cert.date)}
                          </p>
                        </div>
                      </div>

                      <div className="hidden md:block w-5/12" />
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center space-x-4 px-6 py-3 bg-dark-surface border border-dark-border rounded-lg">
              <Target className="w-5 h-5 text-cyber-green animate-pulse" />
              <span className="font-mono text-cyber-green">
                {'>'} Comprometido con la excelencia técnica y el aprendizaje continuo
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CertificationsSection