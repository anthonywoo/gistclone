GA.Views.GistNewView = Backbone.View.extend({
  initialize: function() {
    this.gistFiles = 0;

  },

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
    this.$el.find("#gist-files").append('\
    <span>\
    <label>Body:\
    <input class="gist-input" type="text" \
    name="gist[gist_files_attributes][' + (this.gistFiles++) + '][body]"\
    class="gist-body">\
    </label>\
    <a class="body-delete-btn btn btn-mini">delete</a>\
    <br>\
    </span>');
  },

  addBody: function(event) {
    event.preventDefault();
    this.addBodyToEl();
  },

  deleteBody: function(event) {
    event.preventDefault();
    console.log(event.target);
    $(event.target).parent().remove();
  },

  createGist: function(event) {
    event.preventDefault();
    var gist = {};
    $(".gist-input").each(function(i, el) {
      var $el = $(el);
      if ($el.val().length > 0) {
        gist[$el.attr('name')] = $el.val();
      }
    });
    var selected = [];
    _(this.tagSelect.selected).each(function(tag){
      selected.push(tag.id);
    });
    gist["gist[tag_ids][]"] = selected;
    console.log(gist);
    $.post(
      "/gists",
      gist,
      function(data){
        this.collection.add(new GA.Models.Gist(data, {parse: true}));
        this.render();
        this.gistFiles = 0;
      }.bind(this));
  }
})