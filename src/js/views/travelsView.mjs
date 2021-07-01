import {openInNewTab} from './../helpers/helpers.mjs';

// import global not yet implemented for parcel 2
//import {logos} from '../../assets/images/logos/*';
// Need to import files individually

// Contacts icons
//import linkedIn from 'url:../../assets/images/contacts/linkedin.svg';

const travelIcons = {
}

class TravelsView {
    _parentElement = document.querySelector('.body .body-panel .topic-page');
    _data;

    render(data) {
        this._data = data;

        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('beforeend', markup);

        this._setViewEventHandlers();
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderSpinner = function() {
        const markup = ``;
    }

    _generateMarkup() {
        return `
            <div class="all-travels-container">
            Not implemented yet!
            </div>
        `;
    }

   
    _setViewEventHandlers() {
    }
}

export default new TravelsView();