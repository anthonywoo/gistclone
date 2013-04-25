GA.Widgets.TextSearchSelect = Backbone.View.extend({
  initialize: function(el, items) {
    this.$el = el;
    this.items = items;
    var form = $("<form style='display: inline;'></form>")
    this.input = $("<input type='text'><br>");
    this.ul = $('<ul></ul>');
    this.selected = [];
    this.render();

    this.ul.hide();
    var that = this;
    this.input.on('focus', function() {
      that.ul.show();
    });
    this.input.on('blur', function() {
      setTimeout(function(){
        that.ul.slideUp();
      }, 100);
    });
    this.input.on('keyup', function(event) {
      that.render.bind(that)(event);
    });
    form.on('submit', function(event){
      event.preventDefault();
    });
    form.append(this.input, this.ul);
    this.$el.append(form);
  },

  render: function(event) {
    if (event && event.keyCode == 13) {
      var matchingTag = this.matchingTag(this.input.val());
      if (matchingTag.length > 0) {
        this.selectedTag(matchingTag[0]);
      }
    } else {
      this.ul.html("");
      _(this.matchingTag(this.input.val())).each(function(tag){
        var $li = $("<li>" + tag.get('name') + "</li>");
        $li.on('click', function(){
          this.selectedTag(tag);
        }.bind(this));
        this.ul.append($li);
      }.bind(this));
    }
  },

  selectedTag: function(tag) {
    var label = $("<span class='label label-info'>" + tag.escape('name') + " </span> ");
    label.on('click', function(event) {
      this.selected.splice(this.selected.indexOf(tag), 1);
      $(event.target).remove();
      this.render();
    }.bind(this));
    this.$el.append(label);
    this.input.val("");
    this.selected.push(tag);
    this.render();
  },

  matchingTag: function(input) {
    var match = [];
    GA.Store.Tags.each(function(tag){
      if (this.selected.indexOf(tag) == -1 &&
        new RegExp(input, "i").test(tag.get('name')))
        match.push(tag);
    }.bind(this));
    return match;
  }

});