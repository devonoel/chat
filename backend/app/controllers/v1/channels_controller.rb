class V1::ChannelsController < ApplicationController
  def index
    @channels = Channel.all.alphabetic
    render json: @channels.as_json
  end
end
