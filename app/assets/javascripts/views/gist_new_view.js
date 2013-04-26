GA.Views.GistNewView = Backbone.View.extend({
  events: {
    "click #gist-submit": "createGist",
    "click .body-delete-btn": "deleteBody",
    "click .body-add-btn": "addBody"
  },

  render: function() {
    var content = JST["gists/new"]({gist: this.model});
    this.$el.html(content);
    for (var i = 0; i < 3; i++) {
      this.addBodyToEl();
    }
    this.tagSelect = new GA.Widgets.TextSearchSelect(
      this.$el.find("#gist-tags"), GA.Store.Tags);

    return this;
  },

  addBodyToEl: function() {
    this.$el.find("#gist-files").append(JST['gists/new-file']());
  },

  addBody: function(event) {
    event.preventDefault();
    this.addBodyToEl();
  },

  deleteBody: function(event) {
    event.preventDefault();
    $(event.target).parent().remove();
  },

  createGist: function(event) {
    event.preventDefault();
    var gist = new GA.Models.Gist(this.makeGistParams());
    gist.save();
    this.collection.add(gist);
    this.gistFiles = 0;
    this.render();
  },

  makeGistParams: function() {
    var gist = {};
    $(".gist-input").each(function(i, el) {
      var $el = $(el);
      if ($el.val().length > 0) {
        gist[$el.attr('name')] = $el.val();
      }
    });
    gist['gist_files'] = [];
    $(".gist-file-input").each(function(i, el) {
      var $el = $(el);
      if ($el.val().length > 0) {
        gist['gist_files'].push({ body: $el.val() });
      }
    });

    var selected = [];
    _(this.tagSelect.selected).each(function(tag){
      selected.push(tag);
    });
    gist.tags = selected;
    return gist;
  }
})