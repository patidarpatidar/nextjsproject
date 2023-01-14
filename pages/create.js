import Link from "next/link";
import { parseCookies } from "nookies";
import { useState } from "react";
const Create = () =>{
  const [name,setName] = useState("")
  const [price,setPrice] = useState("")
  const [media,setMedia] = useState("")
  const [description,setDescription] = useState("")
  const imageUpload=async()=>{
    const data = new FormData();
    data.append('file',media);
    data.append('upload_preset','mystore');
    data.append('cloud_name','dywfqueqr');
    let res = await fetch('https://api.cloudinary.com/v1_1/dywfqueqr/image/upload',{
      method:"POST",
      body:data
    })
    res = await res.json();
    return res.url;
    
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    const mediaUrl = await imageUpload();
    let res = await fetch('http://127.0.0.1:3000/api/products',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        name:name,
        price:price,
        description:description,
        mediaUrl:mediaUrl
      })
    });
    res = await res.json();
    if(res.error){
      console.log(res.msg)
    }else{
      alert('sucsess added...')
      setName('')
      setPrice('')
      setDescription('')
      setMedia('')
    }
    imageUpload()
    


  }
  return (
    <>
      <form className="container" onSubmit={(e)=>handleSubmit(event)}>
        <input type="text" name="name" placeholder="name"
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
        />
        <input type="number" name="price" placeholder="price"
          value={price}
          onChange={(e)=>{setPrice(e.target.value)}}
        />
        
        <div className="file-field input-field">
          {media && 
          <img className="responsive-img" width={100} height={100} src={media?URL.createObjectURL(media):''}/>
          }
      <div className="btn">
        <span>Image</span>
        <input type="file"
        accept="image/*"
        
        onChange={(e)=>{setMedia(e.target.files[0])}}
        />

      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>
    <textarea name="description" placeholder="desccription" onChange={(e)=>{setDescription(e.target.value)}} class="materialize-textarea" value={description}></textarea>
      <button class="btn waves-effect waves-light" type="submit" >Submit
      <i class="material-icons right">send</i>
      </button>
        
      </form>
    </>
  )
}
export async function getServerSideProps(context){
  const cookie = parseCookies(context);
  const user = cookie.user ? JSON.parse(cookie.user):""

  if(user.role != 'admin'){
      const {res} = context
      res.writeHead(302,{Location:'/login'})
      res.end()
  }
  return {
      props:{}
  }
}
export default Create;