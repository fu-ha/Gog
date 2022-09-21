class AddPostLikedToPostLikes < ActiveRecord::Migration[6.0]
  def change
    add_column :post_likes, :post_liked, :boolean, default: false, null: false
  end
end
