import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import emailjs from '@emailjs/browser'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Linkedin,
  Github,
  Terminal,
  Shield
} from 'lucide-react'

// Datos de contacto
import profileData from '../data/profile.json'

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const formRef = useRef()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  // Configurar EmailJS (reemplaza con tus datos reales)
  const EMAILJS_SERVICE_ID = 'your_service_id'
  const EMAILJS_TEMPLATE_ID = 'your_template_id'
  const EMAILJS_PUBLIC_KEY = 'your_public_key'

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Simulación de envío - reemplazar con EmailJS real
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Comentado hasta configurar EmailJS
      /*
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      */
      
      setSubmitStatus('success')
      reset()
      
    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: profileData.email,
      href: `mailto:${profileData.email}`,
      color: 'text-cyber-cyan'
    },
    {
      icon: Phone,
      label: 'Teléfono',
      value: profileData.phone,
      href: `tel:${profileData.phone}`,
      color: 'text-cyber-green'
    },
    {
      icon: MapPin,
      label: 'Ubicación',
      value: profileData.location,
      href: '#',
      color: 'text-purple-400'
    },
    {
      icon: Shield,
      label: 'Disponibilidad',
      value: profileData.availability,
      href: '#',
      color: 'text-yellow-400'
    }
  ]

  const socialLinks = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: profileData.linkedin,
      color: 'hover:text-blue-400'
    },
    {
      icon: Github,
      label: 'GitHub',
      href: profileData.github,
      color: 'hover:text-white'
    }
  ]

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
                <Mail className="inline w-4 h-4 mr-2" />
                Contacto
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-cyber font-bold text-white mb-6">
              Hablemos de <span className="text-cyber-cyan">Proyectos</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              ¿Tienes un proyecto interesante? ¿Necesitas consultoría en ciberseguridad 
              o desarrollo móvil? Estoy disponible para nuevas oportunidades.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              
              {/* Contact Methods */}
              <div>
                <h2 className="text-2xl font-cyber font-bold text-white mb-6 flex items-center">
                  <div className="w-2 h-6 bg-cyber-cyan mr-3"></div>
                  Información de Contacto
                </h2>
                
                <div className="space-y-4">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon
                    return (
                      <motion.div
                        key={method.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="card-cyber p-4 hover:border-cyber-cyan/50 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-dark-bg rounded-lg">
                            <Icon className={`w-5 h-5 ${method.color}`} />
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{method.label}</h3>
                            {method.href !== '#' ? (
                              <a
                                href={method.href}
                                className="text-gray-300 hover:text-cyber-cyan transition-colors duration-300"
                              >
                                {method.value}
                              </a>
                            ) : (
                              <p className="text-gray-300">{method.value}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-cyber font-bold text-white mb-4">
                  Redes Profesionales
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 bg-dark-surface border border-dark-border rounded-lg text-gray-400 transition-all duration-300 ${social.color} hover:border-current`}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.a>
                    )
                  })}
                </div>
              </div>

              {/* Terminal Command */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="terminal p-4"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-2">terminal</span>
                </div>
                <div className="font-mono text-sm">
                  <span className="text-cyber-green">root@portfolio:~$</span>
                  <span className="text-white ml-2">contact --email {profileData.email}</span>
                  <div className="text-cyber-cyan mt-1">
                    → Conectando con Matías Britez...
                  </div>
                  <div className="text-cyber-green mt-1">
                    → Status: Available for projects
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="card-cyber p-8">
                <h2 className="text-2xl font-cyber font-bold text-white mb-6">
                  Envíame un Mensaje
                </h2>

                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      {...register('name', { required: 'El nombre es obligatorio' })}
                      className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:border-cyber-cyan focus:outline-none transition-colors duration-300"
                      placeholder="Tu nombre completo"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      {...register('email', { 
                        required: 'El email es obligatorio',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Email inválido'
                        }
                      })}
                      className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:border-cyber-cyan focus:outline-none transition-colors duration-300"
                      placeholder="tu@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Asunto *
                    </label>
                    <input
                      type="text"
                      {...register('subject', { required: 'El asunto es obligatorio' })}
                      className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:border-cyber-cyan focus:outline-none transition-colors duration-300"
                      placeholder="¿De qué quieres hablar?"
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      {...register('message', { required: 'El mensaje es obligatorio' })}
                      rows={5}
                      className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:border-cyber-cyan focus:outline-none transition-colors duration-300 resize-none"
                      placeholder="Cuéntame sobre tu proyecto, consulta o propuesta..."
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full btn-cyber flex items-center justify-center space-x-2 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Enviar Mensaje</span>
                      </>
                    )}
                  </button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2 text-green-400 bg-green-400/10 p-4 rounded-lg border border-green-400/50"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>¡Mensaje enviado! Te responderé pronto.</span>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-4 rounded-lg border border-red-400/50"
                    >
                      <AlertCircle className="w-5 h-5" />
                      <span>Error al enviar. Intenta contactarme directamente por email.</span>
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact