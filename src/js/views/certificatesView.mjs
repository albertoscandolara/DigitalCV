// import global not yet implemented for parcel 2
//import {logos} from '../../assets/images/logos/*';
// Need to import files individually

// Certificates previews images
// Front-end
// javascript
import preview_the_complete_javaScript_course_2021 from 'url:../../assets/images/certificates-previews/front-end/The_complete_javaScript_course_2021.jpg';

// angular
import preview_reactive_angular_with_rxjs from 'url:../../assets/images/certificates-previews/front-end/Reactive_angular_with_rxjs.jpg';

// react

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

    // angular
    preview_reactive_angular_with_rxjs,

    // react

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

class CertificatesView {
    _parentElement = document.querySelector('.body .body-panel .sub-section');
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
            certificateData => this._generateProjectMarkup(certificateData)
        ).join('')}`;
    }

    _generateProjectMarkup(certificateData) {
        return `
        <button 
            class="card-certificate raised" 
            data-id="${certificateData.id}">
            <div class="card-header">
                <span class="card-title">${certificateData.title}</span>
            </div>
            <div class="card-body">
                <div class="preview-container">
                    <img 
                        class="preview" 
                        alt="'${certificateData.title}' certificate preview" 
                        src="${previews[certificateData.preview]}">
                </div>
                <div class="info-container">
                    <span>Instructor: ${certificateData.instructors.join(', ')}</span>
                    <span>Released by: ${certificateData.platform}</span>
                    <span>Completed: ${certificateData.completionDate}</span>
                </div>
            </div>
            <div class="card-footer"></div>
        </button>
        `;
    }

    addHandlerClick(handler) {
        this._footerParentElement.addEventListener('click', function(e){
            const element = e.target.closest('button');
            if(!element) return;

            const elementId = navigationVoice.dataset.id;
            handler(element);
        })
    }
}

export default new CertificatesView();