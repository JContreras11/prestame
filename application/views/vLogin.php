<!DOCTYPE html>
<html>
<head>
    <title>Presta.me</title>

    <link href="<?php echo base_url(); ?>css/application.min.css" rel="stylesheet">
    <!-- as of IE9 cannot parse css files with more that 4K classes separating in two files -->
    <!--[if IE 9]>
        <link href="css/application-ie9-part2.css" rel="stylesheet">
    <![endif]-->
    <link rel="shortcut icon" href="img/favicon.png">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <script>
        /* yeah we need this empty stylesheet here. It's cool chrome & chromium fix
         chrome fix https://code.google.com/p/chromium/issues/detail?id=167083
         https://code.google.com/p/chromium/issues/detail?id=332189
         */
    </script>
</head>
<body class="login-page">

<div class="container">
    <main id="content" class="widget-login-container" role="main">
        <div class="row">
            <div class="col-lg-4 col-sm-6 col-xs-10 col-lg-offset-4 col-sm-offset-3 col-xs-offset-1">
                <h4 class="widget-login-logo animated fadeInUp">
                    <i class="fa fa-circle text-gray"></i>
                    Presta.me
                    <i class="fa fa-circle text-warning"></i>
                </h4>
                <section class="widget widget-login animated fadeInUp">
                    <header>
                        <h3>Ingresa a tu cuenta</h3>
                    </header>
                    <div class="widget-body">
                      <form class="" action="<?php echo base_url();?>cLogin/verificar" method="post">
                            <div class="form-group">
                                <input type="text" name="user" id="user" value="" placeholder="Usuario">
                            </div>
                            <div class="form-group">
                                <input type="password" name="pass" id="pass" value="" placeholder="Contraseña">
                            </div>
                            <div class="clearfix">
                                <div class="btn-toolbar pull-left">
                                    <input type="submit" class="btn btn-inverse btn-sm full-width m-b" value="Entrar">

                                </div>
                                <div class="clearfix">

                                  <div class="form-group pull-right">
                                    <a href="<?php echo base_url();?>cUsuario">Nuevo Usuario</a>

                                  </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    </main>
    <footer class="page-footer">
        Desarrollado por Threeyisus
    </footer>
</div>
<!-- The Loader. Is shown when pjax happens -->
<div class="loader-wrap hiding hide">
    <i class="fa fa-circle-o-notch fa-spin-fast"></i>
</div>

<!-- common libraries. required for every page-->
<script src="<?php echo base_url(); ?>vendor/jquery/dist/jquery.min.js"></script>
<script src="<?php echo base_url(); ?>vendor/jquery-pjax/jquery.pjax.js"></script>
<script src="<?php echo base_url(); ?>vendor/bootstrap-sass/assets/javascripts/bootstrap/transition.js"></script>
<script src="<?php echo base_url(); ?>vendor/bootstrap-sass/assets/javascripts/bootstrap/collapse.js"></script>
<script src="<?php echo base_url(); ?>vendor/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js"></script>
<script src="<?php echo base_url(); ?>vendor/bootstrap-sass/assets/javascripts/bootstrap/button.js"></script>
<script src="<?php echo base_url(); ?>vendor/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js"></script>
<script src="<?php echo base_url(); ?>vendor/bootstrap-sass/assets/javascripts/bootstrap/alert.js"></script>
<script src="<?php echo base_url(); ?>vendor/slimScroll/jquery.slimscroll.min.js"></script>
<script src="<?php echo base_url(); ?>vendor/widgster/widgster.js"></script>

<!-- common app js -->
<script src="<?php echo base_url(); ?>js/settings.js"></script>
<script src="<?php echo base_url(); ?>js/jquery.backstretch.min.js"></script>
<!--<script src="<?php echo base_url(); ?>js/app.js"></script> !-->

<!-- page specific libs -->
<script src="<?php echo base_url(); ?>vendor/parsleyjs/dist/parsley.min.js"></script>

<!-- page specific js -->
<script>
var base_url = '<?php echo base_url(); ?>';
$(function(){
    function pageLoad(){
      console.log('iniciamos');
        $('.widget').widgster();
        //init parsley for pjax requests
        $( '#validation-form' ).parsley();
    }
    pageLoad();
    //SingApp.onPageLoad(pageLoad);
});

</script>

</body>
</html>
