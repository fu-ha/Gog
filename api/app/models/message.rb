class Message < ApplicationRecord
  belongs_to :user
  belongs_to :room
  
  mount_uploader :image, ImageUploader
  
  validates :user_id, presence: true
  validates :room_id, presence: true
  validates :content, length: { maximum: 140 }#, presence: true 
end
