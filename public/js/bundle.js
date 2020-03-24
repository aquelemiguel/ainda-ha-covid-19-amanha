(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* @license
Papa Parse
v5.1.1
https://github.com/mholt/PapaParse
License: MIT
*/
!function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof module&&"undefined"!=typeof exports?module.exports=t():e.Papa=t()}(this,function s(){"use strict";var f="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==f?f:{};var n=!f.document&&!!f.postMessage,o=n&&/blob:/i.test((f.location||{}).protocol),a={},h=0,b={parse:function(e,t){var i=(t=t||{}).dynamicTyping||!1;q(i)&&(t.dynamicTypingFunction=i,i={});if(t.dynamicTyping=i,t.transform=!!q(t.transform)&&t.transform,t.worker&&b.WORKERS_SUPPORTED){var r=function(){if(!b.WORKERS_SUPPORTED)return!1;var e=(i=f.URL||f.webkitURL||null,r=s.toString(),b.BLOB_URL||(b.BLOB_URL=i.createObjectURL(new Blob(["(",r,")();"],{type:"text/javascript"})))),t=new f.Worker(e);var i,r;return t.onmessage=m,t.id=h++,a[t.id]=t}();return r.userStep=t.step,r.userChunk=t.chunk,r.userComplete=t.complete,r.userError=t.error,t.step=q(t.step),t.chunk=q(t.chunk),t.complete=q(t.complete),t.error=q(t.error),delete t.worker,void r.postMessage({input:e,config:t,workerId:r.id})}var n=null;b.NODE_STREAM_INPUT,"string"==typeof e?n=t.download?new l(t):new p(t):!0===e.readable&&q(e.read)&&q(e.on)?n=new g(t):(f.File&&e instanceof File||e instanceof Object)&&(n=new c(t));return n.stream(e)},unparse:function(e,t){var n=!1,m=!0,_=",",v="\r\n",s='"',a=s+s,i=!1,r=null;!function(){if("object"!=typeof t)return;"string"!=typeof t.delimiter||b.BAD_DELIMITERS.filter(function(e){return-1!==t.delimiter.indexOf(e)}).length||(_=t.delimiter);("boolean"==typeof t.quotes||"function"==typeof t.quotes||Array.isArray(t.quotes))&&(n=t.quotes);"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(i=t.skipEmptyLines);"string"==typeof t.newline&&(v=t.newline);"string"==typeof t.quoteChar&&(s=t.quoteChar);"boolean"==typeof t.header&&(m=t.header);if(Array.isArray(t.columns)){if(0===t.columns.length)throw new Error("Option columns is empty");r=t.columns}void 0!==t.escapeChar&&(a=t.escapeChar+s)}();var o=new RegExp(U(s),"g");"string"==typeof e&&(e=JSON.parse(e));if(Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return u(null,e,i);if("object"==typeof e[0])return u(r||h(e[0]),e,i)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:h(e.data[0])),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),u(e.fields||[],e.data||[],i);throw new Error("Unable to serialize unrecognized input");function h(e){if("object"!=typeof e)return[];var t=[];for(var i in e)t.push(i);return t}function u(e,t,i){var r="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var n=Array.isArray(e)&&0<e.length,s=!Array.isArray(t[0]);if(n&&m){for(var a=0;a<e.length;a++)0<a&&(r+=_),r+=y(e[a],a);0<t.length&&(r+=v)}for(var o=0;o<t.length;o++){var h=n?e.length:t[o].length,u=!1,f=n?0===Object.keys(t[o]).length:0===t[o].length;if(i&&!n&&(u="greedy"===i?""===t[o].join("").trim():1===t[o].length&&0===t[o][0].length),"greedy"===i&&n){for(var d=[],l=0;l<h;l++){var c=s?e[l]:l;d.push(t[o][c])}u=""===d.join("").trim()}if(!u){for(var p=0;p<h;p++){0<p&&!f&&(r+=_);var g=n&&s?e[p]:p;r+=y(t[o][g],p)}o<t.length-1&&(!i||0<h&&!f)&&(r+=v)}}return r}function y(e,t){if(null==e)return"";if(e.constructor===Date)return JSON.stringify(e).slice(1,25);var i=e.toString().replace(o,a),r="boolean"==typeof n&&n||"function"==typeof n&&n(e,t)||Array.isArray(n)&&n[t]||function(e,t){for(var i=0;i<t.length;i++)if(-1<e.indexOf(t[i]))return!0;return!1}(i,b.BAD_DELIMITERS)||-1<i.indexOf(_)||" "===i.charAt(0)||" "===i.charAt(i.length-1);return r?s+i+s:i}}};if(b.RECORD_SEP=String.fromCharCode(30),b.UNIT_SEP=String.fromCharCode(31),b.BYTE_ORDER_MARK="\ufeff",b.BAD_DELIMITERS=["\r","\n",'"',b.BYTE_ORDER_MARK],b.WORKERS_SUPPORTED=!n&&!!f.Worker,b.NODE_STREAM_INPUT=1,b.LocalChunkSize=10485760,b.RemoteChunkSize=5242880,b.DefaultDelimiter=",",b.Parser=E,b.ParserHandle=i,b.NetworkStreamer=l,b.FileStreamer=c,b.StringStreamer=p,b.ReadableStreamStreamer=g,f.jQuery){var d=f.jQuery;d.fn.parse=function(o){var i=o.config||{},h=[];return this.each(function(e){if(!("INPUT"===d(this).prop("tagName").toUpperCase()&&"file"===d(this).attr("type").toLowerCase()&&f.FileReader)||!this.files||0===this.files.length)return!0;for(var t=0;t<this.files.length;t++)h.push({file:this.files[t],inputElem:this,instanceConfig:d.extend({},i)})}),e(),this;function e(){if(0!==h.length){var e,t,i,r,n=h[0];if(q(o.before)){var s=o.before(n.file,n.inputElem);if("object"==typeof s){if("abort"===s.action)return e="AbortError",t=n.file,i=n.inputElem,r=s.reason,void(q(o.error)&&o.error({name:e},t,i,r));if("skip"===s.action)return void u();"object"==typeof s.config&&(n.instanceConfig=d.extend(n.instanceConfig,s.config))}else if("skip"===s)return void u()}var a=n.instanceConfig.complete;n.instanceConfig.complete=function(e){q(a)&&a(e,n.file,n.inputElem),u()},b.parse(n.file,n.instanceConfig)}else q(o.complete)&&o.complete()}function u(){h.splice(0,1),e()}}}function u(e){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=w(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null);this._handle=new i(t),(this._handle.streamer=this)._config=t}.call(this,e),this.parseChunk=function(e,t){if(this.isFirstChunk&&q(this._config.beforeFirstChunk)){var i=this._config.beforeFirstChunk(e);void 0!==i&&(e=i)}this.isFirstChunk=!1,this._halted=!1;var r=this._partialLine+e;this._partialLine="";var n=this._handle.parse(r,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var s=n.meta.cursor;this._finished||(this._partialLine=r.substring(s-this._baseIndex),this._baseIndex=s),n&&n.data&&(this._rowCount+=n.data.length);var a=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(o)f.postMessage({results:n,workerId:b.WORKER_ID,finished:a});else if(q(this._config.chunk)&&!t){if(this._config.chunk(n,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);n=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(n.data),this._completeResults.errors=this._completeResults.errors.concat(n.errors),this._completeResults.meta=n.meta),this._completed||!a||!q(this._config.complete)||n&&n.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),a||n&&n.meta.paused||this._nextChunk(),n}this._halted=!0},this._sendError=function(e){q(this._config.error)?this._config.error(e):o&&this._config.error&&f.postMessage({workerId:b.WORKER_ID,error:e,finished:!1})}}function l(e){var r;(e=e||{}).chunkSize||(e.chunkSize=b.RemoteChunkSize),u.call(this,e),this._nextChunk=n?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(r=new XMLHttpRequest,this._config.withCredentials&&(r.withCredentials=this._config.withCredentials),n||(r.onload=y(this._chunkLoaded,this),r.onerror=y(this._chunkError,this)),r.open("GET",this._input,!n),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders;for(var t in e)r.setRequestHeader(t,e[t])}if(this._config.chunkSize){var i=this._start+this._config.chunkSize-1;r.setRequestHeader("Range","bytes="+this._start+"-"+i)}try{r.send()}catch(e){this._chunkError(e.message)}n&&0===r.status&&this._chunkError()}},this._chunkLoaded=function(){4===r.readyState&&(r.status<200||400<=r.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:r.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(e){var t=e.getResponseHeader("Content-Range");if(null===t)return-1;return parseInt(t.substring(t.lastIndexOf("/")+1))}(r),this.parseChunk(r.responseText)))},this._chunkError=function(e){var t=r.statusText||e;this._sendError(new Error(t))}}function c(e){var r,n;(e=e||{}).chunkSize||(e.chunkSize=b.LocalChunkSize),u.call(this,e);var s="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,n=e.slice||e.webkitSlice||e.mozSlice,s?((r=new FileReader).onload=y(this._chunkLoaded,this),r.onerror=y(this._chunkError,this)):r=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var t=Math.min(this._start+this._config.chunkSize,this._input.size);e=n.call(e,this._start,t)}var i=r.readAsText(e,this._config.encoding);s||this._chunkLoaded({target:{result:i}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(r.error)}}function p(e){var i;u.call(this,e=e||{}),this.stream=function(e){return i=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e,t=this._config.chunkSize;return t?(e=i.substring(0,t),i=i.substring(t)):(e=i,i=""),this._finished=!i,this.parseChunk(e)}}}function g(e){u.call(this,e=e||{});var t=[],i=!0,r=!1;this.pause=function(){u.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){u.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){r&&1===t.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):i=!0},this._streamData=y(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),i&&(i=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(e){this._streamError(e)}},this),this._streamError=y(function(e){this._streamCleanUp(),this._sendError(e)},this),this._streamEnd=y(function(){this._streamCleanUp(),r=!0,this._streamData("")},this),this._streamCleanUp=y(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function i(_){var a,o,h,r=Math.pow(2,53),n=-r,s=/^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i,u=/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,t=this,i=0,f=0,d=!1,e=!1,l=[],c={data:[],errors:[],meta:{}};if(q(_.step)){var p=_.step;_.step=function(e){if(c=e,m())g();else{if(g(),0===c.data.length)return;i+=e.data.length,_.preview&&i>_.preview?o.abort():(c.data=c.data[0],p(c,t))}}}function v(e){return"greedy"===_.skipEmptyLines?""===e.join("").trim():1===e.length&&0===e[0].length}function g(){if(c&&h&&(k("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+b.DefaultDelimiter+"'"),h=!1),_.skipEmptyLines)for(var e=0;e<c.data.length;e++)v(c.data[e])&&c.data.splice(e--,1);return m()&&function(){if(!c)return;function e(e){q(_.transformHeader)&&(e=_.transformHeader(e)),l.push(e)}if(Array.isArray(c.data[0])){for(var t=0;m()&&t<c.data.length;t++)c.data[t].forEach(e);c.data.splice(0,1)}else c.data.forEach(e)}(),function(){if(!c||!_.header&&!_.dynamicTyping&&!_.transform)return c;function e(e,t){var i,r=_.header?{}:[];for(i=0;i<e.length;i++){var n=i,s=e[i];_.header&&(n=i>=l.length?"__parsed_extra":l[i]),_.transform&&(s=_.transform(s,n)),s=y(n,s),"__parsed_extra"===n?(r[n]=r[n]||[],r[n].push(s)):r[n]=s}return _.header&&(i>l.length?k("FieldMismatch","TooManyFields","Too many fields: expected "+l.length+" fields but parsed "+i,f+t):i<l.length&&k("FieldMismatch","TooFewFields","Too few fields: expected "+l.length+" fields but parsed "+i,f+t)),r}var t=1;!c.data.length||Array.isArray(c.data[0])?(c.data=c.data.map(e),t=c.data.length):c.data=e(c.data,0);_.header&&c.meta&&(c.meta.fields=l);return f+=t,c}()}function m(){return _.header&&0===l.length}function y(e,t){return i=e,_.dynamicTypingFunction&&void 0===_.dynamicTyping[i]&&(_.dynamicTyping[i]=_.dynamicTypingFunction(i)),!0===(_.dynamicTyping[i]||_.dynamicTyping)?"true"===t||"TRUE"===t||"false"!==t&&"FALSE"!==t&&(function(e){if(s.test(e)){var t=parseFloat(e);if(n<t&&t<r)return!0}return!1}(t)?parseFloat(t):u.test(t)?new Date(t):""===t?null:t):t;var i}function k(e,t,i,r){var n={type:e,code:t,message:i};void 0!==r&&(n.row=r),c.errors.push(n)}this.parse=function(e,t,i){var r=_.quoteChar||'"';if(_.newline||(_.newline=function(e,t){e=e.substring(0,1048576);var i=new RegExp(U(t)+"([^]*?)"+U(t),"gm"),r=(e=e.replace(i,"")).split("\r"),n=e.split("\n"),s=1<n.length&&n[0].length<r[0].length;if(1===r.length||s)return"\n";for(var a=0,o=0;o<r.length;o++)"\n"===r[o][0]&&a++;return a>=r.length/2?"\r\n":"\r"}(e,r)),h=!1,_.delimiter)q(_.delimiter)&&(_.delimiter=_.delimiter(e),c.meta.delimiter=_.delimiter);else{var n=function(e,t,i,r,n){var s,a,o,h;n=n||[",","\t","|",";",b.RECORD_SEP,b.UNIT_SEP];for(var u=0;u<n.length;u++){var f=n[u],d=0,l=0,c=0;o=void 0;for(var p=new E({comments:r,delimiter:f,newline:t,preview:10}).parse(e),g=0;g<p.data.length;g++)if(i&&v(p.data[g]))c++;else{var m=p.data[g].length;l+=m,void 0!==o?0<m&&(d+=Math.abs(m-o),o=m):o=m}0<p.data.length&&(l/=p.data.length-c),(void 0===a||d<=a)&&(void 0===h||h<l)&&1.99<l&&(a=d,s=f,h=l)}return{successful:!!(_.delimiter=s),bestDelimiter:s}}(e,_.newline,_.skipEmptyLines,_.comments,_.delimitersToGuess);n.successful?_.delimiter=n.bestDelimiter:(h=!0,_.delimiter=b.DefaultDelimiter),c.meta.delimiter=_.delimiter}var s=w(_);return _.preview&&_.header&&s.preview++,a=e,o=new E(s),c=o.parse(a,t,i),g(),d?{meta:{paused:!0}}:c||{meta:{paused:!1}}},this.paused=function(){return d},this.pause=function(){d=!0,o.abort(),a=q(_.chunk)?"":a.substring(o.getCharIndex())},this.resume=function(){t.streamer._halted?(d=!1,t.streamer.parseChunk(a,!0)):setTimeout(this.resume,3)},this.aborted=function(){return e},this.abort=function(){e=!0,o.abort(),c.meta.aborted=!0,q(_.complete)&&_.complete(c),a=""}}function U(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function E(e){var O,D=(e=e||{}).delimiter,I=e.newline,T=e.comments,A=e.step,L=e.preview,F=e.fastMode,z=O=void 0===e.quoteChar?'"':e.quoteChar;if(void 0!==e.escapeChar&&(z=e.escapeChar),("string"!=typeof D||-1<b.BAD_DELIMITERS.indexOf(D))&&(D=","),T===D)throw new Error("Comment character same as delimiter");!0===T?T="#":("string"!=typeof T||-1<b.BAD_DELIMITERS.indexOf(T))&&(T=!1),"\n"!==I&&"\r"!==I&&"\r\n"!==I&&(I="\n");var M=0,j=!1;this.parse=function(a,t,i){if("string"!=typeof a)throw new Error("Input must be a string");var r=a.length,e=D.length,n=I.length,s=T.length,o=q(A),h=[],u=[],f=[],d=M=0;if(!a)return R();if(F||!1!==F&&-1===a.indexOf(O)){for(var l=a.split(I),c=0;c<l.length;c++){if(f=l[c],M+=f.length,c!==l.length-1)M+=I.length;else if(i)return R();if(!T||f.substring(0,s)!==T){if(o){if(h=[],b(f.split(D)),S(),j)return R()}else b(f.split(D));if(L&&L<=c)return h=h.slice(0,L),R(!0)}}return R()}for(var p=a.indexOf(D,M),g=a.indexOf(I,M),m=new RegExp(U(z)+U(O),"g"),_=a.indexOf(O,M);;)if(a[M]!==O)if(T&&0===f.length&&a.substring(M,M+s)===T){if(-1===g)return R();M=g+n,g=a.indexOf(I,M),p=a.indexOf(D,M)}else{if(-1!==p&&(p<g||-1===g)){if(!(p<_)){f.push(a.substring(M,p)),M=p+e,p=a.indexOf(D,M);continue}var v=x(p,_,g);if(v&&void 0!==v.nextDelim){p=v.nextDelim,_=v.quoteSearch,f.push(a.substring(M,p)),M=p+e,p=a.indexOf(D,M);continue}}if(-1===g)break;if(f.push(a.substring(M,g)),C(g+n),o&&(S(),j))return R();if(L&&h.length>=L)return R(!0)}else for(_=M,M++;;){if(-1===(_=a.indexOf(O,_+1)))return i||u.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:h.length,index:M}),w();if(_===r-1)return w(a.substring(M,_).replace(m,O));if(O!==z||a[_+1]!==z){if(O===z||0===_||a[_-1]!==z){-1!==p&&p<_+1&&(p=a.indexOf(D,_+1)),-1!==g&&g<_+1&&(g=a.indexOf(I,_+1));var y=E(-1===g?p:Math.min(p,g));if(a[_+1+y]===D){f.push(a.substring(M,_).replace(m,O)),a[M=_+1+y+e]!==O&&(_=a.indexOf(O,M)),p=a.indexOf(D,M),g=a.indexOf(I,M);break}var k=E(g);if(a.substring(_+1+k,_+1+k+n)===I){if(f.push(a.substring(M,_).replace(m,O)),C(_+1+k+n),p=a.indexOf(D,M),_=a.indexOf(O,M),o&&(S(),j))return R();if(L&&h.length>=L)return R(!0);break}u.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:h.length,index:M}),_++}}else _++}return w();function b(e){h.push(e),d=M}function E(e){var t=0;if(-1!==e){var i=a.substring(_+1,e);i&&""===i.trim()&&(t=i.length)}return t}function w(e){return i||(void 0===e&&(e=a.substring(M)),f.push(e),M=r,b(f),o&&S()),R()}function C(e){M=e,b(f),f=[],g=a.indexOf(I,M)}function R(e){return{data:h,errors:u,meta:{delimiter:D,linebreak:I,aborted:j,truncated:!!e,cursor:d+(t||0)}}}function S(){A(R()),h=[],u=[]}function x(e,t,i){var r={nextDelim:void 0,quoteSearch:void 0},n=a.indexOf(O,t+1);if(t<e&&e<n&&(n<i||-1===i)){var s=a.indexOf(D,n);if(-1===s)return r;n<s&&(n=a.indexOf(O,n+1)),r=x(s,n,i)}else r={nextDelim:e,quoteSearch:t};return r}},this.abort=function(){j=!0},this.getCharIndex=function(){return M}}function m(e){var t=e.data,i=a[t.workerId],r=!1;if(t.error)i.userError(t.error,t.file);else if(t.results&&t.results.data){var n={abort:function(){r=!0,_(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:v,resume:v};if(q(i.userStep)){for(var s=0;s<t.results.data.length&&(i.userStep({data:t.results.data[s],errors:t.results.errors,meta:t.results.meta},n),!r);s++);delete t.results}else q(i.userChunk)&&(i.userChunk(t.results,n,t.file),delete t.results)}t.finished&&!r&&_(t.workerId,t.results)}function _(e,t){var i=a[e];q(i.userComplete)&&i.userComplete(t),i.terminate(),delete a[e]}function v(){throw new Error("Not implemented.")}function w(e){if("object"!=typeof e||null===e)return e;var t=Array.isArray(e)?[]:{};for(var i in e)t[i]=w(e[i]);return t}function y(e,t){return function(){e.apply(t,arguments)}}function q(e){return"function"==typeof e}return o&&(f.onmessage=function(e){var t=e.data;void 0===b.WORKER_ID&&t&&(b.WORKER_ID=t.workerId);if("string"==typeof t.input)f.postMessage({workerId:b.WORKER_ID,results:b.parse(t.input,t.config),finished:!0});else if(f.File&&t.input instanceof File||t.input instanceof Object){var i=b.parse(t.input,t.config);i&&f.postMessage({workerId:b.WORKER_ID,results:i,finished:!0})}}),(l.prototype=Object.create(u.prototype)).constructor=l,(c.prototype=Object.create(u.prototype)).constructor=c,(p.prototype=Object.create(p.prototype)).constructor=p,(g.prototype=Object.create(u.prototype)).constructor=g,b});
},{}],2:[function(require,module,exports){
const papa = require('papaparse');


const graph = (ctx, infections, prediction, labels) => {
    return new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Infeções',
                    borderColor: '#F95959',
                    data: infections,
                    fill: false
                },
                {
                    label: 'Previsão',
                    borderColor: '#E3E3E3',
                    data: prediction,
                    borderWidth: 2,
                    borderDash: [10, 5],
                    fill: false
                },
            ]
        },
    
        // Configuration options go here
        options: {
            annotation: {
                annotations: [
                    {
                        type: "line",
                        mode: "vertical",
                        scaleID: "x-axis-0",
                        value: 17,
                        borderColor: "#455D7A",
                        borderWidth: 3,
                        borderDash: [3, 3],
                        label: {
                            content: "Estado de emergência",
                            enabled: true,
                            fontFamily: 'Sen',
                            backgroundColor: '#233142',
                            position: 'top',
                            yAdjust: 30
                        }
                    }
                ]
            },
            legend: {
                display: true,
                labels: {
                    fontFamily: 'Sen',
                    fontWeight: 400
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontFamily: 'Sen',
                    },
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontFamily: 'Sen',
                    },
                    gridLines: {
                        display: false
                    }
                }]
            },
            tooltips: {
                backgroundColor: '#233142',
                titleFontFamily: 'Sen',
                titleFontStyle: 'bold',
                bodyFontFamily: 'Sen',
                bodyFontStyle: 'bold',
                footerFontFamily: 'Sen',
                footerFontStyle: 'bold'
            }
        }
    });
}

