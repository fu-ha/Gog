class Api::V1::PostsController < ApplicationController
  protect_from_forgery #with: :null_session
   
  def index
    post = Post.all
    render json: post
  end
  
  def show
    post = Post.find(params[:id])
    render json: post
  end

  def create
    #post = Post.new(post_params,)
    #post = Post.new(params[:id])
    post = Post.new(post_params)
    tags = params[:tags].split(' ')
    if post.save
      tags.each do |tag|
        post_tag = post.tags.create(name: tag)
      end
      post_list = {
        content: post.content,
        tags: tags
      }
      #render json: post
      render json: post_list
    else
      #render json: { stauts: not_found }
      render json: post_list.errors
    end
  end
  
  def update
    post = Post.find(params[:id])
    if post.update(post_params)
      render json: post
    else
      render json: { stauts: not_found }
    end
  end
  
  def destroy
    post = Post.find(params[:id])
    if post.destroy
      render json: post
    else
      render json: { stauts: not_found }
    end
  end

  private
  def post_params
    params.permit(:content)
  end
end