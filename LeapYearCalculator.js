import React, { useState, useCallback } from 'react';
import './LeapYearCalculator.css';
import { isLeapYear, getNextLeapYear, getPrevLeapYear, getLeapYearsInRange } from '../utils/leapYear';

export default function LeapYearCalculator() {
  const [input, setValue] = useState('');
  const [result, setResult] = useState(null);
  const [rangeStart, setRangeStart] = useState('');
  const [rangeEnd, setRangeEnd] = useState('');
  const [rangeResult, setRangeResult] = useState(null);
  const [activeTab, setActiveTab] = useState('single');
  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleCheck = useCallback(() => {
    const year = parseInt(input, 10);
    if (!input || isNaN(year) || year < 1 || year > 9999) {
      triggerShake();
      setResult({ error: '1 ~ 9999 사이의 유효한 연도를 입력해주세요.' });
      return;
    }
    const leap = isLeapYear(year);
    const next = year < 9999 ? getNextLeapYear(year) : null;
    const prev = year > 1 ? getPrevLeapYear(year) : null;
    setResult({ year, leap, next, prev });
  }, [input]);

  const handleRangeCheck = useCallback(() => {
    const start = parseInt(rangeStart, 10);
    const end = parseInt(rangeEnd, 10);
    if (!rangeStart || !rangeEnd || isNaN(start) || isNaN(end)) {
      triggerShake();
      setRangeResult({ error: '시작 연도와 끝 연도를 모두 입력해주세요.' });
      return;
    }
    if (start > end) {
      triggerShake();
      setRangeResult({ error: '시작 연도는 끝 연도보다 작아야 합니다.' });
      return;
    }
    if (end - start > 2000) {
      triggerShake();
      setRangeResult({ error: '범위는 최대 2000년까지 가능합니다.' });
      return;
    }
    const years = getLeapYearsInRange(start, end);
    setRangeResult({ start, end, years });
  }, [rangeStart, rangeEnd]);

  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter') action();
  };

  return (
    <main className="main">
      {/* Background decorations */}
      <div className="bg-circle bg-circle-1" />
      <div className="bg-circle bg-circle-2" />
      <div className="bg-grid" />

      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="header-badge">윤년 판별기</div>
          <h1 className="title">
            <span className="title-en">Leap Year</span>
            <span className="title-ko">Calculator</span>
          </h1>
          <p className="subtitle">
            4년마다 찾아오는 특별한 해 — 당신이 궁금한 연도를 확인하세요
          </p>
        </header>

        {/* Rule card */}
        <div className="rule-card">
          <h2 className="rule-title">윤년 판별 규칙</h2>
          <div className="rule-list">
            <div className="rule-item rule-yes">
              <span className="rule-icon">✓</span>
              <span><strong>4</strong>로 나누어 떨어지면 윤년</span>
            </div>
            <div className="rule-item rule-no">
              <span className="rule-icon">✗</span>
              <span>단, <strong>100</strong>으로 나누어 떨어지면 평년</span>
            </div>
            <div className="rule-item rule-yes">
              <span className="rule-icon">✓</span>
              <span>단, <strong>400</strong>으로 나누어 떨어지면 윤년</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'single' ? 'tab-active' : ''}`}
            onClick={() => { setActiveTab('single'); setResult(null); }}
          >
            단일 연도
          </button>
          <button
            className={`tab ${activeTab === 'range' ? 'tab-active' : ''}`}
            onClick={() => { setActiveTab('range'); setRangeResult(null); }}
          >
            범위 조회
          </button>
          <div className={`tab-indicator ${activeTab === 'range' ? 'tab-indicator-right' : ''}`} />
        </div>

        {/* Single Year Panel */}
        {activeTab === 'single' && (
          <div className="panel">
            <div className={`input-group ${shake ? 'shake' : ''}`}>
              <input
                type="number"
                className="year-input"
                placeholder="연도 입력 (예: 2024)"
                value={input}
                min="1"
                max="9999"
                onChange={e => { setValue(e.target.value); setResult(null); }}
                onKeyDown={e => handleKeyDown(e, handleCheck)}
              />
              <button className="btn-check" onClick={handleCheck}>
                확인
              </button>
            </div>

            {result && (
              <div className={`result-card ${result.error ? 'result-error' : result.leap ? 'result-leap' : 'result-normal'}`}>
                {result.error ? (
                  <p className="result-error-msg">⚠ {result.error}</p>
                ) : (
                  <>
                    <div className="result-main">
                      <span className="result-year">{result.year}년</span>
                      <span className={`result-badge ${result.leap ? 'badge-leap' : 'badge-normal'}`}>
                        {result.leap ? '🌿 윤년' : '📅 평년'}
                      </span>
                    </div>
                    <p className="result-desc">
                      {result.leap
                        ? `${result.year}년은 366일입니다. 2월이 29일까지 있어요!`
                        : `${result.year}년은 365일입니다.`}
                    </p>
                    <div className="result-adjacent">
                      {result.prev && (
                        <div className="adjacent-item">
                          <span className="adjacent-label">이전 윤년</span>
                          <span className="adjacent-year">{result.prev}년</span>
                        </div>
                      )}
                      {result.next && (
                        <div className="adjacent-item">
                          <span className="adjacent-label">다음 윤년</span>
                          <span className="adjacent-year">{result.next}년</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Range Panel */}
        {activeTab === 'range' && (
          <div className="panel">
            <div className={`range-inputs ${shake ? 'shake' : ''}`}>
              <input
                type="number"
                className="year-input"
                placeholder="시작 연도"
                value={rangeStart}
                min="1"
                max="9999"
                onChange={e => { setRangeStart(e.target.value); setRangeResult(null); }}
                onKeyDown={e => handleKeyDown(e, handleRangeCheck)}
              />
              <span className="range-sep">~</span>
              <input
                type="number"
                className="year-input"
                placeholder="끝 연도"
                value={rangeEnd}
                min="1"
                max="9999"
                onChange={e => { setRangeEnd(e.target.value); setRangeResult(null); }}
                onKeyDown={e => handleKeyDown(e, handleRangeCheck)}
              />
              <button className="btn-check" onClick={handleRangeCheck}>
                조회
              </button>
            </div>

            {rangeResult && (
              <div className={`result-card ${rangeResult.error ? 'result-error' : 'result-range'}`}>
                {rangeResult.error ? (
                  <p className="result-error-msg">⚠ {rangeResult.error}</p>
                ) : (
                  <>
                    <div className="range-summary">
                      <span className="range-title">
                        {rangeResult.start} ~ {rangeResult.end}년
                      </span>
                      <span className="range-count">
                        총 <strong>{rangeResult.years.length}</strong>개의 윤년
                      </span>
                    </div>
                    {rangeResult.years.length === 0 ? (
                      <p className="range-empty">해당 범위에 윤년이 없습니다.</p>
                    ) : (
                      <div className="range-grid">
                        {rangeResult.years.map(y => (
                          <span key={y} className="range-year-chip">{y}</span>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="footer">
          <p>그레고리력 기준 · 1 ~ 9999년 지원</p>
        </footer>
      </div>
    </main>
  );
}
