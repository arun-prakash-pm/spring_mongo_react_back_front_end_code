import React, { useEffect, useState } from 'react';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token=localStorage.getItem('token');

  useEffect(() => {
    fetch("http://localhost:8080/api/department/getAllDepartment", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        credentials: "include"
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch department data');
        }
        return response.json();
      })
      .then((data) => {
        setDepartments(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading departments...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Departments</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Department Name</th>
            <th>Manager</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.id}>
              <td>{dept.id}</td>
              <td>{dept.departmentName}</td>
              <td>{dept.managerName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentList;