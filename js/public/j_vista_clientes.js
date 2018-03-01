$(function(){



  function jalar_data() {

    var grillautx='';
    var nrox=0;
    var otablex = {};
    $.getJSON(Gruta+'public/Clientes/cli_listar', function(data) {

      $.each(data, function(k,item){
        nrox++;
        grillautx=grillautx+`<tr >
        <td  >${item.cli_doc} </td>
        <td  >${item.cli_nom} </td>
        <td  >${item.cli_ape_pat} ${item.cli_ape_mat} </td>
        <td  >${item.cli_ruc} </td>
        <td  >${item.cli_email} </td>
         <td class="ver_registro" idr="${item.ide_cliente}" ><i class="fa fa-search"></i> </td>
         <td class="edi_registro" idr="${item.ide_cliente}"><i class="fa fa-pencil"></i> </td>
         <td class="bor_registro" idr="${item.ide_cliente}"><i class="fa fa-trash-o"></i> </td>
         </tr> `;

      }) // Fin Each
      $('#grilladatos').html(grillautx );

      tabledatos = $('#datatable-table').DataTable({
        "aoColumnDefs": [
          { 'bSortable': false, 'aTargets': [ 2,3,4] }
        ],

        "oLanguage": {
          "sSearch": "Buscar: "
        }
      });


      $(".dataTables_length select").selectpicker({
        width: 'auto'
      });






    }) // Fin Json


  } // Fin Funcion jalar_data


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
            case "nuevo":
                destino = "cli_ins";
                break;
            case "edita":
                destino = "cli_upd";
                break;
            case "borra":
                destino = "cli_del";
                break;
        }


          $.ajax({
            url:`${Gruta}public/Clientes/${destino}`,
            data:$(this).serialize(),
            type:'POST',
            success:function(data){

              $('#datatable-table').dataTable().fnDestroy();
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
    $.getJSON(Gruta+'public/Clientes/cli_listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        det_registro+=`<tr><th>Documento: </th> <td>${item.cli_doc}</td></tr>
        <tr><th>Nombre y Apellidos</th><td>${item.cli_nom}  ${item.cli_ape_pat} ${item.cli_ape_mat}</td></tr>
        <tr><th>Fecha de nacimiento</th><td>${item.cli_fecha_nac}</td></tr>
        <tr><th>RUC </th><td>${item.cli_ruc}</td></tr>
        <tr><th>Direccion</th><td>${item.cli_dir}</td></tr>
        <tr><th>Telefonos</th><td>${item.cli_tel1}  ${item.cli_tel2}</td></tr>
        <tr><th>Correo</th><td>${item.cli_email}</td></tr>
        <tr><th>Facebook</th><td><a href="${item.cli_facebook}" target="_blanck">${item.cli_nom}</a></td></tr>
        <tr><th>Twitter</th><td><a href="https://twitter.com/${item.cli_twitter}" target="_blanck">@${item.cli_twitter}</a></td></tr>
        <tr><th>Glosa</th><td>${item.cli_gls}</td></tr>`;

      });
         $('#detalle_registro').html(det_registro);
        $('#myModalver').modal('show')
    });
    });
    /*** Edita Registro ****/
    $("#datatable-table").on('click','.edi_registro',function() {

    var idr = $(this).attr('idr');
    $('#myModaleditaLabel').html('Editar Tipo Vehiculo');
    $('#accion').val('edita');

    $.getJSON(Gruta+'public/Clientes/cli_listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        $('#inp_text1').val(item.ide_cliente);
        $('#inp_doc_cli').val(item.cli_doc);
        $('#inp_nom_cli').val(item.cli_nom);
        $('#inp_ape_pat').val(item.cli_ape_pat);
        $('#inp_ape_mat').val(item.cli_ape_mat);
        $('#inp_dir_cli').val(item.cli_dir);
        $('#inp_ruc_cli').val(item.cli_ruc);
        $('#inp_tel_cli1').val(item.cli_tel1);
        $('#inp_tel_cli2').val(item.cli_tel2);
        $('#inp_ema_cli').val(item.cli_email);
        $('#inp_fb_cli').val(item.cli_facebook);
        $('#inp_twt_cli').val(item.cli_twitter);
        $('#gls_obs_cli').val(item.cli_gls);
        $('#inp_fech_nac').val(item.cli_fecha_nac);
        });
      $('#myModaledita').modal('show')
    });
  });

    /*** Elimina Registro ****/
    $("#datatable-table").on('click','.bor_registro',function() {

      var idr = $(this).attr('idr');
      $('#myModaleditaLabel').html('Borrar Tipo Movimiento');
      $('#accion').val('borra');

      $.getJSON(Gruta+'public/Clientes/cli_listar/'+idr, function(data) { // Inicio JSON
        $.each(data, function(k,item){
          $('#nom').val(item.detalle_tip_mon);
          $('#ide').val(item.ide_cliente);
          });
        $('#myModalborrar').modal('show')
      });
    });




});
