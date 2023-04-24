import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../components/URLS/url';
import SaveIcon from '@mui/icons-material/Save';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { Button} from "@mui/material";
import '../../components/ProductInfo.css'

export default function ThirdForm() {
    const {accountUsername} = useParams();
    const { state } = useLocation();
    const [product, setProduct] = useState({});
    const [priceList, setPriceList] = useState([]);
    const [priceObj, setPriceObj] = useState({
        priceId: 0,
        fromQuantity: 0,
        toQuantity: 0,
        price: 0
    });
    const [tempPricesList, setTempPricesList] = useState([]);
    let isStop = false;
    const url = API_URL;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isStop) {
            setProduct(state.product);
        }

        return () => {
            isStop = true;
        };
    }, [])

    const resetAllData = () => {
        setTempPricesList([]);
        setPriceObj({
            priceId: 0,
            fromQuantity: 0,
            toQuantity: 0,
            price: 0
        })
        setPriceList([])
        setProduct({ ...product, prices: [] })
    }

    const handleInputPriceObj = (e) => {
        setPriceObj({ ...priceObj, [e.target.name]: Number(e.target.value) })
    }

    const addToTempPricesList = () => {
        if (tempPricesList.length === 0) {
            if (priceObj.toQuantity === 0) {
                priceObj.toQuantity = Number.MAX_SAFE_INTEGER;
                priceObj.priceId = tempPricesList.length
                // setPriceObj({...priceObj})
                setTempPricesList([...tempPricesList, priceObj]);
                setPriceObj({
                    ...priceObj,
                    fromQuantity: 0,
                    toQuantity: 0,
                    price: 0
                })
            } else {
                priceObj.priceId = tempPricesList.length
                // setPriceObj({...priceObj})
                setTempPricesList([...tempPricesList, priceObj]);
                setPriceObj({
                    ...priceObj,
                    fromQuantity: 0,
                    toQuantity: 0,
                    price: 0
                })
            }
        } else {
            if (priceObj.toQuantity === 0) {
                priceObj.toQuantity = Number.MAX_SAFE_INTEGER;
                priceObj.priceId = tempPricesList.length
                // setPriceObj({...priceObj})
                setTempPricesList([...tempPricesList, priceObj]);
                setPriceObj({
                    ...priceObj,
                    fromQuantity: 0,
                    toQuantity: 0,
                    price: 0
                })
            } else {
                priceObj.priceId = tempPricesList.length
                // setPriceObj({...priceObj})
                setTempPricesList([...tempPricesList, priceObj]);
                setPriceObj({
                    ...priceObj,
                    fromQuantity: 0,
                    toQuantity: 0,
                    price: 0
                })
            }
        }
    }

    const removeThisPrice = (e) => {
        const temps = tempPricesList.filter((ele) => ele.priceId != e.target.value);
        setTempPricesList(temps);
    }

    // const editThisPrice = (e) => {

    // }

    const addPriceObjToOfficialPricesList = (e) => {
        setPriceList(tempPricesList)
    }

    const createPricesListForCurrentProduct = (e) => {
        setProduct({ ...product, priceListDtos: priceList })
    }

    const saveProductToDatabase = async (e) => {
        await axios({
            headers: {
                Authorization: `Bearer ${localStorage.getItem("tokenOwner")}`,
                "Content-Type": "application/json",
            },
            url: `${url}/product/new-product/`,
            method: "POST",
            data: product
        })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
                throw err;
            })

        resetAllData();
        navigate(`/store/product/${accountUsername}`);
    }

    const showPricesTable = (e) => {
        return (
            <div className='marginlr'>
                <tr>
                    <th>
                        Price ID
                    </th>
                    <th>
                        Price
                    </th>
                    <th>
                        From-quantity
                    </th>
                    <th>
                        To-quantity
                    </th>
                    <th>
                        Action
                    </th>
                </tr>
                {tempPricesList.map((element, index) => (
                    <tr>
                        <td>
                            <h5>Price {index + 1}</h5>
                        </td>
                        <td>
                            <h5>{element.price}</h5>
                        </td>
                        <td>
                            <h5>{element.fromQuantity}</h5>
                        </td>
                        <td>
                            <h5>{element.toQuantity}</h5>
                        </td>
                        <td>
                            <button className='btn btn-primary' onClick={removeThisPrice} type="button" value={element.priceId}>Remove</button>
                            {/* <button className='btn btn-primary ml-2' onClick={editThisPrice} type="button" value={element.priceId}>Edit</button> */}
                        </td>
                    </tr>
                ))}
            </div>
        )
    }

    // const showCurrentProduct = (e) => {
    //     console.log(product)
    // }

    // const showCurrentTempPricesList = () => {
    //     console.log(tempPricesList);
    // }

    // const showCurrentJSONProduct = () => {
    //     console.log(JSON.stringify(product))
    // }

    return (
        <div style={{ textAlign: "center" }}>
            <h1 style={{ textAlign: 'center' }}>Add prices list for your product</h1>
            <Button
                type="button"
                variant="contained"
                color="warning"
                onClick={resetAllData}
                sx={{ width: "180px", height: "40px"}}
                startIcon={<ClearAllIcon />}
              >
                Reset all data
              </Button>
            {/* <button type='button' className='btn btn-warning mt-3 ml-2' onClick={showCurrentProduct}>Show current product</button>
            <button type='button' className='btn btn-warning mt-3 ml-2' onClick={showCurrentTempPricesList}>Show current temp prices list</button> */}
            {/* <button type='button' className='btn btn-warning mt-3 ml-2' onClick={showCurrentJSONProduct}>Show current JSON product</button> */}
            <hr />
            <h3 className='marginlr'>First, enter the from-quantity for your price discount limit</h3>
            <input className='mt-2' type='text' name='fromQuantity' onChange={handleInputPriceObj} />
            <h3 className='marginlr'>Second, enter the to-quantity for your price discount limit</h3>
            <input className='mt-2' type='text' name='toQuantity' onChange={handleInputPriceObj} />
            <h3 className='marginlr'>Finally, enter the price for discount limit</h3>
            <input className='mt-2' type='text' name='price' onChange={handleInputPriceObj} />
            <hr />
            {/* <h3 className='marginlr'>When finishing the above information, create price object and add it to a temp product prices list.</h3> */}
            <button type='button' onClick={addToTempPricesList} className='btn btn-primary mt-2'>Create new price object</button>
            <table className='prices-information mt-2'>
                {showPricesTable()}
            </table>
            <h3 className='marginlr'>If this temp product prices list is done, you can press this button to finish current price object</h3>
            <button type='button' onClick={addPriceObjToOfficialPricesList} className='btn btn-success mt-2'>Set temp prices list to official prices list</button>
            <hr />
            <h3 className='marginlr'>This section is for finalizing your prices list of your product</h3>
            <button className='btn btn-warning mt-2' type='button' onClick={createPricesListForCurrentProduct}>Confirm current prices list</button>
            <hr />
            
            <Button
                type="button"
                variant="contained"
                color="info"
                onClick={saveProductToDatabase}
                sx={{ width: "150px", height: "40px", mb: "20px"}}
                startIcon={<SaveIcon />}
              >
                Save product
              </Button>
        </div>
    )
}