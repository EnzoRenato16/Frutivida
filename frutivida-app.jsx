/* global React, ReactDOM */
const { useState, useEffect, useRef } = React;

// ===== Tweakable defaults =====
const TWEAKS = /*EDITMODE-BEGIN*/{
  "heroHeadline": "Caixa fechada. CEAGESP. Direto pra sua loja.",
  "accentRed": "#e11d2e",
  "accentGreen": "#86efac",
  "showVideo": true,
  "videoUrl": "hero-warehouse.mp4",
  "minOrder": "15kg",
  "whatsapp": "5511999990000"
}/*EDITMODE-END*/;

// ===== Icons =====
const ArrowRight = ({ size = 14 }) => (
  <svg className="arrow" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 5l7 7-7 7"/>
  </svg>
);
const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
);
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
);
const PlayIcon = () => (<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>);
const VolumeOff = () => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>);
const VolumeOn = () => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 010 7"/><path d="M19 5a9 9 0 010 14"/></svg>);
const WhatsApp = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
    <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1-.2.2-.3.2-.6.1-1.7-.9-2.9-1.5-4-3.5-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.2-.3-.3-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3C8.7 21.5 10.3 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
  </svg>
);

// ===== Logo =====
const Logo = () => (
  <a className="logo" href="#top" aria-label="Frutivida">
    <span className="logo__mark" aria-hidden="true">
      <svg viewBox="0 0 32 32" width="32" height="32">
        <defs>
          <linearGradient id="lgleaf" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--leaf)"/>
            <stop offset="100%" stopColor="var(--leaf-deep)"/>
          </linearGradient>
        </defs>
        <path d="M16 7c-2-3-5-3-6.5-1.5C7 8 8.5 13 11 14.5c1 .6 2 1 3 1 .5 0 1 0 1.5-.2-1.5-2.5-2-5.5-1-7.3-2 .8-3.4 3-3.5 5.5 0-2.8 1.6-5.5 4-6.5z" fill="#86efac"/>
        <path d="M16 11c-3.3 0-6 2.5-6 5.7 0 4.3 4 8.3 6 8.3s6-4 6-8.3c0-3.2-2.7-5.7-6-5.7z" fill="none" stroke="#e11d2e" strokeWidth="1.6"/>
      </svg>
    </span>
    <span className="logo__txt">FRUTIVIDA<sup>ATACADO · CEAGESP/SP</sup></span>
  </a>
);

// ===== Sticky Nav =====
const Nav = ({ wa }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <Logo/>
        <ul className="nav__links">
          <li><a href="#produtos">Produtos</a></li>
          <li><a href="#maca">Maçã</a></li>
          <li><a href="#para-quem">Para quem vendemos</a></li>
          <li><a href="#armazem">O Armazém</a></li>
          <li><a href="#sobre">Sobre nós</a></li>
          <li><a href="#contato">Cotação</a></li>
        </ul>
        <a className="nav__cta" href={`https://wa.me/${wa}`} target="_blank" rel="noopener">
          <WhatsApp size={14}/> Pedir cotação
        </a>
      </div>
    </nav>
  );
};

// ===== Reveal hook =====
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
};

// ===== Marquee =====
const Marquee = () => {
  const items = ['Caixa fechada 15kg', 'Entrega em SP capital + região', 'CEAGESP / Pavilhão MLP', 'Pedido mínimo simples', 'Maçã premiada · Gala / Fuji', 'Frutas de safra', 'Atendimento por WhatsApp', 'Nota fiscal eletrônica'];
  return (
    <div className="marquee">
      <div className="marquee__track">
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="marquee__item">
            <span className="marquee__dot">●</span> {it}
          </span>
        ))}
      </div>
    </div>
  );
};

