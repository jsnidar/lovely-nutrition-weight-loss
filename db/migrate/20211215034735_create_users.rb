class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :username
      t.string :email
      t.boolean :admin
      t.string :password_digest
      t.integer :height
      t.has_many :check_ins
      t.has_many :goals

      t.timestamps
    end
  end
end
