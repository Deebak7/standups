module.exports=(db, Sequelize) => {
  let DeliveryModel =db.define('delivery',{
      id:{
          type:Sequelize.INTEGER,
          allowNull:false,
          autoIncrement:true,
          primaryKey:true
      },
      storeId:{
          type:Sequelize.INTEGER,
          allowNull:false
      },
      name:{
          type:Sequelize.STRING,
          allowNull:false
      },
      minimumSubtotal:{
          type:Sequelize.INTEGER,
          allowNull:false
      },
      shippingType:{
          type:Sequelize.ENUM('subtotal', 'subtotal+tax'),
          allowNull:false
      },
      amountType:{
          type:Sequelize.ENUM('amount','percentage'),
          allowNull:false
      },
      isDeleted:{
          type:Sequelize.BOOLEAN,
          allowNull:false
      },
      isActive:{
          type:Sequelize.BOOLEAN,
          allowNull:false
      },
  },
  {
      tableName:'delivery',
      underscored:false,
      timestamps:true,
      schema: "taxes"
  });
  DeliveryModel.associate=async function(models){
      this.shippingConfig=this.hasMany(models.shippingConfig,{foreignKey:"deliveryId"});
  }
  return DeliveryModel;
}