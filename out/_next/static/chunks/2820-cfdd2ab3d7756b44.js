"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2820],{79938:function(n,e,l){l.d(e,{Kb:function(){return k},ZP:function(){return K},WX:function(){return I},eq:function(){return P},qC:function(){return A}}),l(14358);var r=l(93513),t=l(34003),i=l(95793),a=l(17097),o=l(72573),s=l(16938),c=l(3363),u=l(76383),d=l(27993),v=l(91371),f=l(96662),h=l(94355),x=l(28013),g=l(80813),p=l(53002),y=l(97042);async function m(n){let{connection:e,wallet:l,txVersion:r,transactions:t}=n,i=await (0,y.KLW)({connection:e,payer:l,innerTransactions:t,makeTxVersion:r,addLookupTableInfo:y.FTx});return i}let S=[n=>{let{signatureResult:e,changeHistoryInfo:l}=n;(function(n){try{var e;let l=null===(e=n.err)||void 0===e?void 0:e.InstructionError[1].Custom;if([6021].includes(l))return!0;return!1}catch(n){return!1}})(e)&&(null==l||l({forceErrorTitle:"Deposit failed due to slippage error!",description:"Slippage has exceeded user settings. \nTry again or adjust your slippage tolerance."}))}],w=[];async function T(n){var e;let{transaction:l,payload:r,batchOptions:t,cache:i=!0}=n;if(!t||!("_buildArgs"in(e=r.connection))||!("_rpcBatchRequest"in e)||!("_compile"in l)||!("_serialize"in l))return N(l,r,i);{let n;let e=new Promise(e=>{n=e});if(w.push({tx:l,txidPromise:e,resolveFn:n}),w.length===t.allSignedTransactions.length){let n=await j(w.map(n=>n.tx),r);w.forEach((e,l)=>{let{resolveFn:r}=e;r(n[l])}),w.splice(0,w.length)}return e}}async function N(n,e,l){var r,i,a,o;if(null===(r=e.signerkeyPair)||void 0===r?void 0:r.ownerKeypair)return(0,t.Z)(!I(n),"if use force ownerKeypair, must use transaction, not versionedTransaction"),n.feePayer=null!==(a=null===(i=e.signerkeyPair.payerKeypair)||void 0===i?void 0:i.publicKey)&&void 0!==a?a:e.signerkeyPair.ownerKeypair.publicKey,e.connection.sendTransaction(n,[null!==(o=e.signerkeyPair.payerKeypair)&&void 0!==o?o:e.signerkeyPair.ownerKeypair]);{let r=A(n,{cache:l});return await e.connection.sendRawTransaction(r,{skipPreflight:!0})}}async function j(n,e){let l=n.map(n=>n.serialize().toString("base64")),r=l.map(n=>{let l=e.connection._buildArgs([n],void 0,"base64");return{methodName:"sendTransaction",args:l}}),t=(await e.connection._rpcBatchRequest(r)).map(n=>n.result.value);return t}var E=l(48764).Buffer;function b(n){return(0,a.Kn)(n)&&"instructions"in n&&"instructionTypes"in n}function k(n,e){return l=>K(n(l),(0,u.Gm)(e,{additionalMultiOptionCallback:l,additionalSingleOptionCallback:l}))}let P={};async function K(n,e){var l,i,o,s,c,x,y,m,S;let{transactionCollector:w,collected:{innerTransactions:T,singleTxOptions:N,multiTxOption:j}}=function(n){let e=[],l={},r=[],{additionalSingleOptionCallback:t,additionalMultiOptionCallback:i}=null!=n?n:{},o=(n,l)=>{r.push(n),e.push((0,u.Gm)(null!=l?l:{},t))},s=(n,e)=>{n.forEach(n=>{let[e,l]=Array.isArray(n)?n:[n];o(e,l)}),Object.assign(l,(0,u.Gm)(null!=e?e:{},i))},c=(n,e)=>{let l=(0,a.kJ)(n);if(l){let l=n.map(n=>(0,a.kJ)(n)?[n[0],{...e,...n[1]}]:[n,e]);s(l,e)}else o(n,e)};return{transactionCollector:{add:c},collected:{innerTransactions:r,singleTxOptions:e,multiTxOption:l}}}(e);v.ZP.setState({isApprovePanelShown:!0});try{let{signAllTransactions:a,owner:o,txVersion:s,adapter:c}=p.Z.getState(),d=f.ZP.getState().connection;if((0,t.Z)(d,"no rpc connection"),null==e?void 0:null===(l=e.forceKeyPairs)||void 0===l?void 0:l.ownerKeypair){let l=e.forceKeyPairs.ownerKeypair.publicKey,r=await (0,g.p5)({owner:l,connection:d});await n({transactionCollector:w,baseUtils:{connection:d,owner:l,...r}})}else{let{tokenAccounts:e,allTokenAccounts:l}=p.Z.getState();(0,t.Z)(o,"wallet not connected"),await n({transactionCollector:w,baseUtils:{connection:d,owner:o,tokenAccounts:e,allTokenAccounts:l}})}let h=null!=o?o:null==e?void 0:null===(i=e.forceKeyPairs)||void 0===i?void 0:i.ownerKeypair.publicKey;(0,t.Z)(h,"no owner provided");let x=await F({transactions:T,singleOptions:(0,r.Uy)(N,n=>{n[0]&&(n[0].onTxSentFinally=(0,u.tS)(()=>{v.ZP.setState({isApprovePanelShown:!1})},n[0].onTxSentFinally))}),multiOption:j,payload:{owner:h,connection:d,txVersion:s,signAllTransactions:a,signerkeyPair:null==e?void 0:e.forceKeyPairs,adapter:c}});return v.ZP.setState({isApprovePanelShown:!1}),x}catch(i){let{logError:n}=h.Z.getState();console.warn(i);let e=null!==(S=null==N?void 0:null===(o=N[0])||void 0===o?void 0:null===(s=o.txHistoryInfo)||void 0===s?void 0:s.forceErrorTitle)&&void 0!==S?S:(null!==(m=null==N?void 0:null===(c=N[0])||void 0===c?void 0:null===(x=c.txHistoryInfo)||void 0===x?void 0:x.title)&&void 0!==m?m:"")+" Error",l=i instanceof Error?i.message.replace(/\.$/,""):String(i);(l.includes("versioned transactions isn't supported")||l.includes(".serializeMessage")||l.includes("forEach"))&&(l="Transaction cancelled\nThis wallet might not support Versioned Transaction, turn it off and try again.");let r=(0,d.u)(null==N?void 0:null===(y=N[0])||void 0===y?void 0:y.txErrorNotificationDescription,[i]),t=r||l;return n(e,t),v.ZP.setState({isApprovePanelShown:!1}),{allSuccess:!1,txids:[]}}}let Z=new Map;function I(n){return(0,a.Kn)(n)&&"version"in n}function A(n,e){let l=I(n)?n.message.recentBlockhash:n.recentBlockhash;if(l&&Z.has(l))return Z.get(l);{let r=n.serialize();return l&&(null==e?void 0:e.cache)&&Z.set(l,r),r}}async function F(n){let{transactions:e,singleOptions:l,multiOption:t,payload:d}=n;return new Promise((n,v)=>(async()=>{let f=[],g=[],p=l=>{if(g.push(l),g.length===e.length){var r;null===(r=t.onTxAllSuccess)||void 0===r||r.call(t,{txids:f}),n({allSuccess:!0,txids:f})}},y=(0,r.Uy)(l,e=>{e.forEach(e=>{e.onTxSentSuccess=(0,u.tS)(n=>{let{txid:e}=n;f.push(e)},e.onTxSentSuccess),e.onTxError=(0,u.tS)(()=>{var e;null===(e=t.onTxAnyError)||void 0===e||e.call(t,{txids:f}),n({allSuccess:!1,txids:f})},e.onTxError),e.onTxSuccess=(0,u.tS)(n=>{let{txid:e}=n;p(e)},e.onTxSuccess)})});try{var S;let n=e.every(b)?await m({connection:d.connection,wallet:d.owner,txVersion:d.txVersion,transactions:e}):e;try{console.info("tx transactions: ",function n(e){let l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;return!l||(0,i.J_)(e)||(0,a.pt)(e)?e:(0,a.CU)(e)?(0,c.ZP)(e):(0,a.ve)(e)?(0,o.B)(e):(0,a.kJ)(e)?e.map(e=>n(e,l-1)):(0,a.Kn)(e)?(0,s.xh)(e,e=>n(e,l-1)):e}(n),n.map(n=>E.from(n.serialize({requireAllSignatures:!1,verifySignatures:!1})).toString("base64")))}catch(n){console.warn("tx log error")}let l=null===(S=d.signerkeyPair)||void 0===S?void 0:S.ownerKeypair,v=await (l?n:d.signAllTransactions(n));v.forEach(n=>{n.signatures.forEach(n=>{if(n instanceof Uint8Array){if(!n.valueOf().find(n=>0!==n))throw Error("User rejected the request")}else if(n.publicKey.equals(d.owner)&&!n.signature)throw Error("User rejected the request")})});let{mutatedSingleOptions:f,txLoggerControllers:g}=function(n){let{transactions:e,singleOptions:l,multiOption:t,adapter:i}=n,a=l.map((n,l)=>{let{txHistoryInfo:r,...t}=n;return{transaction:e[l],historyInfo:r,...t}}),o=h.Z.getState().logTxid({txInfos:a}),s=(0,r.Uy)(l,n=>{n.forEach(n=>{n.onTxSentSuccess=(0,u.tS)(n=>{var e;let{txid:l,transaction:r}=n;null===(e=o.changeItemInfo)||void 0===e||e.call(o,{txid:l,state:"processing"},{transaction:r})},n.onTxSentSuccess),n.onTxError=(0,u.tS)(n=>{var l;let{txid:r,transaction:t,error:i}=n;null===(l=o.changeItemInfo)||void 0===l||l.call(o,{txid:r,state:"error",error:i},{transaction:t});let a=e.indexOf(t);a<0||e.slice(a+1).forEach(n=>{var e;null===(e=o.changeItemInfo)||void 0===e||e.call(o,{state:"aborted"},{transaction:n})})},n.onTxError),n.onTxSuccess=(0,u.tS)(n=>{var e;let{txid:l,transaction:r}=n;null===(e=o.changeItemInfo)||void 0===e||e.call(o,{txid:l,state:"success"},{transaction:r})},n.onTxSuccess)})}),c=(0,r.Uy)(s,n=>{n.forEach(n=>{var e;let{...l}=null!==(e=n.txHistoryInfo)&&void 0!==e?e:{};n.onTxFinally=(0,u.tS)(n=>{let{txid:e,type:r,passedMultiTxid:t,isMulti:a}=n;x.Z.getState().addHistoryItem({status:"error"===r?"fail":r,txid:e,adapterName:null==i?void 0:i.name,time:Date.now(),isMulti:a,relativeTxids:t,...l})},n.onTxFinally)})});return{mutatedSingleOptions:c,txLoggerControllers:Array.from({length:e.length}).fill(o)}}({transactions:v,singleOptions:y,multiOption:t,adapter:d.adapter}),p=function(n){let{transactions:e,sendMode:l,singleOptions:t,payload:i,txLoggerControllers:a}=n,o={isMulti:e.length>1,passedMultiTxid:Array.from({length:e.length}),multiTransactionLength:e.length,transactions:e};if("parallel(dangerous-without-order)"===l||"parallel(batch-transactions)"===l){let n=()=>{e.forEach((n,e)=>O({transaction:n,wholeTxidInfo:o,payload:i,isBatched:"parallel(batch-transactions)"===l,singleOption:t[e],txLoggerController:a[e]}))};return n}{let n=e.reduceRight((n,e,s)=>{var c;let{fn:d,method:v}=n,f=t[s];return{fn:()=>O({transaction:e,wholeTxidInfo:o,payload:i,singleOption:(0,r.Uy)(f,n=>{"finally"===v?n.onTxFinally=(0,u.tS)(d,n.onTxFinally):"error"===v?n.onTxError=(0,u.tS)(d,n.onTxError):"success"===v&&(n.onTxSuccess=(0,u.tS)(d,n.onTxSuccess))}),txLoggerController:a[s]}),method:null!==(c=f.continueWhenPreviousTx)&&void 0!==c?c:"queue(all-settle)"===l?"finally":"success"}},{fn:()=>{},method:"success"});return n.fn}}({transactions:v,sendMode:t.sendMode,singleOptions:f,payload:d,txLoggerControllers:g});p()}catch(n){v(n)}})())}async function O(n){var e,l,r;let{transaction:i,wholeTxidInfo:a,singleOption:o,payload:s,isBatched:c,txLoggerController:u}=n,d=a.transactions.indexOf(i),v={...a,currentIndex:d};try{let n=await T({transaction:i,payload:s,batchOptions:c?{allSignedTransactions:a.transactions}:void 0,cache:!!(null==o?void 0:o.cacheTransaction)});(0,t.Z)(n,"something went wrong in sending transaction");let l=(e,l)=>{if(n){var r,t;null==u||null===(r=u.changeItemInfo)||void 0===r||r.call(u,{txid:n,historyInfo:{...null==o?void 0:o.txHistoryInfo,...e,adapterName:null===(t=s.adapter)||void 0===t?void 0:t.name,txid:n,status:l,time:Date.now()}},{transaction:i})}};null==o||null===(e=o.onTxSentSuccess)||void 0===e||e.call(o,{transaction:i,txid:n,...v,changeHistoryInfo:n=>l(n,"pending")}),a.passedMultiTxid[d]=n//! 💩 bad method! it's mutate method!
,function(n){let{txid:e,transaction:l,extraTxidInfo:r,callbacks:t}=n,{connection:i}=f.ZP.getState(),{logError:a}=h.Z.getState();if(!i){a("no rpc connection");return}i.onSignature(e,(n,i)=>{var a,o,s,c;n.err?(null==t||null===(a=t.onTxError)||void 0===a||a.call(t,{txid:e,transaction:l,signatureResult:n,context:i,error:n.err,...r}),null==t||null===(o=t.onTxFinally)||void 0===o||o.call(t,{txid:e,transaction:l,signatureResult:n,context:i,type:"error",...r})):(null==t||null===(s=t.onTxSuccess)||void 0===s||s.call(t,{txid:e,transaction:l,signatureResult:n,context:i,...r}),null==t||null===(c=t.onTxFinally)||void 0===c||c.call(t,{txid:e,transaction:l,signatureResult:n,context:i,type:"success",...r}))},"processed"),i.getSignatureStatus(e)}({txid:n,transaction:i,extraTxidInfo:v,callbacks:{onTxSuccess(n){var e;null==o||null===(e=o.onTxSuccess)||void 0===e||e.call(o,{...n,...v,changeHistoryInfo:n=>l(n,"success")})},onTxError(n){console.error("tx error: ",n.error);let e=(null==o?void 0:o.onTxError)?S.concat(null==o?void 0:o.onTxError):S;e.forEach(e=>{e({...n,...v,changeHistoryInfo:n=>l(n,"fail")})})},onTxFinally(n){var e;null==o||null===(e=o.onTxFinally)||void 0===e||e.call(o,{...n,...v})}}})}catch(n){console.error("fail to send tx: ",n),null==o||null===(l=o.onTxSentError)||void 0===l||l.call(o,{err:n,...v})}finally{null==o||null===(r=o.onTxSentFinally)||void 0===r||r.call(o)}}},70745:function(n,e,l){l.d(e,{Z:function(){return a}});var r=l(85893),t=l(66180),i=l(40471);function a(n){var e;let{noCoinIconBorder:l,haveAnime:a,iconSrc:o,token:s,isOptionToken:c,domRef:u,className:d,size:v="md",style:f,isRewardBadge:h,isRewardEnd:x,onClick:g}=n,p=null!==(e=null!=o?o:null==s?void 0:s.icons)&&void 0!==e?e:null==s?void 0:s.icon,y=!l,m="2xl"===v?"h-20 w-20":"lg"===v?"h-12 w-12":"md"===v?"h-8 w-8":"sm"===v?"h-5 w-5":"smi"===v?"h-6 w-6":"xs"===v?"w-4 h-4":"h-12 w-12";return(0,r.jsxs)(r.Fragment,{children:[x&&(0,r.jsx)(i.Z,{className:"h-8 w-8 rounded-full overflow-hidden ",src:"/icons/diagonal.svg",fallbackSrc:"/coins/unknown.svg",style:{position:"absolute",zIndex:100,opacity:20}}),(0,r.jsx)("div",{ref:u,className:"CoinAvatar flex items-center  ".concat(h?"rounded-full ring-1 ring-[#616A9D] p-1":""," ").concat(x?"opacity-30 ring-[#7B7EAF]":""," "),style:f,onClick:g,children:a?(0,r.jsxs)("div",{className:(0,t.m)("".concat(m," rounded-full swap-coin"),d),suppressHydrationWarning:!0,style:{"--delay":"".concat((1e3*Math.random()).toFixed(2),"ms")},children:[(0,r.jsx)(i.Z,{className:"front-face overflow-hidden transition-transform transform ".concat(y?"scale-[.7]":""),src:p,fallbackSrc:"/coins/unknown.svg"}),(0,r.jsxs)("div",{className:"line-group",children:[(0,r.jsx)("div",{className:"line-out",children:(0,r.jsx)("div",{className:"line-inner"})}),(0,r.jsx)("div",{className:"line-out",children:(0,r.jsx)("div",{className:"line-inner"})}),(0,r.jsx)("div",{className:"line-out",children:(0,r.jsx)("div",{className:"line-inner"})}),(0,r.jsx)("div",{className:"line-out",children:(0,r.jsx)("div",{className:"line-inner"})}),(0,r.jsx)("div",{className:"line-out",children:(0,r.jsx)("div",{className:"line-inner"})}),(0,r.jsx)("div",{className:"line-out",children:(0,r.jsx)("div",{className:"line-inner"})}),(0,r.jsx)("div",{className:"line-out",children:(0,r.jsx)("div",{className:"line-inner"})}),(0,r.jsx)("div",{className:"line-out",children:(0,r.jsx)("div",{className:"line-inner"})}),(0,r.jsx)("div",{className:"line-out",children:(0,r.jsx)("div",{className:"line-inner"})}),(0,r.jsx)("div",{className:"line-out",children:(0,r.jsx)("div",{className:"line-inner"})}),(0,r.jsx)("div",{className:"line-out",children:(0,r.jsx)("div",{className:"line-inner"})}),(0,r.jsx)("div",{className:"line-out",children:(0,r.jsx)("div",{className:"line-inner"})})]}),(0,r.jsx)(i.Z,{className:"back-face overflow-hidden transition-transform transform ".concat(y?"scale-[.7]":""),src:p,fallbackSrc:"/coins/unknown.svg"})]}):(0,r.jsxs)("div",{className:(0,t.m)("".concat(m," relative rounded-full"),d),style:{background:"linear-gradient(126.6deg, rgba(171, 196, 255, 0.2) 28.69%, rgba(171, 196, 255, 0) 100%)"},children:[(0,r.jsx)(i.Z,{className:"".concat(m," rounded-full overflow-hidden transition-transform transform ").concat(y?"scale-[.7]":""),src:p,fallbackSrc:"/coins/unknown.svg"}),!1]})})]})}}}]);