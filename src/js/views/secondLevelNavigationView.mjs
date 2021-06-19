// import global not yet implemented for parcel 2
//import {logos} from '../../assets/images/logos/*';
// Need to import files individually
import logo_javascript from 'url:../../assets/images/logos/logo_javascript.svg';
import logo_angular from 'url:../../assets/images/logos/logo_angular.svg';
import logo_react from 'url:../../assets/images/logos/logo_react.svg';
import logo_blender from 'url:../../assets/images/logos/logo_blender.svg';
import logo_c from 'url:../../assets/images/logos/logo_c.svg';
import logo_c_plus_plus from 'url:../../assets/images/logos/logo_c_plus_plus.svg';
import logo_c_sharp from 'url:../../assets/images/logos/logo_c_sharp.svg';

const logos = { 
    logo_javascript, logo_angular, logo_react, 
    logo_c, logo_c_plus_plus, logo_c_sharp, 
    logo_blender 
};

class SecondLevelNavigationView {
    _parentElement = document.querySelector('.body .second-level-nav');
    _data;

    render(data) {
        this._data = data;
        const markup = this._generateMarkup();
        
        this._clear();
        this._parentElement.insertAdjacentHTML('beforeend', markup);
    }

    _clear(){
        this._parentElement.innerHTML = '';
    }

    renderSpinner = function(){
        const markup = ``;
    }

    _generateMarkup(){
        return `
            ${this._data.map(
                voice => this._generateMainMenuNavigationVoiceMarkup(voice)
            ).join('')}
        `;
    }

    _generateMainMenuNavigationVoiceMarkup(voice){
        return `
            <li class="second-level-nav-item"
                title="${voice.title}"
                data-id="${voice.id}">
                <button class="second-level-nav-button raised">
                    <img class="second-level-nav-img" 
                        src="${logos[voice.icon]}" 
                        alt="${voice.icon}">
                    <span>${voice.text}</span>
                </button>
            </li>
        `;
    }

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const navigationVoice = e.target.closest('.second-level-nav-item');
            if(!navigationVoice) return;

            const navigationVoiceId = navigationVoice.dataset.id;
            handler(navigationVoiceId);
        })
    }
}

export default new SecondLevelNavigationView();