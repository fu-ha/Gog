class Post < ApplicationRecord
  belongs_to :user
  
  has_many :comments, dependent: :destroy
  has_many :post_likes, dependent: :destroy
  has_many :post_tags, dependent: :destroy
  has_many :tags, through: :post_tags
  
  mount_uploader :image, ImageUploader
  
  validates :user_id, presence: true#, uniqueness: true
  validates :content, presence: true, length: { maximum: 140 }
  
  #def post_liked?(current_api_v1_user, post_id)
  #  post_likes.where(user_id: current_api_v1_user.id, post_id: post_id).exists?
  #end
end
