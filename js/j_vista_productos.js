$(function(){

  comboselect(null, Gruta+'minv/Inv_familia/familia_listar', 'Seleccione Familia', 'item.ide_familia','item.nom_fami', 'form_product','inp-text6')
  //comboselect(null, Gruta+'Productos/tip_prod_listar', 'Seleccione Tipo', 'item.ide_tipo_producto','item.detalle_tipo_prod', 'form_product','inp-text8')

  $('.cerrar_modal').click(function functionName() {
      $('#img-upload').remove();
  })


      $(document).on('change', '.btn-file :file', function() {
          var input = $(this),
              label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
          input.trigger('fileselect', [label]);
          });

          $('.btn-file :file').on('fileselect', function(event, label) {

              var input = $(this).parents('.input-group').find(':text'),
                  log = label;

              if( input.length ) {
                  input.val(log);
              } else {
                  if( log ) alert(log);
              }

          });
          function readURL(input) {
              if (input.files && input.files[0]) {
                  var reader = new FileReader();

                  reader.onload = function (e) {
                    $('#group_img').append('<img id="img-upload"  class="img-responsive" style="width: 40%; margin: 3% 0 0 5%; height:  40%;"/>')
                      $('#img-upload').attr('src', e.target.result);
                  }

                  reader.readAsDataURL(input.files[0]);
              }
          }

          $("#imgInp").change(function(){

              console.log(this);

              readURL(this);
          });


  function jalar_data() {

    var grillautx='';
    var nrox=0;
    var otablex = {};
    $.getJSON(Gruta+'Productos/prod_listar', function(data) {

      $.each(data, function(k,item){
        nrox++;

        grillautx=grillautx+`<tr >
        <td>${item.cod_prod} </td>
        <td>${item.nom_prod} </td>
        <td><img src="${Gruta}img/productos/${item.imagen}" style=" width: 30px;height:  30px;"></td>
        <td>${item.keywords} </td>
        <td>${item.precio_prod} </td>
         <td class="ver_registro" idr="${item.ide_producto}" ><i class="fa fa-search"></i> </td>
         <td class="edi_registro" idr="${item.ide_producto}"><i class="fa fa-pencil"></i> </td>
         <td class="bor_registro" idr="${item.ide_producto}"><i class="fa fa-trash-o"></i> </td>
         </tr> `;

      }) // Fin Each
      $('#grilladatos').html(grillautx );

      tabledatos = $('#datatable-table').DataTable({
        "aoColumnDefs": [
          { 'bSortable': false, 'aTargets': [ 3,4,5] }
        ],

        "oLanguage": {
          "sSearch": "Buscar: "
        }
      });


      $(".dataTables_length select").selectpicker({
        width: 'auto'
      });



      $('#datatable-table tbody').on( 'click', 'tr', function () {
    //    $(this).toggleClass('selected');

/*        var pos = tabledatos.row(this).index();
        var row = tabledatos.row(pos).data();
        var poscell = tabledatos.cell(pos,1).index();
        console.log('================');
        console.log(poscell);
        console.log(row[1]);
        console.log(row[2]);
*/
      } );

      //console.log(otable);


    }) // Fin Json


  } // Fin Funcion jalar_data


    function pjaxPageLoad(){

      jalar_data();



      $(".form_prod").on('submit', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        var form = $(this);

        form.parsley().validate();
        if (form.parsley().isValid()){
        var tipo_accion=$('#accion').val();

        switch(tipo_accion) {
            case "nuevo":
                destino = "prod_ins";
                break;
            case "edita":
                destino = "prod_upd";
                break;
            case "borra":
                destino = "prod_del";
                break;
        }
        var formxx = $(this);
        console.log(form);
        console.log(formxx);
        var formdata = false;

        if (window.FormData){
          console.log('XXXXX');
            formdata = new FormData(formxx[0]);
        }

          console.log(formdata);
          console.log(formxx.serialize());


          $.ajax({
            url:`${Gruta}Productos/${destino}`,
            data: formdata ? formdata : formxx.serialize(),
            contentType : false,
            processData : false,
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
              alert('sasax');
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
      $('#myModaleditaLabel').html('Nuevo Producto');
      $('#accion').val('nuevo');
      $('#img-upload').attr('src',"");

      $('#myModaledita').modal('show')
    })

    /*** Ver Registro ****/
    $("#datatable-table").on('click','.ver_registro',function() {

    var idr = $(this).attr('idr');
    $('#myModaleditaLabel').html('Detalle de producto');
    $('#accion').val('edita');
    var det_registro='';


    $.getJSON(Gruta+'Productos/prod_listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        det_registro+=`
        <tr><th>Codigo de Producto</th><td>${item.cod_prod} </td></tr>
        <tr><th>Nombre</th><td>${item.nom_prod} </td></tr>
        <tr><th>Nombre Completo</th><td>${item.nom_com_prod} </td></tr>
        <tr><th>Keywords</th><td>${item.keywords} </td></tr>
        <tr><th>Precio</th><td>${item.precio_prod} </td></tr>
        <tr><th>Descripcion</th><td> <textarea rows="5" cols="50" style="border: none;overflow: auto;">${item.gls_prod}</textarea></td></tr>
        <tr><th>Imagen</th><td><img src="${Gruta}img/productos/${item.imagen}" style="margin-left: 20%;width: 150px;height: 150px;"></td></tr>
         `;
      });
         $('#detalle_registro').html(det_registro);
        $('#myModalver').modal('show')
    });


    $.getJSON(Gruta+'Productos/get_mov/'+idr, function(data) {
      var det_mov = '';
        det_mov+=`<tr><th>Almacen</th><th>Tipo Mov.</th><th>Fecha</th><th>Detalle</th><th>Cantidad</th><th></th></tr>`;
        console.log(data);
        $.each(data,function (i,item) {

          if (parseInt(item.ide_tip_mov) == 2) {
            var color = '#ffabb0';
            var arrow = '<span class="glyphicon glyphicon-arrow-right"></span>';
          }else {
            var color = '#c3f1ba';
            var arrow = '<span class="glyphicon glyphicon-arrow-left"></span>';
          }

           det_mov+=`<tr style="background-color:${color};">
                              <td>${item.nom_almacen}</td>
                              <td>${item.nom_tipo_mov}</td>
                              <td>${item.fecha_mov}</td>
                              <td>${item.nom_det_mov}</td>
                              <td><center>${item.cant_mov}</center></td>
                              <td>${arrow}</td>
                        </tr>`
        })


        $('#u').html(det_mov);
    })



    $.getJSON(Gruta+'Productos/get_stock/'+idr, function(data) {
      var det_stock = '';
      var tot  =  0;
        det_stock+=`<tr><th>Almacen</th><th>Stock</th></tr>`;
        console.log(data);
        $.each(data,function (i,item) {
            tot+= parseInt(item.nro_stock);
          if (parseInt(item.nro_stock) <= parseInt(item.nro_alerta_stock)) {
            var color = 'red';
          }else {
            var color = '#000';
          }
           det_stock+=`<tr">
                        <td>${item.nom_almacen}</td>
                        <td><strong style="color: ${color};">${item.nro_stock}</strong></td>
                      </tr>`
        })


        $('#alm').html(det_stock);
        $('#tot').text(tot);
    })



    });



    /*** Edita Registro ****/
    $("#datatable-table").on('click','.edi_registro',function() {

    var idr = $(this).attr('idr');
    $('#myModaleditaLabel').html('Editar Producto');
    $('#accion').val('edita');
    $('#group_img').append('<img id="img-upload"  class="img-responsive" />')

    $.getJSON(Gruta+'Productos/prod_listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        $('#ida').val(item.ide_producto);
        $('#inp-text1').val(item.nom_prod);
        $('#inp-text2').val(item.nom_com_prod);
        $('#inp-text3').val(item.cod_prod);
        $('#inp-text4').val(item.keywords);
        $('#inp-text5').val(item.gls_prod);
        $('#inp-text7').val(item.precio_prod);
        $('#inp-text8').val(item.gls_prod);
        $('#img-upload').attr('src',"img/productos/"+item.imagen);
        comboselect(item.ide_tipo_producto, Gruta+'Productos/tip_prod_listar', 'Seleccione Tipo', 'item.ide_tipo_producto','item.detalle_tipo_prod', 'form_product','inp-text8')
        $.getJSON(Gruta+'minv/Inv_familia/familia_listar/'+item.ide_familia, function(familia) { // Inicio JSON
          $('#inp-text6 > option[value='+familia[0].ide_familia+' ]').attr('selected', 'selected');
        });



        });
      $('#myModaledita').modal('show')
    });
  });




    /*** Elimina Registro ****/
    $("#datatable-table").on('click','.bor_registro',function() {

      var idr = $(this).attr('idr');
      $('#myModaleditaLabel').html('Borrar Producto');
      $('#accion').val('borra');

      $.getJSON(Gruta+'Productos/prod_listar/'+idr, function(data) { // Inicio JSON
        $.each(data, function(k,item){
          $('#nom').val(item.nom_prod);
          $('#ide').val(item.ide_producto);
          });
        $('#myModalborrar').modal('show')
      });
    });




});
