import {openInNewTab} from './../helpers/helpers.mjs';

// Certificates previews images

// English
import preview_english_uic from 'url:../../assets/images/certificates-previews/languages/english/UIC_languages_for_living.jpg';

// French

// German

// Italian

// Russian
import preview_russian_made_easy from 'url:../../assets/images/certificates-previews/languages/russian/Russian_Made_Easy_Accelerated_Learning_for_Russian.jpg';

// Spanish


const previews = {
     // Languages

    // French

    // English
    preview_english_uic,
    
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
        <div class="languages-section-container">
            ${(!this._data || this._data.length === 0) ?
                `
                <span>No certificates available yet!</span>
                `
                :
                `
                ${this._data.map(
                    language => this._generateSingleLanguageMarkup(language)
                ).join('')}
                `
            }
        </div>
        `;
    }

    _generateSingleLanguageMarkup(language) {
        return `
            <div 
                class="single-language-container"
                data-language=${language.id}>
                <div class="single-language-padded-container">
                    <h2 class="language-title">${language.text}</h2>
                    <div class="language-info-container">
                        <span class="language-info-label">
                            Level: 
                        </span>
                        <span class="language-info-value">
                            ${language.level}
                        </span>
                    </div>
                    <div class="language-info-container">
                        <span class="language-info-label">
                            Certificates:
                        </span>
                        <div class="language-certificates-container">
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
                        class="preview fit" 
                        alt="'${certificate.title}' certificate preview" 
                        src="${previews[certificate.images[0].preview]}">
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
            const languageElement = e.target.closest('.single-language-container');
            const certificateElement = e.target.closest('.card-certificate');
            if(!languageElement || !certificateElement) return;

            const languageElementId = languageElement.dataset.language;
            const certificateElementId = certificateElement.dataset.id;

            const data = this._data
                .find(language => language.id === languageElementId)
                .certificates
                .find(certificate => certificate.id === certificateElementId);
            handler(data.images);
        });
    }
}

export default new LanguagesView();