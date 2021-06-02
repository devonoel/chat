class Channel < ApplicationRecord
  include ActiveModel::Serializers::JSON

  validates :name, presence: true, uniqueness: true

  scope :alphabetic, -> { order(:name) }

  def attributes
    {id: nil, name: nil}
  end
end
