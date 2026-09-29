import { useState } from 'react';

const servicosLista = [
  {
    titulo: 'Desenvolvimento de Software Personalizado',
    imagem: '/Desenvolvimendo-software.webp',
    descricaoItens: [
      'Sites web responsivos e otimizados',
      'Aplicações mobile (iOS/Android)',
      'Sistemas desktop e back-end robusto',
      'Integração com APIs e serviços',
    ],
  },
  {
    titulo: 'Consultoria e Transformação Digital',
    imagem: '/Consultoria.webp',
    descricaoItens: [
      'Análise estratégica de negócios',
      'Modernização de processos manuais',
      'Implementação de tecnologias emergentes',
      'Plano de transformação digital',
    ],
  },
  {
    titulo: 'Análise de Dados & Business Intelligence',
    imagem: '/Analisedados.webp',
    descricaoItens: [
      'Dashboards interativos e relatórios',
      'Integração de fontes de dados',
      'Indicadores de desempenho (KPIs)',
      'Tomada de decisão baseada em dados',
    ],
  },
  {
    titulo: 'Literacia Digital & Treinamento',
    imagem: '/treinamento.webp',
    descricaoItens: [
      'Formacão e educação digital',
      'Workshops de segurança da informação',
      'Boas práticas para ambiente corporativo',
      'Treinos personalizados por equipa e comunidade',
    ],
  },
  {
    titulo: 'Soluções Agri-Tech MPME',
    imagem: '/Agri-tech.webp',
    descricaoItens: [
      'Gestão de produção e rastreabilidade',
      'Marketplaces para produtos agrícolas',
      'Digitalização de pequenos negócios',
      'Automação de processos no campo',
    ],
  },
];

const scrollToContact = () => {
  const contactSection = document.getElementById('contacto-section');
  if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
};

const FlipCard = ({ titulo, imagem, descricaoItens }) => {
  const [flipped, setFlipped] = useState(false);
  const isTouch = () => typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  const handleButtonClick = (e) => {
    e.stopPropagation();
    scrollToContact();
  };

  return (
    <div
      className="flip-card"
      onMouseEnter={() => { if (!isTouch()) setFlipped(true); }}
      onMouseLeave={() => { if (!isTouch()) setFlipped(false); }}
      onClick={() => { if (isTouch()) setFlipped(prev => !prev); }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setFlipped(!flipped)}
    >
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
        <div className="flip-card-front">
          <img 
            src={imagem} 
            alt={titulo} 
            className="flip-card-image" 
            loading="lazy" 
            decoding="async"
          />
          <div className="flip-card-title">{titulo}</div>
        </div>
        <div className="flip-card-back">
          <h3>{titulo}</h3>
          <ul className="descricao-lista">
            {descricaoItens.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <button className="contact-button" onClick={handleButtonClick}>
            Ver mais
          </button>
        </div>
      </div>
    </div>
  );
};

const Servicos = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedServices = showAll ? servicosLista : servicosLista.slice(0, 3);

  return (
    <section id="servicos" className="servicos reveal">
      <div className="container">
        <div className="servicos-cabecalho">
          <h2 className="servicos-titulo">Nossos Serviços</h2>
          <p className="servicos-subtitulo">Soluções completas para transformar seu negócio.</p>
        </div>
        <div className="grade-servicos">
          {displayedServices.map((servico, idx) => (
            <FlipCard
              key={idx}
              titulo={servico.titulo}
              imagem={servico.imagem}
              descricaoItens={servico.descricaoItens}
            />
          ))}
        </div>
        <div className="ver-mais-container">
          <button onClick={() => setShowAll(!showAll)} className="ver-mais-btn">
            {showAll ? 'Ver menos' : 'Ver mais'}
          </button>
        </div>
      </div>

      <style>{`
        .flip-card {
          background-color: transparent;
          width: 100%;
          height: 260px;
          perspective: 1000px;
          cursor: pointer;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          transform-style: preserve-3d;
          border-radius: 20px;
        }
        .flip-card-inner.flipped {
          transform: rotateY(180deg);
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 20px;
          overflow: hidden;
        }
        .flip-card-front {
          background: #fff;
        }
        .flip-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.9s ease;
        }
        .flip-card-title {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75), transparent);
          color: white;
          font-weight: 700;
          font-size: 1rem;
          padding: 1rem 0.8rem 0.5rem;
          text-align: left;
        }
        .flip-card-back {
          background: #000449;
          color: white;
          transform: rotateY(180deg);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0.85rem;
          text-align: left;
          overflow-y: hidden;
        }
        .flip-card-back h3 {
          display: block;
          font-size: 0.95rem;
          font-weight: 800;
          line-height: 1.3;
          min-height: 2.5rem;
          margin: 0 0 0.5rem 0;
          padding-bottom: 0.4rem;
          border-bottom: 2px solid #ffc30d;
          width: 100%;
          text-align: left;
        }
        .descricao-lista {
          list-style: none;
          padding: 0;
          margin: 0 0 0.5rem 0;
          text-align: left;
          flex: 1;
        }
        .descricao-lista li {
          font-size: 0.72rem;
          line-height: 1.3;
          color: #e2e8f0;
          margin-bottom: 0.45rem;
          padding-left: 1.2rem;
          position: relative;
          text-align: left;
        }
        .descricao-lista li::before {
          content: "✓";
          color: #ffc30d;
          font-weight: bold;
          position: absolute;
          left: 0; top: 0;
          font-size: 0.75rem;
        }
        .contact-button {
          background-color: #020BB2;
          border: none;
          color: white;
          font-weight: 700;
          font-size: 0.75rem;
          padding: 0.6rem 0.8rem;
          border-radius: 40px;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease, background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
          margin-top: auto;
          width: 100%;
          text-align: center;
          letter-spacing: 0.5px;
        }
        .contact-button:hover {
          background-color: #010a8a;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        @media (max-width: 768px) {
          .flip-card { height: 230px; }
          .flip-card-title { font-size: 0.85rem; padding: 0.7rem 0.7rem 0.4rem; }
          .flip-card-back { padding: 0.7rem; }
          .flip-card-back h3 { font-size: 0.85rem; min-height: 2.2rem; margin-bottom: 0.35rem; padding-bottom: 0.25rem; }
          .descricao-lista li { font-size: 0.68rem; margin-bottom: 0.38rem; }
          .contact-button { font-size: 0.68rem; padding: 0.5rem 0.6rem; }
        }
        @media (max-width: 480px) {
          .flip-card { height: 220px; }
          .flip-card-back h3 { font-size: 0.8rem; }
          .descricao-lista li { font-size: 0.65rem; }
        }
      `}</style>
    </section>
  );
};

export default Servicos;