$(function () {



  $.getJSON(Gruta+'academia/Asistencia/asis_listar_alu/'+asis,function (data) {
    var a = [];
    $.each(data, function(i,item) {
            a[i]= item.ide_estudiante;
    })
      $.getJSON(Gruta+'academia/Asistencia/est_asis/'+Grupo,function (data) {
        var  list = '' ;
          $.each(data,function(i,item) {
            list+= `<a href="#" class="list-group-item">
                       <div class="checkbox-inline checkbox-ios pull-right">
                        <label for="${item.ide_estudiante}">
                            <input type="checkbox" id="${item.ide_estudiante}" disable="false" data-switchery="true" class="alu" style="" name="est[]"  value="${item.ide_estudiante}">
                        </label>
                       </div>
                    <h5 class="no-margin">${item.est_nom} ${item.est_ape_pat} ${item.est_ape_mat}</h5>
                   <br>
                 </a>`;
          })
          $('#list_alu').empty();
          $('#list_alu').append(list);

          $.each(data,function(i,item) {
            if (a.indexOf(item.ide_estudiante) >= 0) {
              $('#'+item.ide_estudiante).attr('checked','checked');
            }
            new Switchery(document.getElementById(item.ide_estudiante),{color: Sing.colors['brand-primary']});
          })
      });
    })




  $('#form_asis_alu').on('submit', function (e) {
    e.preventDefault();
    var frr = $(this).serialize();
    $.ajax({
      url:Gruta+'academia/Asistencia/edi_asis',
      type:'post',
      data:frr,
      success:function (data) {
            if (data) {
              alert('Asistencia Editada con exito');
              location.href =Gruta+'Asistencia/Ver';
            }
      },
    })
  })
})
