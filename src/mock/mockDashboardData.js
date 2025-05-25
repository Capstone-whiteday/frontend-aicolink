// 🟡 대시보드 테스트용 목 데이터 (24시간 기준)
// 🟢 모든 값을 0, action은 'IDLE'로 고정
export const mockScheduleList = Array(24).fill(null).map((_, i) => ({
  hour: i,
  action: 'IDLE',              // 🟢 항상 IDLE
  powerKw: 0,                  // 🟢 항상 0
  predictSolar: 0,             // 🟢 항상 0
  powerPayment: 0,             // 🟢 항상 0
}));

export const mockScheduleResponse = {
  stationId: 0,
  scheduleList: mockScheduleList,
  totalCost: 0,                // 🟢 항상 0
  savingCost: 0,               // 🟢 항상 0
  // "totalSolar": 0
};

// // 🟡 대시보드 테스트용 목 데이터 (24시간 기준)
// export const mockScheduleList = Array(24).fill(null).map((_, i) => ({
//   hour: i,
//   action: i % 3 === 0 ? 'CHARGE' : i % 3 === 1 ? 'DISCHARGE' : 'IDLE',
//   powerKw: Math.floor(Math.random() * 50) + 10, // 10~59 kWh
//   predictSolar: Math.floor(Math.random() * 20), // 0~19 kWh
//   powerPayment: Math.floor(Math.random() * 200) + 50, // 50~249 원
// }));

// export const mockScheduleResponse = {
//   stationId: 0,
//   scheduleList: mockScheduleList,
//    totalCost: 0.1,
//   savingCost: 0.1,
//   // "totalSolar": 0.1
// };