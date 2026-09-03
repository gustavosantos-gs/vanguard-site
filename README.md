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
├── index.html        Página inicial, com planta interativa de uma instalação
├── solucoes.html     Detalhe dos quatro sistemas + configurador de orçamento
├── assets/
│   └── style.css     Folha de estilos partilhada
└── README.md
```

Sem build, sem dependências, sem framework. Abre em qualquer browser.

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
| Telefone | 707 507 060 · escritório 22 763 27 20 |
| Email | geral@valguard.pt |
| Constituição | 20 de abril de 1998 |
| CAE principal | 43210 — instalação elétrica |
| Credenciais | Alvará IMPIC 57396A · Registo ANEPC 959 · Alvará PSP 430 |
| Site atual | valguard.pt e alarmesvalguard.pt |

## Decisões de design

- **Sistema cromático ISO 3864.** As cores não são decorativas: vermelho para incêndio,
  amarelo para aviso e intrusão, azul para videovigilância, verde para condição segura
  e controlo de acessos. É o código que a própria indústria usa, e mantém-se coerente
  entre a planta, os cartões de serviço, o índice e o configurador.
- **Herói: uma planta de instalação interativa**, desenhada em SVG. É o documento que a
  empresa realmente produz para cada cliente. Cada ponto é clicável e explica o que é e
  porque está ali. Sem fotografias de banco de imagens.
- **Credenciais no topo de todas as páginas.** Num setor com muitos vendedores porta-a-porta,
  os três números de licença são o principal argumento de confiança e não devem estar
  escondidos no rodapé.
- **Tipografia:** IBM Plex Sans, com IBM Plex Mono restrito a anotações técnicas
  (nomes de divisões na planta, numeração de etapas, quantidades no configurador).
- **Conversão:** telefone e pedido de orçamento. Os formulários abrem o cliente de email
  com o pedido preenchido — não há backend nem tratamento de dados pessoais.

## Diferenças face ao site atual

O site em `alarmesvalguard.pt` está construído sobre um template das Páginas Amarelas e,
à data desta proposta, mantém conteúdos de exemplo por substituir: morada fictícia
("10 Nome da Rua, Nome da Cidade"), telefone `555-555-5555`, email `myemail@mailservice.com`,
legendas de imagem em inglês e ligações às redes sociais a apontar para as páginas iniciais
do Facebook, Twitter, LinkedIn e Instagram em vez dos perfis da empresa. Vale a pena verificar
isto antes da reunião — é o argumento mais concreto para a proposta.

## Por fazer antes de publicar

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
