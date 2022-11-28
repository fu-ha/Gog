class Api::V1::RoomsController < ApplicationController
  def index 
    #rooms = Room.all.order(created_at: :desc)
    #room_array = current_api_v1_user.rooms.map do |room|
    #  {
    #    room: room,
    #    #relationshipで言うとfollow_idではなくuser_idのユーザーを取得.[0]で配列ではなくなりオブジェクトに.
    #    other_user: room.users.where.not(id: current_api_v1_user.id)[0],
    #    last_message: room.messages.last,
    #    entry: room.entries[0]
    #  }
    #end
    #render json: room_array

    rooms = []
    current_api_v1_user.rooms.order("created_at DESC").each do |room|
      #rooms配列に追加 
      rooms << {
        room: room,
        other_user: room.users.where.not(id: current_api_v1_user.id)[0],
        last_message: room.messages[-1]
      }
    end
    render json: rooms
  end
  
  def show
    room = Room.find(params[:id])
    #room_info = {
    #  other_user: room.users.where.not(id: current_api_v1_user.id)[0],
    #  message: room.messages.order("created_at ASC")[0],
    #}
    #render json: room_info
    other_user = room.users.where.not(id: current_api_v1_user.id)[0]
    message = room.messages.order("created_at ASC")
    login_user = room.users.where(id: current_api_v1_user.id)[0]
    render json: { other_user: other_user, message: message, login_user: login_user }
  end
end
