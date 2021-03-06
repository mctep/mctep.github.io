(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("TreeShaker"), require("TreeShakerTheme"), require("_"), require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define(["TreeShaker", "TreeShakerTheme", "_", "jQuery"], factory);
	else if(typeof exports === 'object')
		exports["TreeShakerExample"] = factory(require("TreeShaker"), require("TreeShakerTheme"), require("_"), require("jQuery"));
	else
		root["TreeShakerExample"] = factory(root["TreeShaker"], root["TreeShakerTheme"], root["_"], root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ },
/* 1 */
/***/ function(module, exports) {

"use strict";
'use strict';

var PARENT_CHANCE = 0.8;
var CHILD_CHANCE = 0.8;

var FIRST_NAMES = ['Lorretta', 'Kori', 'Jannie', 'Katherin', 'Theresia', 'Neoma', 'Fanny', 'Sally', 'Nestor', 'Cari', 'Myron', 'Isiah', 'Mellisa', 'Jonnie', 'Delores', 'Fritz', 'Maricruz', 'Heike', 'Mabelle', 'Haydee', 'Ryann', 'Iraida', 'Dani', 'Florrie', 'Tegan', 'Roselle', 'Eddy', 'Jacinta', 'Caitlyn', 'Donya'];

var LAST_NAMES = ['Twanda', 'Synthia', 'Octavia', 'Cinthia', 'Willene', 'Martine', 'Cassidy', 'Palmira', 'Cody', 'Kyle', 'Lilliam', 'Renee', 'Candy', 'Will', 'Marcelo', 'Lenora', 'Celsa', 'Glen', 'Johnnie', 'Nannette'];

function randomBoolean(chance) {
	return Math.random() <= chance;
}

function randomItem(array) {
	var index = Math.floor(Math.random() * array.length);

	return array[index];
}

function randomTitle() {
	return randomItem(FIRST_NAMES) + ' ' + randomItem(LAST_NAMES);
}

module.exports = function generateRandomNodes(count) {
	var step = count;
	var parentIds = [];
	var result = [];

	function makeChild(node) {
		var isChild = randomBoolean(CHILD_CHANCE);

		if (isChild) {
			node.parentId = randomItem(parentIds) || null;
		}
	}

	function makeParent(node) {
		var isParent = randomBoolean(PARENT_CHANCE);

		if (isParent) {
			parentIds.push(node.id);
		}
	}

	while (step) {
		var node = {
			id: '' + step,
			name: randomTitle()
		};

		makeChild(node);
		makeParent(node);

		result.push(node);
		step -= 1;
	}

	return result;
};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _ = __webpack_require__(8);
var $ = __webpack_require__(0);
var DATA_URI = __webpack_require__(7);

function parseData(data) {
	var result = [];
	var length = data.project.length;

	for (var idx = 0; idx < length; idx += 1) {
		var node = data.project[idx];
		var id = node.id,
		    parentProject = node.parentProject;


		if (id !== '_Root') {
			var parentId = parentProject && parentProject.id !== '_Root' && parentProject.id || null;

			result.push(_.assign({}, node, { id: id, parentId: parentId }));
		}
	}

	return result;
}

module.exports = function getTeamcityProjects(callback) {
	$.ajax(DATA_URI).done(function (data) {
		callback(parseData(data));
	});
};

/***/ },
/* 3 */
/***/ function(module, exports) {

"use strict";
'use strict';

/* eslint-env browser */

function checkStorage(storage) {
	if (typeof storage === 'undefined') {
		return false;
	}

	try {
		storage.setItem('storage', '');
		storage.getItem('storage');
		storage.removeItem('storage');

		return true;
	} catch (err) {
		return false;
	}
}

var storage = null;

if (checkStorage(window.sessionStorage)) {
	storage = window.sessionStorage;
} else if (checkStorage(window.localStorage)) {
	storage = window.localStorage;
} else {
	(function () {
		var data = {};

		storage = {
			clear: function clear() {
				data = {};
				Storage.length = 0;
			},
			getItem: function getItem(key) {
				return data[key];
			},
			removeItem: function removeItem(key) {
				delete data[key];
			},
			setItem: function setItem(key, value) {
				data[key] = String(value);
			}
		};
	})();
}

module.exports = storage;

/***/ },
/* 4 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4a8790616e6905d42001a3fe89ee45a5.json";

/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var $ = __webpack_require__(0);
var getTeamcityProjects = __webpack_require__(2);
var generateRandomNodes = __webpack_require__(1);
var storage = __webpack_require__(3);
var TreeShaker = __webpack_require__(5);

var _require = __webpack_require__(6),
    classNames = _require.classNames,
    templates = _require.templates,
    optionHeight = _require.optionHeight;

__webpack_require__(4); // eslint-disable-line import/no-unassigned-import

var treeShaker = new TreeShaker({ classNames: classNames, optionHeight: optionHeight, templates: templates });

$('#tree-shaker').append(treeShaker.$element);
treeShaker.updateHeight();
loadTeamcityNodes();

$('.example-button-teamcity').click(loadTeamcityNodes);

// load random nodes
$('.example-button-have-fun').click(function () {
	var value = $('.example-input-count').val();
	var count = parseInt(value.replace(/K/g, '000'), 10);

	if (count > 0) {
		treeShaker.offChosenNodesChange();
		treeShaker.setNodes(generateRandomNodes(count));
		treeShaker.refresh();
	}
});

function getStoredChosenNodes() {
	try {
		return JSON.parse(storage.getItem('chosen-nodes'));
	} catch (err) {
		return null;
	}
}

function loadTeamcityNodes() {
	var storedChosenNodes = getStoredChosenNodes();

	getTeamcityProjects(function (nodes) {
		treeShaker.setNodes(nodes);
		if (storedChosenNodes) {
			treeShaker.setChosenNodes(storedChosenNodes);
		}

		treeShaker.onChosenNodesChange(function (chosenNodes) {
			storage.setItem('chosen-nodes', JSON.stringify(chosenNodes));
		});

		treeShaker.refresh();
	});
}

/***/ }
/******/ ]);
});