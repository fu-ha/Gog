class Api::V1::UsersController < ApplicationController
  def index
    user_data={
      user: User.all,
      login_user: User.find_by(id: current_api_v1_user.id)
    }
    render json: user_data
  end
  
  def show
    #user = User.find_by(id: current_api_v1_user.id)
    user = User.find(params[:id])
    render json: user
  end
  
  def destroy
    user = User.find(params[:id])
    if user.destroy
      render json: user    
    else
      render json: user.errors
    end
  end
  
  def login_user
    user = User.find_by(id: current_api_v1_user.id)
    render json: user
  end
end