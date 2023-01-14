import Link from "next/link";
import { userAgent } from "next/server";
import { useState } from "react";
import { useRouter } from "next/router";
const Signup = () =>{
  const router = useRouter();
  const [user, setUser] = useState({
    username:'',
    email:'',
    password:''
  })
  const handleOnChange = (e) =>{
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })
  }

  const handleSignup=async(e)=>{
    e.preventDefault();
    let res = await fetch('http://127.0.0.1:3000/api/signup',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        username:user.username,
        email:user.email,
        password:user.password,
      })
    });
    res = await res.json();
    if(!res.error){
      M.toast({html: 'successfully register....',classes:"green"})
      router.push('/login')
      setUser({
        username:'',
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
        <h3>Signup...</h3>
        <form onSubmit={(e)=>{handleSignup(e)}}>
        <input 
          type="text"
          name="username"
          value={user.name}
          placeholder="username"
          onChange={(e)=>handleOnChange(e)}
        />
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
          type="submit" >signup
          <i class="material-icons right">forward</i>
        </button>
        <Link href="/login"><h5>Already have a account ?</h5></Link>
        </form>
      </div>
    </>
  )
}

export default Signup;