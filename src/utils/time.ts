export const formatDateToKoreanStyle = (datetime: string): { date: string; time: string } => {
  const [datePart, timePart] = datetime.split(" ");
  const [, month, day] = datePart.split("-");
  const [hour, minute] = timePart.split(":");

  return {
    date: `${month}월 ${day}일`,
    time: `${hour}:${minute}`,
  };
};
