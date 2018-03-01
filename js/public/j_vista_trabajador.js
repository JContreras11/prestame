$(function(){



  function jalar_data() {

    var grillautx='';
    var nrox=0;
    var otablex = {};
    $.getJSON(Gruta+'public/Trabajador/trab_listar', function(data) {

      $.each(data, function(k,item){
        nrox++;
        grillautx=grillautx+`<tr >
        <td  >${item.trab_doc} </td>
        <td  >${item.trab_nombre} </td>
        <td  >${item.trab_ape_pat} ${item.trab_ape_mat} </td>
        <td  >${item.trab_email} </td>
         <td class="ver_registro" idr="${item.ide_trabajador}" ><i class="fa fa-search"></i> </td>
         <td class="edi_registro" idr="${item.ide_trabajador}"><i class="fa fa-pencil"></i> </td>
         <td class="bor_registro" idr="${item.ide_trabajador}"><i class="fa fa-trash-o"></i> </td>
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
                destino = "trab_ins";
                break;
            case "edita":
                destino = "trab_upd";
                break;
            case "borra":
                destino = "trab_del";
                break;
        }


          $.ajax({
            url:`${Gruta}public/Trabajador/${destino}`,
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
    $.getJSON(Gruta+'public/Trabajador/trab_listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        det_registro+=`<tr><th>Documento: </th> <td>${item.trab_doc}</td></tr>
        <tr><th>Nombre y Apellidos</th><td>${item.trab_nombre}  ${item.trab_ape_pat} ${item.trab_ape_mat}</td></tr>
        <tr><th>Fecha de nacimiento</th><td>${item.trab_fecha_nac}</td></tr>
        <tr><th>Telefonos</th><td>${item.trab_tel1}  / ${item.trab_tel2}</td></tr>
        <tr><th>Correo</th><td>${item.trab_email}</td></tr>
        <tr><th>Estado Civil</th><td>${item.trab_est_civil}</td></tr>`;

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

    $.getJSON(Gruta+'public/Trabajador/trab_listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        $('#inp_text1').val(item.ide_trabajador);
        $('#inp_doc_trab').val(item.trab_doc);
        $('#inp_nom_trab').val(item.trab_nombre);
        $('#inp_ape_pat').val(item.trab_ape_pat);
        $('#inp_ape_mat').val(item.trab_ape_mat);
        $('#inp_tel_trab1').val(item.trab_tel1);
        $('#inp_tel_trab2').val(item.trab_tel2);
        $('#inp_ema_trab').val(item.trab_email);
        $('#inp_fech_nac').val(item.trab_fecha_nac);
        });
      $('#myModaledita').modal('show')
    });
  });

    /*** Elimina Registro ****/
    $("#datatable-table").on('click','.bor_registro',function() {

      var idr = $(this).attr('idr');
      $('#myModaleditaLabel').html('Borrar Tipo Movimiento');
      $('#accion').val('borra');

      $.getJSON(Gruta+'public/Trabajador/trab_listar/'+idr, function(data) { // Inicio JSON
        $.each(data, function(k,item){
          $('#nom').val(item.detalle_tip_mon);
          $('#ide').val(item.ide_trabajador);
          });
        $('#myModalborrar').modal('show')
      });
    });




});
