(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{148:function(e){e.exports=JSON.parse('[{"emoji":"\ud83d\udc4f","id":"clap"},{"emoji":"\ud83d\ude02","id":"laugh"},{"emoji":"\ud83c\udf45","id":"boo"}]')},308:function(e,n,t){},548:function(e,n,t){"use strict";t.r(n);var i=t(1),r=t(0),o=t.n(r),c=t(14),a=t.n(c),s=(t(308),t(98)),l=t(18),u=t(17),d=t(11),j=t(12),b=t(554),v=t(298),x=t(555),O=t(105),f=t(301),p=t(33),h=t(275),m={r:255,g:0,b:0,a:100},g={currentPresentation:-1,presentations:[],reactions:{},users:[],resultsVisible:!1},y={socket:void 0,startConnection:function(){},nickname:"",setNickname:function(){},setUserColor:function(){},userColor:m,roomState:g,getIsAdmin:function(){return!1}},C=Object(r.createContext)(y),w=function(e){var n=e.children,t=Object(r.useState)(),o=Object(u.a)(t,2),c=o[0],a=o[1],s=Object(r.useState)(""),l=Object(u.a)(s,2),d=l[0],j=l[1],b=Object(r.useState)(m),v=Object(u.a)(b,2),x=v[0],O=v[1],y=Object(r.useState)(g),w=Object(u.a)(y,2),k=w[0],S=w[1];Object(r.useEffect)((function(){null===c||void 0===c||c.on("stateUpdate",(function(e){S(e),console.log("Data",e)})),null===c||void 0===c||c.on("addPresentation",(function(e){S(Object(p.a)(Object(p.a)({},k),{},{presentations:[].concat(Object(f.a)(k.presentations),[{name:e,reactions:{}}])}))})),null===c||void 0===c||c.on("setActivePresentation",(function(e){S(Object(p.a)(Object(p.a)({},k),{},{currentPresentation:e}))})),null===c||void 0===c||c.on("showResults",(function(){S(Object(p.a)(Object(p.a)({},k),{},{resultsVisible:!0}))}))}),[c]);return Object(i.jsx)(C.Provider,{value:{socket:c,startConnection:function(e){var n=Object(h.io)("",{query:{room:e,user:d,color:JSON.stringify(x)}});a(n)},nickname:d,setNickname:j,userColor:x,setUserColor:O,roomState:k,getIsAdmin:function(){var e=((null===k||void 0===k?void 0:k.users)||[]).find((function(e){return e.isAdmin}));return!!e&&e.user===d}},children:n})},k=t(295);function S(){var e=Object(d.a)(["\n  width: 36px;\n  height: 14px;\n  border-radius: 2px;\n"]);return S=function(){return e},e}function T(){var e=Object(d.a)(["\n  position: fixed;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n"]);return T=function(){return e},e}function P(){var e=Object(d.a)(["\n  position: absolute;\n  z-index: 2;\n  background-color: white;\n"]);return P=function(){return e},e}function A(){var e=Object(d.a)(["\n  padding: 5px;\n  background: #fff;\n  border-radius: 1px;\n  box-shadow: 0 0 0 1px rgba(0,0,0,.1);\n  display: inline-block;\n  cursor: pointer;\n"]);return A=function(){return e},e}var E=j.a.div(A()),F=j.a.div(P()),N=j.a.div(T()),I=j.a.div.attrs((function(e){var n=e.userColor,t=n.r,i=n.g,r=n.b,o=n.a;return{style:{backgroundColor:"rgba(".concat(t,",").concat(i,",").concat(r,",").concat(o,")")}}}))(S());function U(e){var n=e.userColor,t=e.setUserColor,o=Object(r.useState)(!1),c=Object(u.a)(o,2),a=c[0],s=c[1];return Object(i.jsxs)("div",{style:{position:"relative"},children:[Object(i.jsx)(E,{onClick:function(){return s(!a)},children:Object(i.jsx)(I,{userColor:n})}),a?Object(i.jsxs)(F,{children:[Object(i.jsx)(N,{onClick:function(){return s(!1)}}),Object(i.jsx)(k.a,{color:n,onChange:function(e){return t(e.rgb)}})]}):null]})}function V(){var e=Object(d.a)(["\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n"]);return V=function(){return e},e}function R(){var e=Object(d.a)(["\n    display: flex;\n    flex-direction: column;\n    margin: 12px 0;\n"]);return R=function(){return e},e}var z=b.a.Title,D=function(){var e=Object(r.useContext)(C),n=e.nickname,t=e.setNickname,o=e.userColor,c=e.setUserColor;return Object(i.jsxs)(L,{children:[Object(i.jsx)(z,{level:5,style:{margin:0,padding:0},children:"Write your name and pick color"}),Object(i.jsxs)(Y,{children:[Object(i.jsx)(x.a,{placeholder:"Nickname",value:n,onChange:function(e){var n=e.target.value;n?t(n):v.a.warning({message:">:C",description:"You need to provide a nickname!!!"})},style:{margin:"8px 12px 8px 0",color:"rgba(".concat(o.r,",").concat(o.g,",").concat(o.b,",").concat(o.a,")")}}),Object(i.jsx)(U,{userColor:o,setUserColor:c})]})]})},L=j.a.div(R()),Y=j.a.div(V());function B(){var e=Object(d.a)(["\n    display: flex;\n    flex-direction: column;\n    min-width: 400px;\n"]);return B=function(){return e},e}function J(){var e=Object(d.a)(["\n    width: 100vw;\n    height: 100vh;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    background-color: white;\n"]);return J=function(){return e},e}var M=b.a.Title,W=b.a.Text,q=j.a.div(J()),H=j.a.div(B());function G(){return Object(i.jsx)(q,{children:Object(i.jsx)(K,{})})}function K(){var e=Object(l.f)(),n=Object(r.useContext)(C).nickname,t=Object(r.useState)(""),o=Object(u.a)(t,2),c=o[0],a=o[1];return Object(i.jsxs)(H,{children:[Object(i.jsx)(M,{level:2,style:{fontWeight:600},children:"Helloooooooo"}),Object(i.jsx)(D,{}),Object(i.jsxs)(L,{children:[Object(i.jsx)(M,{level:5,style:{margin:0,padding:0},children:"Enter room name"}),Object(i.jsx)(W,{style:{margin:0,padding:0},children:"Should be unique!"}),Object(i.jsx)(x.a,{placeholder:"Room name",value:c,onChange:function(e){a(e.target.value)},style:{margin:"8px 0"}})]}),Object(i.jsx)(L,{children:Object(i.jsx)(O.a,{type:"primary",onClick:function(){if((null===n||void 0===n?void 0:n.length)&&(null===c||void 0===c?void 0:c.length)){v.a.success({message:"Yay!",description:'You successfully joined a "'.concat(c.toUpperCase(),'" room!')});var t=c.replace(" ","");e.push("/room/".concat(t))}else{var i=[];(null===n||void 0===n?void 0:n.length)||i.push("nickname"),(null===c||void 0===c?void 0:c.length)||i.push("room name"),v.a.warning({message:"Couldn't proceed",description:"You need to provide ".concat(i.join(" and ")," to be able to proceed!")})}},children:"Login"})})]})}var Q=t(292),X=t.n(Q);t(450);function Z(){var e=Object(d.a)(["\n  display: flex;\n\n  > * {\n    flex-grow: ",";\n  }\n"]);return Z=function(){return e},e}var $=j.a.div.attrs((function(e){var n=e.row,t=e.column,i=e.justify,r=e.align,o=e.style,c=Object(p.a)({},o);return n&&(c.flexDirection="row"),t&&(c.flexDirection="column"),i&&(c.justifyContent="center"),r&&(c.alignItems="center"),{style:c}}))(Z(),(function(e){return e.grow?1:"unset"})),_=t(148);function ee(){var e=Object(d.a)(["\n    display: flex;\n    flex-direction: row;\n"]);return ee=function(){return e},e}var ne=j.a.div(ee());function te(e){var n,t=(null!==(n=Object.entries(e.reactions).map((function(e){return{id:e[0],number:e[1]}})))&&void 0!==n?n:[]).map((function(e){var n,t=null===(n=_.find((function(n){return n.id===e.id})))||void 0===n?void 0:n.emoji;return Object(i.jsxs)($,{row:!0,style:{margin:"0 4px"},children:[t," ",null===e||void 0===e?void 0:e.number]})}));return Object(i.jsx)(ne,{children:t})}function ie(){var e=Object(d.a)(["\n    background: #FFFFFF;\n    border: 1px solid #E8E8E8;\n    box-sizing: border-box;\n    border-radius: 8px;\n    width: 100%;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    padding: 40px;\n"]);return ie=function(){return e},e}var re=b.a.Title,oe=j.a.div(ie());function ce(e){var n,t,o=e.winner,c=Object(r.useContext)(C).roomState,a=null!==(n=null===c||void 0===c||null===(t=c.presentations[null===c||void 0===c?void 0:c.currentPresentation])||void 0===t?void 0:t.name)&&void 0!==n?n:"404 PRESENTATION NOT FOUND";return c.resultsVisible?Object(i.jsxs)(oe,{children:[Object(i.jsxs)(re,{level:1,children:["WINNER IS: ",o," \ud83c\udfc6\ud83c\udfc6\ud83c\udfc6\ud83c\udfc6"]}),Object(i.jsx)(re,{level:5,children:"Nicely done \ud83d\udd25"})]}):Object(i.jsxs)(oe,{children:[Object(i.jsx)(re,{level:1,children:a}),Object(i.jsx)(re,{level:5,children:"Share your reactions \ud83d\udd25"})]})}var ae=t(297);function se(){var e=Object(r.useContext)(C).socket,n=_.map((function(n){return Object(i.jsx)("div",{style:{margin:"20px"},onClick:function(){return t=n.id,console.log("hi"),void(null===e||void 0===e||e.emit("reaction",{type:t}));var t},children:Object(i.jsx)(ae.a,{size:100,iconComponent:function(){return Object(i.jsx)("h1",{style:{fontSize:"50px",marginBottom:"10px"},children:n.emoji})}})})}));return Object(i.jsx)($,{row:!0,justify:!0,align:!0,style:{padding:"50px"},children:n})}function le(){var e=Object(d.a)(["\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    padding: 4px 8px;\n    border-radius: 8px;\n    margin: 0 4px;\n    font-weight: bold;\n    color: white;\n    background: ",";\n"]);return le=function(){return e},e}var ue=b.a.Title,de=function(e){return"rgba(".concat(e.r,",").concat(e.g,",").concat(e.b,",").concat(e.a,")")},je=j.a.div(le(),(function(e){var n=e.userColor;return n.r?de(n):de(m)}));function be(){var e=Object(r.useContext)(C).roomState;return Object(i.jsxs)($,{column:!0,children:[Object(i.jsxs)($,{row:!0,align:!0,style:{position:"sticky",justifyContent:"flex-start",margin:"4px 0"},children:[Object(i.jsx)(ue,{level:5,style:{margin:0},children:"Admins:"}),null===e||void 0===e?void 0:e.users.filter((function(e){return e.isAdmin})).map((function(e){return Object(i.jsxs)(je,{userColor:e.color||m,children:["@",e.user]},e.id)}))]}),Object(i.jsxs)($,{row:!0,align:!0,style:{position:"sticky",justifyContent:"flex-start",margin:"4px 0"},children:[Object(i.jsx)(ue,{level:5,style:{margin:0},children:"Online now:"}),null===e||void 0===e?void 0:e.users.filter((function(e){return!e.isAdmin})).map((function(e){return Object(i.jsxs)(je,{userColor:e.color||m,children:["@",e.user]},e.id)}))]})]})}var ve=t(57),xe=t.n(ve);function Oe(){var e=Object(r.useContext)(C).roomState,n=e.soundLevel,t=void 0===n?{clap:0,laugh:0}:n,o=e.users,c=e.resultsVisible,a=Object(r.useState)(!1),s=Object(u.a)(a,2),l=s[0],d=s[1],j=Object(r.useState)(!1),b=Object(u.a)(j,2),v=b[0],x=b[1],O=Object(r.useState)(!1),f=Object(u.a)(O,2),p=f[0],h=f[1],m=Object(r.useState)(!1),g=Object(u.a)(m,2),y=g[0],w=g[1],k=Object(r.useState)(!1),S=Object(u.a)(k,2),T=S[0],P=S[1],A=Object(r.useState)(!1),E=Object(u.a)(A,2),F=E[0],N=E[1],I=Object(r.useState)(!1),U=Object(u.a)(I,2),V=U[0],R=U[1],z=Object(r.useState)(!1),D=Object(u.a)(z,2),L=D[0],Y=D[1];return Object(r.useEffect)((function(){var e=t.clap,n=t.laugh,i=o.length,r=Math.min(1,e/(2*i)),c=Math.min(1,n/(2*i));r>0&&!l?(d(!0),setTimeout((function(){d(!1)}),8e3)):r>=.25&&!v?(x(!0),setTimeout((function(){x(!1)}),6e3)):r>=.5&&!p?(h(!0),setTimeout((function(){h(!1)}),6e3)):.75!==r||y||(w(!0),setTimeout((function(){w(!1)}),9e3)),c>0&&!T?(P(!0),setTimeout((function(){P(!1)}),3e3)):c>=.25&&!F?(N(!0),setTimeout((function(){N(!1)}),5e3)):c>=.5&&!V?(R(!0),setTimeout((function(){R(!1)}),11e3)):.75!==c||L||(Y(!0),setTimeout((function(){Y(!1)}),9e3))}),[l,v,p,y,T,F,V,L,t,o.length]),Object(i.jsxs)("div",{children:[l&&Object(i.jsx)(xe.a,{src:"/applause-01.mp3",autoPlay:!0}),v&&Object(i.jsx)(xe.a,{src:"/applause-02.mp3",autoPlay:!0}),p&&Object(i.jsx)(xe.a,{src:"/applause-03.mp3",autoPlay:!0}),(c||y)&&Object(i.jsx)(xe.a,{src:"/applause-04.mp3",autoPlay:!0}),T&&Object(i.jsx)(xe.a,{src:"/laugh-01.mp3",autoPlay:!0}),F&&Object(i.jsx)(xe.a,{src:"/laugh-02.mp3",autoPlay:!0}),V&&Object(i.jsx)(xe.a,{src:"/laugh-03.mp3",autoPlay:!0}),L&&Object(i.jsx)(xe.a,{src:"/clap.mp3",autoPlay:!0}),c&&Object(i.jsx)(xe.a,{src:"/music.mp3",autoPlay:!0})]})}var fe=t(293),pe=t.n(fe);function he(){var e=Object(d.a)(["\n    padding: 40px;\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n"]);return he=function(){return e},e}var me=b.a.Title,ge=b.a.Text,ye=j.a.div(he());function Ce(){var e,n,t,o,c,a=Object(l.g)().roomid,s=Object(r.useContext)(C).roomState,u=null===s||void 0===s?void 0:s.presentations[null!==(e=null===s||void 0===s?void 0:s.currentPresentation)&&void 0!==e?e:0],d=null!==(n=null===u||void 0===u?void 0:u.reactions)&&void 0!==n?n:{},j=null!==(t=null===s||void 0===s?void 0:s.presentations.map((function(e){var n,t,i=null!==(t=(null!==(n=Object.values(e.reactions))&&void 0!==n?n:[]).reduce((function(e,n){return e+n}),0))&&void 0!==t?t:0;return Object(p.a)(Object(p.a)({},e),{},{points:i})})).sort((function(e,n){return n.points-e.points})))&&void 0!==t?t:[];return Object(i.jsxs)(ye,{children:[(null===s||void 0===s?void 0:s.resultsVisible)&&Object(i.jsx)(pe.a,{gravity:.05,run:!!(null===s||void 0===s?void 0:s.resultsVisible),numberOfPieces:400}),Object(i.jsx)(ge,{children:"Room ID:"}),Object(i.jsxs)($,{row:!0,style:{justifyContent:"space-between"},children:[Object(i.jsx)(me,{level:3,children:a}),(null===s||void 0===s?void 0:s.resultsVisible)?Object(i.jsxs)("h3",{children:["Winner is: ",null===(o=j[0])||void 0===o?void 0:o.name," \ud83d\ude80\ud83d\ude80\ud83d\ude80"]}):Object(i.jsx)(te,{reactions:d})]}),Object(i.jsx)(ce,{winner:j[0]?null===(c=j[0])||void 0===c?void 0:c.name:"not yet"}),Object(i.jsx)(se,{}),Object(i.jsx)(be,{}),Object(i.jsx)(Oe,{})]})}var we=t(556),ke=t(92);function Se(){var e=Object(d.a)(["\n    display: flex;\n    flex-direction: row;\n    padding: 12px;\n    border-radius: 12px;\n    margin: 8px 0;\n    cursor: pointer;\n    &:hover {\n        background: white;\n    }\n"]);return Se=function(){return e},e}function Te(){var e=Object(d.a)(["\n    margin: 0;\n    padding: 0;\n    display: flex;\n    flex-direction: column;\n"]);return Te=function(){return e},e}function Pe(){var e=Object(d.a)(["\n    min-width: 32px;\n    min-height: 32px;\n    max-width: 32px;\n    max-height: 32px;\n    border: 2px solid black;\n    border-radius: 20px;\n    background-color: white;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    font-size: 16px;\n    font-weight: bold;\n    padding: 0;\n    margin-right: 8px;\n"]);return Pe=function(){return e},e}var Ae=b.a.Title,Ee=j.a.div.attrs((function(e){var n={};return e.winner&&(n.border="2px solid #E08506"),{style:n}}))(Pe()),Fe=j.a.div(Te()),Ne=j.a.div.attrs((function(e){var n={backround:"transparent"};return e.isActive&&(n.background="#FFF1CC"),{style:n}}))(Se());function Ie(){var e,n,t,o=Object(r.useContext)(C),c=o.roomState,a=o.socket,s=null!==(e=null===c||void 0===c?void 0:c.currentPresentation)&&void 0!==e?e:0,l=null===c||void 0===c?void 0:c.resultsVisible,u=l?null!==(n=null===c||void 0===c?void 0:c.presentations.map((function(e){var n,t,i=null!==(t=(null!==(n=Object.values(e.reactions))&&void 0!==n?n:[]).reduce((function(e,n){return e+n}),0))&&void 0!==t?t:0;return Object(p.a)(Object(p.a)({},e),{},{points:i})})).sort((function(e,n){return n.points-e.points})))&&void 0!==n?n:[]:null!==(t=null===c||void 0===c?void 0:c.presentations)&&void 0!==t?t:[],d=u.map((function(e,n){var t,r,o,c=0===n,u=null!==(t=e.reactions)&&void 0!==t?t:{};return Object(i.jsx)(ke.a,{title:e.name,placement:"left",children:Object(i.jsxs)(Ne,{isActive:n===s,onClick:function(){return e=n,void(null===a||void 0===a||a.emit("setActivePresentation",{presentationIndex:e}));var e},children:[Object(i.jsx)(Ee,{winner:l&&c,children:l&&c?"\ud83c\udfc6":n+1}),Object(i.jsxs)($,{column:!0,children:[Object(i.jsx)(Ae,{level:5,style:{overflow:"hidden"},children:(null===(r=e.name)||void 0===r?void 0:r.length)>30?(null===(o=e.name)||void 0===o?void 0:o.substring(0,27))+"...":e.name}),l&&Object(i.jsx)(te,{reactions:u})]})]})})}));return Object(i.jsx)(Fe,{children:d})}function Ue(){var e=Object(d.a)(["\n    background-color: #FAFAFA;\n    padding: 20px;\n    display: flex;\n    width: 100%;\n    height: 100%;\n    overflow-y: scroll;\n    flex-direction: column;\n    border: 1px solid #E8E8E8;\n"]);return Ue=function(){return e},e}var Ve=b.a.Title,Re=j.a.div(Ue());function ze(){var e=Object(r.useContext)(C),n=e.socket,t=e.roomState,o=e.getIsAdmin,c=null===t||void 0===t?void 0:t.resultsVisible,a=o(),s=Object(r.useState)(""),l=Object(u.a)(s,2),d=l[0],j=l[1];return Object(i.jsxs)(Re,{children:[a&&Object(i.jsxs)($,{column:!0,style:{border:"1px solid #f0d1d1",borderRadius:"4px",padding:"8px"},children:[Object(i.jsxs)($,{column:!0,children:[Object(i.jsx)(Ve,{level:3,children:"Admin panel"}),Object(i.jsx)(Ve,{level:4,children:"Add a presentation"}),Object(i.jsx)(x.a,{value:d,onChange:function(e){return j(e.target.value)},placeholder:"Insert new title here"}),Object(i.jsx)(O.a,{type:"primary",onClick:function(){null===n||void 0===n||n.emit("addPresentation",{name:d}),v.a.success({message:"Yay!",description:"New presentation added!"}),j("")},style:{margin:"12px 0"},children:"Add"})]}),Object(i.jsxs)($,{column:!0,style:{margin:"12px 0"},children:[Object(i.jsx)(Ve,{level:4,children:"Show voting results"}),Object(i.jsx)(we.a,{title:"Are you ABSOLUTELY SURE you want to ".concat(c?"hide":"show"," voting results?"),onConfirm:function(){null===n||void 0===n||n.emit("showResults",{show:!c})},onCancel:function(){},okText:"Do eet",cancelText:"Nope :c",placement:"left",children:Object(i.jsx)(O.a,{type:"primary",danger:!0,children:c?"Hide":"Show"})})]})]}),Object(i.jsxs)($,{column:!0,style:{margin:"12px 0"},children:[Object(i.jsx)(Ve,{level:3,children:"Leadership board"}),Object(i.jsx)(Ie,{})]})]})}var De=t(294),Le=t.n(De);function Ye(){var e=Object(d.a)(["\n    width: 100vw;\n    height: 100vh;\n"]);return Ye=function(){return e},e}var Be=j.a.div(Ye());function Je(){var e=Object(r.useContext)(C),n=e.startConnection,t=e.nickname,o=Object(l.g)().roomid,c=Object(r.useState)(!1),a=Object(u.a)(c,2),s=a[0],d=a[1];return Object(r.useEffect)((function(){o&&""!==t&&!s&&n(o),""===t&&d(!0)}),[o,t,s]),Object(i.jsxs)(Be,{children:[Object(i.jsxs)(X.a,{percentage:!0,primaryMinSize:70,secondaryInitialSize:20,children:[Object(i.jsx)(Ce,{}),Object(i.jsx)(ze,{})]}),Object(i.jsx)(Le.a,{visible:s,cancelButtonProps:{style:{visibility:"hidden"}},onOk:function(){return d(!1)},children:Object(i.jsx)(D,{})})]})}t(547);function Me(){return Object(i.jsx)(w,{children:Object(i.jsx)(s.a,{children:Object(i.jsxs)(l.c,{children:[Object(i.jsx)(l.a,{exact:!0,path:"/",children:Object(i.jsx)(G,{})}),Object(i.jsx)(l.a,{exact:!0,path:"/room/:roomid",children:Object(i.jsx)(Je,{})})]})})})}var We=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,557)).then((function(n){var t=n.getCLS,i=n.getFID,r=n.getFCP,o=n.getLCP,c=n.getTTFB;t(e),i(e),r(e),o(e),c(e)}))};a.a.render(Object(i.jsx)(o.a.StrictMode,{children:Object(i.jsx)(Me,{})}),document.getElementById("root")),We()}},[[548,1,2]]]);
//# sourceMappingURL=main.7ca0974c.chunk.js.map