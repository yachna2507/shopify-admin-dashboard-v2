import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
const ProductList = () => {
const [products, setProducts] =
useState([]);
const [selectedProduct, setSelectedProduct] = useState(null);

const [search, setSearch] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const productsPerPage = 4;
 const [darkMode, setDarkMode]= useState(false);
  // load saved theme
  useEffect(() => {
    const saved= localStorage.getItem("theme");
    if (saved === "dark")
setDarkMode(true);
    }, []);
    //save item
    useEffect(() => {
      localStorage.setItem("theme",
        darkMode ? "dark" : "light");
      }, [darkMode]);
    const fetchProducts = async() => {
      try {
  const response = await
  axios
  .get("http://localhost:4000/products");
  console.log(response.data);
  setProducts(response.data);
    
} catch (error) {
  console.log(error);
  
}
    };
useEffect(() => {
  fetchProducts();
}, []);
const filteredProducts = products.filter((product) => 
product.title
.toLowerCase()
.includes(search.toLowerCase())
);



const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct-productsPerPage;
const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
const totalPages = Math.ceil(filteredProducts.length/productsPerPage);

const totalProducts= filteredProducts.length;
const totalInventory = filteredProducts.reduce((acc , product)=> acc + Number(product.quantity) , 0
);
const outOfStock = filteredProducts.filter((product) => product.quantity === 0).length;

//delete
const deleteProduct = async(id) => {
  try {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
if (!confirmDelete) {
  return;

}
    await axios.delete(`http://localhost:4000/products/${id}`);
    setProducts(products.filter((product) => product._id !== id
  )
);
  } catch (error) {
    console.log(error);
  
  }
};
const updateQuantity = async (id, quantity) => {
  try {
     await axios.put(`http://localhost:4000/products/${id}`,
      {
        quantity: Number(quantity)
      }
    );
    
    
  
  fetchProducts();
 
 } catch (error) {
    console.log(error);
    
  }
};

const updateStatus = async(id, newStatus) => {
  
  try {
    
    await axios.put(`http://localhost:4000/products/${id}`, {
      status: newStatus,
    });
    fetchProducts();
     } catch (error) {
    console.log(error);
  }
};



  return (
   <>
    <div 
    style={{
      background: darkMode ? "#121212" : "white",
      color: darkMode ?
      "white" : "black",
      minHeight: "100vh",
      padding: "20px" }}>
        
      <button onClick={() => setDarkMode(!darkMode)}
      style={{
        marginBottom: "20px",
        padding: "10px",
        cursor: "pointer",
      }}
      >{darkMode ? "Light Mode" : "Dark Mode"}</button>

  

  <div style={{
    background: "#4CAF50",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    minWidth: "100px",
  }}
  >
<h3>Total Products</h3>
<h2>{totalProducts}</h2>
  
</div>
<div style = {{
  background: "#2196F3",
  color: "white",
  padding: "20px",
  borderRadius: "10px",
  minWidth: "100px",
}}
>
  <h3>Total Inventory</h3>
  <h2>{totalInventory}</h2>
</div>
<div style={{
  background: "#f44336",
  color: "white",
  padding: "20px",
  borderRadius: "10px",
  minWidth: "100px",
}}
>
  <h3>Out Of Stock</h3>
 <h2>{outOfStock}</h2>
 </div>
 </div>
 <div>
       <input type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      style={{
        padding: "10px",
        width: "200px",
        marginBottom: "20px",
      }}
/>
      
      
      
        
    
      <h2>ProductList</h2>
      
      
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap:"20px",
        padding:"20px"
      }}>
        
        {currentProducts.map(product => (
          <div key={product._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              textAlign: "center"
            }}>
            
            <img src={product.image} alt="" width="100"
            style={{
              cursor: "pointer",
            }}
            onClick={() =>
              setSelectedProduct(product)
            }
            />
            <h3>{product.title}</h3>
            <p>Price: ₹ {product.price}</p>
            <p>Quantity:
              {product.quantity}
            </p>

            <select defaultValue={product.status || "pending"}
            onChange={(e) => 
              updateStatus(product._id, e.target.value)
            }
            >
              <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option></select>
            <br />
            <br />

<button onClick={() => updateQuantity(
            product._id,
            Number(product.quantity) + 1
          )} style={{
            background: "green",
            color: "white",
            border: "none" ,
            padding: "8px 12px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",

          }}
           >
             + 
          </button>

          <span style={{
            minWidth: "40px",
            textAlign: "center",
            fontWeight: "bold",
          }}
          >
           
            {product.quantity}
        
            </span>

          <button onClick={() => updateQuantity(
            product._id,
            Math.max(product.quantity - 1, 0)
          )}
          style={{
            background: "orange",
            color: "white",
            border: "none",
            width: "30px",
            height: "30px",
            padding: "8px, 12px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          > 
          - 
          </button>
          
     
          <button onClick={() =>
            deleteProduct(products._id)
          }
          style={{
            background: "red",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
    >Delete</button>

</div>
            
        ))}
        </div>
        </div>
        
        <div style={{
    marginTop: "20px",
    display: "flex",
    gap: "10px",
  }}
>
  {[...Array(totalPages)].map((_, index) => (
    <button 
    key={index} onClick={() => setCurrentPage(index + 1)}
    
    style={{
padding:"10px 12px",
background: currentPage === index + 1
? "black"
: "gray",
color: "white",
border: "none",
cursor: "pointer",
    }}
    >
      {index + 1}
    </button>
  ))}
</div>
        
     
        
            
     
       
      
      
      {selectedProduct && (
        <div className="image-modal">
          <div className="modal-content">
            <button onClick={() =>
              setSelectedProduct(null)
            }
            >
              close
            </button>
            <img src={selectedProduct.image}
            alt=""
            className="popup-image"
            />
            <h2>{selectedProduct.title}</h2>
            <p>Price: ₹{selectedProduct.price}</p>
            <p>Quantity:
              {selectedProduct.quantity}
            </p>
            <p>Status:
              {selectedProduct.status}
            </p>
            <p>Shopify Id:
              {selectedProduct.shopifyId}
            </p>
          
     
      </div>
          </div>
      )};

</>       
          
  );
  
    }
        export default ProductList;