# Plutchik Wheel Explorer

An interactive web application for exploring Robert Plutchik's wheel of emotions, allowing users to discover primary emotions at different intensities and understand how emotions combine to form complex dyadic emotions.

**Experience Qualities**:
1. **Educational** - Users should feel they're learning something meaningful about emotional theory in an intuitive, visual way
2. **Exploratory** - The interface should invite curiosity and experimentation, encouraging users to click and discover relationships between emotions
3. **Clarity** - Despite the complexity of the emotion model, the UI should feel clean, organized, and never overwhelming

**Complexity Level**: Light Application (multiple features with basic state)
This is a single-page interactive visualization tool with state management for emotion selection and dyad calculation, but doesn't require complex routing or backend integration.

## Essential Features

### 1. Interactive Emotion Wheel Visualization
- **Functionality**: SVG-rendered circular wheel with 8 radial petals, each subdivided into 3 concentric intensity bands (outer=weak, middle=normal, inner=strong)
- **Purpose**: Provides an intuitive, visual representation of Plutchik's emotion model that users can interact with directly
- **Trigger**: App loads with the wheel rendered and ready for interaction
- **Progression**: User sees wheel → hovers over petal/band → sees tooltip → clicks to select → sees detailed information
- **Success criteria**: Wheel renders correctly on all screen sizes, all 24 emotion bands are clickable and visually distinct

### 2. Single Emotion Selection & Details
- **Functionality**: Click any emotion band to select it and view detailed information about that specific emotion and intensity
- **Purpose**: Allows users to explore individual emotions in depth, understanding the nuances between intensity levels
- **Trigger**: User clicks on any of the 24 emotion bands in the wheel
- **Progression**: Click emotion band → petal highlights → center panel updates → side panel shows details with emotion name, intensity label, and description
- **Success criteria**: Selection is visually clear, information is accurate and well-formatted, previous selection is cleared

### 3. Dyad Discovery (Two-Emotion Combinations)
- **Functionality**: Select two primary emotions to reveal the dyad emotion they create together (primary, secondary, tertiary, or opposite dyads based on emotional distance)
- **Purpose**: Teaches users how basic emotions combine to form more complex emotional states across all dyad types
- **Trigger**: User clicks a second emotion while one is already selected, or selects from the Dyad Browser
- **Progression**: First emotion selected → second emotion clicked → dyad calculation → both petals highlight → connecting visual appears → center panel shows dyad name and description
- **Success criteria**: All dyad types (primary, secondary, tertiary, opposite) are calculated and displayed correctly, both emotions remain highlighted, dyad information is clear and accurate

### 4. Dyad Browser
- **Functionality**: Tabbed interface showing all dyads organized by type (Primary, Secondary, Tertiary, Opposite) with descriptions and the ability to select any dyad to highlight its component emotions
- **Purpose**: Provides comprehensive exploration of all emotional combinations, allowing users to browse and discover dyads systematically
- **Trigger**: User switches to the "Dyad Browser" tab in the right panel
- **Progression**: Browse tab → select dyad type (Primary/Secondary/Tertiary/Opposite) → click dyad → emotions highlight on wheel → center panel shows dyad details
- **Success criteria**: All 28 dyads are listed correctly, selecting a dyad highlights the two emotions on the wheel at normal intensity, dyad types are clearly distinguished

### 5. Keyboard Navigation & Accessibility
- **Functionality**: Full keyboard control using Tab, Arrow keys, Enter/Space for selection, with comprehensive ARIA labels
- **Purpose**: Ensures all users can access and use the application regardless of input method or assistive technology
- **Trigger**: User presses Tab or Arrow keys to navigate
- **Progression**: Tab/Arrow to navigate → visual focus indicator appears → Enter/Space to select → same selection behavior as click
- **Success criteria**: All interactive elements are keyboard accessible, focus is visible and logical, screen readers announce emotion names and states correctly

### 5. Clear Selection Control
- **Functionality**: Button to reset all selections and return to the default state
- **Purpose**: Allows users to start fresh exploration without confusion
- **Trigger**: User clicks "Clear Selection" button
- **Progression**: Click clear button → all highlights removed → center panel returns to default → side panel hides or shows default content
- **Success criteria**: Selection state fully resets, UI returns to initial appearance

