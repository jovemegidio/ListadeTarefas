<div align="center">

# ✅ TaskFlow — Gerenciador de Tarefas

### Uma aplicação moderna de Lista de Tarefas com CRUD completo e persistência via localStorage

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

[🔗 Demo ao Vivo](#) · [📸 Screenshots](#-screenshots) · [🚀 Funcionalidades](#-funcionalidades)

</div>

---

## 📸 Screenshots

<div align="center">

| Tema Claro | Tema Escuro |
|:-:|:-:|
| ![Light Theme](https://via.placeholder.com/400x300/f8f9fc/6c5ce7?text=Light+Theme) | ![Dark Theme](https://via.placeholder.com/400x300/0f0f1a/a29bfe?text=Dark+Theme) |

</div>

> 💡 *Substitua as imagens acima por screenshots reais do projeto!*

---

## 🚀 Funcionalidades

- ✅ **CRUD Completo** — Criar, Ler, Atualizar e Excluir tarefas
- 💾 **Persistência com localStorage** — Seus dados são salvos automaticamente no navegador
- 🌙 **Tema Claro/Escuro** — Alternância de tema com detecção automática do sistema
- 🔍 **Busca em Tempo Real** — Encontre tarefas rapidamente pelo título ou categoria
- 🏷️ **Categorias** — Organize tarefas por: Pessoal, Trabalho, Estudos, Saúde, Finanças
- 🎯 **Níveis de Prioridade** — Baixa, Média e Alta com indicadores visuais
- 📅 **Prazos** — Defina datas limite com alerta de atraso
- 📊 **Dashboard de Progresso** — Estatísticas em tempo real com anel de progresso animado
- 🔔 **Notificações Toast** — Feedback visual para cada ação
- 📱 **Design Responsivo** — Funciona perfeitamente em desktop, tablet e celular
- ⚡ **Animações Suaves** — Transições e micro-interações para melhor UX
- ⌨️ **Atalhos de Teclado** — `Ctrl + /` para busca rápida, `Esc` para fechar modal

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|:--|:--|
| **HTML5** | Estrutura semântica e acessível |
| **CSS3** | Estilização moderna com CSS Variables, Grid, Flexbox e animações |
| **JavaScript (ES6+)** | Lógica da aplicação com Classes, localStorage API, Event Delegation |

### Arquitetura

```
📁 Lista de Tarefas/
├── 📄 index.html          # Estrutura da aplicação
├── 📁 css/
│   └── 🎨 style.css       # Estilos, temas e responsividade
├── 📁 js/
│   └── ⚙️ app.js          # Classe TaskManager com toda a lógica CRUD
└── 📄 README.md           # Documentação do projeto
```

---

## ⚡ Como Executar

1. **Clone o repositório**
   ```bash
   git clone https://github.com/jovemegidio/ListadeTarefas.git
   ```

2. **Abra o projeto**
   ```bash
   cd taskflow
   ```

3. **Execute no navegador**
   - Abra o arquivo `index.html` diretamente no navegador, ou
   - Use a extensão **Live Server** do VS Code para hot-reload

> 📌 **Não requer instalação de dependências** — é 100% vanilla HTML/CSS/JS!

---

## 📖 Como Usar

| Ação | Como Fazer |
|:--|:--|
| **Adicionar tarefa** | Preencha o campo de texto e clique em "Adicionar" |
| **Concluir tarefa** | Clique no checkbox circular à esquerda |
| **Editar tarefa** | Passe o mouse e clique no ícone de edição ✏️ |
| **Excluir tarefa** | Passe o mouse e clique no ícone de lixeira 🗑️ |
| **Filtrar tarefas** | Use os botões "Todas", "Pendentes" ou "Concluídas" |
| **Buscar tarefas** | Digite no campo de busca (ou `Ctrl + /`) |
| **Alternar tema** | Clique no ícone de sol/lua no cabeçalho |
| **Limpar concluídas** | Clique em "Limpar concluídas" no final da lista |

---

## 💡 Conceitos Aplicados

- **Programação Orientada a Objetos (POO)** — Classe `TaskManager` encapsulando toda a lógica
- **Event Delegation** — Um único listener no container para todos os eventos das tarefas
- **Padrão CRUD** — Create, Read, Update, Delete implementados de forma completa
- **localStorage API** — Serialização/Deserialização JSON para persistência de dados
- **CSS Custom Properties** — Sistema de temas dinâmico e manutenível
- **Responsive Design** — Mobile-first com CSS Grid e Flexbox
- **Acessibilidade** — Labels, ARIA attributes e navegação por teclado
- **UX Patterns** — Toast notifications, empty states, animações de feedback

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um **fork** do projeto
2. Criar uma **branch** para sua feature (`git checkout -b feature/nova-feature`)
3. **Commit** suas alterações (`git commit -m 'feat: adiciona nova feature'`)
4. **Push** para a branch (`git push origin feature/nova-feature`)
5. Abrir um **Pull Request**

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

Feito com ❤️ por **[jovemegidio](https://github.com/jovemegidio)**

⭐ Se este projeto te ajudou, deixe uma estrela!

</div>
