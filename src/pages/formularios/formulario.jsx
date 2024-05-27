import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';
import { Button, ButtonToolbar, Col, Form, Row} from 'react-bootstrap';
import { MultiSelect } from 'primereact/multiselect';
import { Toast } from 'primereact/toast';
import ptBR from 'date-fns/locale/pt-BR';
import { Box } from '@mui/material';

import 'bootstrap-daterangepicker/daterangepicker.css';
import '../../locale/date-moment.js';
import moment from "moment";




export default function Formulario(){
 
    //Funcionamento do wizard
    const [etapaAtual, setEtapaAtual] = useState(0);
    const [estadoNav, setEstadoNav] = useState([]);  
    const etapasNav = ['Identificação', 'Assunto', 'Finalização'];  
   
    useEffect(() => { updateEstadoNav()}, [etapaAtual]);
  
    const updateEstadoNav = () => {
      const totalEtapas = etapasNav.length;
      const estadoNav = Array(totalEtapas).fill('disabled');
      estadoNav[etapaAtual] = 'active';
      if (etapaAtual > 0) {
        for (var i = 0; i < etapaAtual; i++) {
          estadoNav[i] = 'completed';
        }
      }
      setEstadoNav(estadoNav);
    };
    //fim
  
    //comportamento dos botões do formulário
    const handleNext = () => { setEtapaAtual((prevEtapa) => prevEtapa + 1)};
    const handlePrevious = () => {setEtapaAtual((prevEtapa) => prevEtapa - 1)};
  
    const handleSubmit = (event) => {
      event.preventDefault();     
    };

    //Elementos e funções dos elementos do formulário
    
	//renderização dos campos do formulário e exemplos para opções.
    const renderFormFields = () => {   
      switch (etapaAtual) {
        case 0: //Identificação
          return (
            <>
         			<div>
               <h5>Dados Pessoais</h5>
               <p>Para solicitar atendimento, informe seu nome completo, CPF, email e telefone celular para retorno.</p> 
               <div className='text-red'>* Campos obrigatórios</div>
              <hr className='bg-gray-500' style={{margin: '0 0 0.9375rem 0'}}/>
              <Form.Label className='me-3 text-no-wrap'>Interessado <span className='text-red'>*</span></Form.Label>
              <Form.Check type='radio' name='interessado' label='Advogado' inline />
              <Form.Check type='radio' name='interessado' label='Parte' inline />
              <Form.Check type='radio' name='interessado' label='Interessado' inline />

              <Row className='mt-4'>
                <Col>
                  <Form.Group as={Row}>
                    <Form.Label column className='text-no-wrap' sm="2" htmlFor="nome">Nome <span className='text-red'>*</span></Form.Label>
                    <Col sm="10">
                      <Form.Control type="text" id="nome" aria-describedby="Nome"/>
                    </Col>                 
                  </Form.Group>                 
                </Col>
                <Col>
                  <Form.Group as={Row}>
                    <Form.Label column className='text-no-wrap' sm="2" htmlFor="CPF">CPF <span className='text-red'>*</span></Form.Label>
                    <Col sm="10">
                      <Form.Control type="text" id="CPF" aria-describedby="CPF"/>
                    </Col>                 
                  </Form.Group>                 
                </Col>
              </Row>

              <Row className='mt-4'>
                <Col>
                  <Form.Group as={Row}>
                    <Form.Label className='text-no-wrap' column sm="2" htmlFor="celular">Celular <span className='text-red'>*</span></Form.Label>
                    <Col sm="10">
                      <Form.Control type="text" id="celular" aria-describedby="celular"/>
                    </Col>                 
                  </Form.Group>                 
                </Col>
                <Col>
                  <Form.Group as={Row}>
                    <Form.Label column className='text-no-wrap' sm="2" htmlFor="cidade">Cidade <span className='text-red'>*</span></Form.Label>
                    <Col sm="10">
                      <Form.Control type="text" id="cidade" aria-describedby="cidade"/>
                    </Col>                 
                  </Form.Group>                 
                </Col>
              </Row>

              <Row className='mt-4'>
                <Col>
                  <Form.Group as={Row}>
                    <Form.Label column sm="2" className='text-no-wrap' htmlFor="email">Email <span className='text-red'>*</span></Form.Label>
                    <Col sm="10">
                      <Form.Control type="text" id="email" aria-describedby="email"/>
                    </Col>                 
                  </Form.Group>                 
                </Col>
                <Col>
                             
                </Col>
              </Row>
              
                
              </div>
            </>
          );
        case 1: //assunto
          return (
            <>
            <div className='text-red'>* Campos obrigatórios</div>
            <Row className='mt-4'>
              <Col>
                <Form.Group as={Row}>
                  <Form.Label column sm="2" className='pt-0 pb-0' htmlFor="nrProc">Número do Processo <span className='text-red'>*</span></Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" id="nrProc" aria-describedby="nrProc"/>
                  </Col>                 
                </Form.Group>                 
              </Col>
            </Row>
            <Row className='mt-4'>
              <Col>
                <Form.Group as={Row}>
                  <Form.Label column sm="2" className='text-no-wrap' htmlFor="assunto">Assunto <span className='text-red'>*</span></Form.Label>
                  <Col sm="10">
                    <Form.Select type="text" id="assunto" aria-describedby="assunto"/>
                  </Col>                 
                </Form.Group>                 
              </Col>
            </Row>
            <Row className='mt-4 mb-5'>
              <Col>
                <Form.Group as={Row}>
                  <Form.Label column sm="2" className='text-no-wrap' htmlFor="unidade">Unidade <span className='text-red'>*</span></Form.Label>
                  <Col sm="10">
                    <Form.Select type="text" id="unidade" aria-describedby="unidade"/>
                  </Col>                 
                </Form.Group>                 
              </Col>
            </Row>
            </>
          );
        case 2: //finalização
          return (
            <>
            <div className='text-red'>* Campos obrigatórios</div>
            <Row className='mt-4'>
             <Col>
                <Form.Group as={Row}>
                  <Form.Label column sm="2" className='text-no-wrap' htmlFor="msg">Mensagem <span className='text-red'>*</span></Form.Label>
                  <Col sm="10">
                    <Form.Control as="textarea" rows={3} id="msg" aria-describedby="msg"/>
                  </Col>                 
                </Form.Group>                 
              </Col>
            </Row>
            <Row className='mt-4 mb-5'>
             <Col>
                <Form.Group as={Row}>
                  <Form.Label column sm="2" className='pt-0 pb-0' htmlFor="upload">Upload de Arquivo</Form.Label>
                  <Col sm="10">
                  <Form.Control type="file" multiple id="upload"/>
                  <Form.Text muted>
                    Para selecionar mais de um arquivo, mantenha a tecla Ctrl pressionada enquanto clica nos arquivos desejados.
                  </Form.Text>
                  </Col>                 
                </Form.Group>                 
              </Col>
            </Row>
            </>
          );  
        // Adicione casos para cada etapa adicional
  
        default:
          return null;
      }
    };
  
    const totalEtapas = estadoNav.length;

	//success
  const toast = useRef(null)
  const showToast = () => {
    toast.current.show({severity:'success', summary: 'Solicitação enviada com sucesso!', detail:'Anote o número de protocolo: 0123456789-12', life: 1000000});
  }


	//resultado da pesquisa
	
	const mostrarResultados = () => {
    showToast();	
	}

	const horarioPesq = moment();
  
    return (
      <div>
        <h1 className="page-header">Formulário de Atendimento</h1>
       
        <div className="row">
          <div className="col-xl-12">
            <Panel theme="default">
             
              <PanelBody>
			        <Box  className="panelPrincipal">
              
                <div className="nav-wizards-container">
                  <nav className="nav nav-wizards-3 my-2">
                    {estadoNav.map((status, index) => (
                      <div className="nav-item col" key={index}>
                        <Link to={'#etapa-' + index} className={'nav-link ' + status} onClick={() => setEtapaAtual(index)}>
                          <div className="nav-dot"></div>
                          <div className="nav-title">{index + 1}</div>
                          <div className="nav-text">{etapasNav[index]}</div>
                        </Link>
                      </div>
                    ))}
                  </nav>
                </div>
  
                <div className="card card-fixed">
                  <div className="card-body wizard-body">
                    <form onSubmit={handleSubmit}>
                      <div className="card-body ">{renderFormFields()}</div>
  
                      <ButtonToolbar className="button-group-wizard-right">
                        {etapaAtual !== 0 && (
                          <Button type="button" variant="light" className="me-2" onClick={handlePrevious}>
                            Anterior
                          </Button>
                        )}
                        {etapaAtual < totalEtapas - 1 && (
                          <>
                            <Button type="button" variant="primary" className="me-2" onClick={handleNext}>
                              Próximo
                            </Button>
                          </>
                        )}
                        {etapaAtual === totalEtapas - 1 && (
                          <Button type="submit" variant="success" className="me-2" onClick={mostrarResultados}>
                            Enviar
                          </Button>
                        )}
                      </ButtonToolbar>
                    </form>
                    <Toast ref={toast} position='center' />
                  </div>
                </div>
			
			  </Box>
              </PanelBody>
              <div className="hljs-wrapper"></div>
            </Panel>
          </div>
        </div>
      </div>
    );
  };
  
