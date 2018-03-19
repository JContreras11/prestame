<?php

  class Cusuario extends CI_Controller
  {

    function __construct()
    {
      parent::__construct();
      $this->load->model('mUsuario');
    }

    function index(){

    $this->load->view('vUsuario');

    }

    public function registrar(){
      $datos=array('user' => $this->input->post('UserTXT'),
                   'apodo'=>$this->input->post('apodoTXT'),
                   'pass'=>$this->input->post('passTXT')
                 );

      $this->mUsuario->registrar($datos);

    }

    public function mostrar(){
      echo json_encode($this->mUsuario->Mostrar());
    }

    public function modificar(){

      $datos=array('id_user'=>$this->input->post("id_user"),
      'userModificado'=>$this->input->post("userModificado"),
      'apodoModificado'=>$this->input->post("apodoModificado"));
      $resultado=$this->mUsuario->modificar($datos);


    }

    public function eliminar(){
      $datos=$this->input->post('id_user');
      $this->mUsuario->eliminar($datos);
      echo $datos;
    }






  }

 ?>
