# Assets de Imagens

Esta pasta contém as imagens estáticas do projeto.

## Estrutura recomendada:

```
resources/js/assets/images/
├── logos/
│   ├── logo.png
│   ├── logo-dark.png
│   └── logo-icon.svg
├── icons/
│   ├── user-avatar.png
│   └── placeholder.svg
├── backgrounds/
│   ├── hero-bg.jpg
│   └── auth-bg.png
└── illustrations/
    ├── welcome.svg
    ├── empty-state.svg
    └── error-404.svg
```

## Como usar:

```tsx
// Importar a imagem
import logoImage from '@/assets/images/logos/logo.png';
import welcomeIllustration from '@/assets/images/illustrations/welcome.svg';

// Usar no componente
function Component() {
  return (
    <div>
      <img src={logoImage} alt="Logo" />
      <img src={welcomeIllustration} alt="Bem-vindo" />
    </div>
  );
}
```

## Formatos suportados:
- PNG
- JPG/JPEG
- SVG
- WebP
- GIF

## Dicas:
1. Use SVG para ícones e ilustrações
2. Use PNG para imagens com transparência
3. Use JPG para fotos
4. Otimize as imagens antes de adicionar ao projeto
