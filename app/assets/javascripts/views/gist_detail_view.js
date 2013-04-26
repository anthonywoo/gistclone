GA.Views.GistDetailView = Backbone.View.extend({
  events: {
    "click #favorite-btn": "favoriteGist",
    "click #delete-btn": "deleteGist",
    "dblclick .editable": "editField"
  },

  deleteTag: function(tag) {
    var tags = this.model.get('tags');
    tags.remove(tag);
    this.model.save(
      {gist: {tag_ids: this.model.toJSON()["tag_ids"]}},
      {patch: true}
    );
  },

  addTag: function(tag) {
    var tags = this.model.get('tags');
    tags.add(tag);
    this.model.save(
      {gist: {tag_ids: this.model.toJSON()["tag_ids"]}},
      {patch: true}
    );
  },

  doneEditField: function($el, input) {
    if ($el.attr('data-model') === 'Gist') {
      this.model.set('title', input);
      if (this.model.hasChanged())
        this.model.save(this.model.changed, {patch: true});
    } else if ($el.attr('data-model') === 'GistFile') {
      var id = $el.attr('data-id');
      var gistFile = this.model.get('gist_files').get(id);
      gistFile.set('body', input);
      if (gistFile.hasChanged())
        gistFile.save(gistFile.changed, {patch: true});
    }
  },

  finalizeEdit: function($el, input) {
    this.doneEditField($el, input);
    $el.html(input);
    clearInterval(this.interval);
  },

  editField: function(event) {
    var $input = $("<input type='text' value='" + $(event.target).text() + "' autofocus>");
    var that = this;
    $input.on('focus', function(){
      that.interval = setInterval(function(){
        that.doneEditField($(event.target), $input.val());
      }, 3000);
    });
    $input.on('blur', function(){
      that.finalizeEdit($(event.target), $input.val());
    });
    $input.on('keyup', function(e){
      if (e.keyCode == 13)
        that.finalizeEdit($(event.target), $input.val());
    });
    $(event.target).html($input)
  },

  render: function() {
    console.log(this.model)
    var rendered = JST["gists/detail"]({
      gist: this.model
    });
    this.$el.html(rendered);

    this.tagSelect = new GA.Widgets.TextSearchSelect(
      this.$el.find("#gist-tags"),
      GA.Store.Tags,
      null,
      this.deleteTag.bind(this)
    );
    this.model.get('tags').each(function(tag){
      this.tagSelect.select(tag);
    }.bind(this));
    this.tagSelect.addCallback = this.addTag.bind(this);
    return this;
  },

  favoriteGist: function(event) {
    if (this.model.isFavorite()) {
      this.model.unfavorite();
      $(event.target).html("Favorite");
    } else {
      this.model.favorite();
      $(event.target).html("Unfavorite");
    }
  },

  deleteGist: function(event) {
    this.model.destroy();
    Backbone.history.navigate("#/gists");
  }
});