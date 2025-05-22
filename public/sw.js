// public/sw.js

// (필수는 아니지만, 아무 내용 없어도 자바스크립트 파일이어야 함)
self.addEventListener('install', event => {
  // 최초 설치 시 실행 (여기에 코드 안 넣어도 됨)
  console.log('Service Worker installed');
});

self.addEventListener('activate', event => {
  // 서비스워커 활성화 시
  console.log('Service Worker activated');
});