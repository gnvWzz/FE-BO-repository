import React, {useState, useEffect} from 'react'
import axios,{HttpStatusCode} from 'axios'
import {useNavigate} from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import '../../css/Manufacturer.css'

export default function Manufacturer() {
    const [manufacturers, setManufacturers] = useState([]);
    const navigate = useNavigate();
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        loadManufacturerList()
    },[currentPage])

    const loadManufacturerList = async () => {
        try {
          const res = await axios.get(`http://localhost:8080/manufacturer/list?page=${currentPage}`);
        //   console.log(res.status);
          console.log(res.data);
          if (res.status === HttpStatusCode.Ok) {
            setManufacturers(res.data.content);
            setPageCount(res.data.totalPages)
          }
        } catch (err) {
          throw err;
        }
      };
    //   console.log("List manufacturers" + JSON.stringify(manufacturers))

    const handlePageChange = (data) => {
        setCurrentPage(data.selected);
        console.log("Page Change DATA: " + JSON.stringify(data))
    };

    return (
        <div id="invoice" className='main-container'>
           <hr/>

    <div className="invoice overflow-auto">
        <div style={{minWidth: "600px"}}>
            <header>
                <div className="row">
                    <div className="col">
                        <button onClick={() => {navigate("/manufacturer/add")}}>CREATE MANUFACTURER</button>
                    </div>
                    <div className="col company-details">
                        <h2 className="name">
                            <a href="https://lobianijs.com">
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

                <h1>Manufacturers</h1>

                <table border="0" cellSpacing="0" cellPadding="0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th className="text-left">NAME</th>
                            <th className="text-left">LANDLINE</th>
                            <th className="text-left">EMAIL</th>
                            <th className="text-left">ADDRESS</th>
                            <th className="text-left">FIELD</th>
                            <th className="text-left">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                    {manufacturers.map(manufacturer => (
                        <tr key={manufacturer.id}>
                            <td onClick={() => navigate(`/manufacturer/${manufacturer.id}`)}><img className="icon" src={manufacturer.icon} alt="Manufacturer Icon"/></td>
                            <td  className="text-left" >{manufacturer.name}</td>
                            {/* <a href={`/manufacturer/${manufacturer.id}`}></a> */}
                            <td className="text-left unit">{manufacturer.landline}</td>
                            <td className="text-left">{manufacturer.email}</td>
                            <td className="text-left unit">{manufacturer.address}</td>
                            <td className="text-left">{manufacturer.field}</td>
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

 
