import{I as s}from"./3c6c2d64.js";import{P as r}from"./41580d26.js";function f(t,n){return fetch(t,n).then(o=>o.json())}function u(){let t=r.OS==="web"?"":`http://${s}:8000`;return fetch(`${t}/sign-out`,{method:"DELETE"}).then(n=>n.json())}export{u as a,f as s};
//# sourceMappingURL=f60b1890.js.map
