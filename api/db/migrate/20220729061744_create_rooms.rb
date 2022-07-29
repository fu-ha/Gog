class CreateRooms < ActiveRecord::Migration[6.0]
  def change
    create_table :rooms do |t|
      t.integer :user_id, null: false, foreign_key: true
      
      t.timestamps
      
      t.index [:user_id], unique: true
    end
  end
end
