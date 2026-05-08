# Thiết Kế Kỹ Thuật: Cải Thiện Giao Diện Paradise GYM

## Overview

Tính năng cải thiện giao diện (ui-improvement) nhằm nâng cấp trải nghiệm người dùng của hệ thống quản lý Paradise GYM thông qua một hệ thống thiết kế hiện đại, toàn diện. Thiết kế này xác định các token thiết kế, thành phần UI, hiệu ứng động và hành vi đáp ứng để tạo ra một giao diện chuyên nghiệp, nhất quán và hấp dẫn trên tất cả các trang.

Thiết kế được xây dựng dựa trên các nguyên tắc Material Design 3 và các tiêu chuẩn tiếp cận hiện đại (WCAG 2.1 AA), đảm bảo khả năng sử dụng cho tất cả người dùng.

## Architecture

Hệ thống thiết kế được tổ chức thành các lớp sau:

```
┌─────────────────────────────────────────────────────────┐
│                    Thành Phần UI                        │
│  (Header, Sidebar, Cards, Buttons, Forms, Tables, etc) │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                  Hệ Thống Token Thiết Kế                │
│  (Colors, Typography, Spacing, Shadows, Radius, etc)   │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│              Hệ Thống Chế Độ (Light/Dark)              │
│         CSS Variables + Tailwind Dark Mode              │
└─────────────────────────────────────────────────────────┘
```

**Công nghệ triển khai**:
- **CSS Variables**: Cho phép chuyển đổi chủ đề động
- **Tailwind CSS**: Cung cấp các lớp tiện ích và hỗ trợ dark mode
- **Material Symbols**: Biểu tượng nhất quán
- **Vanilla JavaScript**: Quản lý trạng thái chủ đề và tương tác

## Components and Interfaces

### 1. Hệ Thống Màu Sắc

#### Chế Độ Sáng (Light Mode)

**Màu Chính**:
- Primary: `#1D9336` (Xanh lá cây Paradise)
- Primary Container: `#03872c`
- On Primary: `#ffffff`

**Màu Phụ**:
- Secondary: `#575f67` (Xám)
- Secondary Container: `#d8e1ea`
- On Secondary: `#ffffff`

**Màu Bậc Ba**:
- Tertiary: `#a52d59` (Hồng)
- Tertiary Container: `#c54772`
- On Tertiary: `#ffffff`

**Màu Trung Tính**:
- Background: `#f7f9ff`
- Surface: `#f7f9ff`
- Surface Container: `#ebeef3`
- Surface Container Low: `#f1f4f9`
- Surface Container High: `#e5e8ee`
- Surface Variant: `#e0e3e8`
- On Surface: `#181c20`
- On Surface Variant: `#3f4a3c`

**Màu Trạng Thái**:
- Success: `#1D9336` (Hoạt động)
- Error: `#ba1a1a` (Hết hạn)
- Warning: `#e65100` (Chờ xác nhận)
- Info: `#575f67` (Thông tin)

#### Chế Độ Tối (Dark Mode)

**Màu Chính**:
- Primary: `#4cce5f` (Xanh lá cây sáng)
- Primary Container: `#006b20`
- On Primary: `#002105`

**Màu Phụ**:
- Secondary: `#bfc8d0` (Xám sáng)
- Secondary Container: `#3f484f`
- On Secondary: `#141d23`

**Màu Bậc Ba**:
- Tertiary: `#f06292` (Hồng sáng)
- Tertiary Container: `#891544`
- On Tertiary: `#3f001a`

**Màu Trung Tính**:
- Background: `#0f172a`
- Surface: `#141720`
- Surface Container: `#22272f`
- Surface Container Low: `#1a1e24`
- Surface Container High: `#282e37`
- Surface Variant: `#2d333c`
- On Surface: `#dde1e7`
- On Surface Variant: `#a8b5a5`

### 2. Typography

**Font Chính**: Inter, Segoe UI, Roboto (fallback)

**Kích Thước & Trọng Lượng**:

