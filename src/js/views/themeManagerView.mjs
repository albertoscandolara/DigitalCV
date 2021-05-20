import {translations} from '../model.mjs';

class ThemeManagerView {
    _parentElement = document.querySelector('.main-menu-side.right .theme-button-container');
    _data;

    render(data) {
        this._data = data;
        const markup = this._generateMarkup();
        
        this._clear();
        this._parentElement.insertAdjacentHTML('beforeend', markup);

        this._setPageViewTheme();
    }

    _clear(){
        this._parentElement.innerHTML = '';
    }

    _setPageViewTheme(){
        const appContainer = document.querySelector('.app-container');
        
        appContainer.className = 'app-container';
        appContainer.classList.add(this._data.themeID);
    }

    renderSpinner = function(){
        const markup = ``;
    }

    _generateMarkup(){
        return `
            <button  
                class="theme-button sunk"
                title="${this._data.buttonTitle}"
                data-switch-to="${this._data.themeID === 'light' ? 'dark' : 'light'}">
                ${this._data.svgIcon}
            </button>
        `;
    }

    addHandlerClick(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.theme-button');
            if(!btn) return;

            const switchTo = btn.dataset.switchTo;
            handler(switchTo);
        })
    }
}

export default new ThemeManagerView();