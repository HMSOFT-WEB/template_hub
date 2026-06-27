import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight, Code } from 'lucide-react';
import * as THREE from 'three';
import * as random from 'maath/random/dist/maath-random.esm';
import './index.css';

import logo from './assets/logo.png';

// 3D Starfield Background
function Starfield(props) {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#7928ca" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

const templates = [
  {
    id: 1,
    title: "Enterprise Corporate",
    category: "Corporate",
    desc: "A premium, trustworthy UI for global IT enterprises and B2B services. Features 3D data visualization.",
    url: "https://HMSOFT-WEB.github.io/corporate_template/",
    icon: "🏢"
  },
  {
    id: 2,
    title: "Bio Healthcare",
    category: "Science",
    desc: "Clean, pristine design for medical, pharma, and biotech companies with interactive DNA models.",
    url: "https://HMSOFT-WEB.github.io/bio_template2/",
    icon: "🧬"
  },
  {
    id: 3,
    title: "Heavy Construction",
    category: "Industry",
    desc: "Robust, solid brutalist design for engineering and architecture firms. Features a 3D structural model.",
    url: "https://HMSOFT-WEB.github.io/construction_template3/",
    icon: "🏗️"
  },
  {
    id: 4,
    title: "Global E-Commerce",
    category: "Commerce",
    desc: "Modern luxury retail storefront with dynamic product carousels and immersive shopping experiences.",
    url: "https://HMSOFT-WEB.github.io/ecommerce_template4/",
    icon: "🛍️"
  },
  {
    id: 5,
    title: "SaaS Platform Dashboard",
    category: "Tech",
    desc: "Data-driven UI for cloud software, featuring glassmorphism and real-time dashboard analytics.",
    url: "https://HMSOFT-WEB.github.io/platform_template5/",
    icon: "📊"
  },
  {
    id: 6,
    title: "EdTech Education",
    category: "Education",
    desc: "Interactive, engaging design for online academies and universities. Friendly and accessible.",
    url: "https://HMSOFT-WEB.github.io/education_template6/",
    icon: "🎓"
  },
  {
    id: 7,
    title: "Vegan Cosmetics",
    category: "Commerce",
    desc: "Elegant pastel aesthetic with high-end 3D glass refraction (serum bottle) for beauty brands.",
    url: "https://HMSOFT-WEB.github.io/cosmetics_template7/",
    icon: "✨"
  },
  {
    id: 8,
    title: "Specialty Coffee",
    category: "Commerce",
    desc: "Deep, moody dark mode design for artisan roasteries. Features an interactive 3D coffee bean.",
    url: "https://HMSOFT-WEB.github.io/coffee_template8/",
    icon: "☕"
  },
  {
    id: 9,
    title: "Esports Gaming Gear",
    category: "Tech",
    desc: "Aggressive cyberpunk styling, neon accents, and mechanical 3D switch animations for gamers.",
    url: "https://HMSOFT-WEB.github.io/gaming_template9/",
    icon: "⌨️"
  },
  {
    id: 10,
    title: "Streetwear Fashion",
    category: "Commerce",
    desc: "Hypebeast culture aesthetic with brutalist typography and heavy contrast for sneaker drops.",
    url: "https://HMSOFT-WEB.github.io/streetwear_template10/",
    icon: "👟"
  },
  {
    id: 11,
    title: "Minimal Interior Design",
    category: "Commerce",
    desc: "Scandinavian minimalism, warm taupe tones, and organic 3D shapes for premium furniture.",
    url: "https://HMSOFT-WEB.github.io/interior_template11/",
    icon: "🛋️"
  }
];

const categories = ["All", "Commerce", "Corporate", "Tech", "Science", "Industry", "Education"];

function App() {
  const [filter, setFilter] = useState("All");

  const filteredTemplates = filter === "All" 
    ? templates 
    : templates.filter(t => t.category === filter);

  return (
    <>
      <div className="canvas-bg">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Starfield />
        </Canvas>
      </div>

      <header className="header">
        <div className="logo">
          <img src={logo} alt="HMSOFT WEB" onError={(e) => e.target.style.display='none'} />
          HMSOFT WEB
        </div>
      </header>

      <main>
        <section className="hero">
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            HMSOFT WEB TEMPLATE HUB
          </motion.div>
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            The Ultimate Collection of <br/> <span>Premium 3D Web Experiences.</span>
          </motion.h1>
          <motion.p 
            className="hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Browse through our 11 meticulously crafted, industry-specific web application templates. 
            Powered by React, Three.js, and Framer Motion.
          </motion.p>
        </section>

        <section className="main-content">
          <motion.div 
            className="filter-bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <motion.div layout className="grid">
            <AnimatePresence>
              {filteredTemplates.map((template, idx) => (
                <motion.div 
                  key={template.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="card"
                >
                  <div className="card-img-placeholder">
                    <span style={{ fontSize: '5rem' }}>{template.icon}</span>
                    <div className="card-number">{String(template.id).padStart(2, '0')}</div>
                  </div>
                  <div className="card-content">
                    <div className="card-category">{template.category}</div>
                    <h3 className="card-title">{template.title}</h3>
                    <p className="card-desc">{template.desc}</p>
                    <div className="card-footer">
                      <a href={template.url} target="_blank" rel="noreferrer" className="btn-visit">
                        Visit Live Site <ArrowRight size={18} />
                      </a>
                      <Code size={20} color="var(--text-muted)" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 HMSOFT Web Agency. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default App;
