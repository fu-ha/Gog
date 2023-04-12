//  ReferenceError: TextEncoder is not defined になった為。
import { TextEncoder, /*TextDecoder*/ } from 'util';
global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;

// TypeError: window.matchMedia is not a function　になった為。
beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        }))
    });
});