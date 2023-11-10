import React, { Fragment, useState, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const isLoggedIn = localStorage.getItem("isLoggedIn")

  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsInputVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [inputRef]);

  async function Signout() {
    navigate("/signoutconfirm");
  }

  async function goToProfile() {
    navigate("/userprofile");
  }

  return (
    <div className='navbar-container'>
      <div className="navbar">
          {isLoggedIn ? (
            <Fragment>
              <Link to={"/main"} id='main'><a>Főoldal</a></Link>
              <Link to={"/userprofile"} id='adatlap'><a>Adatlap</a></Link>
              <div className='login-container' ref={inputRef}>
                <Link to={"/signoutconfirm"} id='signout'><a>Kijelentkezés</a></Link>
              </div>
            </Fragment>
          ) : (
            null
            )}
      </div>
    </div>
  );
};

export default Navbar;
