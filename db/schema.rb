# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130424222320) do

  create_table "favorites", :force => true do |t|
    t.integer  "user_id",    :null => false
    t.integer  "gist_id",    :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "favorites", ["gist_id"], :name => "index_favorites_on_gist_id"
  add_index "favorites", ["user_id", "gist_id"], :name => "index_favorites_on_user_id_and_gist_id", :unique => true
  add_index "favorites", ["user_id"], :name => "index_favorites_on_user_id"

  create_table "gist_files", :force => true do |t|
    t.text     "body",       :null => false
    t.integer  "gist_id",    :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "gist_files", ["gist_id"], :name => "index_gist_files_on_gist_id"

  create_table "gists", :force => true do |t|
    t.string   "title",      :null => false
    t.integer  "owner_id",   :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "gists", ["owner_id"], :name => "index_gists_on_owner_id"

  create_table "taggings", :force => true do |t|
    t.integer  "gist_id",    :null => false
    t.integer  "tag_id",     :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "taggings", ["gist_id"], :name => "index_taggings_on_gist_id"
  add_index "taggings", ["tag_id"], :name => "index_taggings_on_tag_id"

  create_table "tags", :force => true do |t|
    t.string   "name",       :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "user_name",  :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "users", ["user_name"], :name => "index_users_on_user_name", :unique => true

end
