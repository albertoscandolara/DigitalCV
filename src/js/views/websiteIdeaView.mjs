class WebsiteIdeaView {
    _parentElement = document.querySelector('.body .body-panel .topic-page');
    _data;

    render(data) {
        this._data = data;

        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('beforeend', markup);

        this._setViewEventHandlers();
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderSpinner = function() {
        const markup = `
        `;
    }

    _generateMarkup() {
        return `
        <div class="website-idea-container">
            <div class="paragraph-container">
                <p>
                    I started studying JavaScript in 2019. I've never used it intensively, so I never dove really deep in the concepts. 
                    But, since the very beginning, I wanted to build my own portfolio, a place where I could directly show my skills rather than just talk about them, and where I could bring together all my projects, experiments and works.
                    As a self-taught beginner, I made the common error to go wide rather than deep. I realized it when facing Angular, since many topics there have their roots in the JavaScript language.
                    That's when I stepped back and decided to return to the origins and get Javascript under control.
                </p>
            </div>
            <div class="paragraph-container">
                <p>
                    Early in 2021 I found out <a href="https://executive-ed.xpro.mit.edu/web-development-javascript">MITxPRO Web Development with JavaScript course</a> and it seemed quite a good start. 
                    As final project, we were expected to build our own portfolio: right what I wanted.
                    At the same time I enrolled in <a href="https://www.udemy.com/course/the-complete-javascript-course/">Jonas Schmedtmann's JavaScript course</a>. For me, it is for sure one of the best courses out there, both for content, explainations and hands-on examples. 
                    I loved the MVC (Model View Controller) architectural pattern section, so I decided to stick to it while developing my portfolio.
                </p>
            </div>
            <div class="paragraph-container">
                <p>
                    After some notes and sketches the project kicked off. 
                    It was amazing to see it growing step by step, section by section.
                    Building it from scratch also forced me to directly face some issues, like design and user experience, usually managed by other coworkers. 
                    This for sure helped me to take more in consideration the importance and the difficulties of their job and appreciate even more their efforts.
                </p>
            </div>
            <div class="paragraph-container">
                <p>
                    While the site grew, I decided that I could use it as test subject or benchmark to develop features I was curious about, even if not directly connected to a portfolio.
                    That's when the dark/light mode toggler button appeared, or mapbox maps in the "About me" section or, and this is the most amazing feature I've discovered so far, 3D Blender models into web pages in the "3D Modelling" section.
                </p>
            </div>
            <div class="paragraph-container">
                <p>
                    At the end, the portfolio turned into a real, continuously growing website, giving to me many simultaneous advantages:
                    <ul>
                        <li>
                            The possibility to directly show what I can do;
                        </li>
                        <li>
                            The possibility to group all my works and certificates into a single, organized, place;
                        </li>
                        <li>
                            The possibility to enhance my JavaScript skills;
                        </li>
                        <li>
                            The possibility to try and test new interesting features;
                        </li>
                        <li>
                            The possibility to have a glimpse over all development stages, from design to deployment.
                        </li>
                    </ul>
                </p>
            </div>
        </div>
        `;
    }

    _setViewEventHandlers() {
        
    }
}

export default new WebsiteIdeaView();