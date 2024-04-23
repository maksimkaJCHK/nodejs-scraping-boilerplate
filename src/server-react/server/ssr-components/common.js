"use strict";function e(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var t={exports:{}},n={},r=Symbol.for("react.element"),l=Symbol.for("react.portal"),a=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),i=Symbol.for("react.profiler"),c=Symbol.for("react.provider"),u=Symbol.for("react.context"),s=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),d=Symbol.iterator;var y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},b=Object.assign,E={};function h(e,t,n){this.props=e,this.context=t,this.refs=E,this.updater=n||y}function g(){}function v(e,t,n){this.props=e,this.context=t,this.refs=E,this.updater=n||y}h.prototype.isReactComponent={},h.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},h.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},g.prototype=h.prototype;var k=v.prototype=new g;k.constructor=v,b(k,h.prototype),k.isPureReactComponent=!0;var _=Array.isArray,x=Object.prototype.hasOwnProperty,S={current:null},C={key:!0,ref:!0,__self:!0,__source:!0};function w(e,t,n){var l,a={},o=null,i=null;if(null!=t)for(l in void 0!==t.ref&&(i=t.ref),void 0!==t.key&&(o=""+t.key),t)x.call(t,l)&&!C.hasOwnProperty(l)&&(a[l]=t[l]);var c=arguments.length-2;if(1===c)a.children=n;else if(1<c){for(var u=Array(c),s=0;s<c;s++)u[s]=arguments[s+2];a.children=u}if(e&&e.defaultProps)for(l in c=e.defaultProps)void 0===a[l]&&(a[l]=c[l]);return{$$typeof:r,type:e,key:o,ref:i,props:a,_owner:S.current}}function N(e){return"object"==typeof e&&null!==e&&e.$$typeof===r}var j=/\/+/g;function $(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function R(e,t,n,a,o){var i=typeof e;"undefined"!==i&&"boolean"!==i||(e=null);var c=!1;if(null===e)c=!0;else switch(i){case"string":case"number":c=!0;break;case"object":switch(e.$$typeof){case r:case l:c=!0}}if(c)return o=o(c=e),e=""===a?"."+$(c,0):a,_(o)?(n="",null!=e&&(n=e.replace(j,"$&/")+"/"),R(o,t,n,"",(function(e){return e}))):null!=o&&(N(o)&&(o=function(e,t){return{$$typeof:r,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(o,n+(!o.key||c&&c.key===o.key?"":(""+o.key).replace(j,"$&/")+"/")+e)),t.push(o)),1;if(c=0,a=""===a?".":a+":",_(e))for(var u=0;u<e.length;u++){var s=a+$(i=e[u],u);c+=R(i,t,n,s,o)}else if(s=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=d&&e[d]||e["@@iterator"])?e:null}(e),"function"==typeof s)for(e=s.call(e),u=0;!(i=e.next()).done;)c+=R(i=i.value,t,n,s=a+$(i,u++),o);else if("object"===i)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return c}function O(e,t,n){if(null==e)return e;var r=[],l=0;return R(e,r,"","",(function(e){return t.call(n,e,l++)})),r}function P(e){if(-1===e._status){var t=e._result;(t=t()).then((function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)}),(function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)})),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var F={current:null},A={transition:null},I={ReactCurrentDispatcher:F,ReactCurrentBatchConfig:A,ReactCurrentOwner:S};n.Children={map:O,forEach:function(e,t,n){O(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return O(e,(function(){t++})),t},toArray:function(e){return O(e,(function(e){return e}))||[]},only:function(e){if(!N(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},n.Component=h,n.Fragment=a,n.Profiler=i,n.PureComponent=v,n.StrictMode=o,n.Suspense=m,n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=I,n.cloneElement=function(e,t,n){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var l=b({},e.props),a=e.key,o=e.ref,i=e._owner;if(null!=t){if(void 0!==t.ref&&(o=t.ref,i=S.current),void 0!==t.key&&(a=""+t.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(u in t)x.call(t,u)&&!C.hasOwnProperty(u)&&(l[u]=void 0===t[u]&&void 0!==c?c[u]:t[u])}var u=arguments.length-2;if(1===u)l.children=n;else if(1<u){c=Array(u);for(var s=0;s<u;s++)c[s]=arguments[s+2];l.children=c}return{$$typeof:r,type:e.type,key:a,ref:o,props:l,_owner:i}},n.createContext=function(e){return(e={$$typeof:u,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:c,_context:e},e.Consumer=e},n.createElement=w,n.createFactory=function(e){var t=w.bind(null,e);return t.type=e,t},n.createRef=function(){return{current:null}},n.forwardRef=function(e){return{$$typeof:s,render:e}},n.isValidElement=N,n.lazy=function(e){return{$$typeof:f,_payload:{_status:-1,_result:e},_init:P}},n.memo=function(e,t){return{$$typeof:p,type:e,compare:void 0===t?null:t}},n.startTransition=function(e){var t=A.transition;A.transition={};try{e()}finally{A.transition=t}},n.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")},n.useCallback=function(e,t){return F.current.useCallback(e,t)},n.useContext=function(e){return F.current.useContext(e)},n.useDebugValue=function(){},n.useDeferredValue=function(e){return F.current.useDeferredValue(e)},n.useEffect=function(e,t){return F.current.useEffect(e,t)},n.useId=function(){return F.current.useId()},n.useImperativeHandle=function(e,t,n){return F.current.useImperativeHandle(e,t,n)},n.useInsertionEffect=function(e,t){return F.current.useInsertionEffect(e,t)},n.useLayoutEffect=function(e,t){return F.current.useLayoutEffect(e,t)},n.useMemo=function(e,t){return F.current.useMemo(e,t)},n.useReducer=function(e,t,n){return F.current.useReducer(e,t,n)},n.useRef=function(e){return F.current.useRef(e)},n.useState=function(e){return F.current.useState(e)},n.useSyncExternalStore=function(e,t,n){return F.current.useSyncExternalStore(e,t,n)},n.useTransition=function(){return F.current.useTransition()},n.version="18.2.0",t.exports=n;var L=e(t.exports);function T(){return T=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},T.apply(this,arguments)}const z=({url:e,title:t,...n})=>L.createElement("a",T({href:e},n),t);function M(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],l=document.createElement("style");l.type="text/css","top"===n&&r.firstChild?r.insertBefore(l,r.firstChild):r.appendChild(l),l.styleSheet?l.styleSheet.cssText=e:l.appendChild(document.createTextNode(e))}}M("nav {\n  padding: 10px 0;\n  font-size: 20px;\n  line-height: 120%;\n  border-bottom: 1px solid #202083; }\n  nav a {\n    color: var(--type-color);\n    text-decoration: none;\n    display: inline-block;\n    margin-left: 20px; }\n    nav a:first-of-type {\n      margin-left: 0; }\n    nav a:hover, nav a.active {\n      color: var(--link-color); }\n");const V=({link:e})=>L.createElement("nav",null,e.map(((e,t)=>L.createElement(z,T({},e,{key:t})))));M(".btn {\n  --btn-bg: #444;\n  --btn-bg-hover: #656565;\n  color: #fff;\n  cursor: pointer;\n  padding: 10px 15px;\n  display: inline-block;\n  border-radius: 5px;\n  background: var(--btn-bg);\n  border: 1px solid var(--btn-bg);\n  transition: background-color .4s ease-in 0s; }\n  .btn:hover {\n    background: var(--btn-bg-hover); }\n  .btn[disabled] {\n    opacity: .4; }\n");const D=e=>{const{children:t,onClick:n,disabled:r}=e;return L.createElement("button",{disabled:r,className:"btn",onClick:n},t)};M(".params {\n  font-size: 16px;\n  line-height: 120%; }\n  .params-nav {\n    margin: 10px 0; }\n    .params-nav a,\n    .params-nav b {\n      display: inline-block;\n      margin-right: 10px; }\n    .params-nav a {\n      color: var(--link-color);\n      text-decoration: none; }\n      .params-nav a:hover {\n        text-decoration: none; }\n    .params-nav b a {\n      margin-right: 0; }\n    .params-nav .active {\n      color: var(--type-color); }\n  .params-btn-block {\n    display: flex;\n    gap: 15px 10px;\n    flex-wrap: wrap; }\n");const U=({cg:e,lb:t,newItem:n,children:r,isScraping:l,isAnalitics:a,analitics:o=(e=>e),scraping:i=(e=>e),scrapingAndAnalitics:c=(e=>e)})=>L.createElement("section",{className:"params"},L.createElement("div",{className:"h2"},"Запросы по конкретным магазинам:"),L.createElement("div",{className:"params-nav"},L.createElement("b",null,"Запрос для читай-города: "),e.map(((e,t)=>L.createElement(z,T({},e,{key:t}))))),L.createElement("div",{className:"params-nav"},L.createElement("b",null,"Запрос для лабирита: "),t.map(((e,t)=>L.createElement(z,T({},e,{key:t}))))),L.createElement("div",{className:"params-nav"},L.createElement("h2",null,"Новые товары:"),L.createElement("b",null,L.createElement(z,{url:"/new",title:"Новые товары по всем запросам"})),n.map(((e,t)=>L.createElement(z,T({},e,{key:t}))))),L.createElement("div",{className:"params-btn-block"},L.createElement(D,{onClick:i,disabled:l},"Скрапинг интернет-магазинов"),L.createElement(D,{onClick:o,disabled:a},"Анализировать"),L.createElement(D,{onClick:c,disabled:l||a},"Скрапинг интернет-магазинов и анализ"),r));M("@keyframes ldio-gggn3pkm2yo {\n  0% {\n    transform: translate(-50%, -50%) rotate(0deg); }\n  100% {\n    transform: translate(-50%, -50%) rotate(360deg); } }\n\n.preload {\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: absolute;\n  background: rgba(255, 255, 255, 0.7); }\n\n.ldio-gggn3pkm2yo {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  transform: translateZ(0) scale(0.48);\n  backface-visibility: hidden;\n  transform-origin: 0 0; }\n  .ldio-gggn3pkm2yo div {\n    position: absolute;\n    width: 58px;\n    height: 58px;\n    border: 10px solid #101be9;\n    border-top-color: transparent;\n    border-radius: 50%;\n    box-sizing: content-box;\n    animation: ldio-gggn3pkm2yo 1s linear infinite;\n    top: 50px;\n    left: 50px; }\n\n.loadingio-spinner-rolling-8n6pm9bs3j5 {\n  width: 48px;\n  height: 48px;\n  display: inline-block;\n  overflow: hidden;\n  background: none; }\n");const q=({load:e})=>e?L.createElement("div",{className:"preload"},L.createElement("div",{className:"loadingio-spinner-rolling-8n6pm9bs3j5"},L.createElement("div",{className:"ldio-gggn3pkm2yo"},L.createElement("div",null)))):null,B=({url:e,picture:t,title:n,bookAuthors:r,description:l,price:a,publisher:o,yearPublishing:i,pages:c})=>{const u={__html:l};return L.createElement("div",{className:"item"},L.createElement("a",{href:e,className:"item-img",target:"_blank"},t?L.createElement("img",{src:t}):"У товара нет картинки"),L.createElement("div",{className:"item-description"},L.createElement("h3",null,L.createElement("a",{href:e,target:"_blank"},n)),L.createElement("p",null,L.createElement("b",null,"Автор:")," ",r.map(((e,t)=>L.createElement("span",{key:t},e)))),L.createElement("p",{dangerouslySetInnerHTML:u}),L.createElement("p",null,L.createElement("b",null,"Страниц:")," ",c),L.createElement("p",null,L.createElement("b",null,"Опубликовано:")," ",i||"-"),L.createElement("p",null,L.createElement("b",null,"Издательство:")," ",o),L.createElement("p",null,L.createElement("b",null,"Цена:")," ",a," руб"),L.createElement("div",{className:"item-link"},L.createElement("a",{href:e,target:"_blank"},"Посмотреть товар"))))},H=({url:e,picture:t,title:n,description:r,publisher:l,price:a})=>L.createElement("div",{className:"item"},L.createElement("a",{href:e,className:"item-img",target:"_blank"},t?L.createElement("img",{src:t}):"У товара нет картинки"),L.createElement("div",{className:"item-description"},L.createElement("h3",null,L.createElement("a",{href:e,target:"_blank"},n)),L.createElement("p",null,L.createElement("b",null,"Издательство:")," ",l),L.createElement("p",null,L.createElement("b",null,"Цена:")," ",a),L.createElement("div",{className:"item-link"},L.createElement("a",{href:e,target:"_blank"},"Посмотреть товар"))));M(".fraze-null {\n  margin: 20px 0;\n  font-size: 13px; }\n");const W=({text:e="Нет товаров для отображения"})=>L.createElement("p",{className:"fraze-null"},L.createElement("b",null,e)),Y=({shop:e,title:t,id:n,type:r="cg"})=>{const l=t?L.createElement("h3",null,t):null;return L.createElement("div",{id:n},l,L.createElement("div",null,"Всего ",e&&e.length," товаров"),L.createElement("div",{className:"item-wrap"},e&&e.length?"cg"===r?e.map(((e,t)=>L.createElement(B,T({},e,{key:t})))):e.map(((e,t)=>L.createElement(H,T({},e,{key:t})))):L.createElement(W,null)))},Z=({title:e,idCg:t,idLb:n})=>{const r=e?L.createElement("h2",null,e):null,l=t||n?L.createElement("ul",null,t&&L.createElement("li",null,L.createElement(z,{url:"#"+t,title:"Товары на читай-городе"})),n&&L.createElement("li",null,L.createElement(z,{url:"#"+n,title:"Товары на лабиринте"}))):null;return L.createElement(L.Fragment,null,r,l)},G=({id:e,shops:t,title:n,idCg:r,idLb:l})=>L.createElement("div",{id:e},L.createElement(Z,{title:n,idCg:r,idLb:l}),L.createElement(Y,{shop:t.cg,id:r,type:"cg",title:"Товары для читай-города"}),L.createElement(Y,{shop:t.lb,id:l,type:"lb",title:"Товары для лабиринта"})),J=({catalogs:e})=>L.createElement(L.Fragment,null,e.map(((e,t)=>L.createElement(G,T({},e,{key:t}))))),K=({title:e,links:t})=>{const n=e?L.createElement("h1",null,e):null,r=t&&t.length?L.createElement("ul",null,t.map((({title:e,url:t},n)=>t&&t.length?L.createElement("li",{key:n},L.createElement(z,{url:"#"+t,title:e||"Заголовок не определен"})):null))):null;return L.createElement(L.Fragment,null,n,r)};exports.AllShopsCont=({category:e,title:t})=>L.createElement(L.Fragment,null,L.createElement("h1",null,t),Object.keys(e).length?L.createElement(G,e):null),exports.CurShopCont=({shopListParams:e,title:t})=>L.createElement(L.Fragment,null,L.createElement("h1",null,t),L.createElement(Y,e)),exports.MainCont=({mainLinks:e,title:t,catalogs:n})=>L.createElement(L.Fragment,null,L.createElement(K,{title:t,links:e}),L.createElement(J,{catalogs:n})),exports.PageNotFound=()=>L.createElement("div",{className:"pageNotFound"},L.createElement("h1",null,"Страница не найдера!!!"),L.createElement("p",null,"Страница не найдена, попробуйте перейти по ссылкам выше.")),exports.Wrapper=({topNav:e,navParams:t,children:n,isLoad:r=!0})=>L.createElement(L.Fragment,null,L.createElement(V,{link:e}),L.createElement(U,t),L.createElement("main",null,L.createElement(q,{load:r}),n));