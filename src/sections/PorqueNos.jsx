import React, { useState } from 'react';
import { ShieldCheck, Users, Headphones, Settings } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const PorqueNos = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [hoveredCard, setHoveredCard] = useState(null);
  const [cardRotations, setCardRotations] = useState({
    0: { x: 0, y: 0 },
    1: { x: 0, y: 0 },
    2: { x: 0, y: 0 },
    3: { x: 0, y: 0 }
  });

  const handleMouseMove = (index, e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = ((centerY - y) / centerY) * 15;
    setCardRotations(prev => ({ ...prev, [index]: { x: rotateX, y: rotateY } }));
  };

  const handleMouseLeave = (index) => {
    setCardRotations(prev => ({ ...prev, [index]: { x: 0, y: 0 } }));
  };

  const cards = [
    { icon: <Settings size={20} />,    title: 'Soluções Personalizadas', desc: 'Desenvolvimento sob medida para o seu desafio.' },
    { icon: <Users size={20} />,       title: 'Equipa Profissional',      desc: 'Especialistas focados em alta qualidade técnica.' },
    { icon: <ShieldCheck size={20} />, title: 'Segurança',                desc: 'Proteção de dados em cada linha de código.' },
    { icon: <Headphones size={20} />,  title: 'Suporte',                  desc: 'Acompanhamento próximo em todas as fases.' },
  ];

  const sectionBg   = isDark ? '#010a3a' : '#020BBF';
  const cardBg      = isDark ? 'rgba(10,20,40,0.8)' : 'rgba(255,255,255,0.07)';
  const iconBg      = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.12)';
  const cardBorder  = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)';
  const cardPara    = isDark ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.7)';

  return (
    <>
      <style>{`
        #porque-nos {
          background-color: ${sectionBg};
          color: #fff;
          width: 100%;
          overflow: hidden;
          transition: background-color 0.2s ease;
        }
        .pn-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 100px 24px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 40px;
        }
        .pn-image-side {
          flex: 1;
          min-width: 260px;
        }
        .pn-image-side img {
          width: 100%;
          height: auto;
          aspect-ratio: 4/3;
          object-fit: cover;
          border-radius: 30px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.1);
          display: block;
        }
        .pn-content-side {
          flex: 1;
          min-width: 260px;
        }
        .pn-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }
        .pn-title {
          font-size: clamp(1.4rem, 3.5vw, 2rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.5px;
          margin-bottom: 30px;
          color: #fff;
        }
        .pn-title span { color: #ffd502; }
        .pn-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .pn-card {
          padding: 18px;
          border-radius: 20px;
          text-align: left;
          border: 1px solid ${cardBorder};
          background-color: ${cardBg};
          transition: transform 0.2s ease-out;
          cursor: pointer;
        }
        .pn-icon-box {
          width: 38px;
          height: 38px;
          background-color: ${iconBg};
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
          color: #fff;
        }
        .pn-card h4 {
          font-size: 0.9rem;
          font-weight: 700;
          margin-bottom: 4px;
          color: #fff;
        }
        .pn-card p {
          color: ${cardPara};
          font-size: 0.75rem;
          line-height: 1.3;
          margin: 0;
        }

        /* MOBILE: esconde a imagem para não duplicar visualmente com a secção Sobre */
        @media (max-width: 768px) {
          .pn-image-side { display: none; }
          .pn-container {
            padding: 60px 20px;
            flex-direction: column;
            gap: 20px;
          }
          .pn-content-side { min-width: unset; width: 100%; }
        }

        @media (max-width: 400px) {
          .pn-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="porque-nos">
        <div className="pn-container">
          
          <div className="pn-image-side">
            <img 
              src="/equipeIT.webp" 
              alt="Equipa North Digits" 
              loading="lazy" 
              decoding="async"
            />
          </div>

          <div className="pn-content-side">
            <div className="pn-eyebrow">
              <span style={{ fontSize: '1.3rem', fontWeight: 900 }}>//</span>
              <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.75rem', fontWeight: 800 }}>
                Porque nós?
              </span>
            </div>

            <h2 className="pn-title">
              Soluções que unem <span>inovação</span> e resultados reais.
            </h2>

            <div className="pn-grid">
              {cards.map((item, index) => (
                <div
                  key={index}
                  className="pn-card"
                  style={{
                    transform: `perspective(1000px) rotateX(${cardRotations[index].x}deg) rotateY(${cardRotations[index].y}deg)`,
                    boxShadow: hoveredCard === index ? '0 20px 30px -10px rgba(0,0,0,0.3)' : 'none',
                  }}
                  onMouseMove={(e) => handleMouseMove(index, e)}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  <div className="pn-icon-box">{item.icon}</div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default PorqueNos;