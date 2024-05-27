import React,  {useState, useEffect} from 'react';
import { AppSettings } from './config/app-settings.js';
import { slideToggle } from './composables/slideToggle.js';

import Header from './components/header/header.jsx';
import Sidebar from './components/sidebar/sidebar.jsx';
//import SidebarRight from './components/sidebar-right/sidebar-right.jsx';
import TopMenu from './components/top-menu/top-menu.jsx';
import Content from './components/content/content.jsx';
import Footer from './components/footer/footerTopMenu.jsx';
import BarraAcessibilidade from './components/header/acessibilidade/barraAcessibilidade.jsx';

export default function App () {

const [appDarkMode, setAppDarkMode] = useState(false);
const [hasScroll, setHasScroll] = useState(false)

const [appSidebarMinify, setAppSidebarMinify] = useState(false);
const [appSidebarMobileToggled, setAppSidebarMobileToggled] = useState(false);
const [appSidebarNone, setAppSidebarNone] = useState(false);
const [appSidebarFixed, setAppSidebarFixed] = useState(true);

const [appSidebarTwo, setAppSidebarTwo] = useState(false);
const [appSidebarEndToggled, setAppSidebarEndToggled] = useState(false);

const [appHeaderFixed, setAppHeaderFixed] = useState(true);
const [appHeaderNone, setAppHeaderNone] = useState(false);

const [appContent, setAppContent] = useState(true);
const [appcontentClass, setAppContentClass] = useState('');

const [appTopMenu, setAppTopMenu] = useState(false);

const [appMenuAcessibilidade, setAppMenuAcessibilidade] = useState(true);



const toggleAppSidebarMinify = (e) => {
	e.preventDefault();
	setAppSidebarMinify(prevState => !prevState)
	if (localStorage) {
		localStorage.setItem('appSidebarMinify', !appSidebarMinify);
	}
}

const toggleAppSidebarMobile = (e) => {
	e.preventDefault();
	setAppSidebarMobileToggled(prevState => !prevState)
}

const handleSetAppSidebarNone = (value) => {
	setAppSidebarNone(value)
}

const handleSetAppSidebarMinified = (value) => {
    setAppSidebarMinify(value);
 };


const handleSetAppSidebarFixed = (value) => {
	if (value === true && !appHeaderFixed) {
		alert('Default Header with Fixed Sidebar option is not supported. Proceed with Fixed Header with Fixed Sidebar.');
		setAppHeaderFixed(true);
		if (localStorage) {
			localStorage.setItem('appHeaderFixed', true);
		}
	}
	setAppSidebarFixed(value);
	if (localStorage) {
		localStorage.setItem('appSidebarFixed', value);
	}
}

const handleSetAppContent = (value) => {
	setAppContent(value)
}
const handleSetAppContentClass = (value) => {
	setAppContentClass(value);
}
const handleSetAppHeaderNone = (value) => {
	setAppHeaderNone(value);
}

const handleSetAppHeaderFixed = (value) => {
	if (value === false && appSidebarFixed) {
		alert('Default Header with Fixed Sidebar option is not supported. Proceed with Default Header with Default Sidebar.');
		setAppHeaderFixed(false);
		if (localStorage) {
			localStorage.setItem('appSidebarFixed', false);
		}
	}
	setAppSidebarFixed(value);
	if (localStorage) {
		localStorage.setItem('appHeaderFixed', value);
	}
}

const handleSetAppTopMenu = (value) => {
	setAppTopMenu(value);
}
const toggleAppTopMenuMobile = (e) => {
	e.preventDefault();			
	slideToggle(document.querySelector('.app-top-menu'));
}

/*const handleSetAppSidebarTwo = (value) => {
			setAppSidebarTwo(value);
			setAppSidebarEndToggled(value);
		}*/

const handleSetAppDarkMode = (value) => {
	if (value === true) {
		document.body.classList.add('dark-mode');
	} else {
		document.body.classList.remove('dark-mode');
	}
	setAppDarkMode(value);
	//handleSetColor();
	if (localStorage) {
		localStorage.setItem('appDarkMode', value);
	}
}


 const handleScroll = () => {
  	if (window.scrollY > 0) {
  		setHasScroll(true);
  	} else {
  		setHasScroll(false);
  	}
  	var elm = document.getElementsByClassName('nvtooltip');
  	for (var i = 0; i < elm.length; i++) {
  		elm[i].classList.add('d-none');
  	}
  }


 useEffect(() => {
 	if (appDarkMode) {
		handleSetAppDarkMode(true);
	}

    window.addEventListener('scroll', handleScroll);

    if (localStorage) {
      const storedValueSidebarMinify = localStorage.getItem('appSidebarMinify');
      const storedValueSidebarFixed = localStorage.getItem('appSidebarFixed');
      const storedValueHeaderFixed = localStorage.getItem('appHeaderFixed');
      const storedValueDarkMode = localStorage.getItem('appDarkMode');
      if (storedValueSidebarMinify !== null) {
        handleSetAppSidebarMinified(storedValueSidebarMinify === 'true');
      }
      if (storedValueSidebarFixed !== null) {
        handleSetAppSidebarFixed(storedValueSidebarFixed === 'true');
      }
      if (storedValueHeaderFixed !== null) {
        handleSetAppHeaderFixed(storedValueHeaderFixed === 'true');
      }
      if (storedValueDarkMode !== null) {
        handleSetAppDarkMode(storedValueDarkMode === 'true');
      }
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
 }, []);
		return (
			<AppSettings.Provider 
			value={{ appSidebarMinify, 
					 appSidebarFixed, 
					 appHeaderNone, 
					 appHeaderFixed, 
					 appSidebarNone, 
					 appSidebarMobileToggled, 
					 appTopMenu, 
					 appMenuAcessibilidade,
					 hasScroll, 
					 toggleAppSidebarMobile, 
					 toggleAppTopMenuMobile, 
					 handleSetAppTopMenu,
					 handleSetAppContent, 
					 handleSetAppContentClass,  
					 handleSetAppHeaderNone, 
					 toggleAppSidebarMinify, 
					 handleSetAppSidebarNone, 
					 handleSetAppDarkMode 
					}}>
				<div className={
					'app ' +
					(appHeaderNone ? 'app-without-header ' : '') + 
					//(appHeaderFixed && !appHeaderNone ? 'app-header-fixed ' : '') + 
					//(appSidebarFixed ? 'app-sidebar-fixed ' : '') +
					(appSidebarNone ? 'app-without-sidebar ' : '') + 					
					(appSidebarMinify ? 'app-sidebar-minified ' : '') + 
					(appSidebarMobileToggled ? 'app-sidebar-mobile-toggled ' : '') + 
					(appTopMenu ? 'app-with-top-menu ' : '') + 					
					(appMenuAcessibilidade ? 'app-with-accessibility ' : '') + 					
					(hasScroll ? 'has-scroll ' : '')
				}>
					{appMenuAcessibilidade && <BarraAcessibilidade />}
					{!appHeaderNone && (<Header />)}
					{!appSidebarNone && (<Sidebar />)}
					{/*{appSidebarTwo && (<SidebarRight />)}*/}
					{appTopMenu && (<TopMenu />)}
					{appContent && (<Content />)}
					{/*<Footer /> quando usar topMenu (exemplo do CAP), usar o footer aqui. Quando usar o sidebar, usar o footer que está no componente Content*/}
					
				</div>
			</AppSettings.Provider>
		)
	
}