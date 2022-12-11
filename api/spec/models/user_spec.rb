require 'rails_helper'

RSpec.describe User, type: :model do
  it "名前、メール、パスワード(全て)がある場合、有効" do
    user = FactoryBot.build(:user)
    expect(user).to be_valid
  end

  #it "名前がない場合、無効" do
    #user = FactoryBot.build(:user, name: nil)
    #expect(user).not_to be_valid
  #end

  it "メールアドレスがない場合、無効" do
    user = FactoryBot.build(:user, email: nil)
    expect(user).not_to be_valid
  end

  it "パスワードがない場合、無効" do
    user = FactoryBot.build(:user, password: nil)
    expect(user).not_to be_valid
  end
  
  it "重複したメールアドレスの場合、無効" do
    user1 = FactoryBot.create(:user, email: "user@example.com")
    user2 = FactoryBot.build(:user, email: "user@example.com")
    expect(user2).not_to be_valid
  end
end
