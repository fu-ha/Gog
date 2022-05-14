require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { create(:user)}
  let(:other_user) { create(:user)}
    
  it 'name,email,password,password_confirmationが存在する場合成功' do
    expect(user).to be_valid
  end

  it 'name,email,password,password_confirmationが存在しない場合失敗' do
    user.name = ''
    user.email = ''
    user.password = ''
    user.password_confirmation = ''
    expect(user).to_not be_valid
  end

  it 'name,email,password,password_confirmationが一意の場合成功' do
    expect(other_user).to be_valid 
  end

  #it 'name,email,password,password_confirmationが一意でない場合失敗' do
  #  other_user.name = user.name
  #  other_user.email = user.email
  #  other_user.password = user.password
  #  other_user.password_confirmation = user.password_confirmation
  #  expect(other_user).to_not be_valid
  #end
end