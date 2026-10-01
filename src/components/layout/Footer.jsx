import { FaFacebook, FaWhatsapp, FaInstagram, FaLinkedin, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import './Footer.css';

const SpinningText = ({ text = 'North Digits · North Digits · North Digits ·' }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: 180,
        height: 180,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        viewBox="0 0 180 180"
        width="180"
        height="180"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          animation: 'spinRing 10s linear infinite',
          transformOrigin: '90px 90px',
        }}
      >
        <defs>
          <path
            id="circlePath"
            d="M 90,90 m -65,0 a 65,65 0 1,1 130,0 a 65,65 0 1,1 -130,0"
          />
        </defs>
        <text fontSize="11.5" fill="#94a3b8" fontFamily="inherit" letterSpacing="2.5">
          <textPath href="#circlePath">{text}</textPath>
        </text>
      </svg>

      <div style={{ textAlign: 'center', zIndex: 1 }}>
        <div
          style={{
            color: '#ffffff',
            fontSize: '1.15rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            lineHeight: 1.2,
          }}
        >
          North
        </div>
        <div
          style={{
            color: '#ffffff',
            fontSize: '1.15rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            lineHeight: 1.2,
          }}
        >
          Digits
        </div>
      </div>

      <style>{`
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const footerBg = '#000449';
  const textColor = isDark ? '#cbd5e1' : '#94a3b8';
  const titleColor = '#ffffff';
  const linkColor = isDark ? '#cbd5e1' : '#94a3b8';
  const linkHoverColor = '#ffffff';

  return (
    <footer className="rodape" style={{ backgroundColor: footerBg }}>
      <div className="rodape-conteudo" style={{ padding: '40px 24px' }}>

        <div className="footer-logo-container">
          <SpinningText text="North Digits · North Digits · North Digits ·" />
          <p
            style={{
              marginTop: '0.4rem',
              lineHeight: '1.4',
              fontSize: '0.85rem',
              color: textColor,
            }}
          >
            Transformação digital ponta-a-ponta, desenvolvimento de software sob medida.
          </p>
        </div>

        <div className="rodape-links">
          <h4
            style={{
              color: titleColor,
              marginBottom: '0.6rem',
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            Navegação
          </h4>
          {['Início', 'Sobre', 'Serviços', 'Contacto'].map((label, i) => {
            const hrefs = ['#home', '#sobre', '#servicos', '#contacto'];
            return (
              <a
                key={label}
                href={hrefs[i]}
                style={{
                  color: linkColor,
                  display: 'block',
                  marginBottom: '0.4rem',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = linkHoverColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
              >
                {label}
              </a>
            );
          })}
        </div>

        <div>
          <h4
            style={{
              color: titleColor,
              marginBottom: '0.6rem',
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            Contacto
          </h4>
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.3rem',
              color: textColor,
              fontSize: '0.85rem',
            }}
          >
            <FaMapMarkerAlt /> Av. Agostinho Neto, 1562 Terraço Malhangalene, Maputo
          </p>
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.3rem',
              color: textColor,
              fontSize: '0.85rem',
            }}
          >
            <FaEnvelope /> info@northdigits.co.mz
          </p>
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.3rem',
              color: textColor,
              fontSize: '0.85rem',
            }}
          >
            <FaPhoneAlt /> +258 84 890 2766
          </p>
          <div
            className="social-icons"
            style={{ display: 'flex', gap: '1rem', marginTop: '0.6rem' }}
          >
            {[
              { href: 'https://wa.me/258840000000', icon: <FaWhatsapp size={18} /> },
              { href: 'https://www.facebook.com/share/18RsuYJ3kL/?mibextid=wwXIfr', icon: <FaFacebook size={18} /> },
              { href: 'https://instagram.com/northdigits', icon: <FaInstagram size={18} /> },
              { href: 'https://www.linkedin.com/company/north-holistic-digital-tech-solutions/', icon: <FaLinkedin size={18} /> },
            ].map(({ href, icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: linkColor, transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = linkHoverColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4
            style={{
              color: titleColor,
              marginBottom: '0.6rem',
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            Onde estamos
          </h4>
          <a
            href="https://www.google.com/maps/place/Av.+Agostinho+Neto+1562+Malhangalene+Maputo+Mo%C3%A7ambique"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              borderRadius: '12px',
              overflow: 'hidden',
              textDecoration: 'none',
            }}
          >
            <img
              src="/Localizacao.webp"
              alt="Localização North Digits"
              style={{ width: '100%', height: 'auto', display: 'block' }}
              loading="lazy"
            />
          </a>
          <p
            style={{
              fontSize: '0.7rem',
              color: textColor,
              marginTop: '0.3rem',
              textAlign: 'center',
            }}
          >
            <a
              href="https://maps.google.com/?q=Av.+Agostinho+Neto+1562+Malhangalene+Maputo"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: linkColor }}
            >
              Ver no Google Maps
            </a>
          </p>
        </div>
      </div>

      <div
        className="rodape-copyright"
        style={{
          textAlign: 'center',
          padding: '0.8rem 0 1.2rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          fontSize: '0.75rem',
          color: isDark ? '#a0aec0' : '#94a3b8',
        }}
      >
        © {new Date().getFullYear()} North Digits. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;