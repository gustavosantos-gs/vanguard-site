/* Valguard — interações do site
   Sem dependências. Progressive enhancement: sem JS, tudo fica visível e utilizável. */
(function () {
  'use strict';
  var doc = document;
  var root = doc.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------
     1. Cabeçalho: fundo sólido depois de scroll
     --------------------------------------------------------------- */
  var header = doc.querySelector('.siteheader');
  if (header) {
    var threshold = doc.body.classList.contains('home') ? 60 : 8;
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------------------------------------------------------
     2. Menu mobile (hambúrguer)
     --------------------------------------------------------------- */
  var toggle = doc.querySelector('.nav__toggle');
  var menu = doc.getElementById('navmenu');
  if (toggle && menu && header) {
    var closeMenu = function () {
      header.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      doc.body.classList.remove('no-scroll');
    };
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', String(open));
      doc.body.classList.toggle('no-scroll', open);
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) { closeMenu(); }
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeMenu(); }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1040) { closeMenu(); }
    });
  }

  /* ---------------------------------------------------------------
     3. Revelar secções ao scroll (fade-in / slide-up)
     --------------------------------------------------------------- */
  var revealables = Array.prototype.slice.call(doc.querySelectorAll('[data-reveal]'));

  // escalonar por ordem dentro do mesmo contentor
  revealables.forEach(function (el) {
    var siblings = Array.prototype.slice.call(el.parentNode.children)
      .filter(function (c) { return c.hasAttribute('data-reveal'); });
    var i = siblings.indexOf(el);
    if (i > 0) { el.style.setProperty('--reveal-delay', (Math.min(i, 6) * 70) + 'ms'); }
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------------
     4. Planta interativa (página inicial)
     --------------------------------------------------------------- */
  var pontos = Array.prototype.slice.call(doc.querySelectorAll('.ponto'));
  if (pontos.length) {
    var legCor = doc.getElementById('leg-cor');
    var legNome = doc.getElementById('leg-nome');
    var legDesc = doc.getElementById('leg-desc');
    var selecionar = function (p) {
      pontos.forEach(function (o) { o.setAttribute('aria-pressed', String(o === p)); });
      if (legCor) { legCor.style.background = p.dataset.cor; }
      if (legNome) { legNome.textContent = p.dataset.nome; }
      if (legDesc) { legDesc.textContent = p.dataset.desc; }
    };
    pontos.forEach(function (p) {
      p.addEventListener('click', function () { selecionar(p); });
      p.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selecionar(p); }
      });
    });
  }

  /* ---------------------------------------------------------------
     5. Pedido de orçamento simples (abre o cliente de email)
     --------------------------------------------------------------- */
  var botao = doc.getElementById('enviar');
  if (botao) {
    botao.addEventListener('click', function () {
      var v = function (id) { var el = doc.getElementById(id); return el ? el.value.trim() : ''; };
      var corpo =
        'Nome: ' + v('f-nome') + '\n' +
        'Telefone: ' + v('f-tel') + '\n' +
        'Email: ' + v('f-email') + '\n' +
        'Localidade: ' + v('f-local') + '\n' +
        'Serviço: ' + v('f-servico') + '\n\n' +
        'Descrição do espaço:\n' + v('f-msg') + '\n';
      window.location.href = 'mailto:geral@valguard.pt'
        + '?subject=' + encodeURIComponent('Pedido de orçamento pelo site')
        + '&body=' + encodeURIComponent(corpo);
    });
  }

  /* ---------------------------------------------------------------
     6. Configurador de orçamento (página de soluções)
     --------------------------------------------------------------- */
  var tipo = doc.getElementById('tipo');
  var divs = doc.getElementById('divisoes');
  if (tipo && divs) {
    var lista = doc.getElementById('cfg-lista');
    var resumo = doc.getElementById('cfg-resumo');
    var caixas = {
      intrusao: doc.getElementById('o-intrusao'),
      incendio: doc.getElementById('o-incendio'),
      video: doc.getElementById('o-video'),
      acessos: doc.getElementById('o-acessos'),
      central: doc.getElementById('o-central')
    };
    var COR = { intrusao: '#E9A800', incendio: '#C8102E', video: '#0B5FA5', acessos: '#0F7B4F', geral: '#9AA3AC' };
    var NOMES = {
      apartamento: 'Um apartamento', moradia: 'Uma moradia', loja: 'Uma loja ou restaurante',
      escritorio: 'Um escritório ou clínica', armazem: 'Um armazém ou unidade industrial',
      condominio: 'Um condomínio'
    };
    var EXTERIOR = { apartamento: 0, moradia: 2, loja: 2, escritorio: 1, armazem: 4, condominio: 4 };

    var calcular = function () {
      var n = parseInt(divs.value, 10);
      if (!isFinite(n) || n < 1) { n = 1; }
      var ext = EXTERIOR[tipo.value];
      var itens = [];

      if (caixas.intrusao.checked) {
        itens.push({ c: 'intrusao', n: 'Central de alarme com comunicador GSM e IP', q: '1' });
        itens.push({ c: 'intrusao', n: 'Teclado ou leitor à entrada', q: tipo.value === 'armazem' || tipo.value === 'condominio' ? '2' : '1' });
        itens.push({ c: 'intrusao', n: 'Detetores de movimento', q: Math.max(2, Math.round(n * 0.8)) + '' });
        itens.push({ c: 'intrusao', n: 'Contactos magnéticos em vãos', q: Math.max(2, Math.round(n * 1.2)) + '' });
        itens.push({ c: 'intrusao', n: 'Sirene exterior autoalimentada', q: ext >= 4 ? '2' : '1' });
        if (tipo.value === 'loja') { itens.push({ c: 'intrusao', n: 'Detetor de rotura de vidro na montra', q: '1 a 2' }); }
        if (ext >= 4) { itens.push({ c: 'intrusao', n: 'Barreiras de infravermelhos no perímetro', q: '2 a 4' }); }
      }
      if (caixas.incendio.checked) {
        itens.push({ c: 'incendio', n: n > 12 ? 'Central analógica endereçável' : 'Central convencional por zonas', q: '1' });
        itens.push({ c: 'incendio', n: 'Detetores óticos de fumo', q: Math.max(2, Math.round(n * 1.1)) + '' });
        itens.push({ c: 'incendio', n: 'Detetores termovelocimétricos', q: (tipo.value === 'loja' || tipo.value === 'armazem') ? '2 a 4' : '1 a 2' });
        itens.push({ c: 'incendio', n: 'Botoneiras manuais junto às saídas', q: Math.max(1, ext) + '' });
        itens.push({ c: 'incendio', n: 'Sirenes e sinalizadores óticos', q: Math.max(1, Math.round(n / 4)) + '' });
        itens.push({ c: 'incendio', n: 'Blocos autónomos de emergência', q: Math.max(2, Math.round(n * 0.7)) + '' });
        itens.push({ c: 'incendio', n: 'Projeto e medidas de autoproteção', q: 'conforme edifício' });
      }
      if (caixas.video.checked) {
        itens.push({ c: 'video', n: 'Videogravador em rede com disco', q: '1' });
        itens.push({ c: 'video', n: 'Câmaras exteriores com visão noturna', q: Math.max(2, ext) + '' });
        itens.push({ c: 'video', n: 'Câmaras interiores', q: Math.max(1, Math.round(n / 2)) + '' });
        itens.push({ c: 'video', n: 'Sinalética de videovigilância', q: 'todos os acessos' });
        if (tipo.value === 'armazem' || tipo.value === 'condominio') {
          itens.push({ c: 'video', n: 'Leitura de matrículas na entrada', q: '1' });
        }
      }
      if (caixas.acessos.checked) {
        itens.push({ c: 'acessos', n: tipo.value === 'condominio' ? 'Videoporteiro coletivo' : 'Leitores de proximidade', q: Math.max(1, Math.round(ext / 2) + 1) + '' });
        itens.push({ c: 'acessos', n: 'Fechaduras elétricas ou ventosas', q: Math.max(1, Math.round(ext / 2) + 1) + '' });
        itens.push({ c: 'acessos', n: 'Software de gestão de credenciais', q: '1' });
        if (tipo.value === 'armazem' || tipo.value === 'condominio') {
          itens.push({ c: 'acessos', n: 'Automatismo de portão', q: '1' });
        }
      }
      if (caixas.central.checked) {
        itens.push({ c: 'geral', n: 'Ligação a central recetora 24 horas', q: 'mensal' });
      }

      resumo.textContent = NOMES[tipo.value] + ' com ' + n + (n === 1 ? ' divisão' : ' divisões') + '.';
      lista.innerHTML = '';
      if (itens.length === 0) {
        var vazio = doc.createElement('li');
        vazio.className = 'vazio-cfg';
        vazio.textContent = 'Escolha pelo menos uma coisa que queira resolver.';
        vazio.style.gridTemplateColumns = '1fr';
        lista.appendChild(vazio);
        return;
      }
      itens.forEach(function (it) {
        var li = doc.createElement('li');
        var i = doc.createElement('i');
        i.style.background = COR[it.c];
        var span = doc.createElement('span');
        span.textContent = it.n;
        var b = doc.createElement('b');
        b.textContent = it.q;
        li.appendChild(i); li.appendChild(span); li.appendChild(b);
        lista.appendChild(li);
      });
    };

    [tipo, divs].forEach(function (el) {
      el.addEventListener('input', calcular);
      el.addEventListener('change', calcular);
    });
    Object.keys(caixas).forEach(function (k) { caixas[k].addEventListener('change', calcular); });
    calcular();

    var cfgEnviar = doc.getElementById('cfg-enviar');
    if (cfgEnviar) {
      cfgEnviar.addEventListener('click', function () {
        var linhas = Array.prototype.slice.call(lista.querySelectorAll('li')).map(function (li) {
          var s = li.querySelector('span'), b = li.querySelector('b');
          return s && b ? '- ' + s.textContent + ': ' + b.textContent : '';
        }).filter(Boolean).join('\n');
        var corpo = resumo.textContent + '\n\nPonto de partida gerado no site:\n' + linhas +
          '\n\nO meu contacto:\nNome:\nTelefone:\nLocalidade:\n';
        window.location.href = 'mailto:geral@valguard.pt'
          + '?subject=' + encodeURIComponent('Pedido de orçamento pelo site')
          + '&body=' + encodeURIComponent(corpo);
      });
    }
  }

  /* ---------------------------------------------------------------
     7. Ano no rodapé
     --------------------------------------------------------------- */
  var ano = doc.getElementById('ano');
  if (ano) { ano.textContent = new Date().getFullYear(); }
})();
