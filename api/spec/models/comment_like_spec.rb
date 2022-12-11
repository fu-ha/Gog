require 'rails_helper'

RSpec.describe CommentLike, type: :model do
  before do
    @comment_like = FactoryBot.create(:comment_like)
  end
  
  it "user_id, post_id, comment_id(全て)ある場合、有効" do
    expect(@comment_like).to be_valid
  end
  
  ## user_id ##  
  it "user_idがない場合、無効" do
    @comment_like.user_id = nil
    expect(@comment_like).not_to be_valid
  end

  it "user_idがある場合、有効" do
    user = User.find(@comment_like.user_id)
    expect(user).to be_valid
  end
  
  ## post_id ##
  it "post_idがない場合、無効" do
    @comment_like.post_id = nil
    expect(@comment_like).not_to be_valid
  end 
  
  it "post_idがある場合、有効" do
    post = Post.find(@comment_like.post_id)
    expect(post).to be_valid
  end
  
  ## comment_id ##
  it "comment_idがない場合、無効" do
    @comment_like.comment_id = nil
    expect(@comment_like).not_to be_valid
  end 
  
  it "comment_idがある場合、有効" do
    comment = Comment.find(@comment_like.comment_id)
    expect(comment).to be_valid
  end
end
