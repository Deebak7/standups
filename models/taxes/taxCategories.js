module.exports=(Sequelize,DataTypes)=>{
  const taxCategoriesModel=Sequelize.define('taxCategories',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      allowNull:false
    },
    storeId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    description:{
      type:DataTypes.STRING,
      allowNull:false
    },
    taxType:{
      type:DataTypes.STRING,
      allowNull:false
    },
    taxFor:{
      type:DataTypes.ENUM('SPECIFIC_ZONE','SPECIFIC_POSTAL_CODE'),
      allowNull:false
    },
    otherZoneRate:{
      type:DataTypes.DECIMAL,
      allowNull:false
    },
    isEnabled:{
      type:DataTypes.STRING,
      allowNull:false
    },
    isDeleted:{
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
  taxCategoriesModel.associate=function(models){
    this.taxZonesMapping=this.hasMany(models.taxZonesMapping,{foreignKey:"taxCategoryId"})
  }
  return taxCategoriesModel;
}