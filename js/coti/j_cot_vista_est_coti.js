$(function(){



  function jalar_data() {

    var grillautx='';
    var nrox=0;
    var otablex = {};
    $.getJSON(Gruta+'coti/Cot_mantenimiento/est_Coti_listar', function(data) {

      $.each(data, function(k,item){
        nrox++;
        grillautx=grillautx+`<tr >
        <td  >${item.ide_est_cot} </td>
        <td  >${item.det_est_cot} </td>
         <td class="ver_registro" idr="${item.ide_est_cot}" ><i class="fa fa-search"></i> </td>
         <td class="edi_registro" idr="${item.ide_est_cot}"><i class="fa fa-pencil"></i> </td>
         <td class="bor_registro" idr="${item.ide_est_cot}"><i class="fa fa-trash-o"></i> </td>
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
                destino = "est_Coti_ins";
                break;
            case "edita":
                destino = "est_Coti_upd";
                break;
            case "borra":
                destino = "est_Coti_del";
                break;
        }


          $.ajax({
            url:`${Gruta}coti/Cot_mantenimiento/${destino}`,
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
    $.getJSON(Gruta+'coti/Cot_mantenimiento/est_Coti_listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        det_registro+=`<tr><th>Id: </th> <td>${item.ide_est_cot}</td></tr>
        <tr><th>Tipo Movimiento </th><td>${item.det_est_cot}</td></tr>`;
      });
         $('#detalle_registro').html(det_registro);
        $('#myModalver').modal('show')
    });
    });
    /*** Edita Registro ****/
    $("#datatable-table").on('click','.edi_registro',function() {

    var idr = $(this).attr('idr');
    $('#myModaleditaLabel').html('Editar Estado');
    $('#accion').val('edita');

    $.getJSON(Gruta+'coti/Cot_mantenimiento/est_Coti_listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        $('#inp_text1').val(item.ide_est_cot);
        $('#inp_text2').val(item.det_est_cot);
        });
      $('#myModaledita').modal('show')
    });
  });

    /*** Elimina Registro ****/
    $("#datatable-table").on('click','.bor_registro',function() {

      var idr = $(this).attr('idr');
      $('#myModaleditaLabel').html('Borrar Tipo Movimiento');
      $('#accion').val('borra');

      $.getJSON(Gruta+'coti/Cot_mantenimiento/est_Coti_listar/'+idr, function(data) { // Inicio JSON
        $.each(data, function(k,item){
          $('#nom').val(item.det_est_cot);
          $('#ide').val(item.ide_est_cot);
          });
        $('#myModalborrar').modal('show')
      });
    });




});
