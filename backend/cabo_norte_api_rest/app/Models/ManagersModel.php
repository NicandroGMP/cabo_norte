<?php

namespace App\Models;

use CodeIgniter\Model;

class ManagersModel extends Model
{
    protected $table = 'managers';
    protected $primaryKey = "id";
    protected $allowedFields = [
    'name','lastname','manager_number', 'company', 'position', 'work'
    ];
    protected $updatedField = "updated_at";
	protected $useTimestamps = true;
    protected $useSoftDeletes = false;
    public function findManagerById($id)
    
    {
        $manager = $this->asArray()->where(['id_manager' => $id])->first();

        if (!$manager) {
            throw new \Exception('Could not find manager for specified ID');
        }

        return $manager;
    }
}