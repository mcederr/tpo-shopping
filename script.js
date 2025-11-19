/*
 * JavaScript para Centro Comercial Plaza Central
 * Funcionalidades: mapa interactivo con hotspots, buscador, chatbot y validación de formularios
 */

// ============================================
// Datos de los Locales Comerciales
// ============================================
// Base de datos de locales con información para el mapa y buscador
const locales = [
    {
        id: 1,
        nombre: "Fashion Style",
        categoria: "Ropa y Moda",
        descripcion: "Tienda de ropa y accesorios de moda para toda la familia. Marcas reconocidas y las últimas tendencias.",
        piso: "Planta Baja",
        ubicacion: "Local 101",
        telefono: "(123) 111-1111",
        horario: "10:00 - 22:00",
        enlace: "#" // Reemplazar con URL real del local
    },
    {
        id: 2,
        nombre: "TechWorld",
        categoria: "Electrónica",
        descripcion: "Todo en tecnología: smartphones, tablets, laptops, accesorios y gadgets. Especialistas en marcas premium.",
        piso: "Planta Baja",
        ubicacion: "Local 205",
        telefono: "(123) 222-2222",
        horario: "10:00 - 22:00",
        enlace: "#" // Reemplazar con URL real del local
    },
    {
        id: 3,
        nombre: "SportZone",
        categoria: "Deportes",
        descripcion: "Equipamiento deportivo y ropa de entrenamiento. Calzado deportivo de las mejores marcas.",
        piso: "Primer Piso",
        ubicacion: "Local 301",
        telefono: "(123) 333-3333",
        horario: "10:00 - 22:00",
        enlace: "#" // Reemplazar con URL real del local
    },
    {
        id: 4,
        nombre: "Beauty Plus",
        categoria: "Cosméticos",
        descripcion: "Perfumería y cosméticos de marcas internacionales. Productos de belleza y cuidado personal.",
        piso: "Primer Piso",
        ubicacion: "Local 412",
        telefono: "(123) 444-4444",
        horario: "10:00 - 22:00",
        enlace: "#" // Reemplazar con URL real del local
    },
    {
        id: 5,
        nombre: "BookLand",
        categoria: "Libros",
        descripcion: "Librería con amplia variedad de libros, material educativo, revistas y artículos de papelería.",
        piso: "Segundo Piso",
        ubicacion: "Local 501",
        telefono: "(123) 555-5555",
        horario: "10:00 - 22:00",
        enlace: "#" // Reemplazar con URL real del local
    },
    {
        id: 6,
        nombre: "Toy Store",
        categoria: "Juguetes",
        descripcion: "Juguetería con juguetes educativos, juegos de mesa, muñecas, figuras de acción y más.",
        piso: "Segundo Piso",
        ubicacion: "Local 608",
        telefono: "(123) 666-6666",
        horario: "10:00 - 22:00",
        enlace: "#" // Reemplazar con URL real del local
    }
];

// ============================================
// Funcionalidad del Mapa Interactivo con Hotspots
// ============================================

/**
 * Inicializa los eventos de los hotspots del mapa
 * Cada hotspot muestra información del local al hacer clic
 */
