class Api::V1::PostsController < ApplicationController
  #before_action :authenticate_api_v1_user!
  def index 
    post = Post.all
    render json: post
  end
  
  def show
    post = Post.find(params[:id])
    render json: post
  end
  
  def create
    post = Post.new(post_params)
    #if post.user_id == current_api_v1_user.id
    if post.save
      render json: post
    else
      render json: post.errors
    end 
  end
  
  def update 
    post = Post.find(params[:id])
    if post.update(post_params)
      render json: post
    else
      render json: post.errors
    end
  end 
  
  def destroy
    post = Post.find(params[:id])
    if post.destroy
      render json: post
    else
      render json: post.errors
    end 
  end
  
  private
  
  def post_params
    params.permit(:user_id, :content).merge(user_id: current_api_v1_user.id)
  end
end