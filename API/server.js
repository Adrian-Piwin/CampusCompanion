const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const usersRoutes = require('./Routes/usersRoutes');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:19006', credentials: true }));

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Use the 'usersRoutes' to handle '/users' and '/register' endpoints
app.use('/', usersRoutes);

// Starting our server.
app.listen(port, () => {
  console.log(`Server is running and listening at http://localhost:${port}`);
});
