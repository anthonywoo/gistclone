class GistFile < ActiveRecord::Base
  attr_accessible :body, :gist_id

  belongs_to :gist

  validates :body, :gist, presence: true
end
