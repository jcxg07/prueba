document.addEventListener("DOMContentLoaded", () => {
    
   
    const colors = {
        paleSky: '#C9E0EB',
        dustyDenim: '#7392B5',
        deepLilac: '#8350C4',
        midnightViolet: '#402B47',
        shadowGrey: '#262423'
    };

    
    const componentImages = [
        'Bottom_Mount_Open.png',
        'Bottom_Shell_Updated.png',
        'Distal_Phalange_Left.png',
        'Distal_Phalange_Right.png',
        'Distal_Phalange_Top.png',
        'Frame_Piece.png',
        'Metacarpal.png',
        'Middle_Phalange_Left.png',
        'Middle_Phalange_Loop.png',
        'Middle_Phalange_Right.png',
        'Palm.png',
        'Palm_Thumb_Piece.png',
        'Proximal_Phalange_Left.png',
        'Proximal_Phalange_Right.png',
        'Proximal_Servo_Pulley.png',
        'Ring_Bottom.png',
        'Spring_Clamp.png',
        'Tension_Clamp.png',
        'Thumb_Loop.png',
        'Thumb_Phalange_Left.png',
        'Thumb_Phalange_Right.png',
        'Thumb_Rotation_Joint_Left.png',
        'Thumb_Rotation_Joint_Right.png',
        'Thumb_Servo_Pulley.png',
        'Top_Frame.png',
        'Top_Servo_Pulley.png'
    ];

    let currentImageIndex = 0;

    
    const carousel = document.getElementById('imageCarousel');
    componentImages.forEach((img, idx) => {
        const div = document.createElement('div');
        div.className = 'carousel-item';
        div.innerHTML = `<img src="images/${img}" alt="Componente ${idx + 1}" data-index="${idx}" />`;
        div.addEventListener('click', () => {
            currentImageIndex = idx;
            openImageModal(img);
        });
        carousel.appendChild(div);
    });

    
    let imageModal = null;

    function openImageModal(imageName) {
        if (!imageModal) {
            imageModal = document.createElement('div');
            imageModal.className = 'image-modal';
            imageModal.innerHTML = `
                <div class="image-modal-content">
                    <button class="image-modal-close" onclick="closeImageModal()">×</button>
                    <button class="image-modal-nav prev" onclick="previousImage()">‹</button>
                    <img id="modalImage" src="" alt="Componente" />
                    <button class="image-modal-nav next" onclick="nextImage()">›</button>
                </div>
            `;
            document.body.appendChild(imageModal);
        }

        const img = imageModal.querySelector('#modalImage');
        img.src = `images/${imageName}`;
        imageModal.classList.add('active');
    }

    window.closeImageModal = function() {
        if (imageModal) imageModal.classList.remove('active');
    };

    window.nextImage = function() {
        currentImageIndex = (currentImageIndex + 1) % componentImages.length;
        openImageModal(componentImages[currentImageIndex]);
    };

    window.previousImage = function() {
        currentImageIndex = (currentImageIndex - 1 + componentImages.length) % componentImages.length;
        openImageModal(componentImages[currentImageIndex]);
    };

    // Cerrar modal con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageModal && imageModal.classList.contains('active')) {
            window.closeImageModal();
        }
    });

    
    const materialsData = [
        {
            nombre: 'Servomotor MG90S',
            especificaciones: '4.8V-6V, Piñonería metálica, torque ~1.6kg/cm',
            funcion: 'Actuador principal para movimiento mecánico robusto'
        },
        {
            nombre: 'Micro-servo 2g',
            especificaciones: 'Muy ligero, bajo consumo, alta precisión',
            funcion: 'Actuaciones pequeñas, ligeras o de alta sensibilidad'
        },
        {
            nombre: 'Módulo PCA9685',
            especificaciones: 'I2C, 16 canales, resolución 12-bit PWM',
            funcion: 'Permite controlar múltiples servos desde un solo ESP32'
        },
        {
            nombre: 'ESP32 DevKit V1',
            especificaciones: 'Dual-core, Wi-Fi/Bluetooth integrado',
            funcion: '"Cerebro" que procesa lógica y controla todo el sistema'
        },
        {
            nombre: 'Pantalla OLED 0.96"',
            especificaciones: 'Interfaz I2C, resolución 128x64',
            funcion: 'Visualización de datos, estados o mensajes en tiempo real'
        },
        {
            nombre: 'Fuente de Poder 5V 10A',
            especificaciones: '50W, alta capacidad de corriente',
            funcion: 'Suministra energía estable a todos los servos y módulos'
        },
        {
            nombre: 'Condensador 1000uF',
            especificaciones: 'Electrolítico (filtro de ruido)',
            funcion: 'Estabiliza el voltaje y filtra picos de corriente (evita resets)'
        },
        {
            nombre: 'Hilo Dyneema',
            especificaciones: 'Alta resistencia, casi nula elasticidad',
            funcion: 'Transmisión de fuerza mecánica (tendones)'
        },
        {
            nombre: 'Kit de Resortes',
            especificaciones: 'Varios calibres (tensión/compresión)',
            funcion: 'Retorno mecánico de piezas y compensación de carga'
        },
        {
            nombre: 'Tubo de Teflón',
            especificaciones: 'Baja fricción, resistente al calor',
            funcion: 'Guía interna para el deslizamiento del hilo de Dyneema'
        }
    ];

    
    const materialsTableBody = document.getElementById('materialsTableBody');
    if (materialsTableBody) {
        materialsData.forEach((material, idx) => {
            const row = document.createElement('tr');
            row.className = 'material-row';
            row.style.animation = `slideInGlass 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.05}s both`;
            
            row.innerHTML = `
                <td class="font-space-grotesk font-bold text-paleSky">${material.nombre}</td>
                <td class="text-dustyDenim font-light">${material.especificaciones}</td>
                <td class="text-dustyDenim font-light">${material.funcion}</td>
                <div class="material-tooltip">${material.especificaciones} — ${material.funcion}</div>
            `;
            
            materialsTableBody.appendChild(row);
        });
    }

   
    const chartConfig = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { 
            legend: { 
                labels: { 
                    color: colors.paleSky, 
                    font: { family: "'Space Grotesk', sans-serif", size: 12, weight: 'bold' } 
                } 
            } 
        },
        scales: {
            y: { 
                grid: { color: `rgba(131, 80, 196, 0.1)` }, 
                ticks: { color: colors.dustyDenim, font: { family: "'Space Grotesk', sans-serif", size: 11 } },
                border: { display: false }
            },
            x: { 
                grid: { display: false }, 
                ticks: { color: colors.paleSky, font: { family: "'Space Grotesk', sans-serif", size: 11 } } 
            }
        },
        animation: { duration: 2000, easing: 'easeOutQuart' }
    };

    
    const mainChartCtx = document.getElementById('mainChart');
    if (mainChartCtx) {
        new Chart(mainChartCtx, {
            type: 'bar',
            data: {
                labels: ['Sí (33.3%)', 'No (25%)', 'Un poco (41.7%)'],
                datasets: [{
                    data: [8, 6, 10],
                    backgroundColor: [colors.deepLilac, colors.midnightViolet, colors.paleSky],
                    borderWidth: 0,
                    borderRadius: 6
                }]
            },
            options: { ...chartConfig, plugins: { legend: { display: false } } }
        });
    }

    
    window.openChartsModal = function() {
        const modal = document.getElementById('chartsModal');
        modal.classList.remove('hidden');
        renderExpandedCharts();
    };

    window.closeChartsModal = function() {
        document.getElementById('chartsModal').classList.add('hidden');
    };

    function renderExpandedCharts() {
        const chartsGrid = document.getElementById('chartsGrid');
        chartsGrid.innerHTML = '';

        const charts = [
            {
                title: '¿Conoces el lenguaje de señas?',
                id: 'chart1',
                type: 'bar',
                labels: ['Sí (33.3%)', 'No (25%)', 'Un poco (41.7%)'],
                data: [8, 6, 10],
                colors: [colors.deepLilac, colors.paleSky, colors.dustyDenim]
            },
            {
                title: '¿Qué tan importante es la inclusión?',
                id: 'chart2',
                type: 'pie',
                labels: ['Muy importante (100%)', 'Importante (0%)'],
                data: [24, 0],
                colors: [colors.deepLilac, colors.dustyDenim]
            },
            {
                title: '¿Dificultades comunicativas?',
                id: 'chart3',
                type: 'doughnut',
                labels: ['Sí (75%)', 'No (25%)'],
                data: [18, 6],
                colors: [colors.paleSky, colors.deepLilac]
            },
            {
                title: '¿Habías escuchado sobre dispositivos LSC?',
                id: 'chart7',
                type: 'bar',
                labels: ['Sí (25%)', 'No (75%)'],
                data: [6, 18],
                colors: [colors.deepLilac, colors.dustyDenim],
                indexAxis: 'y'
            },
            {
                title: '¿Utilidad de mano biónica?',
                id: 'chart4',
                type: 'bar',
                labels: ['Útil (37.5%)', 'Muy Útil (62.5%)'],
                data: [9, 15],
                colors: [colors.paleSky, colors.deepLilac]
            },
            {
                title: '¿Probabilidad de resolver problemas?',
                id: 'chart8',
                type: 'bar',
                labels: ['Probable (37.5%)', 'Muy Probable (62.5%)'],
                data: [9, 15],
                colors: [colors.deepLilac, colors.paleSky]
            }
        ];

        charts.forEach((chartCfg, idx) => {
            const card = document.createElement('div');
            card.className = 'glass-card p-6 border border-deepLilac/30 transform transition-all duration-700 hover:border-deepLilac/60 hover:shadow-lg hover:shadow-deepLilac/20 group';
            card.style.animation = `slideInUp 0.6s ease-out ${idx * 0.1}s both`;
            card.innerHTML = `
                <div class="absolute inset-0 rounded-sm bg-gradient-to-br from-deepLilac/0 via-paleSky/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <h4 class="text-xs tracking-[0.15em] uppercase font-space-grotesk font-bold text-paleSky mb-4 relative z-10">${chartCfg.title}</h4>
                <div style="height: 280px; position: relative;" class="relative z-10">
                    <canvas id="${chartCfg.id}"></canvas>
                </div>
            `;
            chartsGrid.appendChild(card);

            
            setTimeout(() => {
                const ctx = document.getElementById(chartCfg.id);
                if (ctx) {
                    new Chart(ctx, {
                        type: chartCfg.type,
                        data: {
                            labels: chartCfg.labels,
                            datasets: [{
                                data: chartCfg.data,
                                backgroundColor: chartCfg.colors,
                                borderWidth: 2,
                                borderColor: `rgba(201, 224, 235, 0.3)`,
                                borderRadius: 6,
                                hoverBorderWidth: 3,
                                hoverBorderColor: `rgba(201, 224, 235, 0.8)`
                            }]
                        },
                        options: { 
                            ...chartConfig,
                            indexAxis: chartCfg.indexAxis,
                            plugins: { 
                                legend: { display: chartCfg.type !== 'bar', labels: { color: colors.paleSky, font: { size: 12 } } },
                                tooltip: {
                                    backgroundColor: `rgba(64, 43, 71, 0.95)`,
                                    borderColor: colors.deepLilac,
                                    borderWidth: 1,
                                    titleColor: colors.paleSky,
                                    bodyColor: colors.paleSky,
                                    padding: 12,
                                    titleFont: { size: 13, weight: 'bold' },
                                    bodyFont: { size: 12 },
                                    cornerRadius: 8
                                }
                            },
                            animation: { 
                                duration: 2500, 
                                easing: 'easeOutElastic',
                                delay: idx * 200
                            }
                        }
                    });
                }
            }, 100);
        });
    }

    
    window.openTabPanel = function(tab) {
        const panel = document.getElementById('tabPanel');
        panel.classList.remove('hidden');
        if (tab === 'aplicacion') {
            document.getElementById('tabPanel').innerHTML = `
                <div class="min-h-screen flex items-center justify-center p-4">
                    <div class="glass-card w-full max-w-4xl relative max-h-[90vh] overflow-y-auto border border-deepLilac/30">
                        <button onclick="closeTabPanel()" class="sticky top-4 right-4 float-right text-paleSky hover:text-deepLilac transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <div class="p-8">
                            <h3 class="font-space-grotesk text-2xl font-bold text-deepLilac mb-6">Aplicación SENA</h3>
                            <iframe src="aplicacion.pdf" class="w-full h-[600px] border border-deepLilac/20 rounded-lg"></iframe>
                        </div>
                    </div>
                </div>
            `;
        } else {
            switchTab(tab);
        }
    };

    window.closeTabPanel = function() {
        document.getElementById('tabPanel').classList.add('hidden');
    };

    window.switchTab = function(tabName) {
        
        document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active', 'border-b-2', 'border-deepLilac'));

        
        const tabEl = document.getElementById(`tab-${tabName}`);
        if (tabEl) tabEl.classList.remove('hidden');
        
        
        if (event && event.target) {
            event.target.classList.add('active', 'border-b-2', 'border-deepLilac');
        }
    };

    
    const appItems = [
        { title: "Aplicación SENA", desc: "Interfaz completa desarrollada bajo lineamientos SENA para gestión integral del sistema biónico con controles precisos y monitoreo en tiempo real." }
    ];

    const appCardsContainer = document.getElementById("appCardsContainer");
    if (appCardsContainer) {
        appItems.forEach((item) => {
            const card = document.createElement("div");
            card.className = "group glass-card p-8 cursor-pointer hover:border-deepLilac/60 transition-all duration-500 transform hover:scale-[1.02] border border-deepLilac/30";
            card.innerHTML = `
                <div class="h-44 w-full bg-midnightViolet border border-deepLilac/20 mb-6 flex items-center justify-center text-[10px] tracking-[0.3em] text-deepLilac/40 font-space-grotesk font-bold uppercase group-hover:text-deepLilac/80 transition-all duration-300 overflow-hidden relative rounded-lg">
                    <div class="absolute inset-0 bg-gradient-to-br from-paleSky/0 via-deepLilac/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span class="relative z-10">INTERFAZ_APP</span>
                </div>
                <h4 class="text-xs tracking-[0.15em] uppercase font-space-grotesk font-bold text-paleSky mb-3">${item.title}</h4>
                <p class="text-[11px] text-dustyDenim font-light leading-relaxed">${item.desc}</p>
            `;
            
            card.addEventListener('click', () => {
                window.openTabPanel('aplicacion');
            });
            
            appCardsContainer.appendChild(card);
        });
    }

   
    window.addEventListener('scroll', () => {
        const heroText = document.getElementById('hero-text');
        const scrollPosition = window.scrollY;
        if (heroText && scrollPosition <= 700) {
            const calculatedOpacity = Math.max(0, 1 - scrollPosition / 550);
            const calculatedTranslate = scrollPosition * 0.28;
            heroText.style.opacity = calculatedOpacity;
            heroText.style.transform = `translateY(${calculatedTranslate}px)`;
        }

        
        document.querySelectorAll('.glass-card').forEach(card => {
            const rect = card.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isInView) {
                const distance = Math.min(window.innerHeight - rect.top, rect.bottom);
                const opacity = Math.max(0.3, Math.min(1, distance / window.innerHeight * 1.5));
                
                card.classList.add('scroll-glass', 'active');
                card.style.backdropFilter = `blur(${Math.max(5, 15 * opacity)}px)`;
            }
        });
    }, { passive: true });

   
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.getElementById('chartsModal').classList.add('hidden');
            document.getElementById('tabPanel').classList.add('hidden');
        }
    });

    
    window.addEventListener('click', (e) => {
        const chartsModal = document.getElementById('chartsModal');
        const tabPanel = document.getElementById('tabPanel');
        
        if (e.target === chartsModal) {
            chartsModal.classList.add('hidden');
        }
        if (e.target === tabPanel) {
            tabPanel.classList.add('hidden');
        }
    });
});