## Edge Case Handling

- **Non-adjacent dyad selection**: All emotion combinations now form valid dyads (primary for adjacent, secondary for 2-step, tertiary for 3-step, opposite for 4-step apart)
- **Same emotion clicked twice**: Treat as deselection, clearing the selection
- **Third emotion click**: Clear previous selections and start new selection with the third emotion as first
- **Dyad browser selection**: Automatically highlights both component emotions on the wheel at normal intensity
- **Mobile viewport**: Ensure wheel scales appropriately, tooltips don't overflow screen, touch targets are large enough (44×44px minimum), tabs are accessible
- **Rapid clicking**: Debounce or handle state transitions smoothly to avoid visual glitches
- **Keyboard focus on load**: Ensure first interactive element can receive focus immediately
- **Tab switching**: Preserve selection state when switching between Selection and Dyad Browser tabs

## Design Direction

The design should evoke feelings of scientific clarity combined with emotional warmth. Think of a psychology textbook that's been reimagined with modern, approachable design—professional but not clinical, colorful but not overwhelming. The wheel should feel like a sophisticated data visualization that invites touch and exploration, with smooth transitions that make discovering relationships feel rewarding.

## Color Selection

**Approach**: Each primary emotion gets a distinct hue arranged around a color wheel, with intensity expressed through saturation and lightness (lighter/desaturated on outer ring, vibrant/saturated in the center). Colors should be emotionally appropriate while maintaining sufficient contrast.

- **Primary Color (Joy)**: oklch(0.85 0.15 85) - Warm yellow, communicates happiness and energy
- **Trust (Green-Cyan)**: oklch(0.75 0.12 180) - Cool teal, suggests reliability and calm
- **Fear (Green)**: oklch(0.70 0.12 140) - Muted green, natural and cautious
- **Surprise (Cyan)**: oklch(0.75 0.11 220) - Bright cyan, unexpected and sharp
- **Sadness (Blue)**: oklch(0.55 0.15 250) - Deep blue, classic emotion color
- **Disgust (Purple)**: oklch(0.60 0.14 300) - Purple-magenta, visceral and intense
- **Anger (Red)**: oklch(0.60 0.22 25) - Strong red, powerful and activating
- **Anticipation (Orange)**: oklch(0.75 0.15 50) - Warm orange, forward-looking energy
- **Accent Color (Selection Highlight)**: oklch(0.50 0.20 280) - Deep purple, stands out against all emotion colors
- **Background**: oklch(0.98 0.005 280) - Very light lavender-gray, subtle and clean
- **Foreground (Text)**: oklch(0.25 0.02 280) - Dark purple-gray, readable yet softer than pure black
- **Muted Elements (Borders, Inactive)**: oklch(0.85 0.01 280) - Light gray with slight warmth

**Foreground/Background Pairings**:
- Background (Light Lavender oklch(0.98 0.005 280)): Foreground text oklch(0.25 0.02 280) - Ratio 12.5:1 ✓
- Accent (Deep Purple oklch(0.50 0.20 280)): White text oklch(1 0 0) - Ratio 7.2:1 ✓
- Emotion bands (varies): Each band will use either dark text for light backgrounds or white text for dark backgrounds, validated individually

## Font Selection

The typeface should balance scientific precision with approachable warmth—clear enough for data visualization labels but with enough personality to feel inviting.

- **Primary Font**: Space Grotesk - Geometric sans-serif with subtle quirks that add character without sacrificing readability, perfect for both UI labels and body text
- **Accent Font (Optional, for headings)**: Crimson Pro - A refined serif that adds gravitas to emotion names and dyad titles, creating hierarchy

**Typographic Hierarchy**:
- **H1 (App Title)**: Space Grotesk Bold / 32px / tight letter-spacing (-0.02em) / line-height 1.2
- **H2 (Emotion Names in Center)**: Crimson Pro SemiBold / 28px / normal letter-spacing / line-height 1.3
- **H3 (Panel Headings)**: Space Grotesk Medium / 18px / normal letter-spacing / line-height 1.4
- **Body (Descriptions)**: Space Grotesk Regular / 15px / normal letter-spacing / line-height 1.6
- **Small (Intensity Labels)**: Space Grotesk Medium / 13px / wide letter-spacing (0.02em) / line-height 1.4 / uppercase
- **Labels (Wheel Text)**: Space Grotesk Medium / 12px / normal letter-spacing / line-height 1.3

