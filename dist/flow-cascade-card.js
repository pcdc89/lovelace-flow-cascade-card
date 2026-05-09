/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=globalThis,e$3=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$5=new WeakMap;let n$4 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$3&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$5.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$5.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$4("string"==typeof t?t:t+"",void 0,s$2),i$5=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$4(o,t,s$2)},S$1=(s,o)=>{if(e$3)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$3.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$3?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$4,defineProperty:e$2,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$4,getPrototypeOf:n$3}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$4(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$2(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$3(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$4(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,i$3=t=>t,s$1=t$2.trustedTypes,e$1=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$3=`lit$${Math.random().toFixed(9).slice(2)}$`,n$2="?"+o$3,r$2=`<${n$2}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$1?e$1.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$3+x):s+o$3+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$3),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$3)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$3),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$2)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$3,t+1));)d.push({type:7,index:l}),t+=o$3.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$3(t).nextSibling;i$3(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$2.litHtmlPolyfillSupport;B?.(S,k),(t$2.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;let i$2 = class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}};i$2._$litElement$=true,i$2["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i$2});const o$2=s.litElementPolyfillSupport;o$2?.({LitElement:i$2});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$1={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o$1,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n$1(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n$1({...r,state:true,attribute:false})}

let FlowCascadeCardEditor = class FlowCascadeCardEditor extends i$2 {
    constructor() {
        super(...arguments);
        this._yamlError = "";
    }
    setConfig(config) {
        this._config = config;
    }
    _configToYaml(config) {
        const { type: _type, ...rest } = config;
        return this._objToYaml(rest, 0);
    }
    _objToYaml(obj, indent) {
        const pad = "  ".repeat(indent);
        if (obj === null || obj === undefined)
            return "null";
        if (typeof obj === "boolean")
            return obj ? "true" : "false";
        if (typeof obj === "number")
            return String(obj);
        if (typeof obj === "string") {
            return obj.includes(":") || obj.includes("#") || obj.includes("\n")
                ? `"${obj.replace(/"/g, '\\"')}"`
                : obj;
        }
        if (Array.isArray(obj)) {
            if (obj.length === 0)
                return "[]";
            return obj
                .map((item) => {
                if (typeof item === "object" && item !== null) {
                    const entries = Object.entries(item);
                    const first = entries[0];
                    const rest = entries.slice(1);
                    const firstLine = `${pad}- ${first[0]}: ${this._objToYaml(first[1], indent + 1)}`;
                    const restLines = rest
                        .map(([k, v]) => `${pad}  ${k}: ${this._objToYaml(v, indent + 1)}`)
                        .join("\n");
                    return restLines ? `${firstLine}\n${restLines}` : firstLine;
                }
                return `${pad}- ${this._objToYaml(item, indent)}`;
            })
                .join("\n");
        }
        if (typeof obj === "object") {
            const entries = Object.entries(obj);
            if (entries.length === 0)
                return "{}";
            return entries
                .map(([k, v]) => {
                if (Array.isArray(v)) {
                    return `${pad}${k}:\n${this._objToYaml(v, indent + 1)}`;
                }
                if (typeof v === "object" && v !== null) {
                    return `${pad}${k}:\n${this._objToYaml(v, indent + 1)}`;
                }
                return `${pad}${k}: ${this._objToYaml(v, indent + 1)}`;
            })
                .join("\n");
        }
        return String(obj);
    }
    _onInput(e) {
        const textarea = e.target;
        const raw = textarea.value;
        try {
            const parsed = this._parseSimpleYaml(raw);
            this._yamlError = "";
            const newConfig = {
                type: "custom:flow-cascade-card",
                ...parsed,
            };
            this.dispatchEvent(new CustomEvent("config-changed", {
                detail: { config: newConfig },
                bubbles: true,
                composed: true,
            }));
        }
        catch (err) {
            this._yamlError = err instanceof Error ? err.message : "YAML-Fehler";
        }
    }
    /** Minimal YAML parser for flat HA card configs — delegates to JSON via js-yaml shim if available */
    _parseSimpleYaml(yaml) {
        // Try HA's built-in js-yaml if available
        const win = window;
        if (typeof win["jsyaml"] === "object" && win["jsyaml"] !== null) {
            const jsyaml = win["jsyaml"];
            return jsyaml.load(yaml);
        }
        // Fallback: try JSON5-style (just JSON with trailing commas stripped)
        try {
            return JSON.parse(yaml);
        }
        catch {
            throw new Error("Kein YAML-Parser verfügbar — bitte als JSON eingeben");
        }
    }
    render() {
        if (!this._config)
            return b ``;
        const yaml = this._configToYaml(this._config);
        return b `
      <div class="editor-wrap">
        <label>Konfiguration (YAML)</label>
        <textarea
          class="${this._yamlError ? "error" : ""}"
          .value=${yaml}
          @change=${this._onInput}
          spellcheck="false"
          autocomplete="off"
        ></textarea>
        ${this._yamlError
            ? b `<div class="error-msg">⚠ ${this._yamlError}</div>`
            : ""}
        <div class="hint">
          Änderungen werden beim Verlassen des Feldes übernommen.
          Dokumentation: github.com/pcdc89/lovelace-flow-cascade-card
        </div>
      </div>
    `;
    }
};
FlowCascadeCardEditor.styles = i$5 `
    .editor-wrap {
      padding: 4px 0;
    }
    label {
      display: block;
      font-size: 0.85em;
      font-weight: 500;
      margin-bottom: 6px;
      opacity: 0.75;
    }
    textarea {
      width: 100%;
      min-height: 320px;
      font-family: monospace;
      font-size: 0.82em;
      padding: 8px;
      box-sizing: border-box;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      background: var(--code-editor-background-color, #f5f5f5);
      color: var(--primary-text-color, #212121);
      resize: vertical;
    }
    textarea.error {
      border-color: var(--error-color, #f44336);
    }
    .error-msg {
      color: var(--error-color, #f44336);
      font-size: 0.8em;
      margin-top: 4px;
    }
    .hint {
      font-size: 0.78em;
      opacity: 0.6;
      margin-top: 6px;
    }
  `;