function inicializarMapaInteractivo() {
    const hotspots = document.querySelectorAll('.hotspot');
    const modal = new bootstrap.Modal(document.getElementById('localModal'));
    const modalBody = document.getElementById('modal-body');
    const modalTitle = document.getElementById('localModalLabel');
    const modalLink = document.getElementById('modal-link');

    // Agregar evento click a cada hotspot
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', function() {
            const localId = parseInt(this.getAttribute('data-local-id'));
            const local = locales.find(l => l.id === localId);

            if (local) {
                // Remover clase active de todos los hotspots
                hotspots.forEach(h => h.classList.remove('active'));
                // Agregar clase active al hotspot clickeado
                this.classList.add('active');

                // Actualizar contenido del modal con información del local
                modalTitle.textContent = local.nombre;
                modalBody.innerHTML = `
                    <div class="mb-3">
                        <h3 class="h5">${local.nombre}</h3>
                        <p class="text-muted mb-2">
                            <i class="bi bi-tag-fill" aria-hidden="true"></i> ${local.categoria}
                        </p>
                        <p class="mb-3">${local.descripcion}</p>
                    </div>
                    <div class="row g-3">
                        <div class="col-12">
                            <p class="mb-1">
                                <i class="bi bi-geo-alt-fill text-primary" aria-hidden="true"></i> 
                                <strong>Ubicación:</strong> ${local.ubicacion} - ${local.piso}
                            </p>
                        </div>
                        <div class="col-12">
                            <p class="mb-1">
                                <i class="bi bi-telephone-fill text-success" aria-hidden="true"></i> 
                                <strong>Teléfono:</strong> ${local.telefono}
                            </p>
                        </div>
                        <div class="col-12">
                            <p class="mb-0">
                                <i class="bi bi-clock-fill text-info" aria-hidden="true"></i> 
                                <strong>Horario:</strong> ${local.horario}
                            </p>
                        </div>
                    </div>
                `;

                // Configurar enlace al sitio del local
                modalLink.href = local.enlace;
                modalLink.textContent = `Visitar sitio de ${local.nombre}`;
                modalLink.setAttribute('aria-label', `Ir al sitio web de ${local.nombre}`);

                // Mostrar modal
                modal.show();

                // Agregar efecto de pulso al hotspot
                this.classList.add('pulse');
                setTimeout(() => {
                    this.classList.remove('pulse');
                }, 2000);
            }
        });

        // Soporte para navegación por teclado (accesibilidad)
        hotspot.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// ============================================
// Funcionalidad del Buscador de Locales
// ============================================

/**
 * Inicializa el buscador de locales
 * Permite buscar por nombre o categoría y resalta resultados
 */
