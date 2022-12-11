require 'rails_helper'

RSpec.describe Comment, type: :model do
  before do
    @comment = FactoryBot.create(:comment)
  end 
  
  it "user_id, post_id, content(全て)ある場合、有効" do
    expect(@comment).to be_valid
  end
  
  ## user_id ##  
  it "user_idがない場合、無効" do
    @comment.user_id = nil
    expect(@comment).not_to be_valid
  end

  it "user_idがある場合、有効" do
    user = User.find(@comment.user_id)
    expect(user).to be_valid
  end
  
  ## post_id ##
  it "post_idがない場合、無効" do
    @comment.post_id = nil
    expect(@comment).not_to be_valid
  end 
  
  it "post_idがある場合、有効" do
    post = Post.find(@comment.post_id)
    expect(post).to be_valid
  end
  
  ## content ##
  it "contentがない場合、無効" do
    @comment.content = nil
    expect(@comment).not_to be_valid
  end

  it "contentが140文字以上ある場合、無効" do
    @comment.content = "a" * 150
    expect(@comment).not_to be_valid
  end
end