| Loại | Kích Thước | Trọng Lượng | Chiều Cao Dòng | Sử Dụng |
|------|-----------|-----------|----------------|--------|
| Display 2XL | 32px | 700 | 40px | Tiêu đề trang lớn |
| Display XL | 24px | 600 | 32px | Tiêu đề trang |
| Display MD | 20px | 600 | 28px | Tiêu đề phần |
| Headline | 20px | 600 | 28px | Tiêu đề card |
| Body LG | 16px | 400 | 24px | Nội dung chính |
| Body MD | 14px | 400 | 20px | Nội dung mặc định |
| Body SM | 12px | 400 | 16px | Nội dung phụ |
| Label Bold | 12px | 600 | 16px | Nhãn nút, huy hiệu |
| Label MD | 12px | 500 | 16px | Nhãn trường |
| Label XS | 9.6px | 500 | 14px | Caption, ghi chú |

### 3. Spacing & Layout

**Khoảng Cách Chuẩn**:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

**Bán Kính Góc**:
- sm: 0.5rem (8px)
- md: 0.75rem (12px)
- lg: 1rem (16px)
- xl: 1.5rem (24px)
- 2xl: 2rem (32px)
- full: 9999px (tròn)

**Bóng Đổ**:
- Soft: `0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)`
- Medium: `0 4px 12px rgba(0, 0, 0, 0.15)`
- Premium: `0 20px 40px -12px rgba(0, 0, 0, 0.1)`
- Elevated: `0 25px 60px rgba(0, 0, 0, 0.25)`

### 4. Animations & Transitions

**Thời Gian Chuyển Tiếp**:
- Quick: 150ms (hover, focus)
- Standard: 200ms (toast, modal fade)
- Smooth: 250ms (modal slide)
- Slow: 300ms (sidebar collapse, theme switch)
- Leisurely: 400ms (page load)

**Easing Functions**:
- `cubic-bezier(0.4, 0, 0.2, 1)` - Standard (Material Design)
- `cubic-bezier(0.16, 1, 0.3, 1)` - Decelerate (entrance)
- `cubic-bezier(0.34, 1.56, 0.64, 1)` - Overshoot (bounce)

**Hiệu Ứng Chính**:
- Page Load: Slide-up 400ms + fade-in
- Hover: Scale 1.02 + shadow increase (200ms)
- Focus: Outline 2px + shadow (150ms)
- Modal: Fade-in overlay (250ms) + slide-up content (300ms)
- Toast: Slide-up 200ms + auto-dismiss 3s
- Sidebar Collapse: Width transition 300ms
- Theme Switch: All colors 300ms



## Data Models

### Theme Configuration

```typescript
interface ThemeConfig {
  mode: 'light' | 'dark';
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    background: string;
    surface: string;
    error: string;
    warning: string;
    success: string;
  };
  typography: {
    fontFamily: string;
    sizes: Record<string, string>;
    weights: Record<string, number>;
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
  transitions: Record<string, string>;
}
```

### Component State

```typescript
interface ComponentState {
  base: string;      // Trạng thái mặc định
  hover: string;     // Khi di chuột
  active: string;    // Khi được kích hoạt
  focus: string;     // Khi được focus
  disabled: string;  // Khi bị vô hiệu hóa
  loading: string;   // Khi đang tải
}
```

### Responsive Breakpoints

