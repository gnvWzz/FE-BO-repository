import React,{ useState, useEffect } from "react";
import axios,{HttpStatusCode} from "axios";
import {useNavigate} from 'react-router-dom'
import ReactPaginate from 'react-paginate';
// import "../../css/Product.css"

function Product() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    // const [pageSize, setPageSize] = useState(3);

    useEffect(() => {
        loadProductList();
    },[currentPage])
    // },[currentPage, pageSize])

    const loadProductList = async () => {
        try{
            const res = await axios .get(`http://localhost:8080/bo/product/list?page=${currentPage}`)
            // const res = await axios .get(`http://localhost:8080/bo/product/list?page=${currentPage}&size=${pageSize}`)
            console.log("API response DATA: " + res.data);
            if (res.status === HttpStatusCode.Ok){
                setProducts(res.data.content);
                setPageCount(res.data.totalPages);
            }
        } catch(err){
            throw err;
        }
    }

//   console.log("List products" + JSON.stringify(products))
    const handlePageChange = (data) => {
        setCurrentPage(data.selected);
        console.log("Page Change DATA: " + JSON.stringify(data))
    };
   

    return (

    <div id="invoice"  className='main-container'>
           <hr/>

    <div className="invoice overflow-auto">
        <div style={{minWidth: "600px"}}>
            <header>
                <div className="row">
                    <div className="col">
                        <button onClick={() => {navigate("/product/add")}}>CREATE PRODUCT</button>
                    </div>
                    <div className="col company-details">
                        <h2 className="name">
                            <a target="_blank" href="https://lobianijs.com">
                            Arboshiki
                            </a>
                        </h2>
                        <div>455 Foggy Heights, AZ 85004, US</div>
                        <div>(123) 456-789</div>
                        <div>company@example.com</div>
                    </div>
                </div>
            </header>
            <main>
                <div className="row contacts">
                    <div className="col invoice-to">
                        <div className="text-gray-light">INVOICE TO:</div>
                        <h2 className="to">John Doe</h2>
                        <div className="address">796 Silver Harbour, TX 79273, US</div>
                        <div className="email"><a href="mailto:john@example.com">john@example.com</a></div>
                    </div>
                    <div className="col invoice-details">
                        <h1 className="invoice-id">INVOICE 3-2-1</h1>
                        <div className="date">Date of Invoice: 01/10/2018</div>
                        <div className="date">Due Date: 30/10/2018</div>
                    </div>
                </div>
                
                <h1>Products</h1>

                <table border="0" cellSpacing="0" cellPadding="0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th className="text-left">NAME</th>
                            <th className="text-left">CATEGORY</th>
                            <th className="text-left">PRICE</th>
                            <th className="text-left">QUANTITY</th>
                            <th className="text-left">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.map((product,index) => (
                        <tr key={index}>
                            <td onClick={() => navigate(`/product/${product.id}`)}><img className="icon" src={product.icon} alt="Product Icon"/></td>
                            <td  className="text-left">{product.name}</td>
                            {/* <a href={`/manufacturer/${manufacturer.id}`}></a> */}
                            <td className="text-left unit">{product.category}</td>
                            <td className="text-left">{product.price}</td>
                            <td className="text-left unit">{product.quantity}</td>
                            <td className="total"></td>
                            </tr>))}
                        
                    </tbody>
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                    />
                    <tfoot>
                        <tr>
                            <td colSpan="2"></td>
                            <td colSpan="2">SUBTOTAL</td>
                            <td>$5,200.00</td>
                        </tr>
                        <tr>
                            <td colSpan="2"></td>
                            <td colSpan="2">TAX 25%</td>
                            <td>$1,300.00</td>
                        </tr>
                        <tr>
                            <td colSpan="2"></td>
                            <td colSpan="2">GRAND TOTAL</td>
                            <td>$6,500.00</td>
                        </tr>
                    </tfoot>
                </table>
                <div className="thanks">Thank you!</div>
                <div className="notices">
                    <div>NOTICE:</div>
                    <div className="notice">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div>
                </div>
            </main>
            <footer>
                Invoice was created on a computer and is valid without the signature and seal.
            </footer>
        </div>


        <div></div>
    </div>
</div>
    )
}

export default Product

    //                         <td>
    //               {/* <Link
    //                 classNameName="btn btn-primary mx-2"
    //                 to={`/view/${product.productId}`}>
    //                 View
    //               </Link> */}
    //               {/* <Link
    //                 classNameName="btn btn-outline-primary mx-2"
    //                 to={`/edit/${product.name}`}>
    //                 Edit
    //               </Link>
    //               <Link
    //                 classNameName="btn btn-danger mx-2"
    //                 to={`/delete/${product.name}`}>
    //                 Delete
    //               </Link> */}
    //             </td>

                        {/* <tr>
                            <td className="no">04</td>
                            <td className="text-left"><h3>
                                <a target="_blank" href="https://www.youtube.com/channel/UC_UMEcP_kF0z4E6KbxCpV1w">
                                Youtube channel
                                </a>
                                </h3>
                               <a target="_blank" href="https://www.youtube.com/channel/UC_UMEcP_kF0z4E6KbxCpV1w">
                                   Useful videos
                               </a> 
                               to improve your Javascript skills. Subscribe and stay tuned :)
                            </td>
                        </tr> */}