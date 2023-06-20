const { TE,to } = require('../../global_function');

const listnerRef=require('../../models').listener;

const generateToken=async function(details){
  let err,data,listenerDetails={};
  [err,data]=await to(listnerRef.findOne({
    where :{
      id:details
    }
  }))
  if(err) return TE(err.message);
  console.log('data',data);
  if(data) {
    [error,token]=await to(data.getJWT());
    console.log('token',token);
    if(error) return TE(error.message);
    if(token){
      listenerDetails['data']=data;
      listenerDetails['token']=token;
    }
  }
  if(listenerDetails) return listenerDetails;
}
module.exports.generateToken=generateToken;

