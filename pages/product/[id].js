import { useRouter } from "next/router";
const Product = ({product}) =>{
    const router = useRouter();
    if(router.isFallback){
        return (
            <h3>loading....</h3>
        )
    }
    if(!product.id){
      return (
        <h3>Product note found...</h3>
      )
    }
    else{
      return (
        <>
            <div className="container center-align">
                <h3>{product.name}</h3>
                <img src={product.mediaUrl} width={200}/>
                <h5>RS. {product.price}</h5>
                <input
                  type="number"
                  style={{width:"400px",margin:"10px"}}
                  min="1"
                  placeholder="Quantity"
                />
                <button 
                  className="btn waves-effect waves-light #0d47a1 blue darken-5" type="submit" name="action">Add
                    <i className="material-icons right">add</i>
                </button>
                <p className="left-align">{product.description}</p>
            </div>
        </>
    )
    }
    
}
// export async function getServerSideProps({params:{id}}){
//     let res = await fetch(`http://127.0.0.1:3000/api/product/${id}`);
//     res = await res.json();
//     return {
//       props:{product:res.productDetail}
//     }
//   }
export async function getStaticProps({params:{id}}){
    let res = await fetch(`http://127.0.0.1:3000/api/product/${id}`);
    res = await res.json();
    return {
      props:{product:res.productDetail}
    }
  }
export async function getStaticPaths(){
    
    return {
      paths:[
        { params: {id:"1"}}
      ],
      fallback:true
    }
  }
export default Product;