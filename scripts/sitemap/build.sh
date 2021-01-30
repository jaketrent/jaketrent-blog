npx ts-node -O '{"module":"commonjs"}' ./scripts/sitemap/static.ts
npx ts-node -O '{"module":"commonjs"}' ./scripts/sitemap/blog.ts
npx ts-node -O '{"module":"commonjs"}' ./scripts/sitemap/compress.ts
npx ts-node -O '{"module":"commonjs"}' ./scripts/sitemap/sitemap.ts
curl http://google.com/ping?sitemap=https://jaketrent.com/sitemap.xml

