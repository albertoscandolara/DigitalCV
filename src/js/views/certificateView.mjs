// import global not yet implemented for parcel 2
//import {logos} from '../../assets/images/logos/*';
// Need to import files individually

// Certificates previews images

// Languages

// French
// English
// German

// Russian
import preview_russian_made_easy from 'url:../../assets/images/certificates-previews/languages/russian/Russian_Made_Easy_Accelerated_Learning_for_Russian.jpg';

// Spanish


// Front-end
// javascript
import preview_the_complete_javaScript_course_2021 from 'url:../../assets/images/certificates-previews/front-end/javascript/The_complete_javaScript_course_2021.jpg';
import preview_functional_light_javascript_for_production from 'url:../../assets/images/certificates-previews/front-end/javascript/Functional_light_javascript_for_production.jpg';
// angular
import preview_reactive_angular_with_rxjs from 'url:../../assets/images/certificates-previews/front-end/angular/Reactive_angular_with_rxjs.jpg';

// react
import preview_mini_corso_su_react_e_typescript_2020 from 'url:../../assets/images/certificates-previews/front-end/react/Mini_corso_su_react_e_typescript_2020.jpg';

// Back-end
// c

// c++

// c#
import preview_csharp_for_beginners_foundamentals from 'url:../../assets/images/certificates-previews/back-end/Csharp_for_beginners_foundamentals.jpg';
import preview_csharp_intermediate_classes_interfaces_OOP from 'url:../../assets/images/certificates-previews/back-end/Csharp_intermediate_classes_interfaces_OOP.jpg';
import preview_double_your_coding_speed_with_visual_studio from 'url:../../assets/images/certificates-previews/back-end/Double_your_coding_speed_with_visual_studio.jpg';

 // 3D Modeling
 // blender



const fullView = {
    // Languages
    // Russian
    preview_russian_made_easy,

    // Front-end
    // javascript
    preview_the_complete_javaScript_course_2021,
    preview_functional_light_javascript_for_production,
    
    // angular
    preview_reactive_angular_with_rxjs,

    // react
    preview_mini_corso_su_react_e_typescript_2020,

    // Back-end
    // c

    // c++

    // c#
    preview_csharp_for_beginners_foundamentals,
    preview_csharp_intermediate_classes_interfaces_OOP,
    preview_double_your_coding_speed_with_visual_studio,

    // 3D Modeling
    // blender  
}

class CertificateView {
    _parentElement = document.querySelector('.app-container .certificate-view');
    _mainSectionElement = document.querySelector('.main-section');
    _data;

    render(data) {
        this._data = data;

        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('beforeend', markup);
        this._openCertificateView();

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
            <div class="window">
            <div class="header">
                <span class="certificate-title">
                    ${this._data.title}
                </span>
                <button class="close-window-button raised">
                    x
                </button>
            </div>
            <div class="body sunk">
                <img 
                    class="certificate-full-preview" 
                    alt="'${this._data.title}' certificate full view"
                    src="${fullView[this._data.preview]}">
            </div>
            <div class="footer">
                <button class="back raised" title="Back">
                <span>
                    Back
                </span>
                </button>
            </div>
            </div>
        `;
    }

    _openCertificateView() {
        this._mainSectionElement.classList.add('blurred');
        this._parentElement.classList.remove('hidden');
        this._parentElement.classList.add('semi-transparent-background');
    }

    _closeCertificateView() {
        this._mainSectionElement.classList.remove('blurred');
        this._parentElement.classList.add('hidden');
        this._parentElement.classList.remove('semi-transparent-background');
    }

    _setViewEventHandlers() {
        // Close certificate view by clicking top-right 'x', bottom-right 'back' or outside modal window
        this._parentElement.querySelector('.close-window-button').addEventListener('click', () => this._closeCertificateView());
        this._parentElement.querySelector('.back').addEventListener('click', () => this._closeCertificateView());
        this._parentElement.addEventListener('click', (e) => {
            let window = e.target.closest('.window');
            if(window) return;
            this._closeCertificateView()}
        );
    }
}

export default new CertificateView();