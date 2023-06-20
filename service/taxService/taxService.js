const { TE, to } = require('../../global_function');
const Property=require('../../models').property;
const Category=require('../../models').taxCategories;
const Mapping=require('../../models').taxZonesMapping;



/** 
 * Original Author: deebak
 * Author: deebak
 * Created on: 22-05-2023
 * Modified on: 22-05-2023
 * Function: createproperty
 * Method post which is used to create a property data.
  @param {} req it holds the details about property .
  @param {} res it holds the fetched property details and success message.
 * @returns if data fetched it returns success message otherwise return error message
**/


const createProperty=async function(details){
  let [err,data]=await to(Property.create(details))
  if(err) return TE(err.message);
  if(data) return data;
}
module.exports.createProperty=createProperty;


/** 
 * Original Author: deebak
 * Author: deebak
 * Created on: 22-05-2023
 * Modified on: 22-05-2023
 * Function: createCategory
 * Method post which is used to create a category data.
  @param {} req it holds the details about category .
  @param {} res it holds the fetched category details and success message.
 * @returns if data fetched it returns success message otherwise return error message
**/


const createCategory=async function(details){
  let [err,data]=await to(Category.create(details))
  if(err) return TE(err.message);
  if(data) return data;
}
module.exports.createCategory=createCategory;


/** 
 * Original Author: deebak
 * Author: deebak
 * Created on: 22-05-2023
 * Modified on: 22-05-2023
 * Function: getAllCategory
 * Method get which is used to getall category data.
  @param {} req it holds the details about category .
  @param {} res it holds the fetched category details and success message.
 * @returns if data fetched it returns success message otherwise return error message
**/


const getAllCategory=async function(){
  let [err,data]=await to(Category.findAll({
    order:[['id','ASC']]
  }))
  if(err) return TE(err.message);
  if(data) return data;
}
module.exports.getAllCategory=getAllCategory;



/** 
 * Original Author: deebak
 * Author: deebak
 * Created on: 22-05-2023
 * Modified on: 22-05-2023
 * Function: updateCategory
 * Method post which is used to update a category data.
  @param {} req it holds the details about category .
  @param {} res it holds the fetched category details and success message.
 * @returns if data fetched it returns success message otherwise return error message
**/

const updateCategory=async function(details){
  let [err,data]=await to(Category.update({
    description:"electricity"},{
      where:{
        id:details
      }
    }
  ))
  if(err) return TE(err.message);
  if(data) return data;
}
module.exports.updateCategory=updateCategory;


/** 
 * Original Author: deebak
 * Author: deebak
 * Created on: 22-05-2023
 * Modified on: 22-05-2023
 * Function: deleteCategory
 * Method post which is used to delete a category data.
  @param {} req it holds the details about category .
  @param {} res it holds the fetched category details and success message.
 * @returns if data fetched it returns success message otherwise return error message
**/


const deleteCategory=async function(details){
  let [err,data]=await to(Category.update({
    isDeleted:"true"},{
      where:{
        id:details
      }
    }
  ))
  if(err) return TE(err.message);
  if(data) return data;
}
module.exports.deleteCategory=deleteCategory;


/** 
 * Original Author: deebak
 * Author: deebak
 * Created on: 22-05-2023
 * Modified on: 22-05-2023
 * Function: createMap
 * Method post which is used to create a taxZonesMapping data.
  @param {} req it holds the details about taxZonesMapping .
  @param {} res it holds the fetched taxZonesMapping details and success message.
 * @returns if data fetched it returns success message otherwise return error message
**/


const createMap=async function(details){
  let [error,datas]=await to(Category.findOne({
    where:{
      name:details.categoryName
    }
  }));
  if(error) return TE(error.message);
  if(datas) return TE('Already exist');
    let specific;
    let [err,data]=await to(Category.create(details))
    if(err) return TE(err.message);
    specific=data.dataValues.taxFor
    if(data){
      if(specific=="SPECIFIC_ZONE"){
        isForZoneMap=true
     }if(specific=="SPECIFIC_POSTAL_CODE"){
      isForZoneMap=false
    }
     }
  let err1,data1;
  [err1,data1]=await to(Mapping.create({
    zoneName:details.zoneName,
    zipCode:details.zipCode,
    isForZoneMap,
    taxPercent:details.taxPercent,
    isDeleted:details.deleted,
    storeId:details.store,
    taxCategoryId:details.taxCategoryId
  }))
  if(err1) return TE(err1.message)
  if(data1) return data1;
}
  module.exports.createMap=createMap;

