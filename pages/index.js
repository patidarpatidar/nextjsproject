// import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = ({products}) =>{
  const [test,setTest] = useState('loading');
  const productList = products.map((product)=>{
    return (
      <>
       <div className="card pcard" key={product.id}>
        <div className="card-image">
          <img src={product.mediaUrl}/>
          <span className="card-title">{product.name}</span>
        </div>
        <div className="card-content">
          <p>RS. {product.price}</p>
        </div>
        <div className="card-action">
          <Link href={'/product/[id]'} as={`/product/${product.id}`}>View Product</Link>
        </div>
      </div>
      </>
    )
  })

  return (
    <>
      <div className="rootcard">
        {productList}
      </div>
     
    </>
  )
}
export async function getStaticProps(context){
  let res = await fetch('http://127.0.0.1:3000/api/products',{method:'GET'});
  res = await res.json();
  return {
    props:{products:res.products}
  }
}
export default Home;