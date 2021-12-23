class AddNotesToCheckIns < ActiveRecord::Migration[6.1]
  def change
    add_column :check_ins, :notes, :string
  end
end
