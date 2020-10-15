(this.webpackJsonpartmosaico=this.webpackJsonpartmosaico||[]).push([[0],{23:function(e,t,n){e.exports=n(38)},28:function(e,t,n){},29:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(20),c=n.n(r),l=n(8),s=n(1);n(28),n(29);function o(){return i.a.createElement("div",{className:"homeContainer"},i.a.createElement("div",{className:"homeLinks"},i.a.createElement(l.b,{to:"/make"},"Make"),i.a.createElement(l.b,{to:"/play"},"Play")))}var u=n(7),h=n(15),f=n.n(h),m=n(22),v=n(9),p=n(3),d=(n(36),n(16)),z=n(17),k=function(){function e(t,n,a){Object(d.a)(this,e),this.pixels=t,this.width=n,this.height=a}return Object(z.a)(e,[{key:"_generateHints",value:function(e){return this._initializeCells(),"success"===this._refineHints()?(e(),this._extractHints()):{}}},{key:"generateHints",value:function(){return this._generateHints((function(){}))}},{key:"generateRefinedHints",value:function(){var e=this;return this._generateHints((function(){return e._removeUnnecessaryHints()}))}},{key:"getCell",value:function(e,t){return e>=0&&t>=0&&e<this.height&&t<this.width?this._cells[e*this.width+t]:null}},{key:"_initializeCells",value:function(){this._cells=[];for(var e=0;e<this.height;e++)for(var t=0;t<this.width;t++)this._cells.push(new E({row:e,column:t,board:this,shouldPaint:b(this.pixels,e,t)}));this._cells.forEach((function(e){return e.initialize()}))}},{key:"_refineHints",value:function(){for(var e=0;;){e++;var t=this._cells.filter((function(e){return e.canBeSolved()}));if(this._cells.filter((function(e){return e.isSolved()})).length===this._cells.length)return"success";if(0===t.length)return"impossible";if(e>1e4)return"impossible";t[Math.floor(Math.random()*t.length)].solve()}}},{key:"_removeUnnecessaryHints",value:function(){var e=this;this._cells.filter((function(e){return e._needsHint})).forEach((function(t){return e._attemptToRemoveHint(t)}))}},{key:"_attemptToRemoveHint",value:function(e){e._needsHint=!1,this._cells.forEach((function(e){return e.clear()}));for(var t=null;!t;){var n=this._cells.find((function(e){return e._needsHint&&e.canBeSolved()}));console.log("checking",n),n&&n.solve();var a=this._cells.filter((function(e){return e.isSolved()})).length,i=this._cells.filter((function(e){return e._needsHint&&e.canBeSolved()})).length;console.log("solved: "+a+"; canBeSolved: "+i+"; total: "+this._cells.length),a===this._cells.length?t="success":0===i&&(t="impossible")}"impossible"===t&&(e._needsHint=!0)}},{key:"_extractHints",value:function(){var e={};return this._cells.forEach((function(t){e[t.row]||(e[t.row]={}),e[t.row][t.column]=t.extractSolvedHint()})),e}}]),e}();function b(e,t,n){return(e[t]||{})[n]||!1}var E=function(){function e(t){var n=t.row,a=t.column,i=t.board,r=t.shouldPaint;Object(d.a)(this,e),this.row=n,this.column=a,this.board=i,this.shouldPaint=r,this._hint=null,this._needsHint=!1,this._state="blank",this._vicinity=[]}return Object(z.a)(e,[{key:"initialize",value:function(){this._initializeVicinity(),this._initializeHint()}},{key:"_initializeVicinity",value:function(){for(var e=this.row-1;e<=this.row+1;e++)for(var t=this.column-1;t<=this.column+1;t++){var n=this.board.getCell(e,t);n&&this._vicinity.push(n)}}},{key:"_initializeHint",value:function(){this._hint=this._vicinity.filter((function(e){return e.shouldPaint})).length}},{key:"canBeSolved",value:function(){if(this.isSolved())return!1;var e=this._vicinity.filter((function(e){return e.isCrossed()})),t=this._vicinity.filter((function(e){return e.isPainted()}));return this._vicinity.length-e.length===this._hint||t.length===this._hint}},{key:"isSolved",value:function(){return 0===this._vicinity.filter((function(e){return e.isBlank()})).length}},{key:"solve",value:function(){if(!this.canBeSolved())throw console.log("cannot solve cell",this),new Error("Attempted to solve an impossible cell",this);this._needsHint=!0;var e=this._vicinity.filter((function(e){return e.isPainted()})),t=this._vicinity.filter((function(e){return e.isBlank()}));this._hint===e.length?t.forEach((function(e){return e.cross()})):t.forEach((function(e){return e.paint()}))}},{key:"paint",value:function(){this._state="painted"}},{key:"cross",value:function(){this._state="crossed"}},{key:"clear",value:function(){this._state="blank"}},{key:"isPainted",value:function(){return"painted"===this._state}},{key:"isCrossed",value:function(){return"crossed"===this._state}},{key:"isBlank",value:function(){return"blank"===this._state}},{key:"extractSolvedHint",value:function(){return this._needsHint?this._hint:null}}]),e}();function g(e){var t=e.width,n=e.height,a=e.hints,r=e.pixels,c=e.onChangeHints,s=e.onChangePixels,o=e.onChangeSize,u=e.onClear;function h(e,t,n){return!!(e[t]?e[t]:{})[n]}function d(e,t){var n=a[e]?a[e]:{};return"number"===typeof n[t]?n[t]:""}var z=function(e,t){return function(n){n.preventDefault(),o({width:e,height:t})}};function b(){return(b=Object(m.a)(f.a.mark((function e(){var i;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=O(a,t,n),e.prev=1,e.next=4,navigator.clipboard.writeText(i);case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(1),window.prompt("Copy the game code below",i);case 9:case"end":return e.stop()}}),e,null,[[1,6]])})))).apply(this,arguments)}return i.a.createElement("div",{className:"puzzleMaker"},i.a.createElement("div",{className:"puzzleMaker-floatingAction"},i.a.createElement(l.b,{to:"/"},"Back")),i.a.createElement("div",{className:"puzzleMaker-controls"},i.a.createElement("div",{className:"puzzleMaker-sizes"},i.a.createElement("label",null,"Change puzzle size"),i.a.createElement("button",{className:"puzzleMaker-sizeButton",onClick:z(5,5)},"5x5"),i.a.createElement("button",{className:"puzzleMaker-sizeButton",onClick:z(10,10)},"10x10"),i.a.createElement("button",{className:"puzzleMaker-sizeButton",onClick:z(10,15)},"10x15"),i.a.createElement("button",{className:"puzzleMaker-sizeButton",onClick:z(15,10)},"15x10"),i.a.createElement("button",{className:"puzzleMaker-sizeButton",onClick:z(15,15)},"15x15"),i.a.createElement("button",{className:"puzzleMaker-sizeButton",onClick:z(15,20)},"15x20"),i.a.createElement("button",{className:"puzzleMaker-sizeButton",onClick:z(20,15)},"20x15"),i.a.createElement("button",{className:"puzzleMaker-sizeButton",onClick:z(20,20)},"20x20"),i.a.createElement("button",{className:"puzzleMaker-sizeButton",onClick:z(20,25)},"20x25"),i.a.createElement("button",{className:"puzzleMaker-sizeButton",onClick:z(25,20)},"25x20"),i.a.createElement("button",{className:"puzzleMaker-sizeButton",onClick:z(25,25)},"25x25")),i.a.createElement("button",{className:"puzzleMaker-reset",onClick:u},"Reset"),i.a.createElement("button",{className:"puzzleMaker-optimize",onClick:function(){var e=new k(r,t,n).generateRefinedHints();c(e)}},"Optimize Hints")),i.a.createElement("div",{className:"puzzleMaker-maker"},i.a.createElement("div",{className:"puzzleMaker-board"},function(){for(var e=[],a=function(a){for(var l=[],o=function(e){var o=i.a.createElement(_,{key:"c".concat(e,"x").concat(a),painted:h(r,a,e),hint:d(a,e),onClick:function(){return function(e,a){var i=r[e]?r[e]:{},l=Object(p.a)(Object(p.a)({},r),{},Object(v.a)({},e,Object(p.a)(Object(p.a)({},i),{},Object(v.a)({},a,!h(r,e,a))))),o=new k(l,t,n).generateHints();s(l),c(o)}(a,e)}});l.push(o)},u=0;u<t;u++)o(u);e.push(l),e.push(i.a.createElement(y,{key:"separator-".concat(a)}))},l=0;l<n;l++)a(l);return e}()),i.a.createElement("div",{className:"puzzleMaker-gameCode",onClick:function(){return b.apply(this,arguments)},title:"click to copy"},i.a.createElement("p",null,O(a,t,n)))))}function y(){return i.a.createElement("div",{className:"puzzleMaker-rowSeparator"})}function _(e){var t=e.painted,n=e.hint,a=e.onClick;return i.a.createElement("div",{onClick:a,className:"puzzleMaker-cell ".concat(t?"--painted":"")},n)}function O(e,t,n){var a="".concat(t,"x").concat(n,":"),i=[].concat.apply([],Object.values(e).map((function(e){return Object.values(e)}))).reduce((function(e,t){var n=Object(u.a)(e,2),a=n[0],i=n[1];return null===t?[a,i+1]:i>0?["".concat(a,"(").concat(i,")").concat(t),0]:["".concat(a).concat(t),0]}),["",0]);return a+Object(u.a)(i,1)[0]}function w(){var e=Object(a.useState)({}),t=Object(u.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)({}),l=Object(u.a)(c,2),s=l[0],o=l[1],h=Object(a.useState)({width:5,height:5}),f=Object(u.a)(h,2),m=f[0],v=f[1];return Object(a.useEffect)((function(){var e=function(){try{return JSON.parse(window.sessionStorage.puzzleMaker)}catch(e){return{hints:{},pixels:{},size:{width:5,height:5}}}}();r(e.pixels),o(e.hints),v(e.size)}),[]),Object(a.useEffect)((function(){window.sessionStorage.puzzleMaker=JSON.stringify({pixels:n,hints:s,size:m})}),[s,n,m]),i.a.createElement(g,{width:m.width,height:m.height,hints:s,pixels:n,onChangeHints:o,onChangePixels:r,onChangeSize:v,onClear:function(){return r({}),void o({})}})}n(37);function x(e){var t=e.hints,n=e.pixels,a=e.onChangePixels,r=e.onReset,c=e.onExit,l=e.width,s=e.height,o=function(e,t){return function(i){i.preventDefault();var r=["blank","painted","crossed"],c=n[e][t],l=r[(r.indexOf(c)+1)%r.length];a(Object(p.a)(Object(p.a)({},n),{},Object(v.a)({},e,Object(p.a)(Object(p.a)({},n[e]),{},Object(v.a)({},t,l)))))}};return i.a.createElement("div",{className:"puzzlePlayer"},i.a.createElement("div",{className:"puzzlePlayer-controls"},i.a.createElement("button",{className:"puzzlePlayer-resetButton",onClick:r},"Reset"),i.a.createElement("button",{className:"puzzlePlayer-backButton",onClick:c},"Back")),i.a.createElement("div",{className:"puzzlePlayer-player ".concat(l>=20||s>=20?"--small":"")},i.a.createElement("div",{className:"puzzlePlayer-board"},function(){for(var e=[],a=0;a<s;a++){for(var r=[],c=0;c<l;c++){var u=i.a.createElement("div",{className:"puzzlePlayer-cell --".concat(n[a][c]),onClick:o(a,c),key:"c".concat(c,"x").concat(a)},t[a][c]);r.push(u)}e.push(r),e.push(i.a.createElement("div",{className:"puzzlePlayer-separator",key:"separator-".concat(a)}))}return e}())))}function N(){var e=Object(a.useState)(null),t=Object(u.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)("10x10:(1)0(2)0(1)0(2)0(1)0(2)2(3)0(1)0(2)45(2)42(6)9(10)6(4)0(1)2(5)0(4)4(6)12(2)23(2)10(2)1(2)11(3)0(2)0(2)0(1)0"),s=Object(u.a)(c,2),o=s[0],h=s[1];return Object(a.useEffect)((function(){var e=function(){try{return JSON.parse(window.sessionStorage.puzzlePlayer)}catch(e){return console.log(e),{game:null}}}();r(e.game)}),[]),Object(a.useEffect)((function(){window.sessionStorage.puzzlePlayer=JSON.stringify({game:n})}),[n]),n?i.a.createElement(x,Object.assign({},n,{onChangePixels:function(e){return r(Object(p.a)(Object(p.a)({},n),{},{pixels:e}))},onReset:function(){return r(Object(p.a)(Object(p.a)({},n),{},{pixels:C(n.width,n.height)}))},onExit:function(){return r(null)}})):i.a.createElement("div",null,i.a.createElement("nav",{className:"enterGame-navigation"},i.a.createElement(l.b,{to:"/"},"Back")),i.a.createElement("div",{className:"enterGameContainer"},i.a.createElement("p",{className:"enterGame-text"},"Enter game code"),i.a.createElement("input",{className:"enterGame-input",value:o,onChange:function(e){return h(e.target.value)},type:"text"}),i.a.createElement("button",{className:"enterGame-button",onClick:function(){try{var e=function(e){var t=e.match(/(\d+)x(\d+):(.*)/),n=Number(t[1]),a=Number(t[2]),i=t[3],r=[],c="hint",l="";i.split("").forEach((function(e){if("("===e)c="skips";else if(")"===e){for(var t=0;t<Number(l);t++)r.push("");c="hint",l=""}else"hint"===c?r.push(e):"skips"===c&&(l+=e)}));for(var s=[],o=0;o<a;o++){s.push([]);for(var u=0;u<n;u++){var h=o*n+u,f=void 0===r[h]?"":r[h];s[o].push(f)}}return{width:n,height:a,hints:s}}(o),t=e.width,n=e.height,a=e.hints;r({width:t,height:n,hints:a,pixels:C(t,n)})}catch(i){alert("invalid game code")}}},"Start")))}function C(e,t){for(var n=[],a=0;a<t;a++){n.push([]);for(var i=0;i<e;i++)n[a].push("blank")}return n}var j=function(){return i.a.createElement(l.a,null,i.a.createElement(s.c,null,i.a.createElement(s.a,{path:"/make"},i.a.createElement(w,null)),i.a.createElement(s.a,{path:"/play"},i.a.createElement(N,null)),i.a.createElement(s.a,{path:"/"},i.a.createElement(o,null))))};c.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(j,null)),document.getElementById("root"))}},[[23,1,2]]]);
//# sourceMappingURL=main.410558a2.chunk.js.map