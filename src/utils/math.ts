import dayjs from "dayjs";

interface RecordData {
  amount: string;
  recordDate: string;
  id: number;
  storeId: string;
  categoryId: string;
  memberId: string;
  memo: string | null;
  recordDay: string;
  recordMonth: string;
  recordYear: string;
  createdAt: Date;
}

export function reduceTotalAmount(records: Array<RecordData>) {
  return records.reduce((acc, curr) => acc + parseFloat(curr.amount), 0)
}

export function toLocalStringEn(number: string) {
  return parseInt(number).toLocaleString();
}

export function calculateMonthData(data: Array<RecordData>, isPrevious = false) {
  const sortedData = data.sort((a, b) => new Date(a.recordDate) > new Date(b.recordDate) ? 1 : -1)
  const dataMap: Map<string, number> = new Map();

  const currMonth = dayjs(sortedData[0]?.recordDate).get('month')
  const lastDay = isPrevious ? dayjs(sortedData.at(-1)?.recordDate).get('date') : dayjs().get('date')

  for (let i = 1; i <= lastDay; i++) {
    let date = dayjs().month(currMonth).date(i).format("MMM-DD-YYYY")
    dataMap.set(date, 0) 
  }

  sortedData.forEach(({recordDate, amount}) => dataMap.set(recordDate, dataMap.get(recordDate)! + parseInt(amount) || parseInt(amount)))  
  
  let accumulator = 0;
  let dataArr = [];

  for (let [name, sum] of dataMap) {
    const parsedDate = dayjs(name, { format: "MMM-DD-YYYY" });
    const numberOfDaysInMonth = parsedDate.date();
    
    accumulator += sum;

    dataArr.push({
      name,
      amount: sum,
      accu: accumulator,
      average: Math.round(accumulator / numberOfDaysInMonth),
    });
  }

  return dataArr
}