function inicializarBuscador() {
    const searchInput = document.getElementById('search-local');
    const searchButton = document.getElementById('btn-buscar');
    const searchResults = document.getElementById('search-results');
    const searchForm = searchInput ? searchInput.closest('.input-group') : null;

    // Función para realizar la búsqueda
    function buscarLocales(termino) {
        const terminoLower = termino.toLowerCase().trim();
        
        if (terminoLower === '') {
            searchResults.innerHTML = '';
            // Remover resaltado de todos los hotspots
            document.querySelectorAll('.hotspot').forEach(h => {
                h.classList.remove('active');
            });
            return;
        }

        // Filtrar locales que coincidan con el término de búsqueda
        const resultados = locales.filter(local => 
            local.nombre.toLowerCase().includes(terminoLower) ||
            local.categoria.toLowerCase().includes(terminoLower) ||
            local.descripcion.toLowerCase().includes(terminoLower)
        );

        // Mostrar resultados
        mostrarResultadosBusqueda(resultados, terminoLower);
    }

    // Función para mostrar los resultados de búsqueda
    function mostrarResultadosBusqueda(resultados, termino) {
        if (resultados.length === 0) {
            searchResults.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    <i class="bi bi-exclamation-triangle" aria-hidden="true"></i>
                    No se encontraron locales que coincidan con "${termino}"
                </div>
            `;
            // Remover resaltado
            document.querySelectorAll('.hotspot').forEach(h => {
                h.classList.remove('active');
            });
            return;
        }

        // Crear HTML de resultados
        let html = '<div class="list-group">';
        resultados.forEach(local => {
            html += `
                <button type="button" class="list-group-item list-group-item-action search-result-item" 
                        data-local-id="${local.id}" aria-label="Local: ${local.nombre}, ${local.categoria}">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${resaltarTexto(local.nombre, termino)}</h5>
                        <small>${local.categoria}</small>
                    </div>
                    <p class="mb-1">${local.descripcion}</p>
                    <small><i class="bi bi-geo-alt" aria-hidden="true"></i> ${local.ubicacion} - ${local.piso}</small>
                </button>
            `;
        });
        html += '</div>';

        searchResults.innerHTML = html;

        // Agregar eventos a los resultados para resaltar en el mapa
        const resultItems = searchResults.querySelectorAll('.search-result-item');
        resultItems.forEach(item => {
            item.addEventListener('click', function() {
                const localId = parseInt(this.getAttribute('data-local-id'));
                resaltarHotspotEnMapa(localId);
            });

            // Soporte para teclado
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });

        // Resaltar el primer resultado en el mapa automáticamente
        if (resultados.length > 0) {
            resaltarHotspotEnMapa(resultados[0].id);
        }
    }

    // Función para resaltar texto en resultados
    function resaltarTexto(texto, termino) {
        const regex = new RegExp(`(${termino})`, 'gi');
        return texto.replace(regex, '<mark>$1</mark>');
    }

    // Función para resaltar hotspot en el mapa
    function resaltarHotspotEnMapa(localId) {
        // Remover active de todos los hotspots
        document.querySelectorAll('.hotspot').forEach(h => {
            h.classList.remove('active');
        });

        // Agregar active al hotspot correspondiente
        const hotspot = document.querySelector(`.hotspot[data-local-id="${localId}"]`);
        if (hotspot) {
            hotspot.classList.add('active');
            // Scroll suave hacia el mapa
            hotspot.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Trigger click para mostrar modal
            setTimeout(() => {
                hotspot.click();
            }, 300);
        }
    }

    // Event listeners para el buscador
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            buscarLocales(searchInput.value);
        });
    }

    if (searchInput) {
        // Buscar mientras se escribe (con debounce para mejor rendimiento)
        let timeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                buscarLocales(this.value);
            }, 300);
        });

        // Buscar con Enter
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                buscarLocales(this.value);
            }
        });
    }
}

// ============================================
// Funcionalidad del ChatBot
// ============================================

/**
 * Inicializa el chatbot con respuestas automáticas
 * Simula un asistente virtual con respuestas predefinidas
 */
function inicializarChatBot() {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatContainer = document.getElementById('chat-container');
    const quickQuestions = document.querySelectorAll('.quick-question');
    const toggleChat = document.getElementById('toggle-chat');

    // Base de conocimiento del chatbot
    const respuestas = {
        'horario': {
            texto: 'El centro comercial está abierto de lunes a viernes de 10:00 a 22:00, y sábados y domingos de 10:00 a 23:00.',
            palabrasClave: ['horario', 'horarios', 'abierto', 'cierra', 'abre', 'atencion']
        },
        'estacionamiento': {
            texto: 'Contamos con 2,500 espacios de estacionamiento en 5 niveles. Las primeras 2 horas son gratis. Hay espacios especiales para personas con movilidad reducida en todos los niveles.',
            palabrasClave: ['estacionamiento', 'parking', 'estacionar', 'auto', 'vehiculo']
        },
        'ofertas': {
            texto: 'Tenemos ofertas especiales todo el mes. Puedes ver todas las promociones disponibles en la sección "Ofertas" del menú principal. También ofrecemos descuentos para estudiantes y adultos mayores.',
            palabrasClave: ['ofertas', 'descuentos', 'promociones', 'rebajas', 'barato']
        },
        'llegar': {
            texto: 'Estamos ubicados en Av. Principal 1234. Puedes llegar en transporte público, auto propio o taxi. También contamos con un amplio estacionamiento. Puedes ver el mapa en la sección de contacto.',
            palabrasClave: ['llegar', 'ubicacion', 'direccion', 'donde', 'como llegar', 'mapa']
        },
        'locales': {
            texto: 'Tenemos más de 100 locales comerciales distribuidos en 3 pisos. Puedes ver el mapa interactivo y buscar locales por nombre en la sección "Locales Comerciales".',
            palabrasClave: ['locales', 'tiendas', 'comercios', 'tienda', 'local']
        },
        'servicios': {
            texto: 'Ofrecemos múltiples servicios: estacionamiento gratuito, Wi-Fi, guardarropa, cajeros, primeros auxilios, cambiadores para bebés y más. Revisa la sección "Servicios" para más información.',
            palabrasClave: ['servicios', 'wifi', 'internet', 'guardarropa', 'cajero']
        },
        'defecto': {
            texto: 'Lo siento, no entendí tu pregunta. Puedes preguntarme sobre horarios, estacionamiento, ofertas, cómo llegar, locales o servicios. También puedes contactarnos directamente a través del formulario de contacto.'
        }
    };

    // Función para agregar mensaje al chat
    function agregarMensaje(texto, esUsuario = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${esUsuario ? 'user-message' : 'bot-message'} mb-3`;
        
        if (esUsuario) {
            messageDiv.innerHTML = `
                <div class="d-flex align-items-start justify-content-end">
                    <div class="alert alert-primary mb-0">
                        <strong>Tú:</strong> ${texto}
                    </div>
                    <i class="bi bi-person-fill text-primary ms-2" aria-hidden="true"></i>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="d-flex align-items-start">
                    <i class="bi bi-robot text-primary me-2" aria-hidden="true"></i>
                    <div class="alert alert-info mb-0">
                        <strong>Bot:</strong> ${texto}
                    </div>
                </div>
            `;
        }

        chatContainer.appendChild(messageDiv);
        // Scroll automático al final del chat
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Función para procesar pregunta y obtener respuesta
    function obtenerRespuesta(pregunta) {
        const preguntaLower = pregunta.toLowerCase();
        
        // Buscar coincidencia en las respuestas
        for (const [clave, respuesta] of Object.entries(respuestas)) {
            if (clave === 'defecto') continue;
            
            if (respuesta.palabrasClave.some(palabra => preguntaLower.includes(palabra))) {
                return respuesta.texto;
            }
        }

        // Si no hay coincidencia, devolver respuesta por defecto
        return respuestas.defecto.texto;
    }

    // Event listener para el formulario del chat
    if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const pregunta = chatInput.value.trim();
            
            if (pregunta === '') {
                return;
            }

            // Agregar mensaje del usuario
            agregarMensaje(pregunta, true);
            chatInput.value = '';

            // Simular delay de respuesta del bot (mejora UX)
            setTimeout(() => {
                const respuesta = obtenerRespuesta(pregunta);
                agregarMensaje(respuesta, false);
            }, 500);
        });
    }

    // Event listeners para preguntas rápidas
    quickQuestions.forEach(button => {
        button.addEventListener('click', function() {
            const pregunta = this.getAttribute('data-question');
            chatInput.value = pregunta;
            
            // Trigger submit del formulario
            if (chatForm) {
                chatForm.dispatchEvent(new Event('submit'));
            }
        });
    });

    // Toggle para expandir/contraer chat (opcional)
    if (toggleChat) {
        let isExpanded = true;
        toggleChat.addEventListener('click', function() {
            const cardBody = document.getElementById('chat-container').parentElement;
            if (isExpanded) {
                cardBody.style.display = 'none';
                this.innerHTML = '<i class="bi bi-plus-lg" aria-hidden="true"></i>';
                this.setAttribute('aria-label', 'Expandir chat');
            } else {
                cardBody.style.display = 'block';
                this.innerHTML = '<i class="bi bi-dash-lg" aria-hidden="true"></i>';
                this.setAttribute('aria-label', 'Contraer chat');
            }
            isExpanded = !isExpanded;
        });
    }
}

