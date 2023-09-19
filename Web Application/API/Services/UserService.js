const DbService = require('./DbService'); 
const jwt = require('jsonwebtoken');

class UserService extends DbService {
  constructor(connectionString, secretKey) {
    super(connectionString);
    this.secretKey = secretKey;
  }

  // Create user then return token for the user
  async createUser(email, password) {
    try {
      await this.executeQuery(`INSERT INTO dbo.Users (Email, Password) VALUES ('${email}', '${password}')`);
      const user = await this.executeQuery(`SELECT TOP 1 * FROM dbo.Users WHERE email = '${email}'`);
      return await this.generateToken(user[0]);
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  // Check if user exists, then return token
  async loginUser(email, password) {
    try {
      const user = await this.executeQuery(`SELECT TOP 1 * FROM dbo.Users WHERE email = '${email}' AND password = '${password}'`);
      if (user.length === 0) {
        throw new Error('User not found');
      }
      return await this.generateToken(user[0]);
    } catch (error) {
      throw new Error('Error logging in user: ' + error.message);
    }
  }

  async verifyToken(token) {
    try {
      const tokenData = await this.executeQuery(`SELECT TOP 1 * FROM dbo.UserTokens WHERE token = '${token}'`);
      if (tokenData.length === 0) {
        return false;
      }
      return true;
    } catch (error) {
      throw new Error('Error verifying token: ' + error.message);
    }
  }

  async generateToken(user) {
    try {
      const payload = {
        userID: user.ID,
        email: user.Email,
        issuedAt: Math.floor(Date.now() / 1000),
      };

      var token = jwt.sign(payload, this.secretKey, { expiresIn: "5h" });
      await this.executeQuery(`INSERT INTO dbo.UserTokens (userID, token) VALUES ('${user.ID}', '${token}')`);
      return token;
    } catch (error) {
      throw new Error('Error generating token: ' + error.message);
    }
  }

  async deleteToken(user) {
    try {
      await this.executeQuery(`DELETE FROM dbo.UserTokens WHERE userID = '${user.ID}'`);
    } catch (error) {
      throw new Error('Error deleting token: ' + error.message);
    }
  }
}

module.exports = UserService;
