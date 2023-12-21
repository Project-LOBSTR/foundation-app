import "@testing-library/jest-dom/extend-expect";
import { TextDecoder, TextEncoder } from "util";

// Assign the TextEncoder polyfill to the global scope
(global as any).TextEncoder = TextEncoder; // Assign the TextEncoder polyfill to the global scope
(global as any).TextDecoder = TextDecoder;
