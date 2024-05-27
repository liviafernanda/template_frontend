import React, { useEffect, useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { AppSettings } from './../../config/app-settings.js';
import { slideUp } from './../../composables/slideUp.js';
import { slideToggle } from './../../composables/slideToggle.js';
import SidebarMinifyBtn from './sidebar-minify-btn.jsx';
import SidebarProfile from './sidebar-profile.jsx';
import SidebarNav from './sidebar-nav.jsx';
import { Button } from 'react-bootstrap';

const Sidebar = () => {
  const { toggleAppSidebarMinify, toggleAppSidebarMobile, appSidebarTransparent, appSidebarGrid } =
    useContext(AppSettings);

  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [classDisplay, setClassDisplay] = useState(false);
  const [isMouseIn, setIsMouseIn] = useState(false);
  const finalMenu = useRef(null);

  useEffect(() => {
    const handleSidebarMenuToggle = (menus, expandTime) => {
      menus.forEach((menu) => {
        menu.onclick = function (e) {
          e.preventDefault();
          const target = this.nextElementSibling;

          menus.forEach((m) => {
            const otherTarget = m.nextElementSibling;
            if (otherTarget !== target) {
              slideUp(otherTarget, expandTime);
              otherTarget.closest('.menu-item').classList.remove('expand');
              otherTarget.closest('.menu-item').classList.add('closed');
            }
          });

          const targetItemElm = target.closest('.menu-item');

          if (
            targetItemElm.classList.contains('expand') ||
            (targetItemElm.classList.contains('active') && !target.style.display)
          ) {
            targetItemElm.classList.remove('expand');
            targetItemElm.classList.add('closed');
            slideToggle(target, expandTime);
          } else {
            targetItemElm.classList.add('expand');
            targetItemElm.classList.remove('closed');
            slideToggle(target, expandTime);
          }
        };
      });
    };

    const targetSidebar = document.querySelector('.app-sidebar:not(.app-sidebar-end)');
    const expandTime =
      targetSidebar && targetSidebar.getAttribute('data-disable-slide-animation') ? 0 : 300;

    const menuBaseSelector = '.app-sidebar .menu > .menu-item.has-sub';
    const submenuBaseSelector = ' > .menu-submenu > .menu-item.has-sub';

    // menu
    const menuLinkSelector = menuBaseSelector + ' > .menu-link';
    const menus = Array.from(document.querySelectorAll(menuLinkSelector));
    handleSidebarMenuToggle(menus, expandTime);

    // submenu lvl 1
    const submenuLvl1Selector = menuBaseSelector + submenuBaseSelector;
    const submenusLvl1 = Array.from(
      document.querySelectorAll(submenuLvl1Selector + ' > .menu-link')
    );
    handleSidebarMenuToggle(submenusLvl1, expandTime);

    // submenu lvl 2
    const submenuLvl2Selector = menuBaseSelector + submenuBaseSelector + submenuBaseSelector;
    const submenusLvl2 = Array.from(
      document.querySelectorAll(submenuLvl2Selector + ' > .menu-link')
    );
    handleSidebarMenuToggle(submenusLvl2, expandTime);

    let appSidebarFloatSubmenuTimeout = '';
    let appSidebarFloatSubmenuDom = '';

    const handleGetHiddenMenuHeight = (elm) => {
      elm.setAttribute(
        'style',
        'position: absolute; visibility: hidden; display: block !important'
      );
      const targetHeight = elm.clientHeight;
      elm.removeAttribute('style');
      return targetHeight;
    };

    const handleSidebarMinifyFloatMenuClick = () => {
      const elms = Array.from(
        document.querySelectorAll('#app-sidebar-float-submenu .menu-item.has-sub > .menu-link')
      );
      if (elms) {
        elms.forEach((elm) => {
          elm.onclick = function (e) {
            e.preventDefault();
            const targetItem = this.closest('.menu-item');
            const target = targetItem.querySelector('.menu-submenu');
            const targetStyle = getComputedStyle(target);
            const close = targetStyle.getPropertyValue('display') !== 'none';
            const expand = !close;

            slideToggle(target);

            const loopHeight = setInterval(() => {
              const targetMenu = document.querySelector('#app-sidebar-float-submenu');
              const targetMenuArrow = document.querySelector('#app-sidebar-float-submenu-arrow');
              const targetMenuLine = document.querySelector('#app-sidebar-float-submenu-line');
              const targetHeight = targetMenu.clientHeight;
              const targetOffset = targetMenu.getBoundingClientRect();
              const targetOriTop = targetMenu.getAttribute('data-offset-top');
              const targetMenuTop = targetMenu.getAttribute('data-menu-offset-top');
              let targetTop = targetOffset.top;
              const windowHeight = document.body.clientHeight;
              if (close) {
                if (targetTop > targetOriTop) {
                  targetTop = Math.min(targetTop, targetOriTop);
                  targetMenu.style.top = targetTop + 'px';
                  targetMenu.style.bottom = 'auto';
                  targetMenuArrow.style.top = '20px';
                  targetMenuArrow.style.bottom = 'auto';
                  targetMenuLine.style.top = '20px';
                  targetMenuLine.style.bottom = 'auto';
                }
              }
              if (expand) {
                if (windowHeight - targetTop < targetHeight) {
                  const arrowBottom = windowHeight - targetMenuTop - 22;
                  targetMenu.style.top = 'auto';
                  targetMenu.style.bottom = 0;
                  targetMenuArrow.style.top = 'auto';
                  targetMenuArrow.style.bottom = arrowBottom + 'px';
                  targetMenuLine.style.top = '20px';
                  targetMenuLine.style.bottom = arrowBottom + 'px';
                }
                const floatSubmenuElm = document.querySelector(
                  '#app-sidebar-float-submenu .app-sidebar-float-submenu'
                );
                if (targetHeight > windowHeight) {
                  if (floatSubmenuElm) {
                    const splitClass = 'overflow-scroll mh-100vh'.split(' ');
                    splitClass.forEach((cls) => {
                      floatSubmenuElm.classList.add(cls);
                    });
                  }
                }
              }
            }, 1);
            setTimeout(() => {
              clearInterval(loopHeight);
            }, 250);
          };
        });
      }
    };

    const handleSidebarMinifyFloatMenu = () => {
      var elms = [].slice.call(
        document.querySelectorAll('.app-sidebar .menu > .menu-item.has-sub > .menu-link')
      );
      if (elms) {
        elms.map(function (elm) {
          elm.onmouseenter = function () {
            var appElm = document.querySelector('.app');
            if (appElm && appElm.classList.contains('app-sidebar-minified')) {
              clearTimeout(appSidebarFloatSubmenuTimeout);
              var targetMenu = this.closest('.menu-item').querySelector('.menu-submenu');
              if (
                appSidebarFloatSubmenuDom === this &&
                document.querySelector('#app-sidebar-float-submenu')
              ) {
                return;
              } else {
                appSidebarFloatSubmenuDom = this;
              }
              var targetMenuHtml = targetMenu.innerHTML;
              if (targetMenuHtml) {
                var bodyStyle = getComputedStyle(document.body);
                var sidebarOffset = document.querySelector('#sidebar').getBoundingClientRect();
                var sidebarWidth = parseInt(document.querySelector('#sidebar').clientWidth);
                var sidebarX =
                  !appElm.classList.contains('app-sidebar-end') &&
                  bodyStyle.getPropertyValue('direction') !== 'rtl'
                    ? sidebarOffset.left + sidebarWidth
                    : document.body.clientWidth - sidebarOffset.left;
                var targetHeight = handleGetHiddenMenuHeight(targetMenu);
                var targetOffset = this.getBoundingClientRect();
                var targetTop = targetOffset.top;
                var targetLeft =
                  !appElm.classList.contains('app-sidebar-end') &&
                  bodyStyle.getPropertyValue('direction') !== 'rtl'
                    ? sidebarX
                    : 'auto';
                var targetRight =
                  !appElm.classList.contains('app-sidebar-end') &&
                  bodyStyle.getPropertyValue('direction') !== 'rtl'
                    ? 'auto'
                    : sidebarX;
                var windowHeight = document.body.clientHeight;

                if (!document.querySelector('#app-sidebar-float-submenu')) {
                  var overflowClass = '';
                  if (targetHeight > windowHeight) {
                    overflowClass = 'overflow-scroll mh-100vh';
                  }
                  var html = document.createElement('div');
                  html.setAttribute('id', 'app-sidebar-float-submenu');
                  html.setAttribute('class', 'app-sidebar-float-submenu-container');
                  html.setAttribute('data-offset-top', targetTop);
                  html.setAttribute('data-menu-offset-top', targetTop);
                  html.innerHTML =
                    '' +
                    '	<div class="app-sidebar-float-submenu-arrow" id="app-sidebar-float-submenu-arrow"></div>' +
                    '	<div class="app-sidebar-float-submenu-line" id="app-sidebar-float-submenu-line"></div>' +
                    '	<div class="app-sidebar-float-submenu ' +
                    overflowClass +
                    '">' +
                    targetMenuHtml +
                    '</div>';
                  appElm.appendChild(html);

                  var elm = document.getElementById('app-sidebar-float-submenu');
                  elm.onmouseover = function () {
                    clearTimeout(appSidebarFloatSubmenuTimeout);
                  };
                  elm.onmouseout = function () {
                    appSidebarFloatSubmenuTimeout = setTimeout(() => {
                      document.querySelector('#app-sidebar-float-submenu').remove();
                    }, 250);
                  };
                } else {
                  var floatSubmenu = document.querySelector('#app-sidebar-float-submenu');
                  var floatSubmenuInnerElm = document.querySelector(
                    '#app-sidebar-float-submenu .app-sidebar-float-submenu'
                  );

                  if (targetHeight > windowHeight) {
                    if (floatSubmenuInnerElm) {
                      var splitClass = 'overflow-scroll mh-100vh'.split(' ');
                      for (var i = 0; i < splitClass.length; i++) {
                        floatSubmenuInnerElm.classList.add(splitClass[i]);
                      }
                    }
                  }
                  floatSubmenu.setAttribute('data-offset-top', targetTop);
                  floatSubmenu.setAttribute('data-menu-offset-top', targetTop);
                  floatSubmenuInnerElm.innerHTML = targetMenuHtml;
                }

                var targetSubmenuHeight = document.querySelector(
                  '#app-sidebar-float-submenu'
                ).clientHeight;
                var floatSubmenuElm = document.querySelector('#app-sidebar-float-submenu');
                var floatSubmenuArrowElm = document.querySelector(
                  '#app-sidebar-float-submenu-arrow'
                );
                var floatSubmenuLineElm = document.querySelector('#app-sidebar-float-submenu-line');
                if (windowHeight - targetTop > targetSubmenuHeight) {
                  if (floatSubmenuElm) {
                    floatSubmenuElm.style.top = targetTop + 'px';
                    floatSubmenuElm.style.left = targetLeft + 'px';
                    floatSubmenuElm.style.bottom = 'auto';
                    floatSubmenuElm.style.right = targetRight + 'px';
                  }
                  if (floatSubmenuArrowElm) {
                    floatSubmenuArrowElm.style.top = '20px';
                    floatSubmenuArrowElm.style.bottom = 'auto';
                  }
                  if (floatSubmenuLineElm) {
                    floatSubmenuLineElm.style.top = '20px';
                    floatSubmenuLineElm.style.bottom = 'auto';
                  }
                } else {
                  var arrowBottom = windowHeight - targetTop - 21;
                  if (floatSubmenuElm) {
                    floatSubmenuElm.style.top = 'auto';
                    floatSubmenuElm.style.left = targetLeft + 'px';
                    floatSubmenuElm.style.bottom = 0;
                    floatSubmenuElm.style.right = targetRight + 'px';
                  }
                  if (floatSubmenuArrowElm) {
                    floatSubmenuArrowElm.style.top = 'auto';
                    floatSubmenuArrowElm.style.bottom = arrowBottom + 'px';
                  }
                  if (floatSubmenuLineElm) {
                    floatSubmenuLineElm.style.top = '20px';
                    floatSubmenuLineElm.style.bottom = arrowBottom + 'px';
                  }
                }
                handleSidebarMinifyFloatMenuClick();
              } else {
                document.querySelector('#app-sidebar-float-submenu-line').remove();
                appSidebarFloatSubmenuDom = '';
              }
            }
          };
          elm.onmouseleave = function () {
            var elm = document.querySelector('.app');
            if (elm && elm.classList.contains('app-sidebar-minified')) {
              appSidebarFloatSubmenuTimeout = setTimeout(() => {
                var elm = document.querySelector('#app-sidebar-float-submenu-line');
                if (elm) {
                  elm.remove();
                }
                appSidebarFloatSubmenuDom = '';
              }, 250);
            }
          };
          return true;
        });
      }
    };
    handleSidebarMinifyFloatMenu();
  }, []);

  const irParaBottom = () => {
    finalMenu.current.focus();
  };

  const handleMouseIn = () => {
    setIsMouseIn(true);
    setIsButtonVisible(true);
  };

  const handleMouseOut = () => {
    setIsMouseIn(false);
    setIsButtonVisible(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      //aumentar o valor de scrollY conforme adicionar mais elementos ao menu
      if (window.scrollY >= 100) {
        setIsButtonVisible(false);
        setClassDisplay(false);
      }
      if (window.scrollY < 100) {
        setIsButtonVisible(true);
        setClassDisplay(true);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <React.Fragment>
      <div
        id="sidebar"
        className={
          'app-sidebar ' +
          (appSidebarTransparent ? 'app-sidebar-transparent' : '') +
          (appSidebarGrid ? 'app-sidebar-grid' : '') +
          'my-4'
        }
        onMouseEnter={handleMouseIn}
        onMouseLeave={handleMouseOut}>
        {isButtonVisible && (
          <Button
            id="toTheBottom"
            className={classDisplay && isMouseIn ? 'd-block' : 'd-none'}
            onClick={irParaBottom}>
            <i class="fa fa-caret-down"></i>
          </Button>
        )}
        <PerfectScrollbar className="app-sidebar-content" options={{ suppressScrollX: true }}>
          {!AppSettings.appSidebarSearch && <SidebarProfile />}
          <SidebarMinifyBtn />
          <SidebarNav />
          <div className="mb-5" id="scrollBottom" tabIndex="-1" ref={finalMenu}></div>
        </PerfectScrollbar>
      </div>
      <div className="app-sidebar-bg"></div>
      <div className="app-sidebar-mobile-backdrop">
        <Link to="/" onClick={toggleAppSidebarMobile} className="stretched-link"></Link>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
