import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContactService } from '../services/ContactServices';
import Spinner from './Spinner';



const MyContacts = () => {

  let [state,setState] = useState({

    loading : false,
    contacts:[],
    filterContacts: [],
    errorMessage:''
  });

//This useEffect hook is use for not going to any page without login
  // const usenavigate =useNavigate();
  // useEffect =(()=>{
  //     let username=sessionStorage.getItem('username');
  //     if(username === '' || username ===null){
  //         usenavigate('/');
  //     }
  // },[]);

//useEffect Ends here without login 
 
  

useEffect(() => {
    const fetchData = async () => {
      try {
        setState({...state,loading:true});
        let response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading:false,
          contacts: response.data,
          filterContacts:response.data
        })
        // console.log(response.data);
      } catch (error) {
        // Handle the error
        setState({
          ...state,
          loading:false,
          errorMessage:error.message
        });
      }
    };

    fetchData(); // Call the asynchronous function

    // No cleanup function is returned in this example
  },[]);

// detele contact

let clickDelete = async(contactId) =>{
    try {
      let response = await ContactService.deleteContact(contactId);
      if(response){
        setState({...state,loading:true});
        let response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading:false,
          contacts: response.data,
          filterContacts:response.data,
          errorMessage
        })
      }
    } catch (error) {
      // Handle the error
      setState({
        ...state,
        loading:false,
        errorMessage:error.message
      });
    }
};


// // Search contacts


// let [query,setQuery]=useState({
//   text:''
// });

// // search contacts

// let searchContacts = (event) => {
// setQuery({ ...state, text: event.target.value });
// let theContacts = state.contacts.filter((contact) => {
//   return contact.name.toLowerCase().includes(event.target.value.toLowerCase());
// });
// setQuery({
//   ...state,
//   filterContacts: theContacts,
// });
// };


  let {loading,contacts,errorMessage,filterContacts}=state;
  return (
    <>
  {/* SEARCH BAR STARTS HERE */}
       {/* <form className="container d-flex" role="search">
        <input className="form-control me-2" name='text'
         value={query.text} onChange={searchContacts}

         type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-light" type="submit"><i className='fa fa-search'></i></button>
      </form>  */}
{/* SEARCH BAR ENDS HERE */}

      {
        loading ? <Spinner /> : <>

<section className='contact-list'>
        <div className='container'>
        <h1 className='text-dark'>MY CONTACT</h1>

        <div className='m-3'>
<Link className='btn btn-primary mx-3' to="/createcontacts" ><i className='fa fa-user-plus'></i></Link>
{/* <Link className="btn btn-danger "  to='/'><i class="fa-solid fa-right-from-bracket mx-2"></i></Link>  */}
</div>

        {/* <Link className='btn btn-primary' to="/createcontacts" ><i className='fa fa-user-plus'></i></Link> */}
          <div className='row'>
            
                 {
              filterContacts.length > 0 && 
              filterContacts.map(contact => {
                return (

                  <div className='col-md-6' key={contact.id}>
                  <div className='card my-2'>
                    <div className='card-body'>
                     <div className='row aline-items-center d-flex justify-content-around' id='ABC'>
                     <div className='col-md-4'>
                          <img src={contact.photourl} className='image-fluid contact-img' alt=''/>
                      </div>
                      <div className='col-md-5'>
    
                        <ul className='list-group text-start'>
                          <li className='list-group-item list-group-item-action'>
                            <b>First Name : </b>{contact.firstname}
                          </li>
                          <li className='list-group-item list-group-item-action'>
                            <b>Last Name : </b>{contact.lastname}
                          </li>
                          <li className='list-group-item list-group-item-action'>
                            <b>Mobile : </b>{contact.phoneno}
                          </li>
                          <li className='list-group-item list-group-item-action'>
                            <b>Company : </b>{contact.companyname}
                          </li>
                          {/* <li className='list-group-item list-group-item-action'>
                            <b>Email : </b>{contact.email}
                          </li> */}
                        </ul>
    
                      </div>
                      <div className='col-md-1 align-items-center mt-4 d-flex flex-column'>
    
                          <Link className="btn btn-warning my-1 " to={`/ViewContacts/${contact.id}`}><i className='fa fa-eye'></i></Link>
                          <Link className="btn btn-success my-1" to={`/EditContact/${contact.id}`}><i className='fa fa-pen'></i></Link>
                          <button className="btn btn-danger my-1" onClick={() =>clickDelete (contact.id)}><i className='fa fa-trash'></i></button>
    
                      </div>
                     </div>
                    </div>
                  </div>
              </div>

                )
              })
            }
            
        </div>
        </div>
      </section>  
        
        </>
      }

    </>
  );
}

export default MyContacts;


