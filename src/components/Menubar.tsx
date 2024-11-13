
 type menuProp = {
    setMenu : any
 }
 
 function Menubar(props:menuProp) {

   return (
     <div className="flex shadow-sm h-10 p-2">
        <h1 onClick={()=> props?.setMenu("Shirt")}  className="ml-48 cursor-pointer">Shirt</h1>
        <h1 onClick={()=> props?.setMenu("Jacket")} className="ml-5 cursor-pointer">Jacket</h1>
        <h1 onClick={()=> props?.setMenu("phone")}  className="ml-5 cursor-pointer">Mobile phones</h1>
        <h1 onClick={()=> props?.setMenu("House")} className="ml-5 cursor-pointer">House</h1>
        <h1 onClick={()=> props?.setMenu("Scooter")} className="ml-5 cursor-pointer">Scooter</h1>
        <h1 onClick={()=> props?.setMenu("Bike")} className="ml-5 cursor-pointer">Bike</h1>
        <h1 onClick={()=> props?.setMenu("Apartment")} className="ml-5 cursor-pointer">Apartment</h1>


     </div>
   )
 }
 
 export default Menubar