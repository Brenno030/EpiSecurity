require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
let db;
let trabalhosCollection;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configurar EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Conectar ao MongoDB Atlas
async function connectToDatabase() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Conectado ao MongoDB Atlas com sucesso!');
    
    db = client.db('epi_seguranca');
    trabalhosCollection = db.collection('trabalhos');
    
    // Inicializar dados se a coleção estiver vazia
    await inicializarDados();
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
}

// Função para inicializar dados de exemplo
async function inicializarDados() {
  const count = await trabalhosCollection.countDocuments();
  
  if (count === 0) {
    console.log('📦 Inicializando dados de EPIs...');
    
    // const dadosIniciais = [
    //   {
    //     tipo: 'Construção Civil',
    //     descricao: 'Trabalhos em obras, alvenaria, construção de edifícios',
    //     epis: [
    //       { nome: 'Capacete de Segurança', descricao: 'Proteção contra impactos na cabeça' },
    //       { nome: 'Óculos de Proteção', descricao: 'Proteção contra poeira e partículas' },
    //       { nome: 'Luvas de Segurança', descricao: 'Proteção das mãos contra cortes e abrasões' },
    //       { nome: 'Botas de Segurança com Biqueira de Aço', descricao: 'Proteção dos pés contra quedas de objetos' },
    //       { nome: 'Colete Refletivo', descricao: 'Visibilidade em ambientes de trabalho' },
    //       { nome: 'Cinto de Segurança', descricao: 'Proteção contra quedas em altura' }
    //     ]
    //   },
    //   {
    //     tipo: 'Soldagem',
    //     descricao: 'Atividades de solda elétrica, oxiacetileno e similares',
    //     epis: [
    //       { nome: 'Máscara de Solda', descricao: 'Proteção facial e ocular contra radiação' },
    //       { nome: 'Luvas de Raspa', descricao: 'Proteção contra calor e respingos de solda' },
    //       { nome: 'Avental de Raspa', descricao: 'Proteção do tronco contra fagulhas' },
    //       { nome: 'Mangote de Raspa', descricao: 'Proteção dos braços' },
    //       { nome: 'Perneira de Raspa', descricao: 'Proteção das pernas' },
    //       { nome: 'Respirador PFF2', descricao: 'Proteção respiratória contra fumos metálicos' },
    //       { nome: 'Botina de Segurança', descricao: 'Proteção dos pés' }
    //     ]
    //   },
    //   {
    //     tipo: 'Trabalho em Altura',
    //     descricao: 'Atividades realizadas acima de 2 metros do nível inferior',
    //     epis: [
    //       { nome: 'Cinto de Segurança Tipo Paraquedista', descricao: 'Proteção contra quedas' },
    //       { nome: 'Trava-quedas', descricao: 'Dispositivo de bloqueio em caso de queda' },
    //       { nome: 'Capacete com Jugular', descricao: 'Proteção da cabeça com fixação' },
    //       { nome: 'Luvas Antiderrapantes', descricao: 'Melhor aderência em superfícies' },
    //       { nome: 'Calçado de Segurança', descricao: 'Proteção e aderência dos pés' },
    //       { nome: 'Mosquetões', descricao: 'Conexão segura entre equipamentos' }
    //     ]
    //   },
    //   {
    //     tipo: 'Laboratório Químico',
    //     descricao: 'Manipulação de produtos químicos e substâncias perigosas',
    //     epis: [
    //       { nome: 'Jaleco', descricao: 'Proteção do corpo contra respingos químicos' },
    //       { nome: 'Óculos de Proteção Química', descricao: 'Proteção ocular contra vapores e respingos' },
    //       { nome: 'Luvas de Nitrila', descricao: 'Proteção das mãos contra produtos químicos' },
    //       { nome: 'Máscara Respiratória com Filtro Químico', descricao: 'Proteção respiratória' },
    //       { nome: 'Sapato Fechado Antiderrapante', descricao: 'Proteção dos pés' },
    //       { nome: 'Avental Impermeável', descricao: 'Proteção adicional contra líquidos' }
    //     ]
    //   },
    //   {
    //     tipo: 'Eletricidade',
    //     descricao: 'Instalação e manutenção de sistemas elétricos',
    //     epis: [
    //       { nome: 'Capacete Classe B (Dielétrico)', descricao: 'Proteção contra choque elétrico' },
    //       { nome: 'Luvas Isolantes de Borracha', descricao: 'Proteção das mãos contra eletricidade' },
    //       { nome: 'Calçado de Segurança Dielétrico', descricao: 'Isolamento elétrico dos pés' },
    //       { nome: 'Óculos de Proteção', descricao: 'Proteção ocular contra arco voltaico' },
    //       { nome: 'Vestimenta Antichama', descricao: 'Proteção contra queimaduras' },
    //       { nome: 'Detector de Tensão', descricao: 'Verificação de presença de energia' }
    //     ]
    //   },
    //   {
    //     tipo: 'Pintura Industrial',
    //     descricao: 'Aplicação de tintas e revestimentos',
    //     epis: [
    //       { nome: 'Máscara Respiratória PFF2 ou com Filtro', descricao: 'Proteção contra vapores de tinta' },
    //       { nome: 'Óculos de Proteção', descricao: 'Proteção contra respingos' },
    //       { nome: 'Luvas de Nitrila', descricao: 'Proteção das mãos contra solventes' },
    //       { nome: 'Macacão ou Avental', descricao: 'Proteção do corpo' },
    //       { nome: 'Calçado de Segurança', descricao: 'Proteção dos pés' },
    //       { nome: 'Touca Descartável', descricao: 'Proteção dos cabelos' }
    //     ]
    //   },
    //   {
    //     tipo: 'Carpintaria',
    //     descricao: 'Trabalhos com madeira e ferramentas de corte',
    //     epis: [
    //       { nome: 'Óculos de Proteção', descricao: 'Proteção contra serragem e fragmentos' },
    //       { nome: 'Protetor Auricular', descricao: 'Proteção contra ruído de máquinas' },
    //       { nome: 'Máscara PFF2', descricao: 'Proteção respiratória contra poeira de madeira' },
    //       { nome: 'Luvas de Vaqueta', descricao: 'Proteção das mãos' },
    //       { nome: 'Avental de Couro', descricao: 'Proteção do tronco' },
    //       { nome: 'Calçado de Segurança', descricao: 'Proteção dos pés' }
    //     ]
    //   },
    //   {
    //     tipo: 'Frigorífico',
    //     descricao: 'Trabalho em câmaras frias e ambientes refrigerados',
    //     epis: [
    //       { nome: 'Roupa Térmica', descricao: 'Proteção contra frio extremo' },
    //       { nome: 'Luvas Térmicas', descricao: 'Proteção das mãos contra frio' },
    //       { nome: 'Botas Térmicas', descricao: 'Proteção dos pés contra frio' },
    //       { nome: 'Touca Térmica', descricao: 'Proteção da cabeça' },
    //       { nome: 'Avental Impermeável', descricao: 'Proteção adicional' },
    //       { nome: 'Óculos de Proteção', descricao: 'Proteção ocular' }
    //     ]
    //   }
    // ];
    
    await trabalhosCollection.insertMany(dadosIniciais);
    console.log('✅ Dados inicializados com sucesso!');
  }
}

// Rotas
app.get('/', async (req, res) => {
  try {
    const trabalhos = await trabalhosCollection.find({}).toArray();
    res.render('index', { 
      trabalhos,
      trabalhoSelecionado: null,
      tipoSelecionado: null
    });
  } catch (error) {
    console.error('Erro ao buscar trabalhos:', error);
    res.status(500).send('Erro ao carregar página');
  }
});

app.post('/buscar-epis', async (req, res) => {
  try {
    const { tipoTrabalho } = req.body;
    
    if (!tipoTrabalho) {
      return res.redirect('/');
    }
    
    const trabalho = await trabalhosCollection.findOne({ tipo: tipoTrabalho });
    const trabalhos = await trabalhosCollection.find({}).toArray();
    
    res.render('index', { 
      trabalhos, 
      trabalhoSelecionado: trabalho,
      tipoSelecionado: tipoTrabalho
    });
  } catch (error) {
    console.error('Erro ao buscar EPIs:', error);
    res.status(500).send('Erro ao buscar EPIs');
  }
});

// Iniciar servidor
async function iniciarServidor() {
  await connectToDatabase();
  
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
}

iniciarServidor();
