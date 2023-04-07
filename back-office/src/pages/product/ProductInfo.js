import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios,{HttpStatusCode} from 'axios';
import {FcEditImage} from 'react-icons/fc'

function ProductInfo() {
    const [product, setProduct] = useState({});
    const {productId} = useParams();

    useEffect(() => {
        loadProduct()
    },[])

    const loadProduct = async () => {
        try {
          const res = await axios.get(`http://localhost:8080/bo/product/${productId}`);
          console.log(res.data);
          if (res.status === HttpStatusCode.Ok) {
            setProduct(res.data);
          }
        } catch (err) {
          throw err;
        }
      };


    return (
        <div className='main-container'>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >
   
          <div className="panel panel-info">
            
            <div className="panel-body">
              <div className="row">
                <div className="col-md-3 col-lg-3 " align="center">
                    <img alt="Product Pic" src={product.icon} className="img-circle img-responsive" style={{maxWidth: "100%", height: "auto"}}/>
                </div>
                
                <div className=" col-md-9 col-lg-9 "> 
                  <table className="table table-user-information">
                  
                    <tbody>
                      <tr style={{backgroundColor: "rgb(166, 239, 248)"}}>
                        <td>
                          <h4 className="panel-title">{product.name}</h4>
                        </td>
                        <td></td>                        
                      </tr>

                      <tr>
                        <td>Id</td>
                        <td>{product.id}</td>
                      </tr>
                      <tr>
                        <td>Serial Number</td>
                        <td>{product.serialNumber}</td>
                      </tr>
                      <tr>
                        <td>Category</td>
                        <td>{product.category}</td>
                      </tr>
                      <tr>
                        <td>Price</td>
                        <td>{product.price}</td>
                      </tr>
                      <tr>
                        <td>Quantity</td>
                        <td>{product.quantity}</td>
                      </tr>
                      <tr>
                        <td>Size</td>
                        <td>{product.size}</td>
                      </tr>
                      <tr>
                        <td>Color</td>
                        <td>{product.color}</td>
                      </tr>
                      <tr>
                        <td>Weight</td>
                        <td>{product.weight}</td>
                      </tr>
                      <tr>
                        <td>Material</td>
                        <td>{product.material}</td>
                      </tr>
                      <tr>
                        <td>Brief Description</td>
                        <td>{product.briefDescription}</td>
                      </tr>
                      <tr>
                        <td>Full Description</td>
                        <td>{product.fullDescription}</td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>{product.status}</td>
                      </tr>
                      <tr>
                        <td>Manufacturer</td>
                        <td>
                          {product.manufacturerDetailDtos.map(manufacturer =>(
                            <ul>
                              <li>{manufacturer.manufacturerId}</li>
                            </ul>
                          ))


                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <a href="#" className="btn btn-primary">My Sales Performance</a>
                  <a href="#" className="btn btn-primary">Team Sales Performance</a>
                </div>
              </div>
            </div>
                 <div className="panel-footer">
                        <span className="pull-right">
                            <div classNameName='icon' style={{textAlign: "right"}}><FcEditImage/></div>
                        </span>
                    </div>
            
          </div>
        </div>
      </div>
    )
}

export default ProductInfo
