const crypto=require('crypto');
const bcrypt=require('bcrypt');
const { to }=require('../../global_function');
const jwt=require('jsonwebtoken');
const cryptoServices=require('../../service/crypto_services');

module.exports=(Sequelize,DataTypes)=>{
  const listenerModel=Sequelize.define('listener',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      allowNull:false
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false
    }
  },
  {
    schema:'listener',
    freezeTableName:true,
    timestamps:true,
    paranoid:false,
    underScored:false,
  });
  listenerModel.beforeSave(async (user,options)=>{  
    let err;
    if(user.changed('password')){
      let salt,hash;
      let rounds=crypto.randomInt(4,10);
      [err,salt]=await to(bcrypt.genSalt(rounds));
      if(err){
        console.log('err or in encryption in user account' + err.message);
      }
      [err,hash]=await to(bcrypt.hash(user.password,salt));
      if(err){
        console.log('error in hash method in encryption' + err.message);
      }
      user.password=hash;
    }
  });
  listenerModel.prototype.getJWT=async function(){
    let err,encryptedToken;
    const token="Bearer " +jwt.sign({
      id:this.id,
      email:this.email,
    },CONFIG.jwt_encryption,{expiresIn:CONFIG.jwt_expiration});
    [err,encryptedToken]=await to (cryptoServices.encrypt(token));
    if(err) TE(err.message);
    if(encryptedToken) return encryptedToken;
  }
  return listenerModel;
}