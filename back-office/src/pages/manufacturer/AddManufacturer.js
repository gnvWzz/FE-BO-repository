import React, {useState} from 'react'
import axios,{HttpStatusCode} from 'axios';
import '../../css/AddManufacturer.css'


export default function AddManufacturer() {
    const [manufacturer, setManufacturer] = useState({});
    const [message, setMessage] = useState(null);
    const handleInputValue = (e) => {
        setManufacturer({...manufacturer,[e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const res = await axios
            .post("http://localhost:8080/manufacturer/save", manufacturer)
            if(res.status === HttpStatusCode.Ok) {
                setMessage("Tạo mới thành công");
                setManufacturer({})
            }
        } catch(err){
            throw err;
        }
    }
// Để dọn sạch các ô input sau khi gửi submit, có thể gán giá trị rỗng cho các thuộc tính value của các input
    return (
        <div className='main-container'>
            <div>
                <h1>CREATE MANUFACTURER</h1>
            </div>
            <form onSubmit={handleSubmit}>
                    <table>
                        <tr>
                            <td>Name</td>
                            <td><input name='name' value={manufacturer.name || ''} onChange={handleInputValue}/></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td><input name='email' value={manufacturer.email || ''} onChange={handleInputValue}/></td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td><input name='address' value={manufacturer.address || ''} onChange={handleInputValue}/></td>
                        </tr>
                        <tr>
                            <td>Mobile</td>
                            <td><input name='mobile' value={manufacturer.mobile || ''} onChange={handleInputValue}/></td>
                        </tr>
                        <tr>
                            <td>Landline</td>
                            <td><input name='landline' value={manufacturer.landline || ''} onChange={handleInputValue}/></td>
                        </tr>
                        <tr>
                            <td>Field</td>
                            <td><input name='field' value={manufacturer.field || ''} onChange={handleInputValue}/></td>
                        </tr>
                        <tr>
                            <td>SignUp Date</td>
                            <td><input name='signup' value={manufacturer.signup || ''} onChange={handleInputValue}/></td>
                        </tr>
                        <tr>
                            <td>Website</td>
                            <td><input name='website' value={manufacturer.website || ''} onChange={handleInputValue}/></td>
                        </tr>
                        <tr>
                            <td>Icon</td>
                            <td><input name='icon' value={manufacturer.icon || ''} onChange={handleInputValue}/></td>
                        </tr>
                        
                    </table>
                    <button type='submit' style={{marginTop: "1em", borderRadius: "0.5em"}}>Save</button>
            </form>
            {message && <div>{message}</div>}
        </div>
        
    )
}

