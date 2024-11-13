import { useLocation } from "react-router-dom"

function Details() {
  const location = useLocation();
  const { data } = location?.state;
  
  return (
    <div className="flex flex-col md:flex-row p-5">
      {/* Product Image */}
      <img 
        className="w-full md:w-1/2 lg:w-1/3 h-auto object-cover mb-5 md:mb-0" 
        src={data?.ImageUrl} 
        alt="Product" 
      />

      {/* Product Details */}
      <div className="md:ml-10 text-center md:text-left">
        <h1 className="font-bold text-3xl">$ {data?.price}</h1>
        <h1 className="mt-5 text-lg">
          <span className="font-semibold">Category:</span> {data?.category}
        </h1>
        <h1 className="mt-5 text-lg">
          <span className="font-semibold">Product:</span> {data?.productName}
        </h1>
        <h1 className="mt-5 text-lg">
          <span className="font-semibold">Contact Seller:</span> {data?.phoneNumber}
        </h1>
        <h1 className="mt-5 text-lg">
          <span className="font-semibold">Description:</span> {data?.description}
        </h1>
      </div>
    </div>
  );
}

export default Details;
