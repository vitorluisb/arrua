Refatore a estrutura da página de Projetos para incluir um sistema de categorias com subpáginas. Siga estas instruções rigorosamente:

## 1. NOVA ESTRUTURA DE ARQUIVOS

Crie a seguinte arquitetura de pastas e arquivos:

/pages/
├── projects.html (página principal de projetos - índice das categorias)
├── projects/
│ ├── arquitetura.html (migrar o conteúdo atual de projects.html para cá)
│ ├── interiores.html (criar nova)
│ ├── comercial.html (criar nova)
│ └── cidade.html (criar nova)
├── office.html
└── contact.html

## 2. PÁGINA PRINCIPAL: projects.html

Transforme `pages/projects.html` em uma página de navegação/índice com:

- Título: "projetos" (h1, alinhado à esquerda, lowercase)
- Menu de categorias horizontal ou em grid:
  - Links para: arquitetura, interiores, comercial, cidade
  - Estilo: texto simples em lowercase, hover com sublinhado
  - Layout: pode ser 4 colunas em desktop ou lista vertical clean
- Opcional: Breve descrição de cada categoria
- Manter o mesmo padrão de container centralizado: `max-w-[1100px] mx-auto px-6 md:px-16 lg:px-32`

## 3. SUBPÁGINAS DE CATEGORIAS

Cada arquivo dentro de `/pages/projects/` deve ter:

### arquitetura.html:

- Migrar TODO o conteúdo atual de `projects.html` (grid de projetos arquitetônicos)
- Manter o grid de imagens com hover overlay
- Adicionar breadcrumb no topo: "projetos / arquitetura"

### interiores.html, comercial.html, cidade.html:

- Criar com a MESMA estrutura de `arquitetura.html`
- Grid de projetos (usar placeholders diferentes para cada categoria)
- Breadcrumb: "projetos / [nome da categoria]"
- Título da categoria em h1

## 4. NAVEGAÇÃO E LINKS

Atualize TODOS os links de navegação no site:

### No Header (todas as páginas):

- O link "projetos" no menu principal deve apontar para `/pages/projects.html`

### Na página projects.html:

- Links das categorias devem apontar para:
  - `/pages/projects/arquitetura.html`
  - `/pages/projects/interiores.html`
  - `/pages/projects/comercial.html`
  - `/pages/projects/cidade.html`

### Nas subpáginas (arquitetura.html, etc):

- Breadcrumb "projetos" deve linkar de volta para `/pages/projects.html`
- Header deve manter link para `/pages/projects.html`
- Ajustar caminhos relativos para CSS/JS: `../../css/style.css` e `../../js/main.js`

## 5. CONSISTÊNCIA DE LAYOUT

Garanta que TODAS as novas páginas mantenham:

- Container centralizado: `max-w-[1100px] mx-auto px-6 md:px-16 lg:px-32`
- Header e Footer idênticos (com caminhos de link corrigidos)
- Grid de projetos com mesmo estilo (4 colunas desktop, 2 tablet, 1 mobile)
- Hover overlay preto com título em branco
- Animações AOS (fade-up)
- Comentários em PT-BR

## 6. CAMINHOS RELATIVOS (CRÍTICO)

Como as subpáginas estão 2 níveis abaixo da raiz, ajuste:

### Em arquitetura.html, interiores.html, comercial.html, cidade.html:

```html
<!-- CSS -->
<link rel="stylesheet" href="../../css/style.css" />

<!-- JS -->
<script src="../../js/main.js"></script>

<!-- Links do Header -->
<a href="../../index.html">home</a>
<a href="../projects.html">projetos</a>
<a href="../office.html">escritório</a>
<a href="../contact.html">contato</a>
Em projects.html (índice): html Copy
<!-- CSS -->
<link rel="stylesheet" href="../css/style.css" />

<!-- Links das categorias -->
<a href="projects/arquitetura.html">arquitetura</a>
<a href="projects/interiores.html">interiores</a>
<a href="projects/comercial.html">comercial</a>
<a href="projects/cidade.html">cidade</a>
7. CONTEÚDO PLACEHOLDER Para as páginas novas (interiores, comercial, cidade):
Use imagens placeholder diferentes:
https://placehold.co/800x600/EEEEEE/000000?text=Interiores+01 Crie 12-16
projetos por categoria Nomes de projetos fictícios mas realistas (ex:
"Residência Jardins", "Loja Conceito Oscar Freire") 8. VALIDAÇÃO FINAL Teste
que: ✅ Todos os links funcionam (nenhum 404) ✅ CSS e JS carregam corretamente
em todas as páginas ✅ Navegação entre categorias é fluida ✅ Breadcrumbs
funcionam ✅ Layout centralizado está consistente ✅ Menu mobile funciona em
todas as páginas Execute essa refatoração completa agora, gerando todos os
arquivos necessários.
```
