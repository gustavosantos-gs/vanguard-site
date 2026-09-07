# Valguard — site (demonstração)

Proposta de site estático para a **Valguard – Equipamentos Electrónicos e Segurança, Lda.**,
instaladora de sistemas de segurança sediada em Canedo, Santa Maria da Feira.

> **Atenção:** demonstração. Descrições de serviço, números de alvará e referências legais
> foram compiladas a partir de informação pública e **têm de ser validadas pela empresa**
> antes de qualquer publicação. As referências a obrigações legais (manutenção de deteção
> de incêndio, RGPD em videovigilância) devem em particular ser revistas por quem tem
> responsabilidade técnica.

## Estrutura

```
.
├── index.html        Página inicial: hero, estatísticas, serviços, planta interativa,
│                     timeline "Como trabalhamos", obras, "Porquê a Valguard", contactos
├── solucoes.html     Detalhe dos sistemas + configurador de orçamento
├── assets/
│   ├── style.css     Folha de estilos global
│   ├── app.js        Interações: menu mobile, revelar ao scroll, planta, configurador
│   └── IMAGENS.md    Onde estão os placeholders e como trocar por fotografias reais
└── README.md
```

Sem build, sem dependências, sem framework. Abre em qualquer browser.
As animações respeitam `prefers-reduced-motion`; sem JavaScript o site continua legível e navegável.

## Ver localmente

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Informação da empresa

| | |
|---|---|
| Denominação | Valguard – Equipamentos Electrónicos e Segurança, Lda. |
| NIF | 504148109 |
| Morada | Rua Principal, 25, 4525-189 Canedo, Santa Maria da Feira |
| Telefone fixo | +351 227 632 720 (rede fixa nacional) |
| Telemóvel | +351 966 041 265 (rede móvel nacional) |
| Email | geral@valguard.pt |
| Facebook | a confirmar — ícone no cabeçalho e rodapé aponta para facebook.com |
| Constituição | 20 de abril de 1998 |
| CAE principal | 43210 — instalação elétrica |
| Credenciais | Alvará IMPIC 57396A · Registo ANEPC 959 · Alvará PSP 430 |
| Site atual | valguard.pt e alarmesvalguard.pt |

## Layout (redesign)

A página inicial passou de uma estrutura muito textual para um layout visual por secções:

1. **Hero** com imagem de fundo (`assets/hero-bg.svg` — composição vetorial de câmara CCTV +
   luzes desfocadas; substituível por foto real), overlay azul em gradiente (mais escuro à
   esquerda, onde está o texto), título forte e CTA vermelho. Contraste do texto ≥ WCAG AA.
2. **Estatísticas** — cartões com ícone (ano de constituição, anos de atividade, instalações, "4 em 1").
3. **Serviços** — grelha de 6 cartões (Anti-Incêndios, Anti-Furto, Central de Intrusão,
   Vídeo Gravadores, Vídeo Porteiro, Controlo de Acessos), com ícone, imagem e *hover*.
4. **Planta interativa** em SVG (secção escura) — cada ponto explica o equipamento.
5. **Como trabalhamos** — timeline de 4 passos (Diagnóstico → Proposta → Instalação → Manutenção),
   horizontal no desktop, vertical no mobile, com revelação ao scroll.
6. **Algumas obras relevantes** — 3 blocos, cada um com 3 cartões de cliente (foto 4:3 do local da
   obra + nome + *hover* com overlay azul e ícone do sistema) e a lista "Sistemas implementados" por
   baixo. Clientes: SONAE / Hospital de S. João / Amorim · Pinto Brasil / DataCenter / MIDAS ·
   EDP / Vodafone / REN. Fotos reais nos 6 primeiros; logótipo institucional em EDP, Vodafone e REN.
   Recriado a partir de `valguardalarmes.com/algumas-das-nossas-realizacoes`.
