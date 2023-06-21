var fs = require('fs');
const { test } = require('node:test');
var path = require('path');
const Sequelize = require('sequelize');
var basename = path.basename(__filename);
const db = {};
require('../config/constant')
require('../config/config')
// let environment;
let environment="test";


if (environment && environment.toLowerCase() == "test") {
  CONSTANT.SCHEMAS.forEach((item) => {
    fs.readdirSync(__dirname + "/" + item)
      .filter((file) => {
        return (
          file.indexOf(".") !== 0 &&
          file !== basename &&
          file.slice(-3) === ".js"
        );
      })
      .forEach((file) => {
        db[file.slice(0, -3)] = {
          findOne: () => { },
          find: () => { },
          create: () => { },
          update: () => { },
          delete: () => { },
          findAndCountAll: () => { },
          count: () => { },
          findAll: () => { },
        };
      });
  });
  db.sequelize = {
    transaction: (item) => { let runAfterCommit; return Promise.resolve({ commit: () => { if (runAfterCommit && runAfterCommit.func) { runAfterCommit.func(); } }, rollback: () => { }, afterCommit: (func) => { runAfterCommit = { func: func } } }) },
    QueryTypes: {
      SELECT: {}
    }
  }
}else{

  const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, {
    dialect: CONFIG.db_dialect,
    host:  CONFIG.db_host,
    port: CONFIG.db_port,
    logging: false,
    define: {
      timestamps: false,
      paranoid: true,
      underscored: false
    },
    dialectOpction:{
  
      useUTC :true,
    }
  });
  // console.log('basename', basename);
  const schemaCreate = async function(){
      const test = [];
      var schemas = await sequelize.showAllSchemas().then(
          (s)=>{
              CONSTANT.SCHEMAS.forEach((item)=>{
                  if(s.indexOf(item)<0){
                      sequelize.createSchema(item).then((res)=> { })
                  }
              });
          },
          (err)=>{
              console.log("in err",err);
          }
      );
      return schemas
  }
  
  CONSTANT.SCHEMAS.forEach((item)=>{
      fs
    .readdirSync(__dirname + "/" + item)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
     .forEach(file => {
      try{
      // console.log(file);
      var model = require(path.join(__dirname + "/" + item, file))(
          sequelize,
          Sequelize.DataTypes
      );
      db[file.slice(0,-3)] = model;
      // console.log(db[model.name]);
      }catch(err){
        console.log(err);
      }
    });
  });
  
  Object.keys(db).forEach(modelName =>{
    if(db[modelName].associate){
      db[modelName].associate(db);
    }
  })
  db.schemaCreate = schemaCreate();
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
}

module.exports = db;