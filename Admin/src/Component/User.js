import React, { useState, useEffect } from 'react';
import "../App.css"
import "./user.css"

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/getuser', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (response.ok) {
            const data = await response.json();
            // Extracting 'template' values from each object in the array
            // const extractedTemplates = data.map(item => item.Template); // Extract 'template' from each object
            setUsers(data); // Set the array of 'template' values in the state
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error(error);
        // Handle errors (e.g., show an error message)
    }
  };

  return (
    <div>
                <div class="subheader">
        <h2>Welcome To Dashboard</h2>
      </div>

      <div className="servicetab">
        <table>
          <thead>
            <tr>
              <th>Sno</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
