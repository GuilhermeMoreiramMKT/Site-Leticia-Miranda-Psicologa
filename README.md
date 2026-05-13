# Site Letícia Miranda — versão Vercel

Projeto recriado a partir do export do Replit, removendo dependências específicas do Replit e mantendo frontend, visual, animações, formulário e backend do contato.

## Rodar localmente

```bash
npm install
npm run dev
```

## Deploy na Vercel

1. Suba esta pasta para um repositório GitHub.
2. Na Vercel, importe o repositório.
3. Framework: Vite.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.

## Variáveis de ambiente necessárias

Configure em Vercel > Project > Settings > Environment Variables:

```env
GOOGLE_SERVICE_ACCOUNT_JSON={...json da service account...}
GOOGLE_SHEET_ID=id_ou_url_da_planilha
NOTIFICATION_EMAIL=email_que_recebe_os_contatos
SMTP_USER=email_gmail_remetente
SMTP_PASS=senha_de_app_do_gmail
```

Observação: o envio de e-mail é opcional. Se `NOTIFICATION_EMAIL`, `SMTP_USER` ou `SMTP_PASS` não forem definidos, o contato ainda será salvo na planilha.
