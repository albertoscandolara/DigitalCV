import {openInNewTab} from './../helpers/helpers.mjs';

// import global not yet implemented for parcel 2
//import {logos} from '../../assets/images/logos/*';
// Need to import files individually

// Projects previews images
// Front-end
// javascript
import preview_digital_CV from 'url:../../assets/images/projects-previews/front-end/Digital_CV.PNG';
import preview_real_time_flights_tracker from 'url:../../assets/images/projects-previews/front-end/Real_time_flights_tracker.PNG';
import preview_eye_movement from 'url:../../assets/images/projects-previews/front-end/Eye_movement.PNG';
import preview_heroes_heads from 'url:../../assets/images/projects-previews/front-end/Heroes_heads.PNG';

// angular

// react

// Back-end
// c

// c++

// c#

// 3D Modeling
// blender
import preview_mnms from 'url:../../assets/images/projects-previews/modeling/m&ms.PNG';
import preview_harp from 'url:../../assets/images/projects-previews/modeling/harp.PNG';
import preview_stegosaurus from 'url:../../assets/images/projects-previews/modeling/stegosaurus.PNG';
import preview_allosaurus from 'url:../../assets/images/projects-previews/modeling/allosaurus.PNG';


const previews = {
    // Front-end
    // javascript
    preview_digital_CV,
    preview_real_time_flights_tracker,
    preview_eye_movement,
    preview_heroes_heads,

    // angular

    // react

    // Back-end
    // c

    // c++

    // c#

    // 3D Modeling
    // blender 
    preview_mnms,
    preview_harp,
    preview_stegosaurus,
    preview_allosaurus                
}

class ProjectsView {
    _parentElement = document.querySelector('.body .body-panel .topic-page');
    _data;
    _githubSvgIcon;
    _openNewTabSvgIcon;

    render(data, githubSvgIcon, openNewTabSvgIcon) {
        this._data = data;
        this._githubSvgIcon = githubSvgIcon;
        this._openNewTabSvgIcon = openNewTabSvgIcon;
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
        return `
        <div class="projects-section-container fit">
            <div class="projects-container">
            ${(!this._data || this._data.length === 0) ?
                `
                <span>No projects available yet!</span>
                `
                :
                `
                ${this._data.map(
                    project => this._generateProjectMarkup(project)
                ).join('')}
                `
            }
            </div>
        </div>
        `;
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
                        class="preview fit" 
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
                            ${this._openNewTabSvgIcon}
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
                    ${projectData.gltf ? 
                        `
                        <button 
                            data-type="go-to-renderer"
                            class="card-link"
                            title="Open rendered model">
                            ${this._openNewTabSvgIcon}
                        </button>
                        ` : ''
                    }
                </div>
            </div>
            <div class="card-footer">
                <div class="separator"></div>
                <div class="card-footer-content-container"></div>
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
                            case 'go-to-renderer': 
                            break;
                        }

                        if(url) {
                            openInNewTab(url);
                        }
                    }
                )
            );
    }


    open3DModelRendererHandler(handler) {
        Object.values(this._parentElement.querySelectorAll('.card-links-container'))
            .forEach(cardLinksContainer => {


                if(!Object.values(cardLinksContainer.querySelectorAll('.card-link')).some(cardLink => cardLink.dataset.type === 'go-to-renderer')) return;


                let open3DModelViewButton = Object.values(cardLinksContainer.querySelectorAll('.card-link')).filter(cardLink => cardLink.dataset.type === 'go-to-renderer')[0];
                if(!open3DModelViewButton) return;

                open3DModelViewButton.addEventListener('click', (e) => {
                    const element = e.target.closest('.card-project');
                    if(!element) return;
    
                    const elementId = element.dataset.id;
                    const data = this._data.find(projectData => projectData.id === elementId);
                    handler(data);
                });
            }
        );
    }
}

export default new ProjectsView();