Aja como um desenvolvedor Front-end Sênior e construa o site da empresa "Arruar Arquitetura" seguindo RIGOROSAMENTE o layout das imagens de referência (Tempo Arquitetos).

## 🛠️ STACK TECNOLÓGICA

- HTML5 Semântico
- Tailwind CSS (via CDN)
- JavaScript Vanilla (ES6+)
- Biblioteca AOS (Animate On Scroll) para efeitos sutis

## 📐 ARQUITETURA DE ARQUIVOS

- /index.html (Home)
- /pages/projects.html
- /pages/office.html
- /pages/contact.html
- /css/style.css
- /js/main.js

## 🎨 DIRETRIZES DE DESIGN (FIEL ÀS FOTOS)

1. **Minimalismo Extremo:** Fundo #FFFFFF, textos e bordas #000000. Sem sombras, sem arredondamentos (quadrado).
2. **Header (Idêntico à Foto 1):**
   - Logo "arruar" à esquerda em lowercase, fonte sans-serif média.
   - Menu à direita em lowercase: inicio, projetos, escritório, contato.
   - Linha horizontal preta (1px) atravessando toda a largura abaixo do menu.
3. **Grid de Projetos (Idêntico à Foto 4):**
   - Grid sem espaçamento (gap-0) ou gap mínimo (1px).
   - Imagens quadradas/retangulares perfeitas.
   - Hover: Overlay preto suave com nome do projeto em branco.
4. **Footer (Idêntico à Foto 2):**
   - Linha horizontal superior de 1px.
   - 4 colunas: [copyright] [endereço] [email] [ícones sociais instagram/linkedin/whatsapp].
   - Tudo em lowercase e fonte pequena.

## 📄 ESPECIFICAÇÕES POR PÁGINA

### 1. Home (index.html)

- Hero: Uma única imagem grande e limpa, mas fica mudando automaticamnte varis imagens aleatorias dos projetos!(Foto 3).

### 2. Projects (pages/projects.html)

- Título "projetos" discreto.
- Grid completo de imagens ocupando a largura do container, seguindo o padrão de mosaico da Foto 4.

### 3. Office (pages/office.html)

- Layout limpo. Texto à esquerda, imagem à direita (ou vice-versa), respeitando o whitespace das fotos.

### 4. Contact (pages/contact.html)

- Baseado na Foto 2: Informações de contato centralizadas.
- Formulário: Apenas campos com `border-b` (linha inferior), sem box.
- Botão: Quadrado, borda preta, fundo branco, hover inverte para fundo preto.
- Mapa: Embed do Google Maps em tons de cinza (grayscale) abaixo do formulário.
- IMPORTANTE: Não use PHP. Prepare o `<form action="contato.php" method="POST">`.

## ⚡ ANIMAÇÕES E REGRAS

- Use AOS.js para `fade-up` em todos os blocos de conteúdo e imagens.
- Comente o código inteiramente em PT-BR.
- Código limpo, modular e fácil de manter.
- Responsividade: No mobile, o grid deve passar para 1 ou 2 colunas e o menu para um ícone simples.

Gere o código completo de todos os arquivos agora.
