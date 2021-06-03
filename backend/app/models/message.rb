class Message < ApplicationRecord
  belongs_to :channel
  validates :body, presence: true

  def attributes
    {id: nil, channel_id: nil, body: nil, created_at: nil}
  end
end
