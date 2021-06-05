
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host:     process.env.DB_HOST, 
    dialect: 'mysql'
  },

  // dialectOptions: {
  //   useUTC: false, //for reading from database
  //   dateStrings: true,
  //     typeCast: function (field, next) { // for reading from database
  //       if (field.type === 'DATETIME') {
  //         return field.string()
  //       }
  //         return next()
  //       },
  // },
  // timezone: '+02:00' /*for writing to database*/,

  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST, 
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST, 
    dialect: 'mysql'
  },
}
