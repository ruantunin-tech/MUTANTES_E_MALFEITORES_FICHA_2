# GitHub Pages Configuration for Next.js

## O que foi feito:

1. **next.config.mjs** - Configurado para exportar site estático
   - `output: 'export'` - Gera arquivos HTML estáticos
   - `basePath` e `assetPrefix` - Suporte para repositórios não raiz

2. **package.json** - Adicionado script de export
   - `npm run build` - Constrói e exporta para pasta `out/`

3. **.github/workflows/deploy.yml** - Workflow automático
   - Compila seu projeto Next.js em estático
   - Faz deploy automático para GitHub Pages

## Como usar:

1. **Fazer push do código:**
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```

2. **Configurar GitHub Pages:**
   - Vá para: Settings → Pages
   - Source: Selecione "GitHub Actions"
   - Click em "Save"

3. **Verificar deploy:**
   - Vá para: Actions
   - Veja o workflow `Deploy to GitHub Pages` executando
   - Quando terminar, seu site estará em: `https://seu-usuario.github.io/MUTANTES_E_MALFEITORES_FICHA_2/`

## Possíveis problemas:

- **404 em rotas**: Next.js em modo estático não suporta rotas dinâmicas convencionais
- **Assets não carregam**: Use `<Image>` do Next.js com `unoptimized: true` (já configurado)
- **Estilos não aparecem**: Verifique se o CSS está importado globalmente em `layout.tsx`

## Próximos passos:

Execute localmente para testar:
```bash
npm run build
```

Isso criará uma pasta `out/` com seu site estático pronto para GitHub Pages.
