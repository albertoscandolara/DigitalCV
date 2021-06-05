class PageView {
    _second_level_navigation = document.querySelector('.body .second-level-nav');
    _topic_panel = document.querySelector('.body .body-panel');

    _hiddenClass = 'hidden';

    showSecondLevelNavigation() {
        this._second_level_navigation.classList.remove(this._hiddenClass);
        this._topic_panel.classList.add(this._hiddenClass);
    }

    showTopicPage() {
        this._second_level_navigation.classList.add(this._hiddenClass);
        this._topic_panel.classList.remove(this._hiddenClass);
    }

    addHandlerClick(handler){
        
    }
}

export default new PageView();