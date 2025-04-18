import { useEffect, RefObject } from 'react';

/**
 * Custom hook for automatically scrolling to an element when the page loads
 * @param elementRef - React ref object pointing to the target element
 * @param options - ScrollIntoView options and additional configuration
 */
export default function useScrollToElement(
  elementRef: RefObject<HTMLElement>,
  options?: {
    behavior?: ScrollBehavior;
    block?: ScrollLogicalPosition;
    inline?: ScrollLogicalPosition;
    delay?: number; // Delay in ms before attempting to scroll
    scrollOnHashMatch?: boolean; // Whether to only scroll if URL hash matches element id
  }
) {
  useEffect(() => {
    // Extract options with defaults
    const {
      behavior = 'smooth',
      block = 'start',
      inline = 'nearest',
      delay = 500,
      scrollOnHashMatch = false
    } = options || {};

    // First check if hash-based scrolling is enabled and if hash doesn't match
    if (scrollOnHashMatch && elementRef.current) {
      const elementId = elementRef.current.id;
      const urlHash = window.location.hash.slice(1); // Remove # character
      
      // If element has no ID or hash doesn't match, don't scroll
      if (!elementId || elementId !== urlHash) {
        return;
      }
    }

    // Function to perform the scrolling
    const scrollToElement = () => {
      // Make sure the element exists and is attached to the DOM
      if (elementRef.current) {
        try {
          elementRef.current.scrollIntoView({
            behavior,
            block,
            inline
          });
        } catch (error) {
          console.error('Error scrolling to element:', error);
        }
      }
    };

    // Create a robust scrolling mechanism that tries multiple approaches
    const attemptScrolling = () => {
      // Wait for the next frame to ensure DOM is updated
      requestAnimationFrame(() => {
        // Check if element is available
        if (!elementRef.current) {
          // If element not ready, try again after a short delay
          setTimeout(attemptScrolling, 100);
          return;
        }
        
        // Try scrolling
        scrollToElement();
        
        // Double-check scroll position after a moment
        // This helps in cases where content loads and shifts layout
        setTimeout(() => {
          if (elementRef.current) {
            // Check if element is actually in view
            const rect = elementRef.current.getBoundingClientRect();
            const isInView = 
              rect.top >= 0 &&
              rect.bottom <= window.innerHeight;
              
            // If not in view, try scrolling again
            if (!isInView) {
              scrollToElement();
            }
          }
        }, 300);
      });
    };

    // Set up event listeners to cover different page load scenarios
    let scrollTimeout: number | undefined;

    // 1. Initial attempt with delay
    scrollTimeout = window.setTimeout(attemptScrolling, delay);

    // 2. On load (for images and other resources)
    const handleLoad = () => {
      clearTimeout(scrollTimeout);
      attemptScrolling();
    };
    window.addEventListener('load', handleLoad);

    // 3. On DOM content loaded
    const handleDOMContentLoaded = () => {
      // Only trigger if window.load hasn't fired yet
      if (document.readyState !== 'complete') {
        attemptScrolling();
      }
    };
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
    } else {
      // If DOM already loaded, try scrolling right away
      attemptScrolling();
    }

    // Clean up event listeners
    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener('load', handleLoad);
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
    };
  }, [elementRef, options]);
}