// Configuração do Supabase para o projeto dedicado FDERIVS
// ATENÇÃO: Substitua os valores abaixo pelas credenciais do seu projeto dedicado no Supabase ("fderivs")

const SUPABASE_CONFIG = {
  url: 'SUA_SUPABASE_URL_AQUI', // Exemplo: https://xyzcompany.supabase.co
  anonKey: 'SUA_SUPABASE_ANON_KEY_AQUI' // Chave pública anônima do Supabase
};

let supabaseClient = null;

// Inicializa o cliente se as credenciais estiverem preenchidas
if (window.supabase && SUPABASE_CONFIG.url !== 'SUA_SUPABASE_URL_AQUI') {
  supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
}

/**
 * Envia os dados do formulário de contato para a tabela `contatos` do projeto `fderivs` no Supabase
 * @param {Object} data - Objeto contendo nome, email, empresa, interesse, mensagem
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
async function submitContactToSupabase(data) {
  // Se ainda não configurado, salva no localStorage como fallback para não perder leads
  if (!supabaseClient) {
    console.warn('Supabase ainda não configurado com chaves reais. Gravando lead localmente...');
    const localLeads = JSON.parse(localStorage.getItem('fderivs_leads') || '[]');
    localLeads.push({ ...data, created_at: new Date().toISOString() });
    localStorage.setItem('fderivs_leads', JSON.stringify(localLeads));
    return { success: true, fallback: true };
  }

  try {
    const { data: result, error } = await supabaseClient
      .from('contatos')
      .insert([
        {
          nome: data.nome,
          email: data.email,
          empresa: data.empresa || null,
          interesse: data.interesse || 'plataforma',
          mensagem: data.mensagem,
          origem: 'landing_page_fderivs',
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Erro ao enviar contato ao Supabase:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: result };
  } catch (err) {
    console.error('Exceção ao conectar no Supabase:', err);
    return { success: false, error: err.message };
  }
}

window.fderivsSupabase = {
  submitContact: submitContactToSupabase,
  setConfig: function(url, anonKey) {
    SUPABASE_CONFIG.url = url;
    SUPABASE_CONFIG.anonKey = anonKey;
    if (window.supabase) {
      supabaseClient = window.supabase.createClient(url, anonKey);
    }
  }
};

