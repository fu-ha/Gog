class Api::V1::PostsController < ApplicationController
  def index 
    #post = Post.all.order(created_at: :desc)
    #render json: post
    posts = Post.where(user_id: current_api_v1_user.id)
    post_array = posts.map do |post|
      { id: post.id, user: User.find_by(id: post.user_id), content: post.content }
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
    params.require(:post).permit(:content).merge(user_id: current_api_v1_user.id)
  end
end