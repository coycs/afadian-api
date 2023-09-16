/**
 * @author coycs
 * @description: 按页查询
 * @date 2023-09-16 18:24
 */
import fs from 'fs';
import axios from 'axios';
import md5 from 'blueimp-md5';

const user_id = '';
const token = '';
const params = JSON.stringify({ page: 1 });
const ts = parseInt(new Date().getTime() / 1000);
const sign = md5(`${token}params${params}ts${ts}user_id${user_id}`);

const data = JSON.stringify({
  user_id,
  params,
  ts,
  sign
});

const config = {
  method: 'post',
  url: 'https://afdian.net/api/open/query-order',
  headers: {
    'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)',
    'Content-Type': 'application/json'
  },
  data: data
};

axios(config)
  .then(function (response) {
    const result = JSON.stringify(response.data);
    const status = response.data.ec === 200 ? 'success' : 'error';
    fs.writeFile(`./logs/page/${status}-${ts}.json`, result, () => console.log(result));
  })
  .catch(function (error) {
    fs.writeFile(`./logs/page/error-${ts}.log`, error, () => console.log(error));
  });