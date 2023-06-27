import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const Responsive = () => {


  const { loginWithRedirect ,isAuthenticated ,logout ,user} = useAuth0();
  
//   let [query,setQuery]=useState({
//     text:''
//   });

// // search contacts

// let searchContacts = (event) => {
//   setQuery({ ...state, text: event.target.value });
//   let theContacts = state.contacts.filter((contact) => {
//     return contact.name.toLowerCase().includes(event.target.value.toLowerCase());
//   });
//   setQuery({
//     ...state,
//     filterContacts: theContacts,
//   });
// };


  // let searchContacts = (event) => {
  //    setQuery({query,text:event.target.value});
  //    let theContacts= state.contacts.filter(contact => {
  //     return contact.name.toLowerCase().includes.(event.target.value.toLowerCase())
  //    });
  //    setQuery({
  //     ...state,
  //     filterContacts:theContacts
  //    });
  // };

  return (
    <div>
     {/* <pre>{query.text} </pre> */}
     <nav className="navbar navbar-expand-lg bg-primary">
  <div className="container-fluid">
    <h2 className=" text-primary me-3"><i className="fa-solid fa-address-book text-warning"></i></h2>
    <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
     
       
        
      
        
          {
            isAuthenticated && 
            <>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-contant-evenly">
            <li className="nav-item">
            <Link className="nav-link text-light" to="Mycontact">My Contacts</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to='/login'>Favorite</Link>
          </li>
          <li> <p 
            className='btn btn-light disabled'style={{alignItems:'center'}}
            >
              {user.name}
            </p></li>
            
       </ul>
            </> }

      {
        isAuthenticated ? 
        (
        <li><button className='btn btn-danger' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
      </button></li> ) : ( <li className='decoration-none'><button className='btn btn-success ' onClick={() => loginWithRedirect()}>Log In</button></li>)
      }
     
      
    </div>
  </div>
</nav>

    </div>
  );
}

export default Responsive;
