"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _icons = require("@ant-design/icons");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ImageUpload = function ImageUpload(props) {
  var onChange = props.onChange,
      checkSize = props.checkSize,
      _props$value = props.value,
      value = _props$value === void 0 ? [] : _props$value,
      max = props.max,
      listType = props.listType,
      custUploadButton = props.custUploadButton,
      renderCustItemoOperate = props.renderCustItemoOperate,
      customizeAction = props.customizeAction,
      onUploadSuccess = props.onUploadSuccess,
      onRemoveSuccess = props.onRemoveSuccess,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled; // 上传文件改变时的状态（上传中、完成、失败都会调用这个函数）

  var onChangeImage = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
      var _file$response, _file$response2;

      var file, fileList;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              file = _ref.file, fileList = _ref.fileList;

              if (!(file.status === 'removed')) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              // 接口有变动，请求status === 200并不一定上传成功，response.code === 500时为上传失败
              if (file.status === 'error' || (file === null || file === void 0 ? void 0 : (_file$response = file.response) === null || _file$response === void 0 ? void 0 : _file$response.code) === '500') {
                _antd.message.error("".concat(file.name, "\u4E0A\u4F20\u5931\u8D25"));
              } // 上传图片成功回调


              if (file.status === 'done' || (file === null || file === void 0 ? void 0 : (_file$response2 = file.response) === null || _file$response2 === void 0 ? void 0 : _file$response2.code) === '200') {
                onUploadSuccess && onUploadSuccess((0, _utils.getValueFromEventImg)(fileList));
              }

              onChange && onChange(_toConsumableArray(fileList).map(function (item) {
                var _item$response;

                // 接口有变动，请求status === 200并不一定上传成功，response.code === 500时为上传失败
                if (((_item$response = item.response) === null || _item$response === void 0 ? void 0 : _item$response.code) === '500') {
                  return _objectSpread(_objectSpread({}, item), {}, {
                    status: 'error'
                  });
                }

                return item;
              }));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function onChangeImage(_x) {
      return _ref2.apply(this, arguments);
    };
  }(); // 点击移除文件时的回调，返回值为 false 时不移除。支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不移除


  var onRemove = function onRemove(file) {
    var files = value.filter(function (v) {
      return v.key !== file.key || v.url !== file.url;
    });
    onRemoveSuccess && onRemoveSuccess(files);
    onChange && onChange(files);
  }; // 上传文件之前的钩子，参数为上传的文件


  var beforeUpload = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(file) {
      var _file$name, _file$name2, _file$name3, _file$name4;

      var isCheck, enIndex, fileName;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(typeof checkSize === 'function')) {
                _context2.next = 6;
                break;
              }

              _context2.next = 3;
              return checkSize(file);

            case 3:
              isCheck = _context2.sent;

              if (isCheck) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", _antd.Upload.LIST_IGNORE);

            case 6:
              enIndex = ((_file$name = file.name) === null || _file$name === void 0 ? void 0 : _file$name.lastIndexOf('.')) === -1 ? (_file$name2 = file.name) === null || _file$name2 === void 0 ? void 0 : _file$name2.length : (_file$name3 = file.name) === null || _file$name3 === void 0 ? void 0 : _file$name3.lastIndexOf('.');
              fileName = (_file$name4 = file.name) === null || _file$name4 === void 0 ? void 0 : _file$name4.substring(0, enIndex);

              if (/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/g.test(fileName)) {
                _context2.next = 11;
                break;
              }

              _antd.message.error('上传失败，图片名称只能含有汉字，数字，字母，下划线');

              return _context2.abrupt("return", _antd.Upload.LIST_IGNORE);

            case 11:
              return _context2.abrupt("return", file);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function beforeUpload(_x2) {
      return _ref3.apply(this, arguments);
    };
  }(); // 上传按钮


  var uploadButton = custUploadButton || /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_icons.PlusOutlined, null), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      marginTop: 8
    }
  }, "\u4E0A\u4F20\u56FE\u7247"));

  var currentProps = (0, _utils.omit)(['onChange', 'checkSize', 'value', 'max', 'custUploadButton', 'renderCustItemoOperate', 'customizeAction'], props);
  return /*#__PURE__*/_react["default"].createElement(_antd.Upload, _extends({
    accept: ".jpg, .jpeg, .png",
    itemRender: function itemRender(originNode, file, _, actions) {
      return /*#__PURE__*/_react["default"].createElement("div", null, // 图片上传完成后 && 上传类型为picture-card，显示Image预览
      file.status === 'done' && listType === 'picture-card' ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "uploadImages"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Image, {
        key: file.url,
        placeholder: true,
        src: file.url,
        preview: {
          mask: /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_icons.EyeOutlined, {
            style: {
              marginRight: 10,
              fontSize: 16
            }
          }), !disabled && /*#__PURE__*/_react["default"].createElement(_icons.DeleteOutlined, {
            style: {
              fontSize: 16
            },
            onClick: function onClick(e) {
              e.stopPropagation(); // 删除当前图片

              actions.remove();
            }
          }))
        }
      })) : originNode, // 渲染自定义每项额外的操作
      renderCustItemoOperate && file.status === 'done' ? /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'center'
        }
      }, renderCustItemoOperate(file)) : null);
    }
  }, currentProps, {
    fileList: value.map(function (item) {
      var url = item.url;

      if (!(0, _utils.isUrl)(url)) {
        url = _utils.imageError;
      }

      return _objectSpread(_objectSpread({
        status: 'done',
        uid: item.url
      }, item), {}, {
        url: url
      });
    }),
    action: customizeAction || '/erp/comm/upload',
    name: "uploadFileInput",
    onRemove: onRemove,
    beforeUpload: beforeUpload,
    onChange: onChangeImage
  }), max && value.length >= max ? null : uploadButton);
};

var _default = ImageUpload;
exports["default"] = _default;