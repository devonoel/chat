class Message < ApplicationRecord
  belongs_to :channel
  validates :body, presence: true

  scope :by_age, -> { order(:created_at) }

  def attributes
    {id: nil, channel_id: nil, body: nil, created_at: nil}
  end
end
