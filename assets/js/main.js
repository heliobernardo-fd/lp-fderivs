/**
 * FDERIVS - Interações de Frontend (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu Mobile
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');

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
 * Troca dinâmica da imagem preview do módulo ao clicar nas miniaturas
 */
function swapPreview(sectionId, imgSrc) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const preview = section.querySelector('.preview-img');
  if (preview) {
    preview.src = imgSrc;
  }

  // Atualizar classe ativa na miniatura
  const strip = section.querySelector('.thumbnail-strip');
  if (strip) {
    strip.querySelectorAll('.thumb-pic').forEach(img => {
      img.classList.remove('active');
      if (img.src === imgSrc) img.classList.add('active');
    });
  }
}
