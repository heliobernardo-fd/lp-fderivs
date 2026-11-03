/**
 * FDERIVS - Interações de Frontend (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu Mobile
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');
  const header = document.getElementById('header');

  // Efeito dinâmico de opacidade na navbar:
  // No topo: 0% de opacidade (100% transparente)
  // Ao rolar (> 20px): 84% de opacidade
  function handleHeaderScroll() {
    if (header) {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // Executa na carga inicial caso já comece scrollado

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      siteNav.classList.toggle('active');
    });

    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('active');
      });
    });
  }

  // 2. Formulário de Contato com Validação e Supabase
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');
  const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
  const btnSpinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Limpar erros
      document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
      formStatus.style.display = 'none';
      formStatus.className = 'form-status';

      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const empresa = document.getElementById('empresa').value.trim();
      const mensagem = document.getElementById('mensagem').value.trim();

      let hasError = false;

      if (!nome) {
        document.getElementById('error-nome').textContent = 'Por favor, informe seu nome.';
        hasError = true;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        document.getElementById('error-email').textContent = 'Informe um e-mail corporativo válido.';
        hasError = true;
      }

      if (!mensagem || mensagem.length < 3) {
        document.getElementById('error-mensagem').textContent = 'Por favor, digite sua mensagem.';
        hasError = true;
      }

      if (hasError) return;

      submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Enviando...';
      if (btnSpinner) btnSpinner.style.display = 'inline-block';

      try {
        const payload = { nome, email, empresa, mensagem, interesse: 'contato_site' };
        const result = await window.fderivsSupabase.submitContact(payload);

        if (result.success) {
          formStatus.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
          formStatus.classList.add('success');
          formStatus.style.display = 'block';
          form.reset();
        } else {
          throw new Error(result.error || 'Erro ao enviar contato.');
        }
      } catch (err) {
        formStatus.textContent = 'Ocorreu um erro ao enviar. Por favor, contate-nos pelo telefone ou e-mail.';
        formStatus.classList.add('error');
        formStatus.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Enviar';
        if (btnSpinner) btnSpinner.style.display = 'none';
      }
    });
  }
});

/**
 * Alterna entre as 4 Tabs de Produtos (Appreciator, Polynomial, Instruments, Risk Manager)
 */
const PRODUCT_IDS = ['appreciator', 'polynomial', 'instruments', 'risk'];
let currentProductIndex = 0;
let productCarouselTimer = null;

function switchProductTab(productId, isManual = false) {
  const index = PRODUCT_IDS.indexOf(productId);
  if (index !== -1) {
    currentProductIndex = index;
  }

  // 1. Alternar classe ativa nos 4 cards de topo
  const tabs = document.querySelectorAll('.module-tab-card');
  tabs.forEach(tab => {
    tab.classList.remove('active');
    if (tab.classList.contains(`tab-${productId}`)) {
      tab.classList.add('active');
    }
  });

  // 2. Alternar background dinâmico com fade to black
  const bgLayers = document.querySelectorAll('.dynamic-bg-layer');
  bgLayers.forEach(layer => {
    layer.classList.remove('active');
    if (layer.id === `bg-${productId}`) {
      layer.classList.add('active');
    }
  });

  // 3. Alternar painéis de conteúdo
  const panels = document.querySelectorAll('.product-panel');
  panels.forEach(panel => {
    panel.classList.remove('active');
    if (panel.id === `panel-${productId}`) {
      panel.classList.add('active');
    }
  });

  // Se a troca foi por clique manual, reinicia o temporizador de 5 segundos
  if (isManual) {
    resetProductCarouselTimer();
  }
}

/**
 * Rotação automática do Carrossel de Produtos a cada 5 segundos
 */
function nextProductTab() {
  currentProductIndex = (currentProductIndex + 1) % PRODUCT_IDS.length;
  switchProductTab(PRODUCT_IDS[currentProductIndex], false);
}

function startProductCarouselTimer() {
  if (!productCarouselTimer) {
    productCarouselTimer = setInterval(nextProductTab, 5000);
  }
}

function stopProductCarouselTimer() {
  if (productCarouselTimer) {
    clearInterval(productCarouselTimer);
    productCarouselTimer = null;
  }
}

function resetProductCarouselTimer() {
  stopProductCarouselTimer();
  startProductCarouselTimer();
}

// Inicializa a rotação automática e adiciona pausa ao passar o mouse na seção
document.addEventListener('DOMContentLoaded', () => {
  const moduleSection = document.querySelector('.modules-interactive-section');
  if (moduleSection) {
    startProductCarouselTimer();

    // Pausa ao passar o mouse para o usuário poder ler/interagir com calma
    moduleSection.addEventListener('mouseenter', stopProductCarouselTimer);
    moduleSection.addEventListener('mouseleave', startProductCarouselTimer);
  }
});

/**
 * Troca da imagem de capa ao clicar nas miniaturas
 */
function swapCoverImage(coverId, imgSrc, thumbElement) {
  const coverImg = document.getElementById(coverId);
  if (coverImg) {
    coverImg.src = imgSrc;
  }
  const parent = thumbElement.parentElement;
  if (parent) {
    parent.querySelectorAll('.mini-thumb').forEach(t => t.classList.remove('active'));
    thumbElement.classList.add('active');
  }
}

/**
 * Abre o Modal com o Player do Vimeo
 */
function openVimeoModal(vimeoEmbedUrl) {
  const modal = document.getElementById('vimeoModal');
  const iframe = document.getElementById('vimeoIframe');
  if (modal && iframe) {
    iframe.src = vimeoEmbedUrl;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Trava scroll da página de fundo
  }
}

/**
 * Fecha o Modal do Vimeo e para a reprodução
 */
function closeVimeoModal(event) {
  if (event && event.target && !event.target.classList.contains('vimeo-modal-backdrop') && !event.target.classList.contains('vimeo-modal-close')) {
    return;
  }
  const modal = document.getElementById('vimeoModal');
  const iframe = document.getElementById('vimeoIframe');
  if (modal && iframe) {
    iframe.src = ''; // Limpa para interromper o áudio do vídeo
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}
