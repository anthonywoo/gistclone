GA.Views.GistDetailView = Backbone.View.extend({
  initialize: function(args) {
    this.fav = args.favs.get(args.model.id);
    this.favs = args.favs;
  },

  events: {
    "click #favorite-btn": "favoriteGist"
  },

  render: function() {
    var rendered = JST["gists/detail"]({
      gist: this.model,
      isFav: this.fav
    });
    this.$el.html(rendered);
    return this;
  },

  favoriteGist: function(event) {
    var addFav = function() {
      $.post(
        "/gists/" + this.model.id + "/favorites.json"
      ).done(function(e){
        this.favs.add(this.model);
      }.bind(this));
    }.bind(this);

    var rmFav = function() {
      $.ajax({
        url: "/gists/" + this.model.id + "/favorites.json",
        method: "delete"
      }).done(function(){
        this.favs.remove(this.model);
      }.bind(this));
    }.bind(this);

    if (this.fav) {
      rmFav();
      $(event.target).html("Favorite");
      this.fav = false;
    } else {
      addFav();
      $(event.target).html("Unfavorite");
      this.fav = true;
    }
  }
});