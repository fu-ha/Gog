FactoryBot.define do
  factory :comment_like do
    association :user
    association :post
    association :comment
  end
end
