var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./config/config');
require('./global_function');
const models=require('./models');


const passport = require('passport');
const cookieSession=require('cookie-session');
const cors=require('cors');
const session=require('express-session');
const upload=require('express-fileupload');
// const publicDirectoryPath=path.join(__dirname, 'public');





var indexRouter = require('./public/server');

// var usersRouter = require('./routes/users');

// const session = require('express-session');
// const flash = require('connect-flash');

app = express();
require('./swagger');

require('./middleware/passport')(passport);

// app.use(session({
//   secret: '1234', // Replace with your own secret key
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(flash());
// app.use((req, res, next) => {
//   res.locals.flashMessages = req.flash();
//   next();
// });

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(upload());
// app.use(express.static(publicDirectoryPath));

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(session({secret:"heyyy"}))

app.use(cookieSession({
  name:'tuto-session',
  keys:['key1','key2']
}))







app.use('', indexRouter.router);
// app.use('/users', usersRouter);

// const models = require('./models');
models.sequelize.authenticate().then(()=>{
  console.log('Db connected sequalize');
}).catch((err)=>{
  console.log('unable to connect');
});
models.sequelize.sync({alter : true});


// models.sequelize.authenticate().then(() => {
//   console.log("Connected to SQL database:", CONFIG.db_name);
//   const schema = models.schemaCreate.then(() => {
//     models.sequelize.sync({ alter: true });
//   });
// }).catch((err) => {
//   console.error("Unable to connect to Postgres database:");
// });

app.use('/taxes',require('./controller/taxController/taxController').router);
app.use('/listener',require('./public/server').router);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;

