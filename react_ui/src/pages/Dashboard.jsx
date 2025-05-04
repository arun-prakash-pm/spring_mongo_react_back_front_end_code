import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Dashboard.css';
import Logout from '../pages/Logout';

const Dashboard = () => {
     const handleLogout=Logout();

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-item">
          <Link to="/home">Dashboard</Link>
        </div>
        <div className="sidebar-item">
          <Link to="/employees">Employees</Link>
        </div>
        <div className="sidebar-item">
          <Link to="/leave">Leave Requests</Link>
        </div>
        <div className="sidebar-item">
          <Link to="/performance">Performance</Link>
        </div>
        <div className="sidebar-item">
          <Link to="/settings">Settings</Link>
        </div>
        <div className="sidebar-item">
        <Link to="/department">Department</Link>
        </div>
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="dashboard-main">
        <h2>Dashboard Overview</h2>
        <div className="stats-container">
          <div className="stat-box">
            <h3>Total Employees</h3>
            <p>150</p>
          </div>
          <div className="stat-box">
            <h3>Active Employees</h3>
            <p>140</p>
          </div>
          <div className="stat-box">
            <h3>Leave Requests</h3>
            <p>12</p>
          </div>
          <div className="stat-box">
            <h3>Performance</h3>
            <p>85%</p>
          </div>
        </div>
        <div className="recent-employees">
          <h3>Recent Employees</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Join Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>HR</td>
                <td>01/01/2023</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>Marketing</td>
                <td>15/02/2023</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>Mike Johnson</td>
                <td>Finance</td>
                <td>05/03/2023</td>
                <td>Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
