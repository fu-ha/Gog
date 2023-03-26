class Post < ApplicationRecord
  belongs_to :user
  
  has_many :comments, dependent: :destroy
  has_many :post_likes, dependent: :destroy
  #has_many :post_tags, dependent: :destroy
  #has_many :tags, through: :post_tags
  
  mount_uploader :image, ImageUploader
  
  validates :user_id, presence: true#, uniqueness: true
  validates :content, length: { maximum: 140 }#, presence: true, 
end
