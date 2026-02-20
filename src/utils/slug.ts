/**
 * Strip file extension from Astro content collection entry IDs
 * In Astro 5, entry.id includes the file extension (e.g., "plumbing.md")
 * This utility returns a clean slug (e.g., "plumbing")
 */
export function getSlug(id: string): string {
    return id.replace(/\.md$/, '').replace(/\.mdx$/, '');
}
