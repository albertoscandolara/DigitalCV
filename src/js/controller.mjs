import * as model from './model.mjs';
import * as helpers from './helpers/helpers.mjs';

import pageView from './views/pageView.mjs'
import themeManagerView from './views/themeManagerView.mjs';
import changeLanguageView from './views/changeLanguageView.mjs';
import mainMenuNavigationView from './views/mainMenuNavigationView.mjs';
import secondLevelNavigationView from './views/secondLevelNavigationView.mjs';

import topicOverview from './views/body-content-views/topicOverview.mjs';
import topicAboutMeView from './views/body-content-views/topicAboutMeView.mjs';
import topicAboutThisWebsiteView from './views/body-content-views/topicAboutThisWebsiteView.mjs';

import contactsView from './views/contactsView.mjs';
import languagesView from './views/languagesView.mjs';
import trailsView from './views/trailsView.mjs';
import travelsView from './views/travelsView.mjs';
import websiteIdeaView from './views/websiteIdeaView.mjs';
import creditsView from './views/creditsView.mjs';
import projectsView from './views/projectsView.mjs';
import certificatesView from './views/certificatesView.mjs';
import model3DRendererView from './views/model3DRendererView.mjs';
import slideshowView from './views/slideshowView.mjs';

if(module.hot){
    module.hot.accept
}

//////////////////////////////////////////
//              Languages               //
//////////////////////////////////////////

