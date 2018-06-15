const User = require('./models/UserModel')
user = new User({name: 'Hemand', email: 'anand@gmail.com'})
user.save(err => {
  if(err){
    console.log("Couldn't create user"+ err)
  }
  else
    console.log("Success")

})
