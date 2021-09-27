import axios from "axios";
import md5 from "md5";
const get = async (endpoint, params) => {
  const private_key = process.env.VUE_APP_PRIVATE_KEY;
  const publick_key = process.env.VUE_APP_PUBLIC_KEY;
  const base_url = "https://gateway.marvel.com/v1/public";
  let ts = Date.now();
  try {
    let res = await axios.get(`${base_url}/${endpoint}`, {
      params: {
        ts: ts,
        apikey: publick_key,
        hash: md5(ts + private_key + publick_key),
        ...params,
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};
export default get;
