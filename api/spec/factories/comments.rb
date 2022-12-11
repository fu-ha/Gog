FactoryBot.define do
  factory :comment do
    content { Faker::Games::Pokemon.name }
    association :user
    association :post
  end
end
