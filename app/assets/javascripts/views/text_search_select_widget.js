GA.Widgets.TextSearchSelect = Backbone.View.extend({
  initialize: function(el, items, addCallback, rmCallback) {
    this.$el = el;
    this.items = items;
    this.addCallback = addCallback;
    this.rmCallback = rmCallback;


    var form = $("<form style='display: inline;'></form>")
    this.input = $("<input type='text'><br>");
    this.ul = $('<ul></ul>');
    this.selected = [];
    this.ul.hide();

    var that = this;
    this.input.on('focus', function() {
      that.ul.show();
      that.render();
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
        this.select(matchingTag[0]);
      }
    } else {
      this.ul.html("");
      _(this.matchingTag(this.input.val())).each(function(tag){
        var $li = $("<li class='highlight'>" + tag.get('name') + "</li>");
        $li.on('click', function(){
          this.select(tag);
        }.bind(this));
        this.ul.append($li);
      }.bind(this));
    }
  },

  select: function(tag) {
    var label = $("<span class='label label-info'>" + tag.escape('name') + " </span> ");
    label.on('click', function(event) {
      this.selected.splice(this.selected.indexOf(tag), 1);
      $(event.target).remove();
      if (this.rmCallback) { this.rmCallback(tag); }
      this.render();
    }.bind(this));
    this.$el.append(label);
    this.input.val("");
    if (this.addCallback) { this.addCallback(tag); }
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