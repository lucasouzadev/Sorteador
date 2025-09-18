# 🎲 Sorteador de Números - Projeto Grunt

Um sorteador de números interativo e moderno, desenvolvido com HTML, LESS e JavaScript, utilizando Grunt como sistema de build.

## 🚀 Funcionalidades

- **Sortear números únicos** em um intervalo personalizado
- **Interface responsiva** e moderna
- **Histórico de sorteios** com timestamp
- **Validação em tempo real** dos inputs
- **Animações suaves** e feedback visual
- **Atalhos de teclado** (Enter para sortear, Escape para limpar)
- **Compilação automática** de LESS para CSS
- **Minificação** de JavaScript e CSS

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **LESS** - Pré-processador CSS com variáveis e mixins
- **JavaScript ES6+** - Lógica da aplicação com classes
- **Grunt** - Sistema de build e automação
- **CSS Grid & Flexbox** - Layout responsivo
- **CSS Animations** - Transições suaves

## 📁 Estrutura do Projeto

```
sorteador-grunt/
├── less/
│   └── estilo.less          # Estilos LESS com variáveis e mixins
├── js/
│   └── script.js           # JavaScript da aplicação
├── css/                    # CSS compilado (gerado pelo Grunt)
├── dist/                   # Arquivos de produção (gerado pelo Grunt)
├── index.html              # Página principal
├── Gruntfile.js            # Configuração do Grunt
├── package.json            # Dependências e scripts
└── README.md               # Este arquivo
```

## 🚀 Instalação e Uso

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (vem com Node.js)

### Instalação

1. **Clone ou baixe o projeto**
2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Instale o Grunt CLI globalmente (se ainda não tiver):**
   ```bash
   npm install -g grunt-cli
   ```

### Comandos Disponíveis

```bash
# Build completo (LESS + JS minificado)
grunt

# Modo desenvolvimento com watch e servidor local
grunt dev

# Build para produção
grunt build

# Compilação rápida (sem minificação)
grunt compile

# Minificação completa
grunt minify

# Build + cópia para pasta dist/
grunt deploy
```

### Modos de Uso

**Desenvolvimento:**
- Use `grunt dev` para iniciar o servidor de desenvolvimento
- Acesse `http://localhost:8080` no navegador
- O arquivo `index.html` usa `css/estilo.css` (não minificado)
- Live reload ativo para mudanças em tempo real

**Produção:**
- Use `grunt build` para gerar arquivos otimizados
- Acesse a pasta `dist/` para arquivos de produção
- O arquivo `dist/index.html` usa `css/estilo.min.css` (minificado)
- Todos os arquivos são otimizados e minificados

# Exibir informações dos comandos
grunt info
```

## 🎯 Como Usar o Sorteador

1. **Defina o intervalo:** Configure os números mínimo e máximo
2. **Escolha a quantidade:** Quantos números únicos deseja sortear
3. **Clique em "Sortear"** ou pressione **Enter**
4. **Visualize o resultado** com animação
5. **Acompanhe o histórico** de todos os sorteios

### Atalhos de Teclado

- **Enter** - Realizar sorteio
- **Escape** - Limpar resultados e histórico

## 🔧 Configuração do Grunt

O `Gruntfile.js` está configurado para:

### Compilação LESS
- **Desenvolvimento:** CSS não comprimido com source maps
- **Produção:** CSS comprimido e otimizado

### Minificação JavaScript
- **UglifyJS** com compressão e mangle
- **Source maps** para debug
- **Banner** com informações do projeto

### Watch Mode
- **Monitoramento automático** de mudanças em arquivos LESS e JS
- **Live reload** no navegador
- **Servidor local** na porta 8080

## 📱 Responsividade

O projeto é totalmente responsivo e funciona em:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (até 767px)

## 🎨 Personalização

### Variáveis LESS
Edite o arquivo `less/estilo.less` para personalizar:
- Cores do tema
- Bordas e sombras
- Tipografia
- Espaçamentos

### Funcionalidades JavaScript
Modifique `js/script.js` para adicionar:
- Novas validações
- Animações customizadas
- Integrações com APIs
- Funcionalidades extras

## 📦 Build de Produção

Para gerar os arquivos otimizados:

```bash
grunt build
```

Isso criará:
- `css/estilo.min.css` - CSS compilado e minificado
- `js/script.min.js` - JavaScript minificado
- `dist/` - Pasta com arquivos prontos para deploy

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- Inspirado no projeto original do [sorteador](https://sorteador-ooradbgld-lucasouzadevs-projects.vercel.app)
- Comunidade Grunt pela excelente documentação
- Todos os contribuidores e usuários

---

**Desenvolvido com ❤️ usando Grunt**
