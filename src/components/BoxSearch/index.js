import React, { useState, useEffect } from 'react';
import { FaCar, FaMotorcycle } from 'react-icons/fa';
import { Form, Check, Input } from '@rocketseat/unform';
import { Row, Col } from 'react-grid-system';
import ReactSelect from '../ReactSelect';

import { Container, Content, Header, HeaderItem, Card, ClearFilterButton, OfferButton } from './styles';

import api from '../../services/api';
import { formatPrice, formatNumber } from '../../util/format';

export default function BoxSearch() {
    const [vehicleSize, setVehicleSize] = useState('car');
    const [ratios] = useState([
      {
        id: 1,
        title: 'Raio: 100km'
      },
      {
        id: 2,
        title: 'Raio: 200km'
      },
      {
        id: 3,
        title: 'Raio: 300km'
      },
      {
        id: 4,
        title: 'Raio: 400km'
      },
      {
        id: 5,
        title: 'Raio: 500km'
      }
    ]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [years] = useState([
      {
        id: 1,
        title: 2015
      },
      {
        id: 2,
        title: 2016
      },
      {
        id: 3,
        title: 2017
      },
      {
        id: 4,
        title: 2018
      },
      {
        id: 5,
        title: 2019
      },
      {
        id: 6,
        title: 2020
      }
    ]);

    const [priceRanges] = useState([
      {
        id: 1,
        title: 'R$ 0,00 - R$ 10.000,00'
      },
      {
        id: 2,
        title: 'R$ 10.000,01 - R$ 30.000,00'
      },
      {
        id: 3,
        title: 'R$ 30.000,01 - R$ 60.000,00'
      },
      {
        id: 4,
        title: 'R$ 60.000,00 - R$ 100.000,00'
      }
    ])

    const [versions, setVersions] = useState([]);
    const [brand, setBrand] = useState();
    const [model, setModel] = useState();
    const [, setVersion] = useState();
    const [vehicles, setVehicles] = useState([]);
    const [, setFilteredVehicles] = useState([]);

    useEffect(() => {
        async function loadBrands() {
        try {
            const response = await api.get('Make');

            const { data } = response;

            const dataFormatted = data.map(brandItem => ({
                id: brandItem.ID,
                title: brandItem.Name,
            }));

            setBrands(dataFormatted);
        } catch (error) {
            console.error(error.response.data);
      }

      ;
    }

    async function loadVehicles() {
        try {
            

            const response = await api.get('Vehicles');

            const { data } = response;

            const dataFormatted = data.map(vehicle => ({
                id: vehicle.ID,
                brand: vehicle.Make,
                model: vehicle.Model,
                version: vehicle.Version,
                image: vehicle.Image,
                km: vehicle.KM,
                kmFormatted: formatNumber(parseFloat(vehicle.KM)),
                price: vehicle.Price,
                priceFormatted: formatPrice(parseFloat(vehicle.Price)),
                yearModel: vehicle.YearModel,
                yearFab: vehicle.YearFab,
                color: vehicle.Color,
            }));

            setVehicles(dataFormatted);
            setFilteredVehicles(dataFormatted);
        } catch (error) {
            console.error(error.response.data);
      }
    }

        loadBrands();
        loadVehicles();
  }, []);

    useEffect(() => {
        async function loadModels() {
            try {
                const response = await api.get('Model', {
                params: { MakeId: brand.id },
            });

        const { data } = response;

        const dataFormatted = data.map(item => ({
          id: item.ID,
          title: item.Name,
        }));

        setModels(dataFormatted);
        } catch (error) {
        console.error(error.response.data);
    }
  }

    if (brand) {
      loadModels();
    }
  }, [brand]);

  useEffect(() => {
    async function loadVersions() {
      try {
        const response = await api.get('Version', {
          params: { ModelID: model.id },
        });

        const { data } = response;

        const dataFormatted = data.map(item => ({
          id: item.ID,
          title: item.Name,
        }));

        setVersions(dataFormatted);
      } catch (error) {
        console.error(error.response.data);
      }
    }

    if (model) {
      loadVersions();
    }
  }, [model]);

  function handleSetVehicleSize(size) {
    setVehicleSize(size);
  }

  function handleSubmit(data) {
    try {
      const brandFilter = brands.find(
        brandItem => brandItem.id === parseInt(data.brand, 10)
      );

      const modelFilter = models.find(
        modelItem => modelItem.id === parseInt(data.model, 10)
      );

      const versionFilter = versions.find(
        versionItem => versionItem.id === parseInt(data.version, 10)
      );

      const yearFilter = years.find(
        yearItem => yearItem.id === parseInt(data.year, 10)
      );

      const response = vehicles.filter(vehicle => {
        return (
          vehicle.brand === brandFilter.title &&
          vehicle.model === modelFilter.title &&
          vehicle.version === versionFilter.title &&
          vehicle.yearModel === parseInt(yearFilter.title, 10)
        );
      });

      setFilteredVehicles(response);
    } catch (error) {
      console.error(error);
    }
  }

  function handleClearFilters() {
    setFilteredVehicles(vehicles);
  }

    return (
        <Container>
      <Content>
        <Header>
          <ul>
            <HeaderItem active={vehicleSize === 'car'}>
              <button type="button" onClick={() => handleSetVehicleSize('car')}>
                <div>
                  <FaCar size={32} />
                </div>
                <div className="label">
                  <span>comprar</span>
                  <h1>Carros</h1>
                </div>
              </button>
            </HeaderItem>
            <HeaderItem active={vehicleSize === 'motorcycle'}>
              <button
                type="button"
                onClick={() => handleSetVehicleSize('motorcycle')}
              >
                <div>
                  <FaMotorcycle size={32} />
                </div>
                <div className="label">
                  <span>comprar</span>
                  <h1>Motos</h1>
                </div>
              </button>
            </HeaderItem>
          </ul>

          <a href="https://webmotors.com.br/vender" target="__blank">
            Vender meu carro
          </a>
        </Header>
        <Card>
          <Form
            onSubmit={handleSubmit}
            initialData={{
              where: 'Onde: São Paulo - SP',
              ratio: 1,
              year: 6,
              price: 1,
            }}
          >
            <Row className="checkbox-row">
              <Col>
                <Check name="news" label="Novos" className="checkbox" />
                <Check name="used" label="Usados" className="checkbox" />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6}>
                <Row>
                  <Col sm={12} md={6}>
                    <Input
                      name="where"
                      placeholder="Onde:"    
                    />
                  </Col>
                  <Col sm={12} md={6}>
                    <ReactSelect
                      placeholder="Raio: 100km"
                      name="ratio"
                      options={ratios}
                    />
                  </Col>
                </Row>
              </Col>
              <Col sm={12} md={6}>
                <Row>
                  <Col sm={12} md={6}>
                    <ReactSelect
                      name="brand"
                      placeholder="Marca: Todas"
                      onChange={setBrand}
                      options={brands}
                    />
                  </Col>
                  <Col sm={12} md={6}>
                    <ReactSelect
                      name="model"
                      onChange={setModel}
                      placeholder="Modelo: Todos"
                      options={models}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6}>
                <Row>
                  <Col sm={12} md={6}>
                    <ReactSelect
                      name="year"
                      placeholder="Ano Desejado"
                      options={years}
                    />
                  </Col>
                  <Col sm={12} md={6}>
                    <ReactSelect
                      name="price"
                      placeholder="Faixa de Preço"
                      options={priceRanges}
                    />
                  </Col>
                </Row>
              </Col>
              <Col sm={12} md={6}>
                <Row>
                  <Col sm={12}>
                    <ReactSelect
                      name="version"
                      onChange={setVersion}
                      placeholder="Versão: Todas"
                      options={versions}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="bottom-row">
              <a href="https://webmotors.com.br" target="__blank">
                ❯ Busca avançada
              </a>
              <div>
                <ClearFilterButton
                  type="button"
                  onClick={() => handleClearFilters()}
                >
                  Limpar filtros
                </ClearFilterButton>
                <OfferButton  type="submit">
                  Ver ofertas
                </OfferButton>
              </div>
            </div>
          </Form>
        </Card>
        </Content>
    </Container>
    )
}