
class Lista {
  constructor(cliente, coti) {
    this.cliente = cliente;
    this.coti = coti;
    this.productos = [];
    this._subTotal = 0;
    this._total= 0;
    this._igv = 0;
    this._descuento =  0;
  }


  agregar(prod){
    this.productos.push(prod);
 }

 remover(ind){
   this._subTotal = this._subTotal - this.productos[ind].cot_precio;
   this.igv();
   this.total();
   this.productos.splice(ind,1)
 }

 subTotal(){
    var x = 0;
    var t;
   $.each(this.productos, function (i,item) {
     t= item.cot_precio;
     x+= t;
   })
   this._subTotal = x.toFixed(2);
   this._subTotal = parseFloat(this._subTotal);
   return t.toFixed(2);
 }


 igv(){
    this._igv = this._subTotal*0.18;
    this._igv = parseFloat(this._igv.toFixed(2));
 }


 total(){
    this._total = parseFloat(this._igv + this._subTotal);

 }

}



var lista;
var sim;
var items = [];

$(function(){
  pjaxPageLoad();
  SingApp.onPageLoad(pjaxPageLoad);



  $('#ide_tip_moneda').change(function () {
    let id = $(this).val()
      $.getJSON(Gruta+'coti/Cot_mantenimiento/tip_Mon_listar/'+id, function (data) {
          if (data.length === 1) {
            $.each(data, function (i,item) {
              sim = item.sim_moneda;
            })
          }
      });

  })

  $('#nom_cli').change(function () {
      let id = $(this).val()
      var cli,coti;
      $.getJSON(Gruta+'public/Clientes/cli_listar/'+id, function (data) {
        if (data.length === 1) {
          $.each(data, function (i,item) {
            $('#inp_ape_pat').val(item.cli_ape_pat)
            $('#inp_ape_mat').val(item.cli_ape_mat)
            $('#doc').val(item.cli_doc)
            $('#mail').val(item.cli_email)
            $('#ruc').val(item.cli_ruc)
            $('#dir').val(item.cli_dir)
            $('#inp_tel_cli1').val(item.cli_tel1)
            $('#inp_tel_cli2').val(item.cli_tel2)


            cli = {
              email_destino:item.cli_email,
              nombre_destino:item.cli_nom,
              telefono_destino:item.cli_tel1,
            }
          })

          coti = {
            ide_est_cot:$('#est_coti').val(),
            prefijo:$('#prefijo').val(),
            serie:$('#serie').val(),
            numero:$('#numero').val(),
            fecha:$('#fecha_ini').val(),
            fecha_venciento:$('#fecha_fin').val(),
            gls_cotizacion:$('#glosa').val(),
            ide_tip_mon:$('#ide_tip_moneda').val(),
          }

            lista= new Lista(cli,coti);
            $('#list_prod_u').removeAttr('disabled')

        }
      })
  })


  $('#list_prod_u').change(function () {
    let id = $(this).val()
    $('#ide_prod_selected').val(id);

    $.getJSON(Gruta+'Productos/have_files/'+id, function (data){
      if (data.length < 0) {
        console.log(data);
      }
    })


    $.getJSON(Gruta+'Productos/prod_listar/'+id, function (data) {
      if (data.length === 1) {
        $.each(data, function (i,item) {
          $('#precio').val(item.precio_prod)
        })
      }
    })
  })


  $('#nuevoCliente').click(function() {
    $('#modalnuevoCliente').modal('show');
  })


  $("#form2").on('submit', function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    var form = $(this);
    form.parsley().validate();
    if (form.parsley().isValid()){
      $.ajax({
        url:`${Gruta}public/Clientes/cli_ins`,
        data:$(this).serialize(),
        type:'POST',
        success:function(data){
          if (typeof(data) === "number") {
            $('#nombre_cli').empty();
            $('#nombre_cli').append('<input readonly="true" type="text" placeholder="" id="nom_cli" name="nom_cli" class="form-control" required="required" >');

            $.getJSON(Gruta+'public/Clientes/cli_listar/'+data, function (data) {
              if (data.length === 1) {
                $.each(data, function (i,item) {
                  $('#nom_cli').val(item.cli_nom)
                  $('#inp_ape_pat').val(item.cli_ape_pat)
                  $('#inp_ape_mat').val(item.cli_ape_mat)
                  $('#doc').val(item.cli_doc)
                  $('#mail').val(item.cli_email)
                  $('#ruc').val(item.cli_ruc)
                  $('#dir').val(item.cli_dir)
                  $('#inp_tel_cli1').val(item.cli_tel1)
                  $('#inp_tel_cli2').val(item.cli_tel2)
                })
              }
            })
          }
          $('#datatable-table').dataTable().fnDestroy();
          limpiaForm('form2');
          $('#myModaledita').modal('hide');
          $('#modalnuevoCliente').modal('hide');
        },
        error:function(data){
          alert('Error');
        }
      });

    }
  });




  $('#add').click(function () {
    let id =  $('#ide_prod_selected').val();
    let a = $('#L_Productos').html();
    var pre = $('#precio').val()
    var cant = $('#cant').val()

    let pantalla = a;
    if (cant != '') {
      if (items.indexOf(parseInt(id)) ===  -1) {
          items.push(parseInt(id));
        var prod;
        $.getJSON(Gruta+'Productos/prod_listar/'+id, function (data) {
          if (data.length === 1) {

            prod = {
                ide_producto:id,
                cot_cantidad:parseFloat(cant),
                cot_precio: parseFloat(cant) * parseFloat(pre),
            }

            lista.agregar(prod);
            var precio = lista.subTotal();
            lista.igv();
            lista.total();

            $.each(data, function (i,item) {
                pantalla+=`
                    <div class="row">
                    <div class="col-lg-4">
                      <input class="form-control " id="" name="list_prod_u" readonly="true" value="${item.nom_prod}">
                      </div>
                      <div class="col-lg-2">
                        <div class="input-group">
                              <span class="input-group-addon">${sim}</span>
                                <input class="form-control"  type="number" placeholder="Precio" value="${precio}" readonly="true">
                            </div>
                      </div>
                      <div class="col-lg-2">

                      <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-cubes"></i></span>
                              <input class="form-control"  min="1" type="number" placeholder="Cantidad" value="${cant}" readonly="true">
                          </div>

                      </div>
                      <div class="col-lg-2">
                      <input class="form-control"  type="hidden" value="${id}">
                      <button type="button" name="button" class="btn btn-danger remover" id="">-</button>
                      </div>
                      <hr><br>
                      </div>
                                  `;
            })


            $('#ide_prod_selected').val('');
            $('#list_prod_u').val('');
            $('#select2-chosen-4').text(' Seleccione Producto ');
            $('#precio').val('')
            $('#cant').val('')
            $('#L_Productos').html(pantalla);
            $('#wfoot').html(foot)
            $('#sub').text(lista._subTotal)
            $('#igv').text(lista._igv)
            $('#des').text(lista._descuento)
            $('#tot').text(lista._total)
            $('.simbolo').text(sim)
          }
        })
      }else {
        alert('El Producto ya se encuentra en la lista');
      }
    }else {
      alert('Debe ingresar una cantidad valida');
    }




  })




  $('#L_Productos').on('click','.remover', function(){
    var id = $(this).prev().val()
    let  index = items.indexOf(parseInt($(this).prev().val()))
    $.each(lista.productos, function (i,item) {
      if (item.ide_producto ===  id ) {
          lista.remover(i);
      }
    })
    $('#sub').text(lista._subTotal)
    $('#igv').text(lista._igv)
    $('#des').text(lista._descuento)
    $('#tot').text(lista._total)
    if (index != -1) items.splice(index,1);
    $(this).parent().parent().remove();

  })

  $('#do').click(function () {
    if (typeof lista !== "undefined") {
      if (lista.productos.length !== 0) {
          console.log(lista);
          $.ajax({
            url:Gruta+'coti/Cot_cotizacion/nueva_cotizacion_ins',
            type:'post',
            data:lista,
            success: function(data) {
                console.log(data);
            },

          })
      }else {
        alert('Debe ingresar almenos (1) producto ')
      }
    }else {
      alert('Debe ingresar el cliente ')
    }
  })




});




