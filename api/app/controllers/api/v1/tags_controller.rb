class Api::V1::TagsController < ApplicationController
  def index 
    tag = Tag.all
    render json: tag
  end
  
  def show 
    tag = Tag.find(params[:id])
    render json: tag
  end 
end