import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Parceiros = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const parceiros = [
    { id: 1, img: "/parceiro1.webp", nome: "LDC Business e Consultorias" },
    { id: 2, img: "/parceiro2.webp", nome: "TechBSS" },
    { id: 3, img: "/parceiro1.webp", nome: "LDC Business e Consultorias" },
    { id: 4, img: "/parceiro2.webp", nome: "TechBSS" },
    { id: 5, img: "/parceiro1.webp", nome: "LDC Business e Consultorias" },
    { id: 6, img: "/parceiro2.webp", nome: "TechBSS" },
  ];

  const cardWidth = 150;
  const gap = 20;
  const cardTotalWidth = cardWidth + gap;
  const duplicatedItems = [...parceiros, ...parceiros];
  const totalWidth = cardTotalWidth * duplicatedItems.length;

  // Estilos dinâmicos
  const sectionStyle = {
    padding: '80px 0',
    backgroundColor: isDark ? '#0f172a' : '#ffffff',
    overflow: 'hidden',
    width: '100%',
    transition: 'background-color 0.2s ease',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    textAlign: 'center'
  };

  const sliderStyle = {
    display: 'flex',
    width: `${totalWidth}px`,
    animation: 'scroll 40s linear infinite',
    gap: `${gap}px`,
    alignItems: 'center',
    padding: '30px 0'
  };

  const cardWrapperStyle = {
    width: `${cardWidth}px`,
    backgroundColor: isDark ? '#1e293b' : '#ffffff',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${isDark ? '#334155' : '#f1f5f9'}`,
    padding: '16px 8px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
    transition: 'border-color 0.3s ease, background-color 0.2s ease',
    textAlign: 'center',
  };

  const logoImgStyle = {
    width: '100%',
    maxWidth: '100px',
    height: 'auto',
    maxHeight: '80px',
    objectFit: 'contain',
    borderRadius: '8px',
    display: 'block',
    margin: '0 auto'
  };

  const textSpanStyle = {
    fontSize: '0.7rem',
    fontWeight: '600',
    color: isDark ? '#cbd5e1' : '#1e293b',
    marginTop: '12px',
    display: 'block',
    lineHeight: 1.3,
  };

  const leftGradient = isDark
    ? 'linear-gradient(to right, #0f172a, transparent)'
    : 'linear-gradient(to right, white, transparent)';
  const rightGradient = isDark
    ? 'linear-gradient(to left, #0f172a, transparent)'
    : 'linear-gradient(to left, white, transparent)';

  return (
    <section id="parceiros" style={sectionStyle}>
      <div style={containerStyle}>
        <div style={{ marginBottom: '50px' }}>
          <span style={{ color: '#2563eb', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.8rem', fontWeight: '800' }}>
            Nossas Conexões
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: isDark ? '#f1f5f9' : '#0f172a', marginTop: '10px' }}>
            Empresas que impulsionam a <span style={{ color: '#2563eb' }}>Inovação</span>
          </h2>
        </div>

        <style>
          {`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-${totalWidth / 2}px); }
            }
            #slider-container:hover .moving-slider {
              animation-play-state: paused;
            }
          `}
        </style>

        <div id="slider-container" style={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100px', height: '100%', background: leftGradient, zIndex: 2, pointerEvents: 'none' }}></div>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100%', background: rightGradient, zIndex: 2, pointerEvents: 'none' }}></div>

          <div className="moving-slider" style={sliderStyle}>
            {duplicatedItems.map((parceiro, index) => (
              <div 
                key={index} 
                style={cardWrapperStyle}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#2563eb'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = isDark ? '#334155' : '#f1f5f9'}
              >
                <img 
                  src={parceiro.img} 
                  alt={parceiro.nome} 
                  style={logoImgStyle}
                  loading="lazy"
                  decoding="async"
                />
                <span style={textSpanStyle}>
                  {parceiro.nome}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Parceiros;