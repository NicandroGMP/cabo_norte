<?php

namespace App\Controllers;
use App\Controllers\BaseController;
use App\Libraries\Hash;
use App\Libraries\StringMake;
use App\Models\ProvidersModel;
use CodeIgniter\HTTP\ResponseInterface;



class Providers extends BaseController{
    public function __construct()
    {
		helper(["url", "form"]);

        $this->providers = new ProvidersModel();
    }
    public function index(){
        $user_date = $this->providers->findAll();
        return $this->getResponse([
            'message' => 'Provider retrieved successfully',
            'providers' => $user_date
        ]);
    }
 
    public function registerProvider()
    {
        $rules = [
            "name" => "required",
            "service"=> "required",
            "job" => "required",
            "batch" => "required"
        ];

        $input = $this->getRequestInput($this->request);

        if (!$this->validateRequest($input, $rules)) {
            return $this->getResponse($this->validator->getErrors(), ResponseInterface::HTTP_BAD_REQUEST);
        }else{
            $number_worker=StringMake::manager_number() ;
            $data = [
                "register_number" => $number_worker,
                "name" => $input["name"],
                "service" => $input["service"],
                "work" => $input["job"],
                "batch" => $input["batch"],

            ];
            $query = $this->providers->insert($data);
            if (!$query){
                return $this->getResponse("", ResponseInterface::HTTP_BAD_REQUEST);
            }else{
                return $this->getResponse([
                    "message" => "El Proveedor ". $input["name"]."Se Registro Correctamente"
                ]);
            }
        }

    }
    public function updateProvider()
    {
        $rules = [
            "name" => "required",
            "service"=> "required",
        ];
        $input = $this->getRequestInput($this->request);

        if (!$this->validateRequest($input, $rules)) {
            return $this->getResponse($this->validator->getErrors(), ResponseInterface::HTTP_BAD_REQUEST);
        }else{
            $id = $input["id"];
            $data = [
                "name" => $input["name"],
                "service" => $input["service"],
		];
        $update = $this->providers->update($id, $data);
        if(!$update){
            return $this->getResponse("", ResponseInterface::HTTP_BAD_REQUEST);
        }else{
            return $this->getResponse([
                "message" => "datos actualizados"
            ]);
        }
        }
    }

    public function getProviderSearchByRegisterNumber(){

        $input = $this->getRequestInput($this->request);
        $string = $input["search"];
        $join = $this->providers->table("workers");
        $join->select('workers.id as workers_id, workers.name, works.job,workers.lastname, workers.position, workers.register_number, workers.company, CONCAT(managers.name," ",managers.lastname) as manager,CONCAT(works.job," ",works.batch) as job');
        $join->join("works", "workers.job = works.id");
        $join->join("managers", "workers.manager = managers.id")->where("workers.register_number", $string);
        $inf_user =  $join->get()->getResultArray();

        if(!$inf_user){
            return $this->getResponse("", ResponseInterface::HTTP_BAD_REQUEST);
        }else{
         
        return $this->getResponse([
            "worker" => $inf_user
        ]);   
        }
  }
  public function getProviderScanByRegisterNumber($number){

    $string = $number;
    $join = $this->workers->table("workers");
    $join->select('workers.id as workers_id, workers.name, works.job,workers.lastname, workers.position, workers.register_number, workers.company, CONCAT(managers.name," ",managers.lastname) as manager,CONCAT(works.job," ",works.batch) as job');
    $join->join("works", "workers.job = works.id");
    $join->join("managers", "workers.manager = managers.id")->where("workers.register_number", $string);
    $inf_user =  $join->get()->getResultArray();

    if(!$inf_user){
        return $this->getResponse("", ResponseInterface::HTTP_BAD_REQUEST);
    }else{
     
    return $this->getResponse([
        "worker" => $inf_user
    ]);   
    }
}

}
?>
