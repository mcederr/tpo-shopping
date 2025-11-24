const locales = [
    {
        id: 1,
        nombre: "Compu Garden",
        categoria: "Hardware y Tecnología",
        descripcion: "Tu tienda de confianza para componentes de PC: piezas originales, asesoramiento técnico y envíos a todo el país. Ofrecemos garantías, soporte para armado y recomendaciones según tu presupuesto.",
        piso: "Primer Piso",
        ubicacion: "Local 101",
        telefono: "(123) 111-1111",
        horario: "10:00 - 22:00",
        enlace: "https://facundorospide.github.io/local-comercial-compu-garden---2da-entrega/index.html",
        imagen: "imagenes/Compugardenlogo.png"
    },
    {
        id: 2,
        nombre: "HeroMarket",
        categoria: "Comics y Coleccionables",
        descripcion: "Tu universo de comics, tazas y coleccionables de Marvel y DC. ¡Descubre productos únicos para verdaderos fans!",
        piso: "Primer Piso",
        ubicacion: "Local 205",
        telefono: "(123) 222-2222",
        horario: "10:00 - 22:00",
        enlace: "https://mcederr.github.io/heromarket/",
        imagen: "imagenes/HeroMarketlogo.png"
    },
    {
        id: 3,
        nombre: "Dimmens",
        categoria: "Hogar y Descanso",
        descripcion: "Colchones, sommiers, almohadas y accesorios para el descanso. Encontramos el colchón ideal para vos según tus necesidades y presupuesto.",
        piso: "Primer Piso",
        ubicacion: "Local 301",
        telefono: "(123) 333-3333",
        horario: "10:00 - 22:00",
        enlace: "https://facunacca.github.io/TPO-Local-Comercial-Dimmens/",
        imagen: "imagenes/Dimmonslogo.png"
    },
    {
        id: 4,
        nombre: "Brew Haven",
        categoria: "Gastronomía",
        descripcion: "Cafetería con aromas que inspiran y sabores que enamoran. Experiencia de café única con ambiente acogedor.",
        piso: "Primer Piso",
        ubicacion: "Local 412",
        telefono: "(123) 444-4444",
        horario: "10:00 - 22:00",
        enlace: "https://valenurcullu.github.io/CafeteriaBrewHaven/index.html",
        imagen: "imagenes/brewhavenlogo.png"
    },
    {
        id: 5,
        nombre: "CelWell",
        categoria: "Salud y Bienestar",
        descripcion: "Salud a un click de distancia. Venta de vitaminas y suplementos para tu bienestar. Productos destacados para el cuidado de tu salud.",
        piso: "Primer Piso",
        ubicacion: "Local 501",
        telefono: "(123) 555-5555",
        horario: "10:00 - 22:00",
        enlace: "https://maxmart27.github.io/CelWell---Figma/index.html",
        imagen: "imagenes/celwell logo.webp"
    },
    {
        id: 6,
        nombre: "Fashion Plus",
        categoria: "Ropa y Accesorios",
        descripcion: "Tienda de moda con las últimas tendencias en ropa casual, deportiva y formal. Marcas reconocidas con la mejor calidad. Asesoramiento personalizado para encontrar tu estilo.",
        piso: "Primer Piso",
        ubicacion: "Local 215",
        telefono: "(123) 666-6666",
        horario: "10:00 - 22:00",
        enlace: "#",
        imagen: "imagenes/fashionPluslogo.png"
    },
    {
        id: 7,
        nombre: "TechZone",
        categoria: "Electrónica y Gadgets",
        descripcion: "Últimos modelos en smartphones, tablets, laptops y accesorios tecnológicos. Garantía extendida, servicio técnico y planes de financiación disponibles.",
        piso: "Primer Piso",
        ubicacion: "Local 102",
        telefono: "(123) 777-7777",
        horario: "10:00 - 22:00",
        enlace: "#",
        imagen: "imagenes/techzonelogo.jpg"
    },
    {
        id: 8,
        nombre: "Green Market",
        categoria: "Alimentos y Almacén",
        descripcion: "Mercado fresco con productos orgánicos, verduras, frutas, lácteos y almacén. Promociones especiales en compras por volumen. Entrega a domicilio disponible.",
        piso: "Primer Piso",
        ubicacion: "Local 103",
        telefono: "(123) 888-8888",
        horario: "08:00 - 22:00",
        enlace: "#",
        imagen: "imagenes/greenmarketlogo.jpg"
    }

];

