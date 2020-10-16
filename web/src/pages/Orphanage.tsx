import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo, FiArrowLeft } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import "../styles/pages/orphanage.css";
import Sidebar from "../components/Sidebar";
import happyMapIcon from "../utils/mapIcon";
import api from "../services/api";

interface Orphanage {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekdends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface OrphanageParams {
  id: string;
}

export default function Orphanage() {
  const params = useParams<OrphanageParams>();
  const { goBack } = useHistory();

  //Lista de orfanatos e uma função para atualizar o array
  const [orphanage, setOrphanage] = useState<Orphanage>(); //Especifica o tipo de dados que o state vai ter

  //Para mudar as fotos, quando mudar o estado da variável a foto irá mudar também
  const [ activeImageIndex, setActiveImageIndex] = useState(0);
  //Executar assim que o componente carregar
  //Qual ação eu quero executar, quando eu quero executar
  useEffect(() => {
    api.get(`orphanages/${params.id}`).then((response) => {
      //Setando novos valores
      setOrphanage(response.data);
    });
  }, [params.id]); //Array de dependência

  if (!orphanage) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">

          //Mostra todas as imagens cadastradas
          <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map((image, index) => {
              return (
                <button 
                  key={image.id}
                  //Mostrar a classe active da imagem ativa
                  className={activeImageIndex === index ? 'active' : ''}
                  type="button"
                  /* A cada vez que clicar, irá mandar o indece correte
                     para a variável ActiveImageIndex
                  */
                  onClick={() => {
                    setActiveImageIndex(index)
                  }}
                >
                  <img
                    src={image.url}
                    alt={orphanage.name}
                  />
                </button>
              );
            })}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: "100%", height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </Map>

              <footer>
                <a target="_blank" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                {orphanage.opening_hours}
              </div>

              {/* Se oorfanato abre nos finais de semana, mostrar os dias, //Se
              não, mostrar que não abre nos finais de semana */}
              {orphanage.open_on_weekdends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos nos <br />
                  finais de semana
                </div>
              ) : (
                <div className="dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não atendemos <br />
                  nos finais de semana
                </div>
              )}
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}
