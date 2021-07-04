
// Travels pictures

// Russia-Finland-Estonia
// Moscow
import moscow_01 from 'url:../../assets/images/travels/Russia/Moscow/Moscow_01.jpg';
import moscow_02 from 'url:../../assets/images/travels/Russia/Moscow/Moscow_02.jpg';
import moscow_03 from 'url:../../assets/images/travels/Russia/Moscow/Moscow_03.jpg';
import moscow_04 from 'url:../../assets/images/travels/Russia/Moscow/Moscow_04.jpg';
import moscow_05 from 'url:../../assets/images/travels/Russia/Moscow/Moscow_05.jpg';

// Saint Petersburg
import saint_petersburg_01 from 'url:../../assets/images/travels/Russia/Saint Petersburg/Saint_Petersburg_01.jpg';
import saint_petersburg_02 from 'url:../../assets/images/travels/Russia/Saint Petersburg/Saint_Petersburg_02.jpg';
import saint_petersburg_03 from 'url:../../assets/images/travels/Russia/Saint Petersburg/Saint_Petersburg_03.jpg';
import saint_petersburg_04 from 'url:../../assets/images/travels/Russia/Saint Petersburg/Saint_Petersburg_04.jpg';
import saint_petersburg_05 from 'url:../../assets/images/travels/Russia/Saint Petersburg/Saint_Petersburg_05.jpg';

// Cuba
// Havana
import havana_01 from 'url:../../assets/images/travels/Cuba/Havana/Havana_01.jpg';
import havana_02 from 'url:../../assets/images/travels/Cuba/Havana/Havana_02.jpg';
import havana_03 from 'url:../../assets/images/travels/Cuba/Havana/Havana_03.jpg';
import havana_04 from 'url:../../assets/images/travels/Cuba/Havana/Havana_04.jpg';
import havana_05 from 'url:../../assets/images/travels/Cuba/Havana/Havana_05.jpg';

// Cayo Largo
import cayo_largo_01 from 'url:../../assets/images/travels/Cuba/Cayo Largo/Cayo_Largo_01.jpg';
import cayo_largo_02 from 'url:../../assets/images/travels/Cuba/Cayo Largo/Cayo_Largo_02.jpg';
import cayo_largo_03 from 'url:../../assets/images/travels/Cuba/Cayo Largo/Cayo_Largo_03.jpg';

// Varadero
import varadero_01 from 'url:../../assets/images/travels/Cuba/Varadero/Varadero_01.jpg';
import varadero_02 from 'url:../../assets/images/travels/Cuba/Varadero/Varadero_02.jpg';
import varadero_03 from 'url:../../assets/images/travels/Cuba/Varadero/Varadero_03.jpg';
import varadero_04 from 'url:../../assets/images/travels/Cuba/Varadero/Varadero_04.jpg';

// Scotland
// Edinburgh
import edinburgh_01 from 'url:../../assets/images/travels/Scotland/Edinburgh/Edinburgh_01.jpg';
import edinburgh_02 from 'url:../../assets/images/travels/Scotland/Edinburgh/Edinburgh_02.jpg';
import edinburgh_03 from 'url:../../assets/images/travels/Scotland/Edinburgh/Edinburgh_03.jpg';
import edinburgh_04 from 'url:../../assets/images/travels/Scotland/Edinburgh/Edinburgh_04.jpg';
import edinburgh_05 from 'url:../../assets/images/travels/Scotland/Edinburgh/Edinburgh_05.jpg';

