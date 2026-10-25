"use client";

import { MotionConfig, motion } from "motion/react";

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const sequence = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.32,
      staggerChildren: 0.11,
    },
  },
};

export function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="hero" id="inicio" aria-labelledby="hero-title">
      <motion.div
        className="hero-media"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.95, scale: 1.04 }}
        transition={{ duration: 1.5, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <div className="hero-scene" />
      </motion.div>
      <div className="hero-grid-layer" aria-hidden="true" />
      <motion.div
        className="hero-orbit"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
      >
        <div className="hero-ring" />
        <div className="hero-ring hero-ring-inner" />
        <div className="hero-orbit-word">
          V<span>AURA</span>L
        </div>
      </motion.div>

      <div className="wrap hero-frame">
        <motion.div
          className="hero-meta hero-meta-left"
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.48 }}
        >
          <span>ESTUDIO DIGITAL</span>
          <span>DISEÑO · WEB · CONTENIDO</span>
        </motion.div>

        <motion.div className="hero-center" variants={sequence} initial="hidden" animate="visible">
          <motion.p className="eyebrow" variants={reveal}>Páginas web · Contenido para redes</motion.p>
          <motion.h1 id="hero-title" className="hero-title" variants={reveal}>
            VAURAL<span className="title-dot">.</span>
          </motion.h1>
          <motion.p className="hero-tagline" variants={reveal}>Tu negocio, en su mejor versión digital.</motion.p>
          <motion.p className="hero-copy" variants={reveal}>
            Creamos páginas web, contenido para redes sociales y catálogos digitales para que tu negocio se presente mejor.
          </motion.p>
          <motion.div className="hero-actions" variants={reveal}>
            <a className="button button-primary" href="#servicios">
              Explorar servicios <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-ghost" href="#contacto">
              Hablemos de tu proyecto
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-meta hero-meta-right"
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.58 }}
        >
          <span>ASUNCIÓN<br />PARAGUAY</span>
          <span>01 — 04<br />VAURAL</span>
        </motion.div>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span>Deslizá</span>
        <i />
      </div>
      </section>
    </MotionConfig>
  );
}
