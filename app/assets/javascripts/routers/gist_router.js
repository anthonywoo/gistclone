GA.Routers.GistRouter = Backbone.Router.extend({
  initialize: function($list, $new, gists, favs) {
    this.$list = $list;
    this.$new = $new;
    this.gists = gists;
    this.favs = favs;
  },

  routes: {
    "": "redirectToGists",
    "gists": "listGists",
    "favorites": "favGists",
    "gists/:id": "detailGist"
  },

  listGists: function() {
    var view = new GA.Views.GistListView({
      collection: this.gists
    });
    this.$list.html(view.render().$el);
    view = new GA.Views.GistNewView({
      collection: this.gists
    });
    this.$new.html(view.render().$el);
  },

  detailGist: function(id) {
    var gist = this.gists.get(id);
    var view = new GA.Views.GistDetailView({
      model: gist,
      favs: this.favs
    });
    this.$new.html("");
    this.$list.html(view.render().$el);
  },

  favGists: function() {
    var view = new GA.Views.GistListView({
      collection: this.favs
    });
    this.$list.html(view.render().$el);
    this.$new.html("");
  },

  redirectToGists: function() {
    Backbone.history.navigate("#/gists");
  }

});