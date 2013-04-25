GA.Collections.FavGists = Backbone.Collection.extend({
  url: "/favorites",
  model: GA.Models.Gist
});