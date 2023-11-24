import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message, Dropdown, Button, Switch, Space, Divider, theme } from "antd";
import { CaretDownOutlined } from '@ant-design/icons'
const { useToken } = theme;

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);
  const navigate = useNavigate();
  const handleFeaturesClick = () => navigate('/features');
  const handleHomeClick = () => navigate('/');
  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };
  const handleLogin = () => {
    // Navigate to the login page
    navigate('/login');
  };

  const handleSignup = () => {
    // Navigate to the signup page
    navigate('/register');
  };
  const profileItems = [
    {
      key: 1,
      label: <Link style={{ textDecoration: 'none' }} to='/'>Dashboard</Link>,
      disabled: !loginUser

    },
    {
      key: 2,
      label: <Switch defaultChecked checkedChildren='Light Mode On' unCheckedChildren='Dark Mode On'/>,
    },

  ];
  const featureItems = [
    {
      key: 1,
      label: <Link style={{ textDecoration: 'none' }} to='/transactions'>Expense Tracker</Link>,

    },
    {
      key: 2,
      label: <Link style={{ textDecoration: 'none' }} to='/'>Manage Due Payments</Link>,
    },
    {
      key: 3,
      label: <Link style={{ textDecoration: 'none' }} to='/'>Split Bills</Link>,
    },

  ];
  const homeItems = [
    {
      key: 1,
      label: <Link style={{ textDecoration: 'none' }} to='/'>Benifits</Link>,

    },
    {
      key: 2,
      label: <Link style={{ textDecoration: 'none' }} to='/'>Testimonials</Link>,
    },

    {
      key: 3,
      label: <Link style={{ textDecoration: 'none' }} to='/'>About Us</Link>,
    },

  ];

  const helpItems = [
    {
      key: 1,
      label: <Link style={{ textDecoration: 'none' }} to='/contact'>Contact Us</Link>,

    },
    {
      key: 2,
      label: <Link style={{ textDecoration: 'none' }} to='/faq'>FAQ</Link>,
    },

  ];

  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: 'none',
  };


  
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="./images/expenses.png" alt="..." width="30px;" />
          </Link>
          <Link className="navbar-brand" to="/">
            NovaWallet
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mt-2">
                <Dropdown.Button
                  icon={<CaretDownOutlined />}
                  type='text'
                  onClick={handleHomeClick}
                  menu={{
                    items: homeItems,
                  }}>
                  <div>Home</div>
                </Dropdown.Button>
              </li>
              <li className="nav-item mt-2">
                <Dropdown.Button
                  icon={<CaretDownOutlined />}
                  type='text'
                  onClick={handleFeaturesClick}
                  menu={{
                    items: featureItems,
                  }}>
                  <div>Features</div>
                </Dropdown.Button>
              </li>
              <li className="nav-item mt-2">
                <Dropdown.Button
                  icon={<CaretDownOutlined />}
                  type='text'
                  menu={{
                    items: helpItems,
                  }}>
                  <div>Help Desk</div>
                </Dropdown.Button>
              </li>
              <li className="nav-item mt-2">
                <Dropdown
                  menu={{
                    items: profileItems,
                  }}
                  dropdownRender={(menu) => (
                    <div style={contentStyle}>
                      {React.cloneElement(menu, {
                        style: menuStyle,
                      })}
                      <Divider
                        style={{
                          margin: 0,
                        }}
                      />
                      <Space
                        style={{
                          padding: 8,
                        }}
                      >
                        {loginUser ? 
                        (<Button type="primary" onClick={logoutHandler}>Logout</Button>)
                         :(<div>
                          <Button block size="small" className="my-2"
                          type="primary" onClick={handleLogin}>Login</Button>
                         <Button block size="small" className="my-2" type="primary" onClick={handleSignup}>SignUp</Button>
                         </div>)
                         }
                        
                      </Space>
                    </div>
                  )}
                  trigger={['click']}>
                  <Button type="link">
                    <div>{loginUser ? loginUser.name : 'Signin'}</div>
                  </Button>
                </Dropdown>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;