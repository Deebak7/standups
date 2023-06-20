const Listener=require('../../models').listener;
const standupController=require('../../controller/standups/standupController');
const bcrypt=require('bcrypt');
// const { ReE } = require('../../global_function');

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


describe('standups',()=>{
  beforeEach(async ()=>{
    jest.restoreAllMocks();
})
test('createListner',async ()=>{
  let req=mockRequest();
  let res=mockResponse();
  req.body={id:1,email:"vinu@gmail.com",password:"vinu123"}
  Listener.create=jest.fn()
  .mockRejectedValueOnce(new Error("Error"))
  .mockResolvedValueOnce(Promise.resolve(null))
  .mockResolvedValueOnce(Promise.resolve({
    getJWT(){
      return Promise.reject(new Error("Error"))
    }
  }))
  .mockResolvedValueOnce(Promise.resolve({
    getJWT(){
      return Promise.resolve(null)
    }
  }))
  .mockResolvedValue(Promise.resolve({
    getJWT(){
      return Promise.resolve({success:true})
    }
  }))
  await standupController.createListener(req,res)
  expect(res.statusCode).toBe(422)
  await standupController.createListener(req,res)
  expect(res.statusCode).toBe(200)
  await standupController.createListener(req,res)
  expect(res.statusCode).toBe(422)
  await standupController.createListener(req,res)
  expect(res.statusCode).toBe(200)
  await standupController.createListener(req,res)
  expect(res.statusCode).toBe(200)

})
test('existListener',async()=>{
  let req=mockRequest();
  let res=mockResponse();
  req.body={email:"vinu@gmail.com",password:"password123"}
  Listener.findOne=jest.fn()
  .mockRejectedValueOnce(new Error("Error"))
  .mockResolvedValueOnce(null)
  .mockResolvedValueOnce({
    email:'vinu@gmail.com',
    password:await bcrypt.hash('password123',10)
  })
  await standupController.existListener(req,res)
  expect(res.statusCode).toBe(422)
  await standupController.existListener(req,res)
  expect(res.statusCode).toBe(422)
  await standupController.existListener(req,res)
  expect(res.statusCode).toBe(200)
})
})