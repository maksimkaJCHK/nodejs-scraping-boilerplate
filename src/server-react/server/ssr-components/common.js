"use strict";function e(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var t={exports:{}},n={},r=Symbol.for("react.element"),l=Symbol.for("react.portal"),a=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),c=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),u=Symbol.for("react.context"),s=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),d=Symbol.iterator;var y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E=Object.assign,h={};function g(e,t,n){this.props=e,this.context=t,this.refs=h,this.updater=n||y}function v(){}function b(e,t,n){this.props=e,this.context=t,this.refs=h,this.updater=n||y}g.prototype.isReactComponent={},g.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},g.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},v.prototype=g.prototype;var k=b.prototype=new v;k.constructor=b,E(k,g.prototype),k.isPureReactComponent=!0;var _=Array.isArray,x=Object.prototype.hasOwnProperty,S={current:null},w={key:!0,ref:!0,__self:!0,__source:!0};function C(e,t,n){var l,a={},o=null,c=null;if(null!=t)for(l in void 0!==t.ref&&(c=t.ref),void 0!==t.key&&(o=""+t.key),t)x.call(t,l)&&!w.hasOwnProperty(l)&&(a[l]=t[l]);var i=arguments.length-2;if(1===i)a.children=n;else if(1<i){for(var u=Array(i),s=0;s<i;s++)u[s]=arguments[s+2];a.children=u}if(e&&e.defaultProps)for(l in i=e.defaultProps)void 0===a[l]&&(a[l]=i[l]);return{$$typeof:r,type:e,key:o,ref:c,props:a,_owner:S.current}}function N(e){return"object"==typeof e&&null!==e&&e.$$typeof===r}var j=/\/+/g;function $(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function R(e,t,n,a,o){var c=typeof e;"undefined"!==c&&"boolean"!==c||(e=null);var i=!1;if(null===e)i=!0;else switch(c){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case r:case l:i=!0}}if(i)return o=o(i=e),e=""===a?"."+$(i,0):a,_(o)?(n="",null!=e&&(n=e.replace(j,"$&/")+"/"),R(o,t,n,"",(function(e){return e}))):null!=o&&(N(o)&&(o=function(e,t){return{$$typeof:r,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(o,n+(!o.key||i&&i.key===o.key?"":(""+o.key).replace(j,"$&/")+"/")+e)),t.push(o)),1;if(i=0,a=""===a?".":a+":",_(e))for(var u=0;u<e.length;u++){var s=a+$(c=e[u],u);i+=R(c,t,n,s,o)}else if(s=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=d&&e[d]||e["@@iterator"])?e:null}(e),"function"==typeof s)for(e=s.call(e),u=0;!(c=e.next()).done;)i+=R(c=c.value,t,n,s=a+$(c,u++),o);else if("object"===c)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function O(e,t,n){if(null==e)return e;var r=[],l=0;return R(e,r,"","",(function(e){return t.call(n,e,l++)})),r}function P(e){if(-1===e._status){var t=e._result;(t=t()).then((function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)}),(function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)})),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var L={current:null},F={transition:null},I={ReactCurrentDispatcher:L,ReactCurrentBatchConfig:F,ReactCurrentOwner:S};n.Children={map:O,forEach:function(e,t,n){O(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return O(e,(function(){t++})),t},toArray:function(e){return O(e,(function(e){return e}))||[]},only:function(e){if(!N(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},n.Component=g,n.Fragment=a,n.Profiler=c,n.PureComponent=b,n.StrictMode=o,n.Suspense=m,n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=I,n.cloneElement=function(e,t,n){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var l=E({},e.props),a=e.key,o=e.ref,c=e._owner;if(null!=t){if(void 0!==t.ref&&(o=t.ref,c=S.current),void 0!==t.key&&(a=""+t.key),e.type&&e.type.defaultProps)var i=e.type.defaultProps;for(u in t)x.call(t,u)&&!w.hasOwnProperty(u)&&(l[u]=void 0===t[u]&&void 0!==i?i[u]:t[u])}var u=arguments.length-2;if(1===u)l.children=n;else if(1<u){i=Array(u);for(var s=0;s<u;s++)i[s]=arguments[s+2];l.children=i}return{$$typeof:r,type:e.type,key:a,ref:o,props:l,_owner:c}},n.createContext=function(e){return(e={$$typeof:u,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:i,_context:e},e.Consumer=e},n.createElement=C,n.createFactory=function(e){var t=C.bind(null,e);return t.type=e,t},n.createRef=function(){return{current:null}},n.forwardRef=function(e){return{$$typeof:s,render:e}},n.isValidElement=N,n.lazy=function(e){return{$$typeof:f,_payload:{_status:-1,_result:e},_init:P}},n.memo=function(e,t){return{$$typeof:p,type:e,compare:void 0===t?null:t}},n.startTransition=function(e){var t=F.transition;F.transition={};try{e()}finally{F.transition=t}},n.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")},n.useCallback=function(e,t){return L.current.useCallback(e,t)},n.useContext=function(e){return L.current.useContext(e)},n.useDebugValue=function(){},n.useDeferredValue=function(e){return L.current.useDeferredValue(e)},n.useEffect=function(e,t){return L.current.useEffect(e,t)},n.useId=function(){return L.current.useId()},n.useImperativeHandle=function(e,t,n){return L.current.useImperativeHandle(e,t,n)},n.useInsertionEffect=function(e,t){return L.current.useInsertionEffect(e,t)},n.useLayoutEffect=function(e,t){return L.current.useLayoutEffect(e,t)},n.useMemo=function(e,t){return L.current.useMemo(e,t)},n.useReducer=function(e,t,n){return L.current.useReducer(e,t,n)},n.useRef=function(e){return L.current.useRef(e)},n.useState=function(e){return L.current.useState(e)},n.useSyncExternalStore=function(e,t,n){return L.current.useSyncExternalStore(e,t,n)},n.useTransition=function(){return L.current.useTransition()},n.version="18.2.0",t.exports=n;var T=e(t.exports);function A(){return A=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},A.apply(this,arguments)}const z=({url:e,title:t,...n})=>T.createElement("a",A({href:e},n),t);function M(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],l=document.createElement("style");l.type="text/css","top"===n&&r.firstChild?r.insertBefore(l,r.firstChild):r.appendChild(l),l.styleSheet?l.styleSheet.cssText=e:l.appendChild(document.createTextNode(e))}}M("nav {\n  padding: 10px 0;\n  font-size: 20px;\n  line-height: 120%;\n  border-bottom: 1px solid #202083; }\n  nav a {\n    color: var(--type-color);\n    text-decoration: none;\n    display: inline-block;\n    margin-left: 20px; }\n    nav a:first-of-type {\n      margin-left: 0; }\n    nav a:hover, nav a.active {\n      color: var(--link-color); }\n");const V=({link:e})=>T.createElement("nav",null,e.map(((e,t)=>T.createElement(z,A({},e,{key:t})))));M(".params {\n  font-size: 16px;\n  line-height: 120%; }\n  .params-nav {\n    margin: 10px 0; }\n    .params-nav a {\n      color: var(--link-color);\n      margin-left: 10px;\n      text-decoration: none; }\n      .params-nav a:hover {\n        text-decoration: none; }\n    .params-nav b a {\n      margin-left: 0; }\n    .params-nav .active {\n      color: var(--type-color); }\n");const D=({cg:e,lb:t,newItem:n})=>T.createElement("section",{className:"params"},T.createElement("div",{className:"h2"},"Запросы по конкретным магазинам:"),T.createElement("div",{className:"params-nav"},T.createElement("b",null,"Запрос для читай-города: "),e.map(((e,t)=>T.createElement(z,A({},e,{key:t}))))),T.createElement("div",{className:"params-nav"},T.createElement("b",null,"Запрос для лабирита: "),t.map(((e,t)=>T.createElement(z,A({},e,{key:t}))))),T.createElement("div",{className:"params-nav"},T.createElement("h2",null,"Новые товары:"),T.createElement("b",null,T.createElement(z,{url:"/new",title:"Новые товары по всем запросам"})),n.map(((e,t)=>T.createElement(z,A({},e,{key:t}))))),T.createElement("button",{onClick:()=>{const e=new WebSocket("ws://localhost:3000/analitics");e.addEventListener("open",(t=>{e.send("Соединение с сервером установлено!")})),e.addEventListener("message",(t=>{"end"===JSON.parse(t.data).type&&e.close()})),e.addEventListener("close",(e=>{}))}},"Анализировать"));M("@keyframes ldio-gggn3pkm2yo {\n  0% {\n    transform: translate(-50%, -50%) rotate(0deg); }\n  100% {\n    transform: translate(-50%, -50%) rotate(360deg); } }\n\n.preload {\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: absolute;\n  background: rgba(255, 255, 255, 0.7); }\n\n.ldio-gggn3pkm2yo {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  transform: translateZ(0) scale(0.48);\n  backface-visibility: hidden;\n  transform-origin: 0 0; }\n  .ldio-gggn3pkm2yo div {\n    position: absolute;\n    width: 58px;\n    height: 58px;\n    border: 10px solid #101be9;\n    border-top-color: transparent;\n    border-radius: 50%;\n    box-sizing: content-box;\n    animation: ldio-gggn3pkm2yo 1s linear infinite;\n    top: 50px;\n    left: 50px; }\n\n.loadingio-spinner-rolling-8n6pm9bs3j5 {\n  width: 48px;\n  height: 48px;\n  display: inline-block;\n  overflow: hidden;\n  background: none; }\n");const U=({load:e})=>e?T.createElement("div",{className:"preload"},T.createElement("div",{className:"loadingio-spinner-rolling-8n6pm9bs3j5"},T.createElement("div",{className:"ldio-gggn3pkm2yo"},T.createElement("div",null)))):null,q=({url:e,picture:t,title:n,bookAuthors:r,description:l,price:a,publisher:o,yearPublishing:c,pages:i})=>{const u={__html:l};return T.createElement("div",{className:"item"},T.createElement("a",{href:e,className:"item-img",target:"_blank"},t?T.createElement("img",{src:t}):"У товара нет картинки"),T.createElement("div",{className:"item-description"},T.createElement("h3",null,T.createElement("a",{href:e,target:"_blank"},n)),T.createElement("p",null,T.createElement("b",null,"Автор:")," ",r.map(((e,t)=>T.createElement("span",{key:t},e)))),T.createElement("p",{dangerouslySetInnerHTML:u}),T.createElement("p",null,T.createElement("b",null,"Страниц:")," ",i),T.createElement("p",null,T.createElement("b",null,"Опубликовано:")," ",c||"-"),T.createElement("p",null,T.createElement("b",null,"Издательство:")," ",o),T.createElement("p",null,T.createElement("b",null,"Цена:")," ",a," руб"),T.createElement("div",{className:"item-link"},T.createElement("a",{href:e,target:"_blank"},"Посмотреть товар"))))},B=({url:e,picture:t,title:n,description:r,publisher:l,price:a})=>T.createElement("div",{className:"item"},T.createElement("a",{href:e,className:"item-img",target:"_blank"},t?T.createElement("img",{src:t}):"У товара нет картинки"),T.createElement("div",{className:"item-description"},T.createElement("h3",null,T.createElement("a",{href:e,target:"_blank"},n)),T.createElement("p",null,T.createElement("b",null,"Издательство:")," ",l),T.createElement("p",null,T.createElement("b",null,"Цена:")," ",a),T.createElement("div",{className:"item-link"},T.createElement("a",{href:e,target:"_blank"},"Посмотреть товар"))));M(".fraze-null {\n  margin: 20px 0;\n  font-size: 13px; }\n");const H=({text:e="Нет товаров для отображения"})=>T.createElement("p",{className:"fraze-null"},T.createElement("b",null,e)),W=({shop:e,title:t,id:n,type:r="cg"})=>{const l=t?T.createElement("h3",null,t):null;return T.createElement("div",{id:n},l,T.createElement("div",null,"Всего ",e&&e.length," товаров"),T.createElement("div",{className:"item-wrap"},e&&e.length?"cg"===r?e.map(((e,t)=>T.createElement(q,A({},e,{key:t})))):e.map(((e,t)=>T.createElement(B,A({},e,{key:t})))):T.createElement(H,null)))},J=({title:e,idCg:t,idLb:n})=>{const r=e?T.createElement("h2",null,e):null,l=t||n?T.createElement("ul",null,t&&T.createElement("li",null,T.createElement(z,{url:"#"+t,title:"Товары на читай-городе"})),n&&T.createElement("li",null,T.createElement(z,{url:"#"+n,title:"Товары на лабиринте"}))):null;return T.createElement(T.Fragment,null,r,l)},Y=({id:e,shops:t,title:n,idCg:r,idLb:l})=>T.createElement("div",{id:e},T.createElement(J,{title:n,idCg:r,idLb:l}),T.createElement(W,{shop:t.cg,id:r,type:"cg",title:"Товары для читай-города"}),T.createElement(W,{shop:t.lb,id:l,type:"lb",title:"Товары для лабиринта"})),Z=({catalogs:e})=>T.createElement(T.Fragment,null,e.map(((e,t)=>T.createElement(Y,A({},e,{key:t}))))),G=({title:e,links:t})=>{const n=e?T.createElement("h1",null,e):null,r=t&&t.length?T.createElement("ul",null,t.map((({title:e,url:t},n)=>t&&t.length?T.createElement("li",{key:n},T.createElement(z,{url:"#"+t,title:e||"Заголовок не определен"})):null))):null;return T.createElement(T.Fragment,null,n,r)};exports.AllShopsCont=({category:e,title:t})=>T.createElement(T.Fragment,null,T.createElement("h1",null,t),Object.keys(e).length?T.createElement(Y,e):null),exports.CurShopCont=({shopListParams:e,title:t})=>T.createElement(T.Fragment,null,T.createElement("h1",null,t),T.createElement(W,e)),exports.MainCont=({mainLinks:e,title:t,catalogs:n})=>T.createElement(T.Fragment,null,T.createElement(G,{title:t,links:e}),T.createElement(Z,{catalogs:n})),exports.PageNotFound=()=>T.createElement("div",{className:"pageNotFound"},T.createElement("h1",null,"Страница не найдера!!!"),T.createElement("p",null,"Страница не найдена, попробуйте перейти по ссылкам выше.")),exports.Wrapper=({topNav:e,navParams:t,children:n,isLoad:r=!0})=>T.createElement(T.Fragment,null,T.createElement(V,{link:e}),T.createElement(D,t),T.createElement("main",null,T.createElement(U,{load:r}),n));
