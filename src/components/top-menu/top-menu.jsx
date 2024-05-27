import React from 'react';
import TopMenuNav from './top-menu-nav.jsx';
import TopMenuSearch from './top-menu-search.jsx';


export default function TopMenu() {
    return (
      <div id="top-menu" className="app-top-menu top-menu-search">
        {/* <TopMenuSearch /> */}
        <TopMenuNav />
      </div>
    );
}