```typescript
interface Breakpoints {
  mobile: '< 640px';
  tablet: '640px - 1024px';
  desktop: '> 1024px';
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Color Consistency Across Themes

For any UI component, when the theme is switched from light to dark mode, all color values must be updated according to the theme configuration, and the visual hierarchy must be preserved.

**Validates: Requirements 2.1, 2.2, 2.6, 2.7**

### Property 2: Typography Consistency

For any text element on any page, the font family, size, weight, and line height must match the defined typography scale for its semantic role (heading, body, label, etc.).

**Validates: Requirements 1.2**

### Property 3: Spacing Uniformity

For any component or page layout, all padding, margin, and gap values must be multiples of the defined spacing scale (4px, 8px, 16px, 24px, 32px, 48px).

**Validates: Requirements 1.3**

### Property 4: Border Radius Consistency

For any interactive or container element, the border radius must be one of the defined values (0.5rem, 0.75rem, 1rem, 1.5rem, 2rem, or full).

**Validates: Requirements 1.4**

### Property 5: Shadow Depth Hierarchy

For any component with elevation, the shadow must correspond to one of the defined shadow levels (soft, medium, premium, elevated), and shadow intensity must increase with component elevation.

**Validates: Requirements 1.5**

### Property 6: Interactive State Feedback

For any interactive element (button, input, link), when the user hovers, focuses, or activates it, the element must provide visual feedback through color, shadow, or scale change within 200ms.

**Validates: Requirements 1.6**

### Property 7: Component Visual Consistency

For any component rendered on any of the nine pages (Dashboard, Members List, Add Member, Check-in, Expired, PT Training, PT Register, Packages, Birthday), the component styling must be identical regardless of page context.

**Validates: Requirements 1.7**

### Property 8: Contrast Ratio Accessibility

For any text element in dark mode, the contrast ratio between text color and background must be at least 4.5:1 for normal text and 3:1 for large text.

**Validates: Requirements 2.5**

### Property 9: Theme Persistence

For any user session, when the user switches themes and then closes and reopens the application, the previously selected theme must be restored from localStorage.

**Validates: Requirements 2.4**

### Property 10: Transition Smoothness

For any theme switch, all color transitions must complete within 300ms using the standard easing function, and no visual flicker or jarring changes should occur.

**Validates: Requirements 2.3**

### Property 11: Status Color Encoding

For any status indicator (badge, indicator, text), the color must uniquely encode the status (success=green, error=red, warning=orange, info=gray) and remain consistent in both light and dark modes.

**Validates: Requirements 2.7**

### Property 12: Responsive Layout Adaptation

For any page layout, when the viewport width changes across breakpoints (mobile <640px, tablet 640-1024px, desktop >1024px), the layout must adapt appropriately with sidebar collapsing on mobile and stacking on tablet.

**Validates: Requirements 1.1 (implicit responsive requirement)**



## Error Handling

### Theme System Errors

**Scenario**: localStorage is unavailable or corrupted
- **Handling**: Fall back to light mode as default, log warning to console
- **User Impact**: Theme preference not persisted, but app remains functional

**Scenario**: CSS variables not supported (legacy browsers)
- **Handling**: Provide fallback inline styles, use Tailwind classes as primary
- **User Impact**: Theme switching may not work smoothly, but colors still apply

**Scenario**: Invalid color value in theme configuration
- **Handling**: Validate color format on theme initialization, use fallback color
- **User Impact**: Specific component may show incorrect color, but layout remains intact

### Component Rendering Errors

**Scenario**: Image fails to load in avatar
- **Handling**: Display initials-based avatar as fallback
- **User Impact**: Avatar shows initials instead of image, functionality preserved

**Scenario**: Icon font fails to load
- **Handling**: Display text label or emoji fallback
- **User Impact**: Icons may not render, but text labels provide context

### Responsive Design Errors

**Scenario**: Viewport size detection fails
- **Handling**: Default to desktop layout, allow manual sidebar toggle
- **User Impact**: Layout may not adapt automatically, but manual control available

## Testing Strategy

### Unit Testing Approach

**Focus Areas**:
1. **Color Conversion**: Test light-to-dark color mapping accuracy
2. **Typography Application**: Verify font sizes and weights apply correctly
3. **Spacing Calculations**: Ensure spacing values are applied consistently
4. **Theme Persistence**: Verify localStorage save/restore functionality
5. **Component Rendering**: Test each component renders with correct styles
6. **Responsive Breakpoints**: Test layout changes at breakpoint boundaries
7. **Accessibility**: Test contrast ratios and focus states

**Example Unit Tests**:
- Test that primary color in dark mode is `#4cce5f`
- Test that body text uses 14px font size
- Test that spacing values are multiples of 4px
- Test that theme toggle saves to localStorage
- Test that avatar fallback shows initials when image fails
- Test that sidebar collapses on mobile viewport

### Property-Based Testing Approach

**Configuration**:
- Minimum 100 iterations per property test
- Use fast-check or similar library for JavaScript
- Tag each test with: `Feature: ui-improvement, Property {number}: {property_text}`

**Property Test Examples**:

