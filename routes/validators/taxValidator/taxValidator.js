const { body }=require('express-validator');

const mappingValidator={
  createMapping:[
    body('zoneName').trim().isString().withMessage('zoneName is invalid'),
    body('zipCode').trim().isString().withMessage('zipCode is invalid'),
    body('isForZoneMap').trim().isString().withMessage('isForZoneMap is invalid'),
    body('taxPercent').isDecimal().withMessage('taxPercent is invalid'),
    body('isDeleted').trim().isString().withMessage('isDeleted is invalid'),
    body('storeId').isInt().withMessage('storeId is invalid'),
    body('taxCategoryId').isInt().withMessage('taxCategoryId is invalid')
],
updateCategory:[
  body('id').isInt().withMessage('id is invalid'),
],
deleteCategory:[
  body('id').isInt().withMessage('id is invalid')
],
createProperty:[
  body('id').isInt().withMessage('id is invalid'),
  body('name').trim().isString().withMessage('name is invalid'),
  body('code').trim().isString().withMessage('code is invalid')
],
createCategory:[
  body('name').isString().withMessage('name is invalid'),
  body('description').isString().withMessage('description is invalid')
]
}
module.exports.mappingValidator=mappingValidator;

