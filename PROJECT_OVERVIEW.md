# Documentação Técnica e Operacional: Landing Page FDerivs

> **REGRA DE ISOLAMENTO TOTAL**: Este projeto é 100% autônomo e padronizado sob o nome **`lp-fderivs`**.
> - **Vercel Project Name**: `lp-fderivs` (URL de produção dedicada: `https://lp-fderivs.vercel.app`)
> - **GitHub Repository**: `lp-fderivs`
> - **Supabase Database**: `lp-fderivs` (Tabela `contatos`)
> - **NÃO compartilha** arquivos, variáveis, rotas ou bancos com `lp-cpa`.

---

## 1. Visão Geral do Projeto
- **Objetivo**: Recriar integralmente a Landing Page corporativa da FDerivs, migrando da versão legada em WordPress ([https://deepskyblue-coyote-595128.hostingersite.com/](https://deepskyblue-coyote-595128.hostingersite.com/)) para uma stack moderna, ultra-rápida, segura e com custo zero de infraestrutura.
- **Stack Tecnológica**:
  - **Frontend**: HTML5 Semântico, CSS3 Moderno (Design System Dark/Fintech, Responsivo), JavaScript (ES6+ Vanilla puro).
  - **Imagens & Mídias**: 57 mídias otimizadas salvas localmente em `assets/images/` (logos em PNG transparente, previews dos módulos Appreciator, Polynomial, Instruments e Risk Manager, livro e telas de cursos).
  - **Backend / Database**: [Supabase](https://supabase.com/) dedicado ao projeto `fderivs`.
  - **Deploy & Hospedagem**: [Vercel](https://vercel.com/) sob o nome de projeto `fderivs`.

---

## 2. Pipeline de CI/CD & Automação ("Comando Único de Deploy")
O fluxo de publicação na Vercel está automatizado e isolado via script próprio:
- Sempre que você pedir *"fazer deploy"* ou *"publicar"*, executamos o script dedicado:
  ```bash
  node deploy-fderivs.js
  ```
  ou
  ```powershell
  .\deploy.ps1
  ```
- O comando sobe os arquivos exclusivamente para o projeto **`fderivs`** na Vercel via API oficial, sem tocar em nenhum outro projeto da sua conta.

---

## 3. Banco de Dados: Supabase (`fderivs`)
Para criar a tabela no projeto `fderivs` no painel do Supabase, o SQL necessário é:

```sql
-- Criar tabela de contatos/leads da FDerivs
create table if not exists contatos (
  id uuid default gen_random_uuid() primary key,
  nome text not null,
  email text not null,
  empresa text,
  interesse text default 'plataforma',
  mensagem text not null,
  origem text default 'landing_page_fderivs',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS (Segurança)
alter table contatos enable row level security;

-- Permitir inserção anônima vinda da landing page
create policy "Permitir insercao anonima de contatos"
on contatos for insert
to anon
with check (true);
```

---

## 4. Estrutura de Pastas do Projeto
```
e:\FDERIVS\lp\
├── assets/
│   ├── css/
│   │   └── style.css          # Design System Fintech Dark responsivo
│   ├── js/
│   │   ├── main.js            # Interações, menu mobile e validação
│   │   └── supabaseClient.js  # Conexão dedicada com o Supabase
│   └── images/                # 57 imagens e logos da FDerivs
├── index.html                 # Estrutura HTML5 semântica completa
├── deploy-fderivs.js          # Script de deploy Node.js isolado
├── deploy.ps1                 # Script de deploy PowerShell isolado
├── PROJECT_OVERVIEW.md        # Esta documentação
└── HANDOFF.md                 # Status atual e próximos passos
```
