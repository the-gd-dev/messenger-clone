import React from 'react'
const Navbar = (props) => {
    document.title = props.title  ? props.title : 'Facebook Messenger Clone';
    return (
       
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand px-0" href="Javascript:void(0)">
            <img src="https://firebasestorage.googleapis.com/v0/b/facebook-messenger-clone-f3be2.appspot.com/o/assets%2Ffbmc_logo.png?alt=media&token=7d126449-7465-4f39-8860-e5ff69b0f43e" alt="" height="30" width="30" />
            <span className='brand-title'>{props.title  ? props.title : 'Facebook Messenger Clone'}  </span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="Javascript:void(0)">Live Chat Room</a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="Javascript:void(0)">SignUp</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="Javascript:void(0)" tabindex="-1" aria-disabled="true">SignIn</a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
    );
}

export default Navbar;  