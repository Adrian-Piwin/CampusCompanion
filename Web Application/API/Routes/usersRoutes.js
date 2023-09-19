const UserService = require('../services/UserService'); 
const { connectionString, router, secretKey } = require('../dbConfig');
const userService = new UserService(connectionString, secretKey);

router.post('/createUser', async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userService.createUser(email, password);
    res.send(token);
  } catch (error) {
    res.status(500).send('Error creating user: ' + error.message);
  }
});

router.get('/loginUser', async (req, res) => {
  const { email, password } = req.query;

  try {
    const token = await userService.loginUser(email, password);
    res.send(token);
  } catch (error) {
    res.status(404).send('User not found: ' + error.message);
  }
});

router.get('/logOutUser', async (req, res) => {
  const { email } = req.query;

  try {
    await userService.logOutUser(email);
  } catch (error) {
    res.status(404).send('User not found: ' + error.message);
  }
});

router.get('/verifyToken', async (req, res) => {
  const { token } = req.query;

  try {
    const isValid = await userService.verifyToken(token);
    res.send(isValid);
  } catch (error) {
    res.status(404).send('Token not found: ' + error.message);
  }
});

module.exports = router;
