

import {openInNewTab} from './../helpers/helpers.mjs';

// import global not yet implemented for parcel 2
//import {logos} from '../../assets/images/logos/*';
// Need to import files individually

// Contacts icons
//import linkedIn from 'url:../../assets/images/contacts/linkedin.svg';


const travelIcons = {
}


mapboxgl.accessToken = 'pk.eyJ1IjoiYmViaXV6IiwiYSI6ImNrcGlobXB0NDAyamUycWxndXN1Zjl6NXAifQ.WFz7mt4I5KdPGRYSpPFR2Q';

class TravelsView {
    _parentElement = document.querySelector('.body .body-panel .topic-page');
    _data;
    _map = null;
    _mapStyles = [
        {
            id: "satellite",
            text: "satellite",
            title: "satellite",
            value: "satellite-v9",
        },
        {
            id: "light",
            text: "light",
            title: "light",
            value: "light-v10",
        },
        {
            id: "dark",
            text: "dark",
            title: "dark",
            value: "dark-v10",
        },
        {
            id: "outdoors",
            text: "outdoors",
            title: "outdoors",
            value: "outdoors-v11",
        },
        {
            id: "streets",
            text: "streets",
            title: "streets",
            value: "streets-v11",
        }
    ];

    render(data) {
        this._data = data;

        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('beforeend', markup);

        
        this._generateMap();
        this._setViewEventHandlers();
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderSpinner = function() {
        const markup = ``;
    }

    _generateMap() {
        this._map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [22, 30.00],
            zoom: 1.3,
        });
    }

    _setMapStyles() {
            button.addEventListener("click", (e) => {
              var layerId = e.target.id;
              if (!layerId) return;
          
              this._map.setStyle("mapbox://styles/mapbox/" + layerId);
            });
    }

    _generateMarkup() {
        return `
        <div>!!! PAGE UNDER CONSTRUCTION !!!</div>
        <div class="all-travels-container">
            <div class="map-container">
                <div class="map-style-buttons-container">
                    <button class="map-styles-toggler">
                        <span>Map styles</span>
                    </button>
                    <ul class="map-style-buttons hidden">
                        ${this._mapStyles.map(
                            style => this._generateMapStyleListItemMarkup(style)
                        ).join('')}
                    </ul>
                </div>
                <div id="map">
            </div>
            <div>
            </div>
        </div>
        `;
    }

    _generateMapStyleListItemMarkup(style) {
        return `
            <li class="map-style-list-item">
                <button 
                    class="map-style-button" 
                    data-id="${style.id}" 
                    title="${style.title}">
                        ${style.text}
                </button>
            </li>
        `;
    }

   
    _setViewEventHandlers() {
        this._parentElement.querySelector('.map-styles-toggler')
            .addEventListener(
                'click', 
                () => {
                    const DOMElement = this._parentElement.querySelector('.map-container .map-style-buttons');
                    DOMElement.classList.toggle('hidden');
                }
            );
        
        this._parentElement.querySelector('.map-style-buttons')
            .addEventListener(
                'click', 
                (e) => {
                    const DOMElement = e.target.closest('.map-style-button');
                    if(!DOMElement) return;

                    const DOMElementId = DOMElement.dataset.id;
                    const style = this._mapStyles.find(mapStyle => mapStyle.id == DOMElementId);
                    if (!style) return;
          
                    this._map.setStyle("mapbox://styles/mapbox/" + style.value);

                }
            );
    }
}

export default new TravelsView();