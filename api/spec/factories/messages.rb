FactoryBot.define do
  factory :message do
    association :user
    association :room
    content { Faker::JapaneseMedia::OnePiece.character }
  end
end
