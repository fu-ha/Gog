class Api::V1::PostLikesController < ApplicationController
  #before_action :set_post_likes, only: [:create, :destroy]
  #before_action :set_variable
  
  def index
    post_likes = PostLike.all.order(created_at: :desc)
    render json: post_likes
    #post_likes_array = post_likes.map do |post_like|
    #  { 
    #    id: post_like.id, 
    #    user_id: PostLike.find_by(user_id: params[:user_id]), 
    #    post_id: PostLike.find_by(post_id: params[:post_id]),
    #    created_at: post_like.created_at
    #  }
    #end
    #render json: post_likes_array
  end

  def create
    post_likes = PostLike.new(post_likes_params)
    if post_likes.save
      render json: post_likes
    else
      render json: post_likes.errors
    end
  end
  
  def destroy
    post_likes = PostLike.find_by(post_likes_params)
    #post_likes = PostLike.find(params[:id])
    #post_likes = @user.un_post_like(@post)
    if post_likes.destroy
      render json: post_likes
    else
      render json: post_likes.errors
    end
  end
  
  private
  def set_post_likes
    #find_byはレコードの検索でヒットした初めの一件だけを返す
    #@user = User.find_by(id: params[:id])
    # @post = Post.find_by(id: params[:id])
    @post = Post.find(params[:id])
    #@post = Post.find(2)
  end
  
  #def set_variable
  #  @user = User.find_by(id: current_api_v1_user.id)
  #  @post = Post.find_by(id: @user.id)
  #  render json: @post
  #end
      
  def post_likes_params
    params.permit(:user_id, :post_id).merge(user_id: current_api_v1_user.id)#, post_id: @post.id)
  end
end