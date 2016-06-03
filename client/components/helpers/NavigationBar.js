import React from 'react';
import NavLink from './NavLink';
import $ from 'jquery';
import { Navbar, Nav, NavDropdown, MenuItem, NavItem} from 'react-bootstrap';
import auth from '../../util/authHelpers.js'
import RestHandler from '../../util/RestHandler'


// This is the only spot I'm using jquery. It's so the navigationbar
// dropdown hides when you click anywhere. If you can do this another way
// and get rid of jquery, the site will load much lot faster!
$(document).on('click', '.navbar-toggle', function(event) {
  $(this).parent().parent().find('.dropdown').addClass('open');
  $("#wrapper").toggleClass("toggled");

})
$(document).click(function (event) {
  var clickover = $(event.target);
  var _opened = $(".navbar-collapse").hasClass("navbar-collapse collapse in");
  if (_opened === true && !clickover.hasClass("navbar-toggle")) {
      $("button.navbar-toggle").click();
  }
});


class NavigationBar extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      loggedInName: 'The User',
      id: null,
    };
  }

  componentWillMount() {
    //gets the authentication token from util/authHelpers.js
    //then retrieve the users id from it, get that users info, and display
    //it in the navigationbar
    var url = '/db/users/name';
    RestHandler.Get(url, (err, res) => {
      this.setState({
        loggedInName: res.body.name,
        id: res.body.id,
      });
    });
  }


  renderMenuItems() {
    // if permission === 1, user is admin
    if(auth.getCookie('ac') === '1') {
      return (
        <Nav><Navbar.Text><NavLink to="/dashboard">
          Admin Dashboard
        </NavLink></Navbar.Text></Nav>
      )
    }
  }

  navbarToggleDisplay() {
    var id = this.state.id;
    if(this.props.isAdminBar) {
      return(
        <Nav pullRight></Nav>
      )
    } else {
      return(
        <Nav pullRight>
          {this.renderMenuItems()}
          <NavDropdown title={this.state.loggedInName} id="nav-dropdown">
            <MenuItem header><a href={`/users/${id}`}>View profile</a></MenuItem>
            <MenuItem header><a href='/auth/logout'>Log out</a></MenuItem>
          </NavDropdown>
        </Nav>
      )
    }
  }

  render() {
    var showInverse = this.props.isAdminBar ? true : false;
    var logo = showInverse ? 'logo-dark.png' : 'logo.png'
    return (
      <Navbar fixedTop inverse={showInverse}>
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to="/" onlyActiveOnIndex>
              <img className="image" src={`../assets/${logo}`} />
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle animation={false} />
        </Navbar.Header>
        <Navbar.Collapse>
          {this.navbarToggleDisplay()}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

module.exports = NavigationBar;
