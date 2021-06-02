require 'rails_helper'

RSpec.describe "V1::Channels", type: :request do
  describe "GET /index" do
    context 'when there are no channels created' do
      it 'returns an empty array' do
        get v1_channels_path
        expect(response).to be_successful
        expect(JSON.parse(response.body)).to eq([])
      end
    end

    context 'when there are channels created' do
      let!(:channel) { FactoryBot.create(:channel) }
      it 'returns an array of channel objects' do
        get v1_channels_path
        expect(response).to be_successful
        expect(JSON.parse(response.body)).to eq(
          [{"id" => channel.id, "name" => channel.name}]
        )
      end
    end
  end
end
