class Post < ApplicationRecord
  belongs_to :user
  
  has_many :comments, dependent: :destroy
  has_many :post_likes, dependent: :destroy
  has_many :post_tags, dependent: :destroy
  has_many :tags, through: :post_tags
  
  validates :user_id, presence: true#, uniqueness: true
  validates :content, presence: true, length: { maximum: 140 }
end
