const headers_keywords = {
  json: "application/json",
  form: "application/x-www-form-urlencoded",
};

type ContentType_Type = "json" | "form" | "";

const fetch_method = async (
  url: string,
  method: string,
  body = {},
  auth = false,
  ContentType: ContentType_Type
) => {
  let headersObj: any = {};

  if (auth) {
    headersObj = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  }

  if (ContentType) {
    if (headersObj?.headers) {
      headersObj.headers["Content-Type"] = headers_keywords[ContentType];
    } else {
      headersObj = {
        headers: { "Content-Type": headers_keywords[ContentType] },
      };
    }
  }

  let headers = {
    ...headersObj,
  };
  return fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
    method,
    ...headers,
    ...body,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        if (res.status === 401) {
          localStorage.removeItem("token");
          return {
            success: false,
            message: "Session expired. Please login again",
          };
        } else {
          return res.json();
        }
      }
    })
    .then((res) => {
      if (res.success) {
        return res;
      } else {
        console.log(res);
        throw new Error(res.message ?? res.msg ?? "Failed");
      }
    });
};

export const api = {
  get: (
    url: string,
    body = {},
    auth = false,
    contentType: ContentType_Type = ""
  ) => fetch_method(url, "GET", body, auth, contentType),
  put: (
    url: string,
    body = {},
    auth = false,
    contentType: ContentType_Type = ""
  ) => fetch_method(url, "PUT", body, auth, contentType),
  patch: (
    url: string,
    body = {},
    auth = false,
    contentType: ContentType_Type = ""
  ) => fetch_method(url, "PATCH", body, auth, contentType),
  post: (
    url: string,
    body = {},
    auth = false,
    contentType: ContentType_Type = ""
  ) => fetch_method(url, "POST", body, auth, contentType),
  delete: (
    url: string,
    body = {},
    auth = false,
    contentType: ContentType_Type = ""
  ) => fetch_method(url, "DELETE", body, auth, contentType),
};
