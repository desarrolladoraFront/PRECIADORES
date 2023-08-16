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
const loaderMensaje = document.getElementById('loader-message');
const contenedorSelect = document.getElementById('contenedorSelect');
const contenedorSelectMARCA = document.getElementById('contenedorMARCA');
const checkboxPlantilla = document.getElementById("checkboxPlantilla");
const checkbox = document.getElementById("checkbox");


// Elementos HTML Dinamicos
const filtrarBtn = document.getElementById('CrearEtiquetas');
const crearEtiquetasBtn = document.getElementById('CrearEtiquetas');
let contenedor;

// Datos
let productos = [];
let marcas = [];
let resultadosFiltrados = [];

// Variables de control
let selectedValueElement;
let selectedValueElement1;
let contador = [];
let flag = false;

let parametro1 = document.getElementById("parametro1");
let parametro2 = document.getElementById("parametro2");

const btnDelete = document.getElementById('borrarDatos');
const buttons = document.querySelector(".contenedor_bts");

//**** F U N C I O N E S ****//

// Funciones obtenerProductos() qué sirve para hacer la petición API de la data.
async function obtenerProductos(apiURL) {
    // AQUÍ EMPIEZA LA FUCNIÓN QUE TOMA CUALQUIER API //
    try {
        const response = await fetch(apiURL);
        const { data } = await response.clone().json();
        const productos = data.map(({ codigo, nombre, linea, precioregularc_impuesto, descuento, precioofertac_impuestos, CodeBears }) => {
            return { clave: codigo, name: nombre, category: linea, precio: precioregularc_impuesto, des: descuento, precioDescuento: precioofertac_impuestos, codeBar: CodeBears };
        });
        loaderMensaje.classList.remove("d-block");
        loaderMensaje.style.display = "none";
        modalFiltro.style.display = "block"; // Muestra el modal "Portal de preciadores, para elegir sí filtrar o mostrar todos."
        console.log('Los productos son:', productos);
		
		$('#my-select').selectize({
      options: productos,
      valueField: 'clave',
      labelField: 'name',
      searchField: ['name', 'category', 'clave'],
      hideSelected: true,
      render: {
        option: function (item, escape) {
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
      labelField: 'name',
      searchField: ['name', 'category', 'clave'],
      hideSelected: true,
      render: {
        option: function (item, escape) {
          return '<div>' +
            '<span class="clave">' + escape(item.clave) + '</span> | ' +
            '<span class="title">' + escape(item.name) + '</span> | ' +
            '<span class="title">' + escape(item.category) + '</span> | ' +
            '</div>';
        }
      },
    });
	
  
  //Función que toma el valor del select por clave 1.
  const escuchadorFILTRO1CLAVE = () => {
    const selectizeControl = $('#my-select')[0].selectize;
  
    selectizeControl.on('change', (value) => {
      selectedValueElement = value;
      let elementoGuardado = selectizeControl.items;
      let div = document.querySelector('.item');
      div.textContent = elementoGuardado;
      div.classList.remove('.item');
      div.classList = "listaUno";
      parametro1.textContent = 'Vas a filtrar usando ' + selectedValueElement;
      console.log(selectedValueElement);
    });
    return selectedValueElement
  
  }
  
  //Función que toma el valor del select por clave 2.
  const escuchadorFILTRO2CLAVE = () => {
    const selectizeControl2 = $('#my-select2')[0].selectize;
  
    selectizeControl2.on('change', (value) => {
      selectedValueElement1 = value;
      let elementoGuardado = selectizeControl2.items;
      let div = document.querySelector('.item');
      div.textContent = elementoGuardado;
  
      parametro2.textContent = selectedValueElement1;
      console.log(selectedValueElement1);
    });
    return selectedValueElement1
  }
  
  //Función que toma el valor del select por marca.
  const escuchadorFILTROMARCA = () => {
    const selectizeControl3 = $('#my-select3')[0].selectize;
  
    selectizeControl3.on('change', (value) => {
      selectedValueElement1 = value;
      let elementoGuardado = selectizeControl3.items;
      let div = document.querySelector('.item');
      div.textContent = elementoGuardado;
      parametro1.textContent = "Elegiste filtrar usando la marca " + selectedValueElement1 + '.';
    });
    return selectedValueElement1
  }
  
  
  //Función de filtro para las claves.
  function filtrarPorClave(productos, claveInicio, claveFin) {
    // Ordenar las claves alfabéticamente
    const clavesOrdenadas = [claveInicio, claveFin].sort();
  
    //Nueva versión de ordenar filtros:
    return productos.filter((producto, index, self) => {
      return (
        producto.clave >= clavesOrdenadas[0] &&
        producto.clave <= clavesOrdenadas[1] &&
        self.findIndex((p) => p.clave === producto.clave) === index
      );
    });
  }
  
  //Función de filtro para las marcas.
  function filtrarPorMarca(productos, clave) {
    return productos.filter(producto => {
      return producto.category == clave;
    });
  }
  
  //Función que crea la DATA para
  const createDATA = (data) => {
    //Para cada elemento del array
    modalFiltro.innerHTML = "";
    root.classList.remove('hide');
  
    data.forEach(producto => {
      // sí no hay descuento:
      if (producto.des == 0) {
        contenedor = document.createElement('div');
        contenedor.classList = 'contenedor';
        if (flag) {
          contenedor.style.border = "none";
        } else {
          contenedor.style.border = "1px dashed";
        }
        const CONTENEDOR_LOGO_CLAVESAP = document.createElement('div');
        CONTENEDOR_LOGO_CLAVESAP.classList = 'contenedor_logo_claveSAP';
        const logo = document.createElement('img');
        logo.setAttribute('src', './logo.png');
        logo.classList = 'logo';
        const claveSap = document.createElement('div');
        claveSap.classList.add('clave_sap');
        claveSap.textContent = producto.clave;
        const node = document.getElementById("code");
        const code = node.cloneNode(true);
        code.setAttribute('id', producto.clave);
        const barcodeValue = producto.codeBar;
  
        const descripcion = document.createElement('p');
        descripcion.classList.add('descripcion');
        descripcion.textContent = producto.name;
        // let menos50 = producto.name.substring(0, 40);
        // descripcion.textContent = menos50;
        //console.log(typeof menos50);
  
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
        if (producto.codeBar.trim() != '') {
          JsBarcode("#" + producto.clave, producto.codeBar, {
            margin: 10,
            background: "#ffffff",
            color: "#000000",
            width: 5,
            height: 100,
            textMargin: 4
          });
        }
      } else {
        contenedor = document.createElement('div');
        contenedor.classList.add('contenedor');
        if (flag) {
          contenedor.style.border = "none";
        } else {
          contenedor.style.border = "1px dashed";
        }
        const CONTENEDOR_LOGO_CLAVESAP = document.createElement('div');
        CONTENEDOR_LOGO_CLAVESAP.classList = 'contenedor_logo_claveSAP';
        const logo = document.createElement('img');
        logo.setAttribute('src', './logo.png');
        logo.classList = 'logo';
        const claveSap = document.createElement('div');
        claveSap.classList.add('clave_sap');
        claveSap.textContent = producto.clave;
        const node = document.getElementById("code");
        const code = node.cloneNode(true);
        code.setAttribute('id', producto.clave);
        const barcodeValue = producto.codeBar;
  
        const descripcion = document.createElement('p');
        descripcion.classList.add('descripcion');
        descripcion.textContent = producto.name;
        // let menos50 = producto.name.substring(0, 40);
        // descripcion.textContent = menos50;
        //console.log(typeof menos50);
  
        const contenedorPrecioSinDescuento = document.createElement('div');
        contenedorPrecioSinDescuento.classList.add('contenedor_precio_sin_descuento');
        const de = document.createElement('p');
        de.classList.add('de');
        de.textContent = 'DE ';
        const precio = document.createElement('p');
        precio.classList.add('precio_');
        const contenedorPrecioConDescuento = document.createElement('div');
        contenedorPrecioConDescuento.classList.add('contenedor_precio_descuento');
        const a = document.createElement('p');
        a.classList.add('a');
        a.textContent = 'A';
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
        if (producto.codeBar.trim() != '') {
          JsBarcode("#" + producto.clave, producto.codeBar, {
            margin: 10,
            background: "#ffffff",
            color: "#000000",
            width: 5,
            height: 100,
            textMargin: 4
          });
        }
      }
      contador++;
      if (contador === 30) {
        let salto = document.createElement("div");
        salto.classList.add('salto-linea');
        root.append(salto);
  
        let margenSimulado = document.createElement("div");
        margenSimulado.classList.add("margen-superior");
        root.append(margenSimulado)
  
        contador = 0;
      }
    });
  }
  
  // **** E V E N T O S **** //
  
  //Este evento escucha cuando seleccionas y desseleccionas filtrar por clave.
  btnClave.addEventListener('change', () => {
    btnMarca.classList.add('deseleccionado');
    btnClave.classList.add('deseleccionado');
    crearEtiquetasBtn.style.display = 'block';
    createSELECTclave();
    buttons.classList.remove('hide');
    escuchadorFILTRO1CLAVE();
    escuchadorFILTRO2CLAVE();
  
    // Este evento escucha cuando presionas el botón filtrar"
    filtrarBtn.addEventListener('click', () => {
      if (selectedValueElement == null || selectedValueElement1 == null) {
        alert('Ninguno de los campos puede quedar vacío.');
      } else {
        console.log('aquí ira el modal de comprobar sí elegiste bien con ' + selectedValueElement + ' y ' + typeof selectedValueElement1);
        const productosFiltrados = filtrarPorClave(productos, selectedValueElement, selectedValueElement1);
        console.log(productosFiltrados);
        modalFiltro.style.display = "none";
        mostrarModal();
        createDATA(productosFiltrados)
      }
    })
  });
  
  // Este evento escucha cuando presionas filtrar por marca.
  btnMarca.addEventListener('change', () => {
    console.log('Se seleccionó la opción por marca');
    btnMarca.classList.remove('deseleccionado');
    btnClave.classList.add('deseleccionado');
    createSELECTmarca();
    buttons.classList.remove('hide');
    escuchadorFILTROMARCA();
  
    filtrarBtn.addEventListener('click', () => {
      if (selectedValueElement1 == null) {
        alert('No puedes filtrar sí el campo está vacío :/');
      } else {
        console.log(selectedValueElement1);
        const productosFiltrados = filtrarPorMarca(productos, selectedValueElement1);
        modalFiltro.style.display = "none";
        console.log(productosFiltrados);
        mostrarModal();
        createDATA(productosFiltrados);
      }
    });
  });
  console.log(productos);

    } catch (error) {
        console.log(error);
    }
	
	
}

//Función obtenerMarcas() que sirve para recibir una lista desplegable con las marcas para filtrar
async function obtenerMarcas() {
    try {
        (await fetch('https://lista-de-precios.cafeetrusca.com/api/v1/venta/marcas/0').then(response => response.json())
            .then(data => {
                marcas = data.map(({ id, name, image }) => {
                    return { nombre: name, imagen: image, numero: id }
                })
            })
            .catch(error => { console.log(error) }))
        //console.log('aquí verás las marcas', marcas)
    } catch (error) {
        console.log(error);
    }
	console.log(productos);
}


//funcion para crear los dos select de "filtrar por clave";
const createSELECTclave = () => {
    contenedorSelectMARCA.style.display = "none";
    contenedorSelect.style.display = "block";
  }
  
  const createSELECTmarca = () => {
    contenedorSelect.style.display = "none";
    contenedorSelectMARCA.style.display = "block";
  
    const optionS = marcas.map(item => ({
      nombre: item.nombre,
      imagen: item.imagen,
    }));
    console.log(optionS);
  
    $('#my-select3').selectize({
      options: optionS,
      valueField: 'nombre',
      labelField: 'nombre',
      searchField: ['nombre'],
      hideSelected: true,
      render: {
        option: function (item, escape) {
          return '<div>' +
            '<span class="clave">' + escape(item.nombre) + '</span> ' +
            '</div>';
        }
      },
    });
  }
  
  //Muestra el modal que contiene el botón de imprimir y algunas instrucciones.
  const mostrarModal = () => {
    modalImprimir.style.display = "block";
  }
  
  // Cierra el modal de "imprimir" y también, envía la ventana de impresión
  const cerrarModal = () => {
    modalImprimir.style.display = "none";
    const bodyElement = document.body;
    bodyElement.style.background = 'white';
    const bootstrapEl = document.getElementsByClassName("bootstrap")[0];
    if (bootstrapEl) {
      const htmlEl = document.getElementsByTagName("head")[0];
      htmlEl.removeChild(bootstrapEl);
    } else {
      console.log("El elemento con la clase 'bootstrap' no existe.");
    }
    //Método para imprimir
    window.print();
  
    // // Recarga la página después de 1 segundo (1000 milisegundos)
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
  }
  

// **** E J E C U C I Ó N  D E  C Ó D I G O ** //

const gup = function (name, url) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    const regexS = "[\\?&]" + name + "=([^&#]*)";
    const regex = new RegExp(regexS);
    const results = regex.exec(url); if (results == 'public') { results = 'https://lista-de-precios.cafeetrusca.com/api/v1/venta/lista_precio/1' }
    return results == null ? null : results[1];
}
// document.addEventListener('DOMContentLoaded', function () {
//     const urlParams = new URLSearchParams(window.location.search);
//     const apiUrl = (gup('q') == 'public') ? 'https://lista-de-precios.cafeetrusca.com/api/v1/venta/lista_precio/1' : (gup('q') == 'boletin_activo') ? 'https://lista-de-precios.cafeetrusca.com/api/v2/boletin/actual/1' : (gup('q') == 'boletin_proximo') ? 'https://lista-de-precios.cafeetrusca.com/api/v2/boletin/proximo/1' : (gup('q') == 'fronterizo') ? 'https://lista-de-precios.cafeetrusca.com/api/v1/venta/lista_precio/5' :(gup('q') == 'publico-futuro') ? 'https://lista-de-precios.cafeetrusca.com/api/v2/venta/futuro/1' :''  ;

//     if (apiUrl) {
//         obtenerMarcas();
//         obtenerProductos(apiUrl);
//     }
// 	console.log(productos);
// });
window.addEventListener('DOMContentLoaded', function() { //Lo primero que se ejecuta, tras el HTML es la petición.
  obtenerMarcas();
  obtenerProductos('https://lista-de-precios.cafeetrusca.com/api/v1/venta/lista_precio/1' );
});

