class Api::V1::RelationshipsController < ApplicationController
  before_action :set_user
  
  def index
    relationship = Relationship.all
    render json: relationship
  end

  def create
    relationship = @user.follow#(@follow)
    render json: relationship
  end

  def destroy
    relationship = @user.unfollow(@follow)
    render json: relationship
  end

  private
  
  def set_user
    @user = User.find(params[:id])
    #@follow = User.find(params[:follow_id])
  end

end