// ============================================
// Validación de Formulario de Contacto
// ============================================

/**
 * Inicializa la validación del formulario de contacto
 * Valida campos requeridos y formato de email
 */
function inicializarValidacionFormulario() {
    const form = document.getElementById('contact-form');
    const mensajeExito = document.getElementById('mensaje-exito');

    if (!form) return;

    // Validación en tiempo real
    const campos = form.querySelectorAll('input[required], select[required], textarea[required]');
    campos.forEach(campo => {
        campo.addEventListener('blur', function() {
            validarCampo(this);
        });

        campo.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validarCampo(this);
            }
        });
    });

    // Validación del email
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.setCustomValidity('Por favor ingresa un email válido');
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
            } else if (this.value) {
                this.setCustomValidity('');
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });
    }

    // Función para validar un campo individual
    function validarCampo(campo) {
        if (campo.checkValidity()) {
            campo.classList.remove('is-invalid');
            campo.classList.add('is-valid');
        } else {
            campo.classList.remove('is-valid');
            campo.classList.add('is-invalid');
        }
    }

    // Validación al enviar formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();

        // Validar todos los campos
        let esValido = true;
        campos.forEach(campo => {
            validarCampo(campo);
            if (!campo.checkValidity()) {
                esValido = false;
            }
        });

        // Validar checkbox de términos
        const aceptoCheckbox = document.getElementById('acepto');
        if (aceptoCheckbox && !aceptoCheckbox.checked) {
            aceptoCheckbox.classList.add('is-invalid');
            esValido = false;
        }

        if (esValido) {
            // Simular envío del formulario
            // En una aplicación real, aquí se enviarían los datos al servidor
            
            // Mostrar mensaje de éxito
            if (mensajeExito) {
                mensajeExito.classList.remove('d-none');
                mensajeExito.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Resetear formulario
                form.reset();
                campos.forEach(campo => {
                    campo.classList.remove('is-valid', 'is-invalid');
                });
                
                // Ocultar mensaje después de 5 segundos
                setTimeout(() => {
                    mensajeExito.classList.add('d-none');
                }, 5000);
            }
        }

        form.classList.add('was-validated');
    });
}

