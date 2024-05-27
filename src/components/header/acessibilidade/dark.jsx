import React, { useContext } from 'react';
import { AppSettings } from '../../../config/app-settings';

const Dark = ({ iconColor, tamanhoMargin }) => {
  const { appDarkMode, handleSetAppDarkMode } = useContext(AppSettings);

  const handleDarkMode = (e) => {
    if (e.target.checked) {
      handleSetAppDarkMode(true);
    } else {
      handleSetAppDarkMode(false);
    }
  };

  return (
    <>
      <i className={`fa fa-sun me-2 ${iconColor} ${tamanhoMargin}`}></i>
      <div className={`form-check form-switch mb-0 ${tamanhoMargin}`}>
        <input
          type="checkbox"
          className="form-check-input"
          name="app-theme-dark-mode"
          accessKey={8}
          onChange={handleDarkMode}
          id="appThemeDarkMode"
          checked={appDarkMode}
          value="1"
        />
        <label className="form-check-label" htmlFor="appThemeDarkMode">
          &nbsp;
        </label>
        <i className={`fa fa-moon me-3 ${iconColor}`}></i>
      </div>
    </>
  );
};

export default Dark;
