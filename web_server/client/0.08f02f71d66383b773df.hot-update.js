webpackHotUpdate(0,{

/***/ "./src/NewsPanel/NewsPanel.js":
/*!************************************!*\
  !*** ./src/NewsPanel/NewsPanel.js ***!
  \************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NewsPanel_css__ = __webpack_require__(/*! ./NewsPanel.css */ "./src/NewsPanel/NewsPanel.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NewsPanel_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__NewsPanel_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__NewsCard_NewsCard__ = __webpack_require__(/*! ../NewsCard/NewsCard */ "./src/NewsCard/NewsCard.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Auth_Auth__ = __webpack_require__(/*! ../Auth/Auth */ "./src/Auth/Auth.js");
var _jsxFileName = '/home/horis/Documents/News-Recommend-Project/web_server/client/src/NewsPanel/NewsPanel.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var NewsPanel = function (_React$Component) {
  _inherits(NewsPanel, _React$Component);

  function NewsPanel() {
    _classCallCheck(this, NewsPanel);

    var _this = _possibleConstructorReturn(this, (NewsPanel.__proto__ || Object.getPrototypeOf(NewsPanel)).call(this));

    _this.state = { news: null, pageNum: 1, totalPages: 1, loadedAll: false };
    return _this;
  }

  _createClass(NewsPanel, [{
    key: 'handleScroll',
    value: function handleScroll() {
      var scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollYTop;
      if (window.innerHeight + scrollY >= document.body.offsetHeight - 50) {
        this.loadMoreNews();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.loadMoreNews();
      this.loadMoreNews = __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.debounce(this.loadMoreNews, 1000);
      window.addEventListener('scroll', function () {
        return _this2.handleScroll();
      });
    }
  }, {
    key: 'loadMoreNews',
    value: function loadMoreNews() {
      var _this3 = this;

      if (this.state.loadedAll === true) {
        return;
      }
      var url = 'http://' + window.location.hostname + ':3000' + '/news';
      var request = new Request(encodeURI(url), {
        method: 'GET',
        headers: {
          'Authorization': 'bearer ' + __WEBPACK_IMPORTED_MODULE_4__Auth_Auth__["a" /* default */].getToken()
        }
      });

      fetch(request).then(function (res) {
        return res.json();
      }).then(function (news) {
        if (!news || news.length === 0) {
          _this3.setState({ loadedAll: true });
        }
        _this3.setState({
          news: _this3.state.news ? _this3.state.news.concat(news) : news,
          pageNum: _this3.state.pageNum + 1
        });
      });
    }
  }, {
    key: 'renderNews',
    value: function renderNews() {
      var _this4 = this;

      var news_list = this.state.news.map(function (news) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'a',
          { className: 'list-group-item', key: news.digest, __source: {
              fileName: _jsxFileName,
              lineNumber: 59
            },
            __self: _this4
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__NewsCard_NewsCard__["a" /* default */], { news: news, __source: {
              fileName: _jsxFileName,
              lineNumber: 60
            },
            __self: _this4
          })
        );
      });

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'container-fluid', __source: {
            fileName: _jsxFileName,
            lineNumber: 66
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'list-group', __source: {
              fileName: _jsxFileName,
              lineNumber: 67
            },
            __self: this
          },
          news_list
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.news) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 77
            },
            __self: this
          },
          this.renderNews()
        );
      } else {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 83
            },
            __self: this
          },
          'Loading...'
        );
      }
    }
  }]);

  return NewsPanel;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (NewsPanel);

/***/ })

})
//# sourceMappingURL=0.08f02f71d66383b773df.hot-update.js.map