export const currentYear = () => {
  return new Date().getFullYear()
}

export const formatHumanDate = (dateStr: string) => {
  const date = new Date(dateStr)
  const d = date.getDate()
  const mmm = date.toLocaleString("default", { month: "short" })
  const yyyy = date.getFullYear()

  return `${d} ${mmm} ${yyyy}`
}
