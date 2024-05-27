import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppSettings } from './../../config/app-settings.js';
import { slideToggle } from './../../composables/slideToggle.js';
import { AuthContext } from '../../contexts/Auth/AuthContext.jsx';

class SidebarProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileActive: 0
    };
    this.handleProfileExpand = this.handleProfileExpand.bind(this);
  }

  handleProfileExpand(e) {
    e.preventDefault();

    var targetSidebar = document.querySelector('.app-sidebar:not(.app-sidebar-end)');
    var targetMenu = e.target.closest('.menu-profile');
    var targetProfile = document.querySelector('#appSidebarProfileMenu');
    var expandTime =
      targetSidebar && targetSidebar.getAttribute('data-disable-slide-animation') ? 0 : 250;

    if (targetProfile) {
      if (targetProfile.style.display === 'block') {
        targetMenu.classList.remove('active');
      } else {
        targetMenu.classList.add('active');
      }
      slideToggle(targetProfile, expandTime);
      targetProfile.classList.toggle('expand');
    }
  }

  render() {

    return (
          <AppSettings.Consumer>
            {({ appSidebarMinify }) => (
              <div className="menu">
              <AuthContext.Consumer>
              {({ user, deslogar }) => (
                  // if user is not logged show login button
                  // verifica se user = {} ou user = null
                user && (Object.keys(user).length > 0 && user.constructor === Object) ? (
                    <div>
                      <div className="menu-profile">
                        <Link to="/" onClick={this.handleProfileExpand} className="menu-profile-link">
                          <div className="menu-profile-info">
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1">{user?.nome}</div>
                              <div className="menu-caret ms-auto"></div>
                            </div>
                            <small>{user?.nome}</small>
                          </div>
                        </Link>
                      </div>
                      <div id="appSidebarProfileMenu" className="collapse">
                        <div className="menu-item">
                          <Link to="/admin/admin-cadastros" className="menu-link">
                            <div className="menu-icon">
                              <i className="fa fa-cog"></i>
                            </div>
                            <div className="menu-text"> Cadastros</div>
                          </Link>
                        </div>
                        <div className="menu-item pb-5px">
                        <Link to="/logout" onClick={ () => deslogar()} className="menu-link">
                            <div className="menu-icon">
                              <i className="fa fa-right-from-bracket"></i>
                            </div>
                            <div className="menu-text"> Sair</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="menu-profile">
                        <Link to="/login" className="menu-profile-link">
                          <div className="menu-profile-info">
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1">Login</div>
                              
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )
                )}
              </AuthContext.Consumer>
              </div>
            )}

          </AppSettings.Consumer>
    )
  }
}

export default SidebarProfile;
