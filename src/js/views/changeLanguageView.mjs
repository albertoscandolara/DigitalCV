import * as helpers from '../helpers/helpers.mjs';

class ChangeLanguageView {
    _parentElement = document.querySelector('.choose-language');
    _openLanguageWindowHeaderButtonElement = document.querySelector('.main-section .main-menu .choose-language-btn');
    _mainSectionElement = document.querySelector('.main-section');
    _data;
    _tmpSelectedLanguage;

    render(data) {
        this._data = data;
        const markup = this._generateMarkup();
        
        this._clear();
        this._parentElement
            .querySelector('.window .body')
            .insertAdjacentHTML('beforeend', markup);
            
        this._updateHeaderLanguageButtonTextContent();
        this._renderSelectedLanguage();
    }

    _clear(){
        this._parentElement
        .querySelector('.window .body').innerHTML = '';
    }

    renderSpinner = function(){
        const markup = ``;
    }

    _generateMarkup(){
        return this._data.map(
            language => this._generateLanguageButtonMarkup(language)
        ).join('');
    }

    _generateLanguageButtonMarkup(language){
        return `
            <button 
                class="language-button raised" 
                title="${language.language}" 
                data-language-acronym="${language.acronym}">
                <span>
                    ${language.language}
                </span>
            </button>
        `;
    }

    _openLanguageView() {
        this._mainSectionElement.classList.add('blurred');
        this._parentElement.classList.remove('hidden');
        this._parentElement.classList.add('semi-transparent-background');
    }

    _closeLanguageView() {
        this._mainSectionElement.classList.remove('blurred');
        this._parentElement.classList.add('hidden');
        this._parentElement.classList.remove('semi-transparent-background');
    }

    _updateHeaderLanguageButtonTextContent() {
        const text = helpers.getSelectedItem(this._data).language;
        this._openLanguageWindowHeaderButtonElement.textContent = text;
    }

    addHandlerOpenLanguageWindow(){
        /*
            Open language window does not need a subscriber.
            Its effects are only presentational, 
            nothing to do with business.
        */
       this._openLanguageWindowHeaderButtonElement.addEventListener(
           'click', 
           () => { 
               this._openLanguageView();
           }
        );
    }

    addHandlerApplyLanguage(handler){
        this._parentElement
            .querySelector('.window .footer .apply')
            .addEventListener('click', () => {
                handler(this._tmpSelectedLanguage);
                this._closeLanguageView();
            });
    }

    addHandlerUndoLanguage(){
        /*
            Undo Language does not need a subscriber.
            Its effects are only presentational, 
            nothing to do with business.
        */
        this._parentElement
            .querySelector('.window .footer .back')
            .addEventListener('click', () => {
                this._tmpSelectedLanguage = null;
                this._renderSelectedLanguage(false);
                this._closeLanguageView();
        });
    }

    addHandlerSelectLanguage(){
        /*
            Select Language does not need a subscriber.
            Its effects are only presentational, 
            nothing to do with business.
        */
        this._parentElement
            .querySelector('.window .body')
            .addEventListener('click', (event) => {
                const btn = event.target.closest('.language-button');
                if(!btn) return;
                
                this._tmpSelectedLanguage = btn.dataset.languageAcronym;
                this._renderSelectedLanguage(true);
            });
    }

    // tmp=true if I'm applying tmp language selection, otherwise false
    _renderSelectedLanguage(tmp = false) {
        Array.from(
            this._parentElement.querySelectorAll('.window .body button')
        ).forEach(
            languageButton => {
                if (
                    tmp && languageButton.dataset.languageAcronym === this._tmpSelectedLanguage ||
                    !tmp && languageButton.dataset.languageAcronym === helpers.getSelectedItem(this._data).acronym
                ) {
                    languageButton.classList.add('selected');
                } else {
                    languageButton.classList.remove('selected');
                }
            }
        );
    }
}

export default new ChangeLanguageView();