import{R as t,u as H,h as k,p,j as v,r as d,P as l,T as o,V as g,a as B,K as D}from"./41580d26.js";import{u as M,o as U,s as V,I as h}from"./69c78f17.js";import{s as N,a as W,t as _,c as q,d as S,u as K,b as L,S as $,C as b,e as J,V as z,H as G,f as Q,g as X,m as T,I as Y,l as Z}from"./3c6c2d64.js";import{s as ee}from"./f60b1890.js";let w=X.create({paddingElement:{height:l.OS==="android"?50:36,width:1},submitButtonContainer:{}}),te=T(S,w),se=T(Z,w);var ie=t.memo(function(){let C=H(),I=k(),x=p(N),P=p(W),a=p(_),e=I==="dark"?te:se,{height:y}=v(),F=q(S.raw.formContent),O=(y-F)/2,i=K();const{control:f,handleSubmit:R,formState:{errors:m}}=M({mode:"onBlur",resolver:U(V)});let j=async r=>{D.dismiss();let n=l.OS==="web"?"":`http://${Y}:8000`;try{let s=await ee(`${n}/sign-in`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}),E={top:y-O,width:S.raw.formContent.width*.9,borderWidth:0};s.errors?(console.log(s),a({display:!0,type:"error",message:s.errors,containerStyle:E,onPress:()=>{console.log("pressed toast")},onClose:()=>{a({display:!1,type:"success",message:""})}})):s.success&&(x(s),P((s==null?void 0:s.data)||null),i.navigate("Dashboard"),console.log("toast green"),a({display:!0,type:"success",message:s.success||"",timer:1e3*5,containerStyle:E,onPress:()=>{console.log("pressed toast")},onClose:()=>{a({display:!1,type:"success",message:""})}}))}catch{}};d.exports.useLayoutEffect(()=>{L(i)},[i]),l.OS==="web"&&window.scrollTo({top:-1,left:-1,behavior:"smooth"});let A=d.exports.useRef(null),u=d.exports.useRef(null),c=R(j);return t.createElement($,null,t.createElement(b,{style:[C,e.formContainer]},t.createElement(J,{containerStyle:{},contentStyle:e.formContent},t.createElement(o,{style:e.formTitle},"Welcome"),t.createElement(o,{style:e.formSubTitle},"Sign in to continue!"),t.createElement(z,{style:e.inputsContainer},t.createElement(h,{ref:A,name:"email",rules:{required:!0},errors:m,control:f,titleText:"Email",titleStyle:e.inputTitle,inputStyle:e.inputContent,inputErrorMsg:e.inputErrorMsg,inputFocusError:e.inputFocusError,onSubmitEditing:r=>{var n;(n=u.current)==null||n.focus()}}),t.createElement(h,{ref:u,name:"password",rules:{required:!0},errors:m,control:f,titleText:"Password",textContentType:"oneTimeCode",titleStyle:e.passwordInput,inputStyle:e.inputContent,inputErrorMsg:e.inputErrorMsg,inputFocusError:e.inputFocusError,secureTextEntry:!0,onSubmitEditing:r=>{r.persist(),setTimeout(()=>{var n;if(Object.keys(m).length>0){l.OS==="web"&&(c(r),(n=u.current)==null||n.focus());return}else c(r)},100)}}),t.createElement(o,{style:e.forgotPassword},"Forgot Password?"),t.createElement(g,{style:e.paddingElement}),t.createElement(B,{onPress:c},t.createElement(g,{style:e.submitButtonContainer},t.createElement(b,null,t.createElement(o,{style:e.submitButtonContent},"Sign in")))),t.createElement(G,{style:e.signUpContainer},t.createElement(o,{style:e.signUpSubText},"I'm a new user. "),t.createElement(g,{style:e.signUpMainText},t.createElement(Q,null)))))))});export{ie as default};
//# sourceMappingURL=ece2a3dd.js.map
