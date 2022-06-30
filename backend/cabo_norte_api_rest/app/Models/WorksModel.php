<?php 

namespace App\Models;
	use CodeIgniter\Model;

class WorksModel extends Model {
		protected $table = 'works';
		protected $primaryKey = 'id';
		protected $allowedFields = ['job','batch','status'];
		protected $updatedField = "updated_at";
		protected $useTimestamps = true;
		protected $useSoftDeletes = false;

}