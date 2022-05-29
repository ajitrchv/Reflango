import React, { useEffect,useState, useRef } from "react";
import {
  Navbar,
  button,
  Table,
  Container,
  Row,
  Col,
  form,
} from "react-bootstrap";
import axios from "axios";


const Home = () => {

  const url = 'http://localhost:5000/users';
  
  const [users, setUsers] = useState(null);

  function GetUser(){
    axios.get(url)
    .then((response) => {
      setUsers(response.data)
    })
  }

  useEffect(() => {
    axios.get(url)
    .then((response) => {
      setUsers(response.data)
    })
  },[url])
  let data="nothing to show";
  if(users){
    data=<div>
       <table class="table">
      <thead>
            <th scope="col">Name</th>
            <th scope="col">Mail</th>
            <th scope="col">How about showing password?</th>
      </thead>
    {users.map((user, i) => (
       
          <tbody>
            <tr>
              <td>{user["name"]}</td>
              <td>{user["mail"]}</td>
              <td>{user["password"]}</td>
            </tr>
          </tbody>
    ))
      }
    </table>
    </div>
    }
  
  return (
    <div>
      
      <Navbar
        bg="primary"
        variant="dark"
        className="justify-content-left px-md-5"
      >
        <Navbar.Brand>Reflango</Navbar.Brand>
      </Navbar>
      <div className="justify-content-left">
      {data}
      <button
        class="btn btn-primary"
        variant="dark"
        

        onClick= {GetUser}>
        GET
      </button>
      <br/>
      </div>
      <div className="justify-content-right">
        <form className="mb-3">
          <input type="text" placeholder="Name" className="px-md-10"/>
          <input type="email" placeholder="Email" className="px-md-10"/>
          <input type="password" placeholder="Password" className="px-md-10"/>
          <input type="submit" value="Submit" class="btn btn-success"/>
        </form>
      </div>
    </div>
  );
};
export default Home;
