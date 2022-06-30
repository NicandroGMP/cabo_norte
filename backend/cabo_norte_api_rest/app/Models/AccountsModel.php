<?php 

namespace App\Models;
use CodeIgniter\Model;
use Exception;

class AccountsModel extends Model{
    protected $table = "accounts";
    protected $primaryKey = "id";
    protected $allowedFields = ["user_inf","username" , "email", "password"];
    protected $updatedField = "updated_at";
    protected $beforeInsert = ["beforeInsert"];
    protected $beforeUpdate = ["beforeUpdate"];
    protected $useSoftDeletes = false;
    protected function beforeInsert(array $data):array{
        return $this->getUpadatedDataWhitHashedPassword($data);
    }
    protected function beforeUpdate(array $data):array{
        return $this->getUpadatedDataWhitHashedPassword($data);
    }

    private function getUpadatedDataWhitHashedPassword(array $data):array{
        if (isset($data["data"]["password"])){
            $plaintextPassword = $data["data"]["password"];
            $data["data"]["password"] = password_hash($plaintextPassword, PASSWORD_BCRYPT);
        }
        return $data;
    }


    public function findUserByEmail($email){
        $user = $this->asArray()->where(["email" => $email])->first();

        if (!$user){
            throw new Exception("user does not exist for especified email address");
        }
        return $user;
    }
}

?>