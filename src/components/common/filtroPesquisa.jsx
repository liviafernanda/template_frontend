import React, { useState, useEffect, useRef } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Row, Form, Col } from 'react-bootstrap';
import { listServentiasInvetario } from '../../api/admin_api';

const FiltroPesquisa = ({
  subGruposSelecionado,
  setSubGruposSelecionado,
  comarcasSelecionada,
  setComarcasSelecionada,
  upjSelecionada,
  setUpjSelecionada,
  varasSelecionada,
  setVarasSelecionada,
  serventiasSelecionada,
  setServentiasSelecionada,
  setSubGruposLabels,
  setVarasLabels,
  setUpjLabels,
  fnOpcoesCarregadas
}) => {
  const [subGruposOptions, setSubGruposOptions] = useState([]);
  const [comarcasOptions, setComarcasOptions] = useState([]);
  const [upjOptions, setUpjOptions] = useState([]);
  const [varasOptions, setVarasOptions] = useState([]);
  const [serventiasOptions, setServentiasOptions] = useState([]);
  const [serventiasInventario, setServentiasInventario] = useState([]);
  const opcoesCarregadas = useRef(false);
  const placeholderMultiplo = 'Clique para selecionar ou deixe em branco para pesquisar todos';

  const fetchServentiasInventario = async () => {
    const data = await listServentiasInvetario();
    setServentiasInventario(data);
    if (!!fnOpcoesCarregadas && !opcoesCarregadas.current) fnOpcoesCarregadas(data);
    opcoesCarregadas.current = true;
  };

  const loadSubGrupos = async () => {
    const optionsSubGrupos = serventiasInventario
      .filter((objeto) => objeto.subgrupo && objeto.subgrupo_id)
      .sort((a, b) => a.subgrupo.localeCompare(b.subgrupo))
      .map((objeto) => ({ label: objeto.subgrupo, value: objeto.subgrupo_id }))
      .filter((valor, indice, self) => indice === self.findIndex((v) => v.value === valor.value));
    setSubGruposOptions(optionsSubGrupos);
  };

  const loadComarcas = async () => {
    let data = serventiasInventario;
    if (subGruposSelecionado && subGruposSelecionado.length !== 0) {
      data = data.filter((objeto) => subGruposSelecionado.includes(objeto.subgrupo_id));
    }
    const optionsComarcas = data
      .filter((objeto) => objeto.comarca_sistema)
      .sort((a, b) => a.comarca_sistema.localeCompare(b.comarca_sistema))
      .map((objeto) => ({ label: objeto.comarca_sistema, value: objeto.comarca_sistema }))
      .filter((valor, indice, self) => indice === self.findIndex((v) => v.value === valor.value));
    setComarcasOptions(optionsComarcas);
  };

  const loadUpj = async () => {
    let data = serventiasInventario;
    if (subGruposSelecionado && subGruposSelecionado.length !== 0) {
      data = data.filter((objeto) => subGruposSelecionado.includes(objeto.subgrupo_id));
    }
    if (comarcasSelecionada && comarcasSelecionada.length !== 0) {
      data = data.filter((objeto) => comarcasSelecionada.includes(objeto.comarca_sistema));
    }
    const optionsUpj = data
      .filter((objeto) => objeto.upj && objeto.upj_id)
      .sort((a, b) => {
        const compareComarca = a.comarca_sistema.localeCompare(b.comarca_sistema);
        if (compareComarca !== 0) {
          return compareComarca;
        }
        return a.upj.localeCompare(b.upj);
      })
      .map((objeto) => ({
        label: objeto.comarca_sistema + ' - ' + objeto.upj,
        value: objeto.upj_id
      }))
      .filter((valor, indice, self) => indice === self.findIndex((v) => v.value === valor.value));
    setUpjOptions(optionsUpj);
  };

  const loadVaras = async () => {
    let data = serventiasInventario;
    if (subGruposSelecionado && subGruposSelecionado.length !== 0) {
      data = data.filter((objeto) => subGruposSelecionado.includes(objeto.subgrupo_id));
    }
    if (comarcasSelecionada && comarcasSelecionada.length !== 0) {
      data = data.filter((objeto) => comarcasSelecionada.includes(objeto.comarca_sistema));
    }
    if (upjSelecionada && upjSelecionada.length !== 0) {
      data = data.filter((objeto) => upjSelecionada.includes(objeto.upj_id));
    }
    const optionsVaras = data
      .filter((objeto) => objeto.vara && objeto.vara_id)
      .sort((a, b) => {
        const compareComarca = a.comarca_sistema.localeCompare(b.comarca_sistema);
        if (compareComarca !== 0) {
          return compareComarca;
        }
        return a.vara.localeCompare(b.vara);
      })
      .map((objeto) => ({
        label: objeto.comarca_sistema + ' - ' + objeto.vara,
        value: objeto.vara_id
      }))
      .filter((valor, indice, self) => indice === self.findIndex((v) => v.value === valor.value));

    setVarasOptions(optionsVaras);
  };

  const loadServentias = async () => {
    let data = serventiasInventario;
    if (subGruposSelecionado && subGruposSelecionado.length !== 0) {
      data = data.filter((objeto) => subGruposSelecionado.includes(objeto.subgrupo_id));
    }
    if (comarcasSelecionada && comarcasSelecionada.length !== 0) {
      data = data.filter((objeto) => comarcasSelecionada.includes(objeto.comarca_sistema));
    }
    if (upjSelecionada && upjSelecionada.length !== 0) {
      data = data.filter((objeto) => upjSelecionada.includes(objeto.upj_id));
    }
    if (varasSelecionada && varasSelecionada.length !== 0) {
      data = data.filter((objeto) => varasSelecionada.includes(objeto.vara_id));
    }
    const optionsServentias = data
      .filter((objeto) => objeto.serventia_sistema)
      .sort((a, b) => a.serventia_sistema.localeCompare(b.serventia_sistema))
      .map((objeto) => ({ label: objeto.serventia_sistema, value: objeto.serventia_sistema }))
      .filter((valor, indice, self) => indice === self.findIndex((v) => v.value === valor.value));
    setServentiasOptions(optionsServentias);
  };

  useEffect(() => {
    fetchServentiasInventario();
  }, []);

  useEffect(() => {
    if (serventiasInventario) {
      loadSubGrupos();
      loadComarcas();
      loadUpj();
      loadVaras();
      loadServentias();
    }
  }, [serventiasInventario]);

  useEffect(() => {
    loadComarcas();
  }, [subGruposSelecionado]);

  useEffect(() => {
    loadUpj();
    loadVaras();
  }, [comarcasSelecionada]);

  useEffect(() => {
    loadVaras();
  }, [upjSelecionada]);

  useEffect(() => {
    loadServentias();
  }, [varasSelecionada]);

  useEffect(() => {
    if (serventiasSelecionada && setServentiasSelecionada) {
      const novasServentiasSelecionada = serventiasSelecionada.filter((valor) =>
        serventiasOptions.some((opcao) => opcao.value === valor)
      );
      setServentiasSelecionada(novasServentiasSelecionada);
    }
  }, [serventiasOptions]);

  useEffect(() => {
    if (upjSelecionada && setUpjSelecionada) {
      const novasUpjSelecionada = upjSelecionada.filter((valor) =>
        upjOptions.some((opcao) => opcao.value === valor)
      );
      setUpjSelecionada(novasUpjSelecionada);
    }
  }, [upjOptions]);

  useEffect(() => {
    if (varasSelecionada && setVarasSelecionada) {
      const novasVarasSelecionada = varasSelecionada.filter((valor) =>
        varasOptions.some((opcao) => opcao.value === valor)
      );
      setVarasSelecionada(novasVarasSelecionada);
    }
  }, [varasOptions]);

  useEffect(() => {
    if (comarcasSelecionada && setComarcasSelecionada) {
      const novasComarcasSelecionada = comarcasSelecionada.filter((valor) =>
        comarcasOptions.some((opcao) => opcao.value === valor)
      );
      setComarcasSelecionada(novasComarcasSelecionada);
    }
  }, [comarcasOptions]);

  const handleMultiSelectChange = (e, setSelecionado, setLabels, options) => {
    setSelecionado(e.value);
    if (setLabels) {
      if (e.value) {
        const labelsSelecionados = e.value.map((value) => {
          let option = options.find((option) => option.value === value);
          return option ? option.label : '';
        });
        setLabels(labelsSelecionados);
      } else {
        setLabels([]);
      }
    }
  };

  return (
    <>
      {setSubGruposSelecionado && (
        <Row className="mt-4">
          <Col>
            <Form.Label for="agrupamento">Agrupamento</Form.Label>
            <MultiSelect
              filter
              id="agrupamento"
              value={subGruposSelecionado}
              onChange={(e) => {
                handleMultiSelectChange(
                  e,
                  setSubGruposSelecionado,
                  setSubGruposLabels,
                  subGruposOptions
                );
              }}
              resetFilterOnHide={true}
              options={subGruposOptions}
              optionLabel={(subGruposOptions) => subGruposOptions.label}
              name="agrupamento"
              display="chip"
              placeholder={placeholderMultiplo}
              showClear="true"
              appendTo={'self'}
              className="w-full md:w-20rem mb-4"
            />
          </Col>
        </Row>
      )}
      {setComarcasSelecionada && (
        <Row>
          <Col>
            <Form.Label for="comarcas">Comarcas</Form.Label>
            <MultiSelect
              filter
              id="comarcas"
              value={comarcasSelecionada}
              onChange={(e) => {
                setComarcasSelecionada(e.value);
              }}
              options={comarcasOptions}
              optionLabel={(comarcasOptions) => comarcasOptions.label}
              display="chip"
              placeholder={placeholderMultiplo}
              className="w-full md:w-20rem mb-4"
              showClear="true"
              appendTo={'self'}
            />
          </Col>
        </Row>
      )}
      {setUpjSelecionada && (
        <Row>
          <Col>
            <Form.Label for="upj">UPJ</Form.Label>
            <MultiSelect
              filter
              id="upj"
              value={upjSelecionada}
              onChange={(e) => {
                handleMultiSelectChange(e, setUpjSelecionada, setUpjLabels, upjOptions);
              }}
              resetFilterOnHide={true}
              options={upjOptions}
              optionLabel={(upjOptions) => upjOptions.label}
              name="upj"
              display="chip"
              placeholder={placeholderMultiplo}
              showClear="true"
              className="mb-4"
              appendTo={'self'}
            />
          </Col>
        </Row>
      )}
      {setVarasSelecionada && (
        <Row>
          <Col>
            <Form.Label for="varas">Varas</Form.Label>
            <MultiSelect
              filter
              id="varas"
              value={varasSelecionada}
              onChange={(e) => {
                handleMultiSelectChange(e, setVarasSelecionada, setVarasLabels, varasOptions);
              }}
              options={varasOptions}
              optionLabel={(varasOptions) => varasOptions.label}
              display="chip"
              placeholder={placeholderMultiplo}
              className="w-full md:w-20rem mb-4"
              showClear="true"
              appendTo={'self'}
            />
          </Col>
        </Row>
      )}
      {setServentiasSelecionada && (
        <Row>
          <Col>
            <Form.Label for="serventias">Serventias</Form.Label>
            <MultiSelect
              filter
              id="serventias"
              value={serventiasSelecionada}
              onChange={(e) => setServentiasSelecionada(e.value)}
              options={serventiasOptions}
              optionLabel={(serventiasOptions) => serventiasOptions.label}
              display="chip"
              placeholder={placeholderMultiplo}
              showClear
              className="w-full md:w-20rem mb-4"
              appendTo={'self'}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default FiltroPesquisa;
