class Gist < ActiveRecord::Base
  attr_accessible :owner_id, :title, :gist_files_attributes, :tag_ids

  belongs_to :owner, :class_name => "User"
  has_many :gist_files, :inverse_of => :gist
  accepts_nested_attributes_for :gist_files, :reject_if => :all_blank

  has_many :taggings
  has_many :tags, :through => :taggings

  validates :title, presence: true
  validates :owner, presence: true
end
