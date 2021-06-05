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

const logos = { 
    logo_javascript, logo_angular, logo_react, 
    logo_c, logo_c_plus_plus, logo_c_sharp, 
    logo_blender 
};

const footerVoices = {
    certificate,
    project
}

class TopicOverview {
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
                <div class="topic-logo">
                    <img
                        src="${logos[this._data.icon]}" 
                        alt="${this._data.icon}" 
                        title="${this._data.title}">
                </div>
            </div>
            <div class="topic-body">
                <h1 class="topic-title">Overview</h1>
                <p class="topic-overview">
                    ${this._data.overviewText ? this._data.overviewText : 'No overview available yet!' }
                </p>
            </div>
            <div class="topic-footer">
            </div>
        `;
    }

    _generateTopicFooterMarkup() {
        return `
            <div class="arrow-container"  title="Previous">
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
        `;
    }

    _generateTopicNavigationVoiceMarkup(voice){
        return `
            <li>
                <button style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: inherit;
                    height: inherit;
                    "
                    title="${voice.title}">
                    <img style="height:50px; width: 50px;"
                        src="${footerVoices[voice.icon]}" 
                        alt="${voice.icon}">
                    <span style="
                        font-size: 12px;
                        ">
                        ${voice.text}
                    </span>
                </button>
            </li>
        `;
    }
}

export default new TopicOverview();