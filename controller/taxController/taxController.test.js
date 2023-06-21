const Categories=require('../../models').taxCategories;
const taxController=require('../../controller/taxController/taxController');
const Mapping=require('../../models').taxZonesMapping;
const property=require('../../models').property;
const Delivery=require('../../models').delivery;

const mockRequest = () => {
  const req = {}
  req.body = jest.fn().mockReturnValue(req)
  req.params = jest.fn().mockReturnValue(req)
  return req
}

const mockResponse = () => {
  const res = {}
  res.send = jest.fn().mockReturnValue(res)
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

ReE = jest.fn(() => { ReE(res, {}, 422); }).mockReturnValue({ success: false, error: {} });
jest.setTimeout(30000);


describe('Categories',()=>{
  beforeEach(async ()=>{
    jest.restoreAllMocks();
})
test('getAllCategories',async ()=>{
  let req=mockRequest()
  let res=mockResponse()
  req.body={id:1}
  Categories.findAll=jest.fn()
  .mockRejectedValueOnce(new Error("Error"))
  .mockResolvedValue(Promise.resolve({success:true}))
  await taxController.getAllCategory(req,res)
  expect(res.statusCode).toBe(422)
  await taxController.getAllCategory(req,res)
  expect(res.statusCode).toBe(200)
})
test('updateCategories',async ()=>{
  let req=mockRequest()
  let res=mockResponse()
  req.body={id:1,description:"electricity"}
  Categories.update=jest.fn()
  .mockRejectedValueOnce(new Error("Error"))
  .mockResolvedValue(Promise.resolve({success:true}))
  await taxController.updateCategory(req,res)
  expect(res.statusCode).toBe(422)
  await taxController.updateCategory(req,res)
  expect(res.statusCode).toBe(200)
})
test('deleteCategories',async ()=>{
  let req=mockRequest()
  let res=mockResponse()
  req.body={id:1,isDeleted:"true"}
  Categories.update=jest.fn()
  .mockRejectedValueOnce(new Error("Error"))
  .mockResolvedValue(Promise.resolve({success:true}))
  await taxController.deleteCategory(req,res)
  expect(res.statusCode).toBe(422)
  await taxController.deleteCategory(req,res)
  expect(res.statusCode).toBe(200)
})
test('createMap',async ()=>{
  let req=mockRequest()
  let res=mockResponse()
  req.body={taxFor:"SPECIFIC_ZONE",id:1,zoneName:"mumbai",zipCode:"A113",taxPercent:10.11,isDeleted:"true",
storeId:1,taxCategoryId:1}
  Categories.findOne=jest.fn()
  .mockRejectedValueOnce(new Error("Error"))
  .mockResolvedValueOnce(Promise.resolve({success:true})) 
  .mockResolvedValue(Promise.resolve(null));
  Categories.create=jest.fn()
  .mockRejectedValueOnce(new Error("Error"))
  .mockResolvedValueOnce(Promise.resolve({ dataValues: { taxFor: "SPECIFIC_ZONE" } })) 
  .mockResolvedValueOnce(Promise.resolve({ dataValues: { taxFor: "SPECIFIC_POSTAL_CODE" } }));
  Mapping.create=jest.fn()
  .mockRejectedValueOnce(new Error("Error"))
  .mockResolvedValue(Promise.resolve({success:true}));
  
  await taxController.createMap(req,res)
  expect(res.statusCode).toBe(422)
  await taxController.createMap(req,res)
  expect(res.statusCode).toBe(422)
  await taxController.createMap(req,res)
  expect(res.statusCode).toBe(422)
  await taxController.createMap(req,res)
  expect(res.statusCode).toBe(422)
  await taxController.createMap(req,res)
  expect(res.statusCode).toBe(200)
})
test('createProperty',async ()=>{
  let req=mockRequest()
  let res=mockResponse()
  req.body={id:1}
  property.create=jest.fn()
  .mockRejectedValueOnce(new Error("Error"))
  .mockResolvedValue(Promise.resolve({success:true}))
  await taxController.createProperty(req,res)
  expect(res.statusCode).toBe(422)
  await taxController.createProperty(req,res)
  expect(res.statusCode).toBe(200)
})
test('createCategory',async ()=>{
  let req=mockRequest()
  let res=mockResponse()
  req.body={id:1}
  Categories.create=jest.fn()
  .mockRejectedValueOnce(new Error("Error"))
  .mockResolvedValue(Promise.resolve({success:true}))
  await taxController.createCategory(req,res)
  expect(res.statusCode).toBe(422)
  await taxController.createCategory(req,res)
  expect(res.statusCode).toBe(200)
})
test('shipping1',async ()=>{
  let req=mockRequest()
  let res=mockResponse()
  req.body={id :2}
  Delivery.findOne=jest.fn()
  .mockRejectedValueOnce(new Error("Error"))
  .mockResolvedValue(Promise.resolve({
  shippingType:'subTotal',subAmount:100,minimumSubtotal:20 }))
  await taxController.calculateShippingValue(req,res)
  expect(res.statusCode).toBe(422)
  // await taxController.calculateShippingValue(req,res)
  // expect(res.statusCode).toBe(200)
  })
test('shipping2',async ()=>{
  let req=mockRequest()
  let res=mockResponse()
  req.body={id:2}
  Delivery.findOne=jest.fn()
  .mockRejectedValueOnce(new Error("Error"))
  .mockResolvedValueOnce({
    shippingType:'subtotal + tax',subAmount:100,taxAmount:50,minimumSubtotal:90
  })
  await taxController.calculateShippingValue(req,res)
  expect(res.statusCode).toBe(422)
  await taxController.calculateShippingValue(req,res)
  expect(res.statusCode).toBe(200)
})
test("createBoth", async () => {
  req = mockRequest();
  res = mockResponse();
  req.body = {
      "id":2,
      "subAmount":1300,
      "taxAmount":200
  }
  Delivery.findOne = jest.fn()
    .mockRejectedValueOnce(new Error("Error"))
    
    await taxController.calculateShippingValue(req, res);
    expect(res.statusCode).toBe(422);
    
  });

})