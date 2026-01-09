/**
 * Configurações da API
 * Para obter sua chave, acesse: https://unsplash.com/developers
 */

// const API_KEY = 'SUA_CHAVE_AQUI';  
const API_KEY = 'lGTYhqPwNEph7jvvWIg-UOahnnii0KmjOhNqaqHSSQY'; 
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const featuredPhoto = document.getElementById('featuredPhoto');
const photoGrid = document.getElementById('photoGrid');

/**
 * Busca fotos na API
 */
async function fetchPhotos(query = 'tecnologia') {
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=12&client_id=${API_KEY}`;
    
    try {
        featuredPhoto.innerHTML = '<p>Carregando...</p>';
        const response = await fetch(url);
        const data = await response.json();
        renderGallery(data.results);
    } catch (error) {
        featuredPhoto.innerHTML = `<p style="color:red">Erro: ${error.message}</p>`;
    }
}

/**
 * Atualiza apenas a seção de destaque
 */
function updateFeatured(url, alt) {
    featuredPhoto.innerHTML = `
        <div class="featured-card">
            <img src="${url}" alt="${alt}">
            <p><strong>Visualizando:</strong> ${alt || 'Sem descrição'}</p>
        </div>
    `;
    // Rola a tela para o topo suavemente para ver a foto nova
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Renderiza a galeria e adiciona eventos de clique
 */
function renderGallery(photos) {
    featuredPhoto.innerHTML = '';
    photoGrid.innerHTML = '';

    if (photos.length === 0) {
        featuredPhoto.innerHTML = '<p>Nenhuma imagem encontrada.</p>';
        return;
    }

    // Define a primeira foto como destaque inicial
    updateFeatured(photos[0].urls.regular, photos[0].alt_description);

    // Cria o grid
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.urls.small;
        imgElement.alt = photo.alt_description;
        imgElement.style.cursor = 'pointer'; // Muda o mouse para indicar clique
        
        // EVENTO DE CLIQUE: Quando clicar, ela sobe para o destaque
        imgElement.addEventListener('click', () => {
            updateFeatured(photo.urls.regular, photo.alt_description);
        });

        photoGrid.appendChild(imgElement);
    });
}

/**
 * Eventos de Busca
 */
searchBtn.addEventListener('click', () => {
    const term = searchInput.value.trim();
    if (term) fetchPhotos(term);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const term = searchInput.value.trim();
        if (term) fetchPhotos(term);
    }
});

// Inicialização
window.addEventListener('DOMContentLoaded', () => fetchPhotos('natureza'));