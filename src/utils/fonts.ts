// src/utils/fonts.ts

export async function waitForFonts(): Promise<void> {
  try {
    // Check if FontFaceSet API is available
    if (!document.fonts) {
      console.warn('FontFaceSet API not available, continuing without font check');
      return;
    }

    console.log('Waiting for fonts to load...');
    
    // Wait for all fonts to be ready (with timeout)
    const timeout = new Promise((resolve) => setTimeout(resolve, 3000));
    const fontsReady = document.fonts.ready;
    
    await Promise.race([fontsReady, timeout]);

    // Log all loaded fonts for debugging
    const loadedFonts = Array.from(document.fonts.values())
      .map(font => `${font.family} (${font.weight} ${font.style})`)
      .filter((v, i, a) => a.indexOf(v) === i);
    
    console.log('✓ Fonts loaded successfully:', loadedFonts);
    
    // Verify the specific fonts we need are present
    const hasPixelFont = loadedFonts.some(f => f.includes('Silkscreen'));
    const hasDisplayFont = loadedFonts.some(f => f.includes('Press Start 2P'));
    
    if (!hasPixelFont || !hasDisplayFont) {
      console.warn('⚠ Some expected fonts not found. Using fallbacks.');
      console.warn('Expected: Silkscreen, Press Start 2P');
      console.warn('Make sure font files exist in public/fonts/');
    }

  } catch (error) {
    console.error('Error loading fonts:', error);
    // Continue anyway - fallback fonts will be used
  }
}

// Helper to force font loading by creating invisible text
export function ensureFontsLoaded(): void {
  const testText = document.createElement('div');
  testText.style.cssText = `
    position: absolute;
    left: -9999px;
    top: -9999px;
    font-size: 72px;
    visibility: hidden;
    pointer-events: none;
  `;
  
  const fonts = [
    'Silkscreen',
    'Press Start 2P'
  ];
  
  fonts.forEach(font => {
    const span = document.createElement('span');
    span.style.fontFamily = font;
    span.textContent = 'Loading...';
    testText.appendChild(span);
  });
  
  document.body.appendChild(testText);
  
  // Remove after a brief moment
  setTimeout(() => {
    document.body.removeChild(testText);
  }, 100);
}