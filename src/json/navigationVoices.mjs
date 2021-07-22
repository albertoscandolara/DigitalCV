// {
//   "id": "page_id",
//   "open": [1,2], 1 if it opens overview page, 2 if it opens an intermediate one before overview
//   "selected": [true/false],
//   "text": "page_text",
//   "title": "page_title",
//   "icon": "page_icon",
//   "ready": [true/false],
//   "toLearn": [true/false],
//   "requirePanel": [true/false],
//   "children": []
// }

export const navigationVoices = [
    {
      "id": "About me",
      "open": 1,
      "selected": true,
      "text": "About me",
      "title": "About me",
      "icon": "",
      "ready": false,
      "toLearn": false,
      "requirePanel": true,
      "custom": false,
      "overviewText": "",
      "children": [
        {
          "id": "Contacts",
          "open": null,
          "selected": false,
          "text": "Contacts",
          "title": "Contacts",
          "icon": "contacts",
          "ready": true,
          "toLearn": false,
          "requirePanel": false,
          "custom": true,
          "overviewText": "",
          "children": []
        },
        {
          "id": "Languages",
          "open": null,
          "selected": false,
          "text": "Languages",
          "title": "Languages",
          "icon": "languages",
          "ready": false,
          "toLearn": false,
          "requirePanel": false,
          "custom": true,
          "overviewText": "",
          "children": []
        },
        {
          "id": "Trails",
          "open": null,
          "selected": false,
          "text": "Trails",
          "title": "Trails",
          "icon": "trekking",
          "ready": true,
          "toLearn": false,
          "requirePanel": false,
          "custom": true,
          "overviewText": "",
          "children": []
        },
        {
          "id": "Travels",
          "open": null,
          "selected": false,
          "text": "Travels",
          "title": "Travels",
          "icon": "airplane",
          "ready": true,
          "toLearn": false,
          "requirePanel": false,
          "custom": true,
          "overviewText": "",
          "children": []
        }
      ]
    },
    {
      "id": "Front end",
      "open": 2,
      "selected": false,
      "text": "Front end",
      "title": "Front end",
      "icon": "",
      "ready": false,
      "toLearn": false,
      "requirePanel": false,
      "custom": false,
      "overviewText": "",
      "children": [
        {
          "id": "JavaScript",
          "open": 1,
          "selected": false,
          "text": "JavaScript",
          "title": "JavaScript",
          "icon": "logo_javascript",
          "ready": false,
          "toLearn": false,
          "requirePanel": true,
          "custom": false,
          "overviewText": "Started learning JavaScript in 2019. Experience with intermediate JavaScript concepts and their evolution through subsequent EcmaScript releases, such as OOP pattern (with constructor functions, classes and prototypes), asynchronous code (with XMLHttpRequests, fetch and async/await) and functional coding. At ease with basic tecniques as destructuring, spread operator, event listeners, array manipulation methods. Also familiar with some JavaScript frameworks, such as JQuery and JQuery-UI.",
          "children": [
            {
              "id": "Certificates",
              "open": null,
              "selected": false,
              "text": "Certificates",
              "title": "Certificates",
              "icon": "certificate",
              "ready": false,
              "toLearn": false,
              "requirePanel": false,
              "custom": false,
              "overviewText": "",
              "children": []
            },
            {
              "id": "Projects",
              "open": null,
              "selected": false,
              "text": "Projects",
              "title": "Projects",
              "icon": "project",
              "ready": false,
              "toLearn": false,
              "requirePanel": false,
              "custom": false,
              "overviewText": "",
              "children": []
            }
          ],
        },
        {
          "id": "Angular",
          "open": 1,
          "selected": false,
          "text": "Angular",
          "title": "Angular",
          "icon": "logo_angular",
          "ready": false,
          "toLearn": false,
          "requirePanel": true,
          "custom": false,
          "overviewText": "",
          "children": [
            {
              "id": "Certificates",
              "open": null,
              "selected": false,
              "text": "Certificates",
              "title": "Certificates",
              "icon": "certificate",
              "ready": false,
              "toLearn": false,
              "requirePanel": false,
              "custom": false,
              "overviewText": "",
              "children": []
            },
            {
              "id": "Projects",
              "open": null,
              "selected": false,
              "text": "Projects",
              "title": "Projects",
              "icon": "project",
              "ready": false,
              "toLearn": false,
              "requirePanel": false,
              "custom": false,
              "overviewText": "",
              "children": []
            }
          ]
        },
        {
          "id": "React",
          "open": 1,
          "selected": false,
          "text": "React",
          "title": "React",
          "icon": "logo_react",
          "ready": false,
          "toLearn": true,
          "requirePanel": true,
          "custom": false,
          "overviewText": "",
          "children": [
            {
              "id": "Certificates",
              "open": null,
              "selected": false,
              "text": "Certificates",
              "title": "Certificates",
              "icon": "certificate",
              "ready": false,
              "toLearn": false,
              "requirePanel": false,
              "custom": false,
              "overviewText": "",
              "children": []
            },
            {
              "id": "Projects",
              "open": null,
              "selected": false,
              "text": "Projects",
              "title": "Projects",
              "icon": "project",
              "ready": false,
              "toLearn": false,
              "requirePanel": false,
              "custom": false,
              "overviewText": "",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "id": "Back end",
      "open": 2,
      "text": "Back end",
      "title": "Back end",
      "icon": "",
      "ready": false,
      "toLearn": false,
      "requirePanel": false,
      "custom": false,
      "overviewText": "",
      "children": [
        {
          "id": "C",
          "open": 1,
          "text": "C",
          "title": "C",
          "icon": "logo_c",
          "ready": false,
          "toLearn": false,
          "requirePanel": true,
          "custom": false,
          "overviewText": "",
          "children": [
            {
              "id": "Certificates",
              "open": null,
              "text": "Certificates",
              "title": "Certificates",
              "icon": "certificate",
              "ready": false,
              "toLearn": false,
              "requirePanel": false,
              "custom": false,
              "overviewText": "",
              "children": []
            },
            {
              "id": "Projects",
              "open": null,
              "text": "Projects",
              "title": "Projects",
              "icon": "project",
              "ready": false,
              "toLearn": false,
              "requirePanel": false,
              "custom": false,
              "overviewText": "",
              "children": []
            }
          ]
        },
        {
          "id": "CPlusPlus",
          "open": 1,
          "selected": false,
          "text": "C++",
          "title": "C++",
          "icon": "logo_c_plus_plus",
          "ready": false,
          "toLearn": false,
          "requirePanel": true,
          "custom": false,
          "overviewText": "",
          "children": [
            {
              "id": "Certificates",
              "open": null,
              "selected": false,
              "text": "Certificates",
              "title": "Certificates",
              "icon": "certificate",
              "ready": false,
              "toLearn": false,
              "requirePanel": false,
              "custom": false,
              "overviewText": "",
              "children": []
            },
            {
              "id": "Projects",
              "open": null,
              "selected": false,
              "text": "Projects",
              "title": "Projects",
              "icon": "project",
              "ready": false,
              "toLearn": false,
              "requirePanel": false,
              "custom": false,
              "overviewText": "",
              "children": []
            }
          ]
        },
        {
          "id": "cSharp",
          "open": 1,
          "selected": false,
          "text": "C#",
          "title": "C#",
          "icon": "logo_c_sharp",
          "ready": false,
          "toLearn": true,
          "requirePanel": true,
          "custom": false,
          "overviewText": "",
          "children": [
            {
              "id": "Certificates",
              "open": null,
              "selected": false,
              "text": "Certificates",
              "title": "Certificates",
              "icon": "certificate",
              "ready": false,
              "toLearn": false,
              "requirePanel": false,
              "custom": false,
              "overviewText": "",
              "children": []
            },
            {
              "id": "Projects",
              "open": null,
              "selected": false,
              "text": "Projects",
              "title": "Projects",
              "icon": "project",
              "ready": false,
              "toLearn": false,
              "requirePanel": false,
              "custom": false,
              "overviewText": "",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "id": "3D Modeling",
      "open": 2,
      "selected": false,
      "text": "3D Modeling",
      "title": "3D Modeling",
      "icon": "",
      "ready": false,
      "toLearn": false,
      "requirePanel": false,
      "custom": false,
      "overviewText": "",
      "children": [
        {
          "id": "Blender",    
          "open": 1,  
          "selected": false,
          "text": "Blender",
          "title": "Blender",
          "icon": "logo_blender",
          "ready": false,
          "toLearn": true,
          "requirePanel": true,
          "custom": false,
          "overviewText": "During my thesis, I worked with Unity 3D Engine. Since the very beginning, I've wanted to add my own assets to the scenes. That's how I discovered Blender. I only had a beginner course before diving into web development, but I still do some exercises now and then. While developing this website, I've seen how powerful the blend between 3D models and web pages can be (higher engagement and a whole new world of possible user interactions among the others), so I'm definitely going to create more hybrid projects to explore the offered possibilities.",
          "children": [
            {
              "id": "Certificates",
              "open": null,
              "selected": false,
              "text": "Certificates",
              "title": "Certificates",
              "icon": "certificate",
              "ready": false,
              "toLearn": false,
              "requirePanel": false,
              "custom": false,
              "overviewText": "",
              "children": []
            },
            {
              "id": "Projects",
              "open": null,
              "selected": false,
              "text": "Projects",
              "title": "Projects",
              "icon": "project",
              "ready": false,
              "toLearn": false,
              "requirePanel": false,
              "custom": false,
              "overviewText": "",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "id": "About this website",
      "open": 1,
      "selected": false,
      "text": "About this website",
      "title": "About this website",
      "icon": "",
      "ready": false,
      "toLearn": false,
      "requirePanel": true,
      "custom": false,
      "overviewText": "",
      "children": [
        {
          "id": "idea",
          "open": null,
          "selected": false,
          "text": "The idea",
          "title": "The idea",
          "icon": "idea",
          "ready": false,
          "toLearn": false,
          "requirePanel": false,
          "custom": true,
          "overviewText": "",
          "children": []
        },
        {
          "id": "credits",
          "open": null,
          "selected": false,
          "text": "Credits",
          "title": "Credits",
          "icon": "copyright",
          "ready": false,
          "toLearn": false,
          "requirePanel": false,
          "custom": true,
          "overviewText": "",
          "children": []
        }
      ]
    },
  ];
  