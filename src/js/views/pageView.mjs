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

    // This handler is all view-related. 
    // No need for publisher-subscriber pattern
    addResizerHandler() {
        this._topic_panel.querySelector('.sub-section-container .resizer')
            .addEventListener(
                'mousedown', 
                (e) => {
                    function doDrag(e) {
                        overviewSection.style.width = (startWidth + e.clientX - startX) + 'px';
                    }
                     
                    function stopDrag(e) {
                        document.documentElement.removeEventListener('mousemove', doDrag, false);
                        document.documentElement.removeEventListener('mouseup', stopDrag, false);
                    }

                    let overviewSection = this._topic_panel.querySelector('.topic-container');
                    let startX = e.clientX;
                    let startWidth = parseInt(overviewSection.getBoundingClientRect().width);

                    document.documentElement.addEventListener('mousemove', doDrag, false);
                    document.documentElement.addEventListener('mouseup', stopDrag, false);

                }
            );
    }
}

export default new PageView();