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
        $join->select('accounts.id, managers.id as manager_id,accounts.username, CONCAT(managers.name," ",managers.lastname)as fullname ,managers.name,managers.lastname, managers.position,managers.company');
        $join->join("accounts", "accounts.user_inf = managers.id")->where("accounts.type_user", "guardia");
        $user_date = $join->get()->getResultArray();

        return $this->getResponse([
            'message' => 'guards retrieved successfully',
            'guards' => $user_date
        ]);
    }
    public function RegisterGuards()
    {
        $rules = [
            "name" => "required",
            "lastname"=> "required",
            "company"=> "required",
            "position"=> "required",
            "username" => "required",
            "typeUser" => "required",
            "password"=> "required|min_length[5]|max_length[12]|",
        ];

        $input = $this->getRequestInput($this->request);

        if (!$this->validateRequest($input, $rules)) {
            return $this->getResponse($this->validator->getErrors(), ResponseInterface::HTTP_BAD_REQUEST);
        }else{
            $number_guard=StringMake::manager_number() ;
            $dataForm1 = [
                "name" => $input["name"],
                "lastname" => $input["lastname"],
                "manager_number" => $number_guard,
                "company" => $input["company"],
                "position" => $input["position"],
                "work" => null,

            ];
            $query = $this->managers->insert($dataForm1);
            $data_user = $this->managers->where("manager_number", $number_guard)->first();
            $newAccount = $data_user["id"];

            $dataForm2 = [
                "user_inf" => $newAccount,
                "username" => $input["username"],
                "type_user" => $input["typeUser"],
                "password" => Hash::make($input["password"]),
            ];
            $query2 = $this->accounts->insert($dataForm2);
            if (!$query && !$query2){
                return $this->getResponse("", ResponseInterface::HTTP_BAD_REQUEST);
            }else{
                return $this->getResponse([
                    "message" => "El Encargado ". $input["typeUser"]." " .$input["lastname"]." Se Registro Correctamente"
                ]);
            }
        }

    }
    public function updateGuards()
    {
        $rules = [
            "name" => "required",
            "lastname"=> "required",
            "company"=> "required",
            "position"=> "required",
        ];
        $input = $this->getRequestInput($this->request);

        if (!$this->validateRequest($input, $rules)) {
            return $this->getResponse($this->validator->getErrors(), ResponseInterface::HTTP_BAD_REQUEST);
        }else{
            $id_guard = $input["id_guard"];
            $valuesGuards = [
                "name" => $input["name"],
                "lastname" => $input["lastname"],
                "company" => $input["company"],
                "position" => $input["position"],
		];
        $update = $this->managers->update($id_guard, $valuesGuards);
        if(!$update){
            return $this->getResponse("", ResponseInterface::HTTP_BAD_REQUEST);
        }else{
            return $this->getResponse([
                "message" => "datos actualizados"
            ]);
        }
        }
    }
}
