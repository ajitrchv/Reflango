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

function Home() {
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
                {/* <td><button class="btn btn-danger" onClick={DelUser(String(user["_id"]))}>DELETE</button></td> */}
                <td>
                  <button class="btn btn-danger" onClick={() => {}}>
                    DELETE
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    );
  }

  return <div>Home</div>;
}
export default Home;
