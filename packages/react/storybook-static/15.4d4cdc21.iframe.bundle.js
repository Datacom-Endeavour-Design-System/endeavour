(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"../stencil/dist/esm/datacom-button_2.entry.js":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"datacom_button",(function(){return DatacomButton})),__webpack_require__.d(__webpack_exports__,"datacom_checkbox",(function(){return DatacomCheckbox}));__webpack_require__("../../node_modules/core-js/modules/es.object.define-property.js");var _index_9b32a41d_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../stencil/dist/esm/index-9b32a41d.js");function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Object.defineProperty(Constructor,"prototype",{writable:!1}),Constructor}var DatacomButton=function(){function DatacomButton(hostRef){_classCallCheck(this,DatacomButton),Object(_index_9b32a41d_js__WEBPACK_IMPORTED_MODULE_1__.f)(this,hostRef),this.disabled=!1}return _createClass(DatacomButton,[{key:"render",value:function render(){return Object(_index_9b32a41d_js__WEBPACK_IMPORTED_MODULE_1__.d)(_index_9b32a41d_js__WEBPACK_IMPORTED_MODULE_1__.a,null,Object(_index_9b32a41d_js__WEBPACK_IMPORTED_MODULE_1__.d)("button",{disabled:this.disabled},this.text))}}]),DatacomButton}();DatacomButton.style="button{display:block;height:48px;line-height:24px;background-color:var(--dc-button-background-enabled);border:none;color:var(--dc-button-text);font-weight:600;font-size:var(--dc-button-font-size);font-family:var(--dc-primary-font);padding:12px 24px;border-radius:8px}button:hover{background-color:var(--dc-button-background-hover)}button:disabled{background-color:var(--dc-button-background-disabled)}button:focus{outline:3px solid var(--dc-button-background-enabled);outline-offset:1px}";var DatacomCheckbox=function(){function DatacomCheckbox(hostRef){var _this=this;_classCallCheck(this,DatacomCheckbox),Object(_index_9b32a41d_js__WEBPACK_IMPORTED_MODULE_1__.f)(this,hostRef),this.toggle=Object(_index_9b32a41d_js__WEBPACK_IMPORTED_MODULE_1__.c)(this,"toggle",7),this.checked=!1,this.handleChange=function(){_this.checked=!_this.checked,_this.toggle.emit(_this.checked)}}return _createClass(DatacomCheckbox,[{key:"render",value:function render(){return Object(_index_9b32a41d_js__WEBPACK_IMPORTED_MODULE_1__.d)(_index_9b32a41d_js__WEBPACK_IMPORTED_MODULE_1__.a,null,Object(_index_9b32a41d_js__WEBPACK_IMPORTED_MODULE_1__.d)("span",null,Object(_index_9b32a41d_js__WEBPACK_IMPORTED_MODULE_1__.d)("label",{htmlFor:"checkbox"},this.label),Object(_index_9b32a41d_js__WEBPACK_IMPORTED_MODULE_1__.d)("input",{name:"checkbox",type:"checkbox",checked:this.checked,onChange:this.handleChange})))}}]),DatacomCheckbox}();DatacomCheckbox.style="span{display:flex;flex-direction:row;justify-content:flex-start;align-items:center}"}}]);