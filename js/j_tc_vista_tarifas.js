$(function(){



  function jalar_data() {

    var grillautx='';
    var nrox=0;
    var otablex = {};
    $.getJSON('Tctarifas/listar', function(data) {

      $.each(data, function(k,item){
        nrox++;
        grillautx=grillautx+`<tr >
        <td class="hidden-xs">   ${item.ide_ser_tve}  </td>
        <td  > ${item.ser_nom} </td>
        <td  >${item.tve_detalle} </td>
        <td  >${item.spr_precio}</td>

         <td class="ver_registro"  idr="${item.ide_ser_tve}" ><i class="fa fa-search"></i> </td>
         <td class="edi_registro" idr="${item.ide_ser_tve}"><i class="fa fa-pencil"></i> </td>
         </tr> `;

      }) // Fin Each
      $('#grilladatos').html(grillautx );

      otablex = $('#datatable-table').DataTable({
        "columnDefs": [
          { 'bSortable': false, 'aTargets': [4,5] }
    //      { "visible": false, "targets": 1 },
      //    { "visible": false, "targets": 2  }

        ]
      });







    }) // Fin Json


  } // Fin Funcion jalar_data


    function pjaxPageLoad(){

      jalar_data();



      $("#form1").on('submit', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        var form = $(this);

        form.parsley().validate();
        if (form.parsley().isValid()){
        var tipo_accion=$('#accion').val();

        switch(tipo_accion) {
            case "nuevo":
                destino = "ins";
                break;
            case "edita":
                destino = "upd";
                break;
            case "borra":
                destino = "del";
                break;
        }


          $.ajax({
            url:`tctarifas/${destino}`,
            data:$(this).serialize(),
            type:'POST',
            success:function(data){

              $('#datatable-table').dataTable().fnDestroy();
              limpiaForm('form1');
              jalar_data();
              $('#myModaledita').modal('hide');
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
      $('#myModaleditaLabel').html('Nueva Tarifa');
      $('#accion').val('nuevo');
      comboselect(null,Gruta+"tc_mt/tive_listar","Seleccione Tipo Vehiculo","item.ide_tipo_veh","item.tve_detalle","form1","sel_tip_veh"); // Tipo Vehiculo
      comboselect(null,Gruta+"tc_mt/serv_listar","Seleccione Tipo Servicio","item.ide_ser","item.ser_nom","form1","sel_tip_ser"); // Tipo Vehiculo
      $('#myModaledita').modal('show')
    })

    /*** Ver Registro ****/
    $("#datatable-table").on('click','.ver_registro',function() {

    var idr = $(this).attr('idr');
    console.log('Id de registro '+idr);
    $('#titulomodal').html('Editar Contacto');
    $('#accion').val('edita');
    var det_registro='';
    $.getJSON('tctarifas/listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        det_registro+=`
        <tr><th>Id Tarifa: </th> <td>${item.ide_ser_tve}</td></tr>
        <tr><th>Servicio: </th><td>${item.ser_nom}</td></tr>
        <tr><th>Tipo Vehiculo: </th><td>${item.tve_detalle}</td></tr>
        <tr><th>Precio: </th><td>${item.spr_precio}</td></tr>

        `;
      });
         $('#detalle_registro').html(det_registro);
        $('#myModalver').modal('show')
    });
    });
    /*** Edita Registro ****/
    $("#datatable-table").on('click','.edi_registro',function() {

    var idr = $(this).attr('idr');
    $('#myModaleditaLabel').html('Editar Tarifa');
    $('#accion').val('edita');

    $.getJSON('tctarifas/listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        $('#inp_text1').val(item.ide_ser_tve);
        $('#inp_text2').val(item.spr_precio);
        comboselect(item.ide_tipo_veh,Gruta+"tc_mt/tive_listar","Seleccione Tipo Vehiculo","item.ide_tipo_veh","item.tve_detalle","form1","sel_tip_veh"); // Tipo Vehiculo
        comboselect(item.ide_ser,Gruta+"tc_mt/serv_listar","Seleccione Tipo Servicio","item.ide_ser","item.ser_nom","form1","sel_tip_ser"); // Tipo Vehiculo

        });
      $('#myModaledita').modal('show')
    });
  });

    /*** Elimina Registro ****/
    $("#datatable-table").on('click','.bor_registro',function() {

      var idr = $(this).attr('idr');
      $('#myModaleditaLabel').html('Borrar Estado');
      $('#accion').val('borra');

      $.getJSON('tctarifas/listar/'+idr, function(data) { // Inicio JSON
        $.each(data, function(k,item){
          $('#inp_text1').val(item.ide_est);
          $('#inp_text2').val(item.des_est);
          });
        $('#myModaledita').modal('show')
      });
    });




});
