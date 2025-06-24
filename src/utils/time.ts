export const formatDateToKoreanStyle = (
  datetime?: string
): { date: string; time: string } => {
  if (!datetime || typeof datetime !== "string") {
    return { date: "날짜 없음", time: "시간 없음" };
  }

  // ISO 형식이면 'T'를 기준으로 분리되므로 변환
  const formatted = datetime.replace("T", " ");
  const [datePart, timePartWithMs] = formatted.split(" ");
  if (!datePart || !timePartWithMs) {
    return { date: "날짜 없음", time: "시간 없음" };
  }

  const [, month = "??", day = "??"] = datePart.split("-");
  const [hour = "??", minute = "??"] = timePartWithMs.split(":");

  return {
    date: `${month}월 ${day}일`,
    time: `${hour}:${minute}`,
  };
};
