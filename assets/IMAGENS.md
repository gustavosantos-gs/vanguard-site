# Imagens a substituir

O redesign usa **placeholders** em vez de fotografias reais. Cada placeholder é um
elemento com a classe `ph` (fundo azul + etiqueta com o tipo de imagem previsto).

## Como substituir um placeholder por uma imagem real

Trocar isto:

```html
<div class="card-service__media ph ph--photo" data-label="Foto — ..."></div>
```

por isto:

```html
<img class="card-service__media" src="assets/img/servico.jpg" alt="Descrição da imagem">
```

Manter a mesma classe do elemento (`card-service__media`, `split__media`,
`sistema__media`, `pagehero` `ph`, `contact__map`, `obra-cliente__media`) para o
enquadramento e o `aspect-ratio` continuarem a funcionar.

## Imagem de fundo do hero

O hero usa `assets/hero-bg.svg` — uma **composição vetorial temática** (câmara CCTV +
luzes desfocadas sobre azul-escuro), definida em `.hero__media` no CSS:

```css
.hero__media{ background:#0A1E4D url("hero-bg.svg") center center / cover no-repeat; opacity:.42; }
```

Para usar uma fotografia real (ex.: câmara CCTV em plano aproximado, centro de
monitorização, ou técnico a instalar um sensor), colocar o ficheiro em
`assets/img/hero.jpg` (largo, ≥1920px, tom escuro) e trocar só o `url()`:
`url("img/hero.jpg")`. O overlay azul (`.hero__overlay`) e a opacidade tratam da
legibilidade — o texto branco mantém contraste WCAG AA (o lado esquerdo do gradiente
fica a ~95% de opacidade sobre `#0A1E4D`). Em mobile a opacidade baixa para 0.3 e o
overlay passa a vertical, para garantir contraste em ecrãs estreitos.

## Lista de imagens (index.html)

| Local | Classe | Proporção sugerida | Conteúdo |
|---|---|---|---|
| Serviços — Anti-Incêndios | `card-service__media` | 16:10 | Detetores de fumo / central de incêndio |
| Serviços — Anti-Furto | `card-service__media` | 16:10 | Sirene exterior / sensor de intrusão |
| Serviços — Central de Intrusão | `card-service__media` | 16:10 | Teclado e central de alarme |
| Serviços — Vídeo Gravadores | `card-service__media` | 16:10 | Câmara CCTV exterior / videogravador |
| Serviços — Vídeo Porteiro | `card-service__media` | 16:10 | Videoporteiro / monitor de entrada |
| Serviços — Controlo de Acessos | `card-service__media` | 16:10 | Leitor de cartão / torniquete |
| Porquê — linha 1 | `split__media` | 4:3 | Equipa técnica e viatura Valguard |
| Porquê — linha 3 | `split__media` | 4:3 | Técnico a testar uma central de alarme |
| Contactos — mapa | `contact__map` | 16:7 | Mapa da localização (ou `<iframe>` do Google Maps) |

> A linha 2 de "Porquê a Valguard" usa os três alvarás em cartões de texto
> (`.badges`), não uma fotografia — pode manter-se assim.

## Lista de imagens (solucoes.html)

| Local | Classe | Proporção | Conteúdo |
|---|---|---|---|
| Cabeçalho da página | `pagehero .ph` | 16:9 | Equipamento de segurança / instalação |
| Sistema 01 — Intrusão | `sistema__media` | 16:10 | Central de intrusão, teclado, detetores |
| Sistema 02 — Incêndio | `sistema__media` | 16:10 | Central de deteção e detetores óticos |
| Sistema 03 — CCTV | `sistema__media` | 16:10 | Câmaras IP e videogravador |
| Sistema 04 — Acessos | `sistema__media` | 16:10 | Leitor de proximidade e videoporteiro |

## Clientes / obras ("Algumas obras relevantes", `#obras`)

Cada cliente é uma `<figure class="obra-cliente">` com:
`.obra-cliente__media` (o placeholder, 4:3) → `<figcaption>` com o nome → e um
`.obra-cliente__overlay` (aparece no hover: overlay azul + ícone + nome do sistema).

Para usar a imagem real, substituir só o `<div class="obra-cliente__media ...">`
por um `<img class="obra-cliente__media" ...>` **e** manter o overlay a seguir
dentro de um wrapper, ou (mais simples) manter o `<div>` e pôr a imagem como
`background-image` inline. Exemplo com wrapper:

```html
<figure class="obra-cliente">
  <div class="obra-cliente__media" style="position:relative">
    <img src="assets/img/obras/sonae.jpg" alt="Instalação SONAE" style="width:100%;height:100%;object-fit:cover;border-radius:var(--r)">
    <span class="obra-cliente__overlay"> … ícone + sistema … </span>
  </div>
  <figcaption>Grupo SONAE</figcaption>
</figure>
```

**Fotografias do local da obra** (o site antigo mostra a instalação real):

| Cliente | Ficheiro sugerido | Conteúdo |
|---|---|---|
| Grupo SONAE | `obras/sonae.jpg` | Fachada / armazém com sinalética SONAE |
| Hospital de S. João (Porto) | `obras/hsj.jpg` | Edifício / jardim do hospital |
| Grupo Amorim | `obras/amorim.jpg` | Instalação industrial / exterior |
| Grupo Pinto Brasil | `obras/pinto-brasil.jpg` | Edifício / armazém Pinto Brasil |
| DataCenter | `obras/datacenter.jpg` | Interior técnico — equipamento (vermelho) de deteção/extinção |
| MIDAS – Oficinas | `obras/midas.jpg` | Fachada / oficina MIDAS |

**Logótipo institucional** (só existe o logo, sem foto de instalação):

| Cliente | Ficheiro sugerido |
|---|---|
| EDP | `clientes/edp.svg` |
| Vodafone | `clientes/vodafone.svg` |
| REN — Redes Energéticas Nacionais | `clientes/ren.svg` |

Obter da Valguard, com autorização de uso dos clientes.
