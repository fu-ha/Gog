class Api::V1::RoomsController < ApplicationController
  def index 
    # rooms = Room.all.order(created_at: :desc)
    # room_array = rooms.map do |room|
    #   {
    #     room: room,
    #    #relationshipで言うとfollow_idではなくuser_idのユーザーを取得.[0]で配列ではなくなりオブジェクトに.
    ##    #other_user: room.users.where.not(id: current_api_v1_user.id)[0],
        # other_user: User.find_by(id: room.other_id), # User.where(id: room.other_id)[0],
        # last_message: room.messages.last,
    # }
    # end
    # render json: room_array

    rooms = []
    
    current_api_v1_user.rooms.order("created_at DESC").each do |room|
      #rooms配列に追加 
      rooms << {
        room: room,
        other_user: room.users.where.not(id: current_api_v1_user.id)[0],
        #other_user: User.find_by(id: room.other_id), # User.where(id: room.other_id)[0],
        #last_message: room.messages[-1],
        last_message: room.messages.last,
        entry: room.entries
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
    
    # other_user = User.find_by(id: room.other_id)
    # message = room.messages.order("created_at ASC")
    # login_user = User.find_by(id: room.user_id)
    render json: { other_user: other_user, message: message, login_user: login_user }
  end
  
  def create
    #@room = Room.create
    #a = user_entry(@login_user, room_id: @room)
    #b = other_user_entry(@user, room_id: @room)
    #render json: { room: room, a: a, b: b}
    
    # @room = Room.create#(room_params)
    # user_entry = Entry.create(user_id: current_api_v1_user.id, room_id: @room.id)
    # other_entry = Entry.create(room_entry_params)
    # render json: { room: @room, user_entry: user_entry, other_entry: other_entry }
  end
  
  private 
  
  def room_entry_params
    params.permit(:user_id, :room_id).merge(room_id: @room.id)
  end
  
  def room_user_params
    @user = User.find(parmas[:id])
    #@login_user = User.find_by(id: current_api_v1_user.id)
  end
end
