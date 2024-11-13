import { Link } from "react-router-dom"
import { collection ,  getDocs } from 'firebase/firestore'
import { firestore } from '../firebase'
import { useEffect, useState } from "react"

type productsProp = {
    
    search:any,
    menu:any
}

function Home(props:productsProp) {

  const [products,setProducts] = useState<any[]>([]);

  //fetch products
  const fetchProducts = async()=> {
    try {
      
      const querySnapshot = await getDocs(collection(firestore,"products"));
      const productList : any[] = [];

      querySnapshot.forEach((doc)=> {
        productList.push({ id:doc.id, ...doc.data() })
      })

      setProducts(productList)

    } catch (error) {
      console.error(`error in fetching data ${error}`);
      
    }
  }

  useEffect(()=>{
    fetchProducts();
  },[])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
        {products.filter((data:any)=> data?.productName?.includes(props?.search? props?.search : props?.menu)).map((data:any)=> {
            return <Link to='/details' state={{data:data}} > <div  className="border border-spacing-1 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img src={ data?.ImageUrl } alt="product img" className="w-full h-48 object-cover" /> 
                <h1 className="font-bold text-xl mt-2">${data?.price}</h1>
                <h1 className="text-lg">{data?.productName}</h1>
                <h1 className="text-gray-600">{data?.category}</h1>
            </div>
             </Link>
        })}
    </div>
  )
}

export default Home