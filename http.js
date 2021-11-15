const axios = require('axios');


// 请求参数

export function requireRespons(api){
  return new Promise((resolve,rejcet)=>{
    axios.get(api,{
      headers:{ //头部参数
        "Accept":"application/json, text/plain, */*",
        "Content-Type":"application/x-www-form-urlencoded",
        Cookie:"_yapi_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjMwOTQsImlhdCI6MTYzNjYwMTc3MiwiZXhwIjoxNjM3MjA2NTcyfQ.yz-I1pVr9J3bNYOqK4bTKL7HolkduI750hG9KTkqjGQ; _yapi_uid=3094"
      }
    })
    .then(function (response) {
      // 处理成功情况
      return resolve(response.data.data);
    })
    .catch(function (error) {
      // 处理错误情况
      rejcet(error);
    })
  })
} 
