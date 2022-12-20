class Api::V1::MessagesController < ApplicationController
  def index 
    message = Message.all#.order(created_at: :desc)
    render json: message
  end
  
  def create
    message = Message.new(message_params)
    if message.save
      render json: message 
    else
      render json: message.errors
    end
  end
  
  def destroy 
    message = Message.find(params[:id])
    if message.destroy
      render json: message
    else
      render json: message.errors
    end
  end 

  private

  def message_params
    params.permit(:user_id, :room_id, :content).merge(user_id: current_api_v1_user.id)
  end
end

