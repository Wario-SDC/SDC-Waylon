

// import http from 'k6/http';
// import { check, sleep } from 'k6';
// import { Counter } from 'k6/metrics';

// let ErrorCount = new Counter("errors");

// export const options = {
//   vus: 100,
//   duration: '60s',
//   thresholds: {
//     errors: ["count<10"]
//   }
// };


// export default function () {
//   let res = http.get(`http://localhost:3000/qa/questions/5/answers`);

//   //Creating Error Check
//   let success = check(res, {
//     "status is 200": r => r.status === 200
//   });
//   if (!success) {
//     // console.log('error');
//     ErrorCount.add(1)
//   }

//   sleep(1);
// }
import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 100,
      maxVUs: 100
    }
  }
}

export default function () {
  const prodID = function getRandomIntInclusive(1, 1000000) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  // http.get('http://localhost:3000/qa/questions/1/');
  http.get(`54.146.253.131:3000/qa/questions/${prodID}`);
}