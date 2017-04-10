"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

jest.disableAutomock().useRealTimers();

var React = require("react");
var ReactFlipMotion = require("..").default;
var TransitionMotion = require("react-motion").TransitionMotion;
var TestUtils = require("react-addons-test-utils");

describe("ReactFlipMotion", function () {

  beforeEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
  });

  it("should not error", function () {
    expect(function () {
      return TestUtils.renderIntoDocument(React.createElement(
        ReactFlipMotion,
        null,
        React.createElement("div", { key: 1 }),
        React.createElement("div", { key: 2 })
      ));
    }).not.toThrow();
  });

  it("should render children", function () {
    var View = function (_React$Component) {
      _inherits(View, _React$Component);

      function View() {
        _classCallCheck(this, View);

        return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).apply(this, arguments));
      }

      _createClass(View, [{
        key: "render",
        value: function render() {
          return React.createElement("div", this.props);
        }
      }]);

      return View;
    }(React.Component);

    var TestComponent = function (_React$Component2) {
      _inherits(TestComponent, _React$Component2);

      function TestComponent(props) {
        _classCallCheck(this, TestComponent);

        var _this2 = _possibleConstructorReturn(this, (TestComponent.__proto__ || Object.getPrototypeOf(TestComponent)).call(this, props));

        _this2.state = {
          list: [{ id: "0", text: "foo" }, { id: "1", text: "bar" }]
        };
        return _this2;
      }

      _createClass(TestComponent, [{
        key: "render",
        value: function render() {
          return React.createElement(
            ReactFlipMotion,
            null,
            this.state.list.map(function (item) {
              return React.createElement(
                View,
                { style: { height: 10, fontSize: 10 }, key: item.id },
                item.text
              );
            })
          );
        }
      }]);

      return TestComponent;
    }(React.Component);

    var testComponent = TestUtils.renderIntoDocument(React.createElement(TestComponent, null));

    var flipMotion = TestUtils.findRenderedComponentWithType(testComponent, ReactFlipMotion);
    var reactMotion = TestUtils.findRenderedComponentWithType(flipMotion, TransitionMotion);
    var elements = TestUtils.scryRenderedComponentsWithType(reactMotion, View);
    expect(elements.length).toBe(2);
  });

  it("should transition between states", function () {
    var View = function (_React$Component3) {
      _inherits(View, _React$Component3);

      function View() {
        _classCallCheck(this, View);

        return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).apply(this, arguments));
      }

      _createClass(View, [{
        key: "render",
        value: function render() {
          return React.createElement("div", this.props);
        }
      }]);

      return View;
    }(React.Component);

    var TestComponent = function (_React$Component4) {
      _inherits(TestComponent, _React$Component4);

      function TestComponent(props) {
        _classCallCheck(this, TestComponent);

        var _this4 = _possibleConstructorReturn(this, (TestComponent.__proto__ || Object.getPrototypeOf(TestComponent)).call(this, props));

        _this4.state = {
          list: [{ id: "0", text: "foo" }, { id: "1", text: "bar" }]
        };
        return _this4;
      }

      _createClass(TestComponent, [{
        key: "render",
        value: function render() {
          return React.createElement(
            ReactFlipMotion,
            null,
            this.state.list.map(function (item) {
              return React.createElement(
                View,
                { style: { height: 10, fontSize: 10 }, key: item.id },
                item.text
              );
            })
          );
        }
      }]);

      return TestComponent;
    }(React.Component);

    var testComponent = TestUtils.renderIntoDocument(React.createElement(TestComponent, null));

    var flipMotion = TestUtils.findRenderedComponentWithType(testComponent, ReactFlipMotion);
    var reactMotion = TestUtils.findRenderedComponentWithType(flipMotion, TransitionMotion);
    var elements = TestUtils.scryRenderedComponentsWithType(reactMotion, View);
    expect(elements.length).toBe(2);
    expect(elements[0].props.children).toBe("foo");
    expect(elements[1].props.children).toBe("bar");

    testComponent.setState({
      list: testComponent.state.list.concat().reverse()
    });

    return new Promise(function (done) {
      setTimeout(function () {
        var flipMotion = TestUtils.findRenderedComponentWithType(testComponent, ReactFlipMotion);
        var reactMotion = TestUtils.findRenderedComponentWithType(flipMotion, TransitionMotion);
        var elements = TestUtils.scryRenderedComponentsWithType(reactMotion, View);
        expect(elements.length).toBe(2);
        expect(elements[0].props.children).toBe("bar");
        expect(elements[1].props.children).toBe("foo");
        done();
      }, 50);
    });
  });
});