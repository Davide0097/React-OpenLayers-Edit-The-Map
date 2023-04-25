Topics:

• Technologies used in this app
• Prerequisites and installation
• Manage and add the Controls
• Interact with the View component


This is the second post about React and OpenLayers.
In the first post, I covered basic concepts about the OpenLayers library and how to initialize the map using React functional components.

If you want to start exploring openLayers please have a look at the previous post.

In this post, I will cover the view component and the controls component, and how we can interact with them dynamically. Specifically, we will discuss how to add new controls to the map and how to interact with the view component.


Technologies used in this app

In my app, I utilized the following technologies:
- React: A popular JavaScript library for building user interfaces.
- TypeScript: A statically typed superset of JavaScript.
- Vite: A fast build tool and development server.


Run the app locally - Prerequisites and installation

Before getting started with the app, you'll need to have Node.js and npm installed on your machine.
To install and run the app, follow these simple steps:
1 - Clone the repository.
2 - Install dependencies by running npm install in the project directory.
3 - Start the development server by running npm run dev in the project directory.


Manage the Controls:

Controls are elements displayed on the map that we set when initializing it.
In OpenLayers, controls are used to provide additional functionality to the map, such as zooming, panning, and displaying information about the map.

There are many different types of controls available in OpenLayers, and you can add them to the map when you initialize it, or you can add and remove them dynamically using the OpenLayers API.

Zoom control: Allows users to zoom in and out on a map using the ol/control/Zoom module and API functions such as zoomIn and zoomOut.

Full screen control: Enables toggling between full screen and normal view modes using the ol/control/FullScreen module and API function toggle.

Scale line control: Displays a graphical representation of the scale of a map using the ol/control/ScaleLine module and API function getUnits to obtain the current units used.

Attribution control: Shows information about the data sources used in a map using the ol/control/Attribution module and API function getAttributions to get current attribution information.

Mouse position control: Displays the current mouse position on a map in different coordinate systems using the ol/control/MousePosition module and API function coordinateFormat to set the format of the coordinates displayed.


An example about ZoomControl():

To add a zoom control to the map, we first import the ZoomControl module from the ol/control/Zoom path. We create a new instance of the ZoomControl and add it to the controls array of the map. This allows us to interact with the zoom control and modify the zoom level of the map.
import ZoomControl from 'ol/control/Zoom';

const zoomControl = new ZoomControl();

const map = new Map({
target: 'map',
controls: [zoomControl],
view: new View({...}),
});
An example about ScaleLineControl():
import ScaleLineControl from 'ol/control/ScaleLine';

const scaleLineControl = new ScaleLineControl();

const map = new Map({
target: 'map',
controls: [zoomControl, scaleLineControl],
view: new View({...}),
});


Interact with the View component:

The view contains several proprieties that we set when we initialize our object Map.
The view component in OpenLayers is responsible for managing the current extent, resolution, rotation, and projection of the map.
When building a mapping application, it's important to be able to interact with the view to allow users to zoom, pan, and navigate the map.
However, managing the view can be tricky, especially when it comes to performance.

Dont use useState()

When interacting with the view component in OpenLayers, it's important to avoid using React state to modify the view's properties directly.
This is because updating the state can cause a re-render of the entire component tree, which can be slow and inefficient. Instead, it's recommended to use the OpenLayers API functions to interact with the view, such as setZoom, setCenter, setRotation ....

These functions allow you to modify the view's properties directly without triggering a re-render of the React components, which can improve performance and provide a better user experience.

Initializing the View():
// Import - Import for View
import View from 'ol/View.js';

  const map = new Map({
      layers: [
        new TileLayer({ source: new OSM() }),
      ],
      controls: [......],
      view: new View({
        center: [0, 0],
        zoom: 0,
        minZoom: 0,
        maxZoom: 28,
      }),
    })

Interact with the view:
 const zoom = (map: Map) => {
    console.log("zoom")
    const view = map.getView()
    const currentZoom = view.getZoom()
    const newZoom = currentZoom + 1;
    view.setZoom(newZoom)
  }
 const increaseResolution = (map: Map) => {
    const view = map.getView();
    const currentResolution = view.getResolution();
    const newResolution = currentResolution / 2;
    view.setResolution(newResolution);
  };
Looking at the previous snippets you can notice how we interact with the View using openLayers integrated functions.

It's also important to understand the difference between zoom and resolution when working with the view.

Zoom refers to the scaling of the map, which changes the level of detail displayed. When you zoom  in, you're making the map larger, which means you can see more detail  but over a smaller area. Conversely, when you zoom out, you're making   the map smaller, which means you can see less detail but over a larger area.

Resolution, on the other hand, refers to the level of detail in a map's features and how accurately they are represented. A higher resolution means more detail and a more accurate representation of the map's features. For example, a resolution of 10 meters per pixel will display more detail than a resolution of 100 meters per pixel.

