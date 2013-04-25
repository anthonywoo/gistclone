GA.Collections.GistFiles = Backbone.Collection.extend({
  model: GA.Models.GistFile
});

GA.Models.Gist = Backbone.Model.extend({
  url: "/gists",
  model: {
    gist_files: GA.Collections.GistFiles
  },
  parse: function(response) {
    for(var key in this.model)
    {
        var embeddedClass = this.model[key];
        var embeddedData = response[key];
        response[key] = new embeddedClass(embeddedData, {parse:true});
    }
    return response;
  }
});