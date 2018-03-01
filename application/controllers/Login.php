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

    if (count($res) == 1) {

      foreach ($res as $key ) {
      $usuario = array(
        's_usuario' => $key->user,
        's_id' => $key->ide_user,
        's_tipo' => $key->tipo,
        'apodo' => $key->apodo,
      );
    }


    $this->session->set_userdata($usuario);
      redirect(site_url('home'));
    }else{
       redirect(base_url());
    }


  }

}
 ?>
