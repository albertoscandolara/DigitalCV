// import global not yet implemented for parcel 2
//import {logos} from '../../assets/images/logos/*';
// Need to import files individually

// Projects previews images
// Front-end
// javascript
import preview_real_time_flights_tracker from 'url:../../assets/images/projects-previews/front-end/Real_time_flights_tracker.PNG';
import preview_eye_movement from 'url:../../assets/images/projects-previews/front-end/Eye_movement.PNG';

// angular

// react

// Back-end
// c

// c++

// c#

// 3D Modeling
// blender


const previews = {
    // Front-end
    // javascript
    preview_real_time_flights_tracker,
    preview_eye_movement

    // angular

    // react

    // Back-end
    // c

    // c++

    // c#

    // 3D Modeling
    // blender                 
}

class ProjectsView {
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
                <span>No projects available yet!</span>
            `;
        }

        return `${this._data.map(
            projectData => this._generateProjectMarkup(projectData)
        ).join('')}`;
    }

    _generateProjectMarkup(projectData) {
        return `
        <button 
            class="card-project raised"
            data-id="${projectData.id}">
            <div class="card-header">
                <span class="card-title">
                    ${projectData.title}
                </span>
            </div>
            <div class="card-body">
            <div class="preview-container">
                <img 
                    class="preview" 
                    alt="'${projectData.title}' project preview" 
                    src="${previews[projectData.preview]}">
            </div>
            <span class="card-description">
                ${projectData.description ? projectData.description : 'No description available yet!'}
            </span>
            </div>
            <div class="card-footer">
            </div>
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

export default new ProjectsView();