```javascript
// Property 1: Color Consistency
test('Feature: ui-improvement, Property 1: Color consistency across themes', () => {
  fc.assert(
    fc.property(fc.record({
      componentType: fc.constantFrom('button', 'card', 'badge'),
      initialTheme: fc.constantFrom('light', 'dark')
    }), (data) => {
      const component = renderComponent(data.componentType, data.initialTheme);
      const lightColors = extractColors(component);
      switchTheme('dark');
      const darkColors = extractColors(component);
      // All colors should be updated
      expect(darkColors).not.toEqual(lightColors);
      // Visual hierarchy should be preserved
      expect(getContrastRatio(darkColors)).toBeGreaterThanOrEqual(4.5);
    })
  );
});

// Property 2: Typography Consistency
test('Feature: ui-improvement, Property 2: Typography consistency', () => {
  fc.assert(
    fc.property(fc.record({
      textRole: fc.constantFrom('heading', 'body', 'label', 'caption'),
      pageContext: fc.constantFrom('dashboard', 'members', 'checkin', 'packages')
    }), (data) => {
      const element = renderTextElement(data.textRole, data.pageContext);
      const computed = window.getComputedStyle(element);
      const expected = TYPOGRAPHY_SCALE[data.textRole];
      expect(computed.fontSize).toBe(expected.size);
      expect(computed.fontWeight).toBe(expected.weight);
      expect(computed.lineHeight).toBe(expected.lineHeight);
    })
  );
});

// Property 3: Spacing Uniformity
test('Feature: ui-improvement, Property 3: Spacing uniformity', () => {
  fc.assert(
    fc.property(fc.record({
      component: fc.constantFrom('button', 'card', 'input', 'badge'),
      property: fc.constantFrom('padding', 'margin', 'gap')
    }), (data) => {
      const element = renderComponent(data.component);
      const value = getComputedSpacing(element, data.property);
      const pxValue = parseFloat(value);
      // Must be multiple of 4px
      expect(pxValue % 4).toBe(0);
    })
  );
});

// Property 8: Contrast Ratio Accessibility
test('Feature: ui-improvement, Property 8: Contrast ratio accessibility', () => {
  fc.assert(
    fc.property(fc.record({
      textColor: fc.hexaString(),
      backgroundColor: fc.hexaString(),
      theme: fc.constantFrom('light', 'dark')
    }), (data) => {
      const ratio = calculateContrastRatio(data.textColor, data.backgroundColor);
      if (data.theme === 'dark') {
        expect(ratio).toBeGreaterThanOrEqual(4.5);
      }
    })
  );
});

// Property 9: Theme Persistence
test('Feature: ui-improvement, Property 9: Theme persistence', () => {
  fc.assert(
    fc.property(fc.constantFrom('light', 'dark'), (theme) => {
      setTheme(theme);
      expect(localStorage.getItem('gym-theme')).toBe(theme);
      // Simulate page reload
      location.reload();
      expect(getCurrentTheme()).toBe(theme);
    })
  );
});

// Property 10: Transition Smoothness
test('Feature: ui-improvement, Property 10: Transition smoothness', () => {
  fc.assert(
    fc.property(fc.constantFrom('light', 'dark'), (targetTheme) => {
      const startTime = performance.now();
      switchTheme(targetTheme);
      const endTime = performance.now();
      const duration = endTime - startTime;
      expect(duration).toBeLessThanOrEqual(300);
    })
  );
});
```

### Integration Testing

**Focus Areas**:
1. **Cross-Page Consistency**: Verify same components look identical across all 9 pages
2. **Theme Switching**: Test theme switch affects all pages and persists
3. **Responsive Behavior**: Test layout adaptation across all pages at different breakpoints
4. **Accessibility**: Test keyboard navigation and screen reader compatibility

### Manual Testing Checklist

- [ ] Light mode colors match design specification
- [ ] Dark mode colors match design specification
- [ ] All text meets 4.5:1 contrast ratio in dark mode
- [ ] Theme toggle works and persists
- [ ] All components render consistently across pages
- [ ] Hover states work on all interactive elements
- [ ] Focus states visible on keyboard navigation
- [ ] Sidebar collapses on mobile (<640px)
- [ ] Sidebar collapsible on tablet (640-1024px)
- [ ] Full sidebar on desktop (>1024px)
- [ ] All animations are smooth (no jank)
- [ ] Modal animations work correctly
- [ ] Toast notifications appear and dismiss
- [ ] Avatar fallback works when image fails
- [ ] All icons render correctly



## Component Specifications

### Header Component

**Structure**:
- Premium card with backdrop blur (12px)
- Height: 56px (14 * 4px)
- Sticky positioning at top
- Flex layout with space-between

