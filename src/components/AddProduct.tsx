 import React,{useState} from "react";
 import { useNavigate } from "react-router-dom";
 import { collection, addDoc } from "firebase/firestore";
 import { db ,storage } from "../firebase";
 import { ref ,uploadBytes ,  getDownloadURL } from "firebase/storage"
 

 interface Product {

    productName: string;
    category   : string;
    phoneNumber: string;
    price      : number;
    description: string;
    image      : File | null;
        
    }

    const AddProduct: React.FC = () => {

        const [productData, setProductData] = useState<Product>({
            productName : '',
            category    : '',
            phoneNumber : '',
            price       : 0,
            description : '',
            image       : null

        });
    
    const [uploading, setUploading] = useState(false)
    const navigate = useNavigate()

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const {name,value} = e.target;
        setProductData({
            ...productData,
            [name]:value,
        })

    }

    const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
        if(e.target.files && e.target.files.length > 0){
            setProductData({
                ...productData,
                image:e.target.files[0]
            });
        }
    }

    const handleSubmit  = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!productData.image) {
            alert("Please upload an image")
            return
        }
        
        try {

            setUploading(true)
            const imageRef = ref(storage,`products/${productData.image.name}`);

            await uploadBytes(imageRef,productData.image)

            const imageUrl = await getDownloadURL(imageRef)
            
            await addDoc(collection(db,"products"),{
                productName : productData.productName,
                category : productData.category,
                phoneNumber: productData.phoneNumber,
                price : productData.price,
                description : productData.description,
                ImageUrl : imageUrl
            })
            console.log("product added successfully")
            navigate('/')

        } catch (error) {
            console.log("Error adding product" , error);
            
        } finally{
            setUploading(false)
        }
        
    }
    

    const goHome = ()=> {
      navigate('/')
    }


    return (
        <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center ">Add Product</h1>
            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
                        Product Name
                    </label>
                    <input type="text" id="productName" name="productName" value={productData.productName} 
                           onChange={handleInputChange} placeholder="Enter product name"
                           className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                </div>

                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
                        Category
                    </label>
                    <input type="text" id="category" name="category" value={productData.category} 
                        onChange={handleInputChange} placeholder="Enter Category" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>

                <div className="mb-4">

                    <label htmlFor="Phone number" className="block text-gray-700 text-sm font-bold mb-2">
                        Phone Number
                    </label>
                    <input type="text" id="phoneNumber" name="phoneNumber" value={productData.phoneNumber} 
                       onChange={handleInputChange} placeholder="Enter Phone number" className="w-full px-3 py-2 border border-y-gray-300 rounded-md" />

                </div>


                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={productData.price}
                        onChange={handleInputChange}
                        placeholder="Enter price"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
              </div>


            <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        value={productData.description}
                        onChange={handleInputChange}
                        placeholder="Enter product description"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
           </div>

           <div>
                    <label className="block font-semibold">Product Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        
                    />
          </div>

          

           <div className="text-center mt-2">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700">
                    {uploading ? "Uploading..." : "Add Product"}
                </button>

                <button onClick={goHome}  className=" ml-3 px-4 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-blue-700">
                    Back to Home
                </button>
           </div>


         </form>


        </div>
    )

}

  export default AddProduct;
 