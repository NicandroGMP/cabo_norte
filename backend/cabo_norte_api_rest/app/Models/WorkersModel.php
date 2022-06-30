<?php namespace App\Models;
	use CodeIgniter\Model;

class WorkersModel extends Model {
		protected $table = "workers";
		protected $primaryKey = "id";
		protected $allowedFields = ["name","lastname","register_number","job","company","manager", "position", "qr"];
		protected $useSoftDeletes = false;
		protected $useTimestamps = true;
		protected $updatedField = 'updated_at';

}