function inicializarMapaInteractivo() {
    const hotspots = document.querySelectorAll('.hotspot');
    const modal = new bootstrap.Modal(document.getElementById('localModal'));
    const modalBody = document.getElementById('modal-body');
    const modalTitle = document.getElementById('localModalLabel');
    const modalLink = document.getElementById('modal-link');

    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', function() {
            const localId = parseInt(this.getAttribute('data-local-id'));
            const local = locales.find(l => l.id === localId);

            if (local) {
                hotspots.forEach(h => h.classList.remove('active'));
                this.classList.add('active');

                modalTitle.textContent = local.nombre;
                modalBody.innerHTML = `
                    ${local.imagen ? `<img src="${local.imagen}" alt="Imagen de ${local.nombre}" class="img-fluid mb-3 rounded" loading="lazy" onerror="this.style.display='none'">` : ''}
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

                modalLink.href = local.enlace;
                modalLink.textContent = `Visitar sitio de ${local.nombre}`;
                modalLink.setAttribute('aria-label', `Ir al sitio web de ${local.nombre}`);

                modal.show();

                this.classList.add('pulse');
                setTimeout(() => {
                    this.classList.remove('pulse');
                }, 2000);
            }
        });

        hotspot.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

function inicializarBuscador() {
    const searchInput = document.getElementById('search-local');
    const searchButton = document.getElementById('btn-buscar');
    const searchResults = document.getElementById('search-results');
    const searchForm = searchInput ? searchInput.closest('.input-group') : null;

    function buscarLocales(termino) {
        const terminoLower = termino.toLowerCase().trim();
        
        if (terminoLower === '') {
            searchResults.innerHTML = '';
            document.querySelectorAll('.hotspot').forEach(h => {
                h.classList.remove('active');
            });
            return;
        }

        const resultados = locales.filter(local => 
            local.nombre.toLowerCase().includes(terminoLower) ||
            local.categoria.toLowerCase().includes(terminoLower) ||
            local.descripcion.toLowerCase().includes(terminoLower)
        );

        mostrarResultadosBusqueda(resultados, terminoLower);
    }

    function mostrarResultadosBusqueda(resultados, termino) {
        if (resultados.length === 0) {
            searchResults.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    <i class="bi bi-exclamation-triangle" aria-hidden="true"></i>
                    No se encontraron locales que coincidan con "${termino}"
                </div>
            `;
            document.querySelectorAll('.hotspot').forEach(h => {
                h.classList.remove('active');
            });
            return;
        }

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

        const resultItems = searchResults.querySelectorAll('.search-result-item');
        resultItems.forEach(item => {
            item.addEventListener('click', function() {
                const localId = parseInt(this.getAttribute('data-local-id'));
                resaltarHotspotEnMapa(localId, false);
            });

            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });

        if (resultados.length > 0) {
            resaltarHotspotEnMapa(resultados[0].id, false);
        }
    }

    function resaltarTexto(texto, termino) {
        const regex = new RegExp(`(${termino})`, 'gi');
        return texto.replace(regex, '<mark>$1</mark>');
    }

    function resaltarHotspotEnMapa(localId, abrirModal = true) {
        document.querySelectorAll('.hotspot').forEach(h => {
            h.classList.remove('active');
        });

        const hotspot = document.querySelector(`.hotspot[data-local-id="${localId}"]`);
        if (hotspot) {
            hotspot.classList.add('active');
            hotspot.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            if (abrirModal) {
                setTimeout(() => {
                    hotspot.click();
                }, 300);
            }
        }
    }

    if (searchButton) {
        searchButton.addEventListener('click', function() {
            buscarLocales(searchInput.value);
        });
    }

    if (searchInput) {
        let timeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                buscarLocales(this.value);
            }, 300);
        });

        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                buscarLocales(this.value);
            }
        });
    }
}

function inicializarChatBot() {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatContainer = document.getElementById('chat-container');
    const quickQuestions = document.querySelectorAll('.quick-question');
    const toggleChat = document.getElementById('toggle-chat');

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
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function obtenerRespuesta(pregunta) {
        const preguntaLower = pregunta.toLowerCase();
        
        for (const [clave, respuesta] of Object.entries(respuestas)) {
            if (clave === 'defecto') continue;
            
            if (respuesta.palabrasClave.some(palabra => preguntaLower.includes(palabra))) {
                return respuesta.texto;
            }
        }

        return respuestas.defecto.texto;
    }

    if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const pregunta = chatInput.value.trim();
            
            if (pregunta === '') {
                return;
            }

            agregarMensaje(pregunta, true);
            chatInput.value = '';

            setTimeout(() => {
                const respuesta = obtenerRespuesta(pregunta);
                agregarMensaje(respuesta, false);
            }, 500);
        });
    }

    quickQuestions.forEach(button => {
        button.addEventListener('click', function() {
            const pregunta = this.getAttribute('data-question');
            chatInput.value = pregunta;
            
            if (chatForm) {
                chatForm.dispatchEvent(new Event('submit'));
            }
        });
    });

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

