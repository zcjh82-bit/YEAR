# 🗓️ 윤년 계산기 (Leap Year Calculator)

특정 연도가 윤년인지 확인하고, 범위 내 모든 윤년을 조회하는 React 앱입니다.

## 기능

- **단일 연도 판별** — 입력한 연도가 윤년인지 즉시 확인
- **이전/다음 윤년** — 가장 가까운 윤년 안내
- **범위 조회** — 시작~끝 연도 사이의 모든 윤년 목록 출력

## 윤년 판별 규칙

1. **4**로 나누어 떨어지면 윤년
2. 단, **100**으로 나누어 떨어지면 평년
3. 단, **400**으로 나누어 떨어지면 윤년

## 실행 방법

```bash
npm install
npm start
```

## 빌드 & 배포

```bash
npm run build
```

빌드 후 `/build` 폴더가 생성되며 Vercel에 자동 배포됩니다.

## 기술 스택

- React 18
- CSS Variables (테마)
- Google Fonts (DM Serif Display, Noto Sans KR)

## 배포

Vercel 연동 후 `main` 브랜치에 push하면 자동 배포됩니다.
