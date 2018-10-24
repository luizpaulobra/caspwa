// Dom7
var $$ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
  id: 'com.app.cas',
  root: '#app',
  theme: theme,
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  routes: routes,
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },
});

function apMask() {
  //$('#telefone').mask('(99)9999-9999?9');
  var SPMaskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
  },
  spOptions = {
    onKeyPress: function(val, e, field, options) {
        field.mask(SPMaskBehavior.apply({}, arguments), options);
    },
    placeholder: "(  )        "
  };

  $('#telefone').mask(SPMaskBehavior, spOptions);
}

function listaAero() {

var hli = '';

$.getJSON('http://www.cas-online.org.br/app/api.php?acao=aeronaves', function(data){

  $.each(data, function(kv,vv){

    hli += '<li>';
    hli += '  <a href="/informacoes/'+vv.id+'/aeronave" class="item-link item-content">';
    hli += '  <div class="item-inner">';
    hli += '    <div class="item-title-row">';
    hli += '    <div class="item-title"><b>'+vv.prefixo+'</b></div>';
    hli += '    </div>';
    hli += '    <div class="item-subtitle">'+vv.empresa+'</div>';
    hli += '  </div>';
    hli += '  </a>';
    hli += '</li>';

  });

  $('.app-list').append(hli);

  $('#ipbusca').mask('SS-SSS',{placeholder: "  -   "});

  app.preloader.hide();
});

}

function ordemDistancia() {

var hli = '';
var locais = GoogleMap.places;
$('.app-list').html('');
$('#btniveis').hide();
$('#btnalfa').hide();
$('.btdistancia').removeClass('bg-color-blue').addClass('bg-color-orange');
//$('.btnivel').removeClass('bg-orange').addClass('bg-blue');
$('.btalfa').removeClass('bg-color-orange').addClass('bg-color-blue');
sortResults(locais,'dist',true);

console.log(locais);

$.each(locais, function(ki,vi){

    hli +='<li>';
    hli +='  <a href="/informacoes/'+ki+'/listar" class="item-link item-content">';
    hli +='    <div class="item-inner">';
    hli +='      <div class="item-title-row">';
    hli +='        <div class="item-title"><b>'+vi.nome+'</b></div>';
    hli +='      </div>';
    if (vi.dist != undefined) {
        if (vi.dist >= 999999) {
        hli += '??? Km';
        } else {
        hli += moeda.formatar(vi.dist)+' Km';
        }
    }
    hli +='      <div class="item-subtitle">'+vi.endereco+' '+vi.cidade+' - '+vi.estado+'</div>';
    hli +='      ';
    hli +='    </div>';
    hli +='  </a>';
    hli +='</li>';

});

$('.app-list').append(hli);

}

function ordemAlfa(numnivel) {

var atn = '';
var locais = GoogleMap.places;
$('.app-list').html('');
$('#btnalfa').show();
$('#btniveis').hide();
$('.btalfa').removeClass('bg-color-blue').addClass('bg-color-orange');
$('.btdistancia').removeClass('bg-color-orange').addClass('bg-color-blue');
$('.btnivel').removeClass('bg-color-orange').addClass('bg-color-blue');
sortResults(locais,'nome',true);
//sortResults(locais,'nivel',true);

var hli = '';
if (numnivel == null) {
//hli = '<li><div class="item-divider">Todos Níveis CAS</div></li>';
} else {
//hli = '<li><div class="item-divider">CAS Nível '+pn(numnivel)+'</div></li>';
}

$('.app-list').append(hli);

$.each(locais, function(ki,vi){
    var hli = '';
    /*if (vi.nivel != atn) {
          
          atn = vi.nivel;
    }*/
    /*hli +='<li><a href="informacoes.html?id='+ki+'&direcao=listar" class="item-link item-content" data-ignore-cache="true"><div class="item-inner">';
    hli +='<p><b>'+vi.nome+'</b><br>';
    hli +='<span style="font-size: 13px;"><i class="fa fa-location-arrow" aria-hidden="true"></i> ';
    if (vi.dist != undefined) {
        if (vi.dist >= 999999) {
        hli += '??? Km';
        } else {
        hli += moeda.formatar(vi.dist)+' Km';
        }
    }
    hli +=' '+vi.endereco+' '+vi.cidade+' - '+vi.estado+'</span>';
    hli +='</p>';
    hli +='</div></a></li>';*/

    hli +='<li>';
    hli +='  <a href="/informacoes/'+ki+'/listar" class="item-link item-content">';
    hli +='    <div class="item-inner">';
    hli +='      <div class="item-title-row">';
    hli +='        <div class="item-title"><b>'+vi.nome+'</b></div>';
    hli +='      </div>';
    if (vi.dist != undefined) {
        if (vi.dist >= 999999) {
        hli += '??? Km';
        } else {
        hli += moeda.formatar(vi.dist)+' Km';
        }
    }
    hli +='      <div class="item-subtitle">'+vi.endereco+' '+vi.cidade+' - '+vi.estado+'</div>';
    hli +='      ';
    hli +='    </div>';
    hli +='  </a>';
    hli +='</li>';

    if (numnivel == vi.nivel) {
      $('.app-list').append(hli);
    } else if (numnivel == null) {
      $('.app-list').append(hli);
    }
});

}

