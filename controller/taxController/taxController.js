var express = require('express');
var router = express.Router();
module.exports.router = router;


const taxValidator=require('../../routes/validators/taxValidator/taxValidator');
const validation=require('../../middleware/validate-schema');
const taxService=require('../../service/taxService/taxService');
const { ReE, ReS, to}=require('../../global_function');


/** 
 * Original Author: deebak
 * Author: deebak
 * Created on: 22-05-2023
 * Modified on: 22-05-2023
 * Function: createProperty
 * Method post which is used to create a property data.
  @param {} req it holds the details about property .
  @param {} res it holds the fetched property details and success message.
 * @returns if data fetched it returns success message otherwise return error message
**/


const createProperty=async function(req,res){
  let [err,data]=await to(taxService.createProperty(req.body))
  if(err) return ReE(res,err,422);
  if(data) return ReS(res,data,200);
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


const createCategory=async function(req,res){
  let [err,data]=await to(taxService.createCategory(req.body))
  if(err) return ReE(res,err,422);
  if(data) return ReS(res,data,200);
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


const getAllCategory=async function(req,res){
  let [err,data]=await to(taxService.getAllCategory())
  if(err) return ReE(res,err,422);
  if(data) return ReS(res,data,200);
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


const updateCategory=async function(req,res){
  let [err,data]=await to(taxService.updateCategory(req.body.id))
  if(err) return ReE(res,err,422);
  if(data) return ReS(res,data,200);
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


const deleteCategory=async function(req,res){
  let [err,data]=await to(taxService.deleteCategory(req.body.id))
  if(err) return ReE(res,err,422);
  if(data) return ReS(res,data,200);
}
module.exports.deleteCategory=deleteCategory;


/** 
 * Original Author: deebak
 * Author: deebak
 * Created on: 22-05-2023
 * Modified on: 22-05-2023
 * Function: createMap
 * Method post which is used to create a Map data.
  @param {} req it holds the details about taxZonesMapping .
  @param {} res it holds the fetched taxZonesMapping details and success message.
 * @returns if data fetched it returns success message otherwise return error message
**/



const createMap=async function(req,res){
  let [err,data]=await to(taxService.createMap(req.body))
  if(err) return ReE(res,err,422);
  if(data) return ReS(res,data,200);
}
module.exports.createMap=createMap;



router.post('/property',taxValidator.mappingValidator.createProperty,validation.validate,createProperty);
router.post('/categories',taxValidator.mappingValidator.createCategory,validation.validate,createCategory);
router.get('/category',getAllCategory);
router.post('/update',taxValidator.mappingValidator.updateCategory,validation.validate,updateCategory);
router.post('/delete',taxValidator.mappingValidator.deleteCategory,validation.validate,deleteCategory);
router.post('/map',taxValidator.mappingValidator.createMapping,validation.validate,createMap);


