$(function(){



  function jalar_data() {

    var grillautx='';
    var nrox=0;
    var otablex = {};
    $.getJSON('Man_est_eve/listar/null', function(data) {

      $.each(data, function(k,item){
        nrox++;

        grillautx=grillautx+`<tr >
        <td  >${item.ide_est} </td>
        <td  >${item.des_est} </td>
         <td class="ver_registro" idr="${item.ide_est}" ><i class="fa fa-search"></i> </td>
         <td class="edi_registro" idr="${item.ide_est}"><i class="fa fa-pencil"></i> </td>
         <td class="bor_registro" idr="${item.ide_est}"><i class="fa fa-trash-o"></i> </td>
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



      $('#datatable-table tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected');

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
            url:`man_est_eve/${destino}`,
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
      $('#myModaleditaLabel').html('Nuevo Estado');
      $('#accion').val('nuevo');
      $('#myModaledita').modal('show')
    })

    /*** Ver Registro ****/
    $("#datatable-table").on('click','.ver_registro',function() {

    var idr = $(this).attr('idr');
    console.log('Id de registro '+idr);
    $('#titulomodal').html('Editar Contacto');
    $('#accion').val('edita');
    var det_registro='';
    $.getJSON('Man_est_eve/listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        det_registro+=`<tr><th>Id Evento: </th> <td>${item.ide_est}</td></tr>
        <tr><th>Detalle: </th><td>${item.des_est}</td></tr>`;
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

    $.getJSON('Man_est_eve/listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        $('#inp_text1').val(item.ide_est);
        $('#inp_text2').val(item.des_est);
        });
      $('#myModaledita').modal('show')
    });
  });

    /*** Elimina Registro ****/
    $("#datatable-table").on('click','.bor_registro',function() {

      var idr = $(this).attr('idr');
      $('#myModaleditaLabel').html('Borrar Estado');
      $('#accion').val('borra');

      $.getJSON('Man_est_eve/listar/'+idr, function(data) { // Inicio JSON
        $.each(data, function(k,item){
          $('#inp_text1').val(item.ide_est);
          $('#inp_text2').val(item.des_est);
          });
        $('#myModaledita').modal('show')
      });
    });




});
