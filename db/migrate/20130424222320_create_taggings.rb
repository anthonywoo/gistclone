class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
      t.references :gist, null: false
      t.references :tag, null: false

      t.timestamps
    end
    add_index :taggings, :gist_id
    add_index :taggings, :tag_id
  end
end
