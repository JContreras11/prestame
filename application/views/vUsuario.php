<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Usuarios Nuevos</title>
</head>
<body>
  <h1>Nuevos Usuarios</h1>
  <form  action="<?php echo base_url();?>cUsuario/Registrar" method="post">

    <ul>
      <input type="text" name="UserTXT" placeholder="Usuario">
    </ul>
    <ul>
      <input type="text" name="apodoTXT" placeholder="Apodo">
    </ul>
    <ul>
      <input type="text" name="passTXT" placeholder="Contraseña">
    </ul>

    <ul>
      <input type="submit" name="registrar" value="Registrar">
    </ul>

  </form>




</li>
</body>
</html>
