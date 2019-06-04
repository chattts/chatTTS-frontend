import * as Sequelize from 'sequelize'
import sequelize from '../_mysql'

class OAuth extends Sequelize.Model {}

OAuth.init({
  id: {
    type: Sequelize.STRING(128),
    allowNull: false,
    unique: false
  },
  AccessToken: {
    type: Sequelize.STRING(255),
    allowNull: false,
    unique: false
  },
  RefreshToken: {
    type: Sequelize.STRING(255),
    allowNull: false,
    unique: false,
  }
}, {
  sequelize,
  timestamps: true
})

export default OAuth