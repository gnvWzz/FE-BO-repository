import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios,{HttpStatusCode} from 'axios';
import {FcEditImage} from 'react-icons/fc'

export default function ManufacturerInfo() {
    const [manufacturer, setManufacturer] = useState({})
    const {manufacturerId} = useParams();

    useEffect(() => {
        loadManufacturer()
    },[])

    const loadManufacturer = async () => {
        try {
          const res = await axios.get(`http://localhost:8080/manufacturer/${manufacturerId}`);
        //   console.log(res.data);
          if (res.status === HttpStatusCode.Ok) {
            setManufacturer(res.data);
          }
        } catch (err) {
          throw err;
        }
      };

    return (
        <div className="main-container">
      {/* <div className="col-md-5  toppad  pull-right col-md-offset-3 ">
           <a href="edit.html" >Edit Profile</a>

        <a href="edit.html" >Logout</a>
       <br/>
<p className=" text-info">May 05,2014,03:00 pm </p>
      </div> */}
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >
   
   
          <div className="panel panel-info">
            
            <div className="panel-body">
              <div className="row">
                <div className="col-md-3 col-lg-3 " align="center">
                    <img alt="Manufacturer Pic" src={manufacturer.icon} className="img-circle img-responsive" style={{maxWidth: "100%", height: "auto"}}/>
                </div>
                
                <div className=" col-md-9 col-lg-9 "> 
                  <table className="table table-user-information">
                  
                    <tbody>
                      <tr style={{backgroundColor: "rgb(166, 239, 248)"}}>
                        <td>
                          <h4 className="panel-title">{manufacturer.name}</h4>
                        </td>
                        <td></td>                        
                      </tr>

                      <tr>
                        <td>Id:</td>
                        <td>{manufacturer.id}</td>
                      </tr>
                      <tr>
                        <td>Field</td>
                        <td>{manufacturer.field}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{manufacturer.email}</td>
                      </tr>
                   
                         <tr>
                        <td>Address</td>
                        <td>{manufacturer.address}</td>
                      </tr>
                        
                      <tr>
                        <td>SignUp Date</td>
                        <td>{manufacturer.signup}</td>
                      </tr>
                      <tr>
                        <td>Phone Number</td>
                        <td>{manufacturer.mobile}(Mobile) <br></br> {manufacturer.landline}(Landline)</td>
                      </tr>
                      <tr>
                        <td>Website</td>
                        <td><a href={manufacturer.website}>{manufacturer.website}</a></td>
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

