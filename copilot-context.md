# Project: Taekwondo Pattern Spinner

## Goal
Build a minimalist React web app that randomly selects a Taekwondo pattern for practice when the user clicks a button.  
The app will be hosted on GitHub Pages.

## Requirements
- **Framework**: React + Vite (or CRA if preferred)
- **Styling**: TailwindCSS, minimalist and clean
- **State management**: useState, useEffect (no external state library needed)
- **Data**: Static list of Taekwondo patterns stored in a local array
- **Random selection**: When user clicks a "Spin" button, choose a random pattern from the list and display it
- **Optional enhancements**:
  - Animation for the "spin" action (CSS animation or Framer Motion)
  - Option to filter patterns by belt level
  - LocalStorage to remember the last pattern selected
- **Deployment**: Easy GitHub Pages hosting

## Style and UX Guidelines
- Minimalist layout: centered card with soft shadows and rounded edges
- Use a single accent color for buttons
- Responsive design (mobile and desktop)
- Clear typography with good contrast
- Smooth, simple animations for interactions

## Example patterns list
- Chon-Ji
- Dan-Gun
- Do-San
- Won-Hyo
- Yul-Gok
- Joong-Gun
- Toi-Gye
- Hwa-Rang
- Choong-Moo
- Kwang-Gae
- Po-Eun
- Gae-Baek

## File Structure Suggestion
src/
components/
Spinner.jsx
PatternCard.jsx
data/
patterns.js
App.jsx
main.jsx

## Future Ideas
- Track practice history and show most/least practiced patterns
- Add sound effects for the spin
- Allow users to mark certain patterns as "favorites"

## Notes for Copilot
- Prefer functional components with hooks
- Keep code clean and easy to modify
- Focus on simplicity first, then add enhancements