import mysql from '../_mysql'

import user from './user'
import oauth from './oauth'

const tables = {
  User: user,
  OAuth: oauth
}

tables.User.hasMany(tables.OAuth, {
  foreignKey: 'user_id'
})

tables.OAuth.belongsTo(tables.User, {
  foreignKey: 'user_id'
})

mysql.sync()

export default tables