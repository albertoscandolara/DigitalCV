mapboxgl.accessToken = 'pk.eyJ1IjoiYmViaXV6IiwiYSI6ImNrcGlobXB0NDAyamUycWxndXN1Zjl6NXAifQ.WFz7mt4I5KdPGRYSpPFR2Q';

class TravelsView {
    _parentElement = document.querySelector('.body .body-panel .topic-page');
    _data;
    _flagSvgIcon;
    _cameraSvgIcon;
    _globalLocalizationSvgIcon;
    _map = null;
    _mapStyles;
    _mapMarkers = [];

    render(mapStyles, data, flagSvgIcon, cameraSvgIcon, globalLocalizationSvgIcon) {
        this._mapStyles = mapStyles;
        this._data = data;
        this._flagSvgIcon = flagSvgIcon;
        this._cameraSvgIcon = cameraSvgIcon;
        this._globalLocalizationSvgIcon = globalLocalizationSvgIcon

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



    ////////////////////////////////////
    //            Map setters         //
    ////////////////////////////////////

    _setMap() {
        const selectedStyle = this._mapStyles.find(style => style.selected);
        if(!selectedStyle) {
            selectedStyle = this._mapStyles[0];
        }

        this._map = new mapboxgl.Map({
            container: "map",
            style: `mapbox://styles/mapbox/${selectedStyle.value}`,
            center: [22, 30.00],
            zoom: 1.6,
        });

        this._setMarkers();
        this._setPathLayers();
    }

    _setMarkers() {
        this._data.forEach(travel => {
            travel.stops.forEach(stop => {
                let el = document.createElement('div');
                el.className = 'stop-marker';
                el.insertAdjacentHTML(
                    'beforeend', 
                    this._flagSvgIcon.replace('{{flagColorPlaceholder}}', travel.color)
                );
                
                const coordinates = [
                    stop.coordinates.lng, 
                    stop.coordinates.lat
                ];
                let popup = this._setMarkerPopup(stop);
                let marker = new mapboxgl.Marker(el)
                    .setLngLat(coordinates)
                    .setPopup(popup)
                    .addTo(this._map);
                    
                this._mapMarkers.push(
                    {
                        stopID: stop.id,
                        marker
                    }
                );
            });
        });
    }

    _setMarkerPopup(stop) {
        let markerMarkup = this._generateMarkerPopupMarkup(stop);
        let popup = new mapboxgl.Popup({ offset: 25 }).setHTML(markerMarkup);
        this._setMarkerPopupEventListener(popup);
        return popup;
    }

    _setPathLayers() {
        this._map.on(
            'style.load', 
            () => {
                this._data.forEach(
                    travel => {
                        if(travel.stops.length <= 1) return;
                        
                        this._map.addSource(travel.id, {
                            'type': 'geojson',
                            'data': {
                                'type': 'Feature',
                                'properties': {},
                                'geometry': {
                                    'type': 'LineString',
                                    'coordinates': travel.stops.map(stop => [stop.coordinates.lng, stop.coordinates.lat])
                                }
                            }
                        });
                        
                        let layer = {
                            'id': travel.id,
                            'type': 'line',
                            'source': travel.id,
                            'layout': {
                                'line-join': 'round',
                                'line-cap': 'round'
                            },
                            'paint': {
                                'line-color': travel.color,
                                'line-width': 2
                            }
                        }
                        this._map.addLayer(layer);
                    }
                );
            });
    }


    
    ////////////////////////////////////
    //        Generate markups        //
    ////////////////////////////////////

    _generateMarkup() {
        return `
            <div class="all-travels-container fit">
                <div class="map-container">
                    <div class="map-style-buttons-container">
                        <button class="map-styles-toggler">
                            <span>Map styles</span>
                            <span class="arrow arrow-down"></span>
                        </button>
                        <ul class="map-style-buttons hidden">
                            ${this._mapStyles.map(
                                style => this._generateMapStyleListItemMarkup(style)
                            ).join('')}
                        </ul>
                    </div>
                    <div 
                        id="map" 
                        class="fit">
                    </div>
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
                        <h1 class="travel-title">${travel.text}</h1>
                        <div class="header-buttons-container">
                            <button 
                                class="geolocalize-button"
                                title="Geolocalize travel">
                                ${this._globalLocalizationSvgIcon}
                            </button>
                        </div>
                    </div>
                    <div class="travel-body">
                    </div>
                    <div class="travel-footer">
                    </div>
                </div>
                <div class="travel-stops">
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
                    <span class="stop-title">${stop.text}</span>
                    ${stop.images.length > 0 ? 
                        `
                        <button 
                            class="camera-button"
                            title="See images (${stop.images.length})">
                            ${this._cameraSvgIcon}
                        </button>
                        ` : 
                        `
                        <div class="camera-button">
                        </div>
                        `
                    }
                </div>
                <div class="stop-body">
                </div>
                <div class="stop-footer">
                </div>
                <div class="separator"></div>
            </div>
        `;
    }

    _generateMarkerPopupMarkup(stop) {
        return `
            <div class="marker-popup"
                data-id="${stop.id}">
                <div class="marker-popup-header">
                    <h1 class="marker-popup-header-title">
                        ${stop.text}
                    </h1>
                    <div class="separator"></div>
                </div>
                <div class="marker-popup-body">
                    <button class="go-to-details">
                        Go to travel details
                    </button>
                    ${!this._getPreviousStop(stop.id) ? 
                        `` : 
                        `
                        <button class="previous-stop">
                            Go to previous stop
                        </button>
                        `}
                    ${!this._getNextStop(stop.id) ? 
                        `` : 
                        `
                        <button class="next-stop">
                            Go to next stop
                        </button>
                        `}
                <div class="marker-popup-footer"></div>
            </div>
        `;
    }



    ////////////////////////////////////
    //         Event handlers         //
    ////////////////////////////////////

    _setViewEventHandlers() {
        this._parentElement.querySelector('.map-styles-toggler')
            .addEventListener(
                'click', 
                () => {
                    const DOMElement = this._parentElement.querySelector('.map-container .map-style-buttons');
                    DOMElement.classList.toggle('hidden');

                    const arrowDOMElement = this._parentElement.querySelector('.map-container .map-styles-toggler .arrow');
                    this._toggleArrow(arrowDOMElement);
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
                    this._setPathLayers();
                }
            );

        this._parentElement.querySelector('.travels-container')
            .addEventListener(
                'click', 
                (e) => {
                    const geolocalizeDOMButtonElement = e.target.closest('.geolocalize-button');

                    if(!geolocalizeDOMButtonElement) return;

                    const stopID = geolocalizeDOMButtonElement.closest('.travel-container').dataset.id;
                    const travel = this._getTravelFromTravelID(stopID);

                    if(!travel) return;
                    
                    this._removeAllPopups();
                    this._scrollToMap();
                    this._flyToTravel(travel.id);
                }
            );
    }

    _setMarkerPopupEventListener(popup) {
        popup._content.addEventListener(
            'click', 
            (e) => {
                let target = e.target;

                let goToDetailsDOMButtonElement = target.closest('.go-to-details');
                let goToPreviousStopDOMButtonElement = target.closest('.previous-stop');
                let goToNextStopDOMButtonElement = target.closest('.next-stop');

                if (!(goToDetailsDOMButtonElement || goToPreviousStopDOMButtonElement || goToNextStopDOMButtonElement)) return;

                const stopID = (goToDetailsDOMButtonElement || goToPreviousStopDOMButtonElement || goToNextStopDOMButtonElement).closest('.marker-popup').dataset.id;
                const travel = this._getTravelFromStopID(stopID);

                if(!travel) return;

                if(goToDetailsDOMButtonElement) {
                    this._removePopup(stopID);
                    this._scrollToTravelContainer(travel.id);
                    this._setTravelContainerPulseAnimation(travel.id);
                }

                if(goToPreviousStopDOMButtonElement || goToNextStopDOMButtonElement) {
                    const flyToStop = goToPreviousStopDOMButtonElement ? this._getPreviousStop(stopID) : this._getNextStop(stopID);
                    this._flyToStop(flyToStop.id);
                    this._removePopup(stopID);
                    this._showPopup(flyToStop.id);
                }
            }
        );
    }

    addCameraHandlerClick(handler) {
        this._parentElement.querySelector('.travels-container')
            .addEventListener(
                'click', 
                (e) => {
                    const cameraDOMElement = e.target.closest('.camera-button');

                    if(!cameraDOMElement) return;

                    const stopID = cameraDOMElement.closest('.stop-container').dataset.id;
                    const travelID = cameraDOMElement.closest('.travel-container').dataset.id;

                    const stop = this._data
                        .find(travel => travel.id === travelID)?.stops
                        .find(stop => stop.id === stopID);

                    if(!stop) return;
                    
                    handler(stop.images);
                }
            );
    }
    


    //////////////////////////////////////
    //         Helper functions         //
    //////////////////////////////////////

    _scrollToMap() {
        this._parentElement.querySelector('.map-container')
            .scrollIntoView(
                {
                    behavior: 'smooth', 
                    block: "center"
                }
            );
    }

    _scrollToTravelContainer(travelID) {
        let travelContainer = this._parentElement.querySelector(`.travels-container .travel-container[data-id="${travelID}"]`);

        travelContainer.scrollIntoView(
            {
                behavior: 'smooth', 
                block: "center"
            }
        );
    }

    _setTravelContainerPulseAnimation(travelID) {
        let travelContainer = this._parentElement.querySelector(`.travels-container .travel-container[data-id="${travelID}"]`);

        const pulseClass = 'pulse';
        const animationDuration = 4000;
        travelContainer.classList.add(pulseClass);
        setTimeout(
            () => travelContainer.classList.remove(pulseClass),
            animationDuration
        );
    }

    _flyToStop(stopID) {
        let stop = this._getStopFromStopID(stopID);
        const coordinates = [
            stop.coordinates.lng,
            stop.coordinates.lat
        ]
        this._map.flyTo({
            center: coordinates,
            essential: true
        });
    }

    _flyToTravel(travelID) {
        let travel = this._getTravelFromTravelID(travelID);
        this._map.flyTo({
            center: [
                travel.coordinates.lng,
                travel.coordinates.lat
            ],
            zoom: travel.zoom,
            essential: true
        });
    }

    _showPopup(stopID) {
        this._mapMarkers.find(mapMarker => mapMarker.stopID === stopID).marker._popup.addTo(this._map);
    }

    _removePopup(stopID) {
        this._mapMarkers.find(mapMarker => mapMarker.stopID === stopID).marker._popup.remove();
    }

    _removeAllPopups() {
        this._mapMarkers.forEach(mapMarker => mapMarker.marker._popup?.remove());
    }

    _getPreviousStop(currentStopID) {
        let travel = this._getTravelFromStopID(currentStopID);
        let currentStopIndex = this._getCurrentStopIndex(currentStopID);

        if(
            !currentStopIndex || 
            currentStopIndex === -1
        ) return null;

        return travel.stops[currentStopIndex - 1];
    }

    _getNextStop(currentStopID) {
        let travel = this._getTravelFromStopID(currentStopID);
        let currentStopIndex = this._getCurrentStopIndex(currentStopID);

        if(
            !currentStopIndex && currentStopIndex !== 0 ||
            currentStopIndex === -1 || 
            currentStopIndex === travel.stops.length -1
        ) return null;

        return travel.stops[currentStopIndex + 1];
    }

    _getCurrentStopIndex(currentStopID) {
        let travel = this._getTravelFromStopID(currentStopID);
        return travel.stops.findIndex(stop => stop.id === currentStopID);
    }

    _getTravelFromStopID(currentStopID) {
        return this._data.find(travel => travel.stops.some(stop => stop.id === currentStopID));
    }

    _getTravelFromTravelID(travelID) {
        return this._data.find(travel => travel.id === travelID);
    }

    _getStopFromStopID(stopID) {
        return this._getTravelFromStopID(stopID).stops.find(stop => stop.id === stopID);
    }

    _toggleArrow(arrowDOMElement) {
        const arrowUp = 'arrow-up';
        const arrowRight = 'arrow-right';
        const arrowDown = 'arrow-down';
        const arrowLeft = 'arrow-left';

        if(arrowDOMElement.classList.contains(arrowUp)) {
            arrowDOMElement.classList.remove(arrowUp);
            arrowDOMElement.classList.add(arrowDown);
        } else if(arrowDOMElement.classList.contains(arrowRight)) {
            arrowDOMElement.classList.remove(arrowRight);
            arrowDOMElement.classList.add(arrowLeft);

        } else if(arrowDOMElement.classList.contains(arrowDown)) {
            arrowDOMElement.classList.remove(arrowDown);
            arrowDOMElement.classList.add(arrowUp);

        } else if(arrowDOMElement.classList.contains(arrowLeft)) {
            arrowDOMElement.classList.remove(arrowLeft);
            arrowDOMElement.classList.add(arrowRight);

        }
    }
}

export default new TravelsView();