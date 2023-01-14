import Link from "next/link";
import { userAgent } from "next/server";
import { useState } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
const Login = () =>{
  const router = useRouter();
  const [user, setUser] = useState({
    email:'',
    password:''
  })
  const handleOnChange = (e) =>{
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })
  }
  const handleLogin = async(e)=>{
    e.preventDefault();
    let res = await fetch('http://127.0.0.1:3000/api/login',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        email:user.email,
        password:user.password,
      })
    });
    res = await res.json();
    if(!res.error){
      M.toast({html: 'successfully login....',classes:"green"})
      cookie.set('token',res.token)
      console.log(res.user,'useruser')
      cookie.set('useremail',res.user.email)
      cookie.set('userrole',res.user.role)
      
      router.push('/account')
      setUser({
        email:'',
        password:''
      })
    }
    else{
      M.toast({html: res.error,classes:"red"})
    }
    
  }
  return (
    <>
      <div className="container card lcard center-align">
        <h3>Login...</h3>
        <form onSubmit={(e)=>{handleLogin(e)}}>
        <input 
          type="email"
          name="email"
          value={user.email}
          placeholder="email"
          onChange={(e)=>handleOnChange(e)}

        />
        <input 
          type="password"
          name="password"
          value={user.password}
          placeholder="password"
          onChange={(e)=>handleOnChange(e)}

        />
        <button 
          class="btn waves-effect waves-light" 
          type="submit" >login
          <i class="material-icons right">forward</i>
        </button>
        <Link href="/signup"><h5>Dont have a account ?</h5></Link>
        </form>
      </div>
    </>
  )
}

export default Login;