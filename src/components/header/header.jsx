import React from 'react';
import { Link } from 'react-router-dom';
import DropdownNotification from './dropdown/notification.jsx';
import DropdownLanguage from './dropdown/language.jsx';
import DropdownProfile from './dropdown/profile.jsx';
import SearchForm from './search/form.jsx';
import DropdownMegaMenu from './dropdown/mega.jsx';

import { AppSettings } from './../../config/app-settings.js';

import Logo from '../../assets/img/logo/Logo_TJ_CGJ_borda.png';
import LogoCap from '../../assets/img/logo/Sistema_CAP.png';

import Dark from './acessibilidade/dark.jsx';
import FontSizeAdjust from './acessibilidade/fontSize.jsx';

class Header extends React.Component {
  render() {
    return (
      <AppSettings.Consumer>
        {({
          toggleAppSidebarMobile,
          toggleAppSidebarEnd,
          toggleAppSidebarEndMobile,
          toggleAppTopMenuMobile,
          appHeaderLanguageBar,
          appHeaderMegaMenu,
          appHeaderInverse,
          appSidebarTwo,
          appTopMenu,
          appSidebarNone
        }) => (
          <div
            id="header"
            className={'app-header ' + (appHeaderInverse ? 'app-header-inverse' : '')}>
            <div className="navbar-header">
              {appSidebarTwo && (
                <button
                  type="button"
                  className="navbar-mobile-toggler"
                  onClick={toggleAppSidebarEndMobile}>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              )}
              <Link to="/" >
                <span className="navbar-cgj ms-4 logo-tj-mobile">
                <img src={Logo} alt="Logomarca da Corregedoria Geral de Justiça"></img>
                </span>
              </Link>

              {appHeaderMegaMenu && (
                <button
                  type="button"
                  className="navbar-mobile-toggler"
                  data-bs-toggle="collapse"
                  data-bs-target="#top-navbar">
                  <span className="fa-stack fa-lg text-inverse">
                    <i className="far fa-square fa-stack-2x"></i>
                    <i className="fa fa-cog fa-stack-1x"></i>
                  </span>
                </button>
              )}
              {appTopMenu && !appSidebarNone && (
                <button
                  type="button"
                  className="navbar-mobile-toggler"
                  onClick={toggleAppTopMenuMobile}>
                  <span className="fa-stack fa-lg text-inverse">
                    <i className="far fa-square fa-stack-2x"></i>
                    <i className="fa fa-cog fa-stack-1x"></i>
                  </span>
                </button>
              )}
              {appSidebarNone && appTopMenu && (
                <button
                  type="button"
                  className="navbar-mobile-toggler"
                  onClick={toggleAppTopMenuMobile}>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              )}
              {!appSidebarNone && (
                <button
                  type="button"
                  className="navbar-mobile-toggler"
                  onClick={toggleAppSidebarMobile}>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              )}
            </div>

            {appHeaderMegaMenu && <DropdownMegaMenu />}

            <div className="navbar-nav">
              <span className="logo-tj">
                <img src={LogoCap} width={300} alt="Logomarca da CAP"></img>
              </span>
              {/* <SearchForm /> 
							<FontSizeAdjust />
							<Dark iconColor={"text-white"}/>*/}

              {appHeaderLanguageBar && <DropdownLanguage />}

              {appSidebarTwo && <div className="navbar-divider d-none d-md-block"></div>}

              {appSidebarTwo && (
                <div className="navbar-item d-none d-md-block">
                  <Link to="/" onClick={toggleAppSidebarEnd} className="navbar-link icon">
                    <i className="fa fa-th"></i>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </AppSettings.Consumer>
    );
  }
}

export default Header;
