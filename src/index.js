if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start();
}

// ...이하 기존 ReactDOM.render 코드...