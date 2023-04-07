import React, {useState} from 'react'
import axios,{HttpStatusCode} from 'axios';
// import '../../css/AddManufacturer.css'

export default function AddProduct() {
    const [product, setProduct] = useState({});
    const [message, setMessage] = useState(null);
    const handleInputValue = (e) => {
        setProduct({...product,[e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const res = await axios
            .post("http://localhost:8080/bo/product/save", product)
            if(res.status === HttpStatusCode.Ok) {
                setMessage("Tạo mới thành công");
                setProduct({})
            }
        } catch(err){
            throw err;
        }
    }

    return (
        <div className='main-container'>
            <div>
                <h1>CREATE PRODUCT</h1>
            </div>
            <form onSubmit={handleSubmit}>
                    <table>
                        <tr>
                            <td>Serial Number</td>
                            <td><input name='serialNumber' value={product.serialNumber || ''} onChange={handleInputValue}/></td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td><input name='name' value={product.name || ''} onChange={handleInputValue}/></td>
                        </tr>
                        <tr>
                            <td>Category</td>
                            <td><input name='category' value={product.category || ''} onChange={handleInputValue}/></td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td><input name='price' value={product.price|| ''} onChange={handleInputValue}/></td>
                        </tr>
                        <tr>
                            <td>Size</td>
                            <td><input name='size' value={product.size || ''} onChange={handleInputValue}/></td>
                        </tr>
                        <tr>
                            <td>Color</td>
                            <td><input name='color' value={product.color || ''} onChange={handleInputValue}/></td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td><input name='weight' value={product.weight || ''} onChange={handleInputValue}/></td>
                        </tr>
                        <tr>
                            <td>Material</td>
                            <td><input name='material' value={product.material || ''} onChange={handleInputValue}/></td>
                        </tr>
                        <tr>
                            <td>Quantity</td>
                            <td><input name='quantity' value={product.quantity || ''} onChange={handleInputValue}/></td>
                        </tr>
                        <tr>
                            <td>Icon</td>
                            <td><input name='icon' value={product.icon || ''} onChange={handleInputValue}/></td>
                        </tr>
                        <tr>
                            <td>Brief Description</td>
                            <td><input name='briefDescription' value={product.briefDescription || ''} onChange={handleInputValue}/></td>
                        </tr>
                        <tr>
                            <td>Full Description</td>
                            <td><input name='fullDescription' value={product.fullDescription || ''} onChange={handleInputValue}/></td>
                        </tr>
                        <tr>
                            <td>Manufacturer Id</td>
                            <td><input name='manufacturerId' value={product.manufacturerId || ''} onChange={handleInputValue}/></td>
                        </tr>
                    </table>
                    <button type='submit' style={{marginTop: "1em", borderRadius: "0.5em"}}>Save</button>
            </form>
            {message && <div>{message}</div>}
        </div>
    )
}
