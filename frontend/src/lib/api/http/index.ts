import { HttpClient } from "@/lib/api/http/http"

// TODO legyen egy config fájl, amiből szedjük
const http = new HttpClient(process.env.API_BASE_URL || '');

export { http };