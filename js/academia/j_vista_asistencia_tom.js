$(function () {
  $.getJSON(Gruta+'academia/Asistencia/est_asis/'+Grupo,function (data) {
    var  list = '' ;
      $.each(data,function(i,item) {

        if (i%2) {
          var st = 'text-success'
        } else {
          var st = 'text-danger'
        }

        list+= `<a href="#" class="list-group-item">
                   <div class="checkbox-inline checkbox-ios pull-right">
                    <label for="${item.ide_estudiante}">
                        <input type="checkbox" id="${item.ide_estudiante}" disable="false" data-switchery="true" style="" name="est[]"  value="${item.ide_estudiante}">
                    </label>
                   </div>
                   <div class="">
                  <span class="pull-left">
                   <i class="fa fa-circle ${st} " style="margin-right: 20px;"></i>
                 </span>
                    <h5 class="no-margin">${item.est_nom} ${item.est_ape_pat} ${item.est_ape_mat}</h5>
                </div>
               <br>
             </a>`;

      })
      $('#list_alu').empty();
      $('#list_alu').append(list);

      $.each(data,function(i,item) {

        new Switchery(document.getElementById(item.ide_estudiante),{color: Sing.colors['brand-primary']});
      })
  })


  $('#form_asis_alu').on('submit', function (e) {
    e.preventDefault();
    var frr = $(this).serialize();
    $.ajax({
      url:Gruta+'academia/Asistencia/tom_asis',
      type:'post',
      data:frr,
      success:function (data) {
            if (data) {
              alert('Asistencia Tomada con exito');
              location.href =Gruta+'Asistencia/Ver';
            }
      },
    })
  })


  $("#list_alu ").on('dblclick' ,'.list-group-item',function(){
    alert('hey');
    console.log(this);
  });


})
