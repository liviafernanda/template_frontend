import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSettings } from './../../config/app-settings.js';
import Footer from '../footer/FooterSidebar.jsx';


const Content = () => {

 const { appContentClass } = useContext(AppSettings);


 return (
    <div className={'app-content ' + appContentClass} id="page-content">
      <div id="content-wrap">
        <Outlet />
      </div>
      <Footer />{/*quando usar menu Sidebar (exemplo do sigescon), usar o footer aqui. Quando usar o TopMenu, usar o footer que está no App.jsx*/}
    </div>
 );
};

export default Content;