**Styling**:
- Background: `var(--bg-card)` with `backdrop-filter: blur(12px)`
- Border: 1px solid `var(--border-color)`
- Shadow: soft shadow
- Padding: md (16px) horizontal, sm (8px) vertical

**Content Areas**:
1. Left: Breadcrumb or page title
2. Center: (empty or search)
3. Right: Theme toggle, notifications, user profile

**Interactive States**:
- Theme toggle: Rotate 20deg on hover
- Buttons: Scale 1.02 on hover, 200ms transition

### Sidebar Component

**Structure**:
- Vertical navigation with collapsible sections
- Width: 256px (expanded), 64px (collapsed)
- Gradient background
- Smooth collapse animation (300ms)

**Sections**:
1. Logo area (32px height)
2. Navigation items (accordion groups)
3. Logout button (bottom)

**Active State**:
- Background: Linear gradient with primary color
- Left border: 4px solid primary
- Text: Bold, primary color
- Icon: Filled

**Collapsed State**:
- Width: 64px
- Labels hidden
- Icons centered
- Tooltips on hover

**Mobile Behavior** (<640px):
- Sidebar hidden by default
- Toggle button in header
- Overlay when open
- Slide-in animation from left

### Card Component

**Base Styling**:
- Background: `var(--bg-card)` with `backdrop-filter: blur(12px)`
- Border: 1px solid `var(--border-color)`
- Border-radius: xl (24px)
- Padding: lg (24px)
- Shadow: soft shadow
- Transition: all 300ms ease

**Hover State**:
- Shadow: premium shadow
- Transform: translateY(-2px)
- Transition: 200ms

**Variants**:
- Elevated: premium shadow
- Outlined: no shadow, thicker border
- Flat: no shadow, no border

### Button Component

**Base Styling**:
- Padding: sm (8px) horizontal, xs (4px) vertical
- Border-radius: md (12px)
- Font: label-bold (12px, 600)
- Transition: all 200ms ease

**Variants**:
1. **Primary**: 
   - Background: primary color
   - Text: white
   - Hover: darker shade, shadow
   
2. **Secondary**:
   - Background: surface-container
   - Text: on-surface
   - Hover: darker shade
   
3. **Tertiary**:
   - Background: transparent
   - Text: primary
   - Border: 1px solid primary
   - Hover: light background

**States**:
- Hover: Scale 1.02, shadow increase
- Active: Scale 0.98, shadow decrease
- Focus: Outline 2px solid primary
- Disabled: Opacity 0.5, cursor not-allowed

### Form Input Component

**Base Styling**:
- Padding: sm (8px) horizontal, xs (4px) vertical
- Border-radius: md (12px)
- Border: 1px solid `var(--border-color)`
- Font: body-md (14px)
- Transition: all 200ms ease

**States**:
- Default: border-color
- Hover: border-color darker
- Focus: 
  - Border: primary color
  - Shadow: 0 0 0 4px rgba(primary, 0.1)
  - Outline: none
- Error: border-color red, shadow red
- Disabled: background lighter, cursor not-allowed

**Placeholder**:
- Color: on-surface-variant
- Opacity: 0.6

### Table Component

**Structure**:
- Header row with bold text
- Body rows with alternating background
- Hover effect on rows
- Sticky header on scroll

**Styling**:
- Header: background surface-container-high, bold text
- Body rows: background surface
- Alternating rows: background surface-container-low
- Hover: background surface-container, shadow soft
- Borders: 1px solid border-color between rows

**Responsive**:
- Desktop: Full table
- Tablet: Horizontal scroll
- Mobile: Card layout (stack rows as cards)

### Badge Component

**Base Styling**:
- Padding: 2px 8px
- Border-radius: full (9999px)
- Font: label-bold (9.6px, 700)
- Text-transform: uppercase
- Letter-spacing: 0.04em

**Status Variants**:
- Success: background #e7f5e9, text #1D9336
- Error: background #ffdad6, text #93000a
- Warning: background #fff3e0, text #e65100
- Info: background #ebeef3, text #181c20

**Dark Mode**:
- Success: background #0b2010, text #4cce5f
- Error: background #25080f, text #ff8080
- Warning: background #1f1200, text #ff9040
- Info: background #22272f, text #dde1e7

