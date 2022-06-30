<?php

namespace App\Controllers;

use Exception;
use App\Models\ManagersModel;
use App\Models\AccountsModel;
use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use App\Libraries\Hash;
use App\Libraries\StringMake;


class Managers extends BaseController
{

    public function __construct()
    {
        $this->managers = new ManagersModel();
        $this->accounts = new AccountsModel();
    }
    public function index()
    {
        $join = $this->managers->table("managers");
        $join->select('accounts.id, managers.id as manager_id,accounts.email,accounts.username, CONCAT(managers.name," ",managers.lastname)as fullname ,managers.name,managers.lastname, managers.position,managers.company, managers.work as work_id, CONCAT(works.job," ", works.batch)as job');
        $join->join("accounts", "accounts.user_inf = managers.id");
        $join->join("works", "managers.work = works.id");
        $user_date = $join->get()->getResultArray();

        return $this->getResponse([
            'message' => 'Managers retrieved successfully',
            'managers' => $user_date
        ]);
    }

    public function RegisterManager()
    {
        $rules = [
            "name" => "required",
            "lastname"=> "required",
            "company"=> "required",
            "position"=> "required",
            "work" => "required",
            "email"=> "required|valid_email|is_unique[accounts.email]",
            "username" => "required",
            "password"=> "required|min_length[5]|max_length[12]|",
        ];

        $input = $this->getRequestInput($this->request);

        if (!$this->validateRequest($input, $rules)) {
            return $this->getResponse($this->validator->getErrors(), ResponseInterface::HTTP_BAD_REQUEST);
        }else{
            $number_manger=StringMake::manager_number() ;
            $dataForm1 = [
                "name" => $input["name"],
                "lastname" => $input["lastname"],
                "manager_number" => $number_manger,
                "company" => $input["company"],
                "position" => $input["position"],
                "work" => $input["work"],

            ];
            $query = $this->managers->insert($dataForm1);
            $data_user = $this->managers->where("manager_number", $number_manger)->first();
            $newAccount = $data_user["id"];

            $dataForm2 = [
                "user_inf" => $newAccount,
                "username" => $input["username"],
                "email" => $input["email"],
                "password" => Hash::make($input["password"]),
            ];
            $query2 = $this->accounts->insert($dataForm2);
            if (!$query && !$query2){
                return $this->getResponse("", ResponseInterface::HTTP_BAD_REQUEST);
            }else{
                return $this->getResponse([
                    "message" => "El Encargado ". $input["name"]." " .$input["lastname"]." Se Registro Correctamente"
                ]);
            }
        }

    }

    public function updateManager()
    {
        $rules = [
            "name" => "required",
            "lastname"=> "required",
            "company"=> "required",
            "position"=> "required",
            "work" => "required",
            "email"=> "required|valid_email|is_unique[accounts.email]",
            "username" => "required",
        ];
        $input = $this->getRequestInput($this->request);

        if (!$this->validateRequest($input, $rules)) {
            return $this->getResponse($this->validator->getErrors(), ResponseInterface::HTTP_BAD_REQUEST);
        }else{
            $id_manager = $input["id_manager"];
            $valuesManagers = [
                "name" => $input["name"],
                "lastname" => $input["lastname"],
                "company" => $input["company"],
                "position" => $input["position"],
                "work" => $input["work"],
		];
        $update = $this->managers->update($id_manager, $valuesManagers);
        if(!$update){
            return $this->getResponse("", ResponseInterface::HTTP_BAD_REQUEST);
        }else{
            return $this->getResponse([
                "messages" => "datos actualizados"
            ]);
        }
        }
    }

    public function destroy($id)
   {
    }
}