const previews = {
    // Russia-Finland-Estonia
    // Moscow
    moscow_01,
    moscow_02,
    moscow_03,
    moscow_04,
    moscow_05,

    // Saint_Petersburg
    saint_petersburg_01,
    saint_petersburg_02,
    saint_petersburg_03,
    saint_petersburg_04,
    saint_petersburg_05,

    // Cuba
    // Havana
    havana_01,
    havana_02,
    havana_03,
    havana_04,
    havana_05,

    // Cayo Largo
    cayo_largo_01,
    cayo_largo_02,
    cayo_largo_03,

    // Varadero
    varadero_01,
    varadero_02,
    varadero_03,
    varadero_04,

    // Scotland
    // Edinburgh
    edinburgh_01,
    edinburgh_02,
    edinburgh_03,
    edinburgh_04,
    edinburgh_05,
    
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
            selected: false
        },
        {
            id: "light",
            text: "light",
            title: "light",
            value: "light-v10",
            selected: false
        },
        {
            id: "dark",
            text: "dark",
            title: "dark",
            value: "dark-v10",
            selected: true
        },
        {
            id: "outdoors",
            text: "outdoors",
            title: "outdoors",
            value: "outdoors-v11",
            selected: false
        },
        {
            id: "streets",
            text: "streets",
            title: "streets",
            value: "streets-v11",
            selected: false
        }
    ];

    render(data) {
        this._data = data;

        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('beforeend', markup);

        
        this._setMap();
        this._setViewEventHandlers();
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderSpinner = function() {
        const markup = ``;
    }

    _setMap() {
        const selectedStyle = this._mapStyles.find(style => style.selected);
        if(!selectedStyle) {
            selectedStyle = this._mapStyles[0];
        }

        this._map = new mapboxgl.Map({
            container: "map",
            style: `mapbox://styles/mapbox/${selectedStyle.value}`,
            center: [22, 30.00],
            zoom: 1.3,
        });

        this._setMarkers();
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
            <div>This page is under development</div>
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
                    <div id="map"></div>
                </div>
                <div class="travels-container">
                    ${this._data.map(
                        travel => this._generateTravelMarkup(travel)
                    ).join('')}
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

    _generateTravelMarkup(travel) {
        return `
            <div class="travel-container"
                data-id="${travel.id}">
                <div class="travel-info-container">
                    <div class="travel-header">
                        <h2 class="travel-title">${travel.text}</h2>
                    </div>
                    <div class="travel-body">
                        <div class="travel-info">
                            <span>From:</span>
                            <span> ${travel.fromDate}</span>
                        </div>
                        <div class="travel-info">
                            <span>To:</span>
                            <span> ${travel.toDate}</span>
                        </div>
                    </div>
                    <div class="travel-footer">
                    </div>
                    <div class="separator"></div>
                </div>
                <div class="travel-stops hidden">
                    ${travel.stops.map(
                        stop => this._generateStopMarkup(stop)
                    ).join('')}
                </div>
            </div>
        `;
    }

    _generateStopMarkup(stop) {
        return `
            <div class="stop-container"
                data-id="${stop.id}">
                <div class="stop-header">
                    <h2 class="stop-title">${stop.text}</h2>
                </div>
                <div class="stop-body">
                    <div class="stop-info">
                        <span>From:</span>
                        <span> ${stop.fromDate}</span>
                    </div>
                    <div class="stop-info">
                        <span>To:</span>
                        <span> ${stop.toDate}</span>
                    </div>
                </div>
                <div class="stop-footer">
                </div>
                <div class="stop-gallery">
                    ${ stop.pictures.count == 0 ? 
                        "" :
                        stop.pictures.map(
                            picture => this._generatePictureMarkup(picture)
                        ).join('')
                    }
                </div>
                <div class="separator"></div>
            </div>
        `;
    }

    _generatePictureMarkup(picture) {
        return `
            <button 
                class="card-travel raised" 
                data-id="${picture.id}">
                <div class="card-header">
                    <span class="card-title">${picture.title}</span>
                </div>
                <div class="card-body">
                    <div class="preview-container">
                        <img
                            class="preview" 
                            alt="'${picture.title}' certificate preview" 
                            src="${previews[picture.preview]}">
                    </div>
                    <div class="info-container">
                    </div>
                </div>
                <div class="card-footer"></div>
            </button>
        `;
    }

    _generateMarkerPopupMarkup(stop) {
        return `
            <div class="marker-popup">
                <div class="marker-popup-header">
                    <span>${stop.text}</span>
                </div>
                <div class="marker-popup-body">
                    <a href="${stop.id}">See ${stop.text} pictures</a>
                </div>
                <div class="marker-popup-footer"></div>
            </div>
        `;
    }

    _setMarkers() {
        this._data.forEach(travel => {
            travel.stops.forEach(stop => {
                let el = document.createElement('div');
                el.className = 'marker';
                
                let marker = new mapboxgl.Marker()
                    .setLngLat([stop.coordinates.lng, stop.coordinates.lat])
                    .setPopup(new mapboxgl.Popup().setHTML(this._generateMarkerPopupMarkup(stop)))
                    .addTo(this._map);

                if (!marker) return;
                const markerDiv = marker.getElement();
                markerDiv.addEventListener('click', () => marker.togglePopup());
                //markerDiv.addEventListener('mouseleave', () => marker.togglePopup());
            });
        });
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

        Object.values(this._parentElement.querySelectorAll('.travel-info-container')).forEach(travelContainer => {
            travelContainer.addEventListener(
                'click', 
                (e) => {
                    const DOMElement = e.target.closest('.travel-info-container');
                    if(!DOMElement) return;

                    DOMElement.nextElementSibling.classList.toggle('hidden');
                }
            );
        });
        
    }

    addImageHandlerClick(handler) {
        Object.values(this._parentElement.querySelectorAll('.stop-gallery')).forEach(gallery => {
            gallery.addEventListener('click', (e) => {
                const imageDomElement = e.target.closest('.card-travel');
                if(!imageDomElement) return;

                const stopDomElement = imageDomElement.closest('.stop-container');
                if(!stopDomElement) return;

                const travelDomElement = imageDomElement.closest('.travel-container');
                if(!stopDomElement) return;

                
                const imageDomElementId = imageDomElement.dataset.id;
                const stopDomElementId = stopDomElement.dataset.id;
                const travelDomElementId = travelDomElement.dataset.id;

                const data = this._data
                    .find(travel => travel.id === travelDomElementId)?.stops
                    .find(stop => stop.id === stopDomElementId)?.pictures
                    .find(image => image.id === imageDomElementId);

                if(!data) return;

                handler(data);
            });
        })
    }
}

export default new TravelsView();