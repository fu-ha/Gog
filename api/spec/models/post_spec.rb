require 'rails_helper'

RSpec.describe Post, type: :model do
  before do
    @post = FactoryBot.create(:post)
  end 
  
  it "user_id, content(全て)ある場合、有効" do
    expect(@post).to be_valid
  end
  
  ## user_id ##  
  it "user_idがない場合、無効" do
    @post.user_id = nil
    expect(@post).not_to be_valid
  end

  it "user_idがある場合、有効" do
    user = User.find(@post.user_id)
    expect(user).to be_valid
  end
  ## content ##
  # it "contentがない場合、無効" do
  #   @post.content = nil
  #   expect(@post).not_to be_valid
  # end

  it "contentが140文字以上ある場合、無効" do
    @post.content = "a" * 150
    expect(@post).not_to be_valid
  end
end
