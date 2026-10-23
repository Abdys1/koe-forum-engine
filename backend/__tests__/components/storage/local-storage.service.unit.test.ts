import LocalStorageService from '@src/components/storage/local-storage.service';
import { UploadedFile } from '@src/components/storage/storage.service';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('LocalStorageService', () => {
    const IMAGE: UploadedFile = { originalname: '../../evil.sh', mimetype: 'image/png', size: 3, buffer: Buffer.from([1, 2, 3]) };
    let baseDir: string;
    let storageService: LocalStorageService;

    beforeEach(() => {
        baseDir = mkdtempSync(join(tmpdir(), 'koe-storage-'));
        storageService = new LocalStorageService(baseDir, '/uploads');
    });

    afterEach(() => {
        rmSync(baseDir, { recursive: true, force: true });
    });

    describe('upload()', () => {
        it('should write the file into the directory', async () => {
            const result = await storageService.upload(IMAGE, 'characters');

            expect(readFileSync(join(baseDir, result.path))).toStrictEqual(IMAGE.buffer);
        });

        it('should name the file by the mime type instead of the original name', async () => {
            const result = await storageService.upload(IMAGE, 'characters');

            expect(result.filename).toMatch(/^[0-9a-f-]{36}\.png$/);
            expect(result.path).toBe(`characters/${result.filename}`);
        });

        it('should return the public url of the file', async () => {
            const result = await storageService.upload(IMAGE, 'characters');

            expect(result.url).toBe(`/uploads/characters/${result.filename}`);
        });

        it('should give different names to files uploaded with the same original name', async () => {
            const first = await storageService.upload(IMAGE, 'characters');
            const second = await storageService.upload(IMAGE, 'characters');

            expect(first.filename).not.toBe(second.filename);
        });
    });

    describe('delete()', () => {
        it('should remove the uploaded file', async () => {
            const result = await storageService.upload(IMAGE, 'characters');

            await storageService.delete(result.path);

            expect(existsSync(join(baseDir, result.path))).toBe(false);
        });

        it('should not fail when the file does not exist', async () => {
            await expect(storageService.delete('characters/missing.png')).resolves.toBeUndefined();
        });
    });
});
