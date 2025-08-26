import React, { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Github, 
  ExternalLink, 
  Calendar, 
  Clock,
  Shield,
  Smartphone,
  Globe,
  Code,
  CheckCircle,
  AlertCircle,
  Target
} from 'lucide-react'

import projectsData from '../data/projects.json'

const ProjectDetail = () => {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const foundProject = projectsData.find(p => p.slug === slug)
    setProject(foundProject)
    setLoading(false)
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-cyber-cyan text-xl font-mono">Cargando proyecto...</div>
      </div>
    )
  }

  if (!project) {
    return <Navigate to="/projects" replace />
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

  const Icon = getProjectIcon(project.type)

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-cyber-cyan transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono">Volver a Proyectos</span>
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-cyber-cyan/10 rounded-xl">
                <Icon className="w-8 h-8 text-cyber-cyan" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-cyber font-bold text-white mb-2">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-400">{project.category}</p>
              </div>
            </div>
            
            <span className={`px-3 py-1 text-sm font-mono rounded border ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>

          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Project Meta */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card-cyber p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Calendar className="w-5 h-5 text-cyber-cyan" />
                <span className="font-medium text-white">Período</span>
              </div>
              <p className="text-gray-300 font-mono text-sm">
                {new Date(project.startDate).toLocaleDateString('es-AR')}
                {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString('es-AR')}`}
              </p>
            </div>

            <div className="card-cyber p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Code className="w-5 h-5 text-cyber-green" />
                <span className="font-medium text-white">Tecnologías</span>
              </div>
              <p className="text-gray-300 text-sm">
                {project.technologies.length} tecnologías utilizadas
              </p>
            </div>

            <div className="card-cyber p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Target className="w-5 h-5 text-cyber-purple" />
                <span className="font-medium text-white">Tipo</span>
              </div>
              <p className="text-gray-300 text-sm capitalize">
                {project.type === 'security' ? 'Ciberseguridad' : 
                 project.type === 'mobile' ? 'Aplicación Móvil' : 
                 project.type === 'web' ? 'Aplicación Web' : project.type}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber flex items-center space-x-2"
              >
                <Github className="w-4 h-4" />
                <span>Ver Código</span>
              </a>
            )}
            
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-cyber-green/10 border-2 border-cyber-green text-cyber-green font-mono uppercase tracking-wider transition-all duration-300 hover:bg-cyber-green hover:text-dark-bg flex items-center space-x-2"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                }}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Ver Live</span>
              </a>
            )}
          </div>
        </motion.div>

        {/* Detailed Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-cyber font-bold text-white mb-6 flex items-center">
            <div className="w-2 h-6 bg-cyber-cyan mr-3"></div>
            Descripción Detallada
          </h2>
          
          <div className="card-cyber p-8">
            <div className="prose prose-invert max-w-none">
              {project.detailedDescription.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h3 key={index} className="text-lg font-semibold text-cyber-cyan mt-6 mb-3">
                      {paragraph.slice(2, -2)}
                    </h3>
                  )
                }
                if (paragraph.startsWith('• ')) {
                  return (
                    <li key={index} className="text-gray-300 mb-2 list-none">
                      <span className="text-cyber-green mr-2">▸</span>
                      {paragraph.slice(2)}
                    </li>
                  )
                }
                if (paragraph.includes('```')) {
                  return (
                    <pre key={index} className="bg-black p-4 rounded-lg text-cyber-green font-mono text-sm my-4 overflow-x-auto">
                      <code>{paragraph.replace(/```\w*\n?/g, '')}</code>
                    </pre>
                  )
                }
                return paragraph.trim() ? (
                  <p key={index} className="text-gray-300 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ) : null
              })}
            </div>
          </div>
        </motion.div>

        {/* Technologies Used */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-cyber font-bold text-white mb-6 flex items-center">
            <div className="w-2 h-6 bg-cyber-green mr-3"></div>
            Stack Tecnológico
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="card-cyber p-4 text-center group hover:border-cyber-cyan/50 transition-all duration-300"
              >
                <div className="text-lg font-mono text-white group-hover:text-cyber-cyan transition-colors duration-300">
                  {tech}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Challenges & Achievements */}
        {(project.challenges || project.achievements) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Challenges */}
              {project.challenges && (
                <div>
                  <h3 className="text-xl font-cyber font-bold text-white mb-4 flex items-center">
                    <AlertCircle className="w-5 h-5 text-yellow-400 mr-2" />
                    Desafíos Técnicos
                  </h3>
                  <div className="card-cyber p-6 border-l-4 border-yellow-400">
                    <ul className="space-y-3">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-300">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Achievements */}
              {project.achievements && (
                <div>
                  <h3 className="text-xl font-cyber font-bold text-white mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                    Logros Alcanzados
                  </h3>
                  <div className="card-cyber p-6 border-l-4 border-green-400">
                    <ul className="space-y-3">
                      {project.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Navigation to Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-dark-surface border border-dark-border rounded-lg text-gray-300 hover:text-cyber-cyan hover:border-cyber-cyan/50 transition-all duration-300"
          >
            <Code className="w-4 h-4" />
            <span className="font-mono">Ver Todos los Proyectos</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default ProjectDetail