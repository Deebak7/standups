const Listner=require('../../models').listener;
const {to,ReE,ReS, TE}=require('../../global_function');
const standupServices=require('../../service/standupServices/standupServices');
const bcrypt=require('bcrypt');

// const { jwt_encryption }=require('../../config/config');



const createListener=async function(req,res){
  let err,data,listenerDetails={};
  const {email,password}=req.body;
  [err,data]=await to(Listner.create({email,password}))
  if(err) return ReE(res,err,422);
  if(data)  {
    [error,token]=await to(data.getJWT());
    if(error) return ReE(res,error,422);
    if(token){
      listenerDetails['data']=data;
      listenerDetails['token']=token;
    }
  }
  if(listenerDetails) return ReS(res,listenerDetails,200);
}
module.exports.createListener=createListener;


const generateToken=async function(req,res){
  let [err,data]=await to(standupServices.generateToken(req.body.id))
  if(err) return ReE(res,err,422);
  if(data) return ReS(res,data,200);
}
module.exports.generateToken=generateToken;

const existListener=async function(req,res){
  let {email,password}=req.body;
  const hashedPassword=await bcrypt.hash(password,10);
    let [error,data]=await to(Listner.findOne({
      where:{
        email:email,
        // password:password
      }
    }))
    if(error) return ReE(res,error,422);
    if(data) {
      const isPasswordMatch=await bcrypt.compare(password,data.password);
      if(isPasswordMatch){
        return ReS(res,data,200);
      }else{
        // return ReE(res,'invalid email or password',422);
        return ReE(res,error,422);
      }
    // }
    }else{
      return ReE(res,'invalid email or password',422);
    }
}
module.exports.existListener=existListener;


// const existListener = async function (req, res) {
//   let { email, password } = req.body;

//   try {
//     const listener = await Listner.findOne({ where: { email: email } });

//     if (!listener) {
//       req.flash('error', 'Invalid email or password');
//       return res.redirect('/login'); // Redirect to the login page or any other appropriate route
//     }

//     const isPasswordMatch = await bcrypt.compare(password, listener.password);

//     if (isPasswordMatch) {
//       // Generate JWT token
//       const token = jwt.sign({ id: listener.id, email: listener.email }, jwt_encryption);

//       return ReS(res, { token: token }, 200);
//     } else {
//       req.flash('error', 'Invalid email or password');
//       return res.redirect('/login'); // Redirect to the login page or any other appropriate route
//     }
//   } catch (error) {
//     req.flash('error', 'An error occurred');
//     return res.redirect('/login'); // Redirect to the login page or any other appropriate route
//   }
// };

// module.exports.existListener = existListener;


