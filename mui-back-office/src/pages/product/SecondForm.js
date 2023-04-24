import axios from 'axios';
import { useEffect, useState, } from 'react';
import { useLocation, useNavigate, useParams} from 'react-router-dom';
import { Box, Button, TextField, InputLabel, MenuItem, FormControl, Select} from "@mui/material";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export default function SecondForm() {
    const {accountUsername} = useParams();
    const [product, setProduct] = useState({});
    const [image, setImage] = useState("");
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [imgObjList, setImgObjList] = useState([])
    const navigate = useNavigate();
    const { state } = useLocation();
    console.log(state)
    const [productDetail, setProductDetail] = useState({
        serialNumber: "",
        briefDescription: "",
        fullDescription: "",
        weight: 0,
        material: "",
        cpu: "",
        gpu: "",
        ram: "",
        storageDrive: "",
        display: "",
        size_color_img_quantity: ""
    })

    const [sciq, setSCIQ] = useState({
        size: "",
        color: "",
        quantity: Number,
        img: []
    })

    let isStop = false;

    //Initializer
    useEffect(() => {
        if (!isStop) {
            setProduct(state.passProduct);
            setColors(state.colors);
            setSizes(state.sizes);
            setSCIQ({
                ...sciq,
                size: state.sizes[0],
                color: state.colors[0]
            })
        }

        return () => {
            isStop = true
        }
    }, [])
    //

    //Pass product to prices setting
    const passProductToPricesSetting = () => {
        navigate(`/store/thirdForm/${accountUsername}`, { state: { product } })
    }
    //

    //Reset all states and temp lists in this component
    function resetAllData() {
        setProduct({ ...product, productSFDetail: [] })

        setProductDetail({
            ...productDetail,
            serialNumber: "",
            briefDescription: "",
            fullDescription: "",
            weight: 0,
            material: "",
            cpu: "",
            gpu: "",
            ram: "",
            storageDrive: "",
            display: "",
            size_color_img_quantity: ""
        })

        setSCIQ({
            size: "",
            color: "",
            quantity: Number,
            img: []
        })

        window.location.reload()
    }
    //

    //Color-choosing
    const showColorsDropdown = () => {
        return (
            <>
                <select onChange={chooseColorForProductDetail}>
                    {colors.map((color) => (
                        <option value={color}>{color}</option>
                    ))}
                </select>
            </>
        )
    }

    const chooseColorForProductDetail = (e) => {
        setSCIQ({ ...sciq, color: e.target.value });
    }
    //

    //Set stock quantity for this product detail
    const chooseStock = (e) => {
        setSCIQ({ ...sciq, quantity: parseInt(e.target.value) })
    }
    //

    //Size-choosing
    const showSizesDropdown = () => {
        return (
            <>
                <select onChange={chooseSizeForProductDetail}>
                    {sizes.map((size) => (
                        <option value={size}>{size}</option>
                    ))}
                </select>
            </>
        )
    }

    const chooseSizeForProductDetail = (e) => {
        setSCIQ({ ...sciq, size: e.target.value });
    }
    //

    //Create a new image
    const createImage = (e) => {
        setImage(e.target.value);
    }

    //Add images to image objects list
    const addToImgObjList = (e) => {
        if (imgObjList.length === 0) {
            setImgObjList([...imgObjList, {
                id: 0,
                url: image
            }])
        } else {
            setImgObjList([...imgObjList, {
                id: imgObjList.length,
                url: image
            }])
        }
    }

    //Show SCIQ
    const showSCIQ = () => {
        console.log(sciq)
    }
    //

    //Show current imgObjList
    const showImgObjList = () => {
        console.log(imgObjList)
    }

    //Delete this image
    const deleteThisImage = (e) => {
        const tempList = imgObjList.filter((ele) => ele.id != e.target.value);
        setImgObjList(tempList);
    }
    //

    //Decide to set img list in sciq state by imgObjList
    const setImgListOfSciq = () => {
        setSCIQ({ ...sciq, img: imgObjList });
    }
    //

    //Set size_color_image_quantity of product detail
    const setSciqOfProductDetail = () => {
        setProductDetail({ ...productDetail, size_color_img_quantity: JSON.stringify(sciq) });
        setSCIQ({
            ...sciq,
            quantity: Number,
            img: []
        })
    }
    //

    //Handle other input changes of product detail except size_color_img_quantity
    const handleChangeInputForProductDetail = (e) => {
        setProductDetail({ ...productDetail, [e.target.name]: e.target.value });
    }

    const handleInputWeight = (e) => {
        const input = e.target.value
        console.log(e.target.value)
        productDetail.weight = Number(input);
        // setProductDetail({ ...productDetail, weight: Number(input) })
    }
    //

    //Push current product detail to temp product details list
    const showCurrentProductDetail = () => {
        console.log(productDetail);
    }
    //

    //Set productSFDetail of product
    const setProductSFDetailOfProduct = () => {
        setProduct({ ...product, productSFDetailDtos: [...product.productSFDetailDtos, productDetail] });
        setProductDetail({
            ...productDetail, serialNumber: "",
            briefDescription: "",
            fullDescription: "",
            weight: 0,
            material: "",
            cpu: "",
            gpu: "",
            ram: "",
            storageDrive: "",
            display: "",
            size_color_img_quantity: ""
        })
        setImgObjList([])
    }
    //

    //Show current product
    const showCurrentProduct = () => {
        console.log(product);
    }
    //

    //Show current product JSON
    const showCurrentProductJSON = () => {
        console.log(JSON.stringify(product));
    }
    //

    const backToFirstForm = (e) => {
        navigate(`/store/product/${accountUsername}`);
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Create new product</h1>
            {/* <button type='button' className='mt-2' onClick={backToFirstForm}>Back to first form</button> */}
            <Button 
                startIcon={<KeyboardReturnIcon />}
                onClick={backToFirstForm} variant="contained" color="secondary" sx={{ width: '200px', height: '40px'}}>
                Back to first form
            </Button>
            <br />
            <h4>Press this button only for when you enter any wrong input and you want to reset all data for avoiding mistaken information</h4>
            <button type='button' className='btn btn-danger mt-2' onClick={resetAllData}>Reset all data</button>
            <br />
            <button type='button' className="btn btn-warning mt-2" onClick={showCurrentProduct}>Show current product</button>
            <br />
            <button type='button' className='btn btn-success mt-2' onClick={showCurrentProductJSON}>Show current product JSON</button>
            <br />
            <br />
            <h2>Product: </h2>
            <div className='product-creating-information'>
                <table>
                    <tr>
                        <th>
                            <h3>Name: </h3>
                        </th>
                        <td>
                            {product.name}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <h3>Package ID: </h3>
                        </th>
                        <td>
                            {product.packageId}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <h3>Category: </h3>
                        </th>
                        <td>
                            {product.category}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <h3>Manufacturer: </h3>
                        </th>
                        <td>
                            {product.manufacturer}
                        </td>
                    </tr>
                </table>
            </div>

            <br />
            <br />
            <hr />
            <h2>Please enter your basic product's details</h2>
            <br />
            <br />
            <h4>Serial number:</h4>
            <br />
            <input type='text' name="serialNumber" value={productDetail.serialNumber} onChange={handleChangeInputForProductDetail}></input>
            <br />
            <br />
            <h4>Brief description:</h4>
            <br />
            <input type='text' name="briefDescription" value={productDetail.briefDescription} onChange={handleChangeInputForProductDetail}></input>
            <br />
            <br />
            <h4>Full description:</h4>
            <br />
            <input type='text' name="fullDescription" value={productDetail.fullDescription} onChange={handleChangeInputForProductDetail}></input>
            <br />
            <br />
            <h4>Material:</h4>
            <br />
            <input type='text' name="material" value={productDetail.material} onChange={handleChangeInputForProductDetail}></input>
            <br />
            <br />
            <h4>Weight:</h4>
            <br />
            <input type='text' name="weight" onChange={handleInputWeight}></input>
            <br />
            <br />
            <h4>CPU:</h4>
            <br />
            <input type='text' name="cpu" value={productDetail.cpu} onChange={handleChangeInputForProductDetail}></input>
            <br />
            <br />
            <h4>GPU:</h4>
            <br />
            <input type='text' name="gpu" value={productDetail.gpu} onChange={handleChangeInputForProductDetail}></input>
            <br />
            <br />
            <h4>RAM:</h4>
            <br />
            <input type='text' name="ram" value={productDetail.ram} onChange={handleChangeInputForProductDetail}></input>
            <br />
            <br />
            <h4>Storage drive:</h4>
            <br />
            <input type='text' name="storageDrive" value={productDetail.storageDrive} onChange={handleChangeInputForProductDetail}></input>
            <br />
            <br />
            <h4>Display:</h4>
            <br />
            <input type='text' name="display" value={productDetail.display} onChange={handleChangeInputForProductDetail}></input>
            <br />
            <br />
            <hr />
            <h2>This is part for your product's variant input including sizes, colors, images and stocks for each product detail record in your database.</h2>
            <br />
            <br />
            <h3>Size: </h3>
            {showSizesDropdown()}
            <br />
            <br />
            <h3>Color: </h3>
            {showColorsDropdown()}
            <br />
            <br />
            <h3>Stock: </h3>
            <br />
            <input type='number' name='quantity' onChange={chooseStock}></input>
            <br />
            <br />
            <hr />
            <h3>Image List: </h3>
            <br />
            <div className='mb-5'>
                <table className='product-images-table'>
                    {imgObjList.map((i, index) => (
                        <tr>
                            <th>
                                <h4>Image {index + 1}</h4>
                            </th>
                            <td>
                                <img className='product-image-per-variant' src={i.url} alt='' height={"150px"}/>
                            </td>
                            <td>
                                <button type='button' className='btn btn-danger' value={i.id} onClick={deleteThisImage}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
            <input type='text' name='image' onChange={createImage}></input>
            <br />
            {/* <button type='button' className='btn btn-primary mt-2' onClick={showSCIQ}>Show current SCIQ</button>
            <br />
            <button type='button' className='btn btn-primary mt-2' onClick={showImgObjList}>Show current imgObjList</button>
            <br /> */}
            <button type='button' className='btn btn-primary mt-2' onClick={addToImgObjList}>Add to image objects lists</button>
            <br />
            <button type='button' className='btn btn-success mt-2' onClick={setImgListOfSciq}>Decide to finish this image list for this product's variant</button>
            <br />
            <br />
            <h3>When finish all variant's details, click this button to create this variant for your product</h3>
            <br />
            <button type='button' className='btn btn-success' onClick={setSciqOfProductDetail}>Finish this variant</button>
            <hr />
            {/* <h2>This section is for when you finish one product detail for your product</h2>
            <br />
            <h3>Click this button to push current product detail to a temp product details list. Then, you can continue to add new product details</h3>
            <br />
            <button type='button' className='btn btn-success' onClick={showCurrentProductDetail}>Show current product detail</button>
            <br />
            <br />
            <hr /> */}
            <h2>This section is for when you finish all your product details and variants respectively</h2>
            <br />
            <button type='button' className='btn btn-success' onClick={setProductSFDetailOfProduct}>Set product details for this current product</button>
            <hr />
            <h2>This section is for creating a new product to your database</h2>
            <br />
            {/* <button type='button' className='btn btn-success' onClick={createNewProduct}>Create new product</button> */}
            <br />
            <button type='button' className='btn btn-success' onClick={passProductToPricesSetting}>Create new product</button>
        </div>
    )
}