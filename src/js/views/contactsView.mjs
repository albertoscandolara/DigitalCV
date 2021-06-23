import {openInNewTab} from './../helpers/helpers.mjs';

// import global not yet implemented for parcel 2
//import {logos} from '../../assets/images/logos/*';
// Need to import files individually

// Contacts icons
import linkedIn from 'url:../../assets/images/contacts/linkedin.svg';
import facebook from 'url:../../assets/images/contacts/facebook.svg';
import instagram from 'url:../../assets/images/contacts/instagram.svg';
import call from 'url:../../assets/images/contacts/call.svg';
import gmail from 'url:../../assets/images/contacts/gmail.svg';

const contactIcons = {
    linkedIn,
    facebook,
    instagram,
    call,
    gmail
}

class ContactsView {
    _parentElement = document.querySelector('.body .body-panel .sub-section');
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
            <div class="all-contacts-container">
                <div class="contacts-group-container socials">
                    ${this._generateSocialsMarkup()}
                </div>
                <div class="contacts-group-container">
                    ${this._generateContactsMarkup()}
                </div>
            </div>
        `;
    }

    _generateSocialsMarkup() {
        return `${this._data.social.map(
            social => this._generateSocialMarkup(social)
        ).join('')}`;
    }

    _generateContactsMarkup() {
        return `${this._data.contacts.map(
            contacts => this._generateContactMarkup(contacts)
        ).join('')}`;
    }

    _generateSocialMarkup(social) {
        return `
            <button 
                data-id="${social.id}"
                class="contact-container" 
                title="${social.title}">
                <img
                    class="contact-logo"
                    src="${contactIcons[social.icon]}" 
                    alt="${social.text}">
                <span class="contact-text">
                    ${social.text}
                </span>
            </button>
        `;
    }

    _generateContactMarkup(contact) {
        return `
            <div 
                data-id="${contact.id}"
                class="contact-container" 
                title="${contact.title}">
                <img
                    class="contact-logo"
                    src="${contactIcons[contact.icon]}" 
                    alt="${contact.text}">
                <span class="contact-text selectable">
                    ${contact.text}
                </span>
            </div>
        `;
    }

    _setViewEventHandlers() {
        this._parentElement.querySelector('.socials')
            .addEventListener(
                "click", (e) => {
                    let target = e.target;
                    let contact = target.closest('.contact-container');

                    if(!contact) return;

                    let socialId = contact.dataset.id;
                    let social = this._data.social.find(social => social.id === socialId);
                    
                    let url = social.url;
                    if(url) {
                        openInNewTab(url);
                    }
                }
        );
    }
}

export default new ContactsView();