let raw_data = "data,data_dados,confirmados,confirmados_arsnorte,confirmados_arscentro,confirmados_arslvt,confirmados_arsalentejo,confirmados_arsalgarve,confirmados_acores,confirmados_madeira,confirmados_estrangeiro,confirmados_novos,recuperados,obitos,internados,internados_uci,lab,suspeitos,vigilancia,n_confirmados,cadeias_transmissao,transmissao_importada,confirmados_0_9_f,confirmados_0_9_m,confirmados_10_19_f,confirmados_10_19_m,confirmados_20_29_f,confirmados_20_29_m,confirmados_30_39_f,confirmados_30_39_m,confirmados_40_49_f,confirmados_40_49_m,confirmados_50_59_f,confirmados_50_59_m,confirmados_60_69_f,confirmados_60_69_m,confirmados_70_79_f,confirmados_70_79_m,confirmados_80_plus_f,confirmados_80_plus_m,sintomas_tosse,sintomas_febre,sintomas_dificuldade_respiratoria,sintomas_cefaleia,sintomas_dores_musculares,sintomas_fraqueza_generalizada,confirmados_f,confirmados_m,obitos_arsnorte,obitos_arscentro,obitos_arslvt,obitos_arsalentejo,obitos_arsalgarve,obitos_acores,obitos_madeira,obitos_estrangeiro\r\n26/02/2020,26/02/2020 00:00,0,0,0,0,0,0,0,0,,0,0,0,,,,25,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,0,0,0,0,0,0,0\r\n27/02/2020,27/02/2020 00:00,0,0,0,0,0,0,0,0,,0,0,0,,,,51,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,0,0,0,0,0,0,0\r\n28/02/2020,28/02/2020 00:00,0,0,0,0,0,0,0,0,,0,0,0,,,,59,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,0,0,0,0,0,0,0\r\n29/02/2020,29/02/2020 00:00,0,0,0,0,0,0,0,0,,0,0,0,,,,70,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,0,0,0,0,0,0,0\r\n01/03/2020,01/03/2020 00:00,0,0,0,0,0,0,0,0,,0,0,0,,,,85,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,0,0,0,0,0,0,0\r\n02/03/2020,02/03/2020 00:00,2,2,0,0,0,0,0,0,,2,0,0,,,,85,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,0,0,0,0,0,0,0\r\n03/03/2020,03/03/2020 16:00,4,2,1,1,0,0,0,0,,2,0,0,,,,101,,,,2,0,0,0,0,0,0,0,2,0,1,0,0,0,1,0,0,0,0,0.5,0.5,,0.25,0.5,0.25,,,0,0,0,0,0,0,0,0\r\n04/03/2020,04/03/2020 17:00,6,3,1,2,0,0,0,0,,2,0,0,,,,117,81,,,4,0,0,0,0,0,0,0,2,1,2,0,0,0,1,0,0,0,0,0.5,0.83,,0.5,0.5,0.17,,,0,0,0,0,0,0,0,0\r\n05/03/2020,05/03/2020 17:00,9,5,1,3,0,0,0,0,,3,0,0,9,,,147,213,,,5,0,0,0,0,0,0,0,2,1,3,0,1,0,2,0,0,0,0,0.67,0.89,0.11,0.33,0.56,0.33,,,0,0,0,0,0,0,0,0\r\n06/03/2020,06/03/2020 17:00,13,8,1,4,0,0,0,0,,4,0,0,13,,30,181,354,,5,5,0,0,0,0,0,0,0,2,1,5,0,2,0,2,1,0,0,0,0.62,0.85,0.15,0.23,0.46,0.31,,,0,0,0,0,0,0,0,0\r\n07/03/2020,07/03/2020 17:00,21,15,1,5,0,0,0,0,,8,0,0,21,,47,224,412,,5,5,0,0,1,2,0,1,1,2,2,6,0,2,1,2,1,0,0,0,0.71,0.62,0.14,0.43,0.48,0.43,,,0,0,0,0,0,0,0,0\r\n08/03/2020,08/03/2020 17:30,30,22,1,6,0,1,0,0,,9,0,0,30,,56,281,447,,4,6,0,0,3,2,1,1,1,3,4,6,0,3,1,3,2,0,0,0,0.77,0.6,0.17,0.47,0.57,0.47,,,0,0,0,0,0,0,0,0\r\n09/03/2020,09/03/2020 18:45,39,27,1,9,0,2,0,0,,9,0,0,38,,67,339,496,,6,7,0,0,3,3,1,1,2,4,7,7,1,3,1,3,3,0,0,0,0.69,0.54,0.13,0.46,0.49,0.38,,,0,0,0,0,0,0,0,0\r\n10/03/2020,10/03/2020 10:00,41,27,2,10,0,2,0,0,,2,0,0,40,,83,375,667,,6,8,0,0,3,3,1,1,2,4,7,7,1,3,1,5,3,0,0,0,0.71,0.56,0.15,0.46,0.51,0.41,,,0,0,0,0,0,0,0,0\r\n11/03/2020,11/03/2020 00:00,59,36,3,17,0,3,0,0,,18,0,0,57,,83,471,3066,,6,12,0,1,6,5,1,3,5,4,9,7,1,4,1,5,3,2,0,2,0.66,0.47,0.1,0.42,0.46,0.31,,,0,0,0,0,0,0,0,0\r\n12/03/2020,12/03/2020 00:00,78,44,5,23,0,5,0,0,1,19,0,0,69,,133,637,4923,,6,19,0,1,7,5,1,6,6,8,10,11,1,8,1,6,3,2,0,2,0.65,0.46,0.1,0.37,0.4,0.24,,,0,0,0,0,0,0,0,0\r\n13/03/2020,13/03/2020 00:00,112,53,6,46,0,6,0,0,1,34,0,0,107,,172,1308,5674,,11,33,0,1,10,5,3,8,9,15,14,14,2,12,3,8,3,3,0,2,0.65,0.48,0.12,0.39,0.37,0.24,,,0,0,0,0,0,0,0,0\r\n14/03/2020,14/03/2020 00:00,169,77,8,73,0,7,0,0,4,57,1,0,114,10,126,1704,5011,,11,39,0,1,13,6,7,12,17,20,19,22,5,21,3,9,4,7,1,2,0.54,0.39,0.1,0.33,0.34,0.21,,,0,0,0,0,0,0,0,0\r\n15/03/2020,15/03/2020 00:00,245,103,10,116,0,10,1,0,5,76,2,0,139,9,281,2271,4592,1746,14,47,0,1,17,8,12,16,25,30,27,26,16,27,6,12,5,12,3,2,0.53,0.31,0.09,0.19,0.18,0.13,,,0,0,0,0,0,0,0,0\r\n16/03/2020,16/03/2020 00:00,331,138,31,142,0,13,1,0,5,86,3,0,139,18,374,2908,4592,2203,18,47,2,1,17,10,17,21,30,35,32,36,21,31,11,26,10,18,8,4,0.53,0.31,0.09,0.19,0.18,0.13,,,0,0,0,0,0,0,0,0\r\n17/03/2020,17/03/2020 00:00,448,196,51,180,0,14,1,0,6,117,3,1,206,17,323,4030,6852,3259,19,61,2,1,19,13,21,34,37,51,47,46,32,41,18,34,13,22,12,5,0.33,0.27,0.1,0.17,0.19,0.14,,,0,0,1,0,0,0,0,0\r\n18/03/2020,18/03/2020 00:00,642,289,74,243,2,21,3,1,9,194,3,1,89,20,351,5067,6656,4074,24,62,13,3,21,15,42,45,55,62,75,63,50,42,49,28,32,17,11,19,0.31,0.24,0.1,0.17,0.17,0.12,,,0,0,1,0,0,0,0,0\r\n19/03/2020,19/03/2020 00:00,785,381,86,278,2,25,3,1,9,143,3,3,89,20,488,6061,8091,4788,24,71,14,3,22,17,51,51,75,71,89,78,60,61,35,61,23,36,21,17,0.25,0.2,0.08,0.14,0.14,0.1,390,395,0,1,2,0,0,0,0,0\r\n20/03/2020,20/03/2020 00:00,1020,506,106,361,2,29,3,1,9,235,5,6,126,26,850,7732,9008,5862,24,95,14,4,23,21,65,61,92,95,106,90,90,84,53,79,35,55,27,25,0.2,0.15,0.06,0.11,0.11,0.08,506,514,1,2,2,0,1,0,0,0\r\n21/03/2020,21/03/2020 00:00,1280,644,137,448,3,31,3,5,9,260,5,12,156,35,1059,9854,13155,7515,,104,14,4,27,22,89,68,118,116,133,109,113,101,75,105,42,71,38,35,0.1,0.22,0.09,0.14,0.17,0.11,649,631,4,4,3,0,1,0,0,0\r\n22/03/2020,22/03/2020 00:00,1600,825,180,534,5,35,4,7,10,320,5,14,169,41,1152,11779,12562,9027,,114,17,6,31,26,105,82,148,140,173,141,154,128,91,122,51,90,51,44,0.44,0.36,0.14,0.2,0.24,0.16,821,779,5,4,4,0,1,0,0,0\r\n23/03/2020,23/03/2020 00:00,2060,1007,238,737,5,42,11,9,11,460,14,23,201,47,1402,13674,11842,10212,,142,18,7,36,30,140,100,181,166,226,178,194,167,127,167,73,107,85,58,0.72,0.6,0.23,0.34,0.42,0.28,1080,980,9,5,8,0,1,0,0,0\r\n24/03/2020,24/03/2020 00:00,2362,1130,293,852,6,46,12,11,11,302,22,30,203,48,1783,15474,11842,11329,,142,13,11,35,30,145,133,206,188,224,224,215,208,190,158,106,108,95,73,0.70,0.58,0.24,0.34,0.42,0.27,1229,1133,9,11,8,0,1,1,0,0\r\n";
let data = papa.parse(raw_data).data;

