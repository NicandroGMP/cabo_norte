<?php

namespace App\Controllers;

use Exception;
use App\Models\ManagersModel;
use App\Models\AccountsModel;
use App\Models\BitacoraProvidersModel;
use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use DateTime;

class BitacoraProviders extends BaseController
{
    
    public function __construct()
    {
        $this->managers = new ManagersModel();
        $this->accounts = new AccountsModel();
        $this->bitacoraProviders = new BitacoraProvidersModel();
    }
    public function index($date){

        //Fuction Bitacora function to filter by date
        $bitacora = $this->bitacoraProviders->table("bitacora_providers")->like("entry_provider", $date);
        $bitacora = $bitacora->get()->getResultArray();
        //end fuction Bitacora function to filter by date

        //Fuction statics dont exit worker
        $count=$this->bitacoraProviders->select("COUNT(bitacora_providers.id) as dontExit");
        $count->where("bitacora_providers.exit_provider is null")->like('bitacora_providers.entry_provider', $date,'both');
        $isnull = $count->get()->getResultArray();
        $isnull =$isnull[0];
        //end Fuction statics dont exit worker

        //Fuction statics entry worker
        $total_provider = count( $bitacora);
        $success_entry = $total_provider - intval($isnull["dontExit"]);
        //end Fuction statics entry worker

        return $this->getResponse([
            'message' => 'Bitacora retrieved successfully',
            'bitacora' => $bitacora,
            'dontExit' => $isnull,
            'total_provider' => $total_provider,
            'success_entry' =>  $success_entry 
        ]);
    }
    public function registerProvider(){
        $rules = [
            "name" => "required",
            "work"=> "required",
            "service"=> "required",
            "num_cone" => "required",
            "identification" => "required"
        ];

        $input = $this->getRequestInput($this->request);

        if (!$this->validateRequest($input, $rules)) {
            return $this->getResponse($this->validator->getErrors(), ResponseInterface::HTTP_BAD_REQUEST);
        }else{
            date_default_timezone_set('America/Merida');   
            $entry_provider =  date("Y-m-d H:i:s");
            $data = [
                "name" => $input["name"],
                "work" => $input["work"],
                "service" => $input["service"],
                "num_cone" => $input["num_cone"],
                "entry_provider" => $entry_provider,
                "identification" => $input["identification"]

            ];
            $query = $this->bitacoraProviders->insert($data);
            if (!$query){
                return $this->getResponse("", ResponseInterface::HTTP_BAD_REQUEST);
            }else{
                return $this->getResponse([
                    "message" => "El Proveedor ". $input["name"]." Se Registro Correctamente"
                ]);
            }
        }
    }
    public function registerExitWorker(){
        $rules = [
            "idWorker" => "required",
        ];

        $input = $this->getRequestInput($this->request);

        if (!$this->validateRequest($input, $rules)) {
            return $this->getResponse($this->validator->getErrors(), ResponseInterface::HTTP_BAD_REQUEST);
        }else{
            date_default_timezone_set('America/Merida');   
            $exit_worker =  date("Y-m-d H:i:s");
            $data = [
                "exit_worker" =>  $exit_worker ,

            ];
            $query = $this->BitacoraWorkers->update($input["idWorker"],$data);
            if (!$query){
                return $this->getResponse("", ResponseInterface::HTTP_BAD_REQUEST);
            }else{
                return $this->getResponse([
                    "message" => "se registro la Salida Correctamente"
                ]);
            }
        }
    }
}
