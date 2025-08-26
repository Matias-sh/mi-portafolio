import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Code, 
  Shield, 
  Smartphone, 
  Globe, 
  Github, 
  ExternalLink,
  Calendar,
  Tag,
  Filter
} from 'lucide-react'

// Mock data - en producción vendría de JSON
import projectsData from '../data/projects.json'

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    setProjects(projectsData)
    setFilteredProjects(projectsData)
  }, [])

  const filters = [
    { id: 'all', label: 'Todos', count: projects.length },
    { id: 'security', label: 'Ciberseguridad', count: projects.filter(p => p.type === 'security').length },
    { id: 'mobile', label: 'Mobile', count: projects.filter(p => p.type === 'mobile').length },
    { id: 'web', label: 'Web', count: projects.filter(p => p.type === 'web').length },
  ]

  const handleFilter = (filterId) => {
    setActiveFilter(filterId)
    if (filterId === 'all') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(project => project.type === filterId))
    }
  }

  const getProjectIcon = (type) => {
    const icons = {
      security: Shield,
      mobile: Smartphone,
      web: Globe,
      default: Code
    }
    return icons[type] || icons.default
  }

  const getStatusColor = (status) => {
    const colors = {
      'Completed': 'bg-green-500/20 text-green-400 border-green-500/50',
      'In Development': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      'Planning': 'bg-blue-500/20 text-blue-400 border-blue-500/50'
    }
    return colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/50'
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Mis Proyectos
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-cyber font-bold text-white mb-6">
              Portfolio <span className="text-cyber-cyan">Técnico</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Una selección de proyectos que van desde herramientas de ciberseguridad hasta 
              aplicaciones móviles, demostrando mi evolución de desarrollador a hacker ético.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {filters.map((filter, index) => (
              <motion.button
                key={filter.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFilter(filter.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-cyber-cyan/20 border-2 border-cyber-cyan text-cyber-cyan'
                    : 'bg-dark-surface border-2 border-dark-border text-gray-400 hover:border-cyber-cyan/50 hover:text-cyber-cyan'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span className="font-mono">{filter.label}</span>
                <span className="text-xs bg-current/20 px-2 py-1 rounded-full">
                  {filter.count}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredProjects.map((project, index) => {
              const Icon = getProjectIcon(project.type)
              
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="project-card group"
                >
                  {/* Project Image/Icon */}
                  <div className="relative h-48 bg-gradient-to-br from-cyber-cyan/20 to-cyber-green/20 rounded-t-lg overflow-hidden">
                    {project.imageUrl ? (
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Icon className="w-16 h-16 text-white/70" />
                      </div>
                    )}
                    
                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-cyber-cyan/90 text-black text-xs font-bold rounded uppercase">
                          Destacado
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-6 space-y-4">
                    
                    {/* Header */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-white group-hover:text-cyber-cyan transition-colors duration-300">
                          {project.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-mono rounded border ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-400 text-sm">{project.category}</p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-dark-border text-gray-300 text-xs rounded font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-dark-border text-gray-400 text-xs rounded">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-dark-border">
                      
                      {/* Date */}
                      <div className="flex items-center space-x-2 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span className="font-mono">
                          {new Date(project.startDate).getFullYear()}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-white transition-colors duration-300"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-cyber-cyan transition-colors duration-300"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}

                        <Link
                          to={`/projects/${project.slug}`}
                          className="px-3 py-1 bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/20 transition-colors duration-300 rounded text-sm font-mono"
                        >
                          Ver más
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center space-x-4 px-6 py-3 bg-dark-surface border border-dark-border rounded-lg">
              <Github className="w-5 h-5 text-cyber-green animate-pulse" />
              <span className="font-mono text-gray-300">
                Todos los proyectos están disponibles en mi GitHub
              </span>
              <a
                href="https://github.com/Matias-sh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-cyan hover:text-cyber-green transition-colors duration-300 font-mono"
              >
                @Matias-sh
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Projects