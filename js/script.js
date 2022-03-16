const api = {
    token: '3bd7a88a3c0104e8033b30a86a650975',
    baseurl: 'https://api.openweathermap.org/data/2.5/',
    baseurl2: 'https://api.openweathermap.org/data/2.5/onecall?'
}

function homepage(){
    var conteudo = document.querySelector('.conteudo')
    var footer = document.querySelector('.footers')


    
    var homepage = document.querySelector('.homePage')

      var setaAnimada = document.createElement('i');
      setaAnimada.classList.add('bx')
      setaAnimada.classList.add('bxs-chevrons-up');
      setaAnimada.classList.add('bx-fade-down');
      setaAnimada.style = style='color:#ffc800';
      

      var tituloHomePage = document.createElement('p');
      tituloHomePage.classList.add('descH');

      var descHomePage = document.createElement('p')
      descHomePage.classList.add('descH')
      descHomePage.textContent ='A sua aplicação para ver o clima! Clique na barra de pesquisa e digite uma cidade para iniciarmos!'

     

      homepage.appendChild(setaAnimada);
      homepage.appendChild(tituloHomePage)
      homepage.appendChild(descHomePage)

      var paragrafoTitulo = document.querySelector('.descH');
      
      var nuvezinha = document.createElement('i')
      nuvezinha.classList.add('bx');
      nuvezinha.classList.add('bx-cloud');

      var spanTitulo = document.createElement('span');
      spanTitulo.classList.add('tituloH');
      spanTitulo.textContent = "WeatherDash";

      paragrafoTitulo.appendChild(nuvezinha)
      paragrafoTitulo.appendChild(spanTitulo)

        conteudo.style = `display:none`
        footer.style= `display:none`

        volta_ao_normal(conteudo,footer)
        
}

function volta_ao_normal(conteudo,footer){
    


}



function set_info_dia_atual() {
    var divContainer = document.querySelector('.card');
    var divImage = document.createElement('img');
    divImage.classList.add('image');

    var divH0 = document.createElement('h1');
    divH0.classList.add('name');
    divH0.setAttribute("id", "nome");

    var divP1 = document.createElement('p');
    divP1.classList.add('temp');
    var divP2 = document.createElement('p');
    divP2.classList.add('clouds');
    var divP3 = document.createElement('p');
    divP3.classList.add('desc');

    divContainer.appendChild(divH0);
    divContainer.appendChild(divImage);
    divContainer.appendChild(divP1);
    divContainer.appendChild(divP2);
    divContainer.appendChild(divP3);
}

set_info_dia_atual();

const buscar = document.querySelector('.cidade');
var cidade_nome_dia = document.querySelector('#nome');
var imagem = document.querySelector('.image');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button = document.querySelector('.buscar');


function set_info_dia_semana() {
    var colunas = document.getElementsByClassName('col-4');
    for (i = 0; i < colunas.length; i++) {

        colunas[i].classList.add('viewSemana' + [i]);

        var h = document.createElement('h6')
        h.classList.add(`nameS${i}`);
        colunas[i].appendChild(h);

        var image = document.createElement('img')
        image.classList.add(`imageS${i}`)
        colunas[i].appendChild(image);

        var p = document.createElement('p');
        p.classList.add(`tempS${i}`)

        var p1 = document.createElement('p');
        p1.classList.add(`descS${i}`)

        colunas[i].appendChild(p);
        colunas[i].appendChild(p1);
    }
}
set_info_dia_semana();


homepage()
buscar.addEventListener('keypress', setBuscar);
var zerar = 0;

function setBuscar(evt) {
    
    if (evt.keyCode == 13) {
        var homePage = document.querySelector('.homePage')
        var conteudo = document.querySelector('.conteudo')
        var footer = document.querySelector('.footers')
        
         homePage.style= `display:none`
         conteudo.style=``
         footer.style=``
         
       
        pegarResults(buscar.value);
        xiro();
    }
}

function xiro() {

    if (zerar != 0) {
        document.querySelector('.grafico').innerHTML = '';
        document.querySelector('.nascer_por').innerHTML = '';
        document.querySelector('.nascer_por_lua').innerHTML = '';
        document.querySelector('.grafico1').innerHTML = '';
        document.querySelector('.graficoUmid').innerHTML = '';
        document.querySelector('.graficoChuva').innerHTML = '';
        document.querySelector('.graficoUvi').innerHTML='';
        document.querySelector('.graficoTempMax').innerHTML='';
        document.querySelector('.graficoTempMin').innerHTML='';
        document.querySelector('.graficoFeels').innerHTML='';
    }
    zerar++
}

function pegarResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.token}&lang=pt_br&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(displayResults)
}

function displayResults(weather) {
    console.log(weather);
    var nomeValue = `${weather.name}`
    var imgValue = `${weather.weather[0].icon}`
    var tempValue = `${weather.main.temp}`
    var descValue = `${weather.weather[0].description}`
    var latValue = `${weather.coord.lat}`
    var lonValue = `${weather.coord.lon}`
    var nascer_SolValue = `${weather.sys.sunrise}`
    var por_SolValue = `${weather.sys.sunset}`



    cidade_nome_dia.textContent = nomeValue
    imagem.src = `http://openweathermap.org/img/wn/${imgValue}@2x.png`;
    desc.textContent = `${descValue}`;
    temp.textContent = `Temperatura ${tempValue}°C`
    buscar.value = "";

    pegar_Lat_Lon(latValue, lonValue);
    pegar_Lat_Lon_Graficos(latValue, lonValue);
    pegar_Lat_Lon_sideBar(latValue, lonValue)
    cria_sol(nascer_SolValue, por_SolValue)

}

function pegar_Lat_Lon(lat, lon) {
    fetch(`${api.baseurl2}lat=${lat}&lon=${lon}&appid=${api.token}&lang=pt_br&units=metric`)
        .then(weather2 => {
            return weather2.json();
        })
        .then(diasSemana)
}

function diasSemana(weather) {
    console.log(weather)
    var nascer_luaValue = weather.daily[0].moonrise;
    var por_luaValue = weather.daily[0].moonset;

    for (let a = 0; a < 8; a++) {
        var dia = document.querySelector('.nameS' + [a]);
        var img = document.querySelector('.imageS' + [a]);
        var temp = document.querySelector('.tempS' + [a]);
        var desc = document.querySelector('.descS' + [a]);

        var diaSValue = weather.daily[a].dt
        var imgValue = weather.daily[a].weather[0].icon
        var tempSValue = weather.daily[a].temp.day
        var descSValue = weather.daily[a].weather[0].description
        var nascer_luaValue = weather.daily[0].moonrise;
        var por_luaValue = weather.daily[0].moonset;
        descSValue = descSValue[0].toUpperCase() + descSValue.substr(1);


        /*//////////////////////////////////Conversão de Unix para dias da Semana\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/
        const miliSegundos = diaSValue * 1000;
        const objeto = new Date(miliSegundos);
        var diaSemana = objeto.toLocaleString('pt-br', {
            weekday: "long"
        });
        var camelDiaS = diaSemana[0].toUpperCase() + diaSemana.substr(1).replace('-feira', "");
        /*///////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/
        dia.textContent = camelDiaS;
        img.src = 'http://openweathermap.org/img/wn/' + imgValue + '@2x.png';
        desc.textContent = descSValue
        temp.textContent = "Temperatura " + tempSValue + "°C";
    }
    cria_lua(nascer_luaValue, por_luaValue)
}

function pegar_Lat_Lon_Graficos(lat, lon) {
    fetch(`${api.baseurl2}lat=${lat}&lon=${lon}&appid=${api.token}&lang=pt_br&units=metric`)
        .then(weather3 => {
            return weather3.json();
        })
        .then(graficosMain)
}

function graficosMain(weather) {

    var grafico = document.querySelector('.grafico');
    var canvasLinha = document.createElement('canvas');
    canvasLinha.setAttribute('id', "myChart")
    grafico.appendChild(canvasLinha);

    var hora_a_hora = Array.from({
        length: 9
    }, (item, i) => {
        return horaValue = weather.hourly[i].temp
    });

    var valorH = Array.from({
        length: 9
    }, (item, i) => {
        var horaV = weather.hourly[i].dt
        const hora = horaV * 1000;
        const objeto = new Date(hora);
        var valoresH = objeto.toLocaleString('pt-br', {
            hour: "numeric"
        });
        return valoresH + "h"
    });



    var graficoUmid = document.querySelector('.graficoUmid');
    var canvasPolar = document.createElement('canvas');
    canvasPolar.setAttribute('id', "chartUmid")
    graficoUmid.appendChild(canvasPolar);



    const umidadeHora = Array.from({
        length: 9
    }, (item, i) => {

        return weather.hourly[i].humidity;

    });

    const valorH1 = Array.from({
        length: 8
    }, (item, i) => {
        var horaV = weather.hourly[i].dt
        const hora = horaV * 1000;
        const objeto = new Date(hora);
        var valoresH = objeto.toLocaleString('pt-br', {
            hour: "numeric"
        });
        var umid = valoresH + " horas";
        return umid;
    });

    var graficoVent = document.querySelector('.grafico1');
    var canvasVent = document.createElement('canvas');
    canvasVent.setAttribute('id', "myChart2")
    graficoVent.appendChild(canvasVent);

    const ventHora = Array.from({
        length: 9
    }, (item, i) => {
        return 60 * (60 * weather.hourly[i].wind_speed);
    });




    canvasMain(hora_a_hora, valorH, valorH1, umidadeHora, ventHora)

}

