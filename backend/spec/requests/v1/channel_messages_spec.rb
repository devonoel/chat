require 'rails_helper'

RSpec.describe 'V1::ChannelMessages', type: :request do
  describe 'GET /index' do
    context 'when the channel_id does not exist' do
      it 'returns a 404' do
        get v1_channel_messages_path(channel_id: -1)
        expect(response).to_not be_successful
        expect(response.status).to eq 404
      end
    end

    context 'when the channel_id does exist' do
      let!(:message) { FactoryBot.create(:message) }
      let!(:other_channel_message) { FactoryBot.create(:message) }
      it 'returns an array of messages for the channel' do
        get v1_channel_messages_path(channel_id: message.channel.id)
        expect(response).to be_successful

        parsed_body = JSON.parse(response.body)
        expect(parsed_body.length).to eq(1)
        expect(parsed_body[0].keys.sort).to eq(["id", "body", "channel_id", "created_at"].sort)
        expect(parsed_body[0]["channel_id"]).to eq(message.channel.id)
      end
    end
  end

  describe 'POST /create' do
    context 'when the channel_id does not exist' do
      it 'returns a 404' do
        post v1_channel_messages_path(channel_id: -1), params: { message: { body: 'test' } }
        expect(response).to_not be_successful
        expect(response.status).to eq 404
      end
    end

    context 'when the channel_id does exist' do
      let(:channel) { FactoryBot.create(:channel) }
      let!(:message) { FactoryBot.build(:message, channel: channel) }
      context 'when the message is blank' do
        it 'returns a 400' do
          post v1_channel_messages_path(channel_id: message.channel.id), params: { message: {body: nil } }
          expect(response).to_not be_successful
          expect(response.status).to eq 400
        end
      end

      context 'when the message is not blank' do
        it 'returns a 200' do
          post v1_channel_messages_path(channel_id: message.channel.id), params: { message: { body: 'not blank' } }
          expect(response).to be_successful
          expect(response.status).to eq 200
        end
      end
    end
  end
end
