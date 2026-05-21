import React, { useState, useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { useTheme } from '../context/ThemeContext';

const Sobre = () => {
  const revealRef = useScrollReveal();
  const { theme } = useTheme();

  const [membros, setMembros] = useState(0);
  const [clientes, setClientes] = useState(0);
  const [satisfacao, setSatisfacao] = useState(0);
  const [modalAberto, setModalAberto] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const animate = (setter, target) => {
      let start = 0;
      const timer = setInterval(() => {
        start += Math.ceil(target / 50);
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(start);
        }
      }, 30);
    };
    animate(setMembros, 8);
    animate(setClientes, 20);
    animate(setSatisfacao, 99);
  }, []);

  const isDark = theme === 'dark';

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
      lineHeight: '1.7',
      marginBottom: '35px',
      textAlign: 'center',
      width: '100%',
    },
    containerNumeros: {
      display: 'flex',
      justifyContent: 'center', 
      borderTop: `1px solid ${isDark ? '#1e293b' : '#f1f5f9'}`,
      paddingTop: '30px',
      marginBottom: '35px',
      gap: '40px',
      flexWrap: 'wrap',
    },
    numeroItem: {
      textAlign: 'center',
      flex: '0 1 auto',
      minWidth: '100px',
    },
    numeroValor: {
      fontSize: 'clamp(1.4rem, 4vw, 2rem)',
      fontWeight: '800',
      color: isDark ? '#60a5fa' : '#3b82f6',
      lineHeight: '1',
      display: 'block',
    },
    numeroLabel: {
      fontSize: '11px',
      fontWeight: '700',
      color: '#94a3b8',
      textTransform: 'uppercase',
      marginTop: '8px',
      display: 'block',
    },
    assinaturaContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', 
      gap: '16px',
      marginTop: '20px',
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
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
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
      <style>
        {`
          @media (max-width: 600px) {
            #sobre-inner {
              flex-direction: column !important;
              gap: 24px !important;
            }
            #sobre-imagem {
              max-width: 100% !important;
            }
            #sobre-imagem img {
              border-radius: 24px !important;
            }
            #sobre-conteudo {
              min-width: unset !important;
            }
            #sobre-texto {
              text-align: center !important;
            }
            /* Garante que subtítulo e título fiquem à esquerda também no mobile */
            #sobre-subtitulo {
              text-align: left !important;
            }
            #sobre-titulo {
              text-align: left !important;
            }
            #sobre-assinatura {
              justify-content: center !important;
            }
          }
        `}
      </style>
      <section ref={revealRef} id="sobre" className="reveal" style={styles.section}>
        <div id="sobre-inner" style={styles.innerContainer}>
          <div id="sobre-imagem" style={styles.containerImagem}>
            <img
              src="/equipe.webp"
              loading="lazy"
              alt="Equipe North Digits"
              style={styles.imagemUnica}
            />
          </div>

          <div id="sobre-conteudo" style={styles.conteudo}>
            <span id="sobre-subtitulo" style={styles.subtitulo}>
              // SOBRE NÓS
            </span>
            <h2 id="sobre-titulo" style={styles.titulo}>
              Transformando{' '}
              <span style={{ color: isDark ? '#60a5fa' : '#3b82f6' }}>
                Ideias
              </span>{' '}
              em Realidade Digitais
            </h2>
            <p id="sobre-texto" style={styles.texto}>
              A North Digits é uma empresa de soluções digitais especializada em transformação
              digital, desenvolvimento de software personalizado e soluções orientadas por dados,
              com foco em inovação e impacto. A empresa nasceu para acelerar a evolução tecnológica
              em Moçambique, entregando produtos digitais integrados que impulsionam eficiência,
              crescimento e resultados sustentáveis.
            </p>

            <div style={styles.containerNumeros}>
              <div style={styles.numeroItem}>
                <span style={styles.numeroValor}>{membros}+</span>
                <span style={styles.numeroLabel}>Membros do Time</span>
              </div>
              <div style={styles.numeroItem}>
                <span style={styles.numeroValor}>{clientes}+</span>
                <span style={styles.numeroLabel}>Clientes Felizes</span>
              </div>
              <div style={styles.numeroItem}>
                <span style={styles.numeroValor}>{satisfacao}%</span>
                <span style={styles.numeroLabel}>Satisfação</span>
              </div>
            </div>

            <div id="sobre-assinatura" style={styles.assinaturaContainer}>
              <img
                src="/ceo.webp"
                loading="lazy"
                alt="Inocêncio Nanlelo - CEO"
                style={{
                  ...styles.fotoCircular,
                  ...(isHover && styles.fotoHover),
                }}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onClick={() => setModalAberto(true)}
              />
              <div style={styles.assinaturaTexto}>
                <span style={styles.nome}>Inocêncio Nanlelo</span>
                <span style={styles.cargo}>NORTH DIGITS • CEO</span>
              </div>
            </div>
          </div>
        </div>

        {modalAberto && (
          <div style={styles.modalOverlay} onClick={() => setModalAberto(false)}>
            <img
              src="/CEO-north.webp"
              loading="lazy"
              alt="Inocêncio Nanlelo - CEO ampliado"
              style={styles.modalImagem}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </section>
    </>
  );
};

export default Sobre;