import { Sequelize } from "sequelize"

const db = new Sequelize(process.env.mysql_host!,
  process.env.mysql_user!,
  process.env.mysql_pw!,
  {
    dialect: "mysql",
    host: process.env.mysql_db!,
    port: parseInt(process.env.mysql_port!),
    logging: false,
    pool: {
      acquire: 30000,
      idle: 10000,
      max: 5,
      min: 0,
    },
  })

export default db
