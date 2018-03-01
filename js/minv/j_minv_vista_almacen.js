
$(function(){


  function jalar_data() {

    var grillautx='';
    var nrox=0;
    var otablex = {};
    $.getJSON(Gruta+'minv/Inv_almacen/mant_almacen_listar', function(data) {

      if (data[0].detalle == "No hay Registros") {
        grillautx=grillautx+`<div>
          No hay Almacenes
        </div> `


      }else {



      $.each(data, function(k,item){
        nrox++;
        grillautx=grillautx+`<div class="col-sm-6 col-md-3 gallery-item" data-groups='["nature"]' data-title="Mountains">
            <div class="thumbnail">
                <a href="almacen/${item.ide_almacen}"><img src="${Gruta}img/Almacen.png" alt="...">
                <div class="caption">
                    <h5 class="mt-0 mb-xs">${item.nom_almacen}</h5>
                </div></a>
            </div>
        </div> `;

      }) // Fin Each

      }
      $('#grid').html(grillautx );

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
      comboselect(null,Gruta+'Productos/prod_listar','Seleccione Producto','item.ide_producto','item.nom_prod','form1','inp_text1');
      comboselect(null,Gruta+'minv/Inv_almacen/mant_almacen_listar','Seleccione Alamcen','item.ide_almacen','item.nom_almacen','form1','inp_text2');
      //Tipo de movimiento
      comboselect(null,Gruta+'minv/Inv_mantenimiento/tipmov_listar','Tipo de Movimiento','item.ide_tip_mov','item.nom_tipo_mov','form1','inp_text3')
      //Detalle De Movimiento
      comboselect(null,Gruta+'minv/Inv_mantenimiento/detmov_listar','Detalle de Movimineto','item.ide_det_mov','item.nom_det_mov','form1','inp_text4')



      $("#form1").on('submit', function(e){  // Cambio de id a clase
        e.preventDefault();
        e.stopImmediatePropagation();
        var form = $(this);

        form.parsley().validate();
        if (form.parsley().isValid()){
        var tipo_accion=$('#accion').val();

        switch(tipo_accion) {
            case "nuevo":
                destino = "mant_almacen_ins";
                break;
            case "edita":
                destino = "mover";
                break;
            case "borra":
                destino = "";
                break;
        }


          $.ajax({
            url:`${Gruta}minv/Inv_almacen/${destino}`,
            data:$(this).serialize(),
            type:'POST',
            success:function(data){

              $('#datatable-table').dataTable().fnDestroy();
              limpiaForm('form1');
              jalar_data();
              location.reload()
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
    $("document").ready(function() {

      if (idr) {


          var det_registro='';
          $.getJSON(Gruta+'minv/Inv_almacen/get_stock/'+idr, function(data) {
            det_registro+=`<tr><th>Producto</th><td>Stock</td><td>Codigo</td><td>Comercial</td><td>imagen</td><td>Keywords</td></tr>`;
            $.each(data, function(k,item){

              if (parseInt(item.nro_stock) < parseInt(item.nro_alerta_stock)) {
                var color = 'red';
              }else {
                var color = '#000';
              }
              det_registro+=`<tr><th>${item.nom_prod}</th><td><strong style="color: ${color};">${item.nro_stock}</strong></td><td>${item.cod_prod}</td><td>${item.nom_com_prod}</td><td><img src="${Gruta}img/productos/${item.imagen}" style=" width:  40px;"></td><td>${item.keywords}</td></tr>
              `;
            });
               $('#detalle_registro').html(det_registro);
          });


          // verde : style="background-color: #c3f1ba;"
          // rojo : style="background-color: #ffabb0;"


          $.getJSON(Gruta+'minv/Inv_almacen/get_mov/'+idr, function(data) {
            var det_mov = '';
              det_mov+=`<tr><th>Producto</th><td>Tipo Mov.</td><td>Fecha</td><td>Detalle</td><td>Cantidad</td><td></td></tr>`;
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
                                    <th>${item.nom_prod}</th>
                                    <td>${item.nom_tipo_mov}</td>
                                    <td>${item.fecha_mov}</td>
                                    <td>${item.nom_det_mov}</td>
                                    <td>${item.cant_mov}</td>
                                    <td>${arrow}</td>
                              </tr>`
              })


              $('#u').html(det_mov);
          })
      }

    });



    /*** Edita Registro ****/
    $("#edi").click(function() {
    $('#myModaleditaLabel').html('Mover Producto');
    $('#accion').val('edita');

    $.getJSON(Gruta+'minv/Inv_almacen/mant_almacen_listar/'+idr, function(data) { // Inicio JSON
    /*  $.each(data, function(k,item){
        $('#inp_text1').val(item.ide_almacen);
        $('#inp_text2').val(item.nom_almacen);
      });*/
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
