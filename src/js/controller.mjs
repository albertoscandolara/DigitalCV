import * as model from './model.mjs';
import * as helpers from './helpers/helpers.mjs';

import themeManagerView from './views/themeManagerView.mjs';
import changeLanguageView from './views/changeLanguageView.mjs';
import mainMenuNavigationView from './views/mainMenuNavigationView.mjs';
import secondLevelNavigationView from './views/secondLevelNavigationView.mjs';

if(module.hot){
    module.hot.accept
}

//////////////////////////////////////////
//              Languages               //
//////////////////////////////////////////

const controlLanguages = function() {
    changeLanguageView.render(model.state.languages);
}

const controlSetLanguage = function(languageAcronym){
    model.setSelectedLanguage(languageAcronym);
    controlLanguages();
}


const setChangeLanguageViewHandlers = function() {
    changeLanguageView.addHandlerApplyLanguage(controlSetLanguage);
    changeLanguageView.addHandlerUndoLanguage();
    changeLanguageView.addHandlerSelectLanguage();
    changeLanguageView.addHandlerOpenLanguageWindow();
}

//////////////////////////////////////////
//            Themes manager            //
//////////////////////////////////////////

const controlThemeManager = function() {
    const selectedTheme = helpers.getSelectedItem(model.state.themes);
    themeManagerView.render(selectedTheme);
}

const controlSetTheme = function(setThemeID){
    model.setSelectedTheme(setThemeID);
    controlThemeManager();
}

const setThemeManagerViewHandlers = function() {
    themeManagerView.addHandlerClick(controlSetTheme);
}

//////////////////////////////////////////
//         Main menu navigation         //
//////////////////////////////////////////

const controlMainMenuNavigation = function(){
    const firstLevelVoices = model.state.navigationVoices;
    mainMenuNavigationView.render(firstLevelVoices);
}

const controlOpenSecondNavigationVoices = function(mainMenuVoiceId){
    const navigationVoice = model.state.navigationVoices.find(voice => voice.id === mainMenuVoiceId);
    const secondLevelNavigationVoices = navigationVoice.children;

    if(secondLevelNavigationVoices.length === 0) return;
    secondLevelNavigationView.render(secondLevelNavigationVoices);
}

const setMainMenuNavigationViewHandlers = function(){
    mainMenuNavigationView.addHandlerClick(controlOpenSecondNavigationVoices);
}

///////////////////////////////////////////////////////////////////////////////////////////////

function init(){
    // Load languages and translations
    model.loadLanguages();
    controlLanguages();
    setChangeLanguageViewHandlers();

    // Load themes and themeManager
    model.loadThemes();
    controlThemeManager();
    setThemeManagerViewHandlers();

    // Load main menu navigation
    model.loadMainMenuNavigation();
    controlMainMenuNavigation();
    setMainMenuNavigationViewHandlers();
}

init();