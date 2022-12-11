require 'rails_helper'

RSpec.describe PostLike, type: :model do
  before do
    @post_like = FactoryBot.create(:post_like)
  end
  
  it "user_id, post_id(全て)ある場合、有効" do
    expect(@post_like).to be_valid
  end
  
  ## user_id ##  
  it "user_idがない場合、無効" do
    @post_like.user_id = nil
    expect(@post_like).not_to be_valid
  end

  it "user_idがある場合、有効" do
    user = User.find(@post_like.user_id)
    expect(user).to be_valid
  end
  
  ## post_id ##
  it "post_idがない場合、無効" do
    @post_like.post_id = nil
    expect(@post_like).not_to be_valid
  end 
  
  it "post_idがある場合、有効" do
    post = Post.find(@post_like.post_id)
    expect(post).to be_valid
  end
end
