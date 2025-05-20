// 🟡 대시보드 테스트용 목 데이터 (24시간 기준)
export const mockScheduleList = Array(24).fill(null).map((_, i) => ({
  hour: i,
  action: i % 3 === 0 ? 'CHARGE' : i % 3 === 1 ? 'DISCHARGE' : 'IDLE',
  powerKw: Math.floor(Math.random() * 50) + 10, // 10~59 kWh
  predictSolar: Math.floor(Math.random() * 20), // 0~19 kWh
  powerPayment: Math.floor(Math.random() * 200) + 50, // 50~249 원
}));

export const mockScheduleResponse = {
  stationId: 2,
  scheduleList: mockScheduleList,
};