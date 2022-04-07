(this.webpackJsonpwiki=this.webpackJsonpwiki||[]).push([[8],{626:function(e,t,i){"use strict";i.d(t,"b",(function(){return r})),i.d(t,"a",(function(){return l}));var n=i(197),a=i(2),r=function(e){return Object(a.jsx)(n.a,{variant:"xLarge",block:!0,styles:{root:{marginBottom:20}},children:e.children})},l=function(e){return Object(a.jsx)(n.a,{variant:"medium",block:!0,children:e.children})}},649:function(e,t,i){"use strict";i.r(t),i.d(t,"default",(function(){return Y}));var n,a,r,l,c,s=i(7),o=i(10),m=i(19),d=i(25),u=i(138),b=i(91),j=i(58),p=i(355),h=i(357),O=i(4),f=i(233),g=i(197),x=i(196),v=i(614),y=i(137),I=i(139),N=i(192),T=i(227),k=i(232),z=i(56),w=i(24),L=i(524),B=i(647),D=i(16),R=i(606),S=i(131),U=i(626),A=i(48),C=i(70),M=i(0),G=i.n(M),W=i(609),P=i(656),_=i(57),q=i(356),E=Object(q.a)(n||(n=Object(_.a)(["\n    query measurerunit {\n        measureUnits {\n        id\n        name\n        description\n        }\n    }\n"]))),H=Object(q.a)(a||(a=Object(_.a)(["\n    query GET_BUDGET_TEMPLATE {\n        budgetTemplates{\n            id\n            item\n            itemDescription\n            itemName\n            measureUnitId\n            methodologyId\n            subtotal\n            permanent\n            createdAt\n            updatedAt\n        }\n    }\n"]))),$=Object(q.a)(r||(r=Object(_.a)(["\n    mutation CreateBudgetTemplatePayload($input: CreateBudgetTemplateInput!){\n        createBudgetTemplate(input: $input){\n        budgetTemplate{\n            id\n            item\n            itemDescription\n            itemName\n            measureUnitId\n            methodologyId\n            subtotal\n            permanent\n            createdAt\n            updatedAt\n        }\n        }\n    }\n"]))),V=Object(q.a)(l||(l=Object(_.a)(["\n    mutation deleteBudgetTemplate ($input: DeleteBudgetTemplateInput!){\n        deleteBudgetTemplate(input: $input){\n            budgetTemplate{\n                id\n                item\n                itemDescription\n                itemName\n                measureUnitId\n                methodologyId\n                subtotal\n                permanent\n                createdAt\n                updatedAt\n            }\n        }\n    }\n"]))),F=Object(q.a)(c||(c=Object(_.a)(["\n    mutation updateBudgetTemplate($input: UpdateBudgetTemplateInput!){\n        updateBudgetTemplate(input: $input){\n        budgetTemplate{\n                id\n                item\n                itemDescription\n                itemName\n                measureUnitId\n                methodologyId\n                subtotal\n                permanent\n                createdAt\n                updatedAt\n            }\n        }\n    }\n"]))),J=i(13),K=i(15),Q=function(){function e(){Object(J.a)(this,e),this.listBudgetTemplate=void 0,this.BudgetTemplate=void 0,this.listBudgetTemplate=[],this.BudgetTemplate={__typename:"budgetTemplates",id:0,item:"",itemDescription:"",itemName:"",measureUnitId:0,methodologyId:0,subtotal:!1,permanent:!1,createdAt:new Date,updatedAt:new Date}}return Object(K.a)(e,[{key:"addNewItem",value:function(e,t){return this.listBudgetTemplate=e,{item:this.getNewItemID(t),itemDescription:"item new description",itemName:"item new name",measureUnitId:1,methodologyId:1,subtotal:!1,permanent:!1}}},{key:"getLevel",value:function(e){var t,i;return e&&(null===(t=e.item)||void 0===t?void 0:t.split(".").length)?null===(i=e.item)||void 0===i?void 0:i.split(".").length:0}},{key:"getNewItemID",value:function(e){var t=this.getLevel(e),i="";if(!e){var n="0",a="0";this.listBudgetTemplate.map((function(e){var t;e.item&&(a=null===(t=e.item)||void 0===t?void 0:t.split(".")[0],Number(a)>Number(n)&&(n=a))})),i=String(Number(n)+1)}if(e&&1===t&&e.item){var r=[e.item.split(".")[0],"0"],l=[e.item.split(".")[0],"0"];this.listBudgetTemplate.map((function(e){var t;e.item&&(l=null===(t=e.item)||void 0===t?void 0:t.split("."),Number(l[1])>Number(r[1])&&(r=l))})),i=e.item.split(".")[0]+"."+String(Number(r[1])+1)}if(e&&2===t&&e.item){var c=[e.item.split(".")[0],e.item.split(".")[1],"0"],s=[e.item.split(".")[0],e.item.split(".")[1],"0"];this.listBudgetTemplate.map((function(t){var i;t.item&&(s=null===(i=t.item)||void 0===i?void 0:i.split("."),e.item&&s[0]===e.item.split(".")[0]&&s[1]===e.item.split(".")[1]&&Number(s[2])>Number(c[2])&&(c=s))})),i=e.item.split(".")[0]+"."+e.item.split(".")[1]+"."+String(Number(c[2])+1)}if(e&&3===t&&e.item){var o=[e.item.split(".")[0],e.item.split(".")[1],e.item.split(".")[2],"0"],m=[e.item.split(".")[0],e.item.split(".")[1],e.item.split(".")[2],"0"];this.listBudgetTemplate.map((function(t){var i;t.item&&(m=null===(i=t.item)||void 0===i?void 0:i.split("."),e.item&&m[0]===e.item.split(".")[0]&&m[1]===e.item.split(".")[1]&&m[2]===e.item.split(".")[2]&&Number(m[3])>Number(o[3])&&(o=m))})),i=e.item.split(".")[0]+"."+e.item.split(".")[1]+"."+e.item.split(".")[2]+"."+String(Number(o[3])+1)}return i}}]),e}(),X=i(2);function Y(){var e=Object(u.a)("manage",{keyPrefix:"form"}).t,t=Object(u.a)("basics",{keyPrefix:"languages"}).t,i=Object(m.h)().form,n=!!(null===i||void 0===i?void 0:i.includes("index")),a=Object(h.a)().palette,r=Object(M.useState)(!1),l=Object(o.a)(r,2),c=(l[0],l[1],Object(d.c)(S.b)),_=Object(d.c)(j.b),q=Object(d.c)(S.c),J=Object(W.a)(E),K=Object(M.useState)([]),Y=Object(o.a)(K,2),Z=Y[0],ee=Y[1],te=Object(W.a)(H),ie=new Q,ne=Object(P.a)($),ae=Object(o.a)(ne,2),re=ae[0],le=(ae[1],Object(P.a)(V)),ce=Object(o.a)(le,2),se=ce[0],oe=(ce[1],Object(P.a)(F)),me=Object(o.a)(oe,2),de=me[0],ue=(me[1],_.forms.find((function(e){return"budget"===e.name})).structure,Object(M.useState)(ie.listBudgetTemplate)),be=Object(o.a)(ue,2),je=be[0],pe=be[1],he=Object(M.useState)(!1),Oe=Object(o.a)(he,2);Oe[0],Oe[1];Object(M.useEffect)((function(){!J.loading&&J.data&&ee(J.data.measureUnits),!te.loading&&te.data&&(ie.listBudgetTemplate=te.data.budgetTemplates,pe(ie.listBudgetTemplate))}));var fe=Object(p.a)(!1),ge=Object(o.a)(fe,2),xe=(ge[0],ge[1]),ve=(xe.setTrue,xe.setFalse,q.map((function(e){return{key:e,text:t(e)}}))),ye=b.a.cloneInstance({defaultNS:"forms",fallbackNS:["licitations","tutorials"]}),Ie={horizontal:!0,tokens:{childrenGap:10}},Ne=Object(O.G)({submit_button:{height:35,width:120,minWidth:40,fontSize:14},center:{justifyContent:"center",alignItems:"center",display:"flex"},select:{height:35,backgroundColor:"white",width:100,minWidth:40,fontSize:14}}),Te={root:{height:25},rootHovered:{backgroundColor:a.neutralLighter},icon:{fontSize:13,color:a.black}};if("budget"===i){var ke=function(e){re({variables:{input:ie.addNewItem(je,e)},refetchQueries:[{query:H}]})},ze=function(e){se({variables:{input:{id:e.id}},refetchQueries:[{query:H}]})},we=[{key:"column1",name:"name",fieldName:"item",ariaLabel:"item",data:"string",minWidth:70,maxWidth:300,flexGrow:1,isMultiline:!0,isResizable:!0,isRowHeader:!0,onRender:function(e){return function(e){var t=Object(M.useState)(e.itemName),i=Object(o.a)(t,2),n=i[0],r=i[1];Object(M.useEffect)((function(){var t=setTimeout((function(){var t={id:e.id,item:e.item,itemName:n,itemDescription:e.itemDescription,subtotal:e.subtotal,permanent:e.permanent,methodologyId:e.methodologyId,measureUnitId:e.measureUnitId};de({variables:{input:t}})}),3e3);return function(){return clearTimeout(t)}}),[n]);var l={rows:1,multiline:!0,resizable:!0,defaultValue:"",styles:{fieldGroup:{borderRadius:"0 0 2px 2px",border:"1px solid ".concat(a.neutralLighter),selectors:{":hover":{border:"1px solid ".concat(a.neutralTertiary)}}}}};return Object(X.jsxs)(f.a,{horizontal:!0,tokens:{childrenGap:4},children:[Object(X.jsxs)(g.a,Object(s.a)(Object(s.a)({},{styles:{root:{fontWeight:500,minWidth:50}}}),{},{children:[e.item,"- "]})),Object(X.jsx)(x.a,Object(s.a)(Object(s.a)({},l),{},{value:n,onChange:function(e,t){return t=e.currentTarget.value,r(t),t}}))]})}(e)}},{key:"column3",name:"Description",fieldName:"itemDescription",ariaLabel:"itemDescription",data:"string",minWidth:70,maxWidth:400,flexGrow:1,isMultiline:!0,isResizable:!0,isRowHeader:!0,onRender:function(e){return function(e){var t=Object(M.useState)(e.itemDescription),i=Object(o.a)(t,2),n=i[0],r=i[1];Object(M.useEffect)((function(){var t=setTimeout((function(){var t={id:e.id,item:e.item,itemName:e.itemName,itemDescription:n,subtotal:e.subtotal,permanent:e.permanent,methodologyId:e.methodologyId,measureUnitId:e.measureUnitId};de({variables:{input:t}})}),3e3);return function(){return clearTimeout(t)}}),[n]);var l={rows:1,multiline:!0,resizable:!0,defaultValue:"",styles:{root:{minWidth:400},fieldGroup:{borderRadius:"0 0 2px 2px",border:"1px solid ".concat(a.neutralLighter),selectors:{":hover":{border:"1px solid ".concat(a.neutralTertiary)}}}}};return Object(X.jsx)(f.a,{horizontal:!0,tokens:{childrenGap:4},children:Object(X.jsx)(x.a,Object(s.a)(Object(s.a)({},l),{},{value:n,onChange:function(e,t){return t=e.currentTarget.value,r(t),t}}))})}(e)}},{key:"column4",name:"measureUnitId",fieldName:"measureUnitId",ariaLabel:"measureUnitId",data:"Number",minWidth:100,flexGrow:1,isMultiline:!0,isResizable:!0,isRowHeader:!0,onRender:function(e){return function(e){if(Z)return Object(X.jsxs)("select",{name:"measureUnits",className:Ne.select,onChange:function(t){if(""!==t.target.value){var i={id:e.id,item:e.item,itemName:e.itemName,itemDescription:e.itemDescription,subtotal:e.subtotal,permanent:e.permanent,methodologyId:e.methodologyId,measureUnitId:Number(t.target.value)};de({variables:{input:i}})}},children:[Object(X.jsx)("option",{value:"",children:"seleccionar"},""),Z.map((function(t){return Object(X.jsx)("option",{value:t.id,selected:Number(t.id)===Number(e.measureUnitId),children:t.name},t.id)}))]})}(e)}},{key:"column5",name:"subtotal",fieldName:"subtotal",ariaLabel:"subtotal",data:"Boolean",minWidth:180,flexGrow:1,isMultiline:!0,isResizable:!0,isRowHeader:!0,onRender:function(e){return function(e){return Object(X.jsx)(v.a,{label:"Is subtotal row?",onChange:function(t,i){var n={id:e.id,item:e.item,itemName:e.itemName,itemDescription:e.itemDescription,subtotal:i,permanent:e.permanent,methodologyId:e.methodologyId,measureUnitId:e.measureUnitId};de({variables:{input:n}})},checked:e.subtotal})}(e)}},{key:"column6",name:"permanent",fieldName:"permanent",ariaLabel:"permanent",data:"Boolean",minWidth:180,flexGrow:1,isMultiline:!0,isResizable:!0,isRowHeader:!0,onRender:function(e){return function(e){return Object(X.jsx)(v.a,{label:"Is permanent row?",onChange:function(t,i){var n={id:e.id,item:e.item,itemName:e.itemName,itemDescription:e.itemDescription,subtotal:e.subtotal,permanent:i,methodologyId:e.methodologyId,measureUnitId:e.measureUnitId};de({variables:{input:n}})},checked:e.permanent})}(e)}},{key:"column7",name:"actions",fieldName:"permanent",ariaLabel:"permanent",data:"string",minWidth:100,flexGrow:1,isMultiline:!0,isResizable:!0,isRowHeader:!0,onRender:function(t){return function(t){return Object(X.jsxs)(G.a.Fragment,{children:[ie.getLevel(t)<=3?Object(X.jsx)(y.a,{content:e("tooltip.add-activity"),children:Object(X.jsx)(I.a,{iconProps:{iconName:"Add"},styles:Te,onClick:function(){return ke(t)}})}):"",Object(X.jsx)(y.a,{content:e("tooltip.delete-activity"),children:Object(X.jsx)(I.a,{iconProps:{iconName:"Cancel"},styles:Te,onClick:function(){return ze(t)}})})]})}(t)}}];return Object(X.jsxs)(G.a.Fragment,{children:[Object(X.jsx)(U.b,{children:n?e("index"):ye.t("".concat(i,".header"))}),te.loading?"loading":Object(X.jsxs)(A.b,{dir:"ltr",children:[Object(X.jsxs)(A.c,{children:[Object(X.jsx)(A.a,{children:Object(X.jsx)(T.a,{children:e("".concat(i,".first-row-button"))})}),Object(X.jsx)(A.a,{children:Object(X.jsx)(I.a,{iconProps:{iconName:"Add"},styles:Te,onClick:function(){return ke()}})})]}),Object(X.jsx)(A.c,{children:Object(X.jsx)(A.a,{sizeSm:12,sizeMd:12,sizeLg:12,children:Object(X.jsx)(k.a,{items:je,columns:we,selectionMode:z.b.none,onRenderRow:function(e){var t={};if(e){var i=e.item;switch(ie.getLevel(i)){case 1:t.root={backgroundColor:a.themeLighter,":hover":{backgroundColor:a.themeLighter}};break;case 2:t.root={backgroundColor:a.themeLighterAlt,":hover":{backgroundColor:a.neutralLight}};break;case 3:t.root={":hover":{backgroundColor:a.neutralLighter}}}return Object(X.jsx)(N.a,Object(s.a)(Object(s.a)({},e),{},{styles:t}))}return null},setKey:"set",layoutMode:w.e.justified,selectionPreservedOnEmptyClick:!0})})})]})]})}return"budget1"===i?Object(X.jsxs)(X.Fragment,{children:[Object(X.jsx)(U.b,{children:n?e("index"):ye.t("".concat(i,".header"))}),Object(X.jsxs)(A.b,{dir:"ltr",children:[Object(X.jsxs)(A.c,{children:[Object(X.jsx)(A.a,{sizeLg:4,sizeMd:4,sizeSm:12,children:Object(X.jsx)(x.a,{required:!0,label:e("".concat(i,".item-name")),name:"item_name",componentRef:C.a})}),Object(X.jsx)(A.a,{sizeLg:4,sizeMd:4,sizeSm:12,children:Object(X.jsx)(x.a,{required:!0,label:e("".concat(i,".measure-unit-id")),name:"measure_unit_id",componentRef:C.a})}),Object(X.jsx)(A.a,{sizeLg:4,sizeMd:4,sizeSm:12,children:Object(X.jsx)(x.a,{required:!0,label:e("".concat(i,".item-parent")),name:"item_parent",componentRef:C.a})})]}),Object(X.jsx)(A.c,{children:Object(X.jsx)(A.a,{sizeLg:12,sizeMd:12,sizeSm:12,children:Object(X.jsx)(x.a,{required:!0,label:e("".concat(i,".item-description")),name:"item_description",componentRef:C.a})})}),Object(X.jsx)(A.c,{children:Object(X.jsxs)(A.a,{sizeLg:4,sizeMd:4,sizeSm:12,children:[Object(X.jsx)(T.a,{children:e("".concat(i,".subtotal"))}),Object(X.jsx)(v.a,{})]})}),Object(X.jsx)(A.c,{children:Object(X.jsx)(A.a,{sizeLg:12,sizeMd:12,sizeSm:12,className:Ne.center,children:Object(X.jsx)(L.a,{text:e("".concat(i,".submit-button")),className:Ne.submit_button})})})]}),Object(X.jsx)("hr",{}),Object(X.jsx)(A.b,{dir:"ltr",children:Object(X.jsx)(A.c,{children:Object(X.jsx)(A.a,{sizeLg:12,sizeMd:12,sizeSm:12,children:Object(X.jsx)("label",{children:"Budget template"})})})})]}):Object(X.jsxs)(f.a,{tokens:{childrenGap:12},styles:{root:{marginBottom:8,paddingRight:40}},children:[Object(X.jsx)(U.b,{children:n?e("index"):ye.t("".concat(i,".header"))}),Object(X.jsxs)(f.a,Object(s.a)(Object(s.a)({},Ie),{},{children:[Object(X.jsx)(f.a.Item,{children:Object(X.jsx)(B.a,{label:e("amount.maximal-field"),defaultValue:"0",min:0,max:100,step:1,incrementButtonAriaLabel:"Increase value by 1",decrementButtonAriaLabel:"Decrease value by 1",labelPosition:D.a.top})}),Object(X.jsx)(f.a.Item,{children:Object(X.jsx)(B.a,{label:e("amount.minimal-field"),defaultValue:"0",min:0,max:100,step:1,incrementButtonAriaLabel:"Increase value by 1",decrementButtonAriaLabel:"Decrease value by 1",labelPosition:D.a.top})}),Object(X.jsxs)(f.a.Item,{children:[Object(X.jsx)(T.a,{children:e("amount.top-field")}),Object(X.jsx)(v.a,{})]})]})),Object(X.jsxs)(f.a,Object(s.a)(Object(s.a)({},Ie),{},{children:[Object(X.jsx)(f.a.Item,{children:Object(X.jsx)(B.a,{label:e("characters.maximal-field"),defaultValue:"0",min:0,max:100,step:1,incrementButtonAriaLabel:"Increase value by 1",decrementButtonAriaLabel:"Decrease value by 1",labelPosition:D.a.top})}),Object(X.jsxs)(f.a.Item,{children:[Object(X.jsx)(T.a,{children:e("characters.top-field")}),Object(X.jsx)(v.a,{})]})]})),Object(X.jsx)(R.a,{label:e("language-field"),defaultSelectedKey:c,options:ve}),Object(X.jsx)(x.a,{label:e("name-field")}),Object(X.jsx)(x.a,{label:e("tooltip-field")}),Object(X.jsx)(x.a,{label:e("definition-field")}),Object(X.jsx)(x.a,{label:e("format-field")})]})}}}]);
//# sourceMappingURL=8.75440419.chunk.js.map