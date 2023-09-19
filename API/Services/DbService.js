const { sql } = require('../dbConfig');

class DbService {
  constructor(connectionString) {
    this.connectionString = connectionString;
  }

  executeQuery(query) {
    return new Promise((resolve, reject) => {
      sql.query(this.connectionString, query, (err, result) => {
        if (err) {
          console.error('Error executing the query:', err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = DbService;
