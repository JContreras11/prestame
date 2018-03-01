var prod, alm;
$(function(){

        //producto
        comboselect(null,Gruta+'Productos/prod_listar','Ingrese Producto','item.ide_producto','item.nom_prod','form_mov','inp_text3')
        //Almacen
        comboselect(null,Gruta+'minv/Inv_almacen/mant_almacen_listar','Ingrese Almacen','item.ide_almacen','item.nom_almacen','form_mov','inp_text4')
        //Tipo de movimiento
        //comboselect(null,Gruta+'minv/Inv_mantenimiento/tipmov_listar','Tipo de Movimiento','item.ide_tip_mov','item.nom_tipo_mov','form_mov','inp_text5')
        //Detalle De Movimiento
        comboselect(null,Gruta+'minv/Inv_mantenimiento/detmov_listar','Detalle de Movimineto','item.ide_det_mov','item.nom_det_mov','form_mov','inp_text6')

  function jalar_data() {

    var grillautx='';
    var nrox=0;
    var otablex = {};

    $.getJSON(Gruta+'minv/Inv_movimientos/mov_listar', function(data) {

      $.each(data, function(k,item){
        nrox++;
        grillautx=grillautx+`<tr >
        <td  >${item.ide_mov} </td>
        <td  >${item.gls_mov} </td>
        <td  >${item.nom_prod} </td>
        <td  >${item.nom_almacen} </td>
        <td  >${item.nom_det_mov} </td>
        <td  >${item.cant_mov} </td>
         <td class="ver_registro" idr="${item.ide_mov}" ><i class="fa fa-search"></i> </td>
         <td class="edi_registro" idr="${item.ide_mov}"><i class="fa fa-pencil"></i> </td>
         <td class="bor_registro" idr="${item.ide_mov}"><i class="fa fa-trash-o"></i> </td>
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
                destino = "mov_ins";
                break;
            case "edita":
                destino = "mov_upd";
                break;
            case "borra":
                destino = "mov_del";
                break;
        }


          $.ajax({
            url:`${Gruta}minv/Inv_movimientos/${destino}`,
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
      $('#myModaleditaLabel').html('Nuevo Movimiento');
      $('#accion').val('nuevo');
      $('#myModaledita').modal('show')

      $('#select2-chosen-1').text('Ingrese Producto');
      $('#select2-chosen-2').text('Ingrese Almacen');
      $('#select2-chosen-3').text('Tipo de Movimiento');
      $('#select2-chosen-4').text('Detalle de Movimineto');

    })

    /*** Ver Registro ****/
    $("#datatable-table").on('click','.ver_registro',function() {

    var idr = $(this).attr('idr');
  //  console.log('Id de registro '+idr);
  $('#myModalver #myModaleditaLabel').html('Datos Movimineto');
    $('#accion').val('edita');
    var det_registro='';
    $.getJSON(Gruta+'minv/Inv_movimientos/mov_listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        det_registro+=`<tr><th>Id: </th> <td>${item.ide_mov}</td></tr>
        <tr><th>Glosa </th><td><textarea rows="5" cols="80" required class="form-control">${item.gls_mov}</textarea></td></tr>
        <tr><th>Producto</th><td>${item.nom_prod}</td></tr>
        <tr><th>Almacen </th><td>${item.nom_almacen}</td></tr>
        <tr><th>Tipo de movimiento </th><td>${item.nom_tipo_mov}</td></tr>
        <tr><th>Detalle de movimineto </th><td>${item.nom_det_mov}</td></tr>`;
      });
         $('#detalle_registro').html(det_registro);
        $('#myModalver').modal('show')
    });
    });
    /*** Edita Registro ****/
    $("#datatable-table").on('click','.edi_registro',function() {

    var idr = $(this).attr('idr');
    $('#myModaleditaLabel').html('Editar Movimiento');
    $('#accion').val('edita');

    $.getJSON(Gruta+'minv/Inv_movimientos/mov_listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        $('#inp_text1').val(item.ide_mov);
        $('#inp_text2').val(item.gls_mov);
        $('#inp_text7').val(item.cant_mov);
        $('#inp_text3 > option[value='+item.ide_producto+' ]').attr('selected', 'selected');
        $('#inp_text4 > option[value='+item.ide_almacen+' ]').attr('selected', 'selected');
        $('#inp_text5 > option[value='+item.ide_tip_mov+' ]').attr('selected', 'selected');
        $('#inp_text6 > option[value='+item.ide_det_mov+' ]').attr('selected', 'selected');


        $('#select2-chosen-1').text(item.nom_prod);
        $('#select2-chosen-2').text(item.nom_almacen);
        $('#select2-chosen-3').text(item.nom_tipo_mov);
        $('#select2-chosen-4').text(item.nom_det_mov);


        });
      $('#myModaledita').modal('show')
    });
  });

    /*** Elimina Registro ****/
    $("#datatable-table").on('click','.bor_registro',function() {

      var idr = $(this).attr('idr');
      $('#myModaleditaLabel').html('Borrar  Movimiento');
      $('#accion').val('borra');

      $.getJSON(Gruta+'minv/Inv_movimientos/mov_listar/'+idr, function(data) { // Inicio JSON
        $.each(data, function(k,item){
          $('#nom').val(item.nom_almacen);
          $('#ide').val(item.ide_almacen);
          });
        $('#myModalborrar').modal('show')
      });
    });





});
