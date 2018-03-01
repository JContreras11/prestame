<?php /**
 *
 */
class Modelo_Login extends CI_Model
{


public function verificar($datos)
{
  $res = $this->db->get_where('usuarios',$datos);
  if ($res) {
    return $res->result();
  } else {
    return false;
  }
}

}
 ?>
