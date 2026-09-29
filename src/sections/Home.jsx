import { useEffect, useState, useRef } from 'react';

const SLOGAN = '// Feito para o seu crescimento!';

const TypewriterBadge = () => {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= SLOGAN.length) return;
    const t = setTimeout(() => {
      setDisplayed(p => p + SLOGAN[index]);
      setIndex(p => p + 1);
    }, 45);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <p className="hero-badge">
      {displayed}
      {index < SLOGAN.length && <span className="hero-cursor">|</span>}
    </p>
  );
};


const SubtleParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COLORS = [
      [79, 172, 254],
      [99, 220, 255],
      [255, 255, 255],
      [37, 99, 235],
      [167, 220, 255],
    ];

    const dots = Array.from({ length: window.innerWidth < 768 ? 25 : 55 }, () => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        r:     Math.random() * 2.2 + 0.8,
        dx:    (Math.random() - 0.5) * 0.5,
        dy:    (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.55 + 0.2,
        color,
      };
    });

    let running = false;
    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx   = dots[i].x - dots[j].x;
          const dy   = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const avg = dots[i].color.map((c, k) => Math.round((c + dots[j].color[k]) / 2));
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(${avg[0]},${avg[1]},${avg[2]},${0.2 * (1 - dist / 180)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${d.color[0]},${d.color[1]},${d.color[2]},${d.alpha})`;
        ctx.fill();
        d.x += d.dx;
        d.y += d.dy;
        if (d.x < 0 || d.x > canvas.width)  d.dx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.dy *= -1;
      });

      raf = requestAnimationFrame(draw);
    };

    let inView = true;
    const update = () => {
      const should = inView && !document.hidden;
      if (should && !running) {
        running = true;
        raf = requestAnimationFrame(draw);
      } else if (!should && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; update(); });
    io.observe(canvas);
    document.addEventListener('visibilitychange', update);
    update();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener('visibilitychange', update);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 1,
      }}
    />
  );
};


const WORDS = ['escalabilidade', 'crescimento', 'inovação', 'impacto'];

const FlipWords = () => {
  const [idx, setIdx]         = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(p => (p + 1) % WORDS.length);
        setVisible(true);
      }, 400);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <span style={{
      color: '#4facfe',
      display: 'inline-block',
      opacity:   visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(10px)',
      transition: 'opacity 0.4s ease, transform 0.4s ease',
      minWidth: '260px',
    }}>
      {WORDS[idx]}
    </span>
  );
};

const AnimatedTitle = () => (
  <h1 className="hero-titulo">
    Tecnologia desenvolvida
    <br />
    para <FlipWords />
  </h1>
);


const AnimatedButtons = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="botoes-hero" style={{
      opacity:   show ? 1 : 0,
      transform: show ? 'translateY(0)' : 'translateY(16px)',
      transition: 'opacity 0.6s ease, transform 0.6s ease',
    }}>
      <a href="#servicos" className="botao-primario">Explorar Mais </a>
      <a href="#servicos" className="botao-secundario">Ver Serviços</a>
    </div>
  );
};

const Hero = () => {
  return (
    <section id="home" className="hero">
      <SubtleParticles />
      <div className="hero-conteudo">
        <TypewriterBadge />
        <AnimatedTitle />
        <p className="hero-descricao">
          Criamos Soluções Digitais para impulsionar o crescimento do seu negócio,
          fortalecer a sua presença online e transformar ideias em resultados reais.
        </p>
        <AnimatedButtons />
      </div>
      <style>{`
        .hero-cursor {
          display: inline-block;
          animation: blink 0.7s step-end infinite;
          color: #ffc30d;
          margin-left: 1px;
        }
        @keyframes blink {
          0%,100%{opacity:1} 50%{opacity:0}
        }
      `}</style>
    </section>
  );
};

export default Hero;