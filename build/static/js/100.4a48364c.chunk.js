"use strict";(self.webpackChunkcabonorte=self.webpackChunkcabonorte||[]).push([[100],{67930:function(n,e,i){i.d(e,{Z:function(){return M}});var t=i(72791),s=i(16030),r=i(45987),o=i(70885),a=i(1413),c=i(4942),l=i(47630),x=i(28182),d=i(18384),u=i(29388),m=i(25878),f=i(29823),p=i(13400),g=i(56300),Z=i(91964),h=i(8158),j=i(68997),y=i(55931),b=i(80007),v=i(65018),w=i(80184),C=["className","message","variant"],k="AppMessageView",S={success:"".concat(k,"-success"),error:"".concat(k,"-error"),info:"".concat(k,"-info"),warning:"".concat(k,"-warning"),icon:"".concat(k,"-icon"),iconVariant:"".concat(k,"-iconVariant"),message:"".concat(k,"-message")},I=(0,l.ZP)(h.Z)((function(n){var e,i=n.theme;return e={},(0,c.Z)(e,"& .".concat(S.success),{backgroundColor:b.Z[600]}),(0,c.Z)(e,"& .".concat(S.error),{backgroundColor:i.palette.error.main}),(0,c.Z)(e,"& .".concat(S.info),{backgroundColor:i.palette.primary.light}),(0,c.Z)(e,"& .".concat(S.warning),{backgroundColor:v.Z[700]}),(0,c.Z)(e,"& .".concat(S.icon),{fontSize:20}),(0,c.Z)(e,"& .".concat(S.iconVariant),{opacity:.9,marginRight:i.spacing(1)}),(0,c.Z)(e,"& .".concat(S.message),{display:"flex",alignItems:"center"}),e})),z={success:d.Z,warning:Z.Z,error:u.Z,info:m.Z};function R(n){return(0,w.jsx)(y.Z,(0,a.Z)((0,a.Z)({},n),{},{direction:"left"}))}var W=function(n){var e=t.useState(!1),i=(0,o.Z)(e,2),c=i[0],l=i[1],d=n.className,u=n.message,m=n.variant,Z=(0,r.Z)(n,C),h=z[m],y=(0,s.I0)(),b=function(){l(!1),setTimeout((function(){return y((0,j.SR)())}),500)};return(0,t.useEffect)((function(){u&&l(!0)}),[u]),(0,w.jsx)(I,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:c,onClose:b,autoHideDuration:3500,TransitionComponent:R,children:(0,w.jsx)(g.Z,(0,a.Z)({className:(0,x.Z)(S[m],d),"aria-describedby":"client-snackbar",message:(0,w.jsxs)("span",{id:"client-snackbar",className:S.message,children:[(0,w.jsx)(h,{className:(0,x.Z)(S.icon,S.iconVariant)}),u]}),action:[(0,w.jsx)(p.Z,{"aria-label":"close",color:"inherit",onClick:b,size:"large",children:(0,w.jsx)(f.Z,{className:S.icon})},"close")]},Z))})},D=i(87411),M=function(){var n=(0,s.v9)((function(n){return n.common})),e=n.error,i=n.loading,t=n.message;return(0,w.jsxs)(w.Fragment,{children:[i&&(0,w.jsx)(D.Z,{}),t&&(0,w.jsx)(W,{variant:"success",message:t.toString()}),e&&(0,w.jsx)(W,{variant:"error",message:e.toString()})]})}},86705:function(n,e,i){i(72791);var t=i(57621),s=i(64554),r=i(20890),o=i(1975),a=i(80184);e.Z=function(n){var e=n.children;return(0,a.jsx)(s.Z,{sx:{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},children:(0,a.jsxs)(t.Z,{sx:{maxWidth:900,minHeight:{xs:320,sm:450},width:"100%",overflow:"hidden",position:"relative",display:"flex"},children:[(0,a.jsx)(s.Z,{sx:{width:{xs:"100%",sm:"50%",lg:"40%"},padding:{xs:5,lg:10},display:"flex",flexDirection:"column",justifyContent:"center"},children:e}),(0,a.jsx)(s.Z,{sx:{width:{xs:"100%",sm:"50%",lg:"60%"},position:"relative",padding:{xs:5,lg:10},display:{xs:"none",sm:"flex"},alignItems:{sm:"center"},justifyContent:{sm:"center"},flexDirection:{sm:"column"},backgroundColor:function(n){return n.palette.grey[900]},color:function(n){return n.palette.common.white},fontSize:14},children:(0,a.jsxs)(s.Z,{sx:{maxWidth:320},children:[(0,a.jsx)(r.Z,{component:"h2",sx:{fontWeight:o.F3.BOLD,fontSize:30,mb:4},children:"Welcome to Crema!"}),(0,a.jsx)(r.Z,{children:"Crema is purely based on Material ui components and follows Material ui guidelines."})]})})]})})}},21100:function(n,e,i){i.r(e),i.d(e,{default:function(){return w}});i(72791);var t=i(64554),s=i(86705),r=i(55705),o=i(81724),a=i(53287),c=i(98056),l=i(54641),x=i(94454),d=i(36151),u=i(13400),m=i(67930),f=i(1975),p=i(43504),g=i(78820),Z=i(39126),h=i(56355),j=i(80184),y=o.Ry({name:o.Z_().required((0,j.jsx)(c.Z,{id:"validation.nameRequired"})),email:o.Z_().email((0,j.jsx)(c.Z,{id:"validation.emailFormat"})).required((0,j.jsx)(c.Z,{id:"validation.emailRequired"})),password:o.Z_().required((0,j.jsx)(c.Z,{id:"validation.passwordRequired"}))}),b=function(){var n=(0,l.a)(),e=n.registerUserWithEmailAndPassword,i=n.logInWithPopup;return(0,j.jsxs)(t.Z,{sx:{flex:1,display:"flex",flexDirection:"column"},children:[(0,j.jsx)(t.Z,{sx:{flex:1,display:"flex",flexDirection:"column",mb:5},children:(0,j.jsx)(r.J9,{validateOnChange:!0,initialValues:{name:"",email:"",password:""},validationSchema:y,onSubmit:function(n,i){var t=i.setSubmitting;t(!0),console.log("data",n),e(n),console.log("registerUserWithEmailAndPassword",e),t(!1)},children:function(n){var e=n.isSubmitting;return(0,j.jsxs)(r.l0,{style:{textAlign:"left"},noValidate:!0,autoComplete:"off",children:[(0,j.jsx)(t.Z,{sx:{mb:{xs:4,xl:5}},children:(0,j.jsx)(a.Z,{label:(0,j.jsx)(c.Z,{id:"common.name"}),name:"name",variant:"outlined",sx:{width:"100%","& .MuiInputBase-input":{fontSize:14}}})}),(0,j.jsx)(t.Z,{sx:{mb:{xs:4,xl:5}},children:(0,j.jsx)(a.Z,{label:(0,j.jsx)(c.Z,{id:"common.email"}),name:"email",variant:"outlined",sx:{width:"100%","& .MuiInputBase-input":{fontSize:14}}})}),(0,j.jsx)(t.Z,{sx:{mb:{xs:4,xl:5}},children:(0,j.jsx)(a.Z,{label:(0,j.jsx)(c.Z,{id:"common.password"}),name:"password",type:"password",variant:"outlined",sx:{width:"100%","& .MuiInputBase-input":{fontSize:14}}})}),(0,j.jsxs)(t.Z,{sx:{mb:{xs:3,xl:4},display:"flex",alignItems:"center",flexWrap:"wrap"},children:[(0,j.jsxs)(t.Z,{sx:{display:"flex",alignItems:"center"},children:[(0,j.jsx)(x.Z,{sx:{ml:-3}}),(0,j.jsx)(t.Z,{component:"span",sx:{mr:2,color:"grey.500"},children:(0,j.jsx)(c.Z,{id:"common.iAgreeTo"})})]}),(0,j.jsx)(t.Z,{component:"span",sx:{color:function(n){return n.palette.primary.main},cursor:"pointer"},children:(0,j.jsx)(c.Z,{id:"common.termConditions"})})]}),(0,j.jsx)("div",{children:(0,j.jsx)(d.Z,{variant:"contained",color:"primary",disabled:e,sx:{minWidth:160,fontWeight:f.F3.REGULAR,fontSize:16,textTransform:"capitalize",padding:"4px 16px 8px"},type:"submit",children:(0,j.jsx)(c.Z,{id:"common.signup"})})})]})}})}),(0,j.jsxs)(t.Z,{sx:{color:"grey.500",mb:{xs:5,md:7}},children:[(0,j.jsx)("span",{style:{marginRight:4},children:(0,j.jsx)(c.Z,{id:"common.alreadyHaveAccount"})}),(0,j.jsx)(t.Z,{component:"span",sx:{fontWeight:f.F3.MEDIUM,"& a":{color:function(n){return n.palette.primary.main},textDecoration:"none"}},children:(0,j.jsx)(p.rU,{to:"/signIn",children:(0,j.jsx)(c.Z,{id:"common.signIn"})})})]}),(0,j.jsxs)(t.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",backgroundColor:function(n){return n.palette.background.default},mx:{xs:-5,lg:-10},mb:{xs:-6,lg:-11},mt:"auto",py:2,px:{xs:5,lg:10}},children:[(0,j.jsx)(t.Z,{sx:{color:function(n){return n.palette.text.secondary}},children:(0,j.jsx)(c.Z,{id:"common.orLoginWith"})}),(0,j.jsxs)(t.Z,{sx:{display:"flex",alignItems:"center"},children:[(0,j.jsx)(u.Z,{sx:{p:2,"& svg":{fontSize:18}},onClick:function(){return i("google")},children:(0,j.jsx)(g.P_r,{})}),(0,j.jsx)(u.Z,{sx:{p:1.5,"& svg":{fontSize:18}},onClick:function(){return i("facebook")},children:(0,j.jsx)(h.tBk,{})}),(0,j.jsx)(u.Z,{sx:{p:1.5,"& svg":{fontSize:18}},onClick:function(){return i("github")},children:(0,j.jsx)(Z.rFR,{})}),(0,j.jsx)(u.Z,{sx:{p:1.5,"& svg":{fontSize:18}},onClick:function(){return i("twitter")},children:(0,j.jsx)(g.h3E,{})})]})]}),(0,j.jsx)(m.Z,{})]})},v=i(52487),w=function(){return(0,j.jsx)(s.Z,{children:(0,j.jsxs)(t.Z,{sx:{width:"100%"},children:[(0,j.jsx)(t.Z,{sx:{mb:{xs:6,xl:8}},children:(0,j.jsx)(t.Z,{sx:{mb:5,display:"flex",alignItems:"center"},children:(0,j.jsx)(v.Z,{})})}),(0,j.jsx)(b,{})]})})}},68997:function(n,e,i){i.d(e,{PV:function(){return r},SR:function(){return o},Tl:function(){return s}});var t=i(77221),s=function(n){return function(e){return e({type:t.cR,payload:n})}},r=function(n){return function(e){return e({type:t.Io,payload:n})}},o=function(){return function(n){return n({type:t.yi})}}}}]);
//# sourceMappingURL=100.4a48364c.chunk.js.map