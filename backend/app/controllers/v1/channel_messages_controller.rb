class V1::ChannelMessagesController < ApplicationController
  before_action :find_channel

  def index
    @messages = @channel.messages.by_age
    render json: @messages.as_json
  end

  def create

  end

  private

  def find_channel
    @channel = Channel.find_by(id: params[:channel_id]) || not_found
  end
end
