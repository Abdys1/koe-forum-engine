import { v4 as uuidv4 } from 'uuid';

const EXTENSIONS_BY_MIME_TYPE: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
};

export function generateFileName(mimetype: string): string {
  return `${uuidv4()}${EXTENSIONS_BY_MIME_TYPE[mimetype] ?? ''}`;
}
