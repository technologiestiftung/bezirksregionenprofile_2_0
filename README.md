# bezirksregionenprofile_2_0

All data is loaded from API. API data can be edited in the [bezirksregionenprofile-daten
](https://github.com/technologiestiftung/bezirksregionenprofile-daten) repo

## Setup
```npm install```

## Config
Urls ```BASE_URL``` and ```API_URL``` need to be set in ```package.json``` files

In development mode ```BASE_URL``` defaults to ```http://localhost:3000```

Eventually check for CORS settings of API server if request in build process fail.

## Development
```npm run dev```
or
```npm run dev --fix```
to auto fix prettier format problems

## Build
Adjust urls in packagejson

```npm run generate```

## Content page data structure (BZR page)
Available content elements: 
* title - healine element
* text - text block
* image - image with headline
* barchart - barchart with headline
* linechart - linechart with headline
* map-pr - heatmap for all Planungsräume within the current Bezirksregion
* map-poi - map with markers

### Example dataset with all content elements
```
[
    {
        "ref": "1",
        "type": "titel",
        "content": "Headline Text"
    },
    {
        "ref": "1",
        "type": "text",
        "content": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
    },
    {
        "ref": "1",
        "type": "image",
        "datasource": "https://image-url.jpg",
        "content": "Image headline",
        "source": "copyright information / credits",
        "alt": "Alt text"
    },
    {
        "ref": "2",
        "type": "table",
        "content": "Table headline",
        "source": "copyright information / credits",
        "alt": "Alt text for aria-label",
        "data": [
            {
                "filedname1": "value_1_row_1",
                "filedname2": "value_2_row_1",
                "filedname3": "value_1_row_1"
            },
            {
                "filedname1": "value_1_row_2",
                "filedname2": "value_2_row_2",
                "filedname3": "value_1_row_2"
            }
        ]
    },
    {
        "ref": "2",
        "type": "barchart",
        "content": "Chart headline",
        "source": "copyright information / credits",
        "data": {
            "labels": [
                "2013",
                "2014",
                "2015",
                "2016",
                "2017"
            ],
            "datasets": [
                {
                    "data": [
                        "23",
                        "25",
                        "37",
                        "40",
                        "35"
                    ],
                    "label": "Kita 1",
                    "borderColor": "#1E3791",
                    "backgroundColor": "#1E3791",
                    "fill": false
                },
                {
                    "data": [
                        "13",
                        "10",
                        "12",
                        "17",
                        "15"
                    ],
                    "label": "Kita 2",
                    "borderColor": "#04A6F0 ",
                    "backgroundColor": "#04A6F0 ",
                    "fill": false
                }
            ]
        }
    },
    {
        "ref": "2",
        "type": "linechart",
        "content": "Chart headline",
        "source": "copyright information / credits",
        "data": {
            "labels": [
                "2013",
                "2014",
                "2015",
                "2016",
                "2017"
            ],
            "datasets": [
                {
                    "data": [
                        "23",
                        "25",
                        "37",
                        "40",
                        "35"
                    ],
                    "label": "Kita 1",
                    "borderColor": "#1E3791",
                    "backgroundColor": "#1E3791",
                    "fill": false
                },
                {
                    "data": [
                        "13",
                        "10",
                        "12",
                        "17",
                        "15"
                    ],
                    "label": "Kita 2",
                    "borderColor": "#04A6F0 ",
                    "backgroundColor": "#04A6F0 ",
                    "fill": false
                }
            ]
        }
    },
    {
        "ref": "3",
        "type": "map-pr",
        "content": "Map  headline",
        "source": "copyright information / credits",
        "alt": "Alt text for aria-label",
        "data": [
            {
                "id": "7010101",
                "wert": "11.4403",
                "einheit": "GruSI SGB XII 65+ (%)",
                "color": "#E60032"
            },
            {
                "id": "7010102",
                "wert": "21.0592",
                "einheit": "",
                "color": ""
            },
            {
                "id": "7010103",
                "wert": "8.7484",
                "einheit": "",
                "color": ""
            },
            {
                "id": "7010104",
                "wert": "26.9136",
                "einheit": "",
                "color": ""
            }
        ]
    },
    {
        "ref": "2",
        "type": "map-poi",
        "source": "copyright information / credits",
        "content": "Map headline",
        "data": [
            {
                "lng": "13.396395",
                "lat": "52.497542",
                "text": "Spielplatz 1",
                "color": "#1E3791"
            },
            {
                "lng": "13.397543",
                "lat": "52.494634",
                "text": "Spielplatz 2",
                "color": ""
            },
            {
                "lng": "13.404399",
                "lat": "52.495450",
                "text": "Spielplatz 3",
                "color": ""
            }
        ]
    }
]
```