// ============================================
// Carga de Listado de Locales
// ============================================

/**
 * Carga dinámicamente el listado de locales en la página
 */
function cargarListadoLocales() {
    const localesList = document.getElementById('locales-list');
    
    if (!localesList) return;

    let html = '';
    locales.forEach(local => {
        html += `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 border-0 shadow-sm">
                    <div class="card-body">
                        <h3 class="h5 card-title">
                            <i class="bi bi-shop text-primary" aria-hidden="true"></i> ${local.nombre}
                        </h3>
                        <p class="text-muted mb-2">
                            <small><i class="bi bi-tag" aria-hidden="true"></i> ${local.categoria}</small>
                        </p>
                        <p class="card-text">${local.descripcion}</p>
                        <div class="mb-3">
                            <small class="text-muted d-block">
                                <i class="bi bi-geo-alt" aria-hidden="true"></i> ${local.ubicacion} - ${local.piso}
                            </small>
                            <small class="text-muted d-block">
                                <i class="bi bi-telephone" aria-hidden="true"></i> ${local.telefono}
                            </small>
                            <small class="text-muted d-block">
                                <i class="bi bi-clock" aria-hidden="true"></i> ${local.horario}
                            </small>
                        </div>
                        <a href="${local.enlace}" class="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer" 
                           aria-label="Visitar sitio web de ${local.nombre}">
                            Visitar sitio
                        </a>
                    </div>
                </div>
            </div>
        `;
    });

    localesList.innerHTML = html;
}

// ============================================
// Inicialización al Cargar la Página
// ============================================

/**
 * Función principal que se ejecuta cuando el DOM está listo
 * Inicializa todas las funcionalidades según la página actual
 */
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar mapa interactivo (solo en página de locales)
    if (document.getElementById('map-container')) {
        inicializarMapaInteractivo();
        cargarListadoLocales();
    }

    // Inicializar buscador (solo en página de locales)
    if (document.getElementById('search-local')) {
        inicializarBuscador();
    }

    // Inicializar chatbot (solo en página de contacto)
    if (document.getElementById('chat-form')) {
        inicializarChatBot();
    }

    // Inicializar validación de formulario (solo en página de contacto)
    if (document.getElementById('contact-form')) {
        inicializarValidacionFormulario();
    }
});

// ============================================
// Mejoras de Accesibilidad
// ============================================

// Skip link para navegación por teclado
document.addEventListener('DOMContentLoaded', function() {
    // Agregar skip link si no existe
    if (!document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Ir al contenido principal';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
});

// Manejo de focus para mejor accesibilidad
document.addEventListener('keydown', function(e) {
    // Atajo de teclado para ir al buscador (Ctrl/Cmd + K)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        const searchInput = document.getElementById('search-local');
        if (searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
    }
});

