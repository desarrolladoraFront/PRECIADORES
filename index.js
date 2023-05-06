// **** V A R I A B L E S ****//
let productos = []; 
let marcas = [];
let resultadosFiltrados = []
let contador = [];
const modalFiltro = document.getElementById("myModal");
let  parametro1 = document.getElementById("parametro1");
let  parametro2 = document.getElementById("parametro2");
const filtrarBtn = document.getElementById('CrearEtiquetas');
const crearEtiquetasBtn = document.getElementById('CrearEtiquetas');
const root = document.querySelector('.root');
const span = document.getElementsByClassName("close")[0];
const span1 = document.getElementsByClassName("close1")[0];
const modalImprimir = document.getElementById("modal-instrucciones-imprimir");
const loaderMensaje = document.getElementById('espera-mientras carga');
const btnClave = document.querySelector('#btnClave');
const btnMarca = document.querySelector('#btnMarca');
const contenedorSelect = document.getElementById('contenedorSelect');
let selectedValueElement;
let selectedValueElement1;
const btnDelete = document.getElementById('borrarDatos');

//**** F U N C I O N E S ****//
 async function peticionJSON() {
    try {
      const response = await fetch('https://lista-de-precios.cafeetrusca.com/api/v1/venta/lista_precio/1');
      const { data } = await response.json();
      productos = data.map(({ codigo, nombre, linea, precioregularc_impuesto, descuento, precioofertac_impuestos, CodeBears}) => {
        return { clave: codigo, name: nombre, category: linea, precio: precioregularc_impuesto, des: descuento, precioDescuento: precioofertac_impuestos, codeBar: CodeBears};
      });
      // console.log('Los productos son:', productos);
    } catch (error) {
      console.log(error);
    }
  }
  async function peticionJSONBrand(){
      try{
          const response = await fetch('https://lista-de-precios.cafeetrusca.com/api/v1/venta/marcas/0');
          const { data } = await response.json();
          marcas = data.map(({ id, name, img}) => {
              return {nombre: name, imagen: img, numero: id }
          });
          console.log('aquí verás las marcas', marcas)
      } catch ( error ) {
          console.log(error);
      }
  }
  const createSELECTclave = () => { //funcion para crear los dos select de "filtrar por clave"; 
    contenedorSelect.style.display = "block";
        $('#my-select').selectize({
            options: productos,
            valueField: 'clave',
            labelField: 'clave name category',
            searchField: ['name', 'category', 'clave'],
             hideSelected: true, // Esta propiedad oculta el texto seleccionado
            render: {
              option: function(item, escape) {
                return '<div>' +
                  '<span class="clave">' + escape(item.clave) + '</span> | ' +
                  '<span class="title">' + escape(item.name) + '</span> | ' +
                  '<span class="title">' + escape(item.category) + '</span> | ' +
                '</div>';
              }
            },
          });
          $('#my-select2').selectize({
            options: productos,
            valueField: 'clave',
            labelField: 'clave name category',
            searchField: ['name', 'category', 'clave'],
             hideSelected: true, // Esta propiedad oculta el texto seleccionado
            render: {
              option: function(item, escape) {
                return '<div>' +
                  '<span class="clave">' + escape(item.clave) + '</span> | ' +
                  '<span class="title">' + escape(item.name) + '</span> | ' +
                  '<span class="title">' + escape(item.category) + '</span> | ' +
                '</div>';
              }
            },
          });
    }
    const createSELECTmarca = () =>{
        const select = document.getElementById('contenedorMARCA');
        select.style.display = "none";
        console.log('lo dejaré así, porqué depende de otra API a la que aún no tengo acceso');
        $('#my-select3').selectize({
            options: productos,
            valueField: 'clave',
            labelField: 'clave name category',
            searchField: ['name', 'category', 'clave'],
             hideSelected: true, // Esta propiedad oculta el texto seleccionado
            render: {
              option: function(item, escape) {
                return '<div>' +
                  '<span class="clave">' + escape(item.clave) + '</span> | ' +
                  '<span class="title">' + escape(item.name) + '</span> | ' +
                  '<span class="title">' + escape(item.category) + '</span> | ' +
                '</div>';
              }
            },
          });
    }
    btnDelete.addEventListener('click', () => {
        parametro1.textContent = "";
        parametro2.textContent = "";
        console.log(productos)
        console.log(selectedValueElement)
        console.log(selectedValueElement1)
    })
    const mostrarModal = () => { //Muestra el modal que contiene el botón de imprimir y algunas instrucciones.
        modalImprimir.style.display = "block";
      }
      const cerrarModal = () => { // Cierra el modal de "imprimir" y también, envía la ventana de impresión
        modalImprimir.style.display = "none";
        window.print();
      }
      span.onclick = function() { //Le da funcionalidad al botón de cerrar que contiene el modal de imprimir.
        modalImprimir.style.display = "none"; 
      }
      window.onclick = function(event) { // Cierra el modal de imprimir cuando se presiona con el mouse cualquier otra parte de la pantalla.
        if (event.target == modalImprimir) {
          modalImprimir.style.display = "none";
        }
      }
      const cerrarLoader = () => { // Retira del DOM el mensaje "Espere un momento mientras cargan las etiquetas."
      //   loaderMensaje.style.display = "none";
      console.log('entra dentro de las mil cosas que habrá qeu revisar');
      }


    // **** E V E N T O S **** //
    btnClave.addEventListener('change', () => { //este evento escucha cuando seleccionas y desseleccionas filtrar por clave
        btnMarca.classList.add('deseleccionado');
        btnClave.classList.add('deseleccionado');
        crearEtiquetasBtn.style.display = 'block'; 
        parametro2.textContent = ''; 
        parametro1.textContent = ''; 
        createSELECTclave(); 
        escuchadorFILTRO();
        otraFuncion();
      });
      
      btnMarca.addEventListener('change', () => { // este evento escucha cuando presionas filtrar por marca
        console.log('Se seleccionó la opción por marca');
        btnMarca.classList.remove('deseleccionado');
        btnClave.classList.add('deseleccionado');
        parametro1.textContent = '';
        parametro2.textContent = ''; 
        parametro1.textContent = 'Ok seleccionaste por marca y buscaré que se reflejé aquí';
        createSELECTmarca();
      });

      const escuchadorFILTRO = () => {
        const selectizeControl = $('#my-select')[0].selectize;
        const selectizeControl2 = $('#my-select2')[0].selectize;
      
        selectizeControl.on('change', (value) => {
          selectedValueElement = value;
          parametro1.textContent = selectedValueElement;
        });
      
        selectizeControl2.on('change', (value) => {
          selectedValueElement1 = value;
          parametro2.textContent = selectedValueElement1;
          selectizeControl2.setValue(value);
        });
      }
      const otraFuncion = () => {
          console.log(typeof selectedValueElement, selectedValueElement1);
          // Haz algo con los valores seleccionados
        }  

// **** E J E C U C I Ó N  D E  C Ó D I G O ** //
  
window.addEventListener('DOMContentLoaded', function() { //Lo primero que se ejecuta, tras el HTML es la petición.
    peticionJSON();
    modalFiltro.style.display = "block"; // Muestra el modal "Portal de preciadores, para elegir sí filtrar o mostrar todos."
  });
  