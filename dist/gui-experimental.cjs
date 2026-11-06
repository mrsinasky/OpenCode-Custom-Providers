"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const e=require("solid-js/web"),T=require("@opencode/plugin/gui"),i=require("solid-js"),tt=require("@opencode/plugin/rpc"),rt={title:"Custom providers",description:"Add OpenAI-compatible providers and choose which models OpenCode should use.",add:"Add provider",edit:"Edit",delete:"Delete",save:"Save",saving:"Saving…",cancel:"Cancel",fetch:"Fetch models",fetching:"Fetching models…",refresh:"Refresh",loading:"Loading…",noProviders:"No custom providers yet.",noProvidersHint:"Add a provider to fetch its models and save the ones you want.",config:"Configuration",configPath:"Config file",reveal:"Show file",copyPath:"Copy path",copied:"Copied",provider:"Provider",providers:"Providers",modelCount:"{{count}} models",selectedCount:"{{count}} selected",name:"Display name",id:"Provider ID",idHint:"Used as the prefix in model references, e.g. myprovider/model.",baseURL:"Base URL",baseURLHint:"Usually ends in /v1.",apiKey:"API key",apiKeyKeep:"Leave blank to keep the saved key.",apiKeyOptional:"Optional for local providers.",showKey:"Show API key",hideKey:"Hide API key",tools:"tools",vision:"vision",reasoning:"reasoning",package:"API compatibility",packageOpenAI:"OpenAI-compatible",packageResponses:"OpenAI-compatible (Responses)",packageAnthropic:"Anthropic-compatible",models:"Models",searchModels:"Search models",selectAll:"Select all",clear:"Clear",hideNonChat:"Hide non-chat models",noModels:"No models loaded. Fetch the provider's model list first.",noMatches:"No models match this search.",showAll:"Show all",advanced:"Limits",context:"Context limit",output:"Output limit",manual:"Add a model manually",manualPlaceholder:"model-id",addManual:"Add",newProvider:"Add custom provider",editProvider:"Edit provider",required:"Required",invalidId:"Use letters, numbers, dots, dashes or underscores.",invalidURL:"Enter a valid http:// or https:// URL.",invalidName:"Enter a display name.",discoverFailed:"Could not load models",saveFailed:"Could not save the provider",deleteTitle:"Delete provider?",deleteDescription:"This removes {{name}} and its models from your configuration. A backup is kept.",deleted:"Provider removed",saved:"Provider saved",savedHint:"OpenCode reloads the configuration automatically.",configMissing:"The config file does not exist yet; it will be created.",configFormat:"Format: {{format}}",keyStored:"A key is saved",keyMissing:"No key saved",noModelsSelected:"Select at least one model, or save the provider without models.",legacy:"already saved",openSettings:"Manage custom providers",error:"Error",ok:"OK",emptyModelsHint:"The provider returned no models. You can add model IDs manually.",baseURLPlaceholder:"https://api.example.com/v1",apiKeyPlaceholder:"sk-…",namePlaceholder:"My provider",idPlaceholder:"myprovider",packageHint:"Changes which runtime package is written to the config.",modelIdHint:"Model ID sent to the provider",contextHint:"Tokens",outputHint:"Tokens",flavor:"Package",providerName:"Provider",idTaken:"A provider with this ID already exists. Saving overwrites it.",modelsHelp:"Fetched from GET /models.",endpoint:"Endpoint",optional:"optional",deleteConfirm:"Delete",showConfig:"Config",configError:"The configuration could not be read.",retry:"Retry","command.manage":"Custom providers: manage","command.manage.description":"Add a custom provider and choose its models","command.manage.keywords":"provider model api endpoint custom","command.category":"Providers"},nt={title:"پرووایدرهای سفارشی",description:"پرووایدرهای سازگار با OpenAI را اضافه کنید و انتخاب کنید کدام مدل‌ها در OpenCode استفاده شوند.",add:"افزودن پرووایدر",edit:"ویرایش",delete:"حذف",save:"ذخیره",saving:"در حال ذخیره…",cancel:"انصراف",fetch:"دریافت مدل‌ها",fetching:"در حال دریافت مدل‌ها…",refresh:"به‌روزرسانی",loading:"در حال بارگذاری…",noProviders:"هنوز پرووایدر سفارشی ندارید.",noProvidersHint:"یک پرووایدر اضافه کنید تا مدل‌هایش دریافت و انتخاب شوند.",config:"تنظیمات",configPath:"فایل کانفیگ",reveal:"نمایش فایل",copyPath:"کپی مسیر",copied:"کپی شد",provider:"پرووایدر",providers:"پرووایدرها",modelCount:"{{count}} مدل",selectedCount:"{{count}} انتخاب‌شده",name:"نام نمایشی",id:"شناسه پرووایدر",idHint:"به‌عنوان پیشوند در ارجاع مدل استفاده می‌شود، مثلاً myprovider/model.",baseURL:"آدرس Base URL",baseURLHint:"معمولاً به /v1 ختم می‌شود.",apiKey:"کلید API",apiKeyKeep:"برای نگه‌داشتن کلید ذخیره‌شده خالی بگذارید.",apiKeyOptional:"برای پرووایدرهای محلی اختیاری است.",showKey:"نمایش کلید API",hideKey:"پنهان‌کردن کلید API",tools:"ابزار",vision:"بینایی",reasoning:"استدلال",package:"سازگاری API",packageOpenAI:"سازگار با OpenAI",packageResponses:"سازگار با OpenAI (Responses)",packageAnthropic:"سازگار با Anthropic",models:"مدل‌ها",searchModels:"جستجوی مدل",selectAll:"انتخاب همه",clear:"پاک‌کردن",hideNonChat:"پنهان‌کردن مدل‌های غیرچت",noModels:"مدلی بارگذاری نشده است. ابتدا لیست مدل‌های پرووایدر را دریافت کنید.",noMatches:"مدلی با این جستجو پیدا نشد.",showAll:"نمایش همه",advanced:"محدودیت‌ها",context:"محدودیت ورودی",output:"محدودیت خروجی",manual:"افزودن دستی مدل",manualPlaceholder:"model-id",addManual:"افزودن",newProvider:"افزودن پرووایدر سفارشی",editProvider:"ویرایش پرووایدر",required:"الزامی",invalidId:"فقط حروف، اعداد، نقطه، خط تیره و زیرخط مجاز است.",invalidURL:"یک URL معتبر با http:// یا https:// وارد کنید.",invalidName:"یک نام نمایشی وارد کنید.",discoverFailed:"دریافت مدل‌ها ناموفق بود",saveFailed:"ذخیره پرووایدر ناموفق بود",deleteTitle:"حذف پرووایدر؟",deleteDescription:"{{name}} و مدل‌هایش از کانفیگ حذف می‌شوند. یک بکاپ نگه داشته می‌شود.",deleted:"پرووایدر حذف شد",saved:"پرووایدر ذخیره شد",savedHint:"OpenCode کانفیگ را به‌صورت خودکار دوباره بارگذاری می‌کند.",configMissing:"فایل کانفیگ وجود ندارد و ساخته می‌شود.",configFormat:"فرمت: {{format}}",keyStored:"کلید ذخیره شده",keyMissing:"کلید ذخیره نشده",noModelsSelected:"حداقل یک مدل انتخاب کنید، یا پرووایدر را بدون مدل ذخیره کنید.",legacy:"ذخیره‌شده",openSettings:"مدیریت پرووایدرهای سفارشی",error:"خطا",ok:"باشه",emptyModelsHint:"پرووایدر مدلی برنگرداند. می‌توانید شناسه مدل را دستی اضافه کنید.",baseURLPlaceholder:"https://api.example.com/v1",apiKeyPlaceholder:"sk-…",namePlaceholder:"پرووایدر من",idPlaceholder:"myprovider",packageHint:"پکیج runtime که در کانفیگ نوشته می‌شود را تغییر می‌دهد.",modelIdHint:"شناسه مدل که به پرووایدر ارسال می‌شود",contextHint:"توکن",outputHint:"توکن",flavor:"پکیج",providerName:"پرووایدر",idTaken:"پرووایدری با این شناسه وجود دارد. ذخیره آن را بازنویسی می‌کند.",modelsHelp:"دریافت‌شده از GET /models.",endpoint:"Endpoint",optional:"اختیاری",deleteConfirm:"حذف",showConfig:"کانفیگ",configError:"خواندن کانفیگ ناموفق بود.",retry:"تلاش دوباره","command.manage":"پرووایدرهای سفارشی: مدیریت","command.manage.description":"افزودن پرووایدر سفارشی و انتخاب مدل‌ها","command.manage.keywords":"provider model api endpoint custom پرووایدر مدل","command.category":"پرووایدرها"},it=T.Plugin.define({i18n:{en:rt,fa:nt}}),Te={type:"object",properties:{},required:[],additionalProperties:!1},xe={type:"object",properties:{id:{type:"string"},name:{type:"string"},context:{type:"number"},output:{type:"number"},tools:{type:"boolean"},vision:{type:"boolean"},reasoning:{type:"boolean"},cost:{type:"object",properties:{input:{type:"number"},output:{type:"number"},cacheRead:{type:"number"},cacheWrite:{type:"number"}},required:["input","output"],additionalProperties:!1},mode:{type:"string"},legacy:{type:"boolean"}},required:["id","name"],additionalProperties:!1},ot={type:"object",properties:{id:{type:"string"},name:{type:"string"},baseURL:{type:"string"},package:{type:"string"},flavor:{type:"string",enum:["openai","responses","anthropic"]},hasKey:{type:"boolean"},models:{type:"array",items:xe}},required:["id","name","baseURL","package","flavor","hasKey","models"],additionalProperties:!1},Oe={type:"object",properties:{path:{type:"string"},exists:{type:"boolean"},format:{type:"string",enum:["v1","v2"]}},required:["path","exists","format"],additionalProperties:!1},at={type:"object",properties:{info:Oe,providers:{type:"array",items:ot},error:{type:"string"}},required:["info","providers"],additionalProperties:!1},st={type:"object",properties:{baseURL:{type:"string"},apiKey:{type:"string"},providerID:{type:"string"},flavor:{type:"string",enum:["openai","responses","anthropic"]}},required:["baseURL","flavor"],additionalProperties:!1},lt={type:"object",properties:{ok:{type:"boolean"},models:{type:"array",items:xe},error:{type:"string"},endpoint:{type:"string"}},required:["ok"],additionalProperties:!1},ct={type:"object",properties:{id:{type:"string"},name:{type:"string"},baseURL:{type:"string"},apiKey:{type:"string"},flavor:{type:"string",enum:["openai","responses","anthropic"]},models:{type:"array",items:xe},previousID:{type:"string"}},required:["id","name","baseURL","flavor","models"],additionalProperties:!1},pt={type:"object",properties:{ok:{type:"boolean"},error:{type:"string"},path:{type:"string"}},required:["ok"],additionalProperties:!1},dt={type:"object",properties:{id:{type:"string"}},required:["id"],additionalProperties:!1},ut={type:"object",properties:{ok:{type:"boolean"},error:{type:"string"},path:{type:"string"}},required:["ok"],additionalProperties:!1},Fe=tt.Rpc.define({id:"custom-providers",methods:{info:{input:Te,output:Oe},list:{input:Te,output:at},discover:{input:st,output:lt},save:{input:ct,output:pt},remove:{input:dt,output:ut}},events:{}}),Ue=/(^|[-_./:])(embed|embedding|embeddings|whisper|tts|audio|image|dall-e|dalle|moderation|rerank|transcribe|transcription|speech|voice|sora|ocr)([-_./:]|$)/i,gt=/embed|image|audio|video|moderation|rerank|tts|speech|transcri/i;function mt(r){const t=r.mode?.trim().toLowerCase();return t&&gt.test(t)?!1:t==="completion"||t==="chat"||t==="responses"?!0:!Ue.test(r.id)&&!Ue.test(r.name)}function vt(r){if(!(r===void 0||!Number.isFinite(r)||r<=0)){if(r>=1e6){const t=r/1e6;return`${Number.isInteger(t)?t:t.toFixed(1)}M`}if(r>=1e3){const t=r/1e3;return`${Number.isInteger(t)?t:t.toFixed(1)}K`}return String(r)}}var he=e.template("<span class=cp-field-error>"),fe=e.template("<span class=cp-hint>"),ht=e.template("<div class=cp-model-list>"),ft=e.template("<div class=cp-form><div class=cp-grid><div class=cp-field><span class=cp-field-label></span></div><div class=cp-field><span class=cp-field-label></span></div></div><div class=cp-grid><div class=cp-field><span class=cp-field-label></span></div><div class=cp-field><span class=cp-field-label> <span class=cp-hint>(<!>)</span></span><div class=cp-input-row></div><span class=cp-hint></span></div></div><div class=cp-section><div class=cp-section-head><span class=cp-section-title></span><span class=cp-section-sub></span></div><div class=cp-flavor-row></div></div><div class=cp-section><div class=cp-section-head><div><div class=cp-section-title></div><div class=cp-section-sub></div></div></div><div class=cp-toolbar><div class=cp-search></div><span class=cp-switch-row></span></div><div class=cp-manual><div class=cp-field><span class=cp-field-label></span><span class=cp-hint>"),xt=e.template("<div class=cp-dialog-footer><span class=cp-dialog-note>"),bt=e.template('<div class="cp-banner cp-banner-error"><span>'),yt=e.template("<span class=cp-inline-code>"),He=e.template('<div class="cp-banner cp-banner-info">'),ie=e.template("<span class=cp-badge>"),Ct=e.template("<div class=cp-model><div class=cp-model-main><div class=cp-model-name></div><div class=cp-model-id></div><div class=cp-model-meta>"),wt=e.template("<div class=cp-limits><div class=cp-field><span class=cp-field-label></span></div><div class=cp-field><span class=cp-field-label>"),$t=e.template("<span>");const St=[{value:"openai",label:"packageOpenAI"},{value:"responses",label:"packageResponses"},{value:"anthropic",label:"packageAnthropic"}],_t=/^[A-Za-z0-9][A-Za-z0-9._-]*$/;function kt(r){const t=T.usePlugin(),J=()=>t.client.rpc(Fe),W=(r.provider?.models??[]).map(n=>({...n,legacy:!0})),[$,Y]=i.createSignal(r.provider?.name??""),[S,Q]=i.createSignal(r.provider?.id??""),[U,P]=i.createSignal(r.provider?.baseURL??""),[C,oe]=i.createSignal(""),[I,ae]=i.createSignal(!1),[H,se]=i.createSignal(r.provider?.flavor??"openai"),[O,s]=i.createSignal(W),[v,g]=i.createSignal(new Set(W.map(n=>n.id))),[B,le]=i.createSignal(""),[q,j]=i.createSignal(!0),[d,c]=i.createSignal(new Set),[m,_]=i.createSignal(""),[M,k]=i.createSignal(),[F,w]=i.createSignal(!1),[X,V]=i.createSignal(!1),[R,N]=i.createSignal(!1),[ce,b]=i.createSignal(),f=()=>_t.test(S().trim()),A=()=>{try{const n=new URL(U().trim());return n.protocol==="http:"||n.protocol==="https:"}catch{return!1}},G=()=>$().trim().length>0,Ne=()=>r.existingIDs.has(S().trim())&&r.provider?.id!==S().trim(),Ee=n=>{Q(n),$().trim()||Y(n)},pe=i.createMemo(()=>{const n=B().trim().toLowerCase();return O().filter(l=>q()&&!mt(l)?!1:n?l.id.toLowerCase().includes(n)||(l.name??"").toLowerCase().includes(n):!0)}),De=n=>{g(l=>{const o=new Set(l);return o.has(n)?o.delete(n):o.add(n),o})},Be=()=>{g(n=>{const l=new Set(n);for(const o of pe())l.add(o.id);return l})},qe=()=>g(new Set),je=(n,l)=>{s(o=>o.map(h=>h.id===n?{...h,...l}:h))},be=(n,l,o)=>{const h=o.replace(/[^\d]/g,"");je(n,l==="context"?{context:h?Number(h):void 0}:{output:h?Number(h):void 0})},Ve=n=>{c(l=>{const o=new Set(l);return o.has(n)?o.delete(n):o.add(n),o})},ye=()=>{const n=m().trim();n&&(s(l=>l.some(o=>o.id===n)?l:[...l,{id:n,name:n,legacy:!0}]),g(l=>new Set(l).add(n)),_(""))},Ge=async()=>{if(N(!0),!A()){b(t.t("invalidURL"));return}w(!0),b(void 0);try{const n=await J().discover({baseURL:U().trim(),apiKey:C().trim()||void 0,providerID:r.provider?.id,flavor:H()});if(!n.ok){b(n.error??t.t("discoverFailed"));return}const l=n.models??[],o=new Set(l.map(x=>x.id)),h=O().filter(x=>!o.has(x.id)&&(x.legacy||v().has(x.id))),L=[...l.map(x=>({...x,legacy:!1})),...h];s(L),k(n.endpoint),g(x=>{const ee=new Set(L.map(E=>E.id)),z=new Set;for(const E of x)ee.has(E)&&z.add(E);return z})}catch(n){b(n instanceof Error?n.message:String(n))}finally{w(!1)}},Ze=async()=>{if(N(!0),b(void 0),!(!G()||!f()||!A())){V(!0);try{const n=O().filter(o=>v().has(o.id)).map(o=>({id:o.id,name:o.name||o.id,context:o.context,output:o.output,tools:o.tools,vision:o.vision,reasoning:o.reasoning,cost:o.cost})),l=await J().save({id:S().trim(),name:$().trim(),baseURL:U().trim(),apiKey:C().trim()||void 0,flavor:H(),models:n,previousID:r.provider?.id});if(!l.ok){b(l.error??t.t("saveFailed"));return}t.toast.show({title:t.t("saved"),description:t.t("savedHint"),variant:"success"}),r.onSaved(),r.dialog.close()}catch(n){b(n instanceof Error?n.message:String(n))}finally{V(!1)}}},Ce=n=>n===void 0?"":String(n);return e.createComponent(t.ui.Dialog,{get title(){return e.memo(()=>!!r.provider)()?t.t("editProvider"):t.t("newProvider")},size:"large",get footer(){return(()=>{var n=xt(),l=n.firstChild;return e.insert(l,(()=>{var o=e.memo(()=>v().size>0);return()=>o()?t.t("selectedCount",{count:v().size}):t.t("noModelsSelected")})()),e.insert(n,e.createComponent(t.ui.Button,{variant:"ghost",get onClick(){return r.dialog.close},get children(){return t.t("cancel")}}),null),e.insert(n,e.createComponent(t.ui.Button,{variant:"contrast",get busy(){return X()},onClick:()=>{Ze()},get children(){return e.memo(()=>!!X())()?t.t("saving"):t.t("save")}}),null),n})()},get children(){var n=ft(),l=n.firstChild,o=l.firstChild,h=o.firstChild,L=o.nextSibling,x=L.firstChild,ee=l.nextSibling,z=ee.firstChild,E=z.firstChild,Je=z.nextSibling,de=Je.firstChild,we=de.firstChild,$e=we.nextSibling,We=$e.firstChild,Se=We.nextSibling;Se.nextSibling;var ue=de.nextSibling,Ye=ue.nextSibling,_e=ee.nextSibling,ke=_e.firstChild,Pe=ke.firstChild,Qe=Pe.nextSibling,Xe=ke.nextSibling,ge=_e.nextSibling,me=ge.firstChild,et=me.firstChild,Ie=et.firstChild,Me=Ie.nextSibling,te=me.nextSibling,Re=te.firstChild,re=Re.nextSibling,ve=te.nextSibling,Ae=ve.firstChild,Le=Ae.firstChild,ze=Le.nextSibling;return e.insert(h,()=>t.t("name")),e.insert(o,e.createComponent(t.ui.TextInput,{get label(){return t.t("name")},get placeholder(){return t.t("namePlaceholder")},get value(){return $()},onInput:Y,autofocus:!0}),null),e.insert(o,e.createComponent(i.Show,{get when(){return e.memo(()=>!!R())()&&!G()},get children(){var a=he();return e.insert(a,()=>t.t("invalidName")),a}}),null),e.insert(x,()=>t.t("id")),e.insert(L,e.createComponent(t.ui.TextInput,{get label(){return t.t("id")},get placeholder(){return t.t("idPlaceholder")},get value(){return S()},onInput:Ee,get invalid(){return e.memo(()=>!!R())()&&!f()}}),null),e.insert(L,e.createComponent(i.Show,{get when(){return e.memo(()=>!!R())()&&!f()},get fallback(){return(()=>{var a=fe();return e.insert(a,()=>t.t("idHint")),a})()},get children(){var a=he();return e.insert(a,()=>t.t("invalidId")),a}}),null),e.insert(L,e.createComponent(i.Show,{get when(){return Ne()},get children(){var a=fe();return e.insert(a,()=>t.t("idTaken")),a}}),null),e.insert(E,()=>t.t("baseURL")),e.insert(z,e.createComponent(t.ui.TextInput,{get label(){return t.t("baseURL")},get placeholder(){return t.t("baseURLPlaceholder")},type:"url",get value(){return U()},onInput:P,get invalid(){return e.memo(()=>!!R())()&&!A()}}),null),e.insert(z,e.createComponent(i.Show,{get when(){return e.memo(()=>!!R())()&&!A()},get fallback(){return(()=>{var a=fe();return e.insert(a,()=>t.t("baseURLHint")),a})()},get children(){var a=he();return e.insert(a,()=>t.t("invalidURL")),a}}),null),e.insert(de,()=>t.t("apiKey"),we),e.insert($e,()=>t.t("optional"),Se),e.insert(ue,e.createComponent(t.ui.TextInput,{get label(){return t.t("apiKey")},get placeholder(){return t.t("apiKeyPlaceholder")},get type(){return I()?"text":"password"},get value(){return C()},onInput:oe}),null),e.insert(ue,e.createComponent(t.ui.IconButton,{get icon(){return I()?"outline-eye-slash":"eye"},get label(){return e.memo(()=>!!I())()?t.t("hideKey"):t.t("showKey")},onClick:()=>ae(a=>!a)}),null),e.insert(Ye,(()=>{var a=e.memo(()=>!!r.provider);return()=>a()?t.t("apiKeyKeep"):t.t("apiKeyOptional")})()),e.insert(Pe,()=>t.t("flavor")),e.insert(Qe,()=>t.t("packageHint")),e.insert(Xe,e.createComponent(i.For,{each:St,children:a=>e.createComponent(t.ui.Button,{size:"small",get variant(){return H()===a.value?"contrast":"neutral"},onClick:()=>se(a.value),get children(){return t.t(a.label)}})})),e.insert(n,e.createComponent(i.Show,{get when(){return ce()},children:a=>(()=>{var p=bt(),y=p.firstChild;return e.insert(p,e.createComponent(t.ui.Icon,{name:"warning",size:"small"}),y),e.insert(y,a),p})()}),ge),e.insert(Ie,()=>t.t("models")),e.insert(Me,()=>t.t("modelsHelp"),null),e.insert(Me,e.createComponent(i.Show,{get when(){return M()},children:a=>(()=>{var p=yt();return e.insert(p,a),p})()}),null),e.insert(me,e.createComponent(t.ui.Button,{size:"small",icon:"refresh",get busy(){return F()},onClick:()=>{Ge()},get children(){return e.memo(()=>!!F())()?t.t("fetching"):t.t("fetch")}}),null),e.insert(Re,e.createComponent(t.ui.TextInput,{get label(){return t.t("searchModels")},get placeholder(){return t.t("searchModels")},type:"search",get value(){return B()},onInput:le})),e.insert(te,e.createComponent(t.ui.Button,{size:"small",variant:"ghost",onClick:Be,get children(){return t.t("selectAll")}}),re),e.insert(te,e.createComponent(t.ui.Button,{size:"small",variant:"ghost",onClick:qe,get children(){return t.t("clear")}}),re),e.insert(re,e.createComponent(t.ui.Switch,{get label(){return t.t("hideNonChat")},hideLabel:!0,get checked(){return q()},onChange:j}),null),e.insert(re,()=>t.t("hideNonChat"),null),e.insert(ge,e.createComponent(i.Show,{get when(){return O().length>0},get fallback(){return(()=>{var a=He();return e.insert(a,()=>t.t("noModels")),a})()},get children(){return e.createComponent(i.Show,{get when(){return pe().length>0},get fallback(){return(()=>{var a=He();return e.insert(a,()=>t.t("noMatches")),a})()},get children(){var a=ht();return e.insert(a,e.createComponent(i.For,{get each(){return pe()},children:p=>[(()=>{var y=Ct(),D=y.firstChild,ne=D.firstChild,Z=ne.nextSibling,K=Z.nextSibling;return e.insert(y,e.createComponent(t.ui.Switch,{get label(){return p.name||p.id},hideLabel:!0,get checked(){return v().has(p.id)},onChange:()=>De(p.id)}),D),e.insert(ne,()=>p.name||p.id),e.insert(Z,()=>p.id),e.insert(K,e.createComponent(i.Show,{get when(){return vt(p.context)},children:u=>(()=>{var Ke=$t();return e.insert(Ke,()=>`${u()} ${t.t("contextHint")}`),Ke})()}),null),e.insert(K,e.createComponent(i.Show,{get when(){return p.tools},get children(){var u=ie();return e.insert(u,()=>t.t("tools")),u}}),null),e.insert(K,e.createComponent(i.Show,{get when(){return p.vision},get children(){var u=ie();return e.insert(u,()=>t.t("vision")),u}}),null),e.insert(K,e.createComponent(i.Show,{get when(){return p.reasoning},get children(){var u=ie();return e.insert(u,()=>t.t("reasoning")),u}}),null),e.insert(K,e.createComponent(i.Show,{get when(){return p.legacy},get children(){var u=ie();return e.insert(u,()=>t.t("legacy")),u}}),null),e.insert(y,e.createComponent(t.ui.Tooltip,{get value(){return t.t("advanced")},get children(){return e.createComponent(t.ui.IconButton,{get icon(){return d().has(p.id)?"chevron-down":"chevron-right"},get label(){return t.t("advanced")},get pressed(){return d().has(p.id)},onClick:()=>Ve(p.id)})}}),null),y})(),e.createComponent(i.Show,{get when(){return d().has(p.id)},get children(){var y=wt(),D=y.firstChild,ne=D.firstChild,Z=D.nextSibling,K=Z.firstChild;return e.insert(ne,()=>t.t("context")),e.insert(D,e.createComponent(t.ui.TextInput,{get label(){return t.t("context")},get placeholder(){return t.t("contextHint")},get value(){return Ce(p.context)},onInput:u=>be(p.id,"context",u)}),null),e.insert(K,()=>t.t("output")),e.insert(Z,e.createComponent(t.ui.TextInput,{get label(){return t.t("output")},get placeholder(){return t.t("outputHint")},get value(){return Ce(p.output)},onInput:u=>be(p.id,"output",u)}),null),y}})]})),a}})}}),ve),e.insert(Le,()=>t.t("manual")),e.insert(Ae,e.createComponent(t.ui.TextInput,{get label(){return t.t("manual")},get placeholder(){return t.t("manualPlaceholder")},get value(){return m()},onInput:_,onSubmit:ye}),ze),e.insert(ze,()=>t.t("modelIdHint")),e.insert(ve,e.createComponent(t.ui.Button,{icon:"plus",onClick:ye,get children(){return t.t("addManual")}}),null),n}})}var Pt=e.template("<div class=cp-list>"),It=e.template("<div class=cp-page><div class=cp-header><div><h2></h2><p></p></div><div class=cp-header-actions></div></div><div class=cp-credit>By Sina Asemani"),Mt=e.template("<span class=cp-hint>"),Rt=e.template("<div class=cp-config><div class=cp-config-main><span class=cp-label></span><span class=cp-path></span></div><div class=cp-config-side><span class=cp-format>"),At=e.template('<div class="cp-banner cp-banner-error"><span>'),Lt=e.template("<div class=cp-empty><span>"),zt=e.template("<div class=cp-empty><strong></strong><span>"),Kt=e.template("<div class=cp-provider><div class=cp-provider-main><div class=cp-provider-name><span></span><span class=cp-provider-id></span></div><div class=cp-provider-url></div><div class=cp-provider-meta><span></span><span class=cp-dot></span><span></span><span class=cp-badge></span></div></div><div class=cp-provider-actions>");function Tt(){const r=T.usePlugin(),t=()=>r.client.rpc(Fe),[J,W]=i.createSignal(),[$,Y]=i.createSignal([]),[S,Q]=i.createSignal(!0),[U,P]=i.createSignal(),C=async()=>{Q(!0),P(void 0);try{const s=await t().list({});W(s.info),Y(s.providers),s.error&&P(s.error)}catch(s){P(s instanceof Error?s.message:String(s))}finally{Q(!1)}};i.onMount(()=>{C()});const oe=i.createMemo(()=>new Set($().map(s=>s.id))),I=s=>{r.dialogs.open(v=>e.createComponent(kt,{dialog:v,provider:s,get existingIDs(){return oe()},onSaved:()=>{C()}}))},ae=async s=>{if(await r.dialogs.confirm({title:r.t("deleteTitle"),description:r.t("deleteDescription",{name:s.name||s.id}),confirm:r.t("deleteConfirm"),cancel:r.t("cancel"),danger:!0}))try{const g=await t().remove({id:s.id});if(!g.ok){P(g.error??r.t("configError"));return}r.toast.show({title:r.t("deleted"),variant:"success"}),await C()}catch(g){P(g instanceof Error?g.message:String(g))}},H=async s=>{s&&(await r.system.copy(s),r.toast.show({title:r.t("copied"),variant:"success",duration:2e3}))},se=async s=>{s&&(r.desktop&&await r.desktop.reveal(s)||await H(s))},O=s=>s.flavor==="anthropic"?r.t("packageAnthropic"):s.flavor==="responses"?r.t("packageResponses"):r.t("packageOpenAI");return(()=>{var s=It(),v=s.firstChild,g=v.firstChild,B=g.firstChild,le=B.nextSibling,q=g.nextSibling,j=v.nextSibling;return e.insert(B,()=>r.t("title")),e.insert(le,()=>r.t("description")),e.insert(q,e.createComponent(r.ui.Tooltip,{get value(){return r.t("refresh")},get children(){return e.createComponent(r.ui.IconButton,{icon:"refresh",get label(){return r.t("refresh")},get busy(){return S()},onClick:()=>{C()}})}}),null),e.insert(q,e.createComponent(r.ui.Button,{variant:"contrast",icon:"plus",onClick:()=>I(),get children(){return r.t("add")}}),null),e.insert(s,e.createComponent(i.Show,{get when(){return J()},children:d=>(()=>{var c=Rt(),m=c.firstChild,_=m.firstChild,M=_.nextSibling,k=m.nextSibling,F=k.firstChild;return e.insert(_,()=>r.t("configPath")),e.insert(M,()=>d().path),e.insert(m,e.createComponent(i.Show,{get when(){return!d().exists},get children(){var w=Mt();return e.insert(w,()=>r.t("configMissing")),w}}),null),e.insert(F,()=>d().format.toUpperCase()),e.insert(k,e.createComponent(r.ui.Tooltip,{get value(){return r.t("copyPath")},get children(){return e.createComponent(r.ui.IconButton,{icon:"copy",get label(){return r.t("copyPath")},onClick:()=>{H(d().path)}})}}),null),e.insert(k,e.createComponent(r.ui.Tooltip,{get value(){return r.t("reveal")},get children(){return e.createComponent(r.ui.IconButton,{icon:"folder",get label(){return r.t("reveal")},onClick:()=>{se(d().path)}})}}),null),e.effect(()=>e.setAttribute(M,"title",d().path)),c})()}),j),e.insert(s,e.createComponent(i.Show,{get when(){return U()},children:d=>(()=>{var c=At(),m=c.firstChild;return e.insert(c,e.createComponent(r.ui.Icon,{name:"warning",size:"small"}),m),e.insert(m,d),e.insert(c,e.createComponent(r.ui.Button,{size:"small",variant:"ghost",icon:"refresh",onClick:()=>{C()},get children(){return r.t("retry")}}),null),c})()}),j),e.insert(s,e.createComponent(i.Show,{get when(){return!S()},get fallback(){return(()=>{var d=Lt(),c=d.firstChild;return e.insert(d,e.createComponent(r.ui.Loader,{}),c),e.insert(c,()=>r.t("loading")),d})()},get children(){return e.createComponent(i.Show,{get when(){return $().length>0},get fallback(){return(()=>{var d=zt(),c=d.firstChild,m=c.nextSibling;return e.insert(d,e.createComponent(r.ui.Icon,{name:"providers",size:"large"}),c),e.insert(c,()=>r.t("noProviders")),e.insert(m,()=>r.t("noProvidersHint")),e.insert(d,e.createComponent(r.ui.Button,{variant:"contrast",icon:"plus",onClick:()=>I(),get children(){return r.t("add")}}),null),d})()},get children(){var d=Pt();return e.insert(d,e.createComponent(i.For,{get each(){return $()},children:c=>(()=>{var m=Kt(),_=m.firstChild,M=_.firstChild,k=M.firstChild,F=k.nextSibling,w=M.nextSibling,X=w.nextSibling,V=X.firstChild,R=V.nextSibling,N=R.nextSibling,ce=N.nextSibling,b=_.nextSibling;return e.insert(k,()=>c.name||c.id),e.insert(F,()=>c.id),e.insert(w,()=>c.baseURL||"—"),e.insert(V,()=>r.t("modelCount",{count:c.models.length})),e.insert(N,(()=>{var f=e.memo(()=>!!c.hasKey);return()=>f()?r.t("keyStored"):r.t("keyMissing")})()),e.insert(ce,()=>O(c)),e.insert(b,e.createComponent(r.ui.Tooltip,{get value(){return r.t("edit")},get children(){return e.createComponent(r.ui.IconButton,{icon:"edit",get label(){return r.t("edit")},onClick:()=>I(c)})}}),null),e.insert(b,e.createComponent(r.ui.Tooltip,{get value(){return r.t("delete")},get children(){return e.createComponent(r.ui.IconButton,{icon:"trash",get label(){return r.t("delete")},onClick:()=>{ae(c)}})}}),null),e.effect(f=>{var A=c.baseURL,G=c.hasKey?"cp-badge cp-badge-ok":"cp-badge cp-badge-warn";return A!==f.e&&e.setAttribute(w,"title",f.e=A),G!==f.t&&e.className(N,f.t=G),f},{e:void 0,t:void 0}),m})()})),d}})}}),j),s})()}const Ut=`
.cp-page {
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
  max-width: 720px;
  min-height: 100%;
  box-sizing: border-box;
  padding: 48px 0 40px;
  font-size: 13px;
  line-height: var(--line-height-compact, 1.45);
  color: var(--v2-text-text-base, currentColor);
}
.cp-credit {
  margin-top: auto;
  padding-top: 32px;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.01em;
  text-align: center;
  color: var(--v2-text-text-faint, color-mix(in srgb, currentColor 45%, transparent));
}
.cp-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
.cp-header h2 {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 530;
  line-height: 20px;
  letter-spacing: -0.13px;
  color: var(--v2-text-text-base, currentColor);
}
.cp-header p {
  margin: 0;
  max-width: 560px;
  font-size: 13px;
  font-weight: 440;
  line-height: 20px;
  letter-spacing: -0.04px;
  color: var(--v2-text-text-muted, color-mix(in srgb, currentColor 65%, transparent));
}
.cp-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.cp-config {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 8px;
  background: var(--v2-background-bg-layer-01, color-mix(in srgb, currentColor 4%, transparent));
  box-shadow: inset 0 0 0 0.5px var(--v2-border-border-muted, color-mix(in srgb, currentColor 12%, transparent));
}
.cp-config-main {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.cp-label {
  font-size: 13px;
  font-weight: 530;
  line-height: var(--line-height-compact, 1.45);
  color: var(--v2-text-text-base, currentColor);
}
.cp-path {
  font-family: var(--v2-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  font-size: 12px;
  color: var(--v2-text-text-muted, color-mix(in srgb, currentColor 65%, transparent));
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cp-config-side {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.cp-format {
  font-size: 11px;
  font-weight: 530;
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--v2-background-bg-layer-03, color-mix(in srgb, currentColor 9%, transparent));
  color: var(--v2-text-text-muted, color-mix(in srgb, currentColor 70%, transparent));
}
.cp-banner {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 8px;
  line-height: 1.45;
}
.cp-banner-error {
  background: color-mix(in srgb, var(--v2-state-fg-danger, #e5484d) 10%, transparent);
  box-shadow: inset 0 0 0 0.5px color-mix(in srgb, var(--v2-state-fg-danger, #e5484d) 40%, transparent);
  color: var(--v2-state-fg-danger, #e5484d);
}
.cp-banner-info {
  background: var(--v2-background-bg-layer-01, color-mix(in srgb, currentColor 4%, transparent));
  box-shadow: inset 0 0 0 0.5px var(--v2-border-border-muted, color-mix(in srgb, currentColor 12%, transparent));
  color: var(--v2-text-text-muted, color-mix(in srgb, currentColor 70%, transparent));
}
.cp-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 44px 20px;
  text-align: center;
  border-radius: 8px;
  background: var(--v2-background-bg-layer-01, transparent);
  box-shadow: inset 0 0 0 0.5px var(--v2-border-border-muted, color-mix(in srgb, currentColor 18%, transparent));
  color: var(--v2-text-text-muted, color-mix(in srgb, currentColor 65%, transparent));
}
.cp-empty strong {
  color: var(--v2-text-text-base, currentColor);
  font-size: 13px;
  font-weight: 530;
}
.cp-list {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: var(--v2-background-bg-layer-01, transparent);
  box-shadow: inset 0 0 0 0.5px var(--v2-border-border-muted, color-mix(in srgb, currentColor 12%, transparent));
  overflow: hidden;
}
.cp-provider {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-top: 0.5px solid var(--v2-border-border-base, color-mix(in srgb, currentColor 10%, transparent));
}
.cp-provider:first-child {
  border-top: none;
}
.cp-provider-main {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  flex: 1;
}
.cp-provider-name {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 530;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.04px;
}
.cp-provider-id {
  font-family: var(--v2-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  font-size: 11px;
  padding: 0 5px;
  border-radius: 4px;
  font-weight: 400;
  background: var(--v2-background-bg-layer-03, color-mix(in srgb, currentColor 8%, transparent));
  color: var(--v2-text-text-muted, color-mix(in srgb, currentColor 65%, transparent));
}
.cp-provider-url {
  font-family: var(--v2-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  font-size: 11px;
  color: var(--v2-text-text-muted, color-mix(in srgb, currentColor 60%, transparent));
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cp-provider-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  font-size: 11px;
  color: var(--v2-text-text-faint, color-mix(in srgb, currentColor 55%, transparent));
}
.cp-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.4;
}
.cp-provider-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}
.cp-badge {
  font-size: 11px;
  line-height: 18px;
  padding: 0 6px;
  border-radius: 4px;
  background: var(--v2-background-bg-layer-02, transparent);
  box-shadow: inset 0 0 0 0.5px var(--v2-border-border-muted, color-mix(in srgb, currentColor 14%, transparent));
  color: var(--v2-text-text-muted, color-mix(in srgb, currentColor 65%, transparent));
}
.cp-badge-warn {
  background: color-mix(in srgb, var(--v2-state-fg-warning, #e5a54b) 10%, transparent);
  box-shadow: inset 0 0 0 0.5px color-mix(in srgb, var(--v2-state-fg-warning, #e5a54b) 40%, transparent);
  color: var(--v2-state-fg-warning, #e5a54b);
}
.cp-badge-ok {
  background: color-mix(in srgb, var(--v2-state-fg-success, #46a758) 10%, transparent);
  box-shadow: inset 0 0 0 0.5px color-mix(in srgb, var(--v2-state-fg-success, #46a758) 40%, transparent);
  color: var(--v2-state-fg-success, #46a758);
}
.cp-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.cp-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.cp-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}
.cp-field > .cp-field-label {
  font-size: 12px;
  font-weight: 530;
  line-height: 16px;
  color: var(--v2-text-text-muted, color-mix(in srgb, currentColor 75%, transparent));
}
.cp-hint {
  font-size: 11px;
  line-height: 1.4;
  color: var(--v2-text-text-faint, color-mix(in srgb, currentColor 55%, transparent));
}
.cp-field-error {
  font-size: 11px;
  line-height: 1.4;
  color: var(--v2-state-fg-danger, #e5484d);
}
.cp-flavor-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.cp-input-row {
  display: flex;
  align-items: center;
  gap: 4px;
}
.cp-input-row > :first-child {
  flex: 1;
  min-width: 0;
}
.cp-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 14px;
  border-top: 0.5px solid var(--v2-border-border-base, color-mix(in srgb, currentColor 10%, transparent));
}
.cp-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}
.cp-section-title {
  font-size: 13px;
  font-weight: 530;
  line-height: var(--line-height-compact, 1.45);
  color: var(--v2-text-text-base, currentColor);
}
.cp-section-sub {
  font-size: 11px;
  line-height: 1.45;
  color: var(--v2-text-text-faint, color-mix(in srgb, currentColor 55%, transparent));
}
.cp-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.cp-search {
  flex: 1;
  min-width: 180px;
}
.cp-switch-row {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--v2-text-text-muted, color-mix(in srgb, currentColor 70%, transparent));
}
.cp-model-list {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: var(--v2-background-bg-layer-01, transparent);
  box-shadow: inset 0 0 0 0.5px var(--v2-border-border-muted, color-mix(in srgb, currentColor 12%, transparent));
  max-height: clamp(240px, 44vh, 520px);
  overflow-y: auto;
  overscroll-behavior: contain;
}
.cp-model {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-top: 0.5px solid var(--v2-border-border-base, color-mix(in srgb, currentColor 8%, transparent));
}
.cp-model:first-child {
  border-top: none;
}
.cp-model-main {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.cp-model-name {
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cp-model-id {
  font-family: var(--v2-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  font-size: 11px;
  color: var(--v2-text-text-faint, color-mix(in srgb, currentColor 55%, transparent));
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cp-model-meta {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
  font-size: 10px;
  color: var(--v2-text-text-faint, color-mix(in srgb, currentColor 50%, transparent));
}
.cp-limits {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 10px 12px 14px 48px;
  background: var(--v2-background-bg-layer-02, color-mix(in srgb, currentColor 3%, transparent));
  border-top: 0.5px solid var(--v2-border-border-base, color-mix(in srgb, currentColor 8%, transparent));
}
.cp-manual {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}
.cp-manual > .cp-field {
  flex: 1;
}
.cp-dialog-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;
}
.cp-dialog-note {
  margin-inline-end: auto;
  font-size: 11px;
  color: var(--v2-text-text-faint, color-mix(in srgb, currentColor 55%, transparent));
}
.cp-inline-code {
  font-family: var(--v2-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  font-size: 11px;
  padding: 0 4px;
  border-radius: 4px;
  background: var(--v2-background-bg-layer-03, color-mix(in srgb, currentColor 8%, transparent));
}
/* The provider editor is narrower and taller than the host's x-large dialog. */
[data-component="dialog-v2"]:has(.cp-form) [data-slot="dialog-container"] {
  width: min(100vw - 32px, 640px) !important;
  height: min(100vh - 72px, 840px) !important;
}
@media (max-width: 640px) {
  .cp-page {
    padding-top: 32px;
  }
  .cp-header {
    flex-direction: column;
  }
  .cp-grid,
  .cp-limits {
    grid-template-columns: 1fr;
  }
  .cp-limits {
    padding-inline-start: 12px;
  }
  .cp-config {
    flex-direction: column;
    align-items: stretch;
  }
  .cp-config-side {
    justify-content: space-between;
  }
}
`,Ht=T.Plugin.define({...it,setup(r){r.add(T.Style,Ut),r.add(T.SettingsPage,{id:"custom-providers",icon:"providers",get title(){return r.t("title")},get entries(){return[{id:"custom-providers",title:r.t("title"),description:r.t("description"),keywords:"provider model api endpoint custom"}]},render:()=>e.createComponent(Tt,{})}),r.add(T.Command,()=>({id:"manage",title:r.t("command.manage"),description:r.t("command.manage.description"),keywords:r.t("command.manage.keywords"),group:r.t("command.category"),run:()=>r.layout.settings("custom-providers")}))}});exports.default=Ht;
