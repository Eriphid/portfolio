/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/constants.ts":
/*!*****************************!*\
  !*** ./client/constants.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.ROUTER_TYPE = \"BrowserRouter\";\r\n\n\n//# sourceURL=webpack:///./client/constants.ts?");

/***/ }),

/***/ "./client/src/canvas/index.ts":
/*!************************************!*\
  !*** ./client/src/canvas/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst THREE = __importStar(__webpack_require__(/*! three */ \"three\"));\r\nconst scene = new THREE.Scene();\r\nconst renderer = new THREE.WebGLRenderer();\r\nconst camera = new THREE.PerspectiveCamera();\r\nfunction resize() {\r\n    renderer.setSize(window.innerWidth, window.innerHeight);\r\n}\r\nfunction loop(_timestamp) {\r\n    renderer.render(scene, camera);\r\n    requestAnimationFrame(loop);\r\n}\r\nfunction configure(scene) {\r\n    scene.background = new THREE.Color(0.015, 0.015, 0.08);\r\n}\r\nfunction initialize(container = document.getElementById(\"main-canvas\") || document.body) {\r\n    configure(scene);\r\n    container.appendChild(renderer.domElement);\r\n    window.addEventListener(\"resize\", resize);\r\n    resize();\r\n    loop(performance.now());\r\n}\r\nexports.initialize = initialize;\r\nexports.default = {\r\n    initialize\r\n};\r\n\n\n//# sourceURL=webpack:///./client/src/canvas/index.ts?");

/***/ }),

/***/ "./client/src/main.ts":
/*!****************************!*\
  !*** ./client/src/main.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst router_1 = __webpack_require__(/*! @shared/components/router */ \"./shared/components/router.tsx\");\r\nconst react_dom_1 = __importDefault(__webpack_require__(/*! react-dom */ \"react-dom\"));\r\nreact_dom_1.default.hydrate(router_1.Router(), document.body);\r\n\n\n//# sourceURL=webpack:///./client/src/main.ts?");

/***/ }),

/***/ "./shared/components/body.tsx":
/*!************************************!*\
  !*** ./shared/components/body.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst react_1 = __importDefault(__webpack_require__(/*! react */ \"react\"));\r\nfunction Body(props = {}) {\r\n    return (react_1.default.createElement(react_1.default.Fragment, null,\r\n        react_1.default.createElement(\"main\", null, props.children)));\r\n}\r\nexports.Body = Body;\r\n\n\n//# sourceURL=webpack:///./shared/components/body.tsx?");

/***/ }),

/***/ "./shared/components/home.tsx":
/*!************************************!*\
  !*** ./shared/components/home.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst react_1 = __importDefault(__webpack_require__(/*! react */ \"react\"));\r\nconst body_1 = __webpack_require__(/*! ./body */ \"./shared/components/body.tsx\");\r\nclass Home extends react_1.default.Component {\r\n    constructor() {\r\n        super(...arguments);\r\n        this.ref = react_1.default.createRef();\r\n    }\r\n    componentDidMount() {\r\n        Promise.resolve().then(() => __importStar(__webpack_require__(/*! @client/src/canvas */ \"./client/src/canvas/index.ts\"))).then(module => {\r\n            module.initialize(this.ref.current || undefined);\r\n        });\r\n    }\r\n    render() {\r\n        return (react_1.default.createElement(body_1.Body, null,\r\n            react_1.default.createElement(\"div\", { id: \"main-canvas\" })));\r\n    }\r\n}\r\nexports.Home = Home;\r\n\n\n//# sourceURL=webpack:///./shared/components/home.tsx?");

/***/ }),

/***/ "./shared/components/router.tsx":
/*!**************************************!*\
  !*** ./shared/components/router.tsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst react_1 = __importDefault(__webpack_require__(/*! react */ \"react\"));\r\nconst _constants_1 = __webpack_require__(/*! @constants */ \"./client/constants.ts\");\r\nconst ReactRouterDOM = __importStar(__webpack_require__(/*! react-router-dom */ \"react-router-dom\"));\r\nconst routes_1 = __webpack_require__(/*! @shared/routes */ \"./shared/routes.ts\");\r\nconst routes = routes_1.Routes.map(route => (react_1.default.createElement(ReactRouterDOM.Route, {\r\n    path: route.path,\r\n    exact: route.exact,\r\n    component: route.component,\r\n    key: route.path\r\n})));\r\nconst ReactRouter = ReactRouterDOM[_constants_1.ROUTER_TYPE];\r\nfunction Router(props = {}) {\r\n    return (react_1.default.createElement(ReactRouter, { location: props.location }, routes));\r\n}\r\nexports.Router = Router;\r\n\n\n//# sourceURL=webpack:///./shared/components/router.tsx?");

/***/ }),

/***/ "./shared/routes.ts":
/*!**************************!*\
  !*** ./shared/routes.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst home_1 = __webpack_require__(/*! @shared/components/home */ \"./shared/components/home.tsx\");\r\nexports.Routes = [\r\n    {\r\n        title: \"Home\",\r\n        path: \"/\",\r\n        component: home_1.Home\r\n    }\r\n];\r\n\n\n//# sourceURL=webpack:///./shared/routes.ts?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = React;\n\n//# sourceURL=webpack:///external_%22React%22?");

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = ReactDOM;\n\n//# sourceURL=webpack:///external_%22ReactDOM%22?");

/***/ }),

/***/ "react-router-dom":
/*!*********************************!*\
  !*** external "ReactRouterDOM" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = ReactRouterDOM;\n\n//# sourceURL=webpack:///external_%22ReactRouterDOM%22?");

/***/ }),

/***/ "three":
/*!************************!*\
  !*** external "THREE" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = THREE;\n\n//# sourceURL=webpack:///external_%22THREE%22?");

/***/ })

/******/ });