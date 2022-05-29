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
  let mail = useRef();
  let name = useRef();
  let password = useRef();

  const url = "http://localhost:5000/users";

  const [users, setUsers] = useState(null);

  function GetUser() {
    axios.get(url).then((response) => {
      setUsers(response.data);
    });
  }

  function PostUser(e) {
    e.preventDefault();
    axios.post(url, {
      name,
      mail,
      password,
    });
    GetUser();
  }

  function DelUser(id, e) {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then((res) => console.log("deleting user", res))
      .catch((err) => {
        console.log(err);
      });
    GetUser();
  }

  useEffect(() => {
    axios.get(url).then((response) => {
      setUsers(response.data);
    });
  }, [url]);
  let data = "nothing to show";
  if (users) {
    data = (
      <div>
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
                <td>
                  <button
                    class="btn btn-danger"
                    onClick={DelUser(String(user["_id"]))}
                  >
                    DELETE
                  </button>
                </td>
                {/* <td>
                  <button class="btn btn-danger" onClick={() => {}}>
                    DELETE
                  </button>
                </td> */}
              </tr>
            </tbody>
          ))}
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
        <button class="btn btn-primary" variant="dark" onClick={GetUser}>
          GET
        </button>
        <br />
      </div>
      <div className="justify-content-center">
        <br />
        <form className="justify-content-center mb-3">
          <input
            ref={name}
            type="text"
            placeholder="Name"
            className="px-md-10"
            onChange={(e) => {
              name = e.target.value;
            }}
          />

          <input
            ref={mail}
            type="email"
            placeholder="Email"
            className="px-md-10"
            onChange={(e) => {
              mail = e.target.value;
            }}
          />
          <span>
          <input
            ref={password}
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
            class="btn btn-success"
            onClick={PostUser}
          />
        </form>
      </div>
    </div>
  );
};
export default Home;
