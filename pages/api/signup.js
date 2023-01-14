import bcrypt from 'bcryptjs';
export default async(req,res)=>{
    const {username,email,password} = req.body;
    let result = await fetch(`http://127.0.0.1:3500/signup?email=${email?email:''}`);
    result = await result.json();
    if(!username || !email || !password){
        res.json({error:'plz enter all field...'})
    }
    else if(result[0]){
        res.json({error:'email already exist...'}) 
    }
    else{
        const hasePassword = await bcrypt.hash(password,12);
        let result = await fetch(`http://127.0.0.1:3500/signup`,{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              username:username,
              email:email,
              password:hasePassword
            })
        });
        res.json({msg:'signup succsess..'})

    }
    

}