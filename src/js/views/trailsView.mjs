mapboxgl.accessToken = 'pk.eyJ1IjoiYmViaXV6IiwiYSI6ImNrcGlobXB0NDAyamUycWxndXN1Zjl6NXAifQ.WFz7mt4I5KdPGRYSpPFR2Q';

class TrailsView {
    _parentElement = document.querySelector('.body .body-panel .topic-page');
    _data;
    _trekkingSvgIcon;
    _cameraSvgIcon;
    _globalLocalizationSvgIcon;
    _map = null;
    _mapStyles;
    _mapMarkers = [];

    render(mapStyles, data, trekkingSvgIcon, cameraSvgIcon, globalLocalizationSvgIcon) {
        this._mapStyles = mapStyles;
        this._data = data;
        this._trekkingSvgIcon = trekkingSvgIcon;
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
            center: [11.6, 46.15],
            zoom: 8.3,
        });

        this._setMarkers();
    }

    _setMarkers() {
        this._data.forEach(trail => {
            let el = document.createElement('div');
                el.className = 'stop-marker';
                el.insertAdjacentHTML(
                    'beforeend', 
                    this._trekkingSvgIcon
                    );

            const coordinates = [
                trail.coordinates.lng, 
                trail.coordinates.lat
            ];
            let popup = this._setMarkerPopup(trail);
            let marker = new mapboxgl.Marker(el)
                .setLngLat(coordinates)
                .setPopup(popup)
                .addTo(this._map);

            this._mapMarkers.push(
                {
                    trailID: trail.id,
                    marker
                }
            );
        });
    }

    _setMarkerPopup(trail) {
        let markerMarkup = this._generateMarkerPopupMarkup(trail);
        let popup = new mapboxgl.Popup({ offset: 25 }).setHTML(markerMarkup);
        this._setMarkerPopupEventListener(popup);
        return popup;
    }


    
    ////////////////////////////////////
    //        Generate markups        //
    ////////////////////////////////////

    _generateMarkup() {
        return `
            <div class="all-trails-container">
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
                    <div id="map"></div>
                </div>
                <div class="trails-container">
                    ${this._data.map(
                        trail => this._generateTrailMarkup(trail)
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

    _generateTrailMarkup(trail) {
        return `
            <div class="trail-container"
                data-id="${trail.id}">
                <div class="trail-info-container">
                    <div class="trail-header">
                        <h1 class="trail-title">${trail.text}</h1>
                        <div class="header-buttons-container">
                            <button 
                                class="geolocalize-button"
                                title="Geolocalize travel">
                                ${this._globalLocalizationSvgIcon}
                            </button>
                            ${trail.images.length > 0 ? 
                                `
                                <button 
                                    class="camera-button"
                                    title="See images (${trail.images.length})">
                                    ${this._cameraSvgIcon}
                                </button>
                                ` : 
                                `
                                <div class="camera-button">
                                </div>
                                `
                            }
                        </div>
                    </div>
                    <div class="trail-body">
                    </div>
                    <div class="trail-footer">
                    </div>
                </div>
            </div>
        `;
    }

    _generateMarkerPopupMarkup(trail) {
        return `
            <div class="marker-popup"
                data-id="${trail.id}">
                <div class="marker-popup-header">
                    <h1 class="marker-popup-header-title">
                        ${trail.text}
                    </h1>
                    <div class="separator"></div>
                </div>
                <div class="marker-popup-body">
                    <button class="go-to-details">
                        Go to trail details
                    </button>
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
                }
            );

        this._parentElement.querySelector('.trails-container')
            .addEventListener(
                'click', 
                (e) => {
                    const geolocalizeDOMButtonElement = e.target.closest('.geolocalize-button');

                    if(!geolocalizeDOMButtonElement) return;

                    const trailID = geolocalizeDOMButtonElement.closest('.trail-container').dataset.id;
                    const trail = this._getTrailFromTrailID(trailID);

                    if(!trail) return;

                    this._removeAllPopups();
                    this._scrollToMap();
                    this._flyToTrail(trailID);
                }
            );
    }

    _setMarkerPopupEventListener(popup) {
        popup._content.addEventListener(
            'click', 
            (e) => {
                let target = e.target;

                let goToDetailsDOMButtonElement = target.closest('.go-to-details');

                if (!(goToDetailsDOMButtonElement)) return;

                const trailID = (goToDetailsDOMButtonElement).closest('.marker-popup').dataset.id;

                if(!trailID) return;

                if(goToDetailsDOMButtonElement) {
                    this._removePopup(trailID);
                    this._scrollToTrailContainer(trailID);
                    this._setTrailContainerPulseAnimation(trailID);
                }
            }
        );
    }

    addCameraHandlerClick(handler) {
        this._parentElement.querySelector('.trails-container')
            .addEventListener(
                'click', 
                (e) => {
                    const cameraDOMElement = e.target.closest('.camera-button');

                    if(!cameraDOMElement) return;

                    const trailID = cameraDOMElement.closest('.trail-container').dataset.id;

                    const trail = this._data
                        .find(trail => trail.id === trailID);

                    if(!trail) return;
                    
                    handler(trail.images);
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

    _scrollToTrailContainer(trailID) {
        let trailContainer = this._parentElement.querySelector(`.trails-container .trail-container[data-id="${trailID}"]`);

        trailContainer.scrollIntoView(
            {
                behavior: 'smooth', 
                block: "center"
            }
        );
    }

    _setTrailContainerPulseAnimation(trailID) {
        let trailContainer = this._parentElement.querySelector(`.trails-container .trail-container[data-id="${trailID}"]`);

        const pulseClass = 'pulse';
        const animationDuration = 4000;
        trailContainer.classList.add(pulseClass);
        setTimeout(
            () => trailContainer.classList.remove(pulseClass),
            animationDuration
        );
    }

    _flyToTrail(trailID) {
        let trail = this._getTrailFromTrailID(trailID);
        this._map.flyTo({
            center: [
                trail.coordinates.lng,
                trail.coordinates.lat
            ],
            zoom: trail.zoom,
            essential: true
        });
    }

    _removePopup(trailID) {
        this._mapMarkers.find(mapMarker => mapMarker.trailID === trailID).marker._popup.remove();
    }

    _removeAllPopups() {
        this._mapMarkers.forEach(mapMarker => mapMarker.marker._popup?.remove());
    }

    _getTrailFromTrailID(trailID) {
        return this._data.find(trail => trail.id === trailID);
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

export default new TrailsView();