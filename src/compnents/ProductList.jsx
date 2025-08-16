import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";


 export default  function ProductList() {
    const {products} = useContext(ProductContext)
  return (
    <div>
        <h1>all products</h1>
        <center>
            {products.map(p=>(
                <div key={p.id}>
                    <img src={p.image} width={"500"}/>
                    <h1>
                        {p.title}-- ${p.price}
                    </h1>

                </div>
            ))}
        </center>
    </div>
  )
}

