# HANDOFF & Status do Projeto: FDerivs Landing Page

> **REGRA DE ISOLAMENTO RIGOROSO**:
> - Todo este projeto opera sob o nome **`fderivs`**.
> - **Repositório GitHub**: `fderivs`
> - **Projeto Vercel**: `fderivs` (URL de produção dedicada)
> - **Banco Supabase**: `fderivs` (tabela `contatos`)
> - **Totalmente independente** de `cpa-fdlearn` ou quaisquer outros projetos existentes.

---

## 📌 Status Atual
- **Fase**: Fase 3 Concluída (Deploy Inicial de Produção na Vercel Concluído)
- **Data da última atualização**: 03/11/2026

---

## 🌐 URLs Oficiais de Produção (Vercel)
- **Nome do Projeto**: `lp-fderivs` (Totalmente padronizado)
- **Project ID**: `prj_50GHu1YY3P5uoQuSOZhkoh6Qgso6`
- **Org / Team na Vercel**: `fderivs`
- **URL Oficial Principal**: **[https://lp-fderivs.vercel.app](https://lp-fderivs.vercel.app)**
- **Painel de Inspeção**: [https://vercel.com/fderivs/lp-fderivs](https://vercel.com/fderivs/lp-fderivs)

---

## ✅ O Que Já Foi Realizado

1. **Isolamento de Nomes Definido**:
   - Todo o projeto foi padronizado sob o identificador único **`fderivs`**.
   - Scripts dedicados criados: [deploy-fderivs.js](file:///e:/FDERIVS/lp/deploy-fderivs.js) e [deploy.ps1](file:///e:/FDERIVS/lp/deploy.ps1) já configurados para direcionar à Vercel sob o nome de projeto `fderivs`.

2. **Extração Completa de Ativos (57 arquivos)**:
   - Todas as imagens originais da plataforma em alta resolução salvas em `assets/images/`:
     - Logos transparentes da FDerivs.
     - Ícones e telas dos 4 módulos: **Appreciator**, **Polynomial**, **Instruments** e **Risk Manager**.
     - Capa 3D do livro *Produtos Estruturados: Uma Visão Quântica*.
     - Telas dos cursos e formações quantitativas da FDLearn.

3. **Frontend HTML5 + CSS3 + JS Puro Desenvolvido**:
   - [index.html](file:///e:/FDERIVS/lp/index.html): Código limpo, sem Elementor ou plugins lentos do WordPress.
     - Barra de novidades superior.
     - Navbar fixa responsiva com logo e menu mobile.
     - Hero Section com estatísticas de mercado e visual mockado da plataforma.
     - Seção comparativa dos 4 Módulos principais.
     - Linhas de detalhamento módulo a módulo com listas de recursos e links diretos para os vídeos oficiais.
     - Banner de conversão.
     - Grid com os 4 Cursos da FDLearn.
     - Destaque editorial do livro *Produtos Estruturados*.
     - 3 Pilares de Consultoria Quantitativa.
     - Formulário corporativo com validação e feedback instantâneo.
     - Rodapé corporativo completo.
   - [assets/css/style.css](file:///e:/FDERIVS/lp/assets/css/style.css): Design System Dark moderno no padrão Fintech, paleta azul/ciano, tipografia Inter & Outfit, efeitos de vidro (glassmorphism) e total responsividade para mobile.
   - [assets/js/main.js](file:///e:/FDERIVS/lp/assets/js/main.js): Controle de menu mobile, navbar com blur dinâmico e validação de formulário.
   - [assets/js/supabaseClient.js](file:///e:/FDERIVS/lp/assets/js/supabaseClient.js): Conexão direta com a tabela `contatos` do Supabase para captação de leads.

---

## ⏳ Próximos Passos Imediatos

1. **Deploy Inicial de Teste na Vercel**:
   - Executar o deploy para provisionar o projeto `fderivs` na Vercel e gerar a URL oficial de homologação.
2. **Configurar o Banco de Dados no Supabase (`fderivs`)**:
   - Criar um novo projeto no Supabase chamado `fderivs`.
   - Executar o script SQL da tabela `contatos` (disponível no `PROJECT_OVERVIEW.md`).
   - Inserir a URL e Anon Key no `supabaseClient.js`.
3. **Criação do Repositório GitHub (`fderivs`)**:
   - Criar o repositório `fderivs` no seu perfil do GitHub e subir os arquivos locais.
