# Design Updates - Minimalistic Railway Chatbot

## Changes Made

### 1. AI Assistants Updated
**Before:**
- 4 generic AI assistants (GPT-4, Claude, Gemini, Llama)
- Colorful emoji icons 🤖🎭💎🦙

**After:**
- 2 railway-specific assistants in Russian:
  - **ИИ Приемщик** (Receiver) - For wagon reception
  - **ИИ Проводник** (Conductor) - For passenger service

### 2. Icon System
**Replaced:** Emoji-based icons
**With:** Custom minimalistic monotonic SVG icons:
- **WagonIcon** - Simple railway wagon with wheels and windows
- **AttendantIcon** - Train conductor/attendant figure
- All icons use `stroke="currentColor"` for monotonic design
- Icons inherit text color for consistent theming

### 3. Design Philosophy
**Minimalistic Principles Applied:**
- Clean, monotonic color scheme
- Simple line-based SVG icons
- Reduced visual clutter
- Focus on functionality over decoration
- Subtle hover states with border changes
- Light font weights (font-light for headers)

### 4. UI Updates

#### Assistant Selection Screen
- Removed colored cards with checkmarks
- Implemented simple bordered buttons
- Large centered icons (64x64px)
- Russian title: "Выберите помощника"
- Selection indicated by darker borders and subtle background
- Vertical card layout optimized for mobile

#### Chat Interface Header
- Monotonic icons replace emojis
- Russian status text:
  - "В сети" (Online)
  - "Печатает..." (Typing...)
- Clean, minimal header design

#### Message Bubbles
- Icons in avatars instead of emojis
- Consistent monotonic design throughout
- Maintained streaming animation
- User messages with User icon
- Assistant messages with respective monotonic icons

### 5. Files Modified
```
src/types/chat.ts              - Updated assistant data structure
src/components/icons/
  ├── WagonIcon.tsx            - New wagon SVG icon
  ├── AttendantIcon.tsx        - New attendant SVG icon
  └── index.ts                 - Icon exports
src/components/AssistantSelector.tsx  - Minimalistic design
src/components/ChatInterface.tsx      - Updated with new icons
src/components/MessageBubble.tsx      - Updated with new icons
```

### 6. Color & Typography
- Uses semantic Tailwind colors (foreground, background)
- Opacity modifiers for subtle effects (foreground/60, foreground/20)
- font-light for reduced visual weight
- Border-based selection instead of filled backgrounds

### 7. Mobile-First Maintained
- All changes preserve mobile-first responsive design
- Touch-friendly 64px icon sizes on selection
- Adequate spacing and padding
- No small text or buttons

## Visual Characteristics
- **Monotone:** Single-color icons that adapt to theme
- **Minimal:** Clean lines, no decorative elements
- **Professional:** Railway industry appropriate
- **Accessible:** High contrast, clear typography
- **Consistent:** Unified design language throughout

## Technical Implementation
- SVG icons with stroke-based rendering
- currentColor for automatic theme adaptation
- Type-safe icon selection with TypeScript
- Reusable icon components
- No external icon dependencies (other than Lucide for UI elements)
