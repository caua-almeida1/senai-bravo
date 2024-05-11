import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import axios from 'axios';
import 'dotenv/config';
import { Server } from 'socket.io';
import http from 'http';
import requireAuth from './middlewares/auth.js';
import User from './models/User.js';
import Message from './models/Message.js';
import { error } from "console";


const app = express()

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const router = express.Router();

router.get('/messages', requireAuth, async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: true, message: 'Failed to fetch messages' });
  }
});

router.post('/messages', requireAuth, async (req, res) => {
    const { sender_id, receiver_id, content } = req.body;
    try {
      const newMessage = await Message.create({ sender_id, receiver_id, content });
      // Emitir a nova mensagem usando Socket.IO para os clientes conectados
      io.emit('new_message', newMessage);
      res.status(201).json(newMessage);
    } catch (error) {
      console.error('Error creating message:', error);
      res.status(500).json({ error: true, message: 'Failed to create message' });
    }
  });

app.use(express.json())

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*")//Qualquer rota pode ter acesso no momento mas quando fizemos deploy iremos especificar as rotas que poderão ter acesso
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")//Definindo metodos de acesso
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-type, Authorization")//Permitindo acesso aos conteudos

    app.use(cors())
    next()
})

// Rota para obter informações do usuário logado
app.get('/user-info', requireAuth, async (req, res) => {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(404).json({ error: true, message: 'Usuário não encontrado' });
      }
      return res.json({ error: false, user });
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
      return res.status(500).json({ error: true, message: 'Erro ao buscar informações do usuário' });
    }
  });


// Função para buscar informações do usuário logado
const fetchUserInfo = async () => {
    try {
        const token = localStorage.getItem('token'); // Assumindo que você armazenou o token JWT localmente
        const response = await axios.get('http://localhost:8081/user-info', {
            headers: {
                Authorization: `Bearer ${token}` // Enviando o token JWT no cabeçalho da requisição
            }
        });
        const userData = response.data.user;
        // Aqui você pode atualizar o estado do componente com as informações do usuário
        console.log('Informações do usuário:', userData);
    } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
    }
};

// Pegando nome e email do usuário que será passado pela tela de login
app.get('/users/:id', async(req, res) => {

    const{id} = req.params
    await User.findOne({where:{id:id}})

    .then((users)=>{
        return res.json({
            error:false,
            users,
        })
    }).catch(()=>{
        return res.json({
            error:false,
            mensagem:"Usuário não cadastrado"
        })
    })
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        const totalUsers = await User.count();
        return res.json({
            error: false,
            totalUsers,
            users
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            error: true,
            message: "Failed to fetch users"
        });
    }
});

// Rota para Cadastro de Usuário
app.post('/users', async (req, res) => {
    const { name, email, password, telefone, cep, estado, cidade, bairro, rua } = req.body;
  
    // Verificar se todos os campos foram fornecidos
    if (!name || !email || !password || !telefone || !cep || !estado || !cidade || !bairro || !rua) {
      return res.status(400).json({ error: true, message: 'Todos os campos são obrigatórios' });
    }
  
    // Processar o cadastro do usuário
    try {
      // Verificar se o email já está cadastrado
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: true, message: 'Este email já está em uso' });
      }
  
      // Criar o novo usuário
      const hashedPassword = await bcrypt.hash(password, 8);
      await User.create({ name, email, password: hashedPassword, telefone, cep, estado, cidade, bairro, rua });
  
      res.status(200).json({
        error: false,
        mensagem: 'Usuário cadastrado com sucesso!',
        newUser: true,
      });
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      res.status(500).json({ error: true, mensagem: 'Erro ao cadastrar usuário' });
    }
  });


// Atualizar dado do usuário
app.put('/users/:id', async (req, res) => {
    const{id} = req.params
    await User.update(req.body,{where:{id:id}})

    .then(()=>{
        return res.json({
            error:false,
            mensagem: "Atualizado com sucesso"
        })
    }).catch(()=>{
        return res.json({
            error:false,
            mensagem:"Não foi atualizado"
        })
    })
})

app.put('/users-senha/:id', async (req, res) => {
    const{id} = req.params
    const{password} = req.params
    var dados = req.body
    dados.password = await bcrypt.hash(dados.password, 8)
    await User.update({password:dados.password},{where:{id:id}})

    .then(()=>{
        return res.json({
            error:false,
            mensagem: "Atualizado com sucesso"
        })
    }).catch(()=>{
        return res.json({
            error:false,
            mensagem:"Não foi atualizado"
        })
    })
})

app.delete('/users/:id', async (req, res) => {

    const{id} = req.params

    await User.destroy({where: {id:id}})
    .then(()=>{
        return res.json({
            error:false,
            mensagem: "Apagado com sucesso"
        })

    }).catch(()=>{
        return res.json({
            error:true,
            mensagem: "Não foi apagado"
        })

    })

})

// Rota para realizar login
app.post('/users-login', async (req, res) => {
  const { email, password } = req.body;

  // Verificar se o email e a senha foram fornecidos
  if (!email || !password) {
    return res.status(400).json({ error: true, message: 'Email e senha são obrigatórios' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    // Verificar se o usuário foi encontrado
    if (!user) {
      return res.status(404).json({ error: true, message: 'Usuário não encontrado' });
    }

    // Verificar a senha
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: true, message: 'Senha incorreta' });
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '7d' });

    res.status(200).json({ error: false, message: 'Login efetuado com sucesso', token });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return res.status(500).json({ error: true, message: 'Erro ao realizar login' });
  }
});

// teste de api
app.get('/test', (req, res) => {
  res.send('API está funcionando corretamente.');
});

// Rota para enviar mensagens
app.post('/send-message', requireAuth, async (req, res) => {
    const { receiver_id, content } = req.body;
    const sender_id = req.userId;
  
    try {
      const newMessage = await Message.create({ sender_id, receiver_id, content });
      io.emit('new_message', newMessage); // Enviar a nova mensagem para todos os clientes conectados
      res.status(201).json(newMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: true, message: 'Failed to send message' });
    }
  });


// Rota para buscar mensagens
app.get('/get-messages/:receiver_id', requireAuth, async (req, res) => {
    const { receiver_id } = req.params;
  
    try {
      const messages = await Message.findAll({
        where: { receiver_id },
        order: [['createdAt', 'ASC']],
      });
      res.json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: true, message: 'Failed to fetch messages' });
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    // Evento para lidar com mensagens recebidas do cliente
    socket.on('chat message', (msg) => {
        console.log('Message from client:', msg);

        // Enviar a mensagem recebida de volta para todos os clientes
        io.emit('chat message', msg);
    });
});

const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}: http://localhost:${PORT}`);
});