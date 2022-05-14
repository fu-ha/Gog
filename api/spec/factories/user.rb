FactoryBot.define do
  factory :user do
    name                  { Gimei.name }
    email                 { Faker::Internet.email }
    password              { Faker::Internet.password(min_length: 8) }
    password_confirmation { password }
  end
end