let carouselAutoplayInterval;
let isAutoplayActive = true;

function startCarouselAutoplay() {
    const carousel = document.getElementById('imageCarousel');
    if (!carousel) return;
    
    carouselAutoplayInterval = setInterval(() => {
        if (isAutoplayActive) {
            const itemWidth = carousel.firstChild?.offsetWidth || 200;
            const gap = 32; // Gap de Tailwind gap-8
            carousel.scrollBy({
                left: itemWidth + gap,
                behavior: 'smooth'
            });
            
            
            if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 100) {
                setTimeout(() => {
                    carousel.scrollTo({ left: 0, behavior: 'smooth' });
                }, 2000);
            }
        }
    }, 1000); 
}


document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('imageCarousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            isAutoplayActive = false;
        });
        carousel.addEventListener('mouseleave', () => {
            isAutoplayActive = true;
        });
        
        
        startCarouselAutoplay();
    }
});




let loginWithEmail = null;
let registerWithEmail = null;
let logout = null;


async function initFirebaseAuth() {
    try {
        const { loginWithEmail: login, registerWithEmail: register, logout: logoutFn } = await import('./firebase.js');
        window.firebaseLoginWithEmail = login;
        window.firebaseRegisterWithEmail = register;
        window.firebaseLogout = logoutFn;
    } catch (error) {
        console.log('Firebase Auth initialized with basic functions');
    }
}


