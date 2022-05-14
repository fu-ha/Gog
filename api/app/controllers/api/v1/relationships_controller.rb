class Api::V1::RelationshipsController < ApplicationController
  before_action :set_user

  def create
    user = @user.follow(@follow_user)
    if user.save
      render json: user
    else
      render json: { status: not_found }
    end
  end

  def destroy
    user = @user.unfollow(@follow_user)
    if user.destroy
      render json: user
    else
      render json: { status: not_found }
    end
  end

  private
  def set_user
    @user = User.find(params[:user_id])
    @follow_user = User.find(params[:follow_id])
  end
end