var foot = `<div class="list-group list-group-lg ">
        <div class="list-group-item">
          <strong>Subtotal: <span class="simbolo"></span></strong><label for="" id="sub"> 0.00</label>
        </div>
        <div class="list-group-item">
          <strong>IGV (18%): <span class="simbolo"></span></strong>  <label for="" id="igv"> 0.00</label>
        </div>
        <div class="list-group-item">
          <strong>Descuento: <span class="simbolo"></span></strong><label for="" id="des"> 0.00</label>
        </div>
        <div class="list-group-item">
          <strong>Total: <span class="simbolo"></span> </strong><label for="" id="tot"> 0.00</label>
        </div>
    </div>`;






function pjaxPageLoad(){

  $(".select2").each(function(){
   $(this).select2($(this).data());
  });
  comboselect(null,Gruta+'public/Clientes/cli_listar','Seleccione Cliente','item.ide_cliente','item.cli_nom','form_cli','nom_cli');
  comboselect(null,Gruta+'coti/Cot_mantenimiento/est_Coti_listar','Seleccione Estado','item.ide_est_cot','item.det_est_cot','form_coti','est_coti');
  comboselect(null,Gruta+'coti/Cot_mantenimiento/tip_Mon_listar','Seleccione Moneda','item.ide_tip_mon','item.detalle_tip_mon','form_coti','ide_tip_moneda');
  comboselect(null,Gruta+'Productos/prod_listar','Seleccione Producto','item.ide_producto','item.nom_prod','form_prod','list_prod_u');
}
