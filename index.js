//**** V A R I A B L E S ****//

// Elementos HTML
const modalFiltro = document.getElementById("myModal");
const modalImprimir = document.getElementById("modal-instrucciones-imprimir");
const root = document.querySelector('.root');
const span = document.getElementsByClassName("close")[0];
const span1 = document.getElementsByClassName("close1")[0];
const btnClave = document.querySelector('#btnClave');
const btnMarca = document.querySelector('#btnMarca');
const selectClave1 = document.getElementById("my-select");
const selectClave2 = document.getElementById("my-select2");
const selectMarca = document.getElementById("my-select3");
const btnBorrarDatos = document.getElementById('borrarDatos');
const loaderMensaje = document.getElementById('espera-mientras carga')
const contenedorSelect = document.getElementById('contenedorSelect');
const contenedorSelectMARCA = document.getElementById('contenedorMARCA');

// Elementos HTML Dinamicos
const filtrarBtn = document.getElementById('CrearEtiquetas');
const crearEtiquetasBtn = document.getElementById('CrearEtiquetas');

// Datos
let productos = []; 
let marcas = [];
let resultadosFiltrados = [];

// Variables de control
let selectedValueElement;
let selectedValueElement1;
let contador = [];

let  parametro1 = document.getElementById("parametro1");
let  parametro2 = document.getElementById("parametro2");

const btnDelete = document.getElementById('borrarDatos');
const buttons = document.querySelector(".contenedor_bts_borraryreiniciar");

