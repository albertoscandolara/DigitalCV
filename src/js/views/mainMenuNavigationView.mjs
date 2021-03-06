class MainMenuNavigationView {
    _parentElement = document.querySelector('.main-menu .first-level-nav');
    _data;

    render(data) {
        this._data = data;
        const markup = this._generateMarkup();
        
        this._clear();
        this._parentElement.insertAdjacentHTML('beforeend', markup);
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderSpinner = function() {
        const markup = ``;
    }

    _generateMarkup() {
        return this._data.map(
            voice => this._generateMainMenuNavigationVoiceMarkup(voice)
        ).join('');
    }

    _generateMainMenuNavigationVoiceMarkup(voice) {
        return `
            <li class="menu-item"
                title="${voice.title}"
                data-id="${voice.id}">
                <button 
                    class="menu-button first-level ${voice.selected ? 'selected' : ''}">
                    <span>${voice.text}</span>
                </button>
            </li>
        `;
    }

    selectLevelOneNavigationVoice(navigationVoiceId) {
        const selectedClass = 'selected';
        Object.values(this._parentElement.querySelectorAll('.menu-item')).forEach(item => {
            let menuButton = item.querySelector('.menu-button');
            item.dataset.id === navigationVoiceId ? 
                menuButton.classList.add(selectedClass) : 
                menuButton.classList.remove(selectedClass);
        });
    }

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const navigationVoice = e.target.closest('.menu-item');
            if(!navigationVoice) return;

            const navigationVoiceId = navigationVoice.dataset.id;
            handler(navigationVoiceId);
        });
    }
}

export default new MainMenuNavigationView();