function inicializarValidacionFormulario() {
    const form = document.getElementById('contact-form');
    const mensajeExito = document.getElementById('mensaje-exito');

    if (!form) return;

    form.classList.remove('was-validated');

    const campos = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    const mensajesError = form.querySelectorAll('.invalid-feedback');
    mensajesError.forEach(mensaje => {
        mensaje.style.display = 'none';
    });
    
    campos.forEach(campo => {
        campo.classList.remove('is-invalid', 'is-valid');
        campo.setAttribute('data-touched', 'false');
        
        campo.addEventListener('blur', function() {
            this.setAttribute('data-touched', 'true');
            validarCampo(this);
        });

        campo.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                this.classList.remove('is-invalid');
                const feedback = this.parentElement.querySelector('.invalid-feedback');
                if (feedback) {
                    feedback.style.display = 'none';
                }
            }
        });
    });

    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.setCustomValidity('Por favor ingresa un email válido');
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
            } else if (this.value && emailRegex.test(this.value)) {
                this.setCustomValidity('');
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                validarCampo(this);
            }
        });
    }

    function validarCampo(campo) {
        const fueTocado = campo.getAttribute('data-touched') === 'true';
        const feedback = campo.parentElement.querySelector('.invalid-feedback');
        
        if (campo.checkValidity()) {
            campo.classList.remove('is-invalid');
            campo.classList.add('is-valid');
            if (feedback) {
                feedback.style.display = 'none';
            }
        } else {
            if (fueTocado) {
                campo.classList.remove('is-valid');
                campo.classList.add('is-invalid');
                if (feedback) {
                    feedback.style.display = 'block';
                }
            } else {
                campo.classList.remove('is-invalid', 'is-valid');
                if (feedback) {
                    feedback.style.display = 'none';
                }
            }
        }
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();

        let esValido = true;
        campos.forEach(campo => {
            validarCampo(campo);
            if (!campo.checkValidity()) {
                esValido = false;
            }
        });

        const aceptoCheckbox = document.getElementById('acepto');
        if (aceptoCheckbox && !aceptoCheckbox.checked) {
            aceptoCheckbox.classList.add('is-invalid');
            aceptoCheckbox.setAttribute('data-touched', 'true');
            const feedbackCheckbox = aceptoCheckbox.parentElement.querySelector('.invalid-feedback');
            if (feedbackCheckbox) {
                feedbackCheckbox.style.display = 'block';
            }
            esValido = false;
        } else if (aceptoCheckbox) {
            aceptoCheckbox.classList.remove('is-invalid');
            const feedbackCheckbox = aceptoCheckbox.parentElement.querySelector('.invalid-feedback');
            if (feedbackCheckbox) {
                feedbackCheckbox.style.display = 'none';
            }
        }

        if (esValido) {
            if (mensajeExito) {
                mensajeExito.classList.remove('d-none');
                mensajeExito.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                form.reset();
                campos.forEach(campo => {
                    campo.classList.remove('is-valid', 'is-invalid');
                });
                
                setTimeout(() => {
                    mensajeExito.classList.add('d-none');
                }, 5000);
            }
        }

        form.classList.add('was-validated');
    });
}

function cargarListadoLocales() {
    const localesList = document.getElementById('locales-list');
    
    if (!localesList) return;

    let html = '';
    locales.forEach(local => {
        html += `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 border-0 shadow-sm">
                    <div class="card-img-container bg-light d-flex align-items-center justify-content-center" style="height: 250px; overflow: hidden;">
                        ${local.imagen ? `<img src="${local.imagen}" alt="Imagen de ${local.nombre}" class="card-img-top img-fluid" style="max-width: 100%; max-height: 100%; object-fit: contain;" loading="lazy" onerror="this.style.display='none'">` : '<div class="text-muted"><i class="bi bi-image" aria-hidden="true"></i></div>'}
                    </div>
                    <div class="card-body d-flex flex-column">
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

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('map-container')) {
        inicializarMapaInteractivo();
        cargarListadoLocales();
    }

    if (document.getElementById('search-local')) {
        inicializarBuscador();
    }

    if (document.getElementById('chat-form')) {
        inicializarChatBot();
    }

    if (document.getElementById('contact-form')) {
        inicializarValidacionFormulario();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Ir al contenido principal';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
});

document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        const searchInput = document.getElementById('search-local');
        if (searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
    }
});