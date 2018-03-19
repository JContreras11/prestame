<?php

  class Musuario extends CI_Model{

    function __construct(){
      parent::__construct();
    }

    public function registrar($datos){

      $campos=array('user'=>$datos['user'],
                   'pass'=>$datos['pass'],
                   'apodo'=>$datos['apodo']

                  );
      $this->db->insert('usuarios',$campos);

      echo "registro exitoso";


    }

    public function mostrar(){
      $this->db->select('user,apodo,id_user');
      $this->db->from('usuarios');

      $query=$this->db->get();
      return $query->result();
    }



    public function modificar($datos){
      $campos=array("user"=>$datos['userModificado'],
                    "apodo"=>$datos['apodoModificado']
                    );
      //OJO primero va el where
      $this->db->where("id_user",$datos['id_user']);
      $this->db->update("usuarios",$campos);

    }
    public function eliminar($datos){
      $id=array('id_user'=>$datos);
      $this->db->delete('usuarios',$id);
      //$this->db->delete('usuarios',)
    }







  }


 ?>
