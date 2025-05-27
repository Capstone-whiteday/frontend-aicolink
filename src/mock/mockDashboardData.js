export const mockScheduleList = [
  // 심야: 저렴
  { hour: 0,  predictSolar: 0,    powerKw: 160, powerPayment: 15200, action: "CHARGE"      }, // 95×160
  { hour: 1,  predictSolar: 0,    powerKw: 80,  powerPayment: 7600,  action: "CHARGE"      },
  { hour: 2,  predictSolar: 0,    powerKw: 60,  powerPayment: 5700,  action: "CHARGE"      }, // 95×60
  { hour: 3,  predictSolar: 0,    powerKw: 0,   powerPayment: 0,     action: "IDLE"        },
  { hour: 4,  predictSolar: 0,    powerKw: 50,  powerPayment: 4750,  action: "CHARGE"      },
  { hour: 5,  predictSolar: 0,    powerKw: 0,   powerPayment: 0,     action: "IDLE"        },
  // 오전
  { hour: 6,  predictSolar: 16,   powerKw: 22,  powerPayment: 3080,  action: "DISCHARGE"   }, // 140×22
  { hour: 7,  predictSolar: 58,   powerKw: 60,  powerPayment: 8400,  action: "DISCHARGE"   },
  { hour: 8,  predictSolar: 119,  powerKw: 130, powerPayment: 18200, action: "DISCHARGE"   },
  // 주간: 일반
  { hour: 9,  predictSolar: 155,  powerKw: 170, powerPayment: 31450, action: "DISCHARGE"   }, // 185×170
  { hour: 10, predictSolar: 193,  powerKw: 195, powerPayment: 36075, action: "DISCHARGE"   },
  { hour: 11, predictSolar: 215,  powerKw: 210, powerPayment: 38850, action: "DISCHARGE"   },
  { hour: 12, predictSolar: 220,  powerKw: 240, powerPayment: 44400, action: "DISCHARGE"   },
  { hour: 13, predictSolar: 198,  powerKw: 185, powerPayment: 34225, action: "DISCHARGE"   },
  { hour: 14, predictSolar: 149,  powerKw: 110, powerPayment: 20350, action: "IDLE"        },
  { hour: 15, predictSolar: 98,   powerKw: 120, powerPayment: 22200, action: "DISCHARGE"   },
  { hour: 16, predictSolar: 70,   powerKw: 85,  powerPayment: 15725, action: "DISCHARGE"   },
  { hour: 17, predictSolar: 31,   powerKw: 33,  powerPayment: 6105,  action: "CHARGE"      },
  // 피크: 비쌈
  { hour: 18, predictSolar: 6,    powerKw: 0,   powerPayment: 0,     action: "IDLE"        },
  { hour: 19, predictSolar: 0,    powerKw: 70,  powerPayment: 19250, action: "DISCHARGE"   }, // 275×70
  { hour: 20, predictSolar: 0,    powerKw: 120, powerPayment: 33000, action: "DISCHARGE"   },
  { hour: 21, predictSolar: 0,    powerKw: 100, powerPayment: 27500, action: "CHARGE"      },
  // 야간: 낮은 요금
  { hour: 22, predictSolar: 0,    powerKw: 60,  powerPayment: 7800,  action: "IDLE"        }, // 130×60
  { hour: 23, predictSolar: 0,    powerKw: 0,   powerPayment: 0,     action: "IDLE"        }
];

export const mockScheduleResponse = {
  stationId: 2,
  forecastDate: "2025-06-04",
  scheduleList: mockScheduleList,
  totalCost: 323285,    // 시간별 powerPayment의 총합
  savingCost: 53200,    // 절감액(예시, 실제 로직 맞춰 조정)
  totalSolar: 1835      // 하루치 태양광 총합(예시)
};




// // 🟡 대시보드 테스트용 목 데이터 (24시간 기준)
// // 🟢 모든 값을 0, action은 'IDLE'로 고정
// export const mockScheduleList = Array(24).fill(null).map((_, i) => ({
//   hour: i,
//   action: 'IDLE',              // 🟢 항상 IDLE
//   powerKw: 0,                  // 🟢 항상 0
//   predictSolar: 0,             // 🟢 항상 0
//   powerPayment: 0,             // 🟢 항상 0
// }));

// export const mockScheduleResponse = {
//   stationId: 0,
//   scheduleList: mockScheduleList,
//   totalCost: 0,                // 🟢 항상 0
//   savingCost: 0,               // 🟢 항상 0
//   // "totalSolar": 0
// };

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