## Animations

Animations should reinforce the exploratory nature of the app—smooth, purposeful transitions that guide attention and make discovering relationships feel rewarding.

- **Wheel petal selection**: 200ms ease-out scale (1.0 → 1.05) and opacity change, with a subtle glow effect
- **Center panel content transition**: 300ms ease-in-out fade and slight vertical slide when switching between single emotion and dyad views
- **Dyad connection line**: 400ms ease-out draw animation (SVG stroke-dashoffset) when dyad is discovered
- **Tooltip appearance**: 150ms ease-out fade-in with slight scale (0.95 → 1.0), positioned near cursor
- **Hover states**: 100ms ease-out for all hover effects on buttons and wheel segments
- **Clear button pulse**: Subtle scale animation (1.0 → 1.02 → 1.0) over 2s loop when selections are active

## Component Selection

**Components from Shadcn**:
- **Card**: For side panel and center information display - use with subtle shadow and rounded corners
- **Button**: For "Clear Selection" action and dyad list items - primary variant with rounded style
- **Tooltip**: For hover information on wheel segments - use with short delay (200ms)
- **Badge**: For intensity level indicators and dyad counts - custom colors matching emotion theme
- **Separator**: To divide sections in info panels - subtle and thin
- **ScrollArea**: For description text and dyad lists - smooth scrolling
- **Tabs**: For switching between Selection view and Dyad Browser - clean, segmented control style

**Customizations**:
- **PlutchikWheel** (custom SVG component): Renders the full emotion wheel with petals, handles all interaction logic
- **EmotionPetal** (custom SVG component): Individual petal with three intensity bands, isolated for better state management
- **ConnectionArc** (custom SVG component): Curved line connecting two petals when dyad is active
- **CenterHub** (custom component): Central circular area displaying current selection or dyad information
- **DyadBrowser** (custom component): Tabbed interface for browsing all dyads by type with selection capability

**States**:
- **Wheel segments**: Default (subtle border), Hover (brightened fill + scale), Selected (accent border + glow), Focused (dashed outline for keyboard nav)
- **Buttons**: Default (solid background), Hover (slight scale + brightness increase), Active (scale down slightly), Disabled (reduced opacity + cursor not-allowed)
- **Info panels**: Empty state (show placeholder text "Select an emotion to begin"), Single selection (show emotion details), Dyad selection (show combined emotion)

**Icon Selection**:
- **X (from @phosphor-icons/react)**: For clear selection button
- **Info (from @phosphor-icons/react)**: For help/information tooltips
- **ArrowRight (from @phosphor-icons/react)**: For showing emotion combinations in dyad browser
- **Heart (from @phosphor-icons/react)**: Could be used as app icon or for "Love" dyad
- **Lightning (from @phosphor-icons/react)**: For intensity indicators

**Spacing**:
- Container padding: `p-6` (24px) on desktop, `p-4` (16px) on mobile
- Panel gaps: `gap-6` (24px) between major sections
- Content spacing: `gap-4` (16px) within panels
- Wheel margin: `m-8` (32px) to give breathing room
- Text element spacing: `space-y-3` (12px) for paragraphs

**Mobile Adaptations**:
- **Layout**: Stack wheel above info panels on mobile (<768px), side-by-side on desktop
- **Wheel size**: 90vw max on mobile, fixed optimal size (600px) on desktop
- **Panels**: Full width on mobile with `max-h` and scroll, fixed sidebar on desktop with tabbed interface
- **Touch targets**: Ensure all wheel segments and dyad list items are at least 44×44px at smallest screen size
- **Tooltips**: Convert to tap-to-show on mobile instead of hover
- **Typography**: Reduce H1 to 24px, H2 to 22px on mobile for better fit
- **Tabs**: Stack vertically or use scrollable tab list on very narrow screens
