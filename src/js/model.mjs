import {svgIcons} from '../json/svgIcons.mjs';
import {themes} from '../json/themes.mjs';
import {languages} from '../json/languages.mjs';
import {allTranslations} from '../json/translations.mjs';
import {navigationVoices} from '../json/navigationVoices.mjs';

// Projects 
import {javascript} from '../json/projects/javascript';
const projects = { 
    javascript
};

// Certificates
//import {javascript} from '../json/certificates/javascript';
const certificates = { 
    //javascript
};

import {getSelectedItem} from './helpers/helpers.mjs';

let translations = {};

export const state = {
    themes: {},
    languages: [],
    navigationVoices: [],
    projects: projects,
    certificates: certificates
}

//////////////////////////////////////////
//            Themes manager            //
//////////////////////////////////////////

export const loadThemes = function(){
    state.themes = Object.values(themes)
        .map(theme => 
            ({...theme, svgIcon: svgIcons[theme.svgIcon]})
        );

    if(!getSelectedItem(state.themes)){
        setSelectedTheme(state.themes[0]);
    }
}

export const setSelectedTheme = function(themeID) {
    state.themes.forEach(theme => 
        theme.selected = theme.themeID === themeID ? true : false
    );
}


//////////////////////////////////////////
//              Languages               //
//////////////////////////////////////////
const loadTranslations = function(languageAcronym){
    translations = Object.fromEntries(
        Object.entries(allTranslations).map(
            ([key, value]) => [[key], value[languageAcronym]]
        )
    );
}

export const loadLanguages = function(){
    state.languages = languages;

    const localStorageLanguage = window.localStorage.getItem('language');
    const navLanguage = navigator.language;
    const defaultLanguage = 'en-GB';

    let selectedLanguage;
    if(localStorageLanguage){
        selectedLanguage = localStorageLanguage;
    } else if (navLanguage && state.languages.some(language => language.acronym === navLanguage)) {
        selectedLanguage = navLanguage;
    } else {
        selectedLanguage = defaultLanguage;
    }

    setSelectedLanguage(selectedLanguage);
}

export const setSelectedLanguage = function(languageAcronym) {
    window.localStorage.setItem('language', languageAcronym);

    state.languages.forEach(language => 
        language.selected = language.acronym === languageAcronym ? true : false
    );

    loadTranslations(languageAcronym);
}

///////////////////////////////////////////
//            Menu navigation            //
///////////////////////////////////////////
export const loadMainMenuNavigation = function() {
    state.navigationVoices = navigationVoices;
}

export const getNavigationVoice = function(navigationVoiceId, navigationVoices = state.navigationVoices){
    let navigationVoice = null;
    
    for(let i=0; i<navigationVoices.length; i++){
        if(navigationVoices[i].id === navigationVoiceId){
            navigationVoice = navigationVoices[i]; 
            break;
        }

        if(navigationVoices[i].children.length > 0){
            navigationVoice = getNavigationVoice(navigationVoiceId, navigationVoices[i].children);
        
            if(navigationVoice) {
                break;
            }
        }
    }
    return navigationVoice;
}

export const selectLevelOneNavigationVoice = function(navigationVoiceId) {
    deselectAllLevelOneNavigationVoices();

    let levelOneNavigationVoiceToSelect = state.navigationVoices.find(navigationVoice => navigationVoice.id === navigationVoiceId);
    selectNavigationVoice(levelOneNavigationVoiceToSelect);
}

export const selectLevelTwoNavigationVoice = function(navigationVoiceId) {
    let levelOneNavigationVoiceSelected = getSelectedItem(state.navigationVoices);
    if(levelOneNavigationVoiceSelected.open === 2) {
        deselectAllLevelTwoNavigationVoices(levelOneNavigationVoiceSelected);

        let levelTwoNavigationVoiceToSelect = levelOneNavigationVoiceSelected.children.find(navigationVoice => navigationVoice.id === navigationVoiceId);
        selectNavigationVoice(levelTwoNavigationVoiceToSelect);
    }
}

export const deselectAllLevelOneNavigationVoices = function(){
    state.navigationVoices.forEach(navigationVoice => {
        deselectNavigationVoice(navigationVoice);

        // Children must be deselected too
        deselectAllLevelTwoNavigationVoices(navigationVoice);
    });
}

export const deselectAllLevelTwoNavigationVoices = function(levelOneNavigationVoice) {
    levelOneNavigationVoice.children.forEach(navigationVoice => {
        deselectNavigationVoice(navigationVoice);
    })
}

export const deselectNavigationVoice = function(navigationVoice) {
    navigationVoice.selected = false;
}

export const selectNavigationVoice = function(navigationVoice) {
    navigationVoice.selected = true;
}

export const getFirstNavigationVoiceOpeningBodySection = function(navigationVoices = state.navigationVoices) {
    let navigationVoice = null;
    
    for(let i=0; i<navigationVoices.length; i++){
        if(navigationVoices[i].open === 1){
            navigationVoice = navigationVoices[i]; 
            break;
        }

        if(navigationVoices[i].children.length > 0){
            navigationVoice = getFirstNavigationVoiceOpeningBodySection(navigationVoices[i].children);
        
            if(navigationVoice) {
                break;
            }
        }
    }
    return navigationVoice;
}

export const getFirstFooterNavigationVoice = function(navigationVoiceId) {
    let navigationVoice = getNavigationVoice(navigationVoiceId);

    if(navigationVoice.children.count === 0) return;

    return navigationVoice.children[0];
}

// Given a navigation voice id, this function retrieve its parent navigation voice from state.navigationVoices
export const getParentNavigationVoice = function(navigationVoiceId, navigationVoices = state.navigationVoices) {
    let navigationVoice = null;
    
    for(let i=0; i<navigationVoices.length; i++){
        if(navigationVoices[i].children.length == 0) break;

        if(navigationVoices[i].selected && navigationVoices[i].children.some(child => child.id === navigationVoiceId)) {
            navigationVoice = navigationVoices[i];
            break;
        }
        
        navigationVoice = getParentNavigationVoice(navigationVoiceId, navigationVoices[i].children);
        
        if(navigationVoice) {
            break;
        }
    }
    return navigationVoice;
}