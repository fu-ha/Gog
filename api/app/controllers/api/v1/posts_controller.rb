class Api::V1::PostsController < ApplicationController
  #before_action :authenticate_api_v1_user!
  
  def index 
    posts = Post.all.order(created_at: :desc)
    #render json: posts
    #posts = Post.where(user_id: current_api_v1_user.id).all.order("created_at DESC")
    post_array = posts.map do |post|
      { id: post.id, user: User.find_by(id: post.user_id), content: post.content, image: post.image, created_at: post.created_at }
    end
    render json: post_array
  end
  
  def show
    post = Post.find(params[:id])
    post_info = {
      id: post.id,
      user: post.user,
      content: post.content
    }
    render json: post_info
  end
  
  def create
    post = Post.new(post_params)
    if post.save
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
    params.require(:post).permit(:content, :image).merge(user_id: current_api_v1_user.id)
  end
end