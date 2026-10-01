import React, { useState } from 'react';
import { FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import './Contacto.css';

const MultiStepLoader = ({ steps, loading, onComplete, onClose }) => {
  const [stepStatus, setStepStatus] = useState([]);

  React.useEffect(() => {
    if (!loading) {
      setStepStatus([]);
      return;
    }

    let timeouts = [];

    const runStep = (index) => {
      if (index >= steps.length) {
        if (onComplete) onComplete();
        return;
      }

      setStepStatus(prev => {
        const newStatus = [...prev];
        newStatus[index] = 'loading';
        return newStatus;
      });

      const step = steps[index];
      const duration = step.duration || 2000;

      const timeout = setTimeout(() => {
        setStepStatus(prev => {
          const newStatus = [...prev];
          newStatus[index] = 'done';
          return newStatus;
        });
        if (step.action) step.action();
        runStep(index + 1);
      }, duration);

      timeouts.push(timeout);
    };

    runStep(0);

    return () => timeouts.forEach(clearTimeout);
  }, [loading, steps, onComplete]);

  if (!loading) return null;

  return (
    <div className="loader-overlay-blur" onClick={(e) => e.target === e.currentTarget && onClose && onClose()}>
      <div className="loader-list-container">
        <div className="steps-list">
          {steps.map((step, idx) => (
            <div key={idx} className="step-item">
              <div className="step-indicator">
                {stepStatus[idx] === 'done' ? (
                  <span className="step-icon done">✓</span>
                ) : stepStatus[idx] === 'loading' ? (
                  <div className="spinner"></div>
                ) : (
                  <span className="step-icon pending">○</span>
                )}
              </div>
              <div className="step-text">
                {stepStatus[idx] === 'done' && step.afterText ? step.afterText : step.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .loader-overlay-blur {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }
        .loader-list-container {
          max-width: 400px;
          width: 90%;
          padding: 2rem;
        }
        .steps-list {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .step-item {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 1.1rem;
          font-weight: 500;
          color: #ffffff;
        }
        .step-indicator {
          width: 28px;
          display: flex;
          justify-content: center;
        }
        .step-icon { font-size: 1.3rem; display: inline-block; }
        .step-icon.pending { color: rgba(255,255,255,0.5); }
        .step-icon.done { color: #10b981; font-weight: bold; }
        .spinner {
          width: 20px; height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #ffc30d;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .step-text { flex: 1; letter-spacing: -0.2px; }
        @media (max-width: 500px) {
          .step-item { font-size: 0.95rem; gap: 10px; }
          .step-indicator { width: 24px; }
        }
      `}</style>
    </div>
  );
};

const SOCIAL_LINKS = [
  { label: 'WhatsApp', icon: <FaWhatsapp size={18} />, href: 'https://wa.me/258840000000', color: '#25D366' },
  { label: 'Instagram', icon: <FaInstagram size={18} />, href: 'https://instagram.com/northdigits', color: '#E1306C' },
  { label: 'Facebook', icon: <FaFacebook size={18} />, href: 'https://www.facebook.com/share/18RsuYJ3kL/?mibextid=wwXIfr', color: '#1877F2' },
  { label: 'LinkedIn', icon: <FaLinkedin size={18} />, href: 'https://www.linkedin.com/company/north-holistic-digital-tech-solutions/', color: '#0A66C2' },
];

const Contacto = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState({
    nome: '', email: '', telefone: '', servico: '', mensagem: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

const loaderSteps = [
  { text: "A validar informações", duration: 1500, afterText: "Validação concluída" },
  { text: "A registar pedido", duration: 2000, afterText: "Pedido registado" },
  { text: "A processar dados", duration: 1800, afterText: "Processamento concluído" },
  { text: "A gerar cotação", duration: 1200, afterText: "Cotação gerada" },
  { text: "A finalizar processo", duration: 1000, afterText: "Concluído", action: () => handleLoaderComplete() },
];

  const handleLoaderComplete = () => {
    setIsLoading(false);
    setSubmitted(true);
    setFormData({ nome: '', email: '', telefone: '', servico: '', mensagem: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.email) return;
    setIsLoading(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const focusStyle = (field) => (focusedField === field ? { borderColor: '#3d56c2', background: isDark ? '#334155' : '#fff' } : {});

  const baseInputStyle = {
    border: `1px solid ${isDark ? '#475569' : '#e0e4ef'}`,
    borderRadius: '8px',
    padding: '11px 14px',
    fontSize: '14px',
    color: isDark ? '#f1f5f9' : '#0d1b4b',
    background: isDark ? '#334155' : '#f8f9fc',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'border-color 0.15s, background 0.15s',
  };

  return (
    <>
      <section id="contacto">
        <MultiStepLoader
          steps={loaderSteps}
          loading={isLoading}
          onComplete={handleLoaderComplete}
          onClose={() => setIsLoading(false)}
        />
        <div className="contact-wrapper">
          <div className="info-panel">
            <div className="info-panel-bg" />
            <div className="info-block">
              <p className="info-title">Sede</p>
              <p className="info-text">Maputo, Moçambique<br />Built for Growth</p>
            </div>
            <div className="info-block">
              <p className="info-title">Contacto</p>
              <p className="info-text">Email: info@northdigits.co.mz<br />Web: www.northdigits.co.mz</p>
            </div>
            <div className="info-block">
              <p className="info-title">Foco</p>
              <p className="info-text">Tecnologia Integrada & Soluções Digitais<br />Mercados: Moçambique & África Austral</p>
            </div>
            <div className="info-block">
              <p className="info-title">Redes Sociais</p>
              <div className="social-row" style={{ marginTop: '10px' }}>
                {SOCIAL_LINKS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="social-btn">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="form-panel">
            <p className="eyebrow">// &nbsp; Fale Connosco</p>
            <h2 className="heading">Obtenha o Seu <span className="heading-accent">Orçamento Grátis</span> Hoje!</h2>
            <form onSubmit={handleSubmit}>
              <div className="field-grid">
                <div className="field-group">
                  <label className="field-label">Seu Nome</label>
                  <input
                    type="text" name="nome" value={formData.nome} onChange={handleChange}
                    onFocus={() => setFocusedField('nome')} onBlur={() => setFocusedField(null)}
                    placeholder="Ex: Janucha Erica"
                    style={{ ...baseInputStyle, ...focusStyle('nome') }} required
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">E-mail</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange}
                    onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                    placeholder="exemplo@email.com"
                    style={{ ...baseInputStyle, ...focusStyle('email') }} required
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Telefone</label>
                  <input
                    type="tel" name="telefone" value={formData.telefone} onChange={handleChange}
                    onFocus={() => setFocusedField('telefone')} onBlur={() => setFocusedField(null)}
                    placeholder="Digite o número de telefone"
                    style={{ ...baseInputStyle, ...focusStyle('telefone') }}
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Serviço</label>
                  <select
                    name="servico" value={formData.servico} onChange={handleChange}
                    onFocus={() => setFocusedField('servico')} onBlur={() => setFocusedField(null)}
                    style={{ ...baseInputStyle, ...focusStyle('servico') }}
                  >
                    <option value="">Selecione o serviço</option>
                    <option value="custom_software">Desenvolvimento de Software Personalizado</option>
                    <option value="digital_transformation">Consultoria em Transformação Digital</option>
                    <option value="data_analytics">Análise de Dados & Business Intelligence</option>
                    <option value="digital_literacy">Literacia Digital & Treinamento</option>
                    <option value="agritech">Soluções Agri-Tech & MPME</option>
                  </select>
                </div>
              </div>
              <div className="field-group" style={{ marginBottom: '20px' }}>
                <label className="field-label">Sua Mensagem</label>
                <textarea
                  name="mensagem" value={formData.mensagem} onChange={handleChange}
                  onFocus={() => setFocusedField('mensagem')} onBlur={() => setFocusedField(null)}
                  placeholder="Digite aqui.."
                  style={{
                    ...baseInputStyle,
                    resize: 'vertical',
                    minHeight: '120px',
                    ...(focusedField === 'mensagem' ? { borderColor: '#3d56c2', background: '#fff' } : {})
                  }}
                />
              </div>
              <button type="submit" className="submit-btn">Enviar Mensagem</button>
            </form>
            {submitted && !isLoading && (
              <div className="success-banner">✓ Mensagem enviada com sucesso! Responderemos em breve.</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contacto;