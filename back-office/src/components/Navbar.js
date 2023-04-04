import React from 'react'
import { Input} from 'antd';

const { Search } = Input;
  
function Navbar({children}) {
return (
    <div className='container-fluid m-0'>
      <nav>
        <div style={{ display: "flex", width: "100%" }}>
          <Search placeholder="input search text" enterButton="Search" size="middle" style={{ flex: "auto" }} />
          <div style={{ verticalAlign: "middle", marginLeft: "20px" }}>Profile</div>
        </div>
      </nav>

      <main className='p-0'>
      {children}
      </main>
    </div>
    )
}

export default Navbar;
// Để cho phần tử ô Search có chiều dài tự thay đổi, thiết lập thuộc tính "flex"

