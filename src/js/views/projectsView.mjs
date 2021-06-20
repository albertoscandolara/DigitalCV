import {openInNewTab} from './../helpers/helpers.mjs';

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
    _githubSvgIcon;

    render(data, githubSvgIcon) {
        this._data = data;
        this._githubSvgIcon = githubSvgIcon;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('beforeend', markup);
        this._setLinksButtonEventListeners();
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
            <div 
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
                    <div class="card-links-container">
                        ${projectData.githubUrl ? 
                            `
                            <button 
                                data-type="go-to-github"
                                class="card-link"
                                title="Go to github repo">
                                ${this._githubSvgIcon}
                            </button>
                            ` : ''
                        }
                    </div>
                </div>
                <div class="card-footer">
                </div>
            </div>
        `;

        return `
            <div 
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
                    <div class="card-links-container">
                        ${projectData.projectUrl ? 
                            `
                            <button 
                                data-type="go-to-project"
                                class="card-link"
                                title="Open project in a new tab">
                                ${this._githubSvgIcon}
                            </button>
                            ` : ''
                        }
                        ${projectData.githubUrl ? 
                            `
                            <button 
                                data-type="go-to-github"
                                class="card-link"
                                title="Go to github repo">
                                ${this._githubSvgIcon}
                            </button>
                            ` : ''
                        }
                    </div>
                </div>
                <div class="card-footer">
                </div>
            </div>
        `;
    }

    addHandlerClick(handler) {
        this._parentElement
            .addEventListener(
                'click', 
                (e) => {
                    const element = e.target.closest('.card-project');
                    if(!element) return;

                    const elementId = element.dataset.id;
                    const data = this._data.find(projectData => projectData.id === elementId);
                    handler(data);
                }
            );
    }

    _setLinksButtonEventListeners() {
        Object.values(this._parentElement.querySelectorAll('.card-links-container'))
            .forEach(cardLinksContainer =>
                cardLinksContainer.addEventListener(
                    'click', 
                    (e) => {
                        let element = e.target.closest('.card-link');
                        if(!element) return;
                        
                        let projectId = e.target.closest('.card-project').dataset.id;
                        let project = this._data.find(project => project.id === projectId);
                        
                        let url = null;
                        switch(element.dataset.type) {
                            case 'go-to-project': 
                                url = project.projectUrl;
                            break;
                            case 'go-to-github': 
                                url = project.githubUrl;
                            break;
                        }

                        if(url) {
                            openInNewTab(url);
                        }
                    }
                )
            );
    }
}

export default new ProjectsView();