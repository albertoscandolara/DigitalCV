// Anagraphic
import stork from 'url:../../assets/images/anagraphic/stork.svg';
import home from 'url:../../assets/images/anagraphic/home.svg';
import phone_monocolor from 'url:../../assets/images/anagraphic/phone_monocolor.svg';
import email from 'url:../../assets/images/anagraphic/email.svg';
import graduation_hat from 'url:../../assets/images/anagraphic/graduation_hat.svg';

// Contacts 
import linkedIn from 'url:../../assets/images/contacts/linkedin.svg';
import angelList from 'url:../../assets/images/contacts/angelList.svg';
import github from 'url:../../assets/images/contacts/github.svg';
import facebook from 'url:../../assets/images/contacts/facebook.svg';
import instagram from 'url:../../assets/images/contacts/instagram.svg';
import phone from 'url:../../assets/images/contacts/call.svg';
import gmail from 'url:../../assets/images/contacts/gmail.svg';

// Logos 
import javascript from 'url:../../assets/images/logos/logo_javascript.svg';
import angular from 'url:../../assets/images/logos/logo_angular.svg';
import react from 'url:../../assets/images/logos/logo_react.svg';
import c from 'url:../../assets/images/logos/logo_c.svg';
import cplusplus from 'url:../../assets/images/logos/logo_c_plus_plus.svg';
import csharp from 'url:../../assets/images/logos/logo_c_sharp.svg';
import blender from 'url:../../assets/images/logos/logo_blender.svg';

// Footer icons
import contacts from 'url:../../assets/images/icons/contacts.svg';
import languages from 'url:../../assets/images/icons/languages.svg';
import airplane from 'url:../../assets/images/icons/airplane.svg';
import certificate from 'url:../../assets/images/icons/certificate.svg';
import project from 'url:../../assets/images/icons/project.svg';
import idea from 'url:../../assets/images/icons/idea.svg';
import copyright from 'url:../../assets/images/icons/copyright.svg';

// Other icons
import arrow from 'url:../../assets/images/icons/arrow.svg';

let icons = {
    // Anagraphic
    stork,
    home,
    phone_monocolor,
    email,
    graduation_hat,

    // Contacts
    linkedIn,
    angelList,
    github,
    facebook,
    instagram,
    phone,
    gmail,

    // Logos
    javascript,
    angular,
    react,
    c,
    cplusplus,
    csharp,
    blender,

    // Footer
    contacts,
    languages,
    airplane,
    certificate,
    project,
    idea,
    copyright,

    // Other icons 
    arrow,
};

class CreditsView {
    _parentElement = document.querySelector('.body .body-panel .topic-page');
    _data;

    render(data, svgIcons) {
        this._data = data;
        icons =  Object.assign(icons, svgIcons);

        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('beforeend', markup);

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
        <div class="credits-section-container fit">
            <div class="filters-container"></div>
            <div class="credits-container">
                ${this._data
                    .sort(
                        (iconA, iconB) => 
                        iconA.text.toLowerCase().localeCompare(iconB.text.toLowerCase())
                    )
                    .map(
                        icon => 
                        this._generateIconMarkup(icon)
                    )
                    .join('')}
            </div>
        </div>
        `;
    }

    _generateIconMarkup(icon) {
        return `
        <div 
            data-id="${icon.id}"
            class="credit-container">
            ${icon.type === 'import' ?
                `
                <img 
                    class="credit-icon-img"
                    src="${icons[icon.icon]}"  
                    title="${icon.title}"
                    alt="${icon.text}">
                ` : ``
            }
            ${icon.type === 'inlinecode' ?
                `
                <div class="credit-icon-img"  
                    title="${icon.title}">
                    ${icons[icon.icon]}
                </div>
                ` : ``
            }
            <div class="credit-info-container">
                <div class="credit-info-header">
                    <h1 class="credit-title">${icon.text}</h1>
                </div>
                <div class="separator"></div>
                <div class="credit-info-body">
                    <div class="credit-info">
                        <span>Author :</span>
                        <span>${icon.author ? icon.author : ' -- '}</span>
                    </div>
                    ${icon.authorPageUrl ?
                        `
                        <div class="credit-info">
                            <a href="${icon.authorPageUrl}">Author's website</a>
                        </div>
                        `
                        : 
                        ''
                    }
                    ${icon.iconReferenceUrl ?
                        `
                        <div class="credit-info">
                            <a href="${icon.iconReferenceUrl}">Icon reference</a>
                        </div>
                        `
                        : 
                        ''
                    }
                </div>
                <div class="credit-info-footer">
                </div>
            </div>
        </div>
        `;
    }

    _getIconById(id) {
        return this._data.find(
            icon => icon.id === id
        );
    }

    _getIconsByTags(tags) {
        return this._data.filter(
            icon => icon.tags.some(
                tag => tags.includes(tag)
            )
        );
    }

    _setViewEventHandlers() {
        
    }
}

export default new CreditsView();