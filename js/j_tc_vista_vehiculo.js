$(function(){



  function jalar_data() {

    var grillautx='';
    var nrox=0;
    var otablex = {};
    $.getJSON(Gruta+'Tcvehiculo/move_listar/', function(data) {

      $.each(data, function(k,item){
        nrox++;
        grillautx=grillautx+`<tr >
        <td  >${item.veh_placa} </td>
        <td  >${item.tmv_detalle} </td>
        <td  >${item.tve_detalle} </td>
        <td  >${item.veh_year} </td>
        <td  >${item.veh_color} </td>
         <td class="ver_registro" idr="${item.ide_veh}" ><i class="fa fa-search"></i> </td>
         <td class="edi_registro" idr="${item.ide_veh}"><i class="fa fa-pencil"></i> </td>
         <td class="bor_registro" idr="${item.ide_veh}"><i class="fa fa-trash-o"></i> </td>
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


      comboselect(null,Gruta+'Tc_mt/move_listar','Modelo del vehiculo','item.ide_mve','item.tmv_detalle','form_veh','inp_text3')


      $(".select2").each(function(){
            //    alert('xxx');
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
                destino = "move_ins";
                break;
            case "edita":
                destino = "move_upd";
                break;
            case "borra":
                destino = "move_del";
                break;
        }


          $.ajax({
            url:`${Gruta}Tcvehiculo/${destino}`,
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
      $('#myModaleditaLabel').html('Nuevo Modelo de Vehiculo');
      $('#accion').val('nuevo');
      $('#myModaledita').modal('show')
    })

    /*** Ver Registro ****/
    $("#datatable-table").on('click','.ver_registro',function() {

    var idr = $(this).attr('idr');
  //  console.log('Id de registro '+idr);
  $('#myModalver #myModaleditaLabel').html('Datos Modelo de Vehiculo');
    $('#accion').val('edita');
    var det_registro='';
    $.getJSON(Gruta+'Tcvehiculo/move_listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        det_registro+=`<tr><th>Placa: </th> <td>${item.veh_placa}</td></tr>
        <tr><th>Modelo </th><td>${item.tmv_detalle}</td></tr>
        <tr><th>Año </th><td>${item.veh_year}</td></tr>
        <tr><th>Color </th><td>${item.veh_color}</td></tr>
        <tr><th>Tipo </th><td>${item.tve_detalle}</td></tr>
        <tr><th>Propietario </th><td>${item.cli_nom}</td></tr>
        <tr><th>Correo </th><td>${item.cli_email}</td></tr>
        <tr><th>Observaciones </th><td>${item.veh_gls}</td></tr>`;

      });
         $('#detalle_registro').html(det_registro);
        $('#myModalver').modal('show')
    });
    });
    /*** Edita Registro ****/
    $("#datatable-table").on('click','.edi_registro',function() {

    var idr = $(this).attr('idr');
    $('#myModaleditaLabel').html('Editar Modelo de Vehiculo');
    $('#accion').val('edita');

    $.getJSON(Gruta+'Tcvehiculo/move_listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        $('#inp_text1').val(item.ide_veh);
        $('#inp_text2').val(item.veh_placa);
        $('#inp_text3 > option[value='+item.ide_mve+' ]').attr('selected', 'selected');
        $('#inp_text4').val(item.veh_year);
        $('#inp_text5').val(item.veh_color);

        $('#select2-chosen-1').text(item.tmv_detalle);
        });
      $('#myModaledita').modal('show')
    });
  });

    /*** Elimina Registro ****/
    $("#datatable-table").on('click','.bor_registro',function() {

      var idr = $(this).attr('idr');
      $('#myModaleditaLabel').html('Borrar Modelo de Vehiculo');
      $('#accion').val('borra');

      $.getJSON(Gruta+'Tcvehiculo/move_listar/'+idr, function(data) { // Inicio JSON
        $.each(data, function(k,item){
          $('#nom').val(item.tmv_detalle);
          $('#ide').val(item.ide_veh);
          });
        $('#myModalborrar').modal('show')
      });
    });




});
