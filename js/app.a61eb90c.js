(function(){"use strict";var e={4784:function(e,t,s){var i=s(9242),o=s(3396);function a(e,t){const s=(0,o.up)("router-view");return(0,o.wg)(),(0,o.j4)(s)}var l=s(89);const c={},r=(0,l.Z)(c,[["render",a]]);var n=r,d=s(2483),u=s(7139);const p=e=>((0,o.dD)("data-v-78de22d8"),e=e(),(0,o.Cn)(),e),h={class:"no-exercises-popup"},m=p((()=>(0,o._)("p",null,"No exercises available",-1))),b=[m],g={class:"executionBtns"},f=p((()=>(0,o._)("div",{class:"divider"},null,-1))),x=["disabled"],S=p((()=>(0,o._)("div",{class:"title"},"Webpal Playground",-1))),v={class:"codeEditors"},_={class:"codeHTML"},w={class:"codeEditorWrapper"},y=p((()=>(0,o._)("label",{for:"htmlFile"},"HTML Filename:",-1))),F=p((()=>(0,o._)("div",{class:"divider"},null,-1))),C={class:"codeCSS"},k={class:"codeEditorWrapper"},E=p((()=>(0,o._)("label",{for:"cssFile"},"CSS Filename:",-1))),L=p((()=>(0,o._)("div",{class:"divider"},null,-1))),I={class:"codeJS"},D={class:"codeEditorWrapper"},T=p((()=>(0,o._)("label",{for:"jsFile"},"Javascript Filename:",-1))),j=p((()=>(0,o._)("div",{class:"frameTitles"},[(0,o._)("div",null,"Student Frame"),(0,o._)("div",null,"Teacher Frame")],-1))),M={class:"frames"},J=p((()=>(0,o._)("iframe",{class:"studentFrame",srcdoc:"",frameborder:"0"},null,-1))),H=["srcdoc"],V={class:"feedback-log"},A=p((()=>(0,o._)("h3",null,"Feedback Log:",-1))),$={class:"timestamp"},W={class:"message"};function U(e,t,s,a,l,c){const r=(0,o.up)("Sidebar"),n=(0,o.up)("codemirror");return(0,o.wg)(),(0,o.iD)("body",{class:(0,u.C_)({"no-exercises":0===l.exercises.length})},[(0,o._)("header",null,[(0,o.Wm)(r,{onExerciseSelected:c.updateExercise},null,8,["onExerciseSelected"]),(0,o.wy)((0,o._)("div",h,b,512),[[i.F8,!l.exercises.length]]),(0,o._)("div",g,[(0,o._)("button",{class:"btns",onClick:t[0]||(t[0]=(...e)=>c.executeCode&&c.executeCode(...e))},"Execute"),f,(0,o._)("button",{disabled:!l.exercise,class:"btns",onClick:t[1]||(t[1]=(...e)=>c.submitCode&&c.submitCode(...e))},"Submit",8,x)]),S]),(0,o._)("div",v,[(0,o._)("div",_,[(0,o._)("div",w,[y,(0,o.wy)((0,o._)("input",{id:"htmlFile","onUpdate:modelValue":t[2]||(t[2]=e=>a.htmlFile=e),type:"text"},null,512),[[i.nr,a.htmlFile]]),(0,o.Wm)(n,{modelValue:a.codeHTML,"onUpdate:modelValue":t[3]||(t[3]=e=>a.codeHTML=e),placeholder:"HTML goes here...",style:{height:"200px",width:"100%",textAlign:"left",backgroundColor:"white"},autofocus:!0,"indent-with-tab":!0,"tab-size":4,extensions:a.extensionsHTML},null,8,["modelValue","extensions"])])]),F,(0,o._)("div",C,[(0,o._)("div",k,[E,(0,o.wy)((0,o._)("input",{id:"cssFile","onUpdate:modelValue":t[4]||(t[4]=e=>a.cssFile=e),type:"text"},null,512),[[i.nr,a.cssFile]]),(0,o.Wm)(n,{modelValue:a.codeCSS,"onUpdate:modelValue":t[5]||(t[5]=e=>a.codeCSS=e),placeholder:"CSS goes here...",style:{height:"200px",width:"100%",textAlign:"left",backgroundColor:"white"},autofocus:!0,"indent-with-tab":!0,"tab-size":4,extensions:a.extensionsCSS},null,8,["modelValue","extensions"])])]),L,(0,o._)("div",I,[(0,o._)("div",D,[T,(0,o.wy)((0,o._)("input",{id:"jsFile","onUpdate:modelValue":t[6]||(t[6]=e=>a.jsFile=e),type:"text"},null,512),[[i.nr,a.jsFile]]),(0,o.Wm)(n,{modelValue:a.codeJS,"onUpdate:modelValue":t[7]||(t[7]=e=>a.codeJS=e),placeholder:"Javascript goes here...",style:{height:"200px",width:"100%",textAlign:"left",backgroundColor:"white"},options:{mode:"javascript",extraKeys:{"Ctrl-Space":"autocomplete"}},autofocus:!0,"indent-with-tab":!0,"tab-size":4,extensions:a.extensionsJS},null,8,["modelValue","extensions"])])])]),j,(0,o._)("div",M,[J,(0,o._)("iframe",{class:"professorFrame",srcdoc:l.professorHTML,frameborder:"0"},null,8,H)]),(0,o._)("div",V,[A,(0,o._)("button",{onClick:t[8]||(t[8]=(...e)=>c.clearFeedbackLog&&c.clearFeedbackLog(...e)),class:"clear-log-btn"},"Clear Log"),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(l.feedbackLog.slice().reverse(),((e,t)=>((0,o.wg)(),(0,o.iD)("p",{class:"feedback-entry",key:t},[(0,o._)("span",$,(0,u.zw)(e.timestamp),1),(0,o._)("span",W,(0,u.zw)(e.feedback),1)])))),128))])],2)}s(7658);const O=e=>((0,o.dD)("data-v-6bbd7684"),e=e(),(0,o.Cn)(),e),Z=O((()=>(0,o._)("div",{class:"bar1"},null,-1))),R=O((()=>(0,o._)("div",{class:"bar2"},null,-1))),z=O((()=>(0,o._)("div",{class:"bar3"},null,-1))),P=[Z,R,z],q={class:"sidebar"},N=O((()=>(0,o._)("h2",null,"Exercises",-1))),B=["onClick"],K={class:"button-container"},Y=["onClick"],X=O((()=>(0,o._)("i",{class:""},"Edit",-1))),G=[X],Q=["onClick"],ee=O((()=>(0,o._)("i",{class:""},"Del",-1))),te=[ee],se=["onClick"],ie=O((()=>(0,o._)("i",{class:""},"Info",-1))),oe=[ie];function ae(e,t,s,a,l,c){return(0,o.wg)(),(0,o.iD)("div",null,[(0,o._)("div",{class:"hamburger",onClick:t[0]||(t[0]=(...e)=>c.toggleSidebar&&c.toggleSidebar(...e))},P),(0,o.wy)((0,o._)("div",q,[(0,o._)("button",{class:"close-btn",onClick:t[1]||(t[1]=(...e)=>c.toggleSidebar&&c.toggleSidebar(...e))},"Close"),(0,o._)("button",{class:"backoffice-btn",onClick:t[2]||(t[2]=(...e)=>c.backofficeRedirect&&c.backofficeRedirect(...e))},"Backoffice"),N,(0,o._)("ul",null,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(l.exercises,((e,t)=>((0,o.wg)(),(0,o.iD)("li",{key:t,onClick:t=>c.updateExercise(e)},[(0,o.Uk)((0,u.zw)(e.assignment)+" ",1),(0,o._)("div",K,[(0,o._)("button",{onClick:(0,i.iM)((t=>c.editExercise(e.exerciseID)),["stop"])},G,8,Y),(0,o._)("button",{onClick:(0,i.iM)((t=>c.deleteExercise(e.exerciseID)),["stop"])},te,8,Q),(0,o._)("button",{onClick:(0,i.iM)((t=>c.showExerciseDescription(e.description)),["stop"])},oe,8,se)])],8,B)))),128)),(0,o.wy)((0,o._)("div",{onClick:t[4]||(t[4]=e=>l.showDescription=!1),class:"modal-overlay"},[(0,o._)("div",{class:"modal-content",onClick:t[3]||(t[3]=(0,i.iM)((()=>{}),["stop"]))},[(0,o._)("p",null,(0,u.zw)(l.currentDescription),1)])],512),[[i.F8,l.showDescription]])])],512),[[i.F8,l.showSidebar]])])}var le=s(4161),ce={name:"SidebarComponent",data(){return{showSidebar:!1,exercises:[],showDescription:!1,currentDescription:""}},methods:{toggleSidebar(){this.showSidebar=!this.showSidebar,document.querySelector(".sidebar").classList.toggle("open")},async updateExercise(e){console.log(e),this.$emit("exercise-selected",e),this.toggleSidebar()},backofficeRedirect(){this.$router.push({name:"Admin"})},async getAllExercises(){try{const e=await le.Z.get("https://webpal-server.adaptable.app/getAllExercises");console.log(e.data),this.exercises=e.data.map((e=>({...e,description:e.description})))}catch(e){console.error(e)}},showExerciseDescription(e){this.currentDescription=e,this.showDescription=!0},async deleteExercise(e){try{const t=confirm("Are you sure you want to delete this exercise?");if(!t)return;await le.Z.post("https://webpal-server.adaptable.app/deleteExercise",{id:e}),window.location.reload()}catch(t){console.error(t)}},editExercise(e){"Admin"!==this.$route.name?this.$router.push({name:"Admin",query:{id:e}}):this.fetchExerciseDetails(e)},async fetchExerciseDetails(e){try{const t=await le.Z.post("https://webpal-server.adaptable.app/getFullExercise",{id:e});this.$emit("exercise-details-received",t.data)}catch(t){console.error(t)}}},mounted(){this.getAllExercises()}};const re=(0,l.Z)(ce,[["render",ae],["__scopeId","data-v-6bbd7684"]]);var ne=re,de=s(5357),ue=s(1347),pe=s(9465),he=s(4937),me=s(3029),be={name:"PlaygroundView",components:{Codemirror:de.Z1,Sidebar:ne},setup(){const e=[(0,ue.dy)()],t=[(0,pe.iv)()],s=[(0,he.eJ)()],i="",o="",a="",l="index.html",c="style.css",r="main.js";return{extensionsHTML:e,extensionsCSS:t,extensionsJS:s,codeHTML:i,codeCSS:o,codeJS:a,htmlFile:l,cssFile:c,jsFile:r}},data(){return{professorHTML:"",exercise:null,exerciseID:"",feedback:"",showModal:!1,exercises:[],showSidebar:!1,feedbackLog:[]}},methods:{async updateExercise(e){this.exercise=e,await this.generateSolutionInterface();const t={studentID:localStorage.getItem("userId"),exerciseID:e.exerciseID,timestamp:(new Date).toISOString(),with_feedback:!0,feedback:'Started exercise "'+e.assignment+'"'};this.updateLog(t)},async evaluateExercise(e,t,s,i){try{const o=await le.Z.post("https://webpal-server.adaptable.app/evaluateExercise",{id:e,attemptFiles:t,port:s,previousFeedback:i});this.feedback=o.data;const a=(new Date).toLocaleString();this.feedbackLog.push({timestamp:a,feedback:this.feedback});const l={studentID:localStorage.getItem("userId"),exerciseID:this.exercise.exerciseID,timestamp:(new Date).toISOString(),with_feedback:!0,feedback:this.feedback};this.updateLog(l)}catch(o){console.error(o)}},async getAllExercises(){try{const e=await le.Z.get("https://webpal-server.adaptable.app/getAllExercises");this.exercises=e.data,console.log(this.exercises)}catch(e){console.error(e)}},clearFeedbackLog(){this.feedbackLog=[]},generateSolutionInterface(){let e="",t="",s="";for(let o=0;o<this.exercise.data.data.length;o++){const i=this.exercise.data.data[o],a=i.filename.split(".").pop();if("html"===a){const t=i.code.match(/<body[^>]*>([\s\S]*)<\/body>/i);e=t?t[1]:""}else"css"===a?t+=`<style>${i.code}</style>`:"js"===a&&(s+=`<script>${i.code}<\/script>`)}const i=`<html><head>${t}</head><body>${e}${s}</body></html>`;this.professorHTML=i},updateLog(e){const t=localStorage.getItem("userId"),s="https://webpal-server.adaptable.app/log",i={userId:t,logContent:e};le.Z.post(s,i).then((()=>{console.log("Log data sent successfully")})).catch((e=>{console.error("Failed to send log data:",e)}))},executeCode(){var e=this.codeHTML;const t=this.jsFile.split(".")[0],s=this.cssFile.split(".")[0],i=new RegExp(`<script[^>]*src=['"]${t}\\.js['"][^>]*><\\/script>`,"i"),o=e.match(i),a=new RegExp(`<link[^>]*href=['"]${s}\\.css['"][^>]*>`,"i"),l=e.match(a);if(o&&this.codeJS){const t=`<script>${this.codeJS}<\/script>`;e=e.replace(/<\/body>\s*<\/html>/i,`${t}</body></html>`)}if(l&&this.codeCSS){const t=`<style>${this.codeCSS}</style>`;e=e.replace(/<\/head>/i,`${t}</head>`)}document.querySelector(".studentFrame").setAttribute("srcdoc",e)},backofficeRedirect(){this.$router.push({name:"Admin"})},createUserId(){if(!localStorage.getItem("userId")){const e=(0,me.Z)();localStorage.setItem("userId",e)}console.log(localStorage.getItem("userId"))},async submitCode(){const e=[];""!==this.codeHTML.trim()&&e.push({filename:this.htmlFile,code:this.codeHTML}),""!==this.codeCSS.trim()&&e.push({filename:this.cssFile,code:this.codeCSS}),""!==this.codeJS.trim()&&e.push({filename:this.jsFile,code:this.codeJS}),await this.evaluateExercise(this.exercise.exerciseID,JSON.stringify(e),8090,[])}},mounted(){this.getAllExercises(),this.createUserId()}};const ge=(0,l.Z)(be,[["render",U],["__scopeId","data-v-78de22d8"]]);var fe=ge;const xe=e=>((0,o.dD)("data-v-513af382"),e=e(),(0,o.Cn)(),e),Se={class:"no-exercises-popup"},ve=xe((()=>(0,o._)("p",null,"No exercises available",-1))),_e=[ve],we={class:"executionBtns"},ye=xe((()=>(0,o._)("div",{class:"divider"},null,-1))),Fe=["disabled"],Ce=xe((()=>(0,o._)("div",{class:"title"},"Webpal Playground",-1))),ke={class:"codeEditors"},Ee={class:"codeHTML"},Le={class:"codeEditorWrapper"},Ie=xe((()=>(0,o._)("label",{for:"htmlFile"},"HTML Filename:",-1))),De=xe((()=>(0,o._)("div",{class:"divider"},null,-1))),Te={class:"codeCSS"},je={class:"codeEditorWrapper"},Me=xe((()=>(0,o._)("label",{for:"cssFile"},"CSS Filename:",-1))),Je=xe((()=>(0,o._)("div",{class:"divider"},null,-1))),He={class:"codeJS"},Ve={class:"codeEditorWrapper"},Ae=xe((()=>(0,o._)("label",{for:"jsFile"},"Javascript Filename:",-1))),$e=xe((()=>(0,o._)("div",{class:"frameTitles"},[(0,o._)("div",null,"Student Frame"),(0,o._)("div",null,"Teacher Frame")],-1))),We={class:"frames"},Ue=xe((()=>(0,o._)("iframe",{class:"studentFrame",srcdoc:"",frameborder:"0"},null,-1))),Oe=["srcdoc"],Ze={class:"feedback-log"},Re=xe((()=>(0,o._)("h3",null,"Feedback Log:",-1))),ze={class:"timestamp"},Pe={class:"message"};function qe(e,t,s,a,l,c){const r=(0,o.up)("Sidebar"),n=(0,o.up)("codemirror");return(0,o.wg)(),(0,o.iD)("body",{class:(0,u.C_)({"no-exercises":0===l.exercises.length})},[(0,o._)("header",null,[(0,o.Wm)(r,{onExerciseSelected:c.updateExercise},null,8,["onExerciseSelected"]),(0,o.wy)((0,o._)("div",Se,_e,512),[[i.F8,!l.exercises.length]]),(0,o._)("div",we,[(0,o._)("button",{class:"btns",onClick:t[0]||(t[0]=(...e)=>c.executeCode&&c.executeCode(...e))},"Execute"),ye,(0,o._)("button",{disabled:!l.exercise,class:"btns",onClick:t[1]||(t[1]=(...e)=>c.submitCode&&c.submitCode(...e))},"Submit",8,Fe)]),Ce]),(0,o._)("div",ke,[(0,o._)("div",Ee,[(0,o._)("div",Le,[Ie,(0,o.wy)((0,o._)("input",{id:"htmlFile","onUpdate:modelValue":t[2]||(t[2]=e=>a.htmlFile=e),type:"text"},null,512),[[i.nr,a.htmlFile]]),(0,o.Wm)(n,{modelValue:a.codeHTML,"onUpdate:modelValue":t[3]||(t[3]=e=>a.codeHTML=e),placeholder:"HTML goes here...",style:{height:"200px",width:"100%",textAlign:"left",backgroundColor:"white"},autofocus:!0,"indent-with-tab":!0,"tab-size":4,extensions:a.extensionsHTML},null,8,["modelValue","extensions"])])]),De,(0,o._)("div",Te,[(0,o._)("div",je,[Me,(0,o.wy)((0,o._)("input",{id:"cssFile","onUpdate:modelValue":t[4]||(t[4]=e=>a.cssFile=e),type:"text"},null,512),[[i.nr,a.cssFile]]),(0,o.Wm)(n,{modelValue:a.codeCSS,"onUpdate:modelValue":t[5]||(t[5]=e=>a.codeCSS=e),placeholder:"CSS goes here...",style:{height:"200px",width:"100%",textAlign:"left",backgroundColor:"white"},autofocus:!0,"indent-with-tab":!0,"tab-size":4,extensions:a.extensionsCSS},null,8,["modelValue","extensions"])])]),Je,(0,o._)("div",He,[(0,o._)("div",Ve,[Ae,(0,o.wy)((0,o._)("input",{id:"jsFile","onUpdate:modelValue":t[6]||(t[6]=e=>a.jsFile=e),type:"text"},null,512),[[i.nr,a.jsFile]]),(0,o.Wm)(n,{modelValue:a.codeJS,"onUpdate:modelValue":t[7]||(t[7]=e=>a.codeJS=e),placeholder:"Javascript goes here...",style:{height:"200px",width:"100%",textAlign:"left",backgroundColor:"white"},options:{mode:"javascript",extraKeys:{"Ctrl-Space":"autocomplete"}},autofocus:!0,"indent-with-tab":!0,"tab-size":4,extensions:a.extensionsJS},null,8,["modelValue","extensions"])])])]),$e,(0,o._)("div",We,[Ue,(0,o._)("iframe",{class:"professorFrame",srcdoc:l.professorHTML,frameborder:"0"},null,8,Oe)]),(0,o._)("div",Ze,[Re,(0,o._)("button",{onClick:t[8]||(t[8]=(...e)=>c.clearFeedbackLog&&c.clearFeedbackLog(...e)),class:"clear-log-btn"},"Clear Log"),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(l.feedbackLog.slice().reverse(),((e,t)=>((0,o.wg)(),(0,o.iD)("p",{class:"feedback-entry",key:t},[(0,o._)("span",ze,(0,u.zw)(e.timestamp),1),(0,o._)("span",Pe,(0,u.zw)(e.feedback),1)])))),128))])],2)}var Ne={name:"PlaygroundWorstView",components:{Codemirror:de.Z1,Sidebar:ne},setup(){const e=[(0,ue.dy)()],t=[(0,pe.iv)()],s=[(0,he.eJ)()],i="",o="",a="",l="index.html",c="style.css",r="main.js";return{extensionsHTML:e,extensionsCSS:t,extensionsJS:s,codeHTML:i,codeCSS:o,codeJS:a,htmlFile:l,cssFile:c,jsFile:r}},data(){return{professorHTML:"",exercise:null,exerciseID:"",feedback:"",showModal:!1,exercises:[],showSidebar:!1,feedbackLog:[]}},methods:{async updateExercise(e){this.exercise=e,await this.generateSolutionInterface();const t={studentID:localStorage.getItem("userId"),exerciseID:e.exerciseID,timestamp:(new Date).toISOString(),with_feedback:!1,feedback:'Started exercise "'+e.assignment+'"'};this.updateLog(t)},async evaluateExercise(e,t,s,i){try{const a=await le.Z.post("https://webpal-server.adaptable.app/evaluateExerciseWithoutStatic",{id:e,attemptFiles:t,port:s,previousFeedback:i});this.feedback=a.data;const l=(new Date).toLocaleString();var o;o="Congratulations! Your solution passed all tests and validations."===this.feedback?"Correct":"Incorrect",this.feedbackLog.push({timestamp:l,feedback:o});const c={studentID:localStorage.getItem("userId"),exerciseID:this.exercise.exerciseID,timestamp:(new Date).toISOString(),with_feedback:!1,feedback:o};this.updateLog(c)}catch(a){console.error(a)}},async getAllExercises(){try{const e=await le.Z.get("https://webpal-server.adaptable.app/getAllExercises");this.exercises=e.data,console.log(this.exercises)}catch(e){console.error(e)}},clearFeedbackLog(){this.feedbackLog=[]},generateSolutionInterface(){let e="",t="",s="";for(let o=0;o<this.exercise.data.data.length;o++){const i=this.exercise.data.data[o],a=i.filename.split(".").pop();if("html"===a){const t=i.code.match(/<body[^>]*>([\s\S]*)<\/body>/i);e=t?t[1]:""}else"css"===a?t+=`<style>${i.code}</style>`:"js"===a&&(s+=`<script>${i.code}<\/script>`)}const i=`<html><head>${t}</head><body>${e}${s}</body></html>`;this.professorHTML=i},updateLog(e){const t=localStorage.getItem("userId"),s="https://webpal-server.adaptable.app/log",i={userId:t,logContent:e};le.Z.post(s,i).then((()=>{console.log("Log data sent successfully")})).catch((e=>{console.error("Failed to send log data:",e)}))},executeCode(){var e=this.codeHTML;const t=this.jsFile.split(".")[0],s=this.cssFile.split(".")[0],i=new RegExp(`<script[^>]*src=['"]${t}\\.js['"][^>]*><\\/script>`,"i"),o=e.match(i),a=new RegExp(`<link[^>]*href=['"]${s}\\.css['"][^>]*>`,"i"),l=e.match(a);if(o&&this.codeJS){const t=`<script>${this.codeJS}<\/script>`;e=e.replace(/<\/body>\s*<\/html>/i,`${t}</body></html>`)}if(l&&this.codeCSS){const t=`<style>${this.codeCSS}</style>`;e=e.replace(/<\/head>/i,`${t}</head>`)}document.querySelector(".studentFrame").setAttribute("srcdoc",e)},backofficeRedirect(){this.$router.push({name:"Admin"})},createUserId(){if(!localStorage.getItem("userId")){const e=(0,me.Z)();localStorage.setItem("userId",e)}console.log(localStorage.getItem("userId"))},async submitCode(){const e=[];""!==this.codeHTML.trim()&&e.push({filename:this.htmlFile,code:this.codeHTML}),""!==this.codeCSS.trim()&&e.push({filename:this.cssFile,code:this.codeCSS}),""!==this.codeJS.trim()&&e.push({filename:this.jsFile,code:this.codeJS}),await this.evaluateExercise(this.exercise.exerciseID,JSON.stringify(e),8090,[])}},mounted(){this.getAllExercises(),this.createUserId()}};const Be=(0,l.Z)(Ne,[["render",qe],["__scopeId","data-v-513af382"]]);var Ke=Be;const Ye=e=>((0,o.dD)("data-v-74f74684"),e=e(),(0,o.Cn)(),e),Xe={key:0,class:"submit-success"},Ge={class:"exercise-creator"},Qe=Ye((()=>(0,o._)("div",{class:"title"},"Backoffice - Create Exercise",-1))),et={class:"form-container"},tt={class:"form-group"},st=Ye((()=>(0,o._)("label",{for:"assignment"},"Assignment Name/Description:",-1))),it={class:"form-group"},ot=Ye((()=>(0,o._)("label",{for:"description"},"Exercise Description:",-1))),at={class:"form-group"},lt={class:"codeEditors"},ct={class:"codeHTML"},rt={class:"codeEditorWrapper"},nt=Ye((()=>(0,o._)("label",{for:"htmlFile"},"HTML Filename:",-1))),dt=Ye((()=>(0,o._)("div",{class:"divider"},null,-1))),ut={class:"codeCSS"},pt={class:"codeEditorWrapper"},ht=Ye((()=>(0,o._)("label",{for:"cssFile"},"CSS Filename:",-1))),mt=Ye((()=>(0,o._)("div",{class:"divider"},null,-1))),bt={class:"codeJS"},gt={class:"codeEditorWrapper"},ft=Ye((()=>(0,o._)("label",{for:"jsFile"},"Javascript Filename:",-1))),xt={class:"form-group"},St=Ye((()=>(0,o._)("label",{for:"js-tests"},"JS Mocha Tests:",-1))),vt=["placeholder"];function _t(e,t,s,a,l,c){const r=(0,o.up)("Sidebar"),n=(0,o.up)("codemirror");return(0,o.wg)(),(0,o.iD)(o.HY,null,[l.submitSuccess?((0,o.wg)(),(0,o.iD)("div",Xe,"Exercise created successfully!")):(0,o.kq)("",!0),(0,o._)("div",Ge,[(0,o._)("header",null,[(0,o.Wm)(r,{onExerciseDetailsReceived:c.handleExerciseDetailsReceived},null,8,["onExerciseDetailsReceived"]),Qe,(0,o._)("button",{onClick:t[0]||(t[0]=(...e)=>c.playgroundRedirect&&c.playgroundRedirect(...e))},"Back to Playground")]),(0,o._)("div",et,[(0,o._)("div",tt,[st,(0,o.wy)((0,o._)("input",{id:"assignment",placeholder:"Insert exercise name...","onUpdate:modelValue":t[1]||(t[1]=e=>l.assignment=e),type:"text",required:""},null,512),[[i.nr,l.assignment]])]),(0,o._)("div",it,[ot,(0,o.wy)((0,o._)("input",{id:"description",placeholder:"Insert exercise description...","onUpdate:modelValue":t[2]||(t[2]=e=>l.description=e),type:"text",required:""},null,512),[[i.nr,l.description]])]),(0,o._)("div",at,[(0,o._)("div",lt,[(0,o._)("div",ct,[(0,o._)("div",rt,[nt,(0,o.wy)((0,o._)("input",{id:"htmlFile","onUpdate:modelValue":t[3]||(t[3]=e=>a.htmlFile=e),type:"text"},null,512),[[i.nr,a.htmlFile]]),(0,o.Wm)(n,{modelValue:a.codeHTML,"onUpdate:modelValue":t[4]||(t[4]=e=>a.codeHTML=e),placeholder:"HTML goes here...",style:{height:"200px",width:"100%",textAlign:"left",backgroundColor:"white"},autofocus:!0,"indent-with-tab":!0,"tab-size":4,extensions:a.extensionsHTML},null,8,["modelValue","extensions"])])]),dt,(0,o._)("div",ut,[(0,o._)("div",pt,[ht,(0,o.wy)((0,o._)("input",{id:"cssFile","onUpdate:modelValue":t[5]||(t[5]=e=>a.cssFile=e),type:"text"},null,512),[[i.nr,a.cssFile]]),(0,o.Wm)(n,{modelValue:a.codeCSS,"onUpdate:modelValue":t[6]||(t[6]=e=>a.codeCSS=e),placeholder:"CSS goes here...",style:{height:"200px",width:"100%",textAlign:"left",backgroundColor:"white"},autofocus:!0,"indent-with-tab":!0,"tab-size":4,extensions:a.extensionsCSS},null,8,["modelValue","extensions"])])]),mt,(0,o._)("div",bt,[(0,o._)("div",gt,[ft,(0,o.wy)((0,o._)("input",{id:"jsFile","onUpdate:modelValue":t[7]||(t[7]=e=>a.jsFile=e),type:"text"},null,512),[[i.nr,a.jsFile]]),(0,o.Wm)(n,{modelValue:a.codeJS,"onUpdate:modelValue":t[8]||(t[8]=e=>a.codeJS=e),placeholder:"Javascript goes here...",style:{height:"200px",width:"100%",textAlign:"left",backgroundColor:"white"},options:{mode:"javascript",extraKeys:{"Ctrl-Space":"autocomplete"}},autofocus:!0,"indent-with-tab":!0,"tab-size":4,extensions:a.extensionsJS},null,8,["modelValue","extensions"])])])])]),(0,o._)("div",xt,[St,(0,o.wy)((0,o._)("textarea",{id:"js-tests",placeholder:c.TestsPlaceholder,"onUpdate:modelValue":t[9]||(t[9]=e=>l.jsTests=e),required:""},null,8,vt),[[i.nr,l.jsTests]])]),(0,o._)("button",{onClick:t[10]||(t[10]=(...e)=>c.submitExercise&&c.submitExercise(...e))},"Submit Exercise")])])],64)}var wt={name:"AdminView",components:{Sidebar:ne,Codemirror:de.Z1},setup(){const e=[(0,ue.dy)()],t=[(0,pe.iv)()],s=[(0,he.eJ)()],i="",o="",a="",l="index.html",c="style.css",r="main.js";return{extensionsHTML:e,extensionsCSS:t,extensionsJS:s,codeHTML:i,codeCSS:o,codeJS:a,htmlFile:l,cssFile:c,jsFile:r}},data(){return{assignment:"",description:"",jsTests:"",exercises:[],showSidebar:!1,submitSuccess:!1}},computed:{TestsPlaceholder(){return"EXAMPLE:\nconst assert = chai.assert;\n\ndescribe('Example Test', function() {\nconst sum = document.getElementById('sum');\n\n  it('should return true', function(done) {\n    assert.equal(true, sum.innerHTML);\n    done() \n  });\n});"}},methods:{generateJSON(){const e=[{filename:this.htmlFile,code:this.codeHTML},{filename:this.cssFile,code:this.codeCSS},{filename:this.jsFile,code:this.codeJS}];return JSON.stringify(e,null,2)},async submitExercise(){const e=this.generateJSON(),t=this.jsTests,s=this.assignment,i=this.description;console.log(JSON.parse(e));try{const o=await le.Z.post("https://webpal-server.adaptable.app/createExercise",{code:e,tests:t,assignment:s,description:i});console.log("ID: "+o.data),this.exerciseID=o.data,this.submitSuccess=!0,this.assignment="",this.jsonData="",this.jsTests="",this.description=""}catch(o){console.error(o)}},handleExerciseDetailsReceived(e){this.assignment=e.assignment,e.data.data.forEach((e=>{e.filename.endsWith(".html")?(this.htmlFile=e.filename,this.codeHTML=e.code):e.filename.endsWith(".css")?(this.cssFile=e.filename,this.codeCSS=e.code):e.filename.endsWith(".js")&&(this.jsFile=e.filename,this.codeJS=e.code)})),this.jsTests=e.testData},playgroundRedirect(){this.$router.push({name:"Playground"})}}};const yt=(0,l.Z)(wt,[["render",_t],["__scopeId","data-v-74f74684"]]);var Ft=yt;const Ct=[{path:"/main",name:"Playground",component:fe,props:!0},{path:"/new",name:"PlaygroundWorstView",component:Ke,props:!0},{path:"/admin",name:"Admin",component:Ft,props:!0}],kt=(0,d.p7)({history:(0,d.r5)(),routes:Ct});var Et=kt;(0,i.ri)(n).use(Et).mount("#app")}},t={};function s(i){var o=t[i];if(void 0!==o)return o.exports;var a=t[i]={exports:{}};return e[i].call(a.exports,a,a.exports,s),a.exports}s.m=e,function(){var e=[];s.O=function(t,i,o,a){if(!i){var l=1/0;for(d=0;d<e.length;d++){i=e[d][0],o=e[d][1],a=e[d][2];for(var c=!0,r=0;r<i.length;r++)(!1&a||l>=a)&&Object.keys(s.O).every((function(e){return s.O[e](i[r])}))?i.splice(r--,1):(c=!1,a<l&&(l=a));if(c){e.splice(d--,1);var n=o();void 0!==n&&(t=n)}}return t}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[i,o,a]}}(),function(){s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,{a:t}),t}}(),function(){s.d=function(e,t){for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};s.O.j=function(t){return 0===e[t]};var t=function(t,i){var o,a,l=i[0],c=i[1],r=i[2],n=0;if(l.some((function(t){return 0!==e[t]}))){for(o in c)s.o(c,o)&&(s.m[o]=c[o]);if(r)var d=r(s)}for(t&&t(i);n<l.length;n++)a=l[n],s.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return s.O(d)},i=self["webpackChunkwebpal_demo"]=self["webpackChunkwebpal_demo"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=s.O(void 0,[998],(function(){return s(4784)}));i=s.O(i)})();
//# sourceMappingURL=app.a61eb90c.js.map