// ===== Hero =====
const Hero = ({ tweaks }) => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    if (videoRef.current && tweaks.videoUrl) {
      const v = videoRef.current;
      v.muted = muted;
      v.play().catch(() => {});
    }
  }, [muted, tweaks.videoUrl]);

  return (
    <header className="hero" id="top">
      <div className="hero__media">
        {tweaks.showVideo && tweaks.videoUrl ? (
          <video
            ref={videoRef}
            autoPlay loop muted={muted} playsInline
            onLoadedData={() => setHasVideo(true)}
            onError={() => setHasVideo(false)}
            src={tweaks.videoUrl}
          />
        ) : null}
        {(!tweaks.showVideo || !tweaks.videoUrl || !hasVideo) && (
          <div className="video-fallback ph" aria-hidden="true">
            <div className="hero__video-marker">
              <div className="ph__lbl" style={{ background: 'rgba(10,10,10,0.55)' }}>
                [ vídeo · maçãs em câmera lenta · armazém + box CEAGESP ]
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="hero__scrim"/>
      <div className="hero__noise"/>

      {tweaks.showVideo && tweaks.videoUrl && (
        <button className="mute-toggle" onClick={() => setMuted(m => !m)} aria-label="Som">
          {muted ? <VolumeOff/> : <VolumeOn/>}
        </button>
      )}

      <div className="hero__inner">
        <div className="hero__top">
          <div className="hero__eyebrow reveal">
            <span className="dot"/>
            <span>Atacado · B2B · Pavilhão CEAGESP / SP</span>
          </div>
          <div className="hero__min reveal reveal--delay-1">
            <span className="hero__min-num serif">{tweaks.minOrder}</span>
            <span className="hero__min-lbl">caixa<br/>fechada</span>
          </div>
        </div>

        <h1 className="hero__title reveal reveal--delay-1">
          <span>Caixa fechada.</span><br/>
          <span><em>CEAGESP.</em></span><br/>
          <span>Direto pra <span className="leaf">sua loja</span>.</span>
        </h1>

        <p className="hero__sub reveal reveal--delay-2">
          Distribuímos maçã e frutas selecionadas para <strong>supermercados, varejões,
          sacolões e hortifrúti</strong> em São Paulo. Pedido mínimo: 1 caixa de {tweaks.minOrder}.
          Cotação no WhatsApp. Entrega rápida.
        </p>

        <div className="hero__ctas reveal reveal--delay-3">
          <a className="btn btn--apple btn--big" href={`https://wa.me/${tweaks.whatsapp}?text=Olá,%20gostaria%20de%20uma%20cotação%20Frutivida`} target="_blank" rel="noopener">
            <WhatsApp/> Pedir cotação no WhatsApp <ArrowRight/>
          </a>
          <a className="btn btn--ghost" href="#produtos">
            <PlayIcon/> Ver tabela de produtos
          </a>
        </div>

        <div className="hero__strip reveal reveal--delay-4">
          <div>
            <div className="num">+<em>40</em></div>
            <div className="lbl">Anos de CEAGESP</div>
          </div>
          <div>
            <div className="num">12<span className="leaf">k</span></div>
            <div className="lbl">Caixas / mês</div>
          </div>
          <div>
            <div className="num">300<em>+</em></div>
            <div className="lbl">Lojas atendidas</div>
          </div>
          <div>
            <div className="num">D+<em>1</em></div>
            <div className="lbl">Entrega em SP</div>
          </div>
        </div>
      </div>
    </header>
  );
};

// ===== "Para quem vendemos" =====
const BUYERS = [
  { ic: '🏪', name: 'Supermercados', desc: 'Reposição diária, mix amplo, NF eletrônica e contrato.' },
  { ic: '🛒', name: 'Varejões e sacolões', desc: 'Caixas fechadas no preço de atacado, frota frequente.' },
  { ic: '🥗', name: 'Hortifrúti boutique', desc: 'Produtos premium, calibre selecionado, embalagem especial.' },
  { ic: '🍴', name: 'Food service', desc: 'Restaurantes, hotéis, padarias e pedidos recorrentes.' }
];
const ForWhom = () => (
  <section id="para-quem" className="for-whom">
    <div className="container">
      <div className="reveal">
        <div className="section-tag">Para quem vendemos</div>
        <h2 className="section-title">A gente <em>não</em> vende pro consumidor final.<br/>A gente abastece <span className="leaf">quem vende</span>.</h2>
        <p className="lede">
          Toda a operação foi desenhada para o comprador profissional. Caixa fechada,
          preço de atacado real, regularidade de safra e nota fiscal todos os dias.
        </p>
      </div>
      <div className="buyer-grid">
        {BUYERS.map((b, i) => (
          <div key={b.name} className={`buyer-card reveal reveal--delay-${i+1}`}>
            <div className="buyer-card__ic" aria-hidden>{b.ic}</div>
            <h4>{b.name}</h4>
            <p>{b.desc}</p>
            <div className="buyer-card__cta">
              <span className="mono">cotação direta</span>
              <ArrowRight size={16}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ===== Featured Apple =====
const APPLE_VARIETIES = [
  { id: 'gala', name: 'Gala', origin: 'Sul', sweet: 'Doce aromática', price: 'sob consulta' },
  { id: 'fuji', name: 'Fuji', origin: 'Sul', sweet: 'Crocante', price: 'sob consulta' },
  { id: 'pink', name: 'Pink Lady', origin: 'Argentina', sweet: 'Doce cítrica', price: 'sob consulta' },
  { id: 'red', name: 'Red Delicious', origin: 'Sul', sweet: 'Suave', price: 'sob consulta' },
  { id: 'eva', name: 'Eva', origin: 'Sul', sweet: 'Refrescante', price: 'sob consulta' }
];
const APPLE_IMG = {
  gala: 'maca-cecilia-aberta.jpeg',
  fuji: 'maca-valeria-top.jpeg',
  pink: 'maca-rural.jpeg',
  red:  'maca-volke.jpeg',
  eva:  'maca-cecilia-top.jpeg'
};

const AppleFeature = ({ wa }) => {
  return (
    <section id="maca" className="apple-section">
      <div className="container">
        <div className="apple-feature">
          <div className="apple-stage glass reveal">
            <div className="apple-stage__badge">// carro-chefe · maçã</div>
            <img
              src="maca-cecilia-aberta.jpeg"
              alt="Maçã"
              className="apple-stage__img"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div className="apple-info reveal reveal--delay-1">
            <div className="section-tag">Carro-chefe</div>
            <h3>A maçã que <em>vende sozinha</em><br/>na sua gôndola.</h3>
            <p>
              É o nosso produto. Selecionamos diariamente das principais regiões do
              Sul do Brasil e da Argentina para garantir <strong>brilho, calibre e
              crocância</strong> que o consumidor pega na primeira vez. Maçã que gira.
            </p>

            <a className="btn btn--apple" href={`https://wa.me/${wa}?text=Cota%C3%A7%C3%A3o%20de%20ma%C3%A7%C3%A3`} target="_blank" rel="noopener" style={{ marginTop: 28 }}>
              <WhatsApp/> Cotar maçã agora <ArrowRight/>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ===== Catalog table (price-list style for buyers) =====
// status: todos como 'consult' — confirmação é sempre por WhatsApp
const CATALOG = [
  { code: '01', name: 'Maçã Gala', cat: 'Maçãs', box: '18 kg', cal: '110/120', origin: 'Sul', tag: 'top', status: 'consult' },
  { code: '02', name: 'Maçã Fuji', cat: 'Maçãs', box: '18 kg', cal: '100/110', origin: 'Sul', tag: 'top', status: 'consult' },
  { code: '03', name: 'Maçã Pink Lady', cat: 'Maçãs', box: '12 kg', cal: '120', origin: 'Argentina', tag: 'premium', status: 'consult' },
  { code: '04', name: 'Mamão Papaya', cat: 'Tropicais', box: '6 kg', cal: '12 un', origin: 'Sul', tag: '', status: 'consult' },
  { code: '05', name: 'Manga Palmer', cat: 'Tropicais', box: '4 kg', cal: '8 un', origin: 'Sul', tag: 'safra', status: 'consult' },
  { code: '06', name: 'Uva Itália', cat: 'Cachos', box: '6 kg', cal: '', origin: 'Sul', tag: '', status: 'consult' },
  { code: '07', name: 'Pêra Williams', cat: 'Pêras', box: '15 kg', cal: '90/100', origin: 'Argentina', tag: '', status: 'consult' },
  { code: '08', name: 'Kiwi', cat: 'Importadas', box: '10 kg', cal: '36/39', origin: 'Argentina', tag: '', status: 'consult' },
  { code: '09', name: 'Morango', cat: 'Vermelhas', box: '2,4 kg', cal: 'bandeja', origin: 'Sul', tag: 'safra', status: 'consult' },
  { code: '10', name: 'Abacaxi Pérola', cat: 'Tropicais', box: '8 un', cal: 'tipo 1', origin: 'Sul', tag: '', status: 'consult' },
  { code: '11', name: 'Limão Tahiti', cat: 'Cítricas', box: '20 kg', cal: '', origin: 'Sul', tag: '', status: 'consult' },
  { code: '12', name: 'Laranja Pera', cat: 'Cítricas', box: '20,4 kg', cal: '40,8 kg', origin: 'Sul', tag: '', status: 'consult' }
];

const STATUS_META = {
  consult: { label: 'Sob consulta', short: 'Sob consulta', cls: 'status--consult' }
};

const Catalog = ({ wa }) => {
  const [filter, setFilter] = useState('todos');
  const cats = ['todos', ...new Set(CATALOG.map(x => x.cat))];
  const items = filter === 'todos' ? CATALOG : CATALOG.filter(x => x.cat === filter);

  return (
    <section id="produtos" className="catalog-section">
      <div className="container">
        <div className="catalog-head reveal">
          <div>
            <div className="section-tag">Catálogo de atacado</div>
            <h2 className="section-title">Tabela de <em>produtos</em>.<br/>Tudo em <span className="leaf">caixa fechada</span>.</h2>
          </div>
          <p className="lede" style={{ maxWidth: '40ch' }}>
            Mais de 40 itens em alta rotação no nosso box do CEAGESP. Preço por caixa
            sob consulta. Varia por safra e disponibilidade do dia.
          </p>
        </div>

        {/* Disponibilidade · disclaimer profissional */}
        <div className="availability-note reveal reveal--delay-1" role="note" aria-label="Aviso de disponibilidade">
          <div className="availability-note__icon" aria-hidden>i</div>
          <div className="availability-note__body">
            <div className="availability-note__title">Sobre a disponibilidade dos produtos</div>
            <p>
              Trabalhamos com hortifrúti. Itens podem variar conforme <strong>safra,
              clima, logística de origem e oferta diária do CEAGESP</strong>. Antes de
              fechar pedido, confirmamos por WhatsApp a <strong>disponibilidade,
              calibre e preço do dia</strong>. Quando um item está fora de safra,
              sugerimos substitutos equivalentes para manter o seu mix.
            </p>
          </div>
        </div>

        <div className="catalog-filters reveal reveal--delay-1">
          {cats.map(c => (
            <button key={c} className={`filter-pill ${c === filter ? 'active' : ''}`} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>

        <div className="catalog-table reveal reveal--delay-2">
          <div className="catalog-table__head">
            <div>Cód.</div>
            <div>Produto</div>
            <div>Status</div>
            <div></div>
          </div>
          {items.map(it => {
            const m = STATUS_META[it.status];
            return (
              <div key={it.code} className="catalog-row">
                <div className="mono col-code">// {it.code}</div>
                <div className="col-name">
                  <span className="serif">{it.name}</span>
                  {it.tag === 'top' && <span className="tag tag--apple">★ Top</span>}
                  {it.tag === 'safra' && <span className="tag tag--leaf">Safra</span>}
                  {it.tag === 'premium' && <span className="tag tag--premium">Premium</span>}
                </div>
                <div className="col-status">
                  <span className={`status-pill ${m.cls}`}>
                    <span className="status-pill__dot"/>{m.short}
                  </span>
                </div>
                <div className="col-cta">
                  <a className="row-cta" href={`https://wa.me/${wa}?text=${encodeURIComponent('Cotação ' + it.name)}`} target="_blank" rel="noopener">
                    Consultar <ArrowRight size={12}/>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="availability-foot reveal">
          <span className="mono">*</span> Tabela atualizada diariamente. Disponibilidade e preço confirmados no momento da cotação.
        </div>
      </div>
    </section>
  );
};

// ===== Armazém / Bastidores =====
const Warehouse = () => (
  <section id="armazem" className="warehouse">
    <div className="container">
      <div className="reveal">
        <div className="section-tag">Por dentro do armazém</div>
        <h2 className="section-title">Madrugada no <em>CEAGESP</em>.<br/>A gente está <span className="leaf">lá</span>.</h2>
      </div>

      <div className="war-grid">
        <div className="war-cell war-cell--big reveal">
          <video
            className="war-cell__media"
            src="hero-loading.mp4"
            autoPlay muted loop playsInline preload="metadata"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="war-cell__overlay">
            <div className="mono">// 01</div>
            <h3 className="serif">04:00  ·  Recepção</h3>
            <p>Carretas chegam diretamente do produtor. Inspeção visual de calibre e pintura, lote a lote.</p>
          </div>
        </div>
        <div className="war-cell reveal reveal--delay-1">
          <img className="war-cell__media" src="maca-cecilia-top2.jpeg" alt="Classificação de maçãs"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}/>
          <div className="war-cell__overlay">
            <div className="mono">// 02</div>
            <h3 className="serif">04:30  ·  Classificação</h3>
            <p>Separação por calibre e categoria.</p>
          </div>
        </div>
        <div className="war-cell reveal reveal--delay-2">
          <img className="war-cell__media" src="agrifrut-mix-amplo.jpeg" alt="Box no CEAGESP"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}/>
          <div className="war-cell__overlay">
            <div className="mono">// 03</div>
            <h3 className="serif">05:00  ·  Box aberto</h3>
            <p>Comprador entra, fecha pedido, sai com NF.</p>
          </div>
        </div>
        <div className="war-cell reveal reveal--delay-3">
          <img className="war-cell__media" src="caminhao-cecilia-valeria.jpeg" alt="Caminhão carregado"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}/>
          <div className="war-cell__overlay">
            <div className="mono">// 04</div>
            <h3 className="serif">06:00  ·  Expedição</h3>
            <p>Frota refrigerada sai para a Grande SP.</p>
          </div>
        </div>
        <div className="war-cell war-cell--big reveal reveal--delay-1">
          <video
            className="war-cell__media"
            src="hero-pallets.mp4"
            autoPlay muted loop playsInline preload="metadata"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="war-cell__overlay">
            <div className="mono">// 05</div>
            <h3 className="serif">Movimento diário</h3>
            <p>Carregamento, expedição e atendimento humano. Você fala com gente que conhece a sua loja.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ===== Sobre nós =====
const About = ({ wa }) => (
  <section id="sobre" className="about">
    <div className="container">
      <div className="about-grid">
        <div className="about-lead reveal">
          <div className="section-tag">Sobre nós</div>
          <h2 className="section-title">
            Uma família.<br/>
            Um <em>box</em> no CEAGESP.<br/>
            Quatro <span className="leaf">décadas</span> de fruta.
          </h2>
        </div>

        <div className="about-story reveal reveal--delay-1">
          <p className="about-story__lead">
            A <strong>Frutivida</strong> nasceu dentro do maior entreposto de hortifrúti
            da América Latina. Começamos pequenos, e hoje somos referência em distribuição
            de fruta para o varejo paulista.
          </p>
          <p>
            O que mudou foi o tamanho. O que <em>não</em> mudou foi o jeito: madrugada no box, mão na caixa, atendimento direto com quem compra. Cada cliente fala
            com gente que conhece a operação dele e sabe o que vende na loja dele.
          </p>
          <p>
            Trabalhamos com produtores selecionados das principais regiões frutíferas
            do Sul do Brasil e da Argentina. Tudo passa pela nossa
            classificação antes de chegar na sua doca.
          </p>
        </div>

        <div className="about-facts reveal reveal--delay-2">
          <div className="about-fact">
            <div className="about-fact__num serif">1984</div>
            <div className="about-fact__lbl">Fundada no CEAGESP</div>
          </div>
          <div className="about-fact">
            <div className="about-fact__num serif">3<em>ª</em></div>
            <div className="about-fact__lbl">Geração na operação</div>
          </div>
          <div className="about-fact">
            <div className="about-fact__num serif">300<em>+</em></div>
            <div className="about-fact__lbl">Lojas atendidas / mês</div>
          </div>
          <div className="about-fact">
            <div className="about-fact__num serif">12<span className="leaf">k</span></div>
            <div className="about-fact__lbl">Caixas movimentadas / mês</div>
          </div>
        </div>

        <div className="about-partners reveal reveal--delay-3">
          <div className="about-partners__head">
            <div className="mono">// produtores & parceiros</div>
            <div className="lbl">Marcas que passam pela nossa classifica&ccedil;&atilde;o</div>
          </div>
          <div className="about-partners__strip">
            <figure className="partner-tile">
              <img src="maca-cecilia-fechada.jpeg" alt="Ma&ccedil;&atilde;s Cec&iacute;lia"/>
              <figcaption>Cec&iacute;lia <span>Sul</span></figcaption>
            </figure>
            <figure className="partner-tile">
              <img src="maca-valeria-aberta.jpeg" alt="Ma&ccedil;&atilde;s Val&eacute;ria"/>
              <figcaption>Val&eacute;ria <span>Sul</span></figcaption>
            </figure>
            <figure className="partner-tile">
              <img src="lili-saco-1kg.jpeg" alt="Ma&ccedil;&atilde;s Lili Fischer"/>
              <figcaption>Lili / Fischer <span>Pr&eacute; lavadas · 1kg</span></figcaption>
            </figure>
            <figure className="partner-tile">
              <img src="uva-caj-verde-mao.jpeg" alt="Uvas CAJ"/>
              <figcaption>CAJ <span>Sul</span></figcaption>
            </figure>
            <figure className="partner-tile">
              <img src="pera-mono-azul.jpeg" alt="Peras Mo&ntilde;o Azul"/>
              <figcaption>Mo&ntilde;o Azul <span>Argentina</span></figcaption>
            </figure>
            <figure className="partner-tile">
              <img src="malke-47anos.jpeg" alt="Fruticultura Malke"/>
              <figcaption>Lili <span>caixa</span></figcaption>
            </figure>
            <figure className="partner-tile">
              <img src="maca-volke.jpeg" alt="Ma&ccedil;&atilde;s Volke"/>
              <figcaption>Rinc&atilde;o Fino <span>Sul</span></figcaption>
            </figure>
            <figure className="partner-tile">
              <img src="goiaba-carlopolis.jpeg" alt="Goiabas Carl&oacute;polis"/>
              <figcaption>Carl&oacute;polis <span>Goiaba · Sul</span></figcaption>
            </figure>
          </div>
        </div>

        <div className="about-values reveal reveal--delay-3">
          <div className="about-value">
            <div className="about-value__k mono">// 01</div>
            <h4>Procedência</h4>
            <p>Conhecemos cada produtor pelo nome. Rastreamos cada lote.</p>
          </div>
          <div className="about-value">
            <div className="about-value__k mono">// 02</div>
            <h4>Classificação própria</h4>
            <p>Time treinado classifica calibre e categoria caixa por caixa.</p>
          </div>
          <div className="about-value">
            <div className="about-value__k mono">// 03</div>
            <h4>Palavra que vale</h4>
            <p>Cotação fechada é cotação cumprida. Preço, prazo e qualidade.</p>
          </div>
          <div className="about-value">
            <div className="about-value__k mono">// 04</div>
            <h4>Time enxuto</h4>
            <p>Sem intermediários. Você fala direto com quem decide.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ===== Quote =====
const Quote = () => (
  <section className="quote-section">
    <div className="quote reveal">
      <div className="quote__mark">"</div>
      <p className="quote__text">
        A maçã da Frutivida <em>vende sozinha</em>.<br/>
        É a primeira que o cliente pega na banca.
      </p>
      <div className="quote__author">Comprador · Rede de hortifrúti</div>
    </div>
  </section>
);

// ===== CTA =====
const CTA = ({ wa }) => {
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4500);
    e.target.reset();
  };
  return (
    <section id="contato" className="cta-section">
      <div className="container">
        <div className="cta-block reveal">
          <div className="cta-block__inner">
            <div>
              <div className="section-tag">Cotação rápida</div>
              <h2>Sua loja merece a <em>melhor</em> maçã do CEAGESP.</h2>
              <p>
                Mande seu pedido pelo WhatsApp e a gente responde em minutos com tabela ativa do dia, prazos e condições. Pedido mínimo: 1 caixa fechada.
              </p>

              <a href={`https://wa.me/${wa}?text=Olá%20Frutivida,%20quero%20fazer%20uma%20cotação`} target="_blank" rel="noopener" className="btn btn--whats btn--big" style={{ marginTop: 12 }}>
                <WhatsApp size={18}/> Falar agora no WhatsApp <ArrowRight/>
              </a>

              <div className="cta-info">
                <div>
                  <div className="cta-info__k mono">WhatsApp</div>
                  <div className="cta-info__v serif">(11) 9 9999-0000</div>
                </div>
                <div>
                  <div className="cta-info__k mono">E-mail</div>
                  <div className="cta-info__v serif">vendas@frutivida.com.br</div>
                </div>
                <div>
                  <div className="cta-info__k mono">Box</div>
                  <div className="cta-info__v serif">CEAGESP · MLP</div>
                </div>
              </div>
            </div>

            <form className="cta-form glass" onSubmit={onSubmit}>
              <div className="cta-form__title serif">Ou preencha o formulário</div>
              <input type="text" placeholder="Nome da loja / empresa" required/>
              <div className="row">
                <input type="text" placeholder="Seu nome" required/>
                <input type="tel" placeholder="WhatsApp"/>
              </div>
              <input type="email" placeholder="E-mail"/>
              <select defaultValue="" required>
                <option value="" disabled>Tipo de operação</option>
                <option>Supermercado</option>
                <option>Varejão / Sacolão</option>
                <option>Hortifrúti</option>
                <option>Food service / Restaurante</option>
                <option>Indústria / Beneficiamento</option>
              </select>
              <textarea rows="3" placeholder="Quais frutas e quantas caixas / semana?"></textarea>
              <button type="submit" className="btn btn--apple" style={{ width: '100%', justifyContent: 'center' }}>
                Enviar pedido de cotação <ArrowRight/>
              </button>
              <div className="feedback">
                {sent ? '✓ Recebemos seu pedido. Em breve entraremos em contato.' : ''}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// ===== Footer =====
const Footer = ({ wa }) => (
  <footer>
    <div className="foot">
      <div className="foot__brand">
        <Logo/>
        <p>Distribuidora de frutas no entreposto CEAGESP, São Paulo.<br/>Atacado para supermercados, varejões e hortifrúti.</p>
        <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener" className="foot-whats">
          <WhatsApp size={14}/> (11) 9 9999-0000
        </a>
      </div>
      <div>
        <h5>Catálogo</h5>
        <ul>
          <li><a href="#maca">Maçãs</a></li>
          <li><a href="#produtos">Frutas de safra</a></li>
          <li><a href="#produtos">Importadas</a></li>
          <li><a href="#produtos">Tabela completa</a></li>
        </ul>
      </div>
      <div>
        <h5>Empresa</h5>
        <ul>
          <li><a href="#armazem">O armazém</a></li>
          <li><a href="#para-quem">Quem atendemos</a></li>
          <li><a href="#contato">Cotação</a></li>
          <li><a href="#contato">Atendimento</a></li>
        </ul>
      </div>
      <div>
        <h5>Endereço</h5>
        <ul>
          <li style={{ color: 'var(--ink-dim)' }}>CEAGESP / Pavilhão MLP<br/>Box 000 / SP<br/>04141-000</li>
        </ul>
      </div>
    </div>
    <div className="foot-bottom">
      <span className="mono">© 2026 FRUTIVIDA · CNPJ 00.000.000/0001-00</span>
      <span className="mono">Atacado · CEAGESP / SP</span>
    </div>
  </footer>
);

// ===== Tweaks panel =====
const TweaksUI = ({ tweaks, setTweak }) => (
  <window.TweaksPanel title="Tweaks">
    <window.TweakSection label="Hero"/>
    <window.TweakText label="Manchete" value={tweaks.heroHeadline} onChange={(v)=>setTweak('heroHeadline', v)}/>
    <window.TweakToggle label="Vídeo de fundo" value={tweaks.showVideo} onChange={(v)=>setTweak('showVideo', v)}/>
    <window.TweakText label="URL .mp4" value={tweaks.videoUrl} placeholder="https://..." onChange={(v)=>setTweak('videoUrl', v)}/>
    <window.TweakSection label="Operação"/>
    <window.TweakText label="Pedido mínimo" value={tweaks.minOrder} onChange={(v)=>setTweak('minOrder', v)}/>
    <window.TweakText label="WhatsApp (DDI+DDD)" value={tweaks.whatsapp} onChange={(v)=>setTweak('whatsapp', v)}/>
    <window.TweakSection label="Cores"/>
    <window.TweakColor label="Vermelho maçã" value={tweaks.accentRed} onChange={(v)=>setTweak('accentRed', v)}/>
    <window.TweakColor label="Verde folha" value={tweaks.accentGreen} onChange={(v)=>setTweak('accentGreen', v)}/>
  </window.TweaksPanel>
);

// ===== App =====
const App = () => {
  const [tweaks, setTweak] = window.useTweaks(TWEAKS);
  useReveal();

  useEffect(() => {
    document.documentElement.style.setProperty('--apple', tweaks.accentRed);
    document.documentElement.style.setProperty('--leaf', tweaks.accentGreen);
  }, [tweaks.accentRed, tweaks.accentGreen]);

  useEffect(() => {
    const el = document.getElementById('scrollProgress');
    const onScroll = () => {
      const h = document.documentElement;
      const p = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
      if (el) el.style.width = `${Math.min(1, Math.max(0, p)) * 100}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Floating WhatsApp
  return (
    <>
      <Nav wa={tweaks.whatsapp}/>
      <Hero tweaks={tweaks}/>
      <Marquee/>
      <ForWhom/>
      <AppleFeature wa={tweaks.whatsapp}/>
      <Catalog wa={tweaks.whatsapp}/>
      <Warehouse/>
      <About wa={tweaks.whatsapp}/>
      <Quote/>
      <CTA wa={tweaks.whatsapp}/>
      <Footer wa={tweaks.whatsapp}/>

      <a className="float-whats" href={`https://wa.me/${tweaks.whatsapp}?text=Olá%20Frutivida,%20quero%20cotação`} target="_blank" rel="noopener" aria-label="WhatsApp">
        <WhatsApp size={26}/>
        <span>Cotar agora</span>
      </a>

      <TweaksUI tweaks={tweaks} setTweak={setTweak}/>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
