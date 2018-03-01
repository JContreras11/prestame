$(function(){



  function jalar_data() {

    var grillautx='';
    var nrox=0;
    var otablex = {};
    $.getJSON(Gruta+'academia/Pagos/pag_listar', function(data) {

      $.each(data, function(k,item){
        nrox++;
        grillautx=grillautx+`<tr >
        <td  >${k+1} </td>
        <td  >${item.est_nom} ${item.est_ape_pat} ${item.est_ape_mat} </td>
        <td  >${item.detalle_per_pago} </td>
        <td  >${item.fecha_pago} </td>
        <td  >${item.detalle_est_pago} </td>
        <td  >${item.pago} </td>
         <td class="ver_registro" idr="${item.ide_pago}" ><i class="fa fa-search"></i> </td>
         <td class="edi_registro" idr="${item.ide_pago}"><i class="fa fa-pencil"></i> </td>
         <td class="bor_registro" idr="${item.ide_pago}"><i class="fa fa-trash-o"></i> </td>
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
      /*estudiante*/     comboselect(null,Gruta+'academia/Estudiante/estu_listar_pago','Seleccione Estudiante','item.ide_estudiante','item.est_nom','form1','inp_text2')
      /*fomra de pago*/  comboselect(null,Gruta+'academia/Mantenimiento/mant_for_pago_listar','Seleccione la forma de pago','item.ide_forma_pago','item.detalle_for_pago','form1','inp_text3')
      /*tipo de pago*/   comboselect(null,Gruta+'academia/Mantenimiento/mant_tip_pago_listar','Seleccione el tipo de pago','item.ide_tip_pago','item.detalle_tip_pago','form1','inp_text4')
      /*Estado de pago*/ comboselect(null,Gruta+'academia/Mantenimiento/mant_est_pago_listar','Selecione el estado de pago','item.ide_es_pago','item.detalle_est_pago','form1','inp_text5')
      /*Estado de pago*/ comboselect(null,Gruta+'academia/Mantenimiento/mat_per_pag_listar','Selecione el periodo de pago','item.ide_periodo_pago','item.detalle_per_pago','form1','inp_text10')
      $(".select2").each(function(){
          $(this).select2($(this).data());
      });




      $(".form1").on('submit', function(e){  // Cambio de id a clase
        e.preventDefault();
        e.stopImmediatePropagation();
        var form = $(this);

        form.parsley().validate();
        if (form.parsley().isValid()){
        var tipo_accion=$('#accion').val();

        switch(tipo_accion) {
            case "nuevo":
                destino = "pag_ins";
                break;
            case "edita":
                destino = "pag_upd";
                break;
            case "borra":
                destino = "pag_del";
                break;
        }


          $.ajax({
            url:`${Gruta}academia/Pagos/${destino}`,
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
      $('#myModaleditaLabel').html('Nuevo Pago');
      $('#accion').val('nuevo');
      $('#myModaledita').modal('show')
    })

    /*** Ver Registro ****/
    $("#datatable-table").on('click','.ver_registro',function() {

    var idr = $(this).attr('idr');
  //  console.log('Id de registro '+idr);
  $('#myModalver #myModaleditaLabel').html('Editar Pago');
    $('#accion').val('edita');
    var det_registro='';
    $.getJSON(Gruta+'academia/Pagos/pag_listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        det_registro+=`<tr><th>Id: </th> <td>${item.ide_pago}</td></tr>
        <tr><th>Nombre Estudiante </th><td>${item.est_nom} ${item.est_ape_pat} ${item.est_ape_mat}</td></tr>
        <tr><th>Pago </th><td>${item.pago}</td></tr>
        <tr><th>Estado </th><td>${item.detalle_est_pago}</td></tr>
        <tr><th>Tipo de pago </th><td>${item.detalle_tip_pago}</td></tr>
        <tr><th>Forma de pago </th><td>${item.detalle_for_pago}</td></tr>
        <tr><th>Periodo de pago </th><td>${item.detalle_per_pago}</td></tr>
        <tr><th>Fecha de pago </th><td>${item.fecha_pago}</td></tr>
        <tr><th>Descuento</th><td>${item.descuento}</td></tr>
        <tr><th>Cupon</th><td>${item.cupon}</td></tr>`;
      });
         $('#detalle_registro').html(det_registro);
        $('#myModalver').modal('show')
    });
    });
    /*** Edita Registro ****/
    $("#datatable-table").on('click','.edi_registro',function() {

    var idr = $(this).attr('idr');
    $('#myModaleditaLabel').html('Editar Pago');
    $('#accion').val('edita');

    $.getJSON(Gruta+'academia/Pagos/pag_listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        $('#inp_text1').val(item.ide_pago);
        $('#inp_text6').val(item.pago);
        $('#inp_text7').val(item.fecha_pago);
        $('#inp_text8').val(item.descuento);
        $('#inp_text9').val(item.cupon);
        /*estudiante*/     comboselect(item.ide_estudiante,Gruta+'academia/Estudiante/estu_listar','Seleccione Estudiante','item.ide_estudiante','item.est_nom','form1','inp_text2')
        /*fomra de pago*/  comboselect(item.ide_forma_pago,Gruta+'academia/Mantenimiento/mant_for_pago_listar','Seleccione la forma de pago','item.ide_forma_pago','item.detalle_for_pago','form1','inp_text3')
        /*tipo de pago*/   comboselect(item.ide_tip_pago,Gruta+'academia/Mantenimiento/mant_tip_pago_listar','Seleccione el tipo de pago','item.ide_tip_pago','item.detalle_tip_pago','form1','inp_text4')
        /*Estado de pago*/ comboselect(item.ide_es_pago,Gruta+'academia/Mantenimiento/mant_est_pago_listar','Selecione el estado de pago','item.ide_es_pago','item.detalle_est_pago','form1','inp_text5')
        /*Estado de pago*/ comboselect(item.ide_periodo_pago,Gruta+'academia/Mantenimiento/mat_per_pag_listar','Selecione el periodo de pago','item.ide_periodo_pago','item.detalle_per_pago','form1','inp_text10')
        });
      $('#myModaledita').modal('show')
    });
  });

    /*** Elimina Registro ****/
    $("#datatable-table").on('click','.bor_registro',function() {

      var idr = $(this).attr('idr');
      $('#myModaleditaLabel').html('Borrar pago');
      $('#accion').val('borra');

      $.getJSON(Gruta+'academia/Pagos/pag_listar/'+idr, function(data) { // Inicio JSON
        $.each(data, function(k,item){
          $('#nom').val(item.pro_nom);
          $('#ide').val(item.ide_pago);
          });
        $('#myModalborrar').modal('show')
      });
    });




});
