import React, { useState, useContext } from 'react';
import { slideToggle } from './../../composables/slideToggle.js';

const PanelStat = React.createContext();

function Panel(props) {
  const [expand, setExpand] = useState(false);
  const [reload, setReload] = useState(false);
  const [remove, setRemove] = useState(false);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const toggleRemove = () => {
    setRemove(!remove);
  };

  const toggleCollapse = (e) => {
    slideToggle(e.target.closest('.panel').querySelector('.panel-body'));
  };

  const toggleReload = () => {
    if (!reload) {
      setReload(true);
      setTimeout(() => {
        setReload(false);
        props.resetForm && props.resetForm();
      }, 1000);
    }
  };

  const state = {
    expand,
    reload,
    remove,
    toggleExpand,
    toggleReload,
    toggleRemove,
    toggleCollapse
  };

  return (
    <PanelStat.Provider value={state}>
      {!remove && (
        <div
          id={props.id}
          className={
            'panel panel-' +
            (props.theme ? props.theme : 'inverse') +
            ' ' +
            (expand ? 'panel-expand ' : ' ') +
            (reload ? 'panel-loading ' : ' ') +
            (props.className ? props.className : '')
          }>
          {props.children}
        </div>
      )}
    </PanelStat.Provider>
  );
}

function PanelHeader(props) {
  return (
    <div className={'panel-heading ' + props.className}>
      <h4 className="panel-title">{props.children}</h4>
      {!props.noButton && (
        <PanelStat.Consumer>
          {({ toggleExpand, toggleRemove, toggleCollapse, toggleReload }) => (
            <div className="panel-heading-btn">
              <button
                className="btn btn-xs btn-icon btn-circle btn-default"
                onClick={toggleExpand}
                title="Expandir painel">
                <i className="fa fa-expand"></i>
              </button>
              &nbsp;&nbsp;
              <button
                className="btn btn-xs btn-icon btn-circle btn-success"
                onClick={toggleReload}
                title="Limpar dados">
                <i className="fa fa-redo"></i>
              </button>
              &nbsp;&nbsp;
              <button
                className="btn btn-xs btn-icon btn-circle btn-warning"
                onClick={toggleCollapse}
                title="Minimizar painel">
                <i className="fa fa-minus"></i>
              </button>
              &nbsp;&nbsp;
              {/* <button className="btn btn-xs btn-icon btn-circle btn-danger" onClick={toggleRemove} title='Excluir painel'>
                <i className="fa fa-times"></i>
              </button> */}
            </div>
          )}
        </PanelStat.Consumer>
      )}
    </div>
  );
}

function PanelBody(props) {
  return (
    <PanelStat.Consumer>
      {({ reload }) => (
        <div className={'panel-body ' + props.className}>
          {props.children}
          {reload && (
            <div className="panel-loader">
              <span className="spinner spinner-sm"></span>
            </div>
          )}
        </div>
      )}
    </PanelStat.Consumer>
  );
}

function PanelFooter(props) {
  return <div className={'panel-footer ' + props.className}>{props.children}</div>;
}

export { Panel, PanelHeader, PanelBody, PanelFooter };
