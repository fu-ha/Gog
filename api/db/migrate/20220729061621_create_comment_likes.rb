class CreateCommentLikes < ActiveRecord::Migration[6.0]
  def change
    create_table :comment_likes do |t|
      t.references :user, null: false, foreign_key: true
      t.references :post, nul: false, foreign_key: true
      t.references :comment, null: false, foreign_key: true
      
      t.timestamps
      
      t.index [:user_id, :post_id, :comment_id], unique: true
    end
  end
end
