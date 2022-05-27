(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['pot'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<article class=\"pot\">\r\n  <div class=\"pot-icon\">\r\n    <i class=\"fas fa-star\"></i>\r\n  </div>\r\n  <div class=\"pot-content\">\r\n    <p class=\"pot-host\">\r\n      "
    + alias4(((helper = (helper = lookupProperty(helpers,"hostname") || (depth0 != null ? lookupProperty(depth0,"hostname") : depth0))
    != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hostname","hash":{},"data":data,"loc":{"start":{"line":7,"column":6},"end":{"line":7,"column":14}}}) : helper)))
    + "\r\n    </p>\r\n    <p class=\"pot-port\">\r\n      "
    + alias4(((helper = (helper = lookupProperty(helpers,"port") || (depth0 != null ? lookupProperty(depth0,"port") : depth0))
    != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"port","hash":{},"data":data,"loc":{"start":{"line":10,"column":18},"end":{"line":10,"column":28}}}) : helper)))
    + "\r\n    </p>\r\n    <p class=\"pot-img\">\r\n      "
    + alias4(((helper = (helper = lookupProperty(helpers,"img") || (depth0 != null ? lookupProperty(depth0,"img") : depth0))
    != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img","hash":{},"data":data,"loc":{"start":{"line":13,"column":30},"end":{"line":13,"column":52}}}) : helper)))

    + "</a>\r\n    </p>\r\n  </div>\r\n</article>\r\n";
},"useData":true});
})();
