import axios from "axios";

export default class API {
  constructor(token) {
    const headers = {
      "content-type": "application/json",
      Accept: "*/*",
    };

    let url =
      process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";
    this.api = axios.create({
      baseURL: url,
      timeout: 10000,
    });

    this.api.interceptors.response.use(
      function (response) {
        return parseData(response);
      },
      function (error) {
        console.log("error: ", error.response);
        return Promise.reject(error);
      }
    );

    const parseData = (res) => {
      console.log("parseData", res);

      if (res.status === 200) {
        return res.data;
      } else {
        return Promise.reject(res.data);
      }
    };
  }

  login(email, pwd) {
    const url = "api/login";
    const params = {
      email: email,
      password: pwd,
    };
    const res = this.api.post(url, params);
    // console.log(res);
    return res;
  }

  signup(name, email, pwd, bday, horoscope) {
    const url = "api/signup";
    const params = {
      name: name,
      email: email,
      password: pwd,
      birthday: bday,
      horoscope: horoscope,
    };
    const res = this.api.post(url, params);
    return res;
  }

  // queryHighlights(horoscope, style_id) {
  //   const url = `api/products/highlights/${horoscope}/${style_id}`;
  //   const res = this.api.get(url);
  //   return res;
  // }

  // queryFilteredProducts(horoscope, gender, style_id, type_id) {
  //   const url = `api/filteredProducts/${horoscope}/${gender}/${style_id}/${type_id}`;
  // }

  queryProductInfo(id) {
    const url = `api/productInfo/${id}`;
    // const param = JSON.stringify({ id: id });
    const res = this.api.get(url);
    return res;
  }

  querySuggestions(horoscope, gender_id, type_id) {
    const url = `api/suggestion`;
    const params = {
      horoscope: horoscope,
      gender_id: gender_id,
      type_id: type_id,
    };
    const res = this.api.post(url, params);
    return res;
  }

  // Cart store in localstorage ???
  queryCart() {
    const url = "api/cart";
  }

  queryOrderHistory(userId) {
    const url = `api/orderHistory/${userId}`;
    const res = this.api.get(url);
    return res;
  }
}
