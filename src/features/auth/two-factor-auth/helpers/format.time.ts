import { describe, it,  } from "node:test";


export const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

describe('formatTime', () => {
    it('should format 0 seconds correctly', () => {
        expect(formatTime(0)).toBe('00:00');
    });

    it('should format 59 seconds correctly', () => {
        expect(formatTime(59)).toBe('00:59');
    });

    it('should format 60 seconds correctly', () => {
        expect(formatTime(60)).toBe('01:00');
    });

    it('should format 3599 seconds correctly', () => {
        expect(formatTime(3599)).toBe('59:59');
    });

    it('should format 3600 seconds correctly', () => {
        expect(formatTime(3600)).toBe('60:00');
    });

    it('should format 3661 seconds correctly', () => {
        expect(formatTime(3661)).toBe('61:01');
    });

    it('should format 5999 seconds correctly', () => {
        expect(formatTime(5999)).toBe('99:59');
    });
});
