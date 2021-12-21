/* eslint-disable no-plusplus */
/* eslint-disable radix */
import moment from "moment";

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
import dot from "dot-prop";
import { getSpell } from "jian-pinyin";
import { isObject, isArray, cloneDeep } from "lodash";

export const isUrl = (path: string): boolean => {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
};

/**
 * 移动设备检测
 * @ref http://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device-in-jquery/3540295#3540295
 * @returns {boolean}
 */
export const mobilecheck = (): boolean => {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobi/i.test(
      navigator.userAgent
    ) || window.screen.width >= 768
  );
};

export const completionDate = (num: number) => {
  if (num < 10) {
    return `0${num}`;
  }
  return num;
};

export const TimeDown = (m: number, box: HTMLElement) => {
  const temH = m / 3600;
  const h = completionDate(parseInt(String(temH), 10));

  const temI = (m - Number(h) * 3600) / 60;
  const i = completionDate(parseInt(String(temI), 10));

  const temS = m % 60;
  const s = completionDate(parseInt(String(temS), 10));

  // eslint-disable-next-line no-param-reassign
  box.innerText = `${h}时 ${i}分${s}秒`;
  if (m <= 0) {
    // eslint-disable-next-line no-param-reassign
    box.innerText = "立即抢购";
  }
};

export const sessionStore = {
  setItem: (key: string, value: string) => {
    sessionStorage.setItem(key, value);
  },
  getItem: (key: string) => {
    return sessionStorage.getItem(key);
  },
  removeItem: (key: string) => {
    sessionStorage.removeItem(key);
  },
  clear: () => {
    sessionStorage.clear();
  },
};

export const localStore = {
  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value);
  },
  getItem: (key: string) => {
    return localStorage.getItem(key);
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  },
};

// 获取token，优先获取 sessionStore token
export const getToken = () => {
  let token = "";
  const sessionToken = sessionStore.getItem("token");
  const localToken = localStore.getItem("token");
  if (sessionToken && sessionToken !== "undefined" && sessionToken !== "null") {
    token = sessionToken;
  } else if (
    localToken &&
    localToken !== "undefined" &&
    localToken !== "null"
  ) {
    token = localToken;
  }
  return token;
};

export const clearToken = () => {
  localStore.removeItem("token");
  sessionStore.removeItem("token");
};

const { NODE_ENV } = process.env;

// 拦截所有 log，可以通过环境区分是否输出到 console
export const log =
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  NODE_ENV === "development" ? console.log.bind(console) : () => {};

// dot优化
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/ban-types
export const dotOptimal = (obj: object, path: string, placeholder: any) => {
  const res = dot.get(obj, path, placeholder);
  // dot结果为null || '' || undefined 时取placeholder
  if (res === null || res === "" || res === undefined) {
    return placeholder;
  }
  return res;
};

// 删除对象对应的key
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/ban-types
export const omit = (keys: string[], obj: object) => {
  const res: any = { ...obj };
  keys.forEach((key: string) => delete res[key]);
  return res;
};

export const returnMonthsDate = () => {
  return [
    moment(new Date()).subtract(1, "months").format("YYYY-MM-DD"),
    moment(new Date()).format("YYYY-MM-DD"),
  ];
};

export const returnScopeDate = (num: number) => {
  return [
    moment(new Date()).subtract(num, "day").format("YYYY-MM-DD"),
    moment(new Date()).format("YYYY-MM-DD"),
  ];
};

export const numberFormat = (num: number | string = 0) => {
  return Number(num).toFixed(2).toLocaleString();
};

// 本地查找是否有权限
export const isAuthority = (funcCode: string) => {
  const buttonCodeArr = JSON.parse(
    sessionStore.getItem("buttonCodeArr") || "[]"
  );
  return buttonCodeArr.includes(funcCode);
};

