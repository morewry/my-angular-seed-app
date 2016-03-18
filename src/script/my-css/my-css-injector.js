angular.module("my-css")

  .factory("CSSStyleInjector", ["$templateCache", function ($templateCache) {

    function findStyles (component) {
      return document.querySelector(`style[title=${component}`);
    }

    function stylesPresent (component) {
      return !!findStyles(component);
    }

    function stylesMissing (component) {
      return !stylesPresent(component);
    }

    function getNewStyleElement (component) {
      var style;
      style = document.createElement("style")
      style.type = "text/css";
      style.title = component;
      return style;
    }

    function addRulesToElement (element, rules) {
      rules = document.createTextNode(rules);
      return element.appendChild(rules);
    }

    function addStylesToDocument (element) {
      return document.querySelector("head").appendChild(element);
    }

    function addStyles (component, rules) {
      var element;
      element = getNewStyleElement(component);
      addRulesToElement(element, rules);
      addStylesToDocument(element);
    }

    function removeStyles (component) {
      var element;
      element = findStyles(component);
      return element.parentNode.removeChild(element);
    }

    class CSSStyleInjector {

      fetch (component, variant) {
        if (variant) {
          return $templateCache.get(`_${component}-${variant}.css`);
        }
        else {
          return $templateCache.get(`_${component}.css`);
        }
      }

      add (component, variant) {
        if(stylesMissing(component)) {
          var rules;
          rules = this.fetch(component, variant);
          addStyles(component, rules);
        }
      }

      remove (component) {
        if(stylesPresent(component)) {
          removeStyles(component);
        }
      }

      toggle (component, toggle, aVariant, bVariant) {

      }

    }

    return new CSSStyleInjector;

  }]);
