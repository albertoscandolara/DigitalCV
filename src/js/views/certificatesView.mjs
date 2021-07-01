// import global not yet implemented for parcel 2
//import {logos} from '../../assets/images/logos/*';
// Need to import files individually

// Certificates previews images
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



const previews = {
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
};

class CertificatesView {
    _parentElement = document.querySelector('.body .body-panel .topic-page');
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
        if(!this._data || this._data.length === 0) {
            return `
                <span>No certificates available yet!</span>
            `;
        }

        return `${this._data.map(
            certificate => this._generateCertificateMarkup(certificate)
        ).join('')}`;
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

export default new CertificatesView();