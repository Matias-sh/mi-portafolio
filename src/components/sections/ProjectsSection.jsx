import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { 
  FolderOpen,
  Github,
  ExternalLink,
  Star,
  Clock,
  Code,
  Shield,
  Smartphone,
  Globe,
  Filter,
  ArrowRight,
  Calendar,
  Target
} from 'lucide-react'

// Datos de proyectos
import projectsData from '../../data/projects.json'

const ProjectsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [activeFilter, setActiveFilter] = useState('all')
  const [filteredProjects, setFilteredProjects] = useState(projectsData)

  const projectTypes = [
    { id: 'all', name: 'Todos', icon: FolderOpen, count: projectsData.length },
    { id: 'security', name: 'Seguridad', icon: Shield, count: projectsData.filter(p => p.type === 'security').length },
    { id: 'mobile', name: 'Mobile', icon: Smartphone, count: projectsData.filter(p => p.type === 'mobile').length },
    { id: 'web', name: 'Web', icon: Globe, count: projectsData.filter(p => p.type === 'web').length }
  ]

  const handleFilterChange = (filterType) => {
    setActiveFilter(filterType)
    if (filterType === 'all') {
      setFilteredProjects(projectsData)
    } else {
      setFilteredProjects(projectsData.filter(project => project.type === filterType))
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Completed': { color: 'bg-cyber-green/20 text-cyber-green border-cyber-green/30', icon: '✓' },
      'In Development': { color: 'bg-cyber-cyan/20 text-cyber-cyan border-cyber-cyan/30', icon: '⚡' },
      'Planning': { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30', icon: '📋' }
    }
    return statusConfig[status] || statusConfig['Planning']
  }

  const getTypeIcon = (type) => {
    const icons = {
      'security': Shield,
      'mobile': Smartphone,
      'web': Globe
    }
    return icons[type] || Code
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short' 
    })
  }

  // Mostrar solo proyectos destacados (máximo 6)
  const featuredProjects = filteredProjects.filter(project => project.featured).slice(0, 3)
  const remainingProjects = filteredProjects.filter(project => !project.featured).slice(0, 3)
  const displayProjects = [...featuredProjects, ...remainingProjects].slice(0, 6)

  return (
    <section id="projects" className="relative py-20 bg-dark-bg">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
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
                <FolderOpen className="inline w-4 h-4 mr-2" />
                Portafolio de Proyectos
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-cyber font-bold text-white mb-6">
              Proyectos <span className="text-cyber-cyan">Destacados</span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Una selección de mis mejores trabajos en desarrollo y ciberseguridad, 
              desde herramientas de <span className="text-red-400 font-semibold">pentesting</span> hasta 
              aplicaciones <span className="text-cyber-green font-semibold">móviles</span> innovadoras
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {projectTypes.map((type, index) => {
              const Icon = type.icon
              const isActive = activeFilter === type.id
              
              return (
                <motion.button
                  key={type.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFilterChange(type.id)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-cyber-cyan/20 border-2 border-cyber-cyan text-cyber-cyan'
                      : 'bg-dark-surface border-2 border-dark-border text-gray-400 hover:border-cyber-cyan/50 hover:text-cyber-cyan'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-mono text-sm">{type.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    isActive ? 'bg-cyber-cyan/30' : 'bg-gray-600/30'
                  }`}>
                    {type.count}
                  </span>
                </motion.button>
              )
            })}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayProjects.map((project, index) => {
              const TypeIcon = getTypeIcon(project.type)
              const statusConfig = getStatusBadge(project.status)

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="project-card group"
                >
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="flex items-center space-x-1 px-2 py-1 bg-cyber-cyan/90 rounded-full">
                        <Star className="w-3 h-3 text-white fill-current" />
                        <span className="text-xs font-bold text-white">DESTACADO</span>
                      </div>
                    </div>
                  )}

                  {/* Project Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-cyber-cyan/10 rounded-lg">
                          <TypeIcon className="w-6 h-6 text-cyber-cyan" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-cyber-cyan transition-colors duration-300">
                            {project.title}
                          </h3>
                          <span className="text-sm text-cyber-green font-mono">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status & Date */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusConfig.color}`}>
                        {statusConfig.icon} {project.status}
                      </span>
                      <div className="flex items-center space-x-1 text-gray-500 text-xs">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(project.startDate)}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-dark-surface border border-dark-border rounded text-xs font-mono text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-cyber-cyan/20 border border-cyber-cyan/30 rounded text-xs font-mono text-cyber-cyan">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-dark-border">
                      <div className="flex items-center space-x-3">
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-dark-surface border border-dark-border rounded-lg text-gray-400 hover:text-white hover:border-cyber-cyan/50 transition-all duration-300"
                          >
                            <Github className="w-4 h-4" />
                          </motion.a>
                        )}
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-dark-surface border border-dark-border rounded-lg text-gray-400 hover:text-white hover:border-cyber-green/50 transition-all duration-300"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </motion.a>
                        )}
                      </div>

                      <Link
                        to={`/projects/${project.slug}`}
                        className="flex items-center space-x-2 text-cyber-cyan hover:text-white font-mono text-sm transition-colors duration-300 group"
                      >
                        <span>Ver detalles</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Ver todos los proyectos */}
          {filteredProjects.length > 6 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mt-12"
            >
              <Link
                to="/projects"
                className="inline-flex items-center space-x-3 btn-cyber px-8 py-4 text-lg font-semibold group"
              >
                <span>Ver Todos los Proyectos</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          )}

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {[
              {
                icon: FolderOpen,
                label: 'Proyectos Totales',
                value: projectsData.length,
                color: 'cyber-cyan'
              },
              {
                icon: Shield,
                label: 'Herramientas de Seguridad',
                value: projectsData.filter(p => p.type === 'security').length,
                color: 'red-400'
              },
              {
                icon: Smartphone,
                label: 'Apps Móviles',
                value: projectsData.filter(p => p.type === 'mobile').length,
                color: 'cyber-green'
              },
              {
                icon: Target,
                label: 'En Desarrollo',
                value: projectsData.filter(p => p.status === 'In Development').length,
                color: 'purple-400'
              }
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.1 + index * 0.1 }}
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
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection