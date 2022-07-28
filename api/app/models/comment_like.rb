class CommentLike < ApplicationRecord
  belongs_to :user
  belongs_to :post
  belongs_to :comment
  
  validates :user_id, presence: true
  validatas :post_id, presence: true
  validates :comment_id, presence: true
end
