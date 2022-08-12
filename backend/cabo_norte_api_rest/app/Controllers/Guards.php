<?php

namespace App\Controllers;

use Exception;
use App\Models\ManagersModel;
use App\Models\AccountsModel;
use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use App\Libraries\Hash;
use App\Libraries\StringMake;

class Guards extends BaseController
{
    
    public function __construct()
    {
        $this->managers = new ManagersModel();
        $this->accounts = new AccountsModel();
    }
    public function index(){
        
        $join = $this->managers->table("managers");
        $join->select('accounts.id, managers.id as manager_id,accounts.username, CONCAT(managers.name," ",managers.lastname)as fullname ,managers.name,managers.lastname, managers.position,managers.company, managers.work as work_id, CONCAT(works.job," ", works.batch)as job');
        $join->join("accounts", "accounts.user_inf = managers.id");
        $join->join("works", "managers.work = works.id")->where("accounts.type_user", "guardia");
        $user_date = $join->get()->getResultArray();

        return $this->getResponse([
            'message' => 'guards retrieved successfully',
            'guards' => $user_date
        ]);
    }
}
