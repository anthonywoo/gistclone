
GA.Models.Gist = Backbone.RelationalModel.extend({
  urlRoot: "/gists",

 //  toJSON: function() {
 //    console.log(this.attributes);
 //    console.log(this.changedAttributes());
 //    var attr = _.clone((this.isNew() ? this.attributes : this.changedAttributes()));
 //
 //    if (attr.tags) {
 //      attr['tag_ids'] = attr.tags.map(function(tag){
 //        return tag.id;
 //      });
 //    }
 //
 //    // if (attr['gist_files'] && attr['gist_files'].length > 0)
 // //      attr['gist_files_attributes'] = attr['gist_files']
 //
 //    delete attr.tags;
 //    delete attr.gist_files;
 //
 //    return { gist: attr }
 //  },

  isFavorite: function() {
    return GA.Store.Favorites.get(this.id) !== undefined
  },
  favorite: function() {
    $.post(
      "/gists/" + this.id + "/favorites.json"
    ).done(function(){
      GA.Store.Favorites.add(this);
    }.bind(this));
  },
  unfavorite: function() {
    $.ajax({
      url: "/gists/" + this.id + "/favorites.json",
      method: "delete"
    }).done(function(){
      GA.Store.Favorites.remove(this);
    }.bind(this));
  },
  relations: [
    {
      type: Backbone.HasMany,
      key: "tags",
      relatedModel: GA.Models.Tag,
      collectionType: GA.Collections.Tags,
      includeInJSON: Backbone.Model.prototype.idAttribute,
      keyDestination: "tag_ids"
      // reverseRelation:{
//         key: "gists",
//         includeInJSON: "id"
//       }
    },
    {
      type: Backbone.HasMany,
      key: "gist_files",
      relatedModel: GA.Models.GistFile,
      collectionType: GA.Collections.GistFiles,
      keyDestination: "gist_files_attributes"
      // reverseRelation:{
//         key: "gists"
//       }
    }

  ]
});