require 'rails_helper'

RSpec.describe Message, type: :model do
  it { should validate_presence_of(:body) }
  it { should belong_to(:channel) }

  describe '#attributes' do
    context 'when the message is unpersisted' do
      let(:message) { FactoryBot.build(:message, body: nil, channel: nil) }
      it 'generates a serializable hash with default values' do
        expect(message.serializable_hash).to eq({id: nil, channel_id: nil, body: nil, created_at: nil})
      end
    end

    context 'when the message is persisted' do
      let(:message) { FactoryBot.create(:message) }
      it 'generates a serializable hash with the messages body' do
        expect(message.serializable_hash[:body]).to eq(message.body)
      end

      it 'generates a serializable hash with the messages id' do
        expect(message.serializable_hash[:id]).to eq(message.id)
      end

      it 'generates a serializable hash with the channel id' do
        expect(message.serializable_hash[:channel_id]).to eq(message.channel.id)
      end

      it 'generates a serializable hash with the messages created_at' do
        expect(message.serializable_hash[:created_at]).to eq(message.created_at)
      end
    end
  end
end
