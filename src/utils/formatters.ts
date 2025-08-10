export function capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function formatDoctorName(name: string): string {
  return `Dr. ${name}`;
}
