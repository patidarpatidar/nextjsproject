import Navbar from "@/components/Navbar";
import Head from "next/head";

const Layout=({children})=>{
    return (
        <>
            <Head>
            
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />

                <link rel="stylesheet" href="/style.css"/>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

  
            </Head>
            <Navbar/>
            {children}
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        </>
    )
}

export default Layout;