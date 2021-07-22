// import global not yet implemented for parcel 2
//import {logos} from '../../assets/images/logos/*';
// Need to import files individually
import idea from 'url:../../../assets/images/icons/idea.svg';
import copyright from 'url:../../../assets/images/icons/copyright.svg';

const footerVoices = {
    idea,
    copyright,
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
                <div 
                    class="arrow-container" 
                    title="Previous"
                    data-id="previous">
                    <button class="arrow-button fit">
                        <span class="arrow arrow-left"></span>
                    </button>
                </div>
                <div class="topic-navigation-bar">
                    <ul>
                        ${this._data.children.map(
                            voice => this._generateTopicNavigationVoiceMarkup(voice)
                        ).join('')}
                    </ul>
                </div>
                <div 
                    class="arrow-container" 
                    title="Next"
                    data-id="next">
                    <button class="arrow-button fit">
                        <span class="arrow arrow-right"></span>
                    </button>
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