  $('#botonMostrar').click(function(){
    $('#tablaUsuarios').html(
      "<tr class='tablaEncabezado'>"+
          "<th style='width: 10px'>ID</th>"+
          "<th>Nombre</th>"+
          "<th>Apodo</th>"+

      "</tr>"
    );
    $.post(base_url+"cUsuario/mostrar",
      function(data){
        var obj=JSON.parse(data);
        $.each(obj,function(i,item){

          $('#tablaUsuarios tbody').append(
            "<tr class='resultadoTabla'>"+
                "<td class='id_user' id="+item.id_user+">"+item.id_user+"</td>"+
                "<td class='user' id="+item.user+">"+item.user+ "</th>"+
                "<td class='apodo' id="+item.apodo+">"+item.apodo+"</th>"+
                "<td><button type='button' id='Modificar' class='modificar'>Modificar</button></td>"+
                "<td><button type='button' id='Eliminar' class='eliminar'>Eliminar</button></td>"+
            "</tr>"


          );
        });
          $(".modificar").click(function(){
            var index=$('.modificar').index(this);
            var id_user=$('.id_user:eq('+index+')').attr('id');
            var user=$('.user:eq('+index+')').attr('id');
            var apodo=$('.apodo:eq('+index+')').attr('id');

          $('#tablaUsuarios').html(
            "<tr class='tablaEncabezado'>"+

                "<th>Nombre</th>"+
                "<th>Apodo</th>"+

            "</tr>"
          );
          $('#tablaUsuarios tbody').append(
            "<tr class='resultadoTabla'>"+

                "<td><input type='text' value="+user+" id='userModificado'></td>"+
                "<td><input type='text' value="+apodo+" id='apodoModificado'></td>"+
                "<td><button type='button' id='guardar' class='guardar'>Guardar</button></td>"+
            "</tr>"


          );
         $('#guardar').click(function(){
              var userModificado=$('#userModificado').val();
              var apodoModificado=$('#apodoModificado').val();

              $.post(base_url+"cUsuario/modificar",
                {
                  id_user:id_user,
                  userModificado:userModificado,
                  apodoModificado:apodoModificado
                },
                function(data){
                  aler("Modificado con éxito")
                })
            })
        })
        $('.eliminar').click(function(){
          var index=$('.eliminar').index(this);
          var id_user=$('.id_user:eq('+index+')').attr('id');
          alert(id_user)
          $.post(base_url+"cUsuario/eliminar",
          {
            id_user:id_user
          },
          function(data){

          })
        })
      })
    })
