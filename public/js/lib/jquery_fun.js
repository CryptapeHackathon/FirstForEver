// add some helpful jquery plugins

// simple tpl function
// e.g: $._("I'm #{name}", {name: 'Rain'})
$._ = function(tpl, data, match) {
  while(match = /#{([^}]+)?}/g.exec(tpl)) {
    tpl = tpl.replace(match[0], data[match[1]]);
  }
  return tpl;
};


// var queryParams = $.getQueryParameters();
jQuery.extend({

  getQueryParameters : function(str) {
    return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
  }

});