import{j as s,c as N,r as l}from"./index-69d453a3.js";const S="_seminars_9oooq_1",v={seminars:S},I="_item_84uz5_1",f="_imgWrapper_84uz5_16",z="_info_84uz5_23",w="_title_84uz5_30",y="_icons_84uz5_36",k="_iconsItem_84uz5_41",D="_iconsSpan_84uz5_49",V="_p_84uz5_58",C="_li_84uz5_66",T="_bottom_84uz5_88",W="_bottomItem_84uz5_94",q="_bottomViolet_84uz5_98",E="_bottomSpan_84uz5_102",M="_btn_84uz5_114",t={item:I,imgWrapper:f,info:z,title:w,icons:y,iconsItem:k,iconsSpan:D,p:V,li:C,bottom:T,bottomItem:W,bottomViolet:q,bottomSpan:E,btn:M};function U(e){return["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"][e]}const A="/work/assets/calendar-violet-8c2924db.svg",F="/work/assets/clock-violet-b671d8cf.svg",L="/work/assets/users-violet-22e46925.svg",O=({imageUrl:e,title:n,date:o,seats:c,description:d})=>{const r=new DOMParser().parseFromString(d,"text/html"),h=r.querySelector("p").textContent,p=Array.from(r.querySelectorAll("li")).map(i=>i.textContent),a=new Date(o),_=a.getDate()-1,x=a.getUTCMonth(),u=U(x),j=a.getFullYear(),g={timeZone:"UTC",hour12:!1},m=a.toLocaleTimeString("en-US",g).substring(0,5);return s.jsxs("div",{className:t.item,children:[s.jsx("div",{className:t.imgWrapper,children:s.jsx("img",{src:e,width:360,height:208,alt:n})}),s.jsxs("div",{className:t.info,children:[s.jsx("h2",{className:t.title,children:n}),s.jsxs("div",{className:t.icons,children:[s.jsxs("div",{className:t.iconsItem,children:[s.jsx("img",{src:A,width:14,height:15,alt:"date"}),s.jsxs("span",{className:t.iconsSpan,children:[_," ",u," ",j," ",m]})]}),s.jsxs("div",{className:t.iconsItem,children:[s.jsx("img",{src:F,width:15,height:15,alt:"clock"}),s.jsx("span",{className:t.iconsSpan,children:m})]}),s.jsxs("div",{className:t.iconsItem,children:[s.jsx("img",{src:L,width:21,height:13,alt:"users"}),s.jsx("span",{className:t.iconsSpan,children:c})]})]}),s.jsx("p",{className:t.p,children:h}),s.jsx("ul",{children:p.map((i,b)=>s.jsx("li",{className:t.li,children:i},b))}),s.jsxs("div",{className:t.bottom,children:[s.jsxs("div",{className:t.bottomItem,children:[s.jsx("span",{className:t.bottomSpan,children:"Стоимость"}),s.jsx("span",{className:t.bottomViolet,children:"Бесплатно"})]}),s.jsxs("div",{className:t.bottomItem,children:[s.jsx("span",{className:t.bottomSpan,children:"Свободных мест"}),s.jsx("span",{className:t.bottomViolet,children:"24"})]})]}),s.jsx("button",{className:t.btn,children:"Записаться на семинар"})]})]})},P=async()=>{const{data:e}=await N.get("seminar?page=1");return e},R=()=>{const[e,n]=l.useState([]);return l.useEffect(()=>{(async()=>{try{const{items:c}=await P();n(c)}catch(c){console.log(c)}})()},[]),s.jsx("div",{className:v.seminars,children:e.length?e.map(o=>s.jsx(O,{...o},o.id)):null})},$=()=>s.jsx("section",{className:"section",children:s.jsx("div",{className:"container",children:s.jsx(R,{})})});export{$ as default};
