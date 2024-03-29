# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
  
  has_many :posts, dependent: :destroy
  has_many :post_likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :comment_likes, dependent: :destroy
  #↓架空のfollowing_relationships定義。class_nameオプションで正しいテーブル名。外キーuser_idから。
  has_many :following_relationships, class_name: 'Relationship', foreign_key: 'user_id'
  #has_many :relationships, dependent: :destroy
  has_many :follower_relationships, class_name: 'Relationship', foreign_key: 'follow_id'
  #↓架空のfollowing定義。中間テーブルfollowing_relationshipsを通してfollowテーブルからフォローしてるuser_id取得。
  has_many :followings, through: :following_relationships, source: :follow
  has_many :followers, through: :follower_relationships, source: :user
  has_many :entries, dependent: :destroy
  has_many :rooms, through: :entries
  has_many :messages, dependent: :destroy
  
  mount_uploader :image, ImageUploader
  
  def self.guest
    find_or_create_by!(email: "guest@example.com") do |user|
      user.password = SecureRandom.urlsafe_base64
      user.name = "Guest_User"
    end
  end
  
  def follow(other_user)
    self.following_relationships.find_or_create_by(follow_id: other_user.id) unless self == other_user
  end
  
  def unfollow(other_user)
    self.following_relationships.find_by(follow_id: other_user.id).destroy
  end
  
  # def following?(other_user)
  #   self.followings.include?(other_user)
  # end
  
end