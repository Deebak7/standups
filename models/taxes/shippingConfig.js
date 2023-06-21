module.exports=(db, Sequelize) => {
  let shippingModel =db.define('shippingConfig',{
      id:{

          type:Sequelize.INTEGER,
          allowNull:false,
          autoIncrement:true,
          primaryKey:true
      },
      from:{

          type:Sequelize.INTEGER,
          allowNull:false
      },
      to:{

          type:Sequelize.INTEGER,
          allowNull:false
      },
      amount:{

       type:Sequelize.INTEGER,
       allowNull:false
      },
      deliveryId:{

          type:Sequelize.INTEGER,
          allowNull:false
      },
  },
  {
      tableName:'shippingConfig',
      underscored:false,
      timestamps:true,
      schema: "taxes"
  });
  shippingModel.associate=async function(models){
      this.deliveryId=this.belongsTo(models.delivery,{foreignKey:'deliveryId'});
  }
  return shippingModel;
}