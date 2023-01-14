import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import cookie from 'js-cookie'
const Navbar = ()=>{
    const router = useRouter();
    const {token,useremail, userrole} = parseCookies();
    
    const isActive=(route)=>{
        if(route == router.pathname){
            return "active"
        }
        else ""
    }
    return(
        <>
            <nav>
                <div className="nav-wrapper #0d47a1 blue darken-3">
                <Link href="/" className="brand-logo">Ecom</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li className={isActive('/cart')}><Link href="/cart">cart</Link></li>
                    {useremail && userrole && 
                        <li className={isActive('/create')}><Link href="/create">create</Link></li>
                    }
                    {useremail && token?
                        <>
                            <li className={isActive('/account')}><Link href="/account">Account</Link></li>
                            <li><button 
                                className="btn red" 
                                onClick={()=>{
                                    cookie.remove('token')
                                    cookie.remove('useremail')
                                    cookie.remove('userrole')
                                    router.push('/login')
                                }}
                            >logout</button></li>
                        </>
                       
                        :
                        <>
                            <li className={isActive('/signup')}><Link href="/signup">signUp</Link></li>
                            <li className={isActive('/login')}><Link href="/login">login</Link></li>
                        </>
                       


                    }
                   
                   
                    
                   
                </ul>
                </div>
  </nav>
        </>
    )
}

export default Navbar;