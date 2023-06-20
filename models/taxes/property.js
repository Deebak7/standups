module.exports=(Sequelize,DataTypes)=>{
  const propertyModel=Sequelize.define('property',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      allowNull:false
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    code:{
      type:DataTypes.STRING,
      allowNull:false
    }
  },
  {
    schema:'taxes',
    freezeTableName:true,
    timestamps:true,
    paranoid:false,
    underScored:false,
  });
  return propertyModel;
}