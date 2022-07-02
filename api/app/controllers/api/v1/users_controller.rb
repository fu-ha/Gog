class Api::V1::UsersController < ApplicationController
  #before_action :user_params
  
  def index
    user = User.all
    render json: user
  end
  
  def show
    user = User.find(params[:id])
    render json: user
  end
  
  def create
    user = User.new(params[:id])
    if user.save
      render json: user
    else
      render json: { stauts: not_found }
    end
  end
  
  def update
    user = User.find(params[:id])
    if user.update(user_params)
      render json: user
    else
      render json: { status: not_found }
    end
  end
  
  def destroy
    user = User.find(params[:id])
    if user.destroy
      render json: user    
    else
      render json: { status: not_found }    
    end
  end
  
  private
  def user_params
    params.require(:user).permit(:name, :email, :image)
  end
end