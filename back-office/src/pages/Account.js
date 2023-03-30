import React from 'react'
import {FcEditImage} from 'react-icons/fc'
import "../css/Account.css"

const account = {
  name: "Sheena Shrestha",
  department: "Programming",
  hiredate: "06/23/2018",
  birthday: "1996-09-02",
  gender: "Female",
  location: "Kathmandu,Nepal",
  email: "mailto:info@support.com",
  mobile: "555-4567-890",
  landline: "123-4567-890"
}

// used bootsnipp in https://bootsnipp.com/snippets/xnVB
function Account() {
    return (
        <div className="container">
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
                    <img alt="User Pic" src="https://wallpaperaccess.com/full/4038902.png" className="img-circle img-responsive" style={{maxWidth: "100%", height: "auto"}}/>
                </div>
                
                <div className=" col-md-9 col-lg-9 "> 
                  <table className="table table-user-information">
                  
                    <tbody>
                      <tr style={{backgroundColor: "rgb(166, 239, 248)"}}>
                        <td>
                          <h4 className="panel-title">{account.name}</h4>
                        </td>
                        <td></td>                        
                      </tr>

                      <tr>
                        <td>Department:</td>
                        <td>{account.department}</td>
                      </tr>
                      <tr>
                        <td>Hire date:</td>
                        <td>{account.hiredate}</td>
                      </tr>
                      <tr>
                        <td>Date of Birth</td>
                        <td>{account.birthday}</td>
                      </tr>
                   
                         <tr>
                        <td>Gender</td>
                        <td>{account.gender}</td>
                      </tr>
                        <tr>
                        <td>Location</td>
                        <td>{account.location}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td><a href={account.email}>info@support.com</a></td>
                      </tr>
                      <tr>
                        <td>Phone Number</td>
                        <td>{account.mobile}(Mobile) <br></br> {account.landline}(Landline)
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
                        {/* <a data-original-title="Broadcast Message" data-toggle="tooltip" type="button" className="btn btn-sm btn-primary"><i className="glyphicon glyphicon-envelope"></i></a> */}
                        <span className="pull-right">
                            <div classNameName='icon' style={{textAlign: "right"}}><FcEditImage/></div>
                            {/* <a data-original-title="Remove this user" data-toggle="tooltip" type="button" className="btn btn-sm btn-danger"><i className="glyphicon glyphicon-remove"></i></a> */}
                        </span>
                    </div>
            
          </div>
        </div>
      </div>
    )
}

export default Account
