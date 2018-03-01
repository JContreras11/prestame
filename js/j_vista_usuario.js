$(function(){



  function jalar_data() {

    var grillautx='';
    var nrox=0;
    var otablex = {};
    $.getJSON(Gruta+'Usuario/mod_usu_listar/'+Gusuario, function(data) {

      $.each(data, function(k,item){
        $('#username').text(item.usu_nom+' '+item.usu_ape);
        $('#empresa').text(item.emp_nombre);
        $('#phone').text(item.emp_telefono1);
        $('#mail').text(item.correo_empresa);
        $('#dir').text(item.emp_direccion);
        $('#ruc').text(item.emp_ruc);
      })



    }) // Fin Json


  } // Fin Funcion jalar_data

    $('#mc').click(function () {
      $('#inp_text9').attr('type','text');
    })
  $('#edit_user').click(function (e) {
    e.preventDefault()
    var idr = $(this).attr('idr');
    $('#myModaleditaLabel').html('Usuario');
    $('#accion').val('edita');

    $.getJSON(Gruta+'Usuario/mod_usu_listar/'+Gusuario, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        $('#inp_text1').val(item.usu_nom);
        $('#inp_text2').val(item.usu_ape);
        $('#inp_text3').val(item.emp_nombre);
        $('#inp_text4').val(item.emp_telefono1);
        $('#inp_text5').val(item.correo_empresa);
        $('#inp_text6').val(item.emp_direccion);
        $('#inp_text7').val(item.emp_ruc);
        $('#inp_text9').val(item.pass);
        $('#inp_text8').text(item.firma);
        });
      $('#myModaledita').modal('show')
    });
  })


    function pjaxPageLoad(){

      jalar_data();



      $(".form1").on('submit', function(e){  // Cambio de id a clase
        e.preventDefault();
        e.stopImmediatePropagation();
        var form = $(this);

        form.parsley().validate();
        if (form.parsley().isValid()){
        var tipo_accion=$('#accion').val();

        switch(tipo_accion) {

            case "edita":
                destino = "mod_usu_upd/"+Gusuario;
                break;
            case "borra":
                destino = "mant_almacen_del";
                break;
        }


          $.ajax({
            url:`${Gruta}Usuario/${destino}`,
            data:$(this).serialize(),
            type:'POST',
            success:function(data){
              limpiaForm('form1');
              jalar_data();
              $('#myModaledita').modal('hide');
              $('#myModalborrar').modal('hide');
              //   $("#success").show().fadeOut(20000); //=== Show Success Message==
            },
            error:function(data){
              alert('Error');
              // $("#error").show().fadeOut(20000); //===Show Error Message====
            }
          });

        }
      });

    }

    pjaxPageLoad();
    SingApp.onPageLoad(pjaxPageLoad);

    $("#btnNuevo").click(function() {
      limpiaForm('myModaledita');
      $('#myModaleditaLabel').html('Nuevo Almacen');
      $('#accion').val('nuevo');
      $('#myModaledita').modal('show')
    })

    /*** Ver Registro ****/
    $("#datatable-table").on('click','.ver_registro',function() {

    var idr = $(this).attr('idr');
  //  console.log('Id de registro '+idr);
  $('#myModalver #myModaleditaLabel').html('Datos Almacen');
    $('#accion').val('edita');
    var det_registro='';
    $.getJSON(Gruta+'minv/Inv_almacen/mant_almacen_listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        det_registro+=`<tr><th>Id: </th> <td>${item.ide_almacen}</td></tr>
        <tr><th>Tipo Movimiento </th><td>${item.nom_almacen}</td></tr>`;
      });
         $('#detalle_registro').html(det_registro);
        $('#myModalver').modal('show')
    });
    });


    /*** Elimina Registro ****/
    $("#datatable-table").on('click','.bor_registro',function() {

      var idr = $(this).attr('idr');
      $('#myModaleditaLabel').html('Borrar Tipo Movimiento');
      $('#accion').val('borra');

      $.getJSON(Gruta+'minv/Inv_almacen/mant_almacen_listar/'+idr, function(data) { // Inicio JSON
        $.each(data, function(k,item){
          $('#nom').val(item.nom_almacen);
          $('#ide').val(item.ide_almacen);
          });
        $('#myModalborrar').modal('show')
      });
    });




});
