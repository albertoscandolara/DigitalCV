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
      "children": [
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
      "children": [
        {
          "id": "Javascript",
          "open": 1,
          "selected": false,
          "text": "Javascript",
          "title": "Javascript",
          "icon": "logo_javascript",
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
              "children": []
            }
          ]
        }
      ]
    },
    {
      "id": "About this app",
      "open": 1,
      "selected": false,
      "text": "About this app",
      "title": "About this app",
      "icon": "",
      "ready": false,
      "toLearn": false,
      "requirePanel": true,
      "custom": false,
      "children": []
    },
  ];
  