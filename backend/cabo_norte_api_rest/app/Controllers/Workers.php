<?php

namespace App\Controllers;
use App\Controllers\BaseController;
use App\Libraries\Hash;
use App\Libraries\StringMake;
use App\Models\WorkersModel;
use CodeIgniter\HTTP\ResponseInterface;



class Workers extends BaseController{
    public function __construct()
    {
		helper(["url", "form"]);

        $this->workers = new WorkersModel();
    }
    public function index(){
        $join = $this->workers->table("workers");
        $join->select('workers.id, CONCAT(workers.name ," ", workers.lastname) as fullname,workers.name ,workers.lastname,workers.job as job_id , works.job,workers.manager, managers.name as manager_name, workers.position,  workers.company, workers.qr');
        $join->join("managers", "workers.manager = managers.id");
        $join->join("works", "workers.job = works.id");
        $user_date = $join->get()->getResultArray();
        return $this->getResponse([
            'message' => 'Workers retrieved successfully',
            'workers' => $user_date
        ]);
    }
 
    public function registerWorker()
    {
        $rules = [
            "name" => "required",
            "lastname"=> "required",
            "company"=> "required",
            "position"=> "required",
            "work" => "required",
            "manager" => "required"
        ];

        $input = $this->getRequestInput($this->request);

        if (!$this->validateRequest($input, $rules)) {
            return $this->getResponse($this->validator->getErrors(), ResponseInterface::HTTP_BAD_REQUEST);
        }else{
            $number_worker=StringMake::manager_number() ;
            $data = [
                "register_number" => $number_worker,
                "name" => $input["name"],
                "lastname" => $input["lastname"],
                "company" => $input["company"],
                "position" => $input["position"],
                "job" => $input["work"],
                "manager" => $input["manager"],
                "qr" => "default.jpg",

            ];
            $query = $this->workers->insert($data);
            if (!$query){
                return $this->getResponse("", ResponseInterface::HTTP_BAD_REQUEST);
            }else{
                return $this->getResponse([
                    "message" => "El Trabajador ". $input["name"]." " .$input["lastname"]." Se Registro Correctamente"
                ]);
            }
        }

    }
    public function updateWorker()
    {
        $rules = [
            "name" => "required",
            "lastname"=> "required",
            "company"=> "required",
            "position"=> "required",
            "work" => "required",
            "manager" => "required",
        ];
        $input = $this->getRequestInput($this->request);

        if (!$this->validateRequest($input, $rules)) {
            return $this->getResponse($this->validator->getErrors(), ResponseInterface::HTTP_BAD_REQUEST);
        }else{
            $id = $input["id"];
            $data = [
                "name" => $input["name"],
                "lastname" => $input["lastname"],
                "company" => $input["company"],
                "position" => $input["position"],
                "work" => $input["work"],
                "manager" => $input["manager"],
		];
        $update = $this->workers->update($id, $data);
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
?>