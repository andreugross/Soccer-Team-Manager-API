// src/app.js
const express = require('express');

// array contendo as informações - pode ser criado em outro arquivo e depois importado para cá
const teams = [
  {
    id: 1,
    name: 'São Paulo Futebol Clube',
    initials: 'SPF',
  },
  {
    id: 2,
    name: 'Clube Atlético Mineiro',
    initials: 'CAM',
  },
];

// atribuindo o express a constante app
const app = express();
// essa função nos possibilita usar o método post e acrescentar infos na nossa API através do body no formato Json
app.use(express.json());

// atribuir os valores a constantes torna o código mais limpo e facil de entender
const SUCESS = 200;
const CREATED = 201;
const NOT_FOUND = 404;

// MÉTODOS GET (PESQUISA)

// criação do endpoint do tipo get, com a rota /, com status ok
app.get('/', (req, res) => res.status(SUCESS).json({ message: 'Olá Mundo!' }));

// criação do endpoint do tipo get, com a rota /teams, com status ok
app.get('/teams', (req, res) => res.status(SUCESS).json({ teams }));

// criei esse get para fazer pesquisas de times por id
app.get('/teams/:id', (req, res) => {
  // id vem por parametro e o name e initials vem como info pelo corpo
  const { id } = req.params;

  // função que localiza se o id existe no objeto atribuida a constante updateTeam
  const showteam = teams.find((team) => team.id === Number(id));

  if (!showteam) {
    res.status(NOT_FOUND).json({ message: 'Team not found' });
  }

  res.status(SUCESS).json({ showteam });
});

// MÉTODO POST (ADICIONA)

// utilizaçao do endpoint do tipo post(adiciona info), com a rota /teams, com status created
// IMPORTANTE: é possível usar a mesma rota com tipos diferentes mas nunca iguais
app.post('/teams', (req, res) => {
  const newTeam = { ...req.body };
  teams.push(newTeam);

  res.status(CREATED).json({ team: newTeam });
});

// MÉTODO PUT (ATUALIZA)

// utilização do endpoint do tipo put(atualiza info), com a rota /teams/:id, com status 404 caso não ache e 200 caso sucesso
app.put('/teams/:id', (req, res) => {
  // id vem por parametro e o name e initials vem como info pelo corpo
  const { id } = req.params;
  const { name, initials } = req.body;

  // função que localiza se o id existe no objeto atribuida a constante updateTeam
  const updateTeam = teams.find((team) => team.id === Number(id));

  if (!updateTeam) {
    res.status(NOT_FOUND).json({ message: 'Team not found' });
  }

  updateTeam.name = name;
  updateTeam.initials = initials;
  res.status(SUCESS).json({ updateTeam });
});

// MÉTODO DELETE (DELETA)

app.delete('/teams/:id', (req, res) => {
  const { id } = req.params;
  const arrayPosition = teams.findIndex((team) => team.id === Number(id));
  teams.splice(arrayPosition, 1);

  res.status(SUCESS).end();
});

module.exports = app;