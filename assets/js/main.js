/**
 * FDERIVS - Interações de Frontend (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu Mobile Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('open');
    });

    // Fechar ao clicar em um link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('open');
      });
    });
  }

  // 2. Navbar com blur dinâmico no scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.style.background = 'rgba(10, 13, 20, 0.95)';
      navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
    } else {
      navbar.style.background = 'rgba(10, 13, 20, 0.85)';
      navbar.style.boxShadow = 'none';
    }
  });

  // 3. Validação e Envio do Formulário de Contato
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');
  const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
  const btnSpinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Limpar erros anteriores
      document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
      formStatus.style.display = 'none';
      formStatus.className = 'form-status';

      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const empresa = document.getElementById('empresa').value.trim();
      const interesse = document.getElementById('interesse').value;
      const mensagem = document.getElementById('mensagem').value.trim();

      let hasError = false;

      if (!nome) {
        document.getElementById('error-nome').textContent = 'Por favor, informe seu nome completo.';
        hasError = true;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        document.getElementById('error-email').textContent = 'Informe um e-mail corporativo válido.';
        hasError = true;
      }

      if (!mensagem || mensagem.length < 5) {
        document.getElementById('error-mensagem').textContent = 'Por favor, informe sua mensagem ou necessidade.';
        hasError = true;
      }

      if (hasError) return;

      // Estado de Carregamento
      submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Enviando...';
      if (btnSpinner) btnSpinner.style.display = 'inline-block';

      try {
        const payload = { nome, email, empresa, interesse, mensagem };
        const result = await window.fderivsSupabase.submitContact(payload);

        if (result.success) {
          formStatus.textContent = 'Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.';
          formStatus.classList.add('success');
          formStatus.style.display = 'block';
          form.reset();
        } else {
          throw new Error(result.error || 'Erro ao registrar contato.');
        }
      } catch (err) {
        formStatus.textContent = 'Ocorreu um erro ao enviar. Por favor, tente novamente ou entre em contato pelo telefone.';
        formStatus.classList.add('error');
        formStatus.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Enviar Mensagem';
        if (btnSpinner) btnSpinner.style.display = 'none';
      }
    });
  }
});

