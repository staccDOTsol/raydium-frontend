(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2003],{71142:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dev-playground",function(){return n(64667)}])},32029:function(e,t,n){"use strict";n.d(t,{Z:function(){return m}});var i=n(85893),l=n(67294),r=n(17097),a=n(51523),c=n(72573),u=n(31139),o=n(96398),s=n(62361),d=n(74239),v=n(82727),p=n(24608);function m(e){let{defaultValue:t,value:n,decimalCount:m=6,showArrowControls:g,showPlusMinusControls:x,minN:f=0,maxN:N,step:h=Number((1/10**Math.floor(m)).toFixed(m)),onInvalid:b,canNegative:k,onValid:y,skipAutoIncrease:_,skipAutoDecrease:E,increaseFn:j,decreaseFn:R,prefix:Z,prefixClassName:C,suffix:S,valueToStringOptions:w,debounceDelay:L=300,onUserInput:B,...I}=e,[T,D,P]=(0,s.$)(t);(0,o.L)(()=>{D(n)},[n]);let M={canNegativeLetter:/^[0-9-,.]$/,canNegativeRegexpString:"^[0-9-]*[.,]?[0-9]{0,".concat(m,"}$"),decimalRegexpString:"^[0-9]*[.,]?[0-9]{0,".concat(m,"}$"),decimalLetter:/^[0-9,.]$/},$=(0,l.useRef)(),z=B&&L?(0,p.Nr)(B,{debouncedOptions:{delay:L}}):B;(0,l.useEffect)(()=>{var e;let t=k?M.canNegativeLetter:M.decimalLetter,n=e=>{let n=e.key,i=n.length>1||t.test(n),l=e.ctrlKey||e.altKey;i||l||e.preventDefault()};return null===(e=$.current)||void 0===e||e.addEventListener("keydown",n,{capture:!0,passive:!1}),()=>{var e;null===(e=$.current)||void 0===e||e.removeEventListener("keydown",n,{capture:!0})}},[]);let V=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"user-input";(0,r.ve)(e)&&(D(e),null==z||z(e,{canSafelyCovertToNumber:Number(e)<Number.MAX_SAFE_INTEGER&&Number(e)>Number.MIN_SAFE_INTEGER,triggerBy:t}))},A=e=>{var t;let n=$.current;if(!n)return;null===(t=I.onDangerousValueChange)||void 0===t||t.call(I,e,n);let i=n.checkValidity();i&&(null==y||y()),i||null==b||b()},F=()=>{var e;let t=null!==(e=null==j?void 0:j((0,c.B)(P())))&&void 0!==e?e:(0,a.IH)((0,c.B)(P()),h),n=(0,a.uZ)(f,t,N),i=(0,c.B)(n);V(i,"increase-decrease"),A(i)},O=()=>{var e;let t=null!==(e=null==R?void 0:R((0,c.B)(P())))&&void 0!==e?e:(0,a.h9)((0,c.B)(P()),h),n=(0,a.uZ)(f,t,N),i=(0,c.B)(n);V(i,"increase-decrease"),A(i)};return(0,i.jsx)(v.Z,{inputMode:"decimal",inputHTMLProps:{pattern:k?M.canNegativeRegexpString:M.decimalRegexpString,inputMode:"decimal",min:String(f),max:N?String(N):void 0,step:h},...I,inputDomRef:(0,u.Z)($,I.inputDomRef),pattern:new RegExp(k?M.canNegativeRegexpString:M.decimalRegexpString),value:T?(0,c.B)(T,w):"",defaultValue:(0,c.B)(t,w),onUserInput:e=>{V(e)},onDangerousValueChange:e=>{A(e)},prefix:Z||(x?(0,i.jsx)(d.Z,{className:"text-light-blue clickable",heroIconName:"minus",size:"xs",onClick:O}):void 0),prefixClassName:C||"",suffix:S||(g?(0,i.jsxs)("div",{children:[(0,i.jsx)(d.Z,{className:"opacity-50 hover:opacity-100 clickable",heroIconName:"chevron-up",size:"xs",onClick:F,canLongClick:!0}),(0,i.jsx)(d.Z,{className:"opacity-50 hover:opacity-100 clickable",heroIconName:"chevron-down",size:"xs",onClick:O,canLongClick:!0})]}):x?(0,i.jsx)(d.Z,{className:"text-light-blue clickable",heroIconName:"plus",size:"xs",onClick:F}):void 0)})}},64667:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return o}});var i=n(85893),l=n(67294),r=n(32029),a=n(82727),c=n(73881),u=n(92224);function o(){return(0,i.jsxs)(c.Z,{mobileBarTitle:"Dev Playground",metaTitle:"Dev Playground - Raydium",children:[(0,i.jsx)("div",{className:"title text-2xl mobile:text-lg font-semibold justify-self-start text-white mb-4",children:"Playground"}),(0,i.jsx)(s,{})]})}function s(){let[e,{toggle:t}]=(0,u.ZP)(),[n,c]=(0,l.useState)(96);return(0,i.jsxs)("div",{className:"border",children:[(0,i.jsx)(r.Z,{}),(0,i.jsx)(a.Z,{pattern:/^[0-9]*[.,]?[0-9]{0,3}$/})]})}}},function(e){e.O(0,[3577,3881,9774,2888,179],function(){return e(e.s=71142)}),_N_E=e.O()}]);