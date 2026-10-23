import { buildContainer } from '@src/container';
import { afterAll, describe, expect, it } from 'vitest';

describe('Container', () => {
    const container = buildContainer();

    afterAll(() => container.dispose());

    it.each(Object.keys(container.registrations))('should resolve %s', (name) => {
        expect(container.resolve(name)).toBeDefined();
    });
});
