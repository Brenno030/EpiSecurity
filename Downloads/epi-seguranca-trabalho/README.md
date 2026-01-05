# 🛡️ Sistema de EPIs - Higiene e Segurança do Trabalho

Sistema web desenvolvido com **Node.js**, **Express**, **EJS** e **MongoDB Atlas** para recomendação de Equipamentos de Proteção Individual (EPIs) baseado no tipo de trabalho a ser realizado.

## 📋 Descrição

O sistema permite que o usuário selecione o tipo de trabalho que irá realizar e, com base nessa seleção, exibe uma lista completa e organizada dos EPIs recomendados para aquela atividade específica.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web para Node.js
- **EJS** - Template engine para renderização de páginas
- **MongoDB Atlas** - Banco de dados NoSQL em nuvem
- **CSS3** - Estilização moderna e responsiva

## 📦 Funcionalidades

- ✅ Seleção de tipo de trabalho através de formulário
- ✅ Exibição dinâmica de EPIs recomendados
- ✅ Interface responsiva e intuitiva
- ✅ Dados armazenados em MongoDB Atlas
- ✅ 8 tipos de trabalho pré-cadastrados
- ✅ Animações e transições suaves

## 🎯 Tipos de Trabalho Disponíveis

1. **Construção Civil** - Obras, alvenaria, construção de edifícios
2. **Soldagem** - Solda elétrica, oxiacetileno
3. **Trabalho em Altura** - Atividades acima de 2 metros
4. **Laboratório Químico** - Manipulação de produtos químicos
5. **Eletricidade** - Instalação e manutenção elétrica
6. **Pintura Industrial** - Aplicação de tintas e revestimentos
7. **Carpintaria** - Trabalhos com madeira
8. **Frigorífico** - Trabalho em câmaras frias

## ⚙️ Configuração e Instalação

### Pré-requisitos

- Node.js (versão 14 ou superior)
- Conta no MongoDB Atlas (gratuita)
- npm ou yarn

### Passo 1: Clonar ou baixar o projeto

```bash
cd epi-seguranca-trabalho
```

### Passo 2: Instalar dependências

```bash
npm install
```

### Passo 3: Configurar MongoDB Atlas

1. Acesse [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie uma conta gratuita (se ainda não tiver)
3. Crie um novo cluster (Free Tier M0)
4. Configure o acesso:
   - Em "Database Access", crie um usuário com senha
   - Em "Network Access", adicione seu IP ou libere para todos (0.0.0.0/0)
5. Clique em "Connect" > "Connect your application"
6. Copie a string de conexão

### Passo 4: Configurar variáveis de ambiente

Edite o arquivo `.env` na raiz do projeto:

```env
MONGODB_URI=mongodb+srv://SEU_USUARIO:SUA_SENHA@SEU_CLUSTER.mongodb.net/epi_seguranca?retryWrites=true&w=majority
PORT=3000
```

**Importante:** Substitua `SEU_USUARIO`, `SUA_SENHA` e `SEU_CLUSTER` pelos dados do seu MongoDB Atlas.

### Passo 5: Iniciar o servidor

```bash
npm start
```

O servidor estará rodando em: **http://localhost:3000**

## 📁 Estrutura do Projeto

```
epi-seguranca-trabalho/
│
├── views/
│   └── index.ejs          # Template principal
│
├── public/
│   └── css/
│       └── style.css      # Estilos CSS
│
├── server.js              # Servidor Express e lógica principal
├── package.json           # Dependências do projeto
├── .env                   # Variáveis de ambiente (MongoDB)
└── README.md             # Este arquivo
```

## 🎨 Interface

A interface foi desenvolvida com foco em:

- **Usabilidade**: Navegação intuitiva e clara
- **Responsividade**: Funciona em desktop, tablet e mobile
- **Acessibilidade**: Cores contrastantes e textos legíveis
- **Design Moderno**: Gradientes, sombras e animações suaves

## 💾 Banco de Dados

O sistema utiliza MongoDB Atlas com a seguinte estrutura:

**Coleção: `trabalhos`**

```javascript
{
  tipo: String,           // Nome do tipo de trabalho
  descricao: String,      // Descrição da atividade
  epis: [                 // Array de EPIs
    {
      nome: String,       // Nome do EPI
      descricao: String   // Descrição/finalidade
    }
  ]
}
```

### Inicialização Automática

Na primeira execução, o sistema verifica se o banco está vazio e automaticamente insere os dados iniciais com 8 tipos de trabalho e seus respectivos EPIs.

## 🔒 Segurança

- Variáveis sensíveis armazenadas em `.env`
- Validação de dados no servidor
- Proteção contra injeção de código

## 🐛 Troubleshooting

### Erro de conexão com MongoDB

- Verifique se a string de conexão está correta no `.env`
- Confirme que seu IP está liberado no Network Access
- Verifique usuário e senha do banco de dados

### Porta já em uso

Se a porta 3000 estiver ocupada, altere no arquivo `.env`:

```env
PORT=8080
```

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença ISC.

## 👨‍💻 Desenvolvimento

Desenvolvido como sistema educacional para demonstração de tecnologias web modernas aplicadas à área de Segurança do Trabalho.

---

**Importante:** Este sistema é apenas uma ferramenta de consulta. Sempre consulte um profissional de Segurança do Trabalho qualificado para orientações específicas sobre EPIs adequados para cada situação.
