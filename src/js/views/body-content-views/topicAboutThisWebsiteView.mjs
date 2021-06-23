// import global not yet implemented for parcel 2
//import {logos} from '../../assets/images/logos/*';
// Need to import files individually
import logo_javascript from 'url:../../../assets/images/logos/logo_javascript.svg';
import logo_angular from 'url:../../../assets/images/logos/logo_angular.svg';
import logo_react from 'url:../../../assets/images/logos/logo_react.svg';
import logo_blender from 'url:../../../assets/images/logos/logo_blender.svg';
import logo_c from 'url:../../../assets/images/logos/logo_c.svg';
import logo_c_plus_plus from 'url:../../../assets/images/logos/logo_c_plus_plus.svg';
import logo_c_sharp from 'url:../../../assets/images/logos/logo_c_sharp.svg';

import certificate from 'url:../../../assets/images/certificate.svg';
import project from 'url:../../../assets/images/project.svg';
import contacts from 'url:../../../assets/images/contacts.svg';
import airplane from 'url:../../../assets/images/airplane.svg';
import languages from 'url:../../../assets/images/languages.svg';

const logos = { 
    logo_javascript, logo_angular, logo_react, 
    logo_c, logo_c_plus_plus, logo_c_sharp, 
    logo_blender 
};

const footerVoices = {
    certificate,
    project,
    contacts,
    airplane,
    languages
}

class TopicAboutThisWebsiteView {
    _parentElement = document.querySelector('.body .body-panel .topic-container');
    _footerParentElement = null;
    _data;

    render(data) {
        this._data = data;

        // Overview section
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('beforeend', markup);

        // Overview footer section
        this._footerParentElement = this._parentElement.querySelector('.topic-footer'); 
        const footerMarkup = this._generateTopicFooterMarkup();
        this._footerClear();
        this._footerParentElement.insertAdjacentHTML('beforeend', footerMarkup);
    }

    _clear(){
        this._parentElement.innerHTML = '';
    }

    _footerClear() {
        this._footerParentElement.innerHTML = '';
    }

    renderSpinner = function() {
        const markup = ``;
    }

    _generateMarkup() {
        return `
            <div class="topic-header">
                
            </div>
            <div class="topic-body">
                
            </div>
            <div class="topic-footer">
            </div>
        `;
    }

    _generateTopicFooterMarkup() {
        return `
            <div class="separator"></div>
            <div class="topic-footer-navigation-container">
                <div class="arrow-container" title="Previous">
                    <button class="arrow previous">&lt;</button>
                </div>
                <div class="topic-navigation-bar">
                    <ul>
                        ${this._data.children.map(
                            voice => this._generateTopicNavigationVoiceMarkup(voice)
                        ).join('')}
                    </ul>
                </div>
                <div class="arrow-container" title="Next">
                    <button class="arrow following">&gt;</button>
                </div>
            </div>
        `;
    }

    _generateTopicNavigationVoiceMarkup(voice){
        return `
            <li>
                <button 
                    class="topic-footer-button"
                    title="${voice.title}"
                    data-id="${voice.id}">
                    <img 
                        class="topic-footer-button-img"
                        src="${footerVoices[voice.icon]}" 
                        alt="${voice.text}">
                    <span 
                        class="topic-footer-button-text">
                        ${voice.text}
                    </span>
                </button>
            </li>
        `;
    }

    addHandlerClick(handler){
        this._footerParentElement.addEventListener('click', function(e){
            const element = e.target.closest('button');
            if(!element) return;

            const elementId = element.dataset.id;
            handler(elementId);
        })
    }
}

export default new TopicAboutThisWebsiteView();