__decorate([
    n$1({ attribute: false })
], FlowCascadeCardEditor.prototype, "hass", void 0);
__decorate([
    r()
], FlowCascadeCardEditor.prototype, "_config", void 0);
__decorate([
    r()
], FlowCascadeCardEditor.prototype, "_yamlError", void 0);
FlowCascadeCardEditor = __decorate([
    t$1("flow-cascade-card-editor")
], FlowCascadeCardEditor);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1},e=t=>(...e)=>({_$litDirective$:t,values:e});let i$1 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const n="important",i=" !"+n,o=e(class extends i$1{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||t$1.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(r)),this.render(r);for(const t of this.ft)null==r[t]&&(this.ft.delete(t),t.includes("-")?s.removeProperty(t):s[t]=null);for(const t in r){const e=r[t];if(null!=e){this.ft.add(t);const r="string"==typeof e&&e.endsWith(i);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?n:""):s[t]=e;}}return E}});

const cardStyles = i$5 `
  :host {
    --fcc-positive: var(--success-color, #4caf50);
    --fcc-negative: var(--error-color, #f44336);
    --fcc-idle: var(--disabled-color, #9e9e9e);
    --fcc-bg: var(--card-background-color, #fff);
    --fcc-text: var(--primary-text-color, #212121);
    --fcc-arrow-gap: 40px;
    --fcc-side-connector-w: 36px;
    --fcc-side-col-w: 82px;
    display: block;
  }

  ha-card {
    padding: 16px;
    background: var(--fcc-bg);
    color: var(--fcc-text);
    font-family: var(--paper-font-body1_-_font-family, sans-serif);
  }

  .card-header {
    font-size: 1.1em;
    font-weight: 500;
    margin-bottom: 12px;
    color: var(--fcc-text);
  }

  .cascade {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  /* ── NODE ── */
  .node {
    width: 100%;
    max-width: 320px;
  }

  .node-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0;
    padding: 12px 18px 10px;
    border-radius: 12px;
    border: 2px solid var(--divider-color, #e0e0e0);
    background: var(--fcc-bg);
    width: 100%;
    box-sizing: border-box;
    min-height: 56px;
    transition: border-color 0.4s, box-shadow 0.4s;
  }

  .node-box.active {
    border-color: var(--node-color, var(--fcc-positive));
    box-shadow: 0 0 8px 0 color-mix(in srgb, var(--node-color, var(--fcc-positive)) 30%, transparent);
  }

  .node-icon {
    font-size: 1.8em;
    line-height: 1.2;
    margin-bottom: 4px;
  }

  .node-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    width: 100%;
  }

  .node-label {
    font-size: 0.78em;
    opacity: 0.6;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .node-power {
    font-size: 1.2em;
    font-weight: 700;
    color: var(--node-color, var(--fcc-positive));
    white-space: nowrap;
  }

  .node-power.unavailable {
    color: var(--fcc-idle);
    font-size: 0.9em;
    font-weight: 400;
  }

  /* SOC bar */
  .soc-bar-wrap {
    margin-top: 8px;
    height: 10px;
    border-radius: 5px;
    background: color-mix(in srgb, var(--node-color, var(--fcc-idle)) 18%, var(--fcc-bg) 82%);
    overflow: hidden;
    width: 100%;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.12);
  }

  .soc-bar {
    height: 100%;
    border-radius: 5px;
    background: var(--node-color, var(--fcc-positive));
    transition: width 0.6s ease;
  }

  .soc-label {
    font-size: 0.85em;
    font-weight: 600;
    color: var(--node-color, var(--fcc-positive));
    margin-top: 4px;
  }

  .soc-min-label {
    font-size: 0.75em;
    font-weight: 700;
    color: #ff9800;
    margin-top: 2px;
    letter-spacing: 0.03em;
  }

  /* ── SINGLE LINK ── */
  .link {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 320px;
    position: relative;
    height: var(--fcc-arrow-gap);
    margin: 2px 0;
  }

  .link-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 3px;
    transform: translateX(-50%);
    background: var(--link-color, var(--fcc-idle));
    border-radius: 2px;
    overflow: hidden;
  }

  .link-line::after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 14px;
    background: linear-gradient(
      to var(--flow-dir, bottom),
      transparent,
      rgba(255, 255, 255, 0.85) 50%,
      transparent
    );
    animation: flow-pulse var(--anim-speed, 1.2s) linear infinite;
    opacity: 0;
    transition: opacity 0.4s;
  }

  .link-line.flowing::after {
    opacity: 1;
  }

  @keyframes flow-pulse {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(700%); }
  }

  .link-label {
    position: absolute;
    right: calc(50% + 10px);
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.78em;
    font-weight: 600;
    color: var(--link-color, var(--fcc-idle));
    white-space: nowrap;
    background: var(--fcc-bg);
    padding: 1px 4px;
    border-radius: 4px;
  }

  .link-arrow {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1em;
    color: var(--link-color, var(--fcc-idle));
    line-height: 1;
    transition: color 0.4s;
  }

  .link-arrow.tip-bottom { bottom: 0; }
  .link-arrow.tip-top    { top: 0; }

  /* ── NODE WITH SIDE BRANCH ── */
  .node-with-side {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    max-width: 320px;
    gap: 0;
  }

  .main-col {
    flex: 1;
    min-width: 0;
  }

  .side-connector {
    flex: 0 0 var(--fcc-side-connector-w);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 2px 0;
  }

  .side-conn-line {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 3px;
    transform: translateY(-50%);
    background: var(--link-color, var(--fcc-idle));
    border-radius: 2px;
    overflow: hidden;
  }

  .side-conn-line::after {
    content: "";
    position: absolute;
    left: -14px;
    top: 0;
    width: 14px;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.85) 50%, transparent);
    animation: flow-horiz var(--anim-speed, 1.2s) linear infinite;
    opacity: 0;
    transition: opacity 0.4s;
  }

  .side-conn-line.flowing::after { opacity: 1; }

  .side-conn-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--fcc-bg);
    padding: 0 2px;
    gap: 1px;
  }

  .side-conn-arrow {
    font-size: 0.8em;
    color: var(--link-color, var(--fcc-idle));
    line-height: 1;
  }

  .side-conn-label {
    font-size: 0.62em;
    font-weight: 600;
    color: var(--link-color, var(--fcc-idle));
    white-space: nowrap;
    min-height: 0.8em;
  }

  .side-col {
    flex: 0 0 var(--fcc-side-col-w);
  }

  /* ── INTER-ROW SIDE SPACER (aligns arrows with main-col when next row has a side node) ── */
  .inter-row-side-spacer {
    flex: 0 0 calc(var(--fcc-side-connector-w) + var(--fcc-side-col-w));
  }

  /* ── BYPASS ZONE (compact node in vertical link zone) ── */
  .bypass-zone {
    width: 100%;
    max-width: 320px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    margin: 2px 0;
  }

  .bypass-main {
    flex: 1;
    min-width: 0;
    position: relative;
  }

  .bypass-main-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 3px;
    transform: translateX(-50%);
    background: var(--link-color, var(--fcc-idle));
    border-radius: 2px;
    overflow: hidden;
  }

  .bypass-main-line::after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 14px;
    background: linear-gradient(
      to var(--flow-dir, bottom),
      transparent,
      rgba(255, 255, 255, 0.85) 50%,
      transparent
    );
    animation: flow-pulse var(--anim-speed, 1.2s) linear infinite;
    opacity: 0;
    transition: opacity 0.4s;
  }

  .bypass-main-line.flowing::after { opacity: 1; }

  .bypass-main-label {
    position: absolute;
    right: calc(50% + 6px);
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.72em;
    font-weight: 600;
    color: var(--link-color, var(--fcc-idle));
    white-space: nowrap;
    background: var(--fcc-bg);
    padding: 1px 3px;
    border-radius: 3px;
  }

  .bypass-main-arrow {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    font-size: 1em;
    color: var(--link-color, var(--fcc-idle));
    line-height: 1;
  }

  .bypass-connector {
    flex: 0 0 72px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 2px 0;
  }

  .bypass-conn-line {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 3px;
    transform: translateY(-50%);
    background: var(--bypass-link-color, var(--fcc-idle));
    border-radius: 2px;
    overflow: hidden;
  }

  .bypass-conn-line::after {
    content: "";
    position: absolute;
    left: -14px;
    top: 0;
    width: 14px;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.85) 50%, transparent);
    animation: flow-horiz var(--anim-speed, 1.2s) linear infinite;
    opacity: 0;
    transition: opacity 0.4s;
  }

  .bypass-conn-line.flowing::after { opacity: 1; }

  .bypass-conn-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--fcc-bg);
    padding: 0 2px;
    gap: 1px;
  }

  .bypass-conn-arrow {
    font-size: 1.1em;
    color: var(--bypass-link-color, var(--fcc-idle));
    line-height: 1;
  }

  .bypass-conn-label {
    font-size: 0.80em;
    font-weight: 700;
    color: var(--bypass-link-color, var(--fcc-idle));
    white-space: nowrap;
    min-height: 0.9em;
  }

  .bypass-side {
    flex: 0 0 96px;
  }

  /* ── INTERSTITIAL ZONE (half-width node between two vertical links) ── */
  .interstitial-zone {
    width: 100%;
    max-width: 320px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    margin: 2px 0;
  }

  .interstitial-main {
    flex: 1;
    min-width: 0;
    position: relative;
  }

  .interstitial-main-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 3px;
    transform: translateX(-50%);
    background: var(--link-color, var(--fcc-idle));
    border-radius: 2px;
    overflow: hidden;
  }

  .interstitial-main-line::after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 14px;
    background: linear-gradient(
      to var(--flow-dir, bottom),
      transparent,
      rgba(255, 255, 255, 0.85) 50%,
      transparent
    );
    animation: flow-pulse var(--anim-speed, 1.2s) linear infinite;
    opacity: 0;
    transition: opacity 0.4s;
  }

  .interstitial-main-line.flowing::after { opacity: 1; }

  .interstitial-main-label {
    position: absolute;
    right: calc(50% + 6px);
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.78em;
    font-weight: 600;
    color: var(--link-color, var(--fcc-idle));
    white-space: nowrap;
    background: var(--fcc-bg);
    padding: 1px 4px;
    border-radius: 4px;
  }

  .interstitial-main-arrow {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1em;
    color: var(--link-color, var(--fcc-idle));
    line-height: 1;
  }

  .interstitial-main-arrow.tip-bottom { bottom: 0; }
  .interstitial-main-arrow.tip-top    { top: 0; }

  .interstitial-branch {
    flex: 0 0 50%;
    display: flex;
    flex-direction: column;
  }

  .interstitial-branch-arrow {
    height: var(--fcc-arrow-gap);
    flex-shrink: 0;
    position: relative;
  }

  .interstitial-branch-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 3px;
    transform: translateX(-50%);
    background: var(--link-color, var(--fcc-idle));
    border-radius: 2px;
    overflow: hidden;
  }

  .interstitial-branch-line::after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 14px;
    background: linear-gradient(
      to var(--flow-dir, bottom),
      transparent,
      rgba(255, 255, 255, 0.85) 50%,
      transparent
    );
    animation: flow-pulse var(--anim-speed, 1.2s) linear infinite;
    opacity: 0;
    transition: opacity 0.4s;
  }

  .interstitial-branch-line.flowing::after { opacity: 1; }

  .interstitial-branch-label {
    position: absolute;
    left: calc(50% + 6px);
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.78em;
    font-weight: 600;
    color: var(--link-color, var(--fcc-idle));
    white-space: nowrap;
    background: var(--fcc-bg);
    padding: 1px 4px;
    border-radius: 4px;
  }

  .interstitial-branch-arrowhead {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    font-size: 1em;
    color: var(--link-color, var(--fcc-idle));
    line-height: 1;
  }

  .interstitial-branch-arrowhead.bottom {
    bottom: auto;
    top: 0;
  }

  .interstitial-branch-node {
    flex: 1;
    min-height: 0;
  }

  /* Compact node box for side nodes */
  .node-box--compact {
    padding: 8px 10px 6px;
  }

  .node-box--compact .node-icon { font-size: 1.4em; }
  .node-box--compact .node-label { font-size: 0.72em; }
  .node-box--compact .node-power { font-size: 1.0em; }

  /* ── NODE ROW (side-by-side nodes) ── */
  .node-row {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    width: 100%;
    max-width: 320px;
    gap: 0;
  }

  .node-col {
    flex: 1;
    min-width: 0;
  }

  .node-col .node-box {
    height: 100%;
  }

  /* ── HORIZONTAL LINK (within row) ── */
  .horiz-link {
    flex: 0 0 44px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 4px 0;
  }

  .horiz-link-line {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 3px;
    transform: translateY(-50%);
    background: var(--link-color, var(--fcc-idle));
    border-radius: 2px;
    overflow: hidden;
  }

  .horiz-link-line::after {
    content: "";
    position: absolute;
    left: -14px;
    top: 0;
    width: 14px;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.85) 50%, transparent);
    animation: flow-horiz var(--anim-speed, 1.2s) linear infinite;
    opacity: 0;
    transition: opacity 0.4s;
  }

  .horiz-link-line.flowing::after { opacity: 1; }

  @keyframes flow-horiz {
    0%   { left: -14px; }
    100% { left: calc(100% + 14px); }
  }

  .horiz-link-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--fcc-bg);
    padding: 0 2px;
    gap: 1px;
  }

  .horiz-link-arrow {
    font-size: 0.85em;
    color: var(--link-color, var(--fcc-idle));
    line-height: 1;
  }

  .horiz-link-label {
    font-size: 0.68em;
    font-weight: 600;
    color: var(--link-color, var(--fcc-idle));
    white-space: nowrap;
    min-height: 0.9em;
  }

  /* ── INTER-ROW ZONE (parallel descent from multi-node row) ── */
  .inter-row-zone {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 320px;
    height: var(--fcc-arrow-gap);
    margin: 2px 0;
  }

  .inter-row-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .inter-row-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 3px;
    transform: translateX(-50%);
    background: var(--link-color, var(--fcc-idle));
    border-radius: 2px;
    overflow: hidden;
  }

  .inter-row-line::after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 14px;
    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.85) 50%, transparent);
    animation: flow-pulse var(--anim-speed, 1.2s) linear infinite;
    opacity: 0;
    transition: opacity 0.4s;
  }

  .inter-row-line.flowing::after { opacity: 1; }

  .inter-row-label {
    position: absolute;
    right: calc(50% + 6px);
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.72em;
    font-weight: 600;
    color: var(--link-color, var(--fcc-idle));
    white-space: nowrap;
    background: var(--fcc-bg);
    padding: 1px 3px;
    border-radius: 3px;
    min-width: 0;
  }

  .inter-row-arrow {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    font-size: 1em;
    color: var(--link-color, var(--fcc-idle));
    line-height: 1;
  }

  /* ── SPLIT ROW (2+ outgoing links) ── */
  .split-row {
    width: 100%;
    max-width: 320px;
    display: flex;
    align-items: stretch;
    position: relative;
    margin: 2px 0;
    min-height: var(--fcc-arrow-gap);
  }

  /* horizontal top bar connecting branches */
  .split-row::before {
    content: "";
    position: absolute;
    top: 0;
    left: calc(100% / var(--branch-count, 2) / 2);
    right: calc(100% / var(--branch-count, 2) / 2);
    height: 2px;
    background: var(--fcc-idle);
  }

  .split-branch {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding-top: 2px;
  }

  .split-branch-line {
    width: 3px;
    flex: 1;
    background: var(--link-color, var(--fcc-idle));
    border-radius: 2px;
    overflow: hidden;
    position: relative;
    min-height: 18px;
  }

  .split-branch-line::after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 14px;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(255, 255, 255, 0.85) 50%,
      transparent
    );
    animation: flow-pulse var(--anim-speed, 1.2s) linear infinite;
    opacity: 0;
    transition: opacity 0.4s;
  }

  .split-branch-line.flowing::after {
    opacity: 1;
  }

  .link-line.flow-up::after,
  .bypass-main-line.flow-up::after,
  .interstitial-main-line.flow-up::after,
  .interstitial-branch-line.flow-up::after,
  .inter-row-line.flow-up::after,
  .split-branch-line.flow-up::after {
    animation-direction: reverse;
  }

  .split-branch-arrow {
    font-size: 0.85em;
    color: var(--link-color, var(--fcc-idle));
    line-height: 1;
    margin-bottom: 1px;
  }

  .split-branch-label {
    font-size: 0.72em;
    font-weight: 600;
    color: var(--link-color, var(--fcc-idle));
    text-align: center;
    white-space: nowrap;
    background: var(--fcc-bg);
    padding: 0 3px;
    border-radius: 3px;
  }
`;

