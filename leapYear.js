/**
 * 윤년 판별 로직
 * 규칙:
 * 1. 4로 나누어 떨어지면 윤년
 * 2. 그러나 100으로 나누어 떨어지면 평년
 * 3. 그러나 400으로 나누어 떨어지면 윤년
 */
export function isLeapYear(year) {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  if (year % 4 === 0) return true;
  return false;
}

export function getLeapYearsInRange(start, end) {
  const leapYears = [];
  for (let y = start; y <= end; y++) {
    if (isLeapYear(y)) leapYears.push(y);
  }
  return leapYears;
}

export function getNextLeapYear(year) {
  let next = year + 1;
  while (!isLeapYear(next)) next++;
  return next;
}

export function getPrevLeapYear(year) {
  let prev = year - 1;
  while (!isLeapYear(prev)) prev--;
  return prev;
}
