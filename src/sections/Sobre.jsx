import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

/* ── Componente NumberTicker (anima um número de 0 até o valor alvo) ── */
const NumberTicker = ({ value, duration = 1600, start = false }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(easeOutQuart(progress) * value));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(value);
    };
    requestAnimationFrame(step);
  }, [start, value, duration]);

  return <>{count}</>;
};

const Sobre = () => {
  const { theme } = useTheme();
  const [modalAberto, setModalAberto] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef(null);

  const isDark = theme === 'dark';

  // Inicia os contadores quando os indicadores entrarem na tela
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { target: 8,  suffix: '+', label: 'Membros do Time' },
    { target: 20, suffix: '+', label: 'Clientes Felizes' },
    { target: 99, suffix: '%', label: 'Satisfação' },
  ];

  const styles = {
    section: {
      width: '100%',
      padding: '80px 0',
      backgroundColor: isDark ? '#0f172a' : '#fff',
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      boxSizing: 'border-box',
      transition: 'background-color 0.2s ease',
    },
    innerContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '40px',
      flexWrap: 'wrap',
      boxSizing: 'border-box',
    },
    containerImagem: {
      flex: '1',
      minWidth: '260px',
      maxWidth: '420px',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    imagemUnica: {
      width: '100%',
      height: 'auto',
      aspectRatio: '1 / 1',
      objectFit: 'cover',
      borderRadius: '50px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    },
    conteudo: {
      flex: '1.2',
      minWidth: '280px',
    },
    subtitulo: {
      color: isDark ? '#60a5fa' : '#3b82f6',
      fontWeight: '700',
      fontSize: '14px',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      marginBottom: '15px',
      display: 'block',
      textAlign: 'left',
    },
    titulo: {
      fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
      lineHeight: '1.2',
      color: isDark ? '#f1f5f9' : '#0f172a',
      fontWeight: '800',
      marginBottom: '20px',
      textAlign: 'left',
    },
    texto: {
      color: isDark ? '#cbd5e1' : '#64748b',
      fontSize: '16px',
      lineHeight: '1.8',
      marginBottom: '35px',
      textAlign: 'justify',
      textJustify: 'inter-word',
      width: '100%',
    },
    statsContainer: {
      display: 'flex',
      justifyContent: 'center',   // centraliza horizontalmente
      alignItems: 'center',
      gap: '48px',                 // espaçamento entre os itens
      flexWrap: 'wrap',
      marginBottom: '28px',
      paddingTop: '24px',
      borderTop: `1px solid ${isDark ? '#1e293b' : '#f1f5f9'}`,
    },
    statItem: {
      textAlign: 'center',
      minWidth: '100px',
    },
    statNumber: {
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: '600',
      letterSpacing: '-0.02em',   // tracking-tighter
      fontFamily: "'Inter', 'Segoe UI', monospace",
      color: isDark ? '#60a5fa' : '#2563eb',
      lineHeight: '1.2',
      display: 'block',
    },
    statLabel: {
      fontSize: '11px',
      fontWeight: '700',
      color: '#94a3b8',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      marginTop: '6px',
      display: 'block',
    },
    assinaturaContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      marginTop: '28px',
    },
    fotoCircular: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      objectFit: 'cover',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      flexShrink: 0,
    },
    fotoHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
    },
    assinaturaTexto: {
      textAlign: 'left',
    },
    nome: {
      fontSize: '18px',
      fontWeight: 'bold',
      fontStyle: 'italic',
      color: isDark ? '#f1f5f9' : '#1e293b',
      display: 'block',
    },
    cargo: {
      fontSize: '12px',
      color: '#94a3b8',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginTop: '4px',
      display: 'block',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      cursor: 'pointer',
    },
    modalImagem: {
      maxWidth: '70vw',
      maxHeight: '70vh',
      borderRadius: '16px',
      boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
    },
  };

  return (
    <>
      <style>{`
        @media (max-width: 600px) {
          #sobre-inner { flex-direction: column !important; gap: 24px !important; }
          #sobre-imagem { max-width: 100% !important; }
          #sobre-imagem img { border-radius: 24px !important; }
          #sobre-conteudo { min-width: unset !important; }
          #sobre-texto { text-align: justify !important; }
          #sobre-subtitulo { text-align: left !important; }
          #sobre-titulo { text-align: left !important; }
          #sobre-assinatura { justify-content: center !important; }
          .stats-row { gap: 24px !important; }
        }
      `}</style>

      <section id="sobre" className="reveal" style={styles.section}>
        <div id="sobre-inner" style={styles.innerContainer}>
          <div id="sobre-imagem" style={styles.containerImagem}>
            <img 
              src="/equipe.webp" 
              alt="Equipe North Digits" 
              style={styles.imagemUnica}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div id="sobre-conteudo" style={styles.conteudo}>
            <span id="sobre-subtitulo" style={styles.subtitulo}>// SOBRE NÓS</span>

            <h2 id="sobre-titulo" style={styles.titulo}>
              Transformando{' '}
              <span style={{ color: isDark ? '#60a5fa' : '#3b82f6' }}>Ideias</span>{' '}
              em Realidade Digitais
            </h2>

            <p id="sobre-texto" style={styles.texto}>
              A North Digits é uma empresa de soluções digitais especializada em transformação
              digital, desenvolvimento de software personalizado e soluções orientadas por dados,
              com foco em inovação e impacto. A empresa nasceu para acelerar a evolução tecnológica
              em Moçambique, entregando produtos digitais integrados que impulsionam eficiência,
              crescimento e resultados sustentáveis.
            </p>

            {/* Indicadores centralizados sem cards */}
            <div ref={statsRef} className="stats-row" style={styles.statsContainer}>
              {stats.map((stat, idx) => (
                <div key={idx} style={styles.statItem}>
                  <span style={styles.statNumber}>
                    <NumberTicker value={stat.target} duration={1600} start={statsStarted} />
                    {stat.suffix}
                  </span>
                  <span style={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Assinatura CEO */}
            <div id="sobre-assinatura" style={styles.assinaturaContainer}>
              <img
                src="/ceo.webp"
                alt="Inocêncio Nanlelo - CEO"
                style={{ ...styles.fotoCircular, ...(isHover && styles.fotoHover) }}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onClick={() => setModalAberto(true)}
                loading="lazy"
                decoding="async"
              />
              <div style={styles.assinaturaTexto}>
                <span style={styles.nome}>Inocêncio Nanlelo</span>
                <span style={styles.cargo}>NORTH DIGITS • CEO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal CEO */}
        {modalAberto && (
          <div style={styles.modalOverlay} onClick={() => setModalAberto(false)}>
            <img
              src="/ceo-grande.webp"
              alt="Inocêncio Nanlelo - CEO ampliado"
              style={styles.modalImagem}
              onClick={(e) => e.stopPropagation()}
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
      </section>
    </>
  );
};

export default Sobre;