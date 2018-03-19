<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

    <h1>Bienvenido administrador</h1>
    <br>
    <h3 class='subtitulo'>Menú</h3>

        <button type="button" id="botonMostrar" name="mostrar">Mostrar Usuarios</button>
        <table id="tablaUsuarios">
                <tbody>

                </tbody>


  </body>
</html>



















  <script type="text/javascript">
		var base_url="<?php echo base_url(); ?>";
	</script>

  <?php if ($this->uri->segment(1)=="cHomeAdmin"){ ?>
        <!-- Usuario.js util para el combobox -->
    <script src="<?php echo base_url(); ?>vendor/jquery/dist/jquery.min.js"></script>
    <script src="<?php echo base_url(); ?>vendor/jquery-pjax/jquery.pjax.js"></script>
    <script src="<?php echo base_url();?>js/usuario.js"></script>


  <?php } ?>
