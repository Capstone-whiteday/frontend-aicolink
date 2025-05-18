import React from 'react';
import './ServiceIntro.css'; // CSS 파일 import
import { useNavigate } from 'react-router-dom';
const ServiceIntro = () => {
   const navigate = useNavigate(); // ← 이 줄 추가!

  return (
    <div>

      {/* 히어로 섹션 */}
      <section className="hero">
        <div className="container">
          <h1>스마트한 전기차 충전소 관리</h1>
          <p>AI 기반 분산전원 예측을 통해 경제적이고 친환경적인 충전소 운영을 실현합니다</p>
          <button className="cta-button" onClick={() => navigate('/Login')}>서비스 시작하기</button>
        </div>
      </section>

      {/* 문제점 섹션 */}
      <section className="problem-section">
        <div className="container">
          <h2 className="section-title">현재 전기차 충전의 문제점</h2>
          <p className="section-subtitle">
            전기차의 본래 취지를 약화시키고 경제적 비효율성을 야기하는 기존 충전 방식
          </p>
          
          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-icon">🏭</div>
              <h3>화석연료 의존</h3>
              <p>
                전기차 전력의 대부분이 화석연료를 사용한 중앙전력을 구매해 사용하여 친환경 취지를 약화시킵니다.
              </p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">💰</div>
              <h3>경제적 비효율성</h3>
              <p>
                중앙전력 구매로 인한 높은 전력 비용이 충전소 운영자에게 경제적 부담을 가중시킵니다.
              </p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">⚡</div>
              <h3>에너지 낭비</h3>
              <p>
                분산전원 활용 없이 중앙전력에만 의존하여 재생에너지 잠재력을 충분히 활용하지 못합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 솔루션 섹션 */}
      <section className="solution-section">
        <div className="container">
          <div className="solution-content">
            <div className="solution-text">
              <h2>AICOLINK의 AI 기반 솔루션</h2>
              <ul className="solution-features">
                <li>
                  <span className="check-icon">✓</span>
                  <div className="feature-content">
                    <div className="feature-title">분산전원 발전량 예측</div>
                    <div className="feature-description">
                      AI를 활용하여 태양광, 풍력 등 분산전원의 발전량을 정확히 예측합니다
                    </div>
                  </div>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <div className="feature-content">
                    <div className="feature-title">배터리 잔류량 예측</div>
                    <div className="feature-description">
                      실시간 데이터를 기반으로 배터리 상태와 잔류량을 예측하여 최적화된 관리를 제공합니다
                    </div>
                  </div>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <div className="feature-content">
                    <div className="feature-title">스마트 충전-방전 일정</div>
                    <div className="feature-description">
                      AI가 예측한 데이터를 바탕으로 최적의 충전-방전 일정을 자동으로 수립합니다
                    </div>
                  </div>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <div className="feature-content">
                    <div className="feature-title">실시간 모니터링</div>
                    <div className="feature-description">
                      직관적인 대시보드를 통해 모든 데이터를 실시간으로 확인할 수 있습니다
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="solution-visual">
              <div className="chart-placeholder">
                실시간 AI 예측 대시보드
              </div>
              <p>
                <strong>AICOLINK</strong>가 예상하는{' '}
                <span className="charge-text">CHARGE</span> or{' '}
                <span className="discharge-text">DISCHARGE</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 특징 섹션 */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">핵심 기능</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>AI 예측 엔진</h3>
              <p>
                머신러닝 알고리즘을 통해 정확한 전력 수요 및 공급 예측을 제공합니다.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>친환경 운영</h3>
              <p>
                재생에너지 활용을 극대화하여 탄소 발자국을 최소화합니다.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>비용 최적화</h3>
              <p>
                전력 구매 비용을 최대 30% 절감하여 운영 효율성을 향상시킵니다.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>데이터 분석</h3>
              <p>
                상세한 분석 리포트로 충전소 운영 현황을 한눈에 파악할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="cta-section">
        <div className="container">
          <h2>지금 바로 시작해보세요</h2>
          <p>AICOLINK와 함께 더 스마트하고 지속가능한 전기차 충전소를 운영하세요</p>
          <div className="cta-buttons">
            <button className="cta-button">무료 체험 시작</button>
            <button className="cta-secondary">상담 요청</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceIntro;