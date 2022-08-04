class Api::V1::UsersController < ApplicationController
  #before_action :authenticate_api_v1_user!
  def index
    user = User.all
    render json: user
  end
  
  def show
    user = User.find(params[:id])
    render json: user
  end
  
  def create
    user = User.new(user_params)
    if user.save
      render json: user
    else
      render json: user.errors
    end
  end
  
  def update
    user = User.find(params[:id])
    if user.update(user_params)
      render json: user
    else
      render json: user.errors
    end
  end
  
  def destroy
    user = User.find(params[:id])
    if user.destroy
      render json: user    
    else
      render json: user.errors
    end
  end
  
  private
  def user_params
    params.require(:user).permit(:name, :email, :image)
  end
end