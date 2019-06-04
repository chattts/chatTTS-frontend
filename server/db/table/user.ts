import * as Sequelize from 'sequelize'
import sequelize from '../_mysql'

class User extends Sequelize.Model {}

User.init({
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUIDV4,
    unique: true,
  },
  nickname: {
    allowNull: false,
    type: Sequelize.STRING(10),
    unique: false
  }
}, {
  sequelize,
  timestamps: true
})

export default User