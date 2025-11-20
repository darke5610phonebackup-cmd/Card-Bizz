# Card Templates

This directory contains the available templates for the digital business card.

## Templates

### 1. ClassicTemplate (`ClassicTemplate.tsx`)
- **Theme**: Navy Blue & Gold (Corporate/Premium)
- **Layout**: Split layout (Profile Left, Details Right)
- **Features**:
  - Serif typography for headings
  - Subtle background patterns
  - Professional two-column design

### 2. ModernTemplate (`ModernTemplate.tsx`)
- **Theme**: Violet/Fuchsia Gradient (Tech/Startup)
- **Layout**: Floating Card (Centered)
- **Features**:
  - Vibrant gradients
  - Glassmorphism effects
  - Rounded UI elements
  - "Floating" card aesthetic

### 3. MinimalTemplate (`MinimalTemplate.tsx`)
- **Theme**: Black & White (Swiss Style/Minimalist)
- **Layout**: Single Column (Centered)
- **Features**:
  - High contrast
  - Bold, large typography
  - Grid-based layout
  - Minimalist icons

### 4. DharmaPremiumTemplate (`DharmaPremiumTemplate.tsx`)
- **Theme**: Orange & Dark Blue (Premium/Glass)
- **Layout**: Glass Card (Centered)
- **Features**:
  - Advanced glassmorphism
  - Animated background blobs
  - Smooth transitions
  - High-end feel

## Usage

All templates accept `TemplateRendererProps`:

```typescript
interface TemplateRendererProps {
  card: Card;
  links: CardLink[];
  template?: CardTemplate | null;
}
```

To add a new template:
1. Create a new component file.
2. Implement the `TemplateRenderer` interface.
3. Export it from `index.ts`.
