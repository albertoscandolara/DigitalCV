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
export const loadMainMenuNavigation = function(){
    state.navigationVoices = navigationVoices;
}