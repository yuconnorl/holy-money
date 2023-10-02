export function reduceTotalAmount(records) {
  return records.reduce((acc, curr) => acc + parseFloat(curr.amount), 0)
}

export function toLocalStringEn(number: string) {
  return parseInt(number).toLocaleString();
}
