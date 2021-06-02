FactoryBot.define do
  factory :channel do
    sequence(:name) { |n| "test-#{n}" }
  end
end