// Select数据按字母分组
export const letterGroup = (datas: []) => {
  const target: any = [];
  const letter = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
  letter.split(",").forEach((item: string) => {
    // 判断datas中是否存在item.name的拼音首字母与当前字母相同的项
    if (
      datas.some(
        (dataInfo: any) =>
          dataInfo.name &&
          getSpell(dataInfo.name, (charactor: string, spell: string[]) => {
            // 多音字处理
            if (charactor === "羊") {
              return spell[1];
            }
            return spell[0];
          })
            .slice(0, 1)
            .toLocaleUpperCase() === item
      )
    ) {
      // 按照分组Select的数据格式push到target中
      target.push({
        label: item,
        value: item,
        optionType: "optGroup",
        children: datas
          .filter(
            (dataInfo: any) =>
              dataInfo.name &&
              getSpell(dataInfo.name, (charactor: string, spell: string[]) => {
                // 多音字处理
                if (charactor === "羊") {
                  return spell[1];
                }
                return spell[0];
              })
                .slice(0, 1)
                .toLocaleUpperCase() === item
          )
          .map((dataInfo: any) => ({
            label: dataInfo.name,
            value: dataInfo.name,
          })),
      });
    }
  });
  return target;
};

/**
 * 将接口数据转换为组件需要的格式 *
 * @param list 需要转换的数据
 * @param config 转换的键值对 key 为期望返回的字段名，value 为原始需要转换的字段名
 * @param recursionKey 递归结束判断的字段，如果存在会作为递归的第一个参数
 * @return list
 * */
export const recursionList = (
  list: any[],
  config: any,
  recursionKey = "subList"
) => {
  const newList = cloneDeep(list).map((i: any) => {
    const o = { ...i };
    Object.keys(config).forEach((j: string) => {
      const key = j;
      const value = config[j];
      if (value === recursionKey) {
        if (i[recursionKey]) {
          o[key] = recursionList(i[recursionKey], config, recursionKey);
        }
      } else if (isObject(value)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        o[key] = value?.func(i[value?.key]);
      } else {
        o[key] = i[value];
      }
    });
    return o;
  });
  return newList;
};

/**
 * 获取cookie
 * @param name
 * @returns {*}
 */
export const getCookie = (name: string) => {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  const arr = document.cookie.match(reg);
  if (arr) {
    return decodeURI(arr[2]);
  }
  return null;
};

/**
 * 设置cookie
 * @param name
 * @param value
 * @param expiresHours
 * @param domain
 */
export const setCookie = (
  name: string,
  value: string,
  expiresHours = 24,
  domain = ".91xinshang.com"
) => {
  const expiresTime = new Date();
  expiresTime.setTime(expiresTime.getTime() + expiresHours * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(
    value
  )};expires=${expiresTime.toUTCString()};domain=${domain};path=/`;
};

/**
 * 删除cookie
 * @param name
 * @param domain
 */
export const deleteCookie = (
  name: string,
  domain = window.location.hostname
) => {
  const expiresTime = new Date();
  expiresTime.setTime(expiresTime.getTime() - 1);
  const value = getCookie(name);
  if (value != null) {
    document.cookie = `${name}=${encodeURIComponent(
      value
    )};expires=${expiresTime.toUTCString()};domain=${domain};path=/`;
  }
};

// 图片加载失败容错地址
export const imageError =
  "data:image/png;base64,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";

// 获取当前年份到指定年份之间的年份
export const getMiddleYears = (targetYear: number) => {
  const targetArr = [];
  let thisYear = new Date().getFullYear() + 1; // 获取当年年份（产品要求年份需加一年）
  const section = thisYear - targetYear; // 获得当前年份至想获取年份差
  for (let i = 0; i <= section; i++) {
    targetArr.push(`${thisYear--}`);
  }
  return targetArr;
};

// 图片上传表单值处理
export const processImgForm = (imgArr: any[]) => {
  return imgArr
    .map((item: any) => ({ url: item.url, key: item.key }))
    .filter((item: any) => item.url || item.key);
};

// 图片上传表单getValueFromEvent
export const getValueFromEventImg = (event: any[]) => {
  return event.map((item: any) => ({
    ...item,
    key: dotOptimal(item, "response.data.picPath", undefined)
      ? item.response.data.picPath
      : item.key,
    url: dotOptimal(item, "response.data.picUrl", undefined)
      ? item.response.data.picUrl
      : item.url,
  }));
};

// 文字超出指定长度后显示...
export const ellipsisString = (targetStr: string, maxLength: number) => {
  if (targetStr.length <= maxLength) return targetStr;
  return targetStr.slice(0, maxLength).concat("...");
};
