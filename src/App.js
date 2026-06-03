

import ProductList from "./ProductList";
import OrdersList from "./OrdersList";

function App() {
 
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "50px",
    }}
    >
     
      <div>
      <OrdersList />
      </div>
      <div>
        <ProductList />
      </div>
    
    </div>
  );
  }
export default App;