function canvasMain(horaH, valorH, valorH1, umidadeHora, ventHora) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: valorH,
            datasets: [{
                label: 'Temperatura °C',
                data: horaH,
                backgroundColor: 'rgb(54, 162, 235, 1)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 3,
            }, ]
        },
    });


  /*  var ctxUmid = document.getElementById('chartUmid').getContext('2d');
    var myChart = new Chart(ctxUmid, {
        type: 'polarArea',
        data: {
            labels: valorH1,
            datasets: [{
                label: 'Umidade',
                data: umidadeHora,
                backgroundColor: ['rgba(214, 230, 249, 1)', 'rgba(54, 154, 147, 1)', 'rgba(20, 126, 121, 1)', 'rgba(207, 246, 246, 1)',
                    'rgba(188, 244, 239, 1)', 'rgba(20, 126, 121, 1)', 'rgba(54, 154, 147, 1)', 'rgba(188, 244, 239, 1)'
                ],
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }

    }); */
    var ctxVent = document.getElementById('myChart2').getContext('2d');
    var myChart = new Chart(ctxVent, {
        type: 'bar',
        data: {
            labels: valorH,
            datasets: [{
                label: 'Velocidade do vento Km/h',
                data: ventHora,
                backgroundColor: [
                    'rgba(3, 103, 191, 1)',
                    'rgba(3, 89, 165, 1)',
                    'rgba(2, 62, 114, 1)',
                    'rgba(101, 176, 242, 1)',
                    'rgba(147, 198, 242, 1)'
                ],
                hoverOffset: 4
            }]
        },
        options: {
            legend: {
                display: false
            }
        }
    });
}



