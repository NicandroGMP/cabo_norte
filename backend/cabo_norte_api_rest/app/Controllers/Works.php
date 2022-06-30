<?php

namespace App\Controllers;
use App\Controllers\BaseController;

use App\Models\WorksModel;
use CodeIgniter\HTTP\ResponseInterface;



class Works extends BaseController{
    public function __construct()
    {
		helper(["url", "form"]);

        $this->works = new WorksModel();
    }
    public function index(){
        return $this->getResponse([
            'message' => 'Managers retrieved successfully',
            'works' => $this->works->findAll()
        ]);
    }
    public function registerWork()
    {
        $rules = [
            "work" => "required",
            "batch"=> "required",
            "status"=> "required",
        ];

        $input = $this->getRequestInput($this->request);

        if (!$this->validateRequest($input, $rules)) {
            return $this->getResponse($this->validator->getErrors(), ResponseInterface::HTTP_BAD_REQUEST);
        }else{
            $data = [
                "job" => $input["work"],
                "batch" => $input["batch"],
                "status" => $input["status"],

            ];
            $query = $this->works->insert($data);
            if (!$query){
                return $this->getResponse("", ResponseInterface::HTTP_BAD_REQUEST);
            }else{
                return $this->getResponse([
                    "message" => "La Obra Se Registro Correctamente"
                ]);
            }
        }

    }

 


}
?>