import {svgIcons} from '../json/svgIcons.mjs';
import {themes} from '../json/themes.mjs';
import {languages} from '../json/languages.mjs';
import {allTranslations} from '../json/translations.mjs';
import {navigationVoices} from '../json/navigationVoices.mjs';

import {getSelectedItem} from './helpers/helpers.mjs';

let translations = {};

export const state = {
    themes: {},
    languages: [],
    navigationVoices: [],
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

//////////////////////////////////////////
//         Main menu navigation         //
//////////////////////////////////////////
export const loadMainMenuNavigation = function() {
    state.navigationVoices = navigationVoices;
}

export const getNavigationVoice = function(navigationVoiceId, voices = state.navigationVoices){
    let navigationVoice = null;
    
    for(let i=0; i<voices.length; i++){
        if(voices[i].id === navigationVoiceId){
            navigationVoice = voices[i]; 
            break;
        }

        if(voices[i].children.length > 0){
            navigationVoice = getNavigationVoice(navigationVoiceId, voices[i].children);
        
            if(navigationVoice) {
                break;
            }
        }
    }
    return navigationVoice;
}

// Recursive function to get menu voices that need to show some content in a panel
export const getMenuVoicesRequiringPanel = function(panels = state.navigationVoices) {
    let menuVoicesRequiringPanel = [];

    panels.forEach(
        voice => {
            if(voice.requirePanel){
                menuVoicesRequiringPanel.push(voice);
            }else{
                if(voice.children.length !== 0) { 
                    let subPanelsToLoad = getMenuVoicesRequiringPanel(voice.children);
                    menuVoicesRequiringPanel.push(
                        ...subPanelsToLoad
                    );
                }
                
            }
        }
    );

    return menuVoicesRequiringPanel;
}