const DEFAULT_ICONS = {
    pv: "☀️",
    solar: "☀️",
    battery: "🔋",
    batterie: "🔋",
    haus: "🏠",
    house: "🏠",
    home: "🏠",
    car: "🚗",
    ev: "🚗",
    auto: "🚗",
    wallbox: "🔌",
    wp: "♨️",
    waermepumpe: "♨️",
    heatpump: "♨️",
    netz: "⚡",
    grid: "⚡",
};
function guessIcon(id) {
    const key = id.toLowerCase();
    for (const [k, v] of Object.entries(DEFAULT_ICONS)) {
        if (key.includes(k))
            return v;
    }
    return "🔷";
}
function formatWatts(w, decimals, unit) {
    const abs = Math.abs(w);
    if (unit === "kW" || (unit === "auto" && abs >= 1000)) {
        return `${(w / 1000).toFixed(decimals)} kW`;
    }
    return `${w.toFixed(0)} W`;
}
function nodeColor(node, watts) {
    if (node.color)
        return node.color;
    const type = node.type ?? "bidirectional";
    if (type === "source")
        return "var(--fcc-positive)";
    if (type === "sink")
        return "#03a9f4";
    const isPositive = node.invert_color ? watts <= 0 : watts >= 0;
    return isPositive ? "var(--fcc-positive)" : "var(--fcc-negative)";
}
function linkColor(direction) {
    if (direction === "forward")
        return "var(--fcc-positive)";
    if (direction === "reverse")
        return "var(--fcc-negative)";
    return "var(--fcc-idle)";
}
let FlowCascadeCard = class FlowCascadeCard extends i$2 {
    setConfig(config) {
        if (!config.nodes?.length)
            throw new Error("flow-cascade-card: 'nodes' required");
        if (!config.links?.length)
            throw new Error("flow-cascade-card: 'links' required");
        this._config = {
            animation_speed: 1200,
            idle_threshold: 5,
            decimals: 1,
            unit: "auto",
            ...config,
        };
    }
    getCardSize() {
        const n = this._config?.nodes.length ?? 3;
        return Math.ceil(n * 1.5);
    }
    static getConfigElement() {
        return document.createElement("flow-cascade-card-editor");
    }
    static getStubConfig() {
        return {
            type: "custom:flow-cascade-card",
            title: "Energiefluss",
            nodes: [
                { id: "pv", label: "PV", icon: "☀️", power_entity: "sensor.pv_power", type: "source", layout_row: 0 },
                { id: "battery", label: "Batterie", icon: "🔋", power_entity: "sensor.battery_power", type: "bidirectional", soc_entity: "sensor.battery_soc", layout_row: 0 },
                { id: "haus", label: "Haus", icon: "🏠", power_entity: "sensor.house_power", type: "sink", layout_row: 1 },
                { id: "ev", label: "E-Auto", icon: "🚗", power_entity: "sensor.wallbox_power", type: "sink" },
                { id: "wp", label: "Wärmepumpe", icon: "♨️", power_entity: "sensor.heatpump_power", type: "sink" },
                { id: "netz", label: "Netz", icon: "⚡", power_entity: "sensor.grid_power", type: "bidirectional", invert_color: true },
            ],
            links: [
                { from: "pv", to: "battery", positive_direction: "from_to" },
                { from: "pv", to: "haus", positive_direction: "from_to" },
                { from: "battery", to: "haus", positive_direction: "to_from" },
                { from: "haus", to: "wp", positive_direction: "from_to" },
                { from: "haus", to: "ev", positive_direction: "from_to" },
                { from: "haus", to: "netz", positive_direction: "from_to" },
            ],
        };
    }
    // Groups nodes into rows by layout_row. Side nodes (layout_side) are skipped — they render
    // inline next to their source node, not as standalone rows.
    _buildRows(nodes) {
        const map = new Map();
        let maxExplicit = -1;
        for (const n of nodes) {
            if (n.layout_row !== undefined)
                maxExplicit = Math.max(maxExplicit, n.layout_row);
        }
        let autoKey = maxExplicit + 1;
        for (const n of nodes) {
            if (n.layout_side || n.layout_bypass || n.layout_interstitial)
                continue;
            const key = n.layout_row ?? autoKey++;
            if (!map.has(key))
                map.set(key, []);
            map.get(key).push(n);
        }
        return [...map.entries()].sort(([a], [b]) => a - b).map(([, ns]) => ns);
    }
    _resolveLinks() {
        if (!this._config || !this.hass)
            return [];
        const { links, nodes, idle_threshold = 5 } = this._config;
        const nodeMap = new Map(nodes.map((n) => [n.id, n]));
        return links.map((link) => {
            const entityId = link.power_entity ?? nodeMap.get(link.from)?.power_entity ?? "";
            const raw = parseFloat(this.hass.states[entityId]?.state ?? "0");
            const watts = isNaN(raw) ? 0 : raw;
            const positive = link.positive_direction ?? "from_to";
            const effectiveWatts = positive === "from_to" ? watts : -watts;
            let direction = "idle";
            if (Math.abs(effectiveWatts) > idle_threshold) {
                direction = effectiveWatts >= 0 ? "forward" : "reverse";
            }
            if (link.one_way && direction === "reverse")
                direction = "idle";
            return { from: link.from, to: link.to, watts: effectiveWatts, direction };
        });
    }
    _getNodeWatts(nodeId) {
        if (!this._config || !this.hass)
            return null;
        const node = this._config.nodes.find((n) => n.id === nodeId);
        if (!node)
            return null;
        const raw = this.hass.states[node.power_entity]?.state;
        if (raw === undefined || raw === "unavailable" || raw === "unknown")
            return null;
        const v = parseFloat(raw);
        return isNaN(v) ? null : v;
    }
    _getNodeSoc(node) {
        if (!node.soc_entity || !this.hass)
            return null;
        const raw = this.hass.states[node.soc_entity]?.state;
        if (!raw || raw === "unavailable" || raw === "unknown")
            return null;
        const v = parseFloat(raw);
        return isNaN(v) ? null : Math.min(100, Math.max(0, v));
    }
    _resolvedNodeColor(node, watts, soc) {
        if (node.color)
            return node.color;
        if (soc !== null && soc >= 100 && watts !== null && watts > 0)
            return "#00bcd4";
        return nodeColor(node, watts ?? 0);
    }
    _renderNodeBox(node, watts, soc, decimals, unit, idleThreshold, compact = false) {
        const color = watts !== null ? this._resolvedNodeColor(node, watts, soc) : "var(--fcc-idle)";
        const icon = node.icon ?? guessIcon(node.id);
        const isActive = watts !== null && Math.abs(watts) > idleThreshold;
        return b `
      <div class="node-box ${isActive ? "active" : ""} ${compact ? "node-box--compact" : ""}"
           style=${o({ "--node-color": color })}>
        <div class="node-icon">${icon}</div>
        <div class="node-info">
          <div class="node-label">${node.label}</div>
          <div class="node-power ${watts === null ? "unavailable" : ""}">
            ${watts === null ? "–" : formatWatts(watts, decimals, unit)}
          </div>
          ${node.soc_entity ? b `
            <div class="soc-bar-wrap">
              <div class="soc-bar" style=${o({ width: `${soc ?? 0}%` })}></div>
            </div>
            <div class="soc-label">${soc !== null ? soc.toFixed(0) + " %" : "– %"}</div>
            ${soc !== null && node.soc_min !== undefined && soc <= node.soc_min ? b `
              <div class="soc-min-label">Min. erreicht</div>
            ` : A}
          ` : A}
        </div>
      </div>
    `;
    }
    _renderNodeWithSide(node, watts, soc, sideLinks, decimals, unit, idleThreshold, animSpeed) {
        return b `
      <div class="node-with-side">
        <div class="main-col">
          ${this._renderNodeBox(node, watts, soc, decimals, unit, idleThreshold)}
        </div>
        ${sideLinks.map(rl => {
            const sideNode = this._config.nodes.find(n => n.id === rl.to);
            const sideWatts = this._getNodeWatts(rl.to);
            const sideSoc = this._getNodeSoc(sideNode);
            const color = linkColor(rl.direction);
            const isFlowing = rl.direction !== "idle";
            const arrowChar = rl.direction === "reverse" ? "◀" : "▶";
            return b `
            <div class="side-connector" style=${o({ "--link-color": color, "--anim-speed": `${animSpeed}ms` })}>
              <div class="side-conn-line ${isFlowing ? "flowing" : ""}"></div>
              <div class="side-conn-content">
                <span class="side-conn-arrow">${arrowChar}</span>
                <span class="side-conn-label">${isFlowing ? formatWatts(Math.abs(rl.watts), decimals, unit) : ""}</span>
              </div>
            </div>
            <div class="side-col">
              ${this._renderNodeBox(sideNode, sideWatts, sideSoc, decimals, unit, idleThreshold, true)}
            </div>
          `;
        })}
      </div>
    `;
    }
    _renderHorizLink(rl, animSpeed, decimals, unit) {
        const color = linkColor(rl.direction);
        const isFlowing = rl.direction !== "idle";
        const arrowChar = rl.direction === "reverse" ? "◀" : "▶";
        return b `
      <div class="horiz-link" style=${o({ "--link-color": color, "--anim-speed": `${animSpeed}ms` })}>
        <div class="horiz-link-line ${isFlowing ? "flowing" : ""}"></div>
        <div class="horiz-link-content">
          <span class="horiz-link-arrow">${arrowChar}</span>
          <span class="horiz-link-label">${isFlowing ? formatWatts(Math.abs(rl.watts), decimals, unit) : ""}</span>
        </div>
      </div>
    `;
    }
    _renderNodeRow(rowNodes, horizLinks, animSpeed, decimals, unit, idleThreshold) {
        return b `
      <div class="node-row">
        ${rowNodes.map((node, i) => {
            const watts = this._getNodeWatts(node.id);
            const soc = this._getNodeSoc(node);
            const horizLink = horizLinks.get(node.id);
            return b `
            <div class="node-col">
              ${this._renderNodeBox(node, watts, soc, decimals, unit, idleThreshold)}
            </div>
            ${horizLink && i < rowNodes.length - 1
                ? this._renderHorizLink(horizLink, animSpeed, decimals, unit)
                : A}
          `;
        })}
      </div>
    `;
    }
    // Fan-out zone: one source fans out to multiple nodes in the same target row.
    // Columns are aligned with TARGET row node positions (not source positions).
    _renderFanOutZone(targetRow, outLinks, animSpeed, decimals, unit) {
        const cols = targetRow.map(n => outLinks.find(rl => rl.to === n.id) ?? null);
        return b `
      <div class="inter-row-zone">
        ${cols.map(rl => {
            if (!rl)
                return b `<div class="inter-row-col"></div>`;
            const color = linkColor(rl.direction);
            const isFlowing = rl.direction !== "idle";
            return b `
            <div class="inter-row-col" style=${o({ "--link-color": color, "--anim-speed": `${animSpeed}ms` })}>
              <div class="inter-row-line ${isFlowing ? "flowing" : ""} ${rl.direction === "reverse" ? "flow-up" : ""}"></div>
              <div class="inter-row-label">
                ${isFlowing ? formatWatts(Math.abs(rl.watts), decimals, unit) : ""}
              </div>
              <div class="inter-row-arrow">${rl.direction === "reverse" ? "▲" : "▼"}</div>
            </div>
          `;
        })}
      </div>
    `;
    }
    _renderInterRowZone(rowNodes, outLinks, animSpeed, decimals, unit, hasSideSpacer = false) {
        // One column per node in the row; each column shows the outgoing vertical link from that node.
        const cols = rowNodes.map(n => outLinks.find(rl => rl.from === n.id) ?? null);
        return b `
      <div class="inter-row-zone">
        ${cols.map(rl => {
            if (!rl)
                return b `<div class="inter-row-col"></div>`;
            const color = linkColor(rl.direction);
            const isFlowing = rl.direction !== "idle";
            return b `
            <div class="inter-row-col" style=${o({ "--link-color": color, "--anim-speed": `${animSpeed}ms` })}>
              <div class="inter-row-line ${isFlowing ? "flowing" : ""} ${rl.direction === "reverse" ? "flow-up" : ""}"></div>
              <div class="inter-row-label">
                ${isFlowing ? formatWatts(Math.abs(rl.watts), decimals, unit) : ""}
              </div>
              <div class="inter-row-arrow">${rl.direction === "reverse" ? "▲" : "▼"}</div>
            </div>
          `;
        })}
        ${hasSideSpacer ? b `<div class="inter-row-side-spacer"></div>` : A}
      </div>
    `;
    }
    _renderSingleLink(rl, animSpeed, decimals, unit) {
        const color = linkColor(rl.direction);
        const isFlowing = rl.direction !== "idle";
        const arrowChar = rl.direction === "reverse" ? "▲" : "▼";
        const arrowPos = rl.direction === "reverse" ? "tip-top" : "tip-bottom";
        const flowDir = rl.direction === "reverse" ? "top" : "bottom";
        return b `
      <div
        class="link"
        style=${o({
            "--link-color": color,
            "--anim-speed": `${animSpeed}ms`,
            "--flow-dir": flowDir,
        })}
      >
        <div class="link-line ${isFlowing ? "flowing" : ""} ${rl.direction === "reverse" ? "flow-up" : ""}"></div>
        <div class="link-label">
          ${isFlowing ? formatWatts(Math.abs(rl.watts), decimals, unit) : ""}
        </div>
        <div class="link-arrow ${arrowPos}">${arrowChar}</div>
      </div>
    `;
    }
    _renderBypassZone(mainLink, bypassLinks, animSpeed, decimals, unit, idleThreshold) {
        const mainColor = linkColor(mainLink.direction);
        const isMainFlowing = mainLink.direction !== "idle";
        const flowDir = mainLink.direction === "reverse" ? "top" : "bottom";
        const arrowChar = mainLink.direction === "reverse" ? "▲" : "▼";
        const arrowPos = mainLink.direction === "reverse" ? "tip-top" : "tip-bottom";
        return b `
      <div class="bypass-zone">
        <div class="bypass-main"
             style=${o({ "--link-color": mainColor, "--anim-speed": `${animSpeed}ms`, "--flow-dir": flowDir })}>
          <div class="bypass-main-line ${isMainFlowing ? "flowing" : ""} ${mainLink.direction === "reverse" ? "flow-up" : ""}"></div>
          <div class="bypass-main-label">
            ${isMainFlowing ? formatWatts(Math.abs(mainLink.watts), decimals, unit) : ""}
          </div>
          <div class="bypass-main-arrow ${arrowPos}">${arrowChar}</div>
        </div>
        ${bypassLinks.map(bl => {
            const bypassNode = this._config.nodes.find(n => n.id === bl.to);
            const bypassWatts = this._getNodeWatts(bl.to);
            const bypassSoc = this._getNodeSoc(bypassNode);
            const connColor = linkColor(bl.direction);
            const isFlowing = bl.direction !== "idle";
            const connArrow = bl.direction === "reverse" ? "◀" : "▶";
            return b `
            <div class="bypass-connector"
                 style=${o({ "--bypass-link-color": connColor, "--anim-speed": `${animSpeed}ms` })}>
              <div class="bypass-conn-line ${isFlowing ? "flowing" : ""}"></div>
              <div class="bypass-conn-content">
                <span class="bypass-conn-arrow">${connArrow}</span>
                <span class="bypass-conn-label">
                  ${isFlowing ? formatWatts(Math.abs(bl.watts), decimals, unit) : ""}
                </span>
              </div>
            </div>
            <div class="bypass-side">
              ${this._renderNodeBox(bypassNode, bypassWatts, bypassSoc, decimals, unit, idleThreshold, true)}
            </div>
          `;
        })}
      </div>
    `;
    }
    _renderInterstitialZone(mainLink, interstitialLinks, animSpeed, decimals, unit, idleThreshold) {
        const mainColor = linkColor(mainLink.direction);
        const isMainFlowing = mainLink.direction !== "idle";
        const flowDir = mainLink.direction === "reverse" ? "top" : "bottom";
        const mainArrow = mainLink.direction === "reverse" ? "▲" : "▼";
        const arrowPos = mainLink.direction === "reverse" ? "tip-top" : "tip-bottom";
        return b `
      <div class="interstitial-zone">
        <div class="interstitial-main"
             style=${o({ "--link-color": mainColor, "--anim-speed": `${animSpeed}ms`, "--flow-dir": flowDir })}>
          <div class="interstitial-main-line ${isMainFlowing ? "flowing" : ""} ${mainLink.direction === "reverse" ? "flow-up" : ""}"></div>
          <div class="interstitial-main-label">
            ${isMainFlowing ? formatWatts(Math.abs(mainLink.watts), decimals, unit) : ""}
          </div>
          <div class="interstitial-main-arrow ${arrowPos}">${mainArrow}</div>
        </div>
        ${interstitialLinks.map(il => {
            const iNode = this._config.nodes.find(n => n.id === il.to);
            const iWatts = this._getNodeWatts(il.to);
            const iSoc = this._getNodeSoc(iNode);
            const isFlowing = il.direction !== "idle";
            const isSink = (iNode.type ?? "sink") === "sink";
            // When the main link is idle but the branch flows, power comes from
            // below (grid import) → treat as reverse so colour/arrow are correct.
            const effectiveDir = isFlowing
                ? (mainLink.direction === "forward" ? "forward" : "reverse")
                : "idle";
            const iColor = linkColor(effectiveDir);
            const iFlowDir = effectiveDir === "reverse" ? "top" : "bottom";
            const iArrow = effectiveDir === "reverse" ? "▲" : "▼";
            // Both arrows always visible. Only the entry arrow is colored; the other stays idle/gray.
            // PV/forward: top arrow colored + label, bottom arrow idle.
            // Grid/reverse: bottom arrow colored + label, top arrow idle.
            const topActive = effectiveDir !== "reverse";
            const bottomActive = effectiveDir === "reverse";
            const topColor = topActive ? iColor : linkColor("idle");
            const botColor = bottomActive ? iColor : linkColor("idle");
            const topFlowing = isFlowing && topActive;
            const botFlowing = isFlowing && bottomActive;
            // For sinks the structural direction is fixed: top connector always flows ▼ (from above),
            // bottom connector always flows ▲ (from below). Non-sinks follow effectiveDir like before.
            const topArrowChar = isSink ? "▼" : iArrow;
            const botArrowChar = isSink ? "▲" : iArrow;
            const topFlowDir = isSink ? "bottom" : iFlowDir;
            const botFlowDir = isSink ? "top" : iFlowDir;
            return b `
            <div class="interstitial-branch">
              <div class="interstitial-branch-arrow"
                   style=${o({ "--link-color": topColor, "--anim-speed": `${animSpeed}ms`, "--flow-dir": topFlowDir })}>
                <div class="interstitial-branch-line ${topFlowing ? "flowing" : ""}"></div>
                <div class="interstitial-branch-label">
                  ${topFlowing ? formatWatts(Math.abs(il.watts), decimals, unit) : ""}
                </div>
                <div class="interstitial-branch-arrowhead">${topArrowChar}</div>
              </div>
              <div class="interstitial-branch-node">
                ${this._renderNodeBox(iNode, iWatts, iSoc, decimals, unit, idleThreshold, true)}
              </div>
              <div class="interstitial-branch-arrow"
                   style=${o({ "--link-color": botColor, "--anim-speed": `${animSpeed}ms`, "--flow-dir": botFlowDir })}>
                <div class="interstitial-branch-line ${botFlowing ? "flowing" : ""} ${isSink ? "flow-up" : effectiveDir === "reverse" ? "flow-up" : ""}"></div>
                <div class="interstitial-branch-label">
                  ${botFlowing ? formatWatts(Math.abs(il.watts), decimals, unit) : ""}
                </div>
                <div class="interstitial-branch-arrowhead bottom">${botArrowChar}</div>
              </div>
            </div>
          `;
        })}
      </div>
    `;
    }
    _renderSplitLinks(links, nodeMap, animSpeed, decimals, unit) {
        return b `
      <div
        class="split-row"
        style=${o({ "--branch-count": String(links.length) })}
      >
        ${links.map((rl) => {
            const color = linkColor(rl.direction);
            const isFlowing = rl.direction !== "idle";
            const targetNode = nodeMap.get(rl.to);
            const targetIcon = targetNode?.icon ?? guessIcon(rl.to);
            const targetLabel = targetNode?.label ?? rl.to;
            return b `
            <div class="split-branch" style=${o({ "--link-color": color, "--anim-speed": `${animSpeed}ms` })}>
              <div class="split-branch-line ${isFlowing ? "flowing" : ""} ${rl.direction === "reverse" ? "flow-up" : ""}"></div>
              <div class="split-branch-arrow">${rl.direction === "reverse" ? "▲" : "▼"}</div>
              <div class="split-branch-label">
                ${targetIcon} ${isFlowing ? formatWatts(Math.abs(rl.watts), decimals, unit) : targetLabel}
              </div>
            </div>
          `;
        })}
      </div>
    `;
    }
    render() {
        if (!this._config)
            return A;
        const { nodes, title, animation_speed = 1200, decimals = 1, unit = "auto" } = this._config;
        const resolvedLinks = this._resolveLinks();
        const nodeMap = new Map(nodes.map((n) => [n.id, n]));
        const idleThreshold = this._config.idle_threshold ?? 5;
        const rows = this._buildRows(nodes);
        // nodeId → row array index
        const nodeRowIdx = new Map();
        for (let i = 0; i < rows.length; i++) {
            for (const n of rows[i])
                nodeRowIdx.set(n.id, i);
        }
        // Classify links: horizontal (same row) vs vertical (different rows)
        // Side links (target has layout_side) and bypass links (target has layout_bypass) are separated.
        const horizLinks = new Map();
        const vertLinks = [];
        const sideLinks = [];
        const bypassLinks = [];
        for (const rl of resolvedLinks) {
            const fr = nodeRowIdx.get(rl.from) ?? -1;
            const tr = nodeRowIdx.get(rl.to) ?? -1;
            if (nodeMap.get(rl.to)?.layout_interstitial) {
                bypassLinks.push(rl); // reuse bypassLinks array — interstitial links render via _renderBypassZone replacement
            }
            else if (nodeMap.get(rl.to)?.layout_bypass) {
                bypassLinks.push(rl);
            }
            else if (nodeMap.get(rl.to)?.layout_side) {
                sideLinks.push(rl);
            }
            else if (fr >= 0 && fr === tr) {
                horizLinks.set(rl.from, rl);
            }
            else {
                vertLinks.push(rl);
            }
        }
        // Vertical links grouped by source row index (main links only)
        const vertByRow = new Map();
        for (const rl of vertLinks) {
            const fr = nodeRowIdx.get(rl.from) ?? -1;
            if (fr < 0)
                continue;
            if (!vertByRow.has(fr))
                vertByRow.set(fr, []);
            vertByRow.get(fr).push(rl);
        }
        // Main vertical links by source node
        const linksBySource = new Map();
        for (const rl of vertLinks) {
            if (!linksBySource.has(rl.from))
                linksBySource.set(rl.from, []);
            linksBySource.get(rl.from).push(rl);
        }
        // Side links by source node
        const sidesBySource = new Map();
        for (const rl of sideLinks) {
            if (!sidesBySource.has(rl.from))
                sidesBySource.set(rl.from, []);
            sidesBySource.get(rl.from).push(rl);
        }
        // Bypass links by source node
        const bypasesBySource = new Map();
        for (const rl of bypassLinks) {
            if (!bypasesBySource.has(rl.from))
                bypasesBySource.set(rl.from, []);
            bypasesBySource.get(rl.from).push(rl);
        }
        // Fan-out: a single source with 2+ main links ALL targeting the same multi-node row.
        const splitTargets = new Set();
        for (const [, rls] of linksBySource) {
            if (rls.length > 1) {
                const targetRowSet = new Set(rls.map(rl => nodeRowIdx.get(rl.to) ?? -1).filter(r => r >= 0));
                const tRowIdx = [...targetRowSet][0];
                const isFanOut = targetRowSet.size === 1 && (rows[tRowIdx]?.length ?? 0) > 1;
                if (!isFanOut) {
                    for (const rl of rls)
                        splitTargets.add(rl.to);
                }
            }
        }
        return b `
      <ha-card>
        ${title ? b `<div class="card-header">${title}</div>` : A}
        <div class="cascade">
          ${rows.map((rowNodes, rowIdx) => {
            const outLinks = vertByRow.get(rowIdx) ?? [];
            if (rowNodes.length > 1) {
                // Add spacer when all outgoing links target the same single node that has a side branch,
                // so the arrows stay aligned over that node's main-col (not the side area).
                let sideSpacerForInterRow = false;
                if (outLinks.length > 0) {
                    const uniqueTargets = new Set(outLinks.map(rl => rl.to));
                    if (uniqueTargets.size === 1) {
                        const targetId = [...uniqueTargets][0];
                        sideSpacerForInterRow = (sidesBySource.get(targetId)?.length ?? 0) > 0;
                    }
                }
                return b `
                ${this._renderNodeRow(rowNodes, horizLinks, animation_speed, decimals, unit, idleThreshold)}
                ${outLinks.length > 0
                    ? this._renderInterRowZone(rowNodes, outLinks, animation_speed, decimals, unit, sideSpacerForInterRow)
                    : A}
              `;
            }
            // Single-node row
            const node = rowNodes[0];
            const watts = this._getNodeWatts(node.id);
            const soc = this._getNodeSoc(node);
            const nodeSideLinks = sidesBySource.get(node.id) ?? [];
            const nodeOutLinks = linksBySource.get(node.id) ?? [];
            // Fan-out: all main outgoing links target the same multi-node row
            const outTargetRowSet = new Set(nodeOutLinks.map(rl => nodeRowIdx.get(rl.to) ?? -1).filter(r => r >= 0));
            const outTargetRowIdx = outTargetRowSet.size === 1 ? [...outTargetRowSet][0] : -1;
            const isFanOut = nodeOutLinks.length > 1
                && outTargetRowIdx > rowIdx
                && (rows[outTargetRowIdx]?.length ?? 0) > 1;
            const isSplit = nodeOutLinks.length > 1 && !isFanOut;
            const singleLink = !isSplit && !isFanOut && nodeOutLinks.length === 1 ? nodeOutLinks[0] : null;
            const hasSide = nodeSideLinks.length > 0;
            const nodeBypassLinks = bypasesBySource.get(node.id) ?? [];
            const hasBypass = nodeBypassLinks.length > 0;
            return b `
              ${hasSide
                ? this._renderNodeWithSide(node, watts, soc, nodeSideLinks, decimals, unit, idleThreshold, animation_speed)
                : b `<div class="node">${this._renderNodeBox(node, watts, soc, decimals, unit, idleThreshold)}</div>`}
              ${isFanOut
                ? this._renderFanOutZone(rows[outTargetRowIdx], nodeOutLinks, animation_speed, decimals, unit)
                : isSplit
                    ? this._renderSplitLinks(nodeOutLinks, nodeMap, animation_speed, decimals, unit)
                    : singleLink && !splitTargets.has(node.id)
                        ? hasBypass
                            ? nodeBypassLinks.some(bl => nodeMap.get(bl.to)?.layout_interstitial)
                                ? this._renderInterstitialZone(singleLink, nodeBypassLinks, animation_speed, decimals, unit, idleThreshold)
                                : this._renderBypassZone(singleLink, nodeBypassLinks, animation_speed, decimals, unit, idleThreshold)
                            : this._renderSingleLink(singleLink, animation_speed, decimals, unit)
                        : A}
            `;
        })}
        </div>
      </ha-card>
    `;
    }
};
FlowCascadeCard.styles = [cardStyles, i$5 ``];
__decorate([
    n$1({ attribute: false })
], FlowCascadeCard.prototype, "hass", void 0);
__decorate([
    r()
], FlowCascadeCard.prototype, "_config", void 0);
FlowCascadeCard = __decorate([
    t$1("flow-cascade-card")
], FlowCascadeCard);

export { FlowCascadeCard };
//# sourceMappingURL=flow-cascade-card.js.map
