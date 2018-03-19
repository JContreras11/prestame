<?php /**
 *
 */
class Clogin extends CI_Controller
{

  function __construct()
  {
    parent::__construct();
    $this->load->model('mLogin');
  }


  public function index()
  {
    $this->load->view('vLogin');
  }

  public function verificar()
  {
    $datos = array(
      'user' => $this->input->post('user'),
      'pass' => $this->input->post('pass'),
    );


    $res = $this->mLogin->verificar($datos);

    if (count($res) == 1) {

      foreach ($res as $key ) {
      $usuario = array(
        's_usuario' => $key->user,
        's_id' => $key->id_user,
        's_tipo' => $key->tipo,
        'apodo' => $key->apodo,
      );
    }

    $this->session->set_userdata($usuario);
    /*redirect(site_url('cHomeAdmin'));
    }else{
     redirect(base_url());
   }*/
    if ($this->session->userdata('s_tipo')==1) {


      redirect(site_url('cHomeAdmin'));
    }else{
       redirect(site_url('cHomeUser'));
    }


  }else{
    redirect(base_url());
    
  }


}
}

 ?>
