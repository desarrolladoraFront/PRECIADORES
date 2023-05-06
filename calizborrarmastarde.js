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
  // const selectedValueElement = document.getElementById('parametro1');
  // const selectedValueElement2 = document.getElementById('parametro2');
  
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
  
  // **** E V E N T O S **** //
  btnClave.addEventListener('change', () => { //este evento escucha cuando seleccionas y desseleccionas filtrar por clave
    btnMarca.classList.add('deseleccionado');
    btnClave.classList.add('deseleccionado');
    crearEtiquetasBtn.style.display = 'block'; 
    parametro2.textContent = ''; 
    parametro1.textContent = ''; 
    createSELECTclave(); 
    fjsldf();
    
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
  
  let selectedValueElement;
  let selectedValueElement1;
  
  const fjsldf = () => {
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
      console.log(selectedValueElement, selectedValueElement1);
      // Haz algo con los valores seleccionados
    }
    
  // const fjsldf = () => {
  //     const selectizeControl = $('#my-select')[0].selectize;
  //       const selectizeControl2 = $('#my-select2')[0].selectize;
  //       let selectedValueElement;
  //       let selectedValueElement1;
  //       selectizeControl.on('change', (value) => {
  //             parametro1.textContent = value;
  //             return selectedValueElement = value
  //           });
  //       selectizeControl2.on('change', (value) => {
  //             // Actualizar el valor del elemento HTML
  //             parametro2.textContent = value;
  //             // Hacer que la opción seleccionada aparezca como elegida en el select
  //             selectizeControl2.setValue(value);
  //             return selectedValueElement1 = value;
  //             });
  //         console.log(selectedValueElement, selectedValueElement1)
  // }
  
  //createSELECT();
  
  /// F U N C I O N E S P R O B A N D O
  // const valorSeleccionado = () => {
  //     const selectizeControl = $('#my-select')[0].selectize;
  //     const selectizeControl2 = $('#my-select2')[0].selectize;
  
  
  // }
  // const selectizeControl = $('#my-select')[0].selectize;
  // const selectizeControl2 = $('#my-select2')[0].selectize;
  
  
  //   selectizeControl.on('change', (value) => {
  //     selectedValueElement.textContent = value;
  //     const valor = value
  //     return valor = value
  //   });
    
  //   selectizeControl2.on('change', (value) => {
  //       // Actualizar el valor del elemento HTML
  //       selectedValueElement2.textContent = value;
  //     console.log(value);
  //       // Hacer que la opción seleccionada aparezca como elegida en el select
  //       selectizeControl2.setValue(value);
  //     });
      const btnDelete = document.getElementById('borrarDatos');
      btnDelete.addEventListener('click', () => {
          parametro1.textContent = "";
          parametro2.textContent = "";
          console.log(productos)
          console.log(selectedValueElement)
          console.log(selectedValueElement1)
      })
  
      // filtrarBtn.addEventListener('click', function() { 
          
      //   //   // Validación de parámetros
      //   //   if (parametro1.length !== 7 || parametro2.length !== 7) {
      //   //     const errorElement = document.getElementById('error');
      //   //     errorElement.innerHTML = 'Tienes que escribir un código de siete dígitos';
      //   //     return;
      //   //   }
      //     console.log(productos, value, value)
      //     modalFiltro.style.display = "none";
      //     filtrar(productos, value, value)
      //     console.log(resultadosFiltrados);
      //     mostrarModal();
      //     cerrarLoader();
      //     createDATA(resultadosFiltrados)
      //   });
  
  
  
  // crearEtiquetasBtn.style.display = 'block';
  //   const selectizeControl = $('#my-select')[0].selectize;
  
  //   selectizeControl.on('change', (value) => {
  //     const selectedValueElement = document.getElementById('parametro1');
  //     selectedValueElement.textContent = value;
  //   });
    
  //   selectizeControl.on('change', (value) => {
  //       // Actualizar el valor del elemento HTML
  //       const selectedValueElement = document.getElementById('parametro2');
  //       selectedValueElement.textContent = value;
      
  //       // Hacer que la opción seleccionada aparezca como elegida en el select
  //       selectizeControl.setValue(value);
  //     });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // async function peticionJSON() { //Petición al servidor.
  //   try {
  //     const response = await fetch('https://lista-de-precios.cafeetrusca.com/api/v1/venta/lista_precio/1');
  //     const { data } = await response.json();
  //     productos = data.map(({ codigo, nombre, precioregularc_impuesto, descuento, precioofertac_impuestos, CodeBears }) => {
  //       return { codigo, nombre, precioregularc_impuesto, descuento, precioofertac_impuestos, CodeBears };
  //     });
  //     //console.log('Los productos son:', productos);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  
  
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
  // const filtrar = (productos, de , a) => { //filtro
  //   resultadosFiltrados = productos.filter((item) => {
  //     return item.codigo >= de && item.codigo <= a;
  //   })
  //   console.log(resultadosFiltrados);
  //   return resultadosFiltrados;
  // }
  const createDATA = (data) => {
    //Para cada elemento del array
    data.forEach(producto => {
       // sí no hay descuento:
        if ( producto.descuento == 0){
          const contenedor = document.createElement('div');
          contenedor.classList = 'contenedor';
          const CONTENEDOR_LOGO_CLAVESAP = document.createElement('div');
          CONTENEDOR_LOGO_CLAVESAP.classList = 'contenedor_logo_claveSAP';
          const logo = document.createElement('img');
          logo.setAttribute('src', 'https://i.postimg.cc/y8j19qhw/logo.png');
          logo.classList = 'logo';
          const claveSap = document.createElement('div');
          claveSap.classList.add('clave_sap');
          claveSap.textContent = producto.codigo;
          const node = document.getElementById("code");
          const code = node.cloneNode(true);
          code.setAttribute('id', producto.codigo);
          const barcodeValue = producto.CodeBears;
        
          const descripcion = document.createElement('div');
          descripcion.classList.add('descripcion');
          descripcion.textContent = producto.nombre;
          if (producto.nombre.length > 50){
              descripcion.classList = 'descripcion_50caracteres';
          }
          const precio = document.createElement('div');
          precio.classList.add('precio');
          if (!isNaN(parseFloat(producto.precioregularc_impuesto))) {
            precio.textContent = '$ ' + parseFloat(producto.precioregularc_impuesto).toFixed(2);
            } else {
            precio.textContent = '';
            }
          CONTENEDOR_LOGO_CLAVESAP.append(logo, claveSap, code)
          contenedor.append(CONTENEDOR_LOGO_CLAVESAP, descripcion, precio);
          root.append(contenedor);
          if (producto.CodeBears.trim() != ''){
            JsBarcode("#"+producto.codigo, producto.CodeBears,  {
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
              claveSap.textContent = producto.codigo;
              const node = document.getElementById("code");
              const code = node.cloneNode(true);
              code.setAttribute('id', producto.codigo);
              const barcodeValue = producto.CodeBears;
        
              const descripcion = document.createElement('div');
              descripcion.classList.add('descripcion');
              descripcion.textContent = producto.nombre;
              if (producto.nombre.length > 50){
              descripcion.classList = 'descripcion_50caracteres';
              }
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
              if (!isNaN(parseFloat(producto.precioregularc_impuesto))) {
                precio.textContent = ' $ ' + parseFloat(producto.precioregularc_impuesto).toFixed(2);
                } else {
                precio.textContent = '';
                }
              if (!isNaN(parseFloat(producto.precioofertac_impuestos))) {
                precioDescuento.textContent = '$ ' + parseFloat(producto.precioofertac_impuestos).toFixed(2);
                } else {
                precioDescuento.textContent = '';
                }
              
                CONTENEDOR_LOGO_CLAVESAP.append(logo, claveSap, code)
                contenedorPrecioConDescuento.append(de, precio);
                contenedorPrecioSinDescuento.append(a, precioDescuento);
                contenedor.append(CONTENEDOR_LOGO_CLAVESAP, descripcion, contenedorPrecioConDescuento, contenedorPrecioSinDescuento);
                root.append(contenedor);
                if (producto.CodeBears.trim() != ''){
                  JsBarcode("#"+producto.codigo, producto.CodeBears,  {
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
  
  
  // // **** E J E C U C I Ó N  D E C Ó D I G O ** //
  
  window.addEventListener('DOMContentLoaded', function() { //Lo primero que se ejecuta, tras el HTML es la petición.
    peticionJSON();
    modalFiltro.style.display = "block"; // Muestra el modal "Portal de preciadores, para elegir sí filtrar o mostrar todos."
  });
  
  
  // //Evento de botón "cargar todo".
  // filtrarMarcaBtn.addEventListener("click", function() {
  //     modalFiltro.style.display = "none";
  //     mostrarModal();
  //     cerrarLoader();
  //     createDATA(productos);
  // });
  
  
  
  
  
  
  
  
  
  