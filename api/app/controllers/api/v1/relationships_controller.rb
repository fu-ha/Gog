class Api::V1::RelationshipsController < ApplicationController
  before_action :set_user, only: [:create, :destroy]
  
  def index
    relationships = Relationship.all
    relationship_array = relationships.map do |relationship|
      {
        id: relationship.id,
        user_id: relationship.user_id,
        follow_id: relationship.follow_id,
      }
    end
    render json: relationship_array
  end

  def create
    #「user１がuser２をフォローしたとして(ここでRoom作成される)、user２がuser１をフォローするとき、すでに１が２をフォローしているので、新規Roomは作成しない」という処理。
    relationship = @user.follow(@follow)
    # relationship = Relationship.new(relationship_params)
    others_relationship = Relationship.find_by(follow_id: relationship.user_id, user_id: relationship.follow_id)
    
    if relationship && !others_relationship
      room = Room.create
      #自分
      user_entry = Entry.find_or_create_by(user_id: relationship.follow_id, room_id: room.id)
      #相手
      #relationship.user_id = others_relationship.follow_id 　#relationship.follow_id = others_relationship.user_id 
      other_user_entry = Entry.find_or_create_by(user_id: others_relationship.follow_id, room_id: room.id) 
    end
    
    render json: { relationship: relationship, room: room, user_entry: user_entry, other_user_entry: other_user_entry }
  end

  def destroy
    relationship = @user.unfollow(@follow)
    render json: relationship
  end

  private
  
  def set_user
    @user = User.find(params[:user_id])
    @follow = User.find_by(id: current_api_v1_user.id)
  end
  
  # def relationship_params
  #   params.permit(:user_id, :follow_id).merge(follow_id: current_api_v1_user.id)
  # end
end