### Modal Component

**Structure**:
- Overlay: fixed, inset 0, z-index 9000
- Background: rgba(0, 0, 0, 0.45)
- Backdrop filter: blur(3px)
- Card: max-width 640px, max-height 90vh

**Animations**:
- Overlay: fade-in 250ms
- Card: slide-up 300ms with overshoot easing

**Close Button**:
- Position: absolute top-right
- Icon: close
- Hover: background surface-container

**Dark Mode**:
- Overlay: rgba(0, 0, 0, 0.72)
- Card: background surface-container

### Toast Component

**Structure**:
- Fixed position: bottom-right
- Flex layout with icon + message
- Auto-dismiss: 3000ms

**Styling**:
- Padding: 10px 20px
- Border-radius: lg (16px)
- Shadow: medium shadow
- Font: body-md (14px, 500)

**Variants**:
- Success: background #1D9336, text white
- Error: background #ba1a1a, text white
- Info: background #575f67, text white

**Animation**:
- Entrance: slide-up 200ms
- Exit: fade-out 200ms

### Avatar Component

**Image Variant**:
- Width/Height: 36px (md), 32px (sm), 48px (lg)
- Border-radius: 50%
- Border: 1px solid border-color
- Object-fit: cover

**Initials Variant**:
- Background: primary color (varies by name hash)
- Text: white, bold
- Font-size: 14px (md), 12px (sm), 16px (lg)
- Display: flex, center

**Fallback**:
- Show initials when image fails to load
- Consistent color based on name



## Responsive Design Guidelines

### Breakpoints

```
Mobile:  < 640px   (phones, small tablets)
Tablet:  640-1024px (tablets, small laptops)
Desktop: > 1024px  (laptops, desktops)
```

### Mobile Layout (<640px)

**Sidebar**:
- Hidden by default
- Toggle button in header
- Overlay when open
- Slide-in from left (300ms)
- Full height, full width

**Header**:
- Compact: height 56px
- Logo hidden, icon only
- Buttons stacked vertically if needed

**Content**:
- Full width with padding
- Single column layout
- Cards stack vertically
- Tables convert to card layout

**Navigation**:
- Bottom navigation or hamburger menu
- Touch-friendly tap targets (min 44px)

### Tablet Layout (640-1024px)

**Sidebar**:
- Collapsible (toggle button)
- Width: 256px (expanded) or 64px (collapsed)
- Can be toggled by user

**Header**:
- Standard height 56px
- All controls visible

**Content**:
- Sidebar + content layout
- Two-column tables possible
- Cards in 2-column grid

### Desktop Layout (>1024px)

**Sidebar**:
- Always visible
- Width: 256px
- Can be collapsed by user

**Header**:
- Standard height 56px
- All controls visible

**Content**:
- Full width with sidebar
- Multi-column layouts
- Tables with all columns visible

### Responsive Typography

- Heading sizes reduce on mobile
- Body text remains readable (min 14px)
- Line height increases on mobile for readability

### Responsive Spacing

- Padding reduces on mobile (lg → md)
- Gaps reduce on mobile (md → sm)
- Margins reduce on mobile (xl → lg)

## Implementation Guidelines

### CSS Architecture

**File Structure**:
```
assets/css/
├── main.css          (all styles, organized by section)
├── variables.css     (CSS variables - optional, can be in main.css)
└── responsive.css    (media queries - optional, can be in main.css)
```

**CSS Variables Organization**:
```css
:root {
  /* Colors - Light Mode */
  --primary: #1D9336;
  --primary-container: #03872c;
  --on-primary: #ffffff;
  
  /* Colors - Neutral */
  --bg-main: #f8fafc;
  --bg-card: rgba(255, 255, 255, 0.85);
  --text-main: #1a1c1e;
  --text-muted: #5b646b;
  --border-color: rgba(0, 0, 0, 0.08);
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  
  /* Border Radius */
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  --radius-2xl: 2rem;
  
  /* Shadows */
  --shadow-soft: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  --shadow-medium: 0 4px 12px rgba(0, 0, 0, 0.15);
  --shadow-premium: 0 20px 40px -12px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition-quick: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-standard: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-smooth: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.dark {
  /* Colors - Dark Mode */
  --primary: #4cce5f;
  --primary-container: #006b20;
  --on-primary: #002105;
  
  /* Colors - Neutral */
  --bg-main: #0f172a;
  --bg-card: rgba(30, 41, 59, 0.7);
  --text-main: #f1f5f9;
  --text-muted: #94a3b8;
  --border-color: rgba(255, 255, 255, 0.1);
}
```

