import{R as t,u as A,j as v,p as S,h as M,r as a,P as g,T as y,a as k,V as B,K as D}from"./41580d26.js";import{u as H,o as V,a as q,I as E}from"./69c78f17.js";import{s as N,a as W,t as _,c as K,d as h,u as L,b as $,S as J,C as T,e as z,V as G,g as Q,m as C,I as X,l as Y}from"./3c6c2d64.js";import{s as Z}from"./f60b1890.js";let w=Q.create({submitButtonContainer:{marginTop:18}}),ee=C(h,w),te=C(Y,w);var le=t.memo(function(){let x=A(),{height:l}=v(),I=S(N),P=S(W),n=S(_),F=K(h.raw.formContent),e=M()==="dark"?ee:te,[u,O]=a.exports.useState(null),b=(l-F)/2,m=L();const{control:p,handleSubmit:R,formState:{errors:i}}=H({mode:"onBlur",resolver:V(q)}),U=async o=>{D.dismiss();let r=g.OS==="web"?"":`http://${X}:8000`;try{let s=await Z(`${r}/sign-up`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});s.errors?n({display:!0,type:"error",message:s.errors,onPress:()=>{console.log("pressed toast")},onClose:()=>{n({display:!1,type:"success",message:""})}}):s.success&&(I(s),P((s==null?void 0:s.data)||null),n({display:!0,type:"success",message:s.success,timer:1e3*5,onPress:()=>{console.log("pressed toast")},onClose:()=>{n({display:!1,type:"success",message:""})}}),m.navigate("Dashboard"))}catch{}};a.exports.useLayoutEffect(()=>{$(m)},[m]),g.OS==="web"&&window.scrollTo({top:-1,left:-1,behavior:"smooth"});let j=a.exports.useRef(null),c=a.exports.useRef(null),d=a.exports.useRef(null),f=R(U);return a.exports.useEffect(()=>{if(u){let o={top:l-b,width:h.raw.formContent.width*.9,borderWidth:0};n({display:!0,type:"error",message:u,containerStyle:o,onPress:()=>{console.log("pressed toast")},onClose:()=>{O(null)}})}else n({display:!1,type:"success",message:""})},[b,l,n,u]),t.createElement(J,null,t.createElement(T,{style:[x,e.formContainer]},t.createElement(z,{containerStyle:{},contentStyle:e.formContent},t.createElement(y,{style:e.formTitle},"Welcome"),t.createElement(y,{style:e.formSubTitle},"Sign in to continue!"),t.createElement(G,{style:e.inputsContainer},t.createElement(E,{ref:j,name:"email",rules:{required:!0},errors:i,control:p,titleText:"Email",titleStyle:e.inputTitle,inputStyle:e.inputContent,inputErrorMsg:e.inputErrorMsg,inputFocusError:e.inputFocusError,onSubmitEditing:o=>{var r;(r=c.current)==null||r.focus()}}),t.createElement(E,{ref:c,name:"password",rules:{required:!0},errors:i,control:p,titleText:"Password",textContentType:"oneTimeCode",titleStyle:e.passwordInput,inputStyle:e.inputContent,inputErrorMsg:e.inputErrorMsg,inputFocusError:e.inputFocusError,secureTextEntry:!0,onSubmitEditing:o=>{var r,s;(r=c.current)==null||r.blur(),(s=d.current)==null||s.focus()}}),t.createElement(E,{ref:d,name:"confirmPassword",rules:{required:!0},errors:i,control:p,titleText:"Confirm Password",titleStyle:e.passwordInput,inputStyle:e.inputContent,inputErrorMsg:e.inputErrorMsg,inputFocusError:e.inputFocusError,secureTextEntry:!0,blurOnInvalid:!1,textContentType:"oneTimeCode",blurOnSubmit:!1,onSubmitEditing:o=>{o.persist(),setTimeout(()=>{var r;if(Object.keys(i).length>0){g.OS==="web"&&(f(o),(r=d.current)==null||r.focus());return}else f(o)},100)}}),t.createElement(k,{onPress:f},t.createElement(B,{style:e.submitButtonContainer},t.createElement(T,null,t.createElement(y,{style:e.submitButtonContent},"Sign up"))))))))});export{le as default};
//# sourceMappingURL=4fd5d5b2.js.map
