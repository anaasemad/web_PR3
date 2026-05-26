/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, FormEvent } from 'react';
import ImageCarousel from './components/ImageCarousel';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Box, 
  MessageSquare, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Phone,
  Settings,
  Zap,
  Shield,
  Menu,
  X,
  Star
} from 'lucide-react';
import { PROJECTS, REVIEWS } from './constants';
import { Project } from './types';

type Section = 'home' | 'projects' | 'reviews' | 'contact' | 'project-detail';

export default function App() {
  const [activeTab, setActiveTab] = useState<Section>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const selectedProject = PROJECTS.find(p => p.id === selectedProjectId);

  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id);
    setActiveTab('project-detail');
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Cpu },
    { id: 'projects', label: 'Proyectos', icon: Box },
    { id: 'reviews', label: 'Reseñas', icon: MessageSquare },
    { id: 'contact', label: 'Contacto', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolled ? 'bg-white/80 backdrop-blur-lg border-b border-mars-line py-6' : 'bg-transparent py-8'
      }`}>
        <div className="max-w-7xl mx-auto px-12 flex justify-between items-center">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-8 h-8 bg-slate-900 flex items-center justify-center">
              <span className="text-white font-bold text-xs">M</span>
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase text-slate-900">Mars Automation</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Section)}
                className={`text-xs font-semibold tracking-widest uppercase transition-colors relative py-1 ${
                  activeTab === item.id ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-mars-bg pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as Section);
                    setIsMenuOpen(false);
                  }}
                  className={`text-3xl font-bold uppercase tracking-tighter ${
                    activeTab === item.id ? 'text-mars-primary' : 'text-gray-500'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main>
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Home onExplore={() => setActiveTab('projects')} onContact={() => setActiveTab('contact')} />
            </motion.div>
          )}
          {activeTab === 'projects' && (
            <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Projects onSelect={handleSelectProject} />
            </motion.div>
          )}
          {activeTab === 'project-detail' && selectedProject && (
            <motion.div key="project-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ProjectDetail project={selectedProject} onBack={() => setActiveTab('projects')} />
            </motion.div>
          )}
          {activeTab === 'reviews' && (
            <motion.div key="reviews" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Reviews />
            </motion.div>
          )}
          {activeTab === 'contact' && (
            <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Contact />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="px-12 py-10 border-t border-slate-100 flex justify-between items-center bg-white mt-12">
        <p className="text-[10px] text-slate-400 uppercase tracking-widest">© 2026 MARS Automation — Industrial Excellence</p>
        <div className="hidden md:flex space-x-12">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-slate-900 cursor-pointer transition-colors">LinkedIn</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-slate-900 cursor-pointer transition-colors">Digital Twin</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-slate-900 cursor-pointer transition-colors">Standards</span>
        </div>
      </footer>
    </div>
  );
}

function Home({ onExplore, onContact }: { onExplore: () => void; onContact: () => void }) {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-12 relative z-10 w-full mt-12">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none text-slate-900 mb-6 uppercase">
              Modular Automated <br />
              <span className="text-slate-400"> Robotic System</span>
            </h1>
            <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-xl font-light">
              Optimizamos plantas industriales mediante sistemas de control avanzado y robótica de última generación para una eficiencia sin precedentes.
            </p>
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={onExplore}
                className="bg-slate-900 text-white px-10 py-4 font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all"
              >
                Explorar Soluciones
              </button>
              <button 
                onClick={onContact}
                className="border border-slate-200 text-slate-900 px-10 py-4 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
              >
                Solicitar Auditoría
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Grid Part */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-slate-50/50 -z-10 border-l border-slate-100 hidden lg:block" />
      </section>

      {/* Services/Features */}
      <section className="py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-12">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Nuestros Pilares</h2>
            <div className="h-[1px] flex-grow bg-slate-100"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-10 h-10 border border-slate-100 flex items-center justify-center text-slate-900">
                <Zap size={20} />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider">Alta Velocidad</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">Optimizamos los ciclos de producción para maximizar el output sin comprometer la calidad.</p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 border border-slate-100 flex items-center justify-center text-slate-900">
                <Settings size={20} />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider">Flexibilidad Dinámica</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">Sistemas modulares que permiten reconfigurar líneas en tiempo récord para nuevos modelos.</p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 border border-slate-100 flex items-center justify-center text-slate-900">
                <Shield size={20} />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider">Seguridad Integrada</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">Protocolos de seguridad redundantes y robótica colaborativa para entornos híbridos.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Projects({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-12">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Casos de Éxito</h2>
        <div className="h-[1px] flex-grow bg-slate-100 ml-6"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project) => (
          <div 
            key={project.id} 
            onClick={() => onSelect(project.id)}
            className="group bg-slate-50 p-8 flex flex-col justify-between border border-transparent hover:border-slate-200 transition-all cursor-pointer"
          >
            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase mb-3 block tracking-widest underline decoration-2 underline-offset-4">
                {project.id === 'stockit' ? 'Stockit' : 'TechLine'}
              </span>
              <h3 className="text-3xl font-bold mb-4 text-slate-900">{project.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
                {project.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white border border-slate-200 text-[9px] font-bold uppercase tracking-tighter text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 mb-12 transition-colors"
      >
        <ArrowRight className="rotate-180" size={14} /> Volver a Proyectos
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-12">
          <span className="text-[10px] font-bold text-blue-600 uppercase mb-4 block tracking-widest underline decoration-2 underline-offset-4">
            Implementación MARS
          </span>
          <h2 className="text-6xl font-black uppercase tracking-tighter text-slate-900 mb-8 leading-none">
            {project.title}
          </h2>
          <div className="h-[1px] w-full bg-slate-100 mb-12" />
        </div>

        <div className="lg:col-span-7">
            <div className="mb-12">
              <ImageCarousel images={project.images} title={project.title} />
          </div>
          
          <div className="space-y-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Memoria Técnica</h3>
            <p className="text-xl text-slate-600 font-light leading-relaxed">
              {project.fullDescription}
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-12">
          <div className="bg-slate-50 p-10 border border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 mb-8 border-b border-slate-200 pb-4">Especificaciones</h3>
            <ul className="space-y-6">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-slate-900 mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-slate-600 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-10 border border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-8 border-b border-slate-200 pb-4">Impacto Medido</h3>
            <ul className="space-y-6">
              {project.results.map((result, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-slate-900 mt-0.5" />
                  <span className="text-sm text-slate-900 font-bold uppercase tracking-tight">{result}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Reviews() {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-12">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Reseñas de Clientes</h2>
        <div className="h-[1px] flex-grow bg-slate-100 ml-6"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {REVIEWS.map((review, i) => (
          <div key={review.id} className={`border-l-4 ${i === 0 ? 'border-slate-900' : 'border-slate-200'} pl-6 py-4`}>
            <p className="text-lg italic text-slate-600 mb-4 leading-relaxed font-light">
              "{review.comment}"
            </p>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase text-slate-900 tracking-widest">{review.name}</span>
              <span className="text-[9px] font-medium uppercase text-slate-400 tracking-widest">{review.company}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '', company: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', message: '', company: '' });
    }, 3000);
  };

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-12 mb-10">
          <h2 className="text-5xl font-black uppercase tracking-tight text-slate-900 leading-none">
            Impulsemos tu <br /><span className="text-slate-400">Eficiencia Industrial.</span>
          </h2>
        </div>
        
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Oficina Central</h4>
            <p className="text-slate-600 text-sm font-light leading-relaxed"> Edificios 1G - 1E - 1H, Camí de Vera, s/n, Algirós,  Valencia, España</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Canal Directo</h4>
            <p className="text-slate-900 font-bold">+34 912 345 678</p>
            <p className="text-slate-500 text-sm font-light">info@mars-automation.com</p>
          </div>
        </div>

        <div className="lg:col-span-7 bg-slate-900 p-12 text-white">
          <h3 className="text-xs font-bold uppercase tracking-widest mb-8 text-slate-400">Solicitud de Auditoría Directa</h3>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Nombre</label>
                <input 
                  type="text" 
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:border-white outline-none transition-colors"
                  placeholder="Ej: Director Técnico"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Empresa</label>
                <input 
                  type="text" 
                  value={formState.company}
                  onChange={(e) => setFormState({...formState, company: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:border-white outline-none transition-colors"
                  placeholder="Nombre de la Planta"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Corporativo</label>
              <input 
                type="email" 
                required
                value={formState.email}
                onChange={(e) => setFormState({...formState, email: e.target.value})}
                className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:border-white outline-none transition-colors"
                placeholder="email@industria.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Requerimientos Técnicos</label>
              <textarea 
                rows={4}
                required
                value={formState.message}
                onChange={(e) => setFormState({...formState, message: e.target.value})}
                className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:border-white outline-none transition-colors resize-none"
                placeholder="Breve descripción del proceso a optimizar..."
              />
            </div>
            <button 
              type="submit"
              disabled={submitted}
              className={`w-full py-4 font-bold text-xs uppercase tracking-widest transition-all ${
                submitted ? 'bg-green-600 text-white' : 'bg-white text-slate-900 hover:bg-slate-100'
              }`}
            >
              {submitted ? 'Enviado con Éxito' : 'Iniciar Auditoría'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
