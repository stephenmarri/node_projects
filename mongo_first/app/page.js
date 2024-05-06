"use client";

import Image from "next/image";
import { useState, useEffect  } from "react";
import * as Realm from "realm-web"


export default function Home() {
  const [products, setProducts] = useState([]);


  const doSomething = async() =>{
 
    const REALM_APP_ID = "application-0-ibimsqa";
    const app = new Realm.App({id: REALM_APP_ID});
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials)
      const allProducts = await user.functions.getAllProducts();
      setProducts(allProducts)
      console.log(allProducts)
    } catch (error) {
      console.log(error)
    }
    console.log('completed')
  }

  useEffect(  () => {
    
doSomething()
  }, [])
  



  return (
    <main>

      { products && products.map(product => {
        return <p key={product._id}> {product.name}</p>
      })}

    </main>
  );
}
