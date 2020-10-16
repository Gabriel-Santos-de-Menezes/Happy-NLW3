import React, { FormEvent, useState, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";

import { useHistory } from "react-router-dom";

import { FiPlus } from "react-icons/fi";

import "../styles/pages/create-orphanage.css";
import Sidebar from "../components/Sidebar";
import happyMapIcon from "../utils/mapIcon";
import api from "../services/api";

export default function CreateOrphanage() {
  const history = useHistory();


  //state do position
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  //state name
  const [name, setName] = useState("");
  //state about
  const [about, setAbout] = useState("");
  //state instructions
  const [instructions, setInstructions] = useState("");
  //state opening_hours
  const [opening_hours, setOpeningHours] = useState("");
  //state open_on_weekends
  const [open_on_weekdends, setOpenOnWeekends] = useState(true);
  //state images
  const [ images, setImages] = useState<File[]>([])
  //State de endereços de preview das imagens
  const[previewImages, setPreviewImages] = useState<string[]>([]);

  function handlleMapClick(event: any) {
    //seta a latitude e longitude a onde o usuário clicou no map
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
    //console.log(event.target.files)

    if(!event.target.files){
      return;
    }

    //Converte file em array e seta na variável images
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);

    /* Passar por todas as imagens e para cada imagem
       criar um objectURL para fazer o preview das imagens no navegador
    */
    const selectedImagesPreview = selectedImages.map(image =>{
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent) {
    //Previnir que aconteça o reload da página
    //quando clicar no botão confirmar
    event.preventDefault();

    const { latitude, longitude } = position;

    //Enviar dados multiform através do formulário
    const data = new FormData();

    
    console.log({
      name,
      about,
      latitude,
      longitude,
      instructions,
      opening_hours,
      open_on_weekdends,
      images,
    });

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekdends', String(open_on_weekdends));

    images.forEach(image =>{
      data.append('images', image);
    })

    await api.post('orphanages', data);
    
    //Após o cadastro  é acionado o alert e redirecionado para a página index
    alert('Cadastro realizado com sucesso')

    history.push('/app')
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-27.2092052, -49.6401092]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
              onclick={handlleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude != 0 && (
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              {/* Altera o estado do name com base no que o usuário digitar */}
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={(event) => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image =>{
                  return(
                    <img key={image} src={image} alt={name}/>
                  )
                })}

                {/* Esconder input file, e quando clicar no label abri-lo */}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

              </div>
              <input multiple onChange={handleSelectImages} type="file" id="image[]"/>

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={(event) => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekdends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekdends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
