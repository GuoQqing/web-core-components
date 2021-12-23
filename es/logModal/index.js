var _excluded = ["bizId", "logType", "fetchAuthLogList"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * 操作日志Modal
 */
import React from 'react';
import { Modal } from 'antd';
import { connect } from 'dva';
import ProTable from '@ant-design/pro-table';

var LogModal = function LogModal(_ref) {
  var bizId = _ref.bizId,
      logType = _ref.logType,
      fetchAuthLogList = _ref.fetchAuthLogList,
      otherProps = _objectWithoutProperties(_ref, _excluded);

  var columns = [{
    dataIndex: 'operateDate',
    title: '时间',
    align: 'center',
    width: 120
  }, {
    dataIndex: 'operator',
    title: '操作人',
    align: 'center',
    width: 120
  }, {
    dataIndex: 'operateType',
    title: '操作类型',
    align: 'center',
    width: 120
  }, {
    dataIndex: 'content',
    title: '变更内容',
    align: 'center'
  }];
  return /*#__PURE__*/React.createElement(Modal, _extends({
    title: "\u64CD\u4F5C\u65E5\u5FD7",
    destroyOnClose: true,
    width: 820
  }, otherProps), /*#__PURE__*/React.createElement(ProTable, {
    rowKey: function rowKey(record) {
      return record.id;
    },
    search: false,
    columns: columns,
    toolBarRender: false,
    request: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetchAuthLogList({
                bizId: bizId,
                logType: logType
              });

            case 2:
              res = _context.sent;

              if (!res) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", {
                data: res.list,
                success: true,
                total: res.total
              });

            case 5:
              return _context.abrupt("return", {});

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))
  }));
};

var mapStateToProps = function mapStateToProps() {
  return {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    // 获取操作日志列表
    fetchAuthLogList: function fetchAuthLogList(payload) {
      return dispatch({
        type: 'common/fetchAuthLogList',
        payload: payload
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogModal);