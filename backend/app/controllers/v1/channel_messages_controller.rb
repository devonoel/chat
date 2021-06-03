class V1::ChannelMessagesController < ApplicationController
  before_action :find_channel

  def index
    @messages = @channel.messages.by_age
    render json: @messages.as_json
  end

  def create
    @message = @channel.messages.new(message_params)
    if @message.save
      render json: { message: 'Message created' }
    else
      render json: { errors: @message.errors.full_messages }, status: :bad_request
    end
  end

  private

  def find_channel
    @channel = Channel.find_by(id: params[:channel_id]) || not_found
  end

  def message_params
    params.require(:message).permit(:body)
  end
end
