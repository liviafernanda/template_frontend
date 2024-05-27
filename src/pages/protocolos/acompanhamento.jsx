import React from 'react';
import { Link }from 'react-router-dom';
import {Row, Col, Container, Button, ButtonToolbar} from 'react-bootstrap';
import { Panel, PanelBody, PanelHeader } from '../../components/panel/panel';


export default function AcompanhamentoProtocolo () {
    return (
        <div>       
           <h1 className="page-header">Acompanhamento do Protocolo de Atendimento</h1>
        <Row>
          <Col>
            <Panel theme="default">
              <PanelHeader noButton={true}>Protocolo nº 0123456789-12 </PanelHeader>
              <PanelBody>
                <Container>
                    <Row className="my-5" style={{ minHeight: '300px'}}>
                      <Col>
                        
                      </Col>
                    </Row>
                    <ButtonToolbar className="button-group-wizard-right my-4 mt-4">
                      <Link to="/">
                        <Button type="button" variant="light" className="me-2" >
                          Voltar
                        </Button>
                      </Link>
                    </ButtonToolbar>
                
                </Container>
              </PanelBody>
             
            </Panel>
          </Col>
        </Row>
      </div>
  
    )
}