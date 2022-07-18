export function formatDate(date: Date) {
  const dateString = date.toLocaleString("pt-BR", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  })
  return dateString
}
