// Function to convert a string to a slug
export function sluggify(text: string): string {
  return text
	.toLowerCase()
	.replace(/ /g, '-')
	.replace(/[^\w-]+/g, '');
}