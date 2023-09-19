const express = require('express');
const sql = require('msnodesqlv8');

const connectionString =
  "server=DESKTOP-3TH8TBL\\SQLEXPRESS;Database=FollowThrough;User ID=admin;Password=FraPre!A;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

const secretKey = "asdhsrhsry452y34yuwfsgasf642r";

const router = express.Router();

module.exports = { sql, connectionString, router, secretKey};
