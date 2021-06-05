import * as model from './model.mjs';
import * as helpers from './helpers/helpers.mjs';

import pageView from './views/pageView.mjs'
import themeManagerView from './views/themeManagerView.mjs';
import changeLanguageView from './views/changeLanguageView.mjs';
import mainMenuNavigationView from './views/mainMenuNavigationView.mjs';
import secondLevelNavigationView from './views/secondLevelNavigationView.mjs';

import topicOverview from './views/body-content-views/topicOverview.mjs';

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

////////////////////////////////////////////////
//      First & second navigation voices      //
////////////////////////////////////////////////

const controlMainMenuNavigation = function() {
    const firstLevelVoices = model.state.navigationVoices;
    mainMenuNavigationView.render(firstLevelVoices);
}

const controlOpenSecondNavigationVoices = function(navigationVoiceId) {
    const navigationVoice = model.getNavigationVoice(navigationVoiceId);
    
    if(navigationVoice.open === 1) {
        pageView.showTopicPage();

        if(navigationVoiceId === "About me") {
            //aboutMeTopicView.render(navigationVoice.children);
        } else if(navigationVoiceId === "About this app") {
            //aboutThisAppTopicView.render(navigationVoice.children);
        } else {
            secondLevelNavigationView.render(navigationVoice.children);
            setSecondLevelNavigationViewHandlers();
        }
    } else if(navigationVoice.open === 2) {
        pageView.showSecondLevelNavigation();
        secondLevelNavigationView.render(navigationVoice.children);
        setSecondLevelNavigationViewHandlers();
    }
}

const setMainMenuNavigationViewHandlers = function() {
    mainMenuNavigationView.addHandlerClick(controlOpenSecondNavigationVoices);
}

const setSecondLevelNavigationViewHandlers = function() {
    secondLevelNavigationView.addHandlerClick(controlLoadBodyContent);
}

//////////////////////////////////////////
//         Sections management          //
//////////////////////////////////////////

const controlLoadBodyContent = function(navigationVoiceId) {
    const navigationVoice = model.getNavigationVoice(navigationVoiceId);
    pageView.showTopicPage();
    //Load overview section
    topicOverview.render(navigationVoice);

    // Load footer
}

//////////////////////////////////////////
//         Page event handlers          //
//////////////////////////////////////////

const controlPageEventHandlers = function() {
    setPageResizers();

}

const setPageResizers = function() {

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

    // Load body content
    controlLoadBodyContent();

    // Set eventListeners on page elements
    controlPageEventHandlers();
}

init();