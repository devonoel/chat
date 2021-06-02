require 'rails_helper'

RSpec.describe Channel, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_uniqueness_of(:name) }

  describe '.alphabetic' do
    let!(:channel1) { FactoryBot.create(:channel, name: 'b') }
    let!(:channel2) { FactoryBot.create(:channel, name: 'a') }

    it 'returns the channels in alphabetic order' do
      expect(Channel.all.alphabetic.first).to eq(channel2)
      expect(Channel.all.alphabetic.last).to eq(channel1)
    end
  end

  describe '#attributes' do
    context 'when the channel is unpersisted' do
      let(:channel) { FactoryBot.build(:channel, name: nil, id: nil) }
      it 'generates a serializable hash with default values' do
        expect(channel.serializable_hash).to eq({name: nil, id: nil})
      end
    end

    context 'when the channel is persisted' do
      let(:channel) { FactoryBot.create(:channel) }
      it 'generates a serializable hash with the channels name' do
        expect(channel.serializable_hash[:name]).to eq(channel.name)
      end

      it 'generates a serializable hash with the channels id' do
        expect(channel.serializable_hash[:id]).to eq(channel.id)
      end
    end
  end
end
