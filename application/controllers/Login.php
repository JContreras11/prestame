<?php /**
 *
 */
class Login extends CI_Controller
{

  function __construct()
  {
    parent::__construct();
    $this->load->model('Modelo_Login');
  }


  public function index()
  {
    $this->load->view('login');
  }

  public function verificar()
  {
    $datos = array(
      'user' => $this->input->post('user'),
      'pass' => $this->input->post('pass'),
    );


    $res = $this->Modelo_Login->verificar($datos);

    if ($res->num_rows()==1) {
      $usuario = array(
        '' => ,
        '' => ,
        '' => ,
        '' => , 
    );
    }else{

    }


  }

}
 ?>
