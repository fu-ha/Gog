FactoryBot.define do
  factory :post do
    association :user
    content { Faker::Games::Pokemon.name }
  end
end
