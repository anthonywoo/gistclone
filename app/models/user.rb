class User < ActiveRecord::Base
  attr_accessible :user_name, :favorite_gist_ids

  has_many :gists, :foreign_key => "owner_id"
  has_many :favorites
  has_many :favorite_gists, :through => :favorites, :source => :gist

  validates :user_name, presence: true, uniqueness: true
end
