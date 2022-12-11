require 'rails_helper'

RSpec.describe Relationship, type: :model do
  before do
    @user = FactoryBot.create(:user)
    @follow = FactoryBot.create(:user)
    @relationship = @user.follow(@follow)
  end
  
  it "user_id, follow_idがある場合、有効" do
    expect(@relationship).to be_valid
  end
  
  ## user_id ##
  it "user_idがない場合、無効" do
    @relationship.user_id = nil
    expect(@relationship).not_to be_valid
  end
  
  it "user_idがある場合、有効" do
    user = User.find(@relationship.user_id)
    expect(user).to be_valid
  end
  
  ## follow_id ##
  it "follow_idがない場合、無効" do
    @relationship.follow_id = nil
    expect(@relationship).not_to be_valid
  end
  
  it "follow_idがある場合、有効" do
    user = User.find(@relationship.follow_id)
    expect(user).to be_valid
  end
end
