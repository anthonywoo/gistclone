window.GA = {
  Views: {},
  Models: {},
  Routers: {},
  Collections: {},
  Widgets: {},
  Store: {},

  initialize: function($list, $new, gistsJSON, tagsJSON) {
    var gists = new GA.Collections.Gists(gistsJSON, {parse: true});
    var favs = new GA.Collections.FavGists();
    favs.fetch();
    GA.Store.Favorites = favs;
    //GA.Store.Tags = new GA.Collections.Tags(tagsJSON);
    GA.Store.Tags = new GA.Collections.Tags();
    GA.Store.Tags.fetch();
    new GA.Routers.GistRouter($list, $new, gists, favs);
    Backbone.history.start();
  }
};