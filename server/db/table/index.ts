import mysql from '../_mysql'

import user from './user'
import oauth from './oauth'

const tables = {
  User: user,
  OAuth: oauth
}

tables.User.hasMany(tables.OAuth, {
  foreignKey: 'userId'
})

tables.OAuth.belongsTo(tables.User, {
  foreignKey: 'userId'
})

mysql.sync()

export default tables