### Tailwind Configuration

**Extend Configuration**:
```javascript
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "brand-primary": "#1D9336",
        // ... other colors
      },
      spacing: {
        "xs": "4px",
        "sm": "8px",
        "md": "16px",
        "lg": "24px",
        "xl": "32px",
        "2xl": "48px"
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "2xl": "2rem"
      },
      boxShadow: {
        "soft": "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
        "premium": "0 20px 40px -12px rgba(0, 0, 0, 0.1)"
      }
    }
  }
}
```

### JavaScript Implementation

**Theme Management**:
```javascript
// Get current theme
function getCurrentTheme() {
  return localStorage.getItem('gym-theme') || 'light';
}

// Set theme
function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('gym-theme', theme);
  updateThemeIcon(theme);
}

// Toggle theme
function toggleTheme() {
  const current = getCurrentTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
}

// Initialize theme on page load
function initTheme() {
  const saved = localStorage.getItem('gym-theme');
  const theme = saved || 'light';
  setTheme(theme);
}
```

**Component Utilities**:
```javascript
// Status badge helper
function statusBadge(status) {
  const map = {
    active: { bg: '#e7f5e9', text: '#1D9336', label: 'Hoạt động' },
    expired: { bg: '#ffdad6', text: '#93000a', label: 'Hết hạn' },
    pending: { bg: '#fff3e0', text: '#e65100', label: 'Chờ XN' },
    inactive: { bg: '#e0e3e8', text: '#3f4a3c', label: 'Không HĐ' }
  };
  const s = map[status] || { bg: '#ebeef3', text: '#181c20', label: status };
  return `<span style="background:${s.bg};color:${s.text};padding:2px 8px;border-radius:999px;font-size:9.6px;font-weight:700;text-transform:uppercase;">${s.label}</span>`;
}

// Avatar helper
function avatar(name, imageUrl, size = 'md') {
  if (imageUrl) {
    const dim = size === 'sm' ? 32 : size === 'lg' ? 48 : 36;
    return `<img src="${imageUrl}" alt="${name}" width="${dim}" height="${dim}" style="width:${dim}px;height:${dim}px;border-radius:50%;object-fit:cover;border:1px solid #becab9;">`;
  }
  // Fallback to initials
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  const colors = ['#006b20', '#a52d59', '#575f67', '#03872c'];
  const bg = colors[name.charCodeAt(0) % colors.length];
  const dim = size === 'sm' ? 32 : size === 'lg' ? 48 : 36;
  return `<div style="width:${dim}px;height:${dim}px;border-radius:50%;background:${bg};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;">${initials}</div>`;
}
```

### Accessibility Considerations

**Color Contrast**:
- All text must have minimum 4.5:1 contrast ratio
- Large text (18px+) must have minimum 3:1 contrast ratio
- Test with tools like WebAIM Contrast Checker

**Focus States**:
- All interactive elements must have visible focus state
- Focus outline: 2px solid primary color
- Focus outline-offset: 2px

**Keyboard Navigation**:
- All interactive elements must be keyboard accessible
- Tab order must be logical
- Modals must trap focus

**Screen Readers**:
- Use semantic HTML (button, input, label, etc.)
- Add aria-labels where needed
- Use aria-live for dynamic content updates

**Touch Targets**:
- Minimum 44px × 44px on mobile
- Adequate spacing between targets

## Design Tokens Summary

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Primary | #1D9336 | #4cce5f | Buttons, links, active states |
| Error | #ba1a1a | #ff8080 | Error messages, expired status |
| Warning | #e65100 | #ff9040 | Warning messages, pending status |
| Success | #1D9336 | #4cce5f | Success messages, active status |
| Background | #f7f9ff | #0f172a | Page background |
| Surface | #f7f9ff | #141720 | Card backgrounds |
| On Surface | #181c20 | #dde1e7 | Text on surfaces |
| Border | rgba(0,0,0,0.08) | rgba(255,255,255,0.1) | Borders |

