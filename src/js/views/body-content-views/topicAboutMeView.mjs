// import global not yet implemented for parcel 2
//import {logos} from '../../assets/images/logos/*';
// Need to import files individuallyù

import profilePic from 'url:../../../assets/images/profile-pic.jpg';

// Anagraphic icons 
import stork from 'url:../../../assets/images/anagraphic/stork.svg';
import home from 'url:../../../assets/images/anagraphic/home.svg';
import phone from 'url:../../../assets/images/anagraphic/phone.svg';
import email from 'url:../../../assets/images/anagraphic/email.svg';
import graduation from 'url:../../../assets/images/anagraphic/graduation-hat.svg';

const anagraphicIcons = {
    stork,
    home,
    phone,
    email,
    graduation
}

// Footer icons
import contacts from 'url:../../../assets/images/contacts.svg';
import airplane from 'url:../../../assets/images/airplane.svg';
import languages from 'url:../../../assets/images/languages.svg';

const footerIcons = {
    contacts,
    airplane,
    languages
}

class TopicAboutMeView {
    _parentElement = document.querySelector('.body .body-panel .topic-container');
    _footerParentElement = null;
    _data;
    _anagraphicData;

    render(data, anagraphicData) {
        this._data = data;
        this._anagraphicData = anagraphicData;

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
                <div class="profile-pic-container">
                    <img src="${profilePic}" class="profile-pic"/>
                </div>
                <div class="info-container">
                    <div class="info-container-header">
                        <h1>Alberto Scandolara</h1>
                    </div>
                    <div class="info-container-body">
                        ${this._anagraphicData.map(
                            anagraphicElement => this._generateAnagraphicElementMarkup(anagraphicElement)
                        ).join('')}
                    </div>
                    <div class="info-container-footer"></div>
                </div>
            </div>
            <div class="topic-footer">
            </div>
        `;
    }

    _generateAnagraphicElementMarkup(anagraphicData) {
        return `
            <div 
                class="anagraphic-element-container" 
                title="${anagraphicData.title}">
                <img 
                    class="anagraphic-icon"
                    src="${anagraphicIcons[anagraphicData.icon]}" 
                    alt="${anagraphicData.text}">
                <span class="anagraphic-info-value">
                    ${anagraphicData.value}
                </span>
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

    _generateTopicNavigationVoiceMarkup(voice) {
        return `
            <li>
                <button 
                    class="topic-footer-button"
                    title="${voice.title}"
                    data-id="${voice.id}">
                    <img 
                        class="topic-footer-button-img"
                        src="${footerIcons[voice.icon]}" 
                        alt="${voice.text}">
                    <span 
                        class="topic-footer-button-text">
                        ${voice.text}
                    </span>
                </button>
            </li>
        `;
    }

    addHandlerClick(handler) {
        this._footerParentElement.addEventListener('click', function(e){
            const element = e.target.closest('button');
            if(!element) return;

            const elementId = element.dataset.id;
            handler(elementId);
        })
    }
}

export default new TopicAboutMeView();