data = data.slice(6, data.length - 1);
let infections = data.map(arr => parseInt(arr[2]));

let infectionRate = infections.map((_, i) => {
    return i !== infections.length - 1 ? infections.slice(i, i+2).reduce((a, b) => {
        return Number(Math.round((1 + (b-a) / a) + 'e2') + 'e-2');
    }) : null;
});

const DAYS_FOR_AVERAGING = 2;
console.log(infectionRate)
infectionRate = infections.map((_, i) => infectionRate.slice(i-DAYS_FOR_AVERAGING, i).reduce((a, b) => a + b, 0));
infectionRate = infectionRate.map(a => Math.round(a/DAYS_FOR_AVERAGING * 1000) / 1000);
infectionRate = infectionRate.map(a => a == 0 ? null : a);
console.log(infectionRate)

const prediction = infectionRate.map((e, i) => {
    return e !== null ? Math.round(e * infections[i]) : null;
});

prediction.unshift(null);

const firstInfection = new Date('March 2 2020');

const labels = Array.apply(null, Array(infections.length + 6)).map((e, i) => {
    const tomorrow = new Date(firstInfection);
    tomorrow.setDate(tomorrow.getDate() + i);
    return `${tomorrow.getDate()}/${tomorrow.getMonth() + 1}`;
});

document.getElementById('ep_factor_value').innerHTML = `${infectionRate[Math.round(infectionRate.length - 1)]}`;
document.getElementById('ep_factor_day').innerHTML = labels[infections.length - 1]

var ctx = document.getElementById('chart').getContext('2d');
let chart = graph(ctx, infections, prediction, labels);

document.getElementById('region').onchange = () => {
    const element = document.getElementById('region');
    chart.data.datasets[0]['data'] = data.map(arr => parseInt(arr[element.selectedIndex + 2]));

    if (chart.data.datasets.length > 1) {
        if (element.value !== 'Geral') {
            chart.data.datasets.pop();
        }
    } else {
        if (element.value == 'Geral') {
            chart.data.datasets.push({
                label: 'Previsão',
                borderColor: '#E3E3E3',
                data: prediction,
                borderWidth: 2,
                borderDash: [10, 5],
                fill: false
            })
        }
    }

    chart.update();
}
},{"papaparse":1}]},{},[2]);