7. **Porquê a Valguard** — linhas com imagem/texto alternados (esq./dir.).
8. **Faixa CTA** + **Contactos** (lista + mapa placeholder + formulário) + **rodapé completo**.

`solucoes.html` mantém as tabelas de equipamento e o configurador, com o mesmo cabeçalho/rodapé,
cabeçalho de página com imagem e uma imagem por sistema.

## Decisões de design

- **Cores de marca Valguard.** Azul (`#1E3A8A` / `#1E4B9C`, o "VAL" do logótipo) para títulos,
  navegação e secções de destaque; vermelho (`#E31E24` / `#D62828`, o "GUARD") **com moderação** —
  só em CTAs, ícones e detalhes. Cinza-escuro (`#1A1A1A`) e `#F5F5F5` para secções de contraste.
  Tokens em `:root`: `--blue`, `--blue-700`, `--blue-900`, `--red`, `--red-600`, `--ink`, etc.
- **Sistema cromático ISO 3864** mantido apenas no conteúdo técnico (planta interativa e
  configurador): vermelho = incêndio, amarelo = intrusão, azul = videovigilância, verde = acessos.
- **Imagens:** todas as fotografias são **placeholders** (`.ph`) — ver `assets/IMAGENS.md`.
  Nenhuma secção principal é só texto.
- **Animações discretas:** *fade-in / slide-up* ao scroll (Intersection Observer, sem biblioteca),
  *hover* nos cartões e logótipos, nav com fundo que aparece ao fazer scroll, *pulse* subtil no
  CTA principal. Tudo desligado com `prefers-reduced-motion`.
- **Contactos sempre visíveis:** barra de topo (fixo, telemóvel, email, Facebook) + CTA na nav +
  secção de contactos + rodapé.
- **Tipografia:** IBM Plex Sans; IBM Plex Mono em etiquetas técnicas e numeração.
- **Conversão:** o formulário e o configurador abrem o cliente de email com o pedido preenchido —
  não há backend nem tratamento de dados pessoais.

## Diferenças face ao site atual

O site em `alarmesvalguard.pt` está construído sobre um template das Páginas Amarelas e,
à data desta proposta, mantém conteúdos de exemplo por substituir: morada fictícia
("10 Nome da Rua, Nome da Cidade"), telefone `555-555-5555`, email `myemail@mailservice.com`,
legendas de imagem em inglês e ligações às redes sociais a apontar para as páginas iniciais
do Facebook, Twitter, LinkedIn e Instagram em vez dos perfis da empresa. Vale a pena verificar
isto antes da reunião — é o argumento mais concreto para a proposta.

## Por fazer antes de publicar

- [ ] Confirmar os contactos (fixo 227 632 720, telemóvel 966 041 265) e o URL real do Facebook
- [ ] Obter da Valguard as fotos das obras (SONAE, Hosp. S. João, Amorim, Pinto Brasil, DataCenter,
      MIDAS) e os logótipos (EDP, Vodafone, REN), com autorização de uso dos clientes
- [ ] Confirmar a lista de obras, clientes e sistemas de cada bloco de "Algumas obras relevantes"
- [ ] Substituir os placeholders `.ph` por fotografias reais (ver `assets/IMAGENS.md`)
- [ ] Confirmar o número de instalações executadas (a estatística "+1000" está marcada como indicativa)
- [ ] Validar os números de alvará e a que atividade corresponde cada um
- [ ] Rever com responsável técnico as afirmações sobre obrigações legais
- [ ] Confirmar o serviço de central recetora 24 h e quem o presta
- [ ] Horário de atendimento e cobertura geográfica real
- [ ] Fotografias de instalações e da equipa
- [ ] Backend do formulário, política de privacidade e aviso de cookies
- [ ] Dados estruturados LocalBusiness e ligação ao perfil do Google
- [ ] Decidir a arquitetura de domínios entre valguard.pt e alarmesvalguard.pt

## Licença

Trabalho de proposta. Nome, marca, contactos e credenciais pertencem à empresa.
