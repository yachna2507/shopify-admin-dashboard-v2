
import React,
 { 
    useEffect,
     useState 
    } 
    from "react";
import axios from "axios";
const OrdersList = () => {
    const [Orders, setOrders] = useState([]);
    const fetchOrders = async() => {
        try {
            const response = await axios.get(
                "http://localhost:4000/sync-orders"
            );
            console.log(response.data);
            setOrders(response.data);
        } catch(error) {
            console.log(error);            
        }
    };
    useEffect(() => {
        fetchOrders();
    }, []);
    return (
        <div>
            <h2>Shopify Orders</h2>
            <table border="1" cellPadding="10">
                <thead>
                     <tr>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Total Price</th>
                        <th>Status</th>
                    </tr></thead>
                    <tbody>
                        {Orders.map((order) => (
                            <tr key={order.id}>
                                <td> {
                                order.customer || "guest"
                                
}
</td>
<td>
    {order.email}
</td>
<td>
    ₹ {order.totalPrice || 0}
</td>
<td>
    <span style={{
        padding:"5px 10px",
        borderRadius:"5px",
        background: order.financialStatus === "paid"
        ? "green"
        : "orange",
        color:"white",
    }}
    >
    {
        order.financialStatus
    }
    </span>
</td>
                            </tr>
                       ))}
                    </tbody>
            </table>
        </div>
    );
};
export default OrdersList;