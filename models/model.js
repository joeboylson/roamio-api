
const { Sequelize, Model, DataTypes } = require('sequelize');
const { DATABASE_URL, IS_DEVELOPMENT } = require('../config')

const sequelize = new Sequelize(DATABASE_URL);
class Interest extends Model {}



// ==================================================
// MODELS
// ==================================================

Interest.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  email: DataTypes.STRING,
  interest_id: DataTypes.INTEGER,
  text: DataTypes.STRING,
  interest: DataTypes.INTEGER
}, { sequelize, modelName: 'interest' });


const seedData = [
  { email: 'user1@mail.com', interest_id: 0, text: "Test Interest 1", interest: 1},
  { email: 'user1@mail.com', interest_id: 1, text: "Test Interest 2", interest: 1},
  { email: 'user1@mail.com', interest_id: 2, text: "Test Interest 3", interest: 1},
  { email: 'user1@mail.com', interest_id: 3, text: "Test Interest 4", interest: 1},
  { email: 'user1@mail.com', interest_id: 4, text: "Test Interest 1", interest: 1},
  { email: 'user2@mail.com', interest_id: 0, text: "Test Interest 1", interest: 1},
  { email: 'user2@mail.com', interest_id: 1, text: "Test Interest 2", interest: 1},
  { email: 'user2@mail.com', interest_id: 2, text: "Test Interest 3", interest: 1},
  { email: 'user2@mail.com', interest_id: 3, text: "Test Interest 4", interest: 1},
  { email: 'user2@mail.com', interest_id: 4, text: "Test Interest 1", interest: 1},
  { email: 'user3@mail.com', interest_id: 0, text: "Test Interest 1", interest: 1},
  { email: 'user3@mail.com', interest_id: 1, text: "Test Interest 2", interest: 1},
  { email: 'user3@mail.com', interest_id: 2, text: "Test Interest 3", interest: 1},
  { email: 'user3@mail.com', interest_id: 3, text: "Test Interest 4", interest: 1},
  { email: 'user3@mail.com', interest_id: 4, text: "Test Interest 1", interest: 1},
  { email: 'user4@mail.com', interest_id: 0, text: "Test Interest 1", interest: 1},
  { email: 'user4@mail.com', interest_id: 1, text: "Test Interest 2", interest: 1},
  { email: 'user4@mail.com', interest_id: 2, text: "Test Interest 3", interest: 1},
  { email: 'user4@mail.com', interest_id: 3, text: "Test Interest 4", interest: 1},
  { email: 'user4@mail.com', interest_id: 4, text: "Test Interest 1", interest: 1},
]


const sync = async () => {
  console.log('::: validating schema')
  await sequelize.sync({force: IS_DEVELOPMENT});

  if (IS_DEVELOPMENT) {
    Interest.bulkCreate(seedData)
  }

  return true;
}


module.exports = { 
  Interest,
  ready: sync()
}