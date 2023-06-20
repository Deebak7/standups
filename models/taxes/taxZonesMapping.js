module.exports=(Sequelize,DataTypes)=>{
  const taxZonesMappingModel=Sequelize.define('taxZonesMapping',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      allowNull:false
    },
    zoneName:{
      type:DataTypes.STRING,
      allowNull:false
    },
    zipCode:{
      type:DataTypes.STRING,
      allowNull:false
    },
    isForZoneMap:{
      type:DataTypes.STRING,
      allowNull:false
    },
    taxPercent:{
      type:DataTypes.DECIMAL,
      allowNull:false
    },
    isDeleted:{
      type:DataTypes.STRING,
      allowNull:false
    },
    storeId:{
      type:DataTypes.INTEGER,
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
  taxZonesMappingModel.associate=function(models){
    this.taxCategoryId=this.belongsTo(models.taxCategories,{foreignKey:"taxCategoryId"})
  }
  return taxZonesMappingModel;
}