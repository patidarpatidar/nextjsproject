export default async(req,res)=>{
   const {pid} = req.query;
   let result = await fetch(`http://127.0.0.1:3500/products/${pid}`);
    result = await result.json();
    res.json({productDetail:result})
}