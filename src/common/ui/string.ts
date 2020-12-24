export function capitalize(str: string): string {
  return str[0].toUpperCase() + str.slice(1)
}

export function pluralize(str: string): string {
  return str + "s"
}
