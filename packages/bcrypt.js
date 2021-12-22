var bcrypt = require('bcryptjs');

async function hashpassword(password){
    var salt = await bcrypt.genSaltSync(10);
    var hash = await bcrypt.hashSync(password, salt); 
    return hash;
}
async function hashcheck(password, hashingpwd){
    try{
       return await bcrypt.compare(password, hashingpwd);
    }
    catch(err){
        console.log(err);
    }
}
module.exports = {hashpassword, hashcheck}