function sortResults(people, prop, asc) {
    people = people.sort(function(a, b) {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
}

function haversine(lat1,lng1,lat2,lng2,unit) {
  unit = unit || 'km'
  // Converts degrees to Rads

  if (typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function() {
      return this * Math.PI / 180;
    }
  }

  var R = '';
  if (unit == 'km') {
    R = 6371; // km
  } else {
    R = 3959; // mi
  }
  var dLat = (parseFloat(lat2)-parseFloat(lat1)).toRad();
  var dLon = (parseFloat(lng2)-parseFloat(lng1)).toRad();
  var lat1 = parseFloat(lat1).toRad();
  var lat2 = parseFloat(lat2).toRad();

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;

  return d;
}

function pn(pn) {
  if (pn == 1) {
    pn = 'I';
  } else if (pn == 2) {
    pn = 'II';
  } else if (pn == 3) {
    pn = 'III';
  }
  return pn;
}

function inicio() {
  document.body.style.height = window.outerHeight + 'px';

  if (window.localStorage.getItem('usernome') === undefined || window.localStorage.getItem('usernome') === null) {
    app.router.navigate('/cadastro',{
      animate: false
    });
  } else {
    app.router.navigate('/mapa',{
      animate: false
    });
  }
}

inicio();

$$(document).on('page:init', function (e, page) {

if (page.name == 'home') {

  console.log('home');

  inicio();

}

if (page.name == 'cadastro') {

  /*setTimeout(function(){
    apMask();
  },800);

  $$('#envio').on('click', function () {
    if ($('input[name="nome"]').val() != '' && $('input[name="email"]').val() != '' && $('input[name="telefone"]').val() != '' && $('input[name="cidade"]').val() != '' && $('select[name="estado"]').val() != '') {
      app.preloader.show();
      $.post('http://www.cas-online.org.br/app/api.php?acao=cadastro',{
        nome: $('input[name="nome"]').val(),
        email: $('input[name="email"]').val(),
        telefone: $('input[name="telefone"]').val(),
        cidade: $('input[name="cidade"]').val(),
        estado: $('select[name="estado"]').val()
      }, function(data){
        app.preloader.hide();
        if (data == 'ok') {
          window.localStorage.setItem('usernome',$('input[name="nome"]').val());
          window.localStorage.setItem('useremail',$('input[name="email"]').val());
          window.localStorage.setItem('usertelefone',$('input[name="telefone"]').val());
          window.localStorage.setItem('usercidade',$('input[name="cidade"]').val());
          window.localStorage.setItem('userestado',$('select[name="estado"]').val());
          app.router.navigate('/mapa');
        }
      }).fail(function(){
        app.preloader.hide();
        alert('Falha no cadastro. Verifique sua conexão.');
      });
    } else {
      alert('Preencha todos os campos');
    }
  });*/

}

if (page.name == 'mapa') {

  /*console.log('device pronto');

  $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAzsEQsq09kdOb_KfKMt-RZvyAaNb8VwD0', function() {

  var GoogleMap = {
        map: null,
        markers: {},

        init: function(lat, lng, places, pinia){
          var self = this;

          if (pinia == null) {
            pini = '-13.439899729822633,-51.6564647469238';
          } else {
            pini = pinia;
          }

          var orig = pini.split(',');

          $.each(places,function(kv,vv){
            if (vv['cord'] != undefined) {
              var dest = vv['cord'].split(',');
              places[kv]['dist'] = haversine(orig[0],orig[1],dest[0],dest[1]);
            } else {
              places[kv]['dist'] = 999999;
            }
          });

          self.places = places;

          var mapOptions = {
            zoom: (pinia == null) ? 3 : 6,
            center: new google.maps.LatLng(lat, lng)
          };

          this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
          //this.infowindow = new google.maps.InfoWindow({ size: new google.maps.Size(50,50) });

          if (pinia != null) {
            var val = [];
            val.cord = pini;
            val.icon = 'eu.png';
            self.addMarker(999999,val);
          }

          $.each(places, function(id,val){
            val.icon = 'casicon.png';
            self.addMarker(id,val);
          });

          

          this.setCenterPoint();
        },

        addMarker: function(id,place){
          var self = this;

          if (place.cord != undefined && place.cord != null && place.cord != '') {

          var local = place.cord.split(',');

          console.log(local[0]+' '+local[1]);

          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(local[0],local[1]),
            map: self.map,
            id: id,
            title: place.nome,
            address: place.endereco,
            city: place.cidade,
            state: place.estado,
            icon: place.icon,
          });

          /*marker.info_window_content = place.name + '<br/>' + place.address
          self.markers[place.id] = marker//

          google.maps.event.addListener(marker, 'click', function() {
            if (marker.id != 999999) {
              var htmlCardTmp = Template7.templates.cardTmp({
                  id: marker.id,
                  titulo: marker.title,
                  descricao: marker.address+'<br>'+marker.city+' - '+marker.state,
              });
              $('#infolocal').html(htmlCardTmp);
              self.map.setCenter(marker.getPosition());
            }
          });

          } //if
        },

        updateMarkers: function(records){
          var self = this;

          $.each(self.markers, function(){ this.setMap(null); })
          $.each(records, function(){
            self.markers[this.id].setMap(self.map);
          });

          //Set map center
          if(records.length) self.setCenterPoint();
        },

        setCenterPoint: function(){
          var lat = 0, lng = 0; count = 0;

          //Calculate approximate center point.
          for(id in this.markers){
            var m = this.markers[id];

            if(m.map){
              lat += m.getPosition().lat();
              lng += m.getPosition().lng();
              count++;
            }
          }

          if(count > 0){
            this.map.setCenter(new google.maps.LatLng(lat/count,lng/count));
          }
        }

      };

  app.preloader.show();
  navigator.geolocation.getCurrentPosition(function(position) {
    app.preloader.hide();
    console.log('gps');
    console.log('position');

    $.get('http://www.cas-online.org.br/app/api.php', function(data){
      console.log('loading api/map');
      GoogleMap.init(position.coords.latitude,position.coords.longitude, $.parseJSON(data), position.coords.latitude+','+position.coords.longitude);
    });

  }, function(){
    app.preloader.hide();
    q = confirm('Não foi possível encontrar seu local, verifique se sua Localização (GPS) está habilitada. Deseja tentar novamente?')
    if (q) {
      app.router.navigate('/mapa');
    } 
    console.log('sem position');

    $.get('http://www.cas-online.org.br/app/api.php', function(data){
      console.log('loading api/map');
      GoogleMap.init(-13.439899729822633,-51.6564647469238, $.parseJSON(data), null);
    });

  }, {enableHighAccuracy: true, timeout: 7000, maximumAge: 0});

  });*/

}

if (page.name == 'informacoes') {

  /*var pgback = 'mapa.html';

  if (page.route.query.direcao == 'aeronave') {

  $.getJSON('http://www.cas-online.org.br/app/api.php?acao=aeronaves&id='+page.route.query.id,function(info){

    var htmlInfoTmp = Template7.templates.info2Tmp({
      prefixo: '<strong>'+info.prefixo+'</strong>',
      modelo: '<b>Modelo:</b> '+info.modelo,
      empresa: '<b>Empresa:</b> '+info.empresa,
      ano: '<b>Ano:</b> '+info.anofab,
      comb: '<b>Combustível:</b> '+info.tpcomb,
    });
    
    $('#infotmp').html(htmlInfoTmp);

  });

  pgback = 'aeronaves.html';

  } else {

  var info = GoogleMap.places[page.route.query.id];

  var htmlInfoTmp = Template7.templates.infoTmp({
      id: page.route.query.id,
      title: '<strong>'+info.nome+'</strong>',
      endereco: info.endereco,
      cidade: info.cidade+' - '+info.estado,
      nivel: '<u>CAS Nível '+pn(info.nivel)+'</u>',
      email: 'E-mail: <b>'+info.email+'</b>',
      telefone: 'Telefone: <b>'+info.telefone+'</b>',
      telnum: info.telefone
  });
  $('#infotmp').html(htmlInfoTmp);

  if (page.route.query.direcao == 'listar') {
    pgback = 'listar.html'
  } 

  }

  $('#btvolta').attr('href',pgback);*/

}

if (page.name == 'contato') {

  /*var info = GoogleMap.places[page.route.query.id];

  var htmlContatoTmp = Template7.templates.contatoTmp({
      remetente: window.localStorage.getItem('usernome')+' ('+window.localStorage.getItem('useremail')+')',
      destinatario: info.nome+' ('+info.email+')',
      emaildestino: info.email
  });

  $('#linkback').attr('href','informacoes.html?id='+page.route.query.id);

  $('#contatotmp').html(htmlContatoTmp);

  $('#contato_envio').on('click', function () {
    if ($('input[name="assunto"]').val() == '' || $('textarea[name="mensagem"]').val() == '') {
      alert('Preencha todos os campos');
    } else {
      app.preloader.show();
      $.post('http://www.cas-online.org.br/app/api.php?email=sender',{assunto:$('input[name="assunto"]').val(), mensagem:$('textarea[name="mensagem"]').val(), destNome: info.nome, destEmail: info.email, remNome: window.localStorage.getItem('usernome'), remEmail: window.localStorage.getItem('useremail')}, function(data) {
        app.preloader.hide();
        if (data == 'ok') {
          alert('Enviado com sucesso');
        mainView.router.back();
        } else {
          alert('Falha no envio, tente novamente...');
        }
      }).fail(function(){
        app.preloader.hide();
        alert('Falha no envio, verifique sua conexão e tente novamente...');
      });
    }
  });*/

}

if (page.name == 'listagem') {
  //ordemDistancia();
}

if (page.name == 'aeronaves') {
  /*app.preloader.show();
  listaAero();*/
}

});