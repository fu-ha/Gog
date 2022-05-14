class Post < ApplicationRecord
  belongs_to :user
  
  has_many :comments, dependent: :destroy
  has_many :post_likes, dependent: :destroy
  
  validates :user_id, presence: true
  validates :content, presence: true
end
