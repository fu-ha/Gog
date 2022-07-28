class Api::V1::PostsController < ApplicationController
  #before_action :authenticate_api_v1_user!, expect: [:index, :show]
  #protect_from_forgery #with: :null_session
  #before_action :set_current_user
  #before_action :authenticate_api_v1_user!, only: [:create, :update, :destroy]
  #before_action :authenticate_api_v1_user!, only: [:create]
  
  def index
    post = Post.all
    render json: post
  end
  
  def show
    post = Post.find(params[:id])
    render json: post
  end

  def create
    #post = Post.new(content: params[:content])
    post = Post.new(content: params[:content], user_id: params[:user_id])
    #post = Post.new(post_params)
    #post.user_id = params[:user_id]
    #post.user_id = current_api_v1_user.id
    #post = Post.new(content: params[:content], user_id: @current_user.id)
    #tags = params[:tags].split(' ')
    #if post.user_id == current_user.id 
    if post.save!
     # tags.each do |tag|
      #  post_tag = post.tags.create(name: tag)
      #end
      #post_list = {
       # content: post.content,
        #tags: tags
      #}
      render json: post
      #render json: post_list
    else
      render json: post.errors
      #render json: { stauts: not_found }
      #render json: post_list.errors
    end
  end
  
  def update
    post = Post.find(params[:id])
    #if post.user_id  == current_api_v1_user.id  
    if  post.update(post_params)
      render json: post
    else
      render json: post.errors
    end
  end
  
  def destroy
    post = Post.find(params[:id])
    #if post.user_id  == current_api_v1_user.id 
    if  post.destroy
      render json: post
    else
      render json: post.errors
    end
  end

  private
  
  def post_params
    params.permit(:user_id, :content)#.merge(user_id: current_api_v1_user.id)
  end
end