initFirebaseAuth();

window.openLoginModal = function() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    }
};

window.closeLoginModal = function() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.getElementById('loginForm').reset();
        document.getElementById('loginError').classList.add('hidden');
    }
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.closeLoginModal();
    }
});


document.addEventListener('click', (e) => {
    const loginModal = document.getElementById('loginModal');
    if (loginModal && e.target === loginModal) {
        window.closeLoginModal();
    }
});



window.handleLogin = async function(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');
    const submitButton = event.target.querySelector('button[type="submit"]');
    
    
    if (!email || !password) {
        errorDiv.textContent = 'Por favor completa todos los campos';
        errorDiv.classList.remove('hidden');
        return;
    }
    
    if (password.length < 6) {
        errorDiv.textContent = 'La contraseña debe tener al menos 6 caracteres';
        errorDiv.classList.remove('hidden');
        return;
    }
    
    
    submitButton.disabled = true;
    submitButton.textContent = 'Ingresando...';
    errorDiv.classList.add('hidden');
    
    try {
       
        if (window.firebaseLoginWithEmail) {
            await window.firebaseLoginWithEmail(email, password);
            
            
            setTimeout(() => {
                alert(`¡Bienvenido ${email}!`);
                window.closeLoginModal();
                submitButton.textContent = 'Ingresar';
                submitButton.disabled = false;
            }, 500);
        } else {
            throw new Error('Firebase Auth no está disponible');
        }
    } catch (error) {
        
        let errorMessage = 'Error al iniciar sesión';
        
        if (error.code === 'auth/user-not-found') {
            errorMessage = 'El correo no está registrado';
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'Contraseña incorrecta';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Correo inválido';
        } else if (error.code === 'auth/too-many-requests') {
            errorMessage = 'Demasiados intentos. Intenta más tarde';
        } else {
            errorMessage = error.message || 'Error desconocido';
        }
        
        errorDiv.textContent = errorMessage;
        errorDiv.classList.remove('hidden');
        submitButton.textContent = 'Ingresar';
        submitButton.disabled = false;
    }
};



window.handleRegister = async function(email, password, confirmPassword) {
    if (password !== confirmPassword) {
        return { success: false, message: 'Las contraseñas no coinciden' };
    }
    
    if (password.length < 6) {
        return { success: false, message: 'La contraseña debe tener al menos 6 caracteres' };
    }
    
    try {
        if (window.firebaseRegisterWithEmail) {
            await window.firebaseRegisterWithEmail(email, password);
            return { success: true, message: 'Registro exitoso. Ahora puedes iniciar sesión' };
        }
    } catch (error) {
        let message = 'Error al registrarse';
        if (error.code === 'auth/email-already-in-use') {
            message = 'El correo ya está registrado';
        } else if (error.code === 'auth/weak-password') {
            message = 'La contraseña es muy débil';
        }
        return { success: false, message: message };
    }
};
