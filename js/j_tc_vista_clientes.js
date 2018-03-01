$(function(){



  function jalar_data() {

    var grillautx='';
    var nrox=0;
    var otablex = {};
    $.getJSON('Tcclientes/listar', function(data) {

      $.each(data, function(k,item){
        nrox++;


        grillautx=grillautx+`<tr >
        <td >   ${item.ide_cliente}  </td>
        <td  > ${item.cli_nom} </td>
        <td  >${item.cli_ape_pat} </td>
        <td  >${item.cli_ape_mat}</td>
        <td  >${item.cli_dir}</td>
        <td  >${item.cli_doc} </td>
        <td  >${item.cli_email} </td>
         <td class="ver_registro"  idr="${item.ide_cliente}" ><i class="fa fa-search"></i> </td>
         <td class="edita_registro" idr="${item.ide_cliente}"><i class="fa fa-pencil"></i> </td>
         <td class="borra_registro" idr="${item.ide_cliente}"><i class="fa fa-trash-o"></i> </td>
         </tr> `;

      }) // Fin Each
      $('#grilladatos').html(grillautx );

      otablex = $('#datatable-table').DataTable({
        "columnDefs": [
    //      { "visible": false, "targets": 1 },
      //    { "visible": false, "targets": 2  }

        ]
      });


      $(".dataTables_length select").selectpicker({
        width: 'auto'
      });



      $('#datatable-table tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected');



      } );

      //console.log(otable);


    }) // Fin Json


  } // Fin Funcion jalar_data


    function pjaxPageLoad(){
      console.log('Iniciamos la Carga');

      jalar_data();

      //console.log(jalar_data());
      $("#form1").on('submit', function(e){
        e.preventDefault();
        var form = $(this);
        form.parsley().validate();
        if (form.parsley().isValid()){
          $.ajax({
            url:'eventos/new_eve',
            data:$(this).serialize(),
            type:'POST',
            success:function(data){
              console.log(data);
              $('#datatable-table').dataTable().fnDestroy();
              markerSource.clear();
              vectorSource.clear();
              limpiaForm('form1');
              jalar_data();
              //   $("#success").show().fadeOut(20000); //=== Show Success Message==
            },
            error:function(data){
              // $("#error").show().fadeOut(20000); //===Show Error Message====
            }
          });

        }
      });


    }

    pjaxPageLoad();
    SingApp.onPageLoad(pjaxPageLoad);

    /*** Ver Registro ****/
    $("#datatable-table").on('click','.ver_registro',function() {

    var idr = $(this).attr('idr');
    console.log('Id de registro '+idr);
    $('#myModalLabel').html('Datos Cliente');
    $('#accion').val('edita');
    var det_registro='';


    $.getJSON('Tcclientes/listar/'+idr, function(data) { // Inicio JSON
      console.log(data)
      $.each(data, function(k,item){
        det_registro+=`<tr>
        <th>Documento identidad: </th>
        <td>${item.cli_doc}</td></tr>
        <tr><th>Nombre: </th>
        <td>${item.nombrecompleto}</td></tr>
        <tr><th>Apellido paterno: </th>
        <td>${item.cli_ape_pat}</td></tr>
        <tr><th>Apellido Materno: </th>
        <td>${item.cli_ape_mat}</td></tr>
        <tr><th>Email: </th>
        <td>${item.cli_email}</td></tr>`

      });
         $('#detalle_registro').html(det_registro);
        $('#myModalver').modal('show')
    });
    });



    /*** Edita Registro ****/
    $("#datatable-table").on('click','.edita_registro',function() {
    var idr = $(this).attr('idr');
    $('#titulomodal').html('Editar Contacto');
    $('#accion').val('edita');

    $.getJSON('Tcclientes/listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        $('#inp-text1').val(item.cli_doc);
        $('#inp-text2').val(item.cli_nom);
        $('#inp-text3').val(item.cli_ape_pat);
        $('#inp-text4').val(item.cli_ape_mat);
        $('#inp-text5').val(item.cli_email);
        $('#inp-text6').val(item.cli_dir);
        $('#inp-text7').val(item.cli_gls);
        $('#inp_tel_cli1').val(item.cli_tel1);
        $('#inp_tel_cli2').val(item.cli_tel2);
        $('#ide').val(item.ide_cliente);

        if (item.cli_notifica == "1") {
            $('#inp-text8').attr('checked','checked');
            $('#inp-text8').val(item.cli_notifica);
        }else {
            $('#inp-text8').removeAttr('checked');
            $('#inp-text8').val('0');
        }

      });
      $('#myModaledita').modal('show')
    });
  });

    /*** Elimina Registro ****/
    $("#datatable-table").on('click','.borra_registro',function() {
      $('#myModalborrar').modal('show');
      $('#ide').val($(this).attr('idr'));

    });

    $('#deleteClient').click(function(e) {
          e.preventDefault();
          var idr = $('#ide').val();
          $.ajax({
            url:`${Gruta}Tcclientes/del`,
            type:'POST',
            data:{id: idr},
            success: function(data) {
              $('#datatable-table').dataTable().fnDestroy();
              jalar_data();
              $('#myModalborrar').modal('hide');
            },
            error:function(data){
              alert('Error');
              // $("#error").show().fadeOut(20000); //===Show Error Message====
            }
          });


    })


    $("#btnNuevo").click(function() {
      limpiaForm('myModaledita');
      $('#myModaleditaLabel').html('Nuevo Empleado');
      $('#accion').val('nuevo');
      $('#myModaledita').modal('show')
    })


        $('#inp-text8').change(function () {
          if ($(this).attr('checked')) {
            
            $(this).val('0')
            $(this).removeAttr('checked')
          } else {
            
            $(this).val('1')
            $(this).attr('checked','checked')
          }
        });


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
            url:`${Gruta}Tcclientes/${destino}`,
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



});
