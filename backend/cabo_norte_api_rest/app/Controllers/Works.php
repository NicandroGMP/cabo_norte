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
                "updated_at" => null,

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

    public function updateWork()
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
            $id = $input["id"];
            $data = [
                "job" => $input["work"],
                "batch" => $input["batch"],
                "status" => $input["status"],
		];
        $update = $this->works->update($id, $data);
        if(!$update){
            return $this->getResponse("", ResponseInterface::HTTP_BAD_REQUEST);
        }else{
            return $this->getResponse([
                "message" => "datos actualizados"
            ]);
        }
        }
    }

    public function filterUniqueWorks(){
        $works= $this->works->select("job")->groupBy("job HAVING COUNT(*)=1 OR COUNT(*)>1");
        $works = $works->get()->getResultArray();
        return $this->getResponse(["works" => $works]);
    }
    

}
?>