//**** F U N C I O N E S ****//

  // Funciones para obtener y procesar datos
  async function obtenerProductos() {
    try {
      const response = await fetch('https://lista-de-precios.cafeetrusca.com/api/v1/venta/lista_precio/1');
      const { data } = await response.clone().json();
      productos = data.map(({ codigo, nombre, linea, precioregularc_impuesto, descuento, precioofertac_impuestos, CodeBears }) => {
        return { clave: codigo, name: nombre, category: linea, precio: precioregularc_impuesto, des: descuento, precioDescuento: precioofertac_impuestos, codeBar: CodeBears };
      });
      modalFiltro.style.display = "block"; // Muestra el modal "Portal de preciadores, para elegir sí filtrar o mostrar todos."
      loaderMensaje.style.display = "none";
      console.log('Los productos son:', productos);
    } catch (error) {
      console.log(error);
    }
  }
  async function obtenerMarcas() {
    try{
        (await fetch('https://lista-de-precios.cafeetrusca.com/api/v1/venta/marcas/0').then(response => response.json())
        .then(data => {  marcas = data.map(({ id, name, image}) => {
          return {nombre: name, imagen: image, numero: id }
        })})
        .catch(error => { console.log(error)}))
        console.log('aquí verás las marcas', marcas)
    } catch ( error ) {
        console.log(error);
    }
  }
  // Funciones para crear elementos HTML
  const createSELECTclave = () => { //funcion para crear los dos select de "filtrar por clave"; 
    contenedorSelectMARCA.style.display = "none";
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
        contenedorSelect.style.display = "none";
        contenedorSelectMARCA.style.display = "block";
        $('#my-select3').selectize({
          options: marcas,
          valueField: 'nombre',
          labelField: 'nombre imagen',
          searchField: ['nombre'],
           hideSelected: true, // Esta propiedad oculta el texto seleccionado
          render: {
            option: function(item, escape) {
              return '<div>' +
                '<span class="clave">' + escape(item.nombre) + '</span> ' +
                // '<span class="title">' + escape(item.imagen) + '</span> | ' +
              '</div>';
            }
          },
        });
    }
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
        createSELECTclave();
        buttons.classList.remove('hide');
        escuchadorFILTRO1CLAVE();
        escuchadorFILTRO2CLAVE();
       // otraFuncion();
      });
      
    btnMarca.addEventListener('change', () => { // este evento escucha cuando presionas filtrar por marca
        console.log('Se seleccionó la opción por marca');
        btnMarca.classList.remove('deseleccionado');
        btnClave.classList.add('deseleccionado');
        createSELECTmarca();
        buttons.classList.remove('hide');
        escuchadorFILTROMARCA();
      });

      const escuchadorFILTRO1CLAVE = () => {
        const selectizeControl = $('#my-select')[0].selectize;
      
        selectizeControl.on('change', (value) => {
          selectedValueElement = value;
          let elementoGuardado =  selectizeControl.items;
          let div = document.querySelector('.item');
          div.textContent = elementoGuardado;
          div.classList.remove('.item');
          div.classList = "listaUno";
          parametro1.textContent = "Las etiquetas que crearas inician con la clave " + selectedValueElement;
        });

        filtrarBtn.addEventListener('click', () => {
          if (selectedValueElement == null || selectedValueElement1 == null){
            alert('Ninguno de los campos puede quedar vacío.');
          } else {
            console.log('aquí ira el modal de comprobar sí elegiste bien con ' + selectedValueElement + ' y ' + typeof selectedValueElement1);
            const productosFiltrados = filtrarPorClave(productos, selectedValueElement, selectedValueElement1);
            modalFiltro.style.display = "none";
            mostrarModal();
            createDATA(productosFiltrados)
          }
        })
      }
      const escuchadorFILTRO2CLAVE = () => {
        const selectizeControl2 = $('#my-select2')[0].selectize;

        selectizeControl2.on('change', (value) => {
          selectedValueElement1 = value;
           let elementoGuardado =  selectizeControl2.items;
          let div = document.querySelector('.item');
          div.textContent = elementoGuardado;

          parametro2.textContent = " y terminan con la clave "+ selectedValueElement1 + '.';
        });

        filtrarBtn.addEventListener('click', () => {
          if (selectedValueElement == null || selectedValueElement1 == null){
            alert('Ninguno de los campos puede quedar vacío.');
          } else {
            console.log('aquí ira el modal de comprobar sí elegiste bien con ' + selectedValueElement + ' y ' + typeof selectedValueElement1);
            const productosFiltrados = filtrarPorClave(productos, selectedValueElement, selectedValueElement1);
            modalFiltro.style.display = "none";
            mostrarModal();
            createDATA(productosFiltrados)
          }
        })
      }
      const escuchadorFILTROMARCA = () => {
        const selectizeControl3 = $('#my-select3')[0].selectize;

        selectizeControl3.on('change', (value) => {
          selectedValueElement1 = value;
           let elementoGuardado =  selectizeControl3.items;
           let div = document.querySelector('.item');
          div.textContent = elementoGuardado;
          parametro1.textContent = "Elegiste filtrar usando la marca "+ selectedValueElement1 + '.';

        });

        filtrarBtn.addEventListener('click', () => {
          if (selectedValueElement1 == null){
            alert('No puedes filtrar sí el campo está vacío :/');
          } else {
            console.log(selectedValueElement1);
            const productosFiltrados = filtrarPorMarca(productos, selectedValueElement1);
            modalFiltro.style.display = "none";
            console.log(productosFiltrados);
            mostrarModal();
            createDATA(productosFiltrados);
          }
        })
      }
      const checkboxPlantilla = document.getElementById("checkboxPlantilla");
      const checkbox = document.getElementById("checkbox");
      
      checkboxPlantilla.addEventListener("change", function() {
        if (checkbox.checked) {
          alert("No puedes seleccionar ambos elementos");
          checkboxPlantilla.checked = false;
        }
        checkbox.checked = false;
        let stylesheet = document.getElementById('stylesheet');
        if (stylesheet.href.endsWith('impresion_sin_plantilla.css')){
          stylesheet.href = 'impresion_con_plantilla.css';
        }  else {
          stylesheet.href = 'impresion_sin_plantilla.css';
        }      
      });
      
      checkbox.addEventListener("change", function() {
        if (checkboxPlantilla.checked) {
          alert("No puedes seleccionar ambos elementos");
          checkbox.checked = false;
        }
        checkboxPlantilla.checked = false;
      });
      


      // //Función de filtro para las claves.
      // function filtrarPorClave(productos, claveInicio, claveFin) {
      //   return productos.filter(producto => {
      //     // Verificar si el código del producto está dentro del rango especificado
      //     // ordenar de mayor a menor
      //     return producto.clave >= claveInicio && producto.clave <= claveFin;
      //   });
      // }
      
        //Función de filtro para las claves.
        function filtrarPorClave(productos, claveInicio, claveFin) {
          // Ordenar las claves alfabéticamente
          const clavesOrdenadas = [claveInicio, claveFin].sort();

          // Aplicar filtro con las claves ordenadas
          return productos.filter(producto => {
            return producto.clave >= clavesOrdenadas[0] && producto.clave <= clavesOrdenadas[1];
          });
        }


      //Función de filtro para las marcas.
      function filtrarPorMarca(productos, clave){
        return productos.filter(producto => {
          return producto.category == clave;
        });
      }

      //Función que crea la DATA para 
      const createDATA = (data) => {
        //Para cada elemento del array
        data.forEach(producto => {
           // sí no hay descuento:
            if ( producto.des == 0){
              const contenedor = document.createElement('div');
              contenedor.classList = 'contenedor';
              const CONTENEDOR_LOGO_CLAVESAP = document.createElement('div');
              CONTENEDOR_LOGO_CLAVESAP.classList = 'contenedor_logo_claveSAP';
              const logo = document.createElement('img');
              logo.setAttribute('src', 'https://i.postimg.cc/y8j19qhw/logo.png');
              logo.classList = 'logo';
              const claveSap = document.createElement('div');
              claveSap.classList.add('clave_sap');
              claveSap.textContent = producto.clave;
              const node = document.getElementById("code");
              const code = node.cloneNode(true);
              code.setAttribute('id', producto.clave);
              const barcodeValue = producto.codeBar;
            
              const descripcion = document.createElement('div');
              descripcion.classList.add('descripcion');
              descripcion.textContent = producto.name;
              let menos50 = producto.name
              menos50.substring(0, 50);
              descripcion.textContent = menos50;
              console.log(typeof menos50);
              // if (producto.name.length > 50){
              //     descripcion.classList = 'descripcion_50caracteres';
              // }
              const precio = document.createElement('div');
              precio.classList.add('precio');
              if (!isNaN(parseFloat(producto.precio))) {
                precio.textContent = '$ ' + parseFloat(producto.precio).toFixed(2);
                } else {
                precio.textContent = '';
                }
              CONTENEDOR_LOGO_CLAVESAP.append(logo, claveSap, code)
              contenedor.append(CONTENEDOR_LOGO_CLAVESAP, descripcion, precio);
              root.append(contenedor);
              if (producto.codeBar.trim() != ''){
                JsBarcode("#"+producto.clave, producto.codeBar,  {
                  margin: 10,
                  background: "#ffffff",
                  color : "#000000",
                  width: 5,
                  height: 100,
                  textMargin: 4
                });  
              } 
            }else{
                  const contenedor = document.createElement('div');
                  contenedor.classList.add('contenedor');
                  const CONTENEDOR_LOGO_CLAVESAP = document.createElement('div');
                  CONTENEDOR_LOGO_CLAVESAP.classList = 'contenedor_logo_claveSAP';
                  const logo = document.createElement('img');
                  logo.setAttribute('src', 'https://i.postimg.cc/y8j19qhw/logo.png');
                  logo.classList = 'logo';
                  const claveSap = document.createElement('div');
                  claveSap.classList.add('clave_sap');
                  claveSap.textContent = producto.clave;
                  const node = document.getElementById("code");
                  const code = node.cloneNode(true);
                  code.setAttribute('id', producto.clave);
                  const barcodeValue = producto.codeBar;
            
                  const descripcion = document.createElement('div');
                  descripcion.classList.add('descripcion');
                  let menos50 = producto.name
                  menos50.substring(0, 50);
                  descripcion.textContent = menos50;
                  console.log(typeof menos50);
                  //descripcion.substring(0, 50);
                  // if (producto.name.length > 50){
                  // descripcion.classList = 'descripcion_50caracteres';
                  // }
                  const contenedorPrecioSinDescuento = document.createElement('div');
                  contenedorPrecioSinDescuento.classList.add('contenedor_precio_sin_descuento');
                  const de = document.createElement('p');
                  de.classList.add('de');
                  de.textContent = 'de ';
                  const precio = document.createElement('p');
                  precio.classList.add('precio_');
                  const contenedorPrecioConDescuento = document.createElement('div');
                  contenedorPrecioConDescuento.classList.add('contenedor_precio_descuento');
                  const a = document.createElement('p');
                  a.classList.add('a');
                  a.textContent = 'a';
                  const precioDescuento = document.createElement('div');
                  precioDescuento.classList.add('precio_descuento');
                  if (!isNaN(parseFloat(producto.precio))) {
                    precio.textContent = ' $ ' + parseFloat(producto.precio).toFixed(2);
                    } else {
                    precio.textContent = '';
                    }
                  if (!isNaN(parseFloat(producto.precioDescuento))) {
                    precioDescuento.textContent = '$ ' + parseFloat(producto.precioDescuento).toFixed(2);
                    } else {
                    precioDescuento.textContent = '';
                    }
                  
                    CONTENEDOR_LOGO_CLAVESAP.append(logo, claveSap, code)
                    contenedorPrecioConDescuento.append(de, precio);
                    contenedorPrecioSinDescuento.append(a, precioDescuento);
                    contenedor.append(CONTENEDOR_LOGO_CLAVESAP, descripcion, contenedorPrecioConDescuento, contenedorPrecioSinDescuento);
                    root.append(contenedor);
                    if (producto.codeBar.trim() != ''){
                      JsBarcode("#"+producto.clave, producto.codeBar,  {
                        margin: 10,
                        background: "#ffffff",
                        color : "#000000",
                        width: 5,
                        height: 100,
                        textMargin: 4
                      });
                      }
                }
                
                contador++;
                if (contador   === 15){
                  let salto = document.createElement("div");
                  salto.classList.add('row');
                  root.append(salto);
                  contador = 0;
                }
        });
      }
      
// **** E J E C U C I Ó N  D E  C Ó D I G O ** //
  
window.addEventListener('DOMContentLoaded', function() { //Lo primero que se ejecuta, tras el HTML es la petición.
    obtenerMarcas();
    obtenerProductos();
    
  });
  