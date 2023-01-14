import bcrypt from 'bcryptjs';
import  jwt  from 'jsonwebtoken';
export default async(req,res)=>{
    const {email,password} = req.body;
    let user1 = await fetch(`http://127.0.0.1:3500/signup?email=${email?email:''}`);
    user1 = await user1.json();
    let user = user1[0];
    if(!email || !password){
        res.json({error:'plz enter all field...'})
    }
    else if(!user){
        res.json({error:'user not found'}) 
    }
    else{
        const passwordMatch = await bcrypt.compare(password,user.password)
        if(passwordMatch){
            const token = jwt.sign({userId:user.id},process.env.JWT_SECRET,{
                expiresIn:'7d'
            })
            console.log(token,'token............')
            const {username,email,role} = user;
            res.status(201).json({token,user:{username,email,role}})
        }
        else{
            res.json({error:'wrong email or password'})
        }

    }
    

}