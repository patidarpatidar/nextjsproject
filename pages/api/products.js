
export default (req,res)=>{
    switch(req.method){
        case 'GET':
            getallProducts(req,res);
            break
        case 'POST':
            saveProduct(req,res);
            break
    }
}
const getallProducts = async(req,res) =>{
    let result = await fetch('http://127.0.0.1:3500/products');
    result = await result.json();
    res.json({products:result})
}

const saveProduct=async(req,res)=>{
    const {name, price, description, mediaUrl} = req.body;
   
    let result = await fetch('http://127.0.0.1:3500/products',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        name:name,
        price:price,
        description:description,
        mediaUrl:mediaUrl
      })
    });
    result = await result.json()
    console.log(result,'result')
    res.json({msg:'sucsess'})
}
