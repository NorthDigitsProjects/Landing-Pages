import { useState, useLayoutEffect, useRef, useEffect, useCallback } from 'react';
import { FiPhone, FiMail, FiMapPin, FiHome, FiUsers, FiGrid, FiMail as FiMailIcon } from 'react-icons/fi';
import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

import './Header.css';

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const topbarRef = useRef(null);
  const headerRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  const links = [
    { nome: 'Início', href: '#home' },
    { nome: 'Sobre', href: '#sobre' },
    { nome: 'Serviços', href: '#servicos' },
    { nome: 'Contacto', href: '#contacto' },
  ];

  // Links com ícones apenas para o drawer
  const drawerLinks = [
    { nome: 'Início', href: '#home', icon: <FiHome size={20} /> },
    { nome: 'Sobre', href: '#sobre', icon: <FiUsers size={20} /> },
    { nome: 'Serviços', href: '#servicos', icon: <FiGrid size={20} /> },
    { nome: 'Contacto', href: '#contacto', icon: <FiMailIcon size={20} /> },
  ];

  const fecharMenu = useCallback(() => {
    setMenuAberto(false);
  }, []);

  const fireConfetti = async () => {
    const { default: confetti } = await import('canvas-confetti');
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      startVelocity: 18,
      colors: ['#ffc30d', '#020BB2', '#ffffff', '#00aaff'],
      decay: 0.9,
      ticks: 200,
    });
  };

  const handleCotacaoClick = (e) => {
    e.preventDefault();
    fireConfetti();
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    fecharMenu();
  };

  useLayoutEffect(() => {
    const ajustarPosicoes = () => {
      if (topbarRef.current && headerRef.current) {
        const alturaTopbar = topbarRef.current.offsetHeight;
        const alturaHeader = headerRef.current.offsetHeight;
        headerRef.current.style.top = `${alturaTopbar}px`;
        document.body.style.paddingTop = `${alturaTopbar + alturaHeader}px`;
        document.documentElement.style.scrollPaddingTop = `${alturaTopbar + alturaHeader}px`;
      }
    };
    ajustarPosicoes();
    window.addEventListener('resize', ajustarPosicoes);
    return () => window.removeEventListener('resize', ajustarPosicoes);
  }, []);

  useEffect(() => {
    if (menuAberto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuAberto]);

  useEffect(() => {
    const resetOverflow = () => {
      if (!menuAberto) document.body.style.overflow = '';
    };
    window.addEventListener('resize', resetOverflow);
    return () => window.removeEventListener('resize', resetOverflow);
  }, [menuAberto]);

  return (
    <>
      {/* Topbar (inalterado) */}
      <div className="nd-topbar" ref={topbarRef}>
        <div className="nd-topbar-inner">
          <div className="nd-topbar-info">
            <span><FiPhone size={11} /> +258 84 890 2766</span>
            <span><FiMail size={11} /> geral@northdigits.co.mz</span>
            <span className="nd-topbar-address"><FiMapPin size={11} /> Av. Agostinho Neto, Maputo</span>
          </div>
          <div className="nd-topbar-social">
            <a href="https://wa.me/258841234567" target="_blank" rel="noopener noreferrer"><FaWhatsapp size={13} /></a>
            <a href="https://facebook.com/northdigits" target="_blank" rel="noopener noreferrer"><FaFacebook size={13} /></a>
            <a href="https://instagram.com/northdigits" target="_blank" rel="noopener noreferrer"><FaInstagram size={13} /></a>
            <a href="https://www.linkedin.com/in/northdigitsmoz" target="_blank" rel="noopener noreferrer"><FaLinkedin size={13} /></a>
          </div>
        </div>
      </div>

      {/* Desktop – SEM ALTERAÇÕES (logo com imagem, links sem ícones) */}
      <header className="cabecalho" ref={headerRef}>
        <div className="nd-header-inner">
          <div className="nd-logo">
            <a href="#home">
              <img src="/logo1.webp" alt="North Digits" className="nd-logo-img" />
            </a>
          </div>

          <nav className="nd-nav-desktop">
            {links.map((link) => (
              <a key={link.nome} href={link.href}>
                {link.nome}
              </a>
            ))}
          </nav>

          <div className="nd-cta-desktop">
            <a href="#contacto" className="nd-rainbow-btn" onClick={handleCotacaoClick}>
              Cotação
            </a>
          </div>

          <button
            className={`nd-hamburger ${menuAberto ? 'nd-hamburger--open' : ''}`}
            onClick={() => setMenuAberto((prev) => !prev)}
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuAberto}
          >
            <span className="nd-bar nd-bar--top" />
            <span className="nd-bar nd-bar--mid" />
            <span className="nd-bar nd-bar--bot" />
          </button>
        </div>
      </header>

      {menuAberto && (
        <div className="nd-overlay nd-overlay--visible" onClick={fecharMenu} aria-hidden="true" />
      )}


      <nav className={`nd-drawer ${menuAberto ? 'nd-drawer--open' : ''}`} aria-label="Menu mobile">
        <div className="nd-drawer-header">
     
          <div className="nd-drawer-logo">
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'Black' }}>Menu</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="nd-drawer-close" onClick={fecharMenu} aria-label="Fechar menu">
              ✕
            </button>
          </div>
        </div>

        <div className="nd-drawer-links">
          {drawerLinks.map((link, i) => (
            <a
              key={link.nome}
              href={link.href}
              className="nd-drawer-link"
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={fecharMenu}
            >
              {link.icon}
              <span>{link.nome}</span>
            </a>
          ))}
        </div>

        <div className="nd-drawer-cta">
          <a href="#contacto" className="nd-drawer-btn" onClick={handleCotacaoClick}>
             Cotação
          </a>
        </div>

        <div className="nd-drawer-contact">
          <p><FiPhone size={12} /> +258 84 890 2766</p>
          <p><FiMail size={12} /> geral@northdigits.co.mz</p>
          <p><FiMapPin size={12} /> Av. Agostinho Neto, 1562 Terraço Malhangalene, Maputo</p>
        </div>

        <div className="nd-drawer-socials">
          <a href="https://wa.me/258841234567" target="_blank" rel="noopener noreferrer"><FaWhatsapp size={18} /></a>
          <a href="https://facebook.com/northdigits" target="_blank" rel="noopener noreferrer"><FaFacebook size={18} /></a>
          <a href="https://instagram.com/northdigits" target="_blank" rel="noopener noreferrer"><FaInstagram size={18} /></a>
          <a href="https://www.linkedin.com/in/northdigitsmoz" target="_blank" rel="noopener noreferrer"><FaLinkedin size={18} /></a>
        </div>
      </nav>
    </>
  );
};

export default Header;