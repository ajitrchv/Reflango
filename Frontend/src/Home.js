import React, { useEffect, useState, useRef } from "react";
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
  let mail = ''
  let name = ''
  let password = ''

  const url = "http://localhost:5000/users";

  const [users, setUsers] = useState(null);

  function GetUser() {
    axios.get(url).then((response) => {
      if(response)
      setUsers(response.data);
    });
  }

  async function PostUser(e) {
    e.preventDefault();
    await axios.post(url, {
      name,
      mail,
      password,
    });
    await GetUser()
  }

  async function DelUser(id){
  try
  {
      let result = await axios
      .delete(`http://localhost:5000/users/${id}`);
    console.log(result.response.data)
  }
  catch(err){}
    GetUser();
  }

  useEffect(() => {
    axios.get(url).then((response) => {
      setUsers(response.data);
    });
  }, [url]);

  let data;
  
  if(users === null){
  console.log("***************************",users)
  data = "nothing to show"
  return
}
  else {
    data = (
      <div>
        <table className="table">
          <thead>
            <th scope="col">Name</th>
            <th scope="col">Mail</th>
            <th scope="col">How about showing password?</th>
          </thead>
          
          
          {
          users.map((user, i) => (
            <tbody key={i}>
              <tr>
                <td>{user["name"]}</td>
                <td>{user["mail"]}</td>
                <td>{user["password"]}</td>
                <td>
                  <button
                    className="btn btn-danger" onClick={(e) => DelUser(String(user["_id"]))}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            </tbody>
          ))
          }
        </table>
      </div>
    );
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
        <br />
        <div></div>
        {data}
        <div></div>
        <br />
        <button className="btn btn-primary" variant="dark" onClick={GetUser}>
          GET
        </button>
        <br />
      </div>
      <div className="justify-content-center">
        <br />
        <form className="justify-content-center mb-3">
          <input
            type="text"
            placeholder="Name"
            className="px-md-10"
            onChange={(e) => {
              name = e.target.value;
            }}
          />

          <input
            type="email"
            placeholder="Email"
            className="px-md-10"
            onChange={(e) => {
              mail = e.target.value;
            }}
          />
          <span>
          <input
            type="password"
            placeholder="Password"
            className="px-md-10"
            onChange={(e) => {
              password = e.target.value;
            }}
          />
          </span>
          <br />
          <div/>
          <br />
          <input
            type="submit"
            value="Submit"
            className="btn btn-success"
            onClick={PostUser}
          />
        </form>
      </div>
    </div>
  );
};
export default Home;