const controlLanguages = function() {
    changeLanguageView.render(
        model.state.languages.filter(language => language.translated)
        );
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

const setMainMenuNavigationViewHandlers = function() {
    mainMenuNavigationView.addHandlerClick(controlOpenSecondNavigationVoices);
}

const controlOpenSecondNavigationVoices = function(navigationVoiceId) {
    model.selectLevelOneNavigationVoice(navigationVoiceId);
    mainMenuNavigationView.selectLevelOneNavigationVoice(navigationVoiceId);
    const navigationVoice = model.getNavigationVoice(navigationVoiceId);
    
    if(navigationVoice.open === 1) {
        pageView.showTopicPage();

        const aboutMe = "About me";
        const aboutThisWebsite = "About this website";

        switch(navigationVoiceId) {
            case aboutMe: 
                controlLoadAboutMeBodyContent(navigationVoiceId);
                break;
            case aboutThisWebsite: 
                controlLoadAboutThisWebsiteBodyContent(navigationVoiceId);
                break;
            default:
                secondLevelNavigationView.render(navigationVoice.children);
                setSecondLevelNavigationViewHandlers();
        }
    } else if(navigationVoice.open === 2) {
        pageView.showSecondLevelNavigation();
        secondLevelNavigationView.render(navigationVoice.children);
        setSecondLevelNavigationViewHandlers();
    }
}

const setSecondLevelNavigationViewHandlers = function() {
    secondLevelNavigationView.addHandlerClick(controlLoadBodyContent);
}

//////////////////////////////////////////
//         Sections management          //
//////////////////////////////////////////

const controlLoadAboutMeBodyContent = function(navigationVoiceId) {
    const navigationVoice = model.getNavigationVoice(navigationVoiceId);

    pageView.showTopicPage();
    //Load overview section
    topicAboutMeView.render(navigationVoice, model.state.anagraphic);

    // Load first footer voice
    let footerNavigationVoice = model.getFirstFooterNavigationVoice(navigationVoice.id);
    controlLoadBodySectionContent(footerNavigationVoice.id);

    topicAboutMeView.addHandlerClick(controlLoadBodySectionContent);
}

const controlLoadAboutThisWebsiteBodyContent = function(navigationVoiceId) {
    const navigationVoice = model.getNavigationVoice(navigationVoiceId);

    pageView.showTopicPage();
    //Load overview section
    topicAboutThisWebsiteView.render(navigationVoice);

    // Load first footer voice
    let footerNavigationVoice = model.getFirstFooterNavigationVoice(navigationVoice.id);
    controlLoadBodySectionContent(footerNavigationVoice.id);

    topicAboutThisWebsiteView.addHandlerClick(controlLoadBodySectionContent);
}

const controlLoadBodyContent = function(navigationVoiceId) {
    const navigationVoice = model.getNavigationVoice(navigationVoiceId);
    model.selectLevelTwoNavigationVoice(navigationVoice.id);

    pageView.showTopicPage();
    //Load overview section
    topicOverview.render(navigationVoice);

    // Load first footer voice
    let footerNavigationVoice = model.getFirstFooterNavigationVoice(navigationVoice.id);
    controlLoadBodySectionContent(footerNavigationVoice.id);

    topicOverview.addHandlerClick(controlLoadBodySectionContent);
}

const controlLoadBodySectionContent = function(navigationVoiceId) {
    const navigationVoice = model.getNavigationVoice(navigationVoiceId);
    const parentNavigationVoice = model.getParentNavigationVoice(navigationVoice.id);
    
    navigationVoice.custom ? 
        controlLoadCustomNavigationVoiceBody(navigationVoice) : 
        controlLoadStandardNavigationVoiceBody(navigationVoice, parentNavigationVoice);
}

const controlLoadCustomNavigationVoiceBody = function(navigationVoice) {
    const contactsString = 'contacts';
    const languagesString = 'languages';
    const trailsString = 'trails';
    const travelsString = 'travels';
    const websiteIdeaString = 'idea';
    const creditsString = 'credits';
    
    switch(navigationVoice.id.toLowerCase()){
        case contactsString: 
            controlLoadContactsBodySection();
            break;
        case languagesString:
            controlLoadLanguagesBodySection();
            break;
        case trailsString: 
            controlLoadTrailsBodySection();
            break;
        case travelsString: 
            controlLoadTravelsBodySection();
            break;
        case websiteIdeaString: 
            controlLoadWebsiteIdeaBodySection();
            break;
        case creditsString: 
            controlLoadCreditsBodySection();
            break;
    }
}

const controlLoadStandardNavigationVoiceBody = function(navigationVoice, parentNavigationVoice) {
    const certificatesString = 'certificates';
    const projectsString = 'projects'

    switch(navigationVoice.id.toLowerCase()){
        case certificatesString:
            let certificates = model.state[certificatesString][parentNavigationVoice.id.toLowerCase()];
            certificatesView.render(
                certificates
            );
            certificatesView.addHandlerClick(controlSlideshow);
            break;
        case projectsString:
            let projects = model.state[projectsString][parentNavigationVoice.id.toLowerCase()];
            projectsView.render(
                projects, 
                model.state.svgIcons.github_monocolor, 
                model.state.svgIcons.open_new_tab
            );
            projectsView.open3DModelRendererHandler(controlOpen3DModelRenderer);
        break;
    }
}

const controlLoadContactsBodySection = function() {
    let contacts = model.state.contacts;
    contactsView.render(contacts);
}

const controlLoadLanguagesBodySection = function() {
    let languages = model.state.languages;
    languagesView.render(languages);
    languagesView.addHandlerClick(controlSlideshow);
}

const controlLoadTrailsBodySection = function () {
    trailsView.render(
        model.state.mapStyles,
        model.state.trails, 
        model.state.svgIcons.trekking,
        model.state.svgIcons.camera,
        model.state.svgIcons.global_localization
    );
    trailsView.addCameraHandlerClick(controlSlideshow);
}

const controlLoadTravelsBodySection = function() {
    travelsView.render(
        model.state.mapStyles,
        model.state.travels, 
        model.state.svgIcons.flag,
        model.state.svgIcons.camera,
        model.state.svgIcons.global_localization
    );
    travelsView.addCameraHandlerClick(controlSlideshow);
}

const controlLoadWebsiteIdeaBodySection = function() {
    websiteIdeaView.render();
}

const controlLoadCreditsBodySection = function() {
    const icons = model.state.iconsList;
    const svgIcons = model.state.svgIcons;
    creditsView.render(
        icons,
        svgIcons
    );
}

const controlSlideshow = function(stop) {
    slideshowView.render(stop);
}

const controlOpen3DModelRenderer = function(project) {
    model3DRendererView.render(project);
}

//////////////////////////////////////////
//         Page event handlers          //
//////////////////////////////////////////

const controlPageEventHandlers = function() {
    setPageResizers();
}

const setPageResizers = function() {
    pageView.addResizerHandler();
}


///////////////////////////////////////////////////////////////////////////////////////////////

function init() {
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
    let navigationVoice = model.getFirstNavigationVoiceOpeningBodySection();
    if(navigationVoice) {
        controlOpenSecondNavigationVoices(navigationVoice.id);
    }

    // Set eventListeners on page elements
    controlPageEventHandlers();
}

init();