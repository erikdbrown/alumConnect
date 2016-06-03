import React from 'react'
import { Link } from 'react-router'

class Sidebar extends React.Component {
  render() {
    return(
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li><Link to="/">Main Site</Link></li>
          <li><Link to="/dashboard">View Users</Link></li>
          <li><Link to="/dashboard/newuser">Add New User</Link></li>
          <li><Link to="/dashboard/groups">Manage Groups</Link></li>
          <li><Link to="/dashboard/profile-fields">Manage Profile Fields</Link></li>
          <li><Link to="/dashboard/sites">Manage Sites</Link></li>
          <li><a href="/auth/logout">Logout</a></li>
        </ul>
      </div>
    )
  }
}

module.exports = Sidebar;
