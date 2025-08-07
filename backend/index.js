const express = require('express');
require('dotenv').config();
const usuariosRoutes = require('./routes/usuariosRoutes');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); 

app.use('/', usuariosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});