function cria_sol(nascerSol, porSol) {

    var nascer_por = document.querySelector('.nascer_por');
    var tituloNascer = document.createElement('h5')
    tituloNascer.textContent = 'Nascer do Sol'

    var imgNascer = document.createElement('img')
    imgNascer.classList.add('nascer-sol');
    imgNascer.src = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIj4KICA8Zz4KICAgIDxnPgogICAgICA8cGF0aCBkPSJtNDIzLjMsMjU0LjVjMCwxMS4zIDkuMSwyMC40IDIwLjQsMjAuNGgzNi45YzExLjMsMCAyMC40LTkuMSAyMC40LTIwLjQgMC0xMS4zLTkuMS0yMC40LTIwLjQtMjAuNGgtMzYuOWMtMTEuMywyLjg0MjE3ZS0xNC0yMC40LDkuMS0yMC40LDIwLjR6Ii8+CiAgICAgIDxwYXRoIGQ9Ik0zNC4xLDI3NC45SDcxYzExLjMsMCwyMC40LTkuMSwyMC40LTIwLjRjMC0xMS4zLTkuMS0yMC40LTIwLjQtMjAuNEgzNC4xYy0xMS4zLDAtMjAuNCw5LjEtMjAuNCwyMC40ICAgIEMxMy43LDI2NS43LDIyLjgsMjc0LjksMzQuMSwyNzQuOXoiLz4KICAgICAgPHBhdGggZD0ibTI1Ny4zLDg4LjZjMTEuMywwIDIwLjQtOS4xIDIwLjQtMjAuNHYtMzYuOGMwLTExLjMtOS4xLTIwLjQtMjAuNC0yMC40LTExLjMsMC0yMC40LDkuMS0yMC40LDIwLjR2MzYuOGMwLDExLjMgOS4yLDIwLjQgMjAuNCwyMC40eiIvPgogICAgICA8cGF0aCBkPSJtMTExLjEsMTM3LjJjOCw4IDIwLjksOCAyOC45LDAgOC04IDgtMjAuOSAwLTI4LjlsLTI2LjEtMjZjLTgtOC0yMC45LTgtMjguOSwwLTgsOC04LDIwLjkgMCwyOC45bDI2LjEsMjZ6Ii8+CiAgICAgIDxwYXRoIGQ9Im00MDMuNiwxMzcuMmwyNi4xLTI2YzgtOCA4LTIwLjkgMC0yOC45LTgtOC0yMC45LTgtMjguOSwwbC0yNi4xLDI2Yy04LDgtOCwyMC45IDAsMjguOSA4LDggMjAuOSw4IDI4LjksMHoiLz4KICAgICAgPHBhdGggZD0ibTQ3Ny45LDMwNy41aC05MC42YzYuOC0xNi43IDEwLjMtMzQuNyAxMC4zLTUzIDAtNzcuNy02Mi45LTE0MS0xNDAuMi0xNDEtNzcuMywwLTE0MC4yLDYzLjItMTQwLjIsMTQxIDAsMTguMyAzLjUsMzYuMyAxMC4zLDUzaC05NmMtMTEuMywwLTIwLjQsOS4xLTIwLjQsMjAuNHM5LjEsMjAuNCAyMC40LDIwLjRoMjA1LjV2MTMyLjNjMCwxMS4zIDkuMSwyMC40IDIwLjQsMjAuNCAxMS4zLDAgMjAuNC05LjEgMjAuNC0yMC40di0xMzIuM2gyMDAuMmMxMS4zLDAgMjAuNC05LjEgMjAuNC0yMC40cy05LjItMjAuNC0yMC41LTIwLjR6bS0xMzYuMiwwaC02My45di00Ny42bDE1LjksMTZjNy45LDggMjAuOSw4IDI4LjksMC4xIDgtNy45IDgtMjAuOCAwLjEtMjguOGwtNTAuOC01MS4yYy0zLjgtMy45LTkuMi01LjgtMTQuNS01LjgtNS4zLDAtMTAuNywxLjktMTQuNSw1LjhsLTUwLjksNTEuMmMtNy45LDgtNy45LDIwLjkgMC4xLDI4LjggOCw3LjkgMjAuOSw3LjkgMjguOS0wLjFsMTUuOS0xNnY0Ny42aC02My45Yy05LjktMTUuOS0xNS4xLTM0LjItMTUuMS01MyAwLTU1LjIgNDQuNi0xMDAuMiA5OS40LTEwMC4yIDU0LjgsMCA5OS40LDQ0LjkgOTkuNCwxMDAuMi01LjY4NDM0ZS0xNCwxOC45LTUuMiwzNy4xLTE1LDUzeiIvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg=='

    var hora_do_nascer = document.createElement('h5')
    hora_do_nascer.classList.add('hora_nascer');

    var nascerdo_sol = nascerSol * 1000
    const obj_sol = new Date(nascerdo_sol);
    var hora_nascer = obj_sol.toLocaleString('pt-br', {
        hour: "numeric"
    }) // 10 AM
    var minuto_nascer = obj_sol.toLocaleString('pt-br', {
        minute: "numeric"
    })
    var total_nascer = hora_nascer + ":" + minuto_nascer;
    console.log(total_nascer);

    hora_do_nascer.textContent = total_nascer;

    var tituloPor = document.createElement('h5')
    tituloPor.textContent = 'Pôr do Sol'
    tituloPor.classList.add('titulo-por')

    var imgPor = document.createElement('img')
    imgPor.classList.add('por-sol')
    imgPor.src = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIj4KICA8Zz4KICAgIDxnPgogICAgICA8cGF0aCBkPSJtNDIzLjMsMjU1LjVjMCwxMS4zIDkuMSwyMC41IDIwLjQsMjAuNWgzNi45YzExLjMsMCAyMC40LTkuMiAyMC40LTIwLjUgMC0xMS4zLTkuMS0yMC41LTIwLjQtMjAuNWgtMzYuOWMtMTEuMywwLTIwLjQsOS4yLTIwLjQsMjAuNXoiLz4KICAgICAgPHBhdGggZD0iTTM0LjEsMjc2SDcxYzExLjMsMCwyMC40LTkuMiwyMC40LTIwLjVjMC0xMS4zLTkuMS0yMC41LTIwLjQtMjAuNUgzNC4xYy0xMS4zLDAtMjAuNCw5LjItMjAuNCwyMC41ICAgIEMxMy43LDI2Ni44LDIyLjgsMjc2LDM0LjEsMjc2eiIvPgogICAgICA8cGF0aCBkPSJtMjU3LjMsODguOWMxMS4zLDAgMjAuNC05LjIgMjAuNC0yMC41di0zN2MwLTExLjMtOS4xLTIwLjUtMjAuNC0yMC41LTExLjMsMC0yMC40LDkuMi0yMC40LDIwLjV2MzdjMCwxMS40IDkuMiwyMC41IDIwLjQsMjAuNXoiLz4KICAgICAgPHBhdGggZD0ibTExMS4xLDEzNy43YzgsOCAyMC45LDggMjguOSwwIDgtOCA4LTIxIDAtMjlsLTI2LjEtMjYuMWMtOC04LTIwLjktOC0yOC45LDAtOCw4LTgsMjEgMCwyOWwyNi4xLDI2LjF6Ii8+CiAgICAgIDxwYXRoIGQ9Im00MDMuNiwxMzcuN2wyNi4xLTI2LjFjOC04IDgtMjEgMC0yOS04LTgtMjAuOS04LTI4LjksMGwtMjYuMSwyNi4xYy04LDgtOCwyMSAwLDI5IDgsOCAyMC45LDggMjguOSwweiIvPgogICAgICA8cGF0aCBkPSJtNDc3LjksMzEzLjloLTkyLjljOC4yLTE4LjMgMTIuNS0zOC4xIDEyLjUtNTguNSAwLTc4LTYyLjktMTQxLjYtMTQwLjItMTQxLjYtNzcuMywwLTE0MC4yLDYzLjUtMTQwLjIsMTQxLjYgMCwyMC4zIDQuMyw0MC4yIDEyLjUsNTguNWgtOTguMmMtMTEuMywwLTIwLjQsOS4yLTIwLjQsMjAuNSAwLDExLjMgOS4xLDIwLjUgMjAuNCwyMC41aDIwNS41djc1LjlsLTE1LjktMTYuMWMtNy45LTgtMjAuOS04LjEtMjguOS0wLjEtOCw4LTgsMjAuOS0wLjEsMjlsNTAuOCw1MS40YzMuOCwzLjkgOSw2LjEgMTQuNSw2LjEgNS40LDAgMTAuNy0yLjIgMTQuNS02LjFsNTAuOC01MS40YzcuOS04IDcuOS0yMS0wLjEtMjktOC04LTIwLjktNy45LTI4LjksMC4xbC0xNS45LDE2LjF2LTc1LjloMjAwLjFjMTEuMywwIDIwLjQtOS4yIDIwLjQtMjAuNSAwLjEtMTEuMy05LTIwLjUtMjAuMy0yMC41em0tMTM4LjItMi4yYy0wLjUsMC43LTAuOSwxLjQtMS4zLDIuMmgtNjAuN3YtMTAyLjdjMC0xMS4zLTkuMS0yMC41LTIwLjQtMjAuNS0xMS4zLDAtMjAuNCw5LjItMjAuNCwyMC41djEwMi43aC02MS4yYy0wLjUtMS41LTEuMi0yLjktMi00LjItMTAuMy0xNi4yLTE1LjctMzQuOS0xNS43LTU0LjMgMC01NS41IDQ0LjYtMTAwLjYgOTkuNC0xMDAuNiA1NC44LDAgOTkuNCw0NS4xIDk5LjQsMTAwLjYtMC4xLDIwLjItNiwzOS43LTE3LjEsNTYuM3oiLz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPgo='

    var hora_por_sol = document.createElement('h5')
    hora_por_sol.classList.add('hora_por')

    var pordo_Sol = porSol * 1000
    const obj_por_sol = new Date(pordo_Sol);
    var hora_por = obj_por_sol.toLocaleString('pt-br', {
        hour: "numeric"
    })
    var minuto_por = obj_por_sol.toLocaleString('pt-br', {
        minute: "numeric"
    })
    var total_por = hora_por + ':' + minuto_por;

    hora_por_sol.textContent = total_por;


    nascer_por.appendChild(tituloNascer)
    nascer_por.appendChild(imgNascer);
    nascer_por.appendChild(hora_do_nascer);

    nascer_por.appendChild(tituloPor)
    nascer_por.appendChild(imgPor);
    nascer_por.appendChild(hora_por_sol);
}

function cria_lua(nascerLua, porLua) {

    var nascer_por_lua = document.querySelector('.nascer_por_lua');
    var tituloNascerLua = document.createElement('h5')
    tituloNascerLua.textContent = 'Nascer da Lua'

    var imgNascerLua = document.createElement('img')
    imgNascerLua.classList.add('nascer-sol');
    imgNascerLua.src = 'https://i.ibb.co/CKG3Fmf/Lua1.png'


    var hora_do_nascer_lua = document.createElement('h5')
    hora_do_nascer_lua.classList.add('hora_nascer');

    var nascerda_lua = nascerLua * 1000
    const obj_lua = new Date(nascerda_lua);
    var hora_nascer = obj_lua.toLocaleString('pt-br', {
        hour: "numeric"
    }) // 10 AM
    var minuto_nascer = obj_lua.toLocaleString('pt-br', {
        minute: "numeric"
    })
    var total_nascer = hora_nascer + ":" + minuto_nascer;


    hora_do_nascer_lua.textContent = total_nascer;


    var tituloPorLua = document.createElement('h5')
    tituloPorLua.textContent = 'Pôr da Lua'
    tituloPorLua.classList.add('titulo-por')

    var imgPorLua = document.createElement('img')
    imgPorLua.classList.add('por-sol')
    imgPorLua.src = 'https://i.ibb.co/SV8kkNr/lua2.png'

    var hora_por_lua = document.createElement('h5')
    hora_por_lua.classList.add('hora_por')


    var pordo_Lua = porLua * 1000
    const obj_por_lua = new Date(pordo_Lua);
    var hora_por = obj_por_lua.toLocaleString('pt-br', {
        hour: "numeric"
    })
    var minuto_por = obj_por_lua.toLocaleString('pt-br', {
        minute: "numeric"
    })
    var total_por = hora_por + ':' + minuto_por;

    hora_por_lua.textContent = total_por;

    nascer_por_lua.appendChild(tituloNascerLua);
    nascer_por_lua.appendChild(imgNascerLua);
    nascer_por_lua.appendChild(hora_do_nascer_lua);

    nascer_por_lua.appendChild(tituloPorLua);
    nascer_por_lua.appendChild(imgPorLua);
    nascer_por_lua.appendChild(hora_por_lua);
}

function pegar_Lat_Lon_sideBar(lat, lon) {
    fetch(`${api.baseurl2}lat=${lat}&lon=${lon}&appid=${api.token}&lang=pt_br&units=metric`)
        .then(weather4 => {
            return weather4.json();
        })
        .then(sideBar_cria)
}


function sideBar_cria(weather) {
    /*<div class="graficoChuva row"> </div>*/
    var conteudo = document.querySelector('.conteudo')
    var conteudoMain = document.querySelector('.graficos-side_bar')
    var graphChuva = document.createElement('div');
    graphChuva.classList.add('graficoChuva')
    conteudoMain.appendChild(graphChuva);

    var graficoChuva = document.querySelector('.graficoChuva')
    var canvasLinha3 = document.createElement('canvas');
    canvasLinha3.setAttribute('id', "chartChuva")
    graficoChuva.appendChild(canvasLinha3);

    graficoChuva.style = `display:none`


    const chuva = Array.from({
        length: 8
    }, (item, i) => {
        return weather.daily[i].rain
    })

    const cDia = Array.from({
        length: 8
    }, (item, i) => {
        var horaV = weather.daily[i].dt
        const hora = horaV * 1000;
        const objeto = new Date(hora);
        var cadaDia = objeto.toLocaleString("pt-br", {
            weekday: "long"
        })
        return cadaDia
    })

    var conteudoMain = document.querySelector('.graficos-side_bar')
    var graphUvi = document.createElement('div');
    graphUvi.classList.add('graficoUvi')
    conteudoMain.appendChild(graphUvi);

    var graficoUV = document.querySelector('.graficoUvi');
    var canvasUV = document.createElement('canvas');
    canvasUV.setAttribute('id', "myChart3")
    graficoUV.appendChild(canvasUV);

    graficoUV.style = `display:none`;

    const uvHora = Array.from({
        length: 9
    }, (item, i) => {
        return weather.hourly[i].uvi;
    });
    const valorhora = Array.from({length: 8}, (item, i) => {
        var horaV = weather.hourly[i].dt
        const hora = horaV * 1000;
        const objeto = new Date(hora);
        var valoresH = objeto.toLocaleString('pt-br', {hour: "numeric"});
        var uvi = valoresH + " horas";
        return uvi;});


        var conteudoMain = document.querySelector('.graficos-side_bar')
        var graphFeels = document.createElement('div');
         graphFeels.classList.add('graficoFeels')
        conteudoMain.appendChild(graphFeels);

        var graficoFeels = document.querySelector('.graficoFeels');
        var canvasFeels = document.createElement('canvas');
        canvasFeels.setAttribute('id', "chartFeels")
        graficoFeels.appendChild(canvasFeels);

        graficoFeels.style= `display:none`;


         const feelsHora = Array.from({length: 9}, (item, i) => {
         return  weather.hourly[i].feels_like;});


         var conteudoMain = document.querySelector('.graficos-side_bar')
        var graphTempMax = document.createElement('div');
         graphTempMax.classList.add('graficoTempMax')
        conteudoMain.appendChild(graphTempMax);

        var graficoTempMax = document.querySelector('.graficoTempMax');
        var canvasTempmax = document.createElement('canvas');
        canvasTempmax.setAttribute('id', "chartTempMax")
        graficoTempMax.appendChild(canvasTempmax);

        graficoTempMax.style= `display:none`;

        const tempMax = Array.from({
            length: 8
        }, (item, i) => {
           var media  = weather.daily[i].temp.max;
           return media
        });


        var conteudoMain = document.querySelector('.graficos-side_bar')
        var graphTempMin = document.createElement('div');
         graphTempMin.classList.add('graficoTempMin')
        conteudoMain.appendChild(graphTempMin);

        var graficoTempMin = document.querySelector('.graficoTempMin');
        var canvasTempMin= document.createElement('canvas');
        canvasTempMin.setAttribute('id', "chartTempMin")
        graficoTempMin.appendChild(canvasTempMin);

        graficoTempMin.style= `display:none`;

        const tempMin = Array.from({
            length: 8
        }, (item, i) => {
           var media  = weather.daily[i].temp.min;
           return media
        });

        const diadasemana = Array.from({
            length: 8
        }, (item, i) => {
            var horaV = weather.daily[i].dt
            const dia = horaV * 1000;
            const objeto = new Date(dia);
            var valoresH = objeto.toLocaleString('pt-br', {
                weekday: "long"
            });
            return valoresH
        });


      



    set_grafico_sidebar(chuva, cDia,uvHora,valorhora,feelsHora,tempMin,tempMax,diadasemana)
    cria_grafico_sidebar(graficoChuva,graficoUV,graficoFeels, graficoTempMax,graficoTempMin)
}

function set_grafico_sidebar(chuva, cDia,uvHora,valorhora,feelsHora,tempMin,tempMax,diadasemana) {

    var ctx3 = document.getElementById('chartChuva').getContext('2d')
    var myChart = new Chart(ctx3, {
        type: 'doughnut',
        data: {
            labels: cDia,
            datasets: [{
                label: 'chuva',
                data: chuva,
                backgroundColor: [
                    'rgb(202, 92, 81)',
                    'rgb(207, 187, 75)',
                    'rgb(107, 209, 73)',
                    'rgb(72, 210, 131)',
                    'rgb(72, 200, 210)',
                    'rgb(73, 90, 209)',
                    'rgb(148, 50, 228)',
                    'rgb(155, 32, 79)'
                ],
                hoverOffset: 4
            }]
        },

    });

    var ctxUV = document.getElementById('myChart3').getContext('2d');
    var myChart = new Chart(ctxUV, {
        type: 'pie',
        data: {
            labels: valorhora,
            datasets: [{
                label: 'Raio UVI',
                data: uvHora,
                backgroundColor: [
                'rgba(3, 103, 191, 1)',
                'rgba(3, 89, 165, 1)',
                'rgba(2, 62, 114, 1)',
                'rgba(101, 176, 242, 1)',
                'rgba(147, 198, 242, 1)'
                ],
                hoverOffset: 4
            }]
        },
        options: {
            legend: {
                display: false
            }
        }
    });
    var ctxFeels = document.getElementById('chartFeels').getContext('2d');
                    var myChart = new Chart(ctxFeels, {
                        type: 'line',
                        data: {
                            labels: valorhora,
                            datasets: [{
                                label: 'Sensação Térmica',
                                data: feelsHora,
                                backgroundColor: [
                                    'rgba(3, 103, 191, 1)',
                                    'rgba(3, 89, 165, 1)',
                                    'rgba(2, 62, 114, 1)',
                                    'rgba(101, 176, 242, 1)',
                                    'rgba(147, 198, 242, 1)'
                                ],
                                hoverOffset: 4
                            }]
                        },
                        options: {
                            legend: {
                                display: false
                            }
                        }
                    });

                    var ctxmin = document.getElementById('chartTempMin').getContext('2d');
                    var myChart = new Chart(ctxmin, {
                        type: 'bar',
                        data: {
                            labels: diadasemana,
                            datasets: [{
                                label: 'Temperatura Minima',
                                data: tempMin,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 205, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(201, 203, 207, 0.2)'
                                ],
                                borderColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(255, 159, 64)',
                                    'rgb(255, 205, 86)',
                                    'rgb(75, 192, 192)',
                                    'rgb(54, 162, 235)',
                                    'rgb(153, 102, 255)',
                                    'rgb(201, 203, 207)'
                                ],
                                hoverOffset: 4
                            }]
                        },
                        options: {

                            indexAxis: 'y',

                        }
                    });
                    var ctxmax = document.getElementById('chartTempMax').getContext('2d');
                    var myChart = new Chart(ctxmax, {
                        type: 'bar',
                        data: {
                            labels: diadasemana,
                            datasets: [{
                                label: 'Temperatura Maxima',
                                data: tempMax,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 205, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(201, 203, 207, 0.2)'
                                ],
                                borderColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(255, 159, 64)',
                                    'rgb(255, 205, 86)',
                                    'rgb(75, 192, 192)',
                                    'rgb(54, 162, 235)',
                                    'rgb(153, 102, 255)',
                                    'rgb(201, 203, 207)'
                                ],
                                hoverOffset: 2
                            }]
                        },
                        options: {

                            indexAxis: 'y',

                        }
                    });  

}

function cria_grafico_sidebar(graficoChuva,graficoUvi,graficoFeels,grafico4,grafico5) {
    var dash = document.querySelector('.dash')
    var home = document.querySelector('.home')
    var temp = document.querySelector('.t')
    var noneColunas = document.getElementById('colunas')
    var noneGraficos = document.getElementById('graficos')
    var nonePor_Nascer = document.querySelector('.por-nascer')

    dash.addEventListener('click', function () {
        noneColunas.style = `display:none`
        noneGraficos.style = `display:none`;
        nonePor_Nascer.style = `display:none`;
        grafico4.style=`display:none`;
        grafico5.style=`display:none`;
        graficoChuva.style = ``
        graficoUvi.style = ``
        graficoFeels.style= ``
    })

    temp.addEventListener('click',function(){
        noneColunas.style = `display:none`
        noneGraficos.style = `display:none`;
        nonePor_Nascer.style = `display:none`;
        graficoChuva.style = `display:none`;
        graficoUvi.style = `display:none`;
        graficoFeels.style= `display:none`;
        grafico4.style=``;
        grafico5.style=``;

    })

    home.addEventListener('click', function () {
        noneColunas.style = ``
        noneGraficos.style = ``;
        nonePor_Nascer.style = ``;
        graficoChuva.style = `display:none`
        graficoUvi.style = `display:none`
        graficoFeels.style= `display:none`
        grafico4.style=`display:none`;
        grafico5.style=`display:none`;
    })

  

}





const showNavBar = (toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId),
        bodypd = document.getElementById(bodyId),
        headerpd = document.getElementById(headerId)

    //Validação de que todas as varáveis existem
    if (toggle && nav && bodypd && headerpd) {
        toggle.addEventListener('click', () => {
            // mostra o navbar
            nav.classList.toggle('show');
            // muda o icone
            toggle.classList.toggle('bx-x')
            // adiciona padding ao body
            bodypd.classList.toggle('body-pd')
            // adiciona padding ao header
            headerpd.classList.toggle('body-pd')
        })
    }
}

showNavBar('header-toggle', 'nav-bar', 'body-pd', 'header')

//LINK ACTIVE -- Link Ativo: qual link está aberto. Ex: users

const linkColor = document.querySelectorAll('.nav__link')

function colorLink() {
    if (linkColor) {
        linkColor.forEach(l => l.classList.remove('active'))
        this.classList.add('active')
    }
}

linkColor.forEach(l => l.addEventListener('click', colorLink))

const $html = document.querySelector('html')
const $checkbox = document.querySelector('#switch')

$checkbox.addEventListener('change',function() {
    $html.classList.toggle('dark-mode')

})