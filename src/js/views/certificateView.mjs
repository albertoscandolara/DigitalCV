// import global not yet implemented for parcel 2
//import {logos} from '../../assets/images/logos/*';
// Need to import files individually

// Travels pictures

// Russia-Finland-Estonia
// Moscow
import moscow_01 from 'url:../../assets/images/travels/Russia/Moscow/Moscow_01.jpg';
import moscow_02 from 'url:../../assets/images/travels/Russia/Moscow/Moscow_02.jpg';
import moscow_03 from 'url:../../assets/images/travels/Russia/Moscow/Moscow_03.jpg';
import moscow_04 from 'url:../../assets/images/travels/Russia/Moscow/Moscow_04.jpg';
import moscow_05 from 'url:../../assets/images/travels/Russia/Moscow/Moscow_05.jpg';

// Saint Petersburg
import saint_petersburg_01 from 'url:../../assets/images/travels/Russia/Saint Petersburg/Saint_Petersburg_01.jpg';
import saint_petersburg_02 from 'url:../../assets/images/travels/Russia/Saint Petersburg/Saint_Petersburg_02.jpg';
import saint_petersburg_03 from 'url:../../assets/images/travels/Russia/Saint Petersburg/Saint_Petersburg_03.jpg';
import saint_petersburg_04 from 'url:../../assets/images/travels/Russia/Saint Petersburg/Saint_Petersburg_04.jpg';
import saint_petersburg_05 from 'url:../../assets/images/travels/Russia/Saint Petersburg/Saint_Petersburg_05.jpg';

// Cuba
// Havana
import havana_01 from 'url:../../assets/images/travels/Cuba/Havana/Havana_01.jpg';
import havana_02 from 'url:../../assets/images/travels/Cuba/Havana/Havana_02.jpg';
import havana_03 from 'url:../../assets/images/travels/Cuba/Havana/Havana_03.jpg';
import havana_04 from 'url:../../assets/images/travels/Cuba/Havana/Havana_04.jpg';
import havana_05 from 'url:../../assets/images/travels/Cuba/Havana/Havana_05.jpg';

// Cayo Largo
import cayo_largo_01 from 'url:../../assets/images/travels/Cuba/Cayo Largo/Cayo_Largo_01.jpg';
import cayo_largo_02 from 'url:../../assets/images/travels/Cuba/Cayo Largo/Cayo_Largo_02.jpg';
import cayo_largo_03 from 'url:../../assets/images/travels/Cuba/Cayo Largo/Cayo_Largo_03.jpg';

// Varadero
import varadero_01 from 'url:../../assets/images/travels/Cuba/Varadero/Varadero_01.jpg';
import varadero_02 from 'url:../../assets/images/travels/Cuba/Varadero/Varadero_02.jpg';
import varadero_03 from 'url:../../assets/images/travels/Cuba/Varadero/Varadero_03.jpg';
import varadero_04 from 'url:../../assets/images/travels/Cuba/Varadero/Varadero_04.jpg';

// Scotland
// Edinburgh
import edinburgh_01 from 'url:../../assets/images/travels/Scotland/Edinburgh/Edinburgh_01.jpg';
import edinburgh_02 from 'url:../../assets/images/travels/Scotland/Edinburgh/Edinburgh_02.jpg';
import edinburgh_03 from 'url:../../assets/images/travels/Scotland/Edinburgh/Edinburgh_03.jpg';
import edinburgh_04 from 'url:../../assets/images/travels/Scotland/Edinburgh/Edinburgh_04.jpg';
import edinburgh_05 from 'url:../../assets/images/travels/Scotland/Edinburgh/Edinburgh_05.jpg';



// Certificates images

// Languages

// French

// English
import preview_english_uic from 'url:../../assets/images/certificates-previews/languages/english/UIC_languages_for_living.jpg';

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
    // Russia-Finland-Estonia
    // Moscow
    moscow_01,
    moscow_02,
    moscow_03,
    moscow_04,
    moscow_05,

    // Saint_Petersburg
    saint_petersburg_01,
    saint_petersburg_02,
    saint_petersburg_03,
    saint_petersburg_04,
    saint_petersburg_05,

    // Cuba
    // Havana
    havana_01,
    havana_02,
    havana_03,
    havana_04,
    havana_05,

    // Cayo Largo
    cayo_largo_01,
    cayo_largo_02,
    cayo_largo_03,

    // Varadero
    varadero_01,
    varadero_02,
    varadero_03,
    varadero_04,

    // Scotland
    // Edinburgh
    edinburgh_01,
    edinburgh_02,
    edinburgh_03,
    edinburgh_04,
    edinburgh_05,




    // Languages

    // French

    // English
    preview_english_uic,
    
    // German

    // Italian

    // Russian
    preview_russian_made_easy,

    // Spanish

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