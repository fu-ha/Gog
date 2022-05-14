FactoryBot.define do
  factory :post do
    association :user
    content { Faker::Lorem.sentence }
  end
end
