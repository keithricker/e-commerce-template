(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[6],{105:function(t,e,c){},125:function(t,e,c){},130:function(t,e,c){"use strict";c.r(e);c(1);var n=c(16),a=(c(17),c(33)),s=(c(105),c(29)),r=c(3),i=Object(n.b)(null,(function(t){return{clearItem:function(e){return t(Object(s.c)(e))},reduceItemQuantity:function(e){return t(Object(s.d)(e))},addItem:function(e){return t(Object(s.a)(e))}}}))((function(t){var e=t.cartItem,c=t.clearItem,n=t.addItem,a=t.reduceItemQuantity,s=e.name,i=e.imageUrl,o=e.price,l=e.quantity;return Object(r.jsxs)("div",{className:"checkout-item",children:[Object(r.jsx)("div",{className:"checkout-column image-container",children:Object(r.jsx)("img",{src:i,alt:"item"})}),Object(r.jsx)("span",{className:"checkout-column name",children:s}),Object(r.jsxs)("span",{className:"checkout-column quantity",children:[Object(r.jsx)("span",{className:"arrow",onClick:function(){return a(e)},children:"\u276e"}),Object(r.jsx)("span",{className:"value",children:l}),Object(r.jsx)("span",{className:"arrow",onClick:function(t){return n(e)},children:"\u276f"})]}),Object(r.jsxs)("span",{className:"checkout-column price",children:["$",o]}),Object(r.jsx)("div",{className:"checkout-column remove-button",onClick:function(t){return function(t,e){var n=t.target.parentNode;Object.assign(n.style,{transition:"all 0.5s","min-height":"0px",height:"0px",opacity:"0",padding:"0px"}),window.setTimeout((function(){c(e)}),500)}(t,e)},children:"\u2715"})]})})),o=c(106),l=c.n(o),u=c(107),m=c.n(u),d=function(t){var e=t.price,c=100*e;return Object(r.jsx)(l.a,{label:"Pay Now",name:"Widgets Unlimited, Inc.",billingAddress:!0,shippingAddress:!0,image:"https://svgshare.com/i/CUz.svg",description:"Your total is $".concat(e),amount:c,panelLabel:"Pay Now",token:function(t){console.log(t),m()({url:"payment",method:"post",data:{amount:c,token:t}}).then((function(t){alert("Payment Successful")})).catch((function(t){console.log("Payment Error: ",JSON.parse(t)),alert("There was an error with your transaction. Please be sure to use the provided test credit card.")}))},stripeKey:"pk_test_xYtLS9QFqAO646nlSGWbkVK600VgjaWS2v"})};c(125),e.default=Object(n.b)((function(t){return{cartItems:Object(a.b)(t),total:Object(a.d)(t)}}))((function(t){var e=t.cartItems,c=t.total;return Object(r.jsxs)("div",{className:"checkout-page",children:[e.map((function(t){return Object(r.jsx)(i,{cartItem:t},t.id)})),Object(r.jsxs)("div",{className:"total",children:[Object(r.jsx)("span",{class:"total-text",children:"TOTAL:\xa0"}),Object(r.jsxs)("span",{class:"total-amount",children:["$",c]})]}),Object(r.jsxs)("div",{className:"test-warning",children:["*Please use the following test credit card for payments*",Object(r.jsx)("br",{}),"4242 4242 4242 4242 - Exp: 01/20 - CVV: 123"]}),Object(r.jsx)(d,{price:c})]})}))}}]);
//# sourceMappingURL=6.62e5631c.chunk.js.map