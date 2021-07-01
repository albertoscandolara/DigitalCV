import {openInNewTab} from './../helpers/helpers.mjs';

// Certificates previews images

// English

// French

// German

// Italian

// Russian
import preview_russian_made_easy from 'url:../../assets/images/certificates-previews/languages/russian/Russian_Made_Easy_Accelerated_Learning_for_Russian.jpg';

// Spanish


const previews = {
    // English

    // French

    // German

    // Italian

    // Russian
    preview_russian_made_easy

    // Spanish 
};

class LanguagesView {
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
                <div class="all-languages-container" style="
                display: flex;
                flex-direction: column;
                align-content: flex-start;
                width: 100%;
                font-size: 14px;
                ">
                ${this._data.map(
                    language => this._generateSingleLanguageMarkup(language)
                ).join('')}
            </div>
        `;
    }

    _generateSingleLanguageMarkup(language) {
        return `
            <div>
                <div style="padding: 20px;">
                    <h2>${language.text}</h2>
                    <div>
                        <span>Level: </span>
                        <span>${language.level}</span>
                    </div>
                    <div>
                        <div>Certificates:</div>
                        <div style="display: flex; padding: 10px 0">
                            ${language.certificates.map(
                                certificate => this._generateCertificateMarkup(certificate)
                            ).join('')}
                        </div>
                    </div>
                </div>
                <div class="separator"></div>
            </div>
        `;
    }

    _generateCertificateMarkup(certificate) {
        return `
        <button 
            class="card-certificate raised" 
            data-id="${certificate.id}">
            <div class="card-header">
                <span class="card-title">${certificate.title}</span>
            </div>
            <div class="card-body">
                <div class="preview-container">
                    <img 
                        class="preview" 
                        alt="'${certificate.title}' certificate preview" 
                        src="${previews[certificate.preview]}">
                </div>
                <div class="info-container">
                    <span>Instructor: ${certificate.instructors.join(', ')}</span>
                    <span>Released by: ${certificate.platform}</span>
                    <span>Completed: ${certificate.completionDate}</span>
                </div>
            </div>
            <div class="card-footer"></div>
        </button>
        `;
    }

   
    _setViewEventHandlers() {
    }

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', (e) => {
            const element = e.target.closest('.card-certificate');
            if(!element) return;

            const elementId = element.dataset.id;
            const data = this._data.find(certificateData => certificateData.id === elementId);
            handler(data);
        });
    }
}

export default new LanguagesView();