import{E as m,U as ot,T as ue,k as R,c as Pe,F as T,s as U,M as C,a3 as ee,R as te,w as Ce,z as Se,a0 as O,a1 as Ue,b as D,B as w,D as V,aa as ce,N as q,ab as F,l as W,ac as lt,Z as Be,ad as de,x as I,ae as ut,af as re,J as Q,ag as k,q as ie,t as ct,G as dt,Y as J,m as Fe,p as Re,a5 as Me,a8 as Ge,n as ht,o as ft,a6 as pt,a7 as mt,a9 as gt,ah as xt,ai as _t,aj as K,ak as bt,al as yt,am as he,e as y,an as vt}from"./pixi-CpQjNPvc.js";import{S as E,c as L,a as Tt,b as wt,B as De}from"./colorToUniform-DmtBy-2V.js";import"./engine-4ZHbU-ty.js";import"./_commonjsHelpers-Cpj98o6Y.js";class Ae{static init(e){Object.defineProperty(this,"resizeTo",{set(t){globalThis.removeEventListener("resize",this.queueResize),this._resizeTo=t,t&&(globalThis.addEventListener("resize",this.queueResize),this.resize())},get(){return this._resizeTo}}),this.queueResize=()=>{this._resizeTo&&(this._cancelResize(),this._resizeId=requestAnimationFrame(()=>this.resize()))},this._cancelResize=()=>{this._resizeId&&(cancelAnimationFrame(this._resizeId),this._resizeId=null)},this.resize=()=>{if(!this._resizeTo)return;this._cancelResize();let t,r;if(this._resizeTo===globalThis.window)t=globalThis.innerWidth,r=globalThis.innerHeight;else{const{clientWidth:i,clientHeight:s}=this._resizeTo;t=i,r=s}this.renderer.resize(t,r),this.render()},this._resizeId=null,this._resizeTo=null,this.resizeTo=e.resizeTo||null}static destroy(){globalThis.removeEventListener("resize",this.queueResize),this._cancelResize(),this._cancelResize=null,this.queueResize=null,this.resizeTo=null,this.resize=null}}Ae.extension=m.Application;class ke{static init(e){e=Object.assign({autoStart:!0,sharedTicker:!1},e),Object.defineProperty(this,"ticker",{set(t){this._ticker&&this._ticker.remove(this.render,this),this._ticker=t,t&&t.add(this.render,this,ot.LOW)},get(){return this._ticker}}),this.stop=()=>{this._ticker.stop()},this.start=()=>{this._ticker.start()},this._ticker=null,this.ticker=e.sharedTicker?ue.shared:new ue,e.autoStart&&this.start()}static destroy(){if(this._ticker){const e=this._ticker;this.ticker=null,e.destroy()}}}ke.extension=m.Application;class ze{constructor(e){this._renderer=e}push(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",canBundle:!1,action:"pushFilter",container:t,filterEffect:e})}pop(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}execute(e){e.action==="pushFilter"?this._renderer.filter.push(e):e.action==="popFilter"&&this._renderer.filter.pop()}destroy(){this._renderer=null}}ze.extension={type:[m.WebGLPipes,m.WebGPUPipes,m.CanvasPipes],name:"filter"};function Pt(o,e){e.clear();const t=e.matrix;for(let r=0;r<o.length;r++){const i=o[r];i.globalDisplayStatus<7||(e.matrix=i.worldTransform,e.addBounds(i.bounds))}return e.matrix=t,e}const Ct=new ee({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),format:"float32x2",stride:8,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});class St{constructor(){this.skip=!1,this.inputTexture=null,this.backTexture=null,this.filters=null,this.bounds=new Se,this.container=null,this.blendRequired=!1,this.outputRenderSurface=null,this.globalFrame={x:0,y:0,width:0,height:0}}}class Oe{constructor(e){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new R({uInputSize:{value:new Float32Array(4),type:"vec4<f32>"},uInputPixel:{value:new Float32Array(4),type:"vec4<f32>"},uInputClamp:{value:new Float32Array(4),type:"vec4<f32>"},uOutputFrame:{value:new Float32Array(4),type:"vec4<f32>"},uGlobalFrame:{value:new Float32Array(4),type:"vec4<f32>"},uOutputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new Pe({}),this.renderer=e}get activeBackTexture(){return this._activeFilterData?.backTexture}push(e){const t=this.renderer,r=e.filterEffect.filters,i=this._pushFilterData();i.skip=!1,i.filters=r,i.container=e.container,i.outputRenderSurface=t.renderTarget.renderSurface;const s=t.renderTarget.renderTarget.colorTexture.source,a=s.resolution,n=s.antialias;if(r.length===0){i.skip=!0;return}const u=i.bounds;if(this._calculateFilterArea(e,u),this._calculateFilterBounds(i,t.renderTarget.rootViewPort,n,a,1),i.skip)return;const l=this._getPreviousFilterData(),h=this._findFilterResolution(a);let c=0,d=0;l&&(c=l.bounds.minX,d=l.bounds.minY),this._calculateGlobalFrame(i,c,d,h,s.width,s.height),this._setupFilterTextures(i,u,t,l)}generateFilteredTexture({texture:e,filters:t}){const r=this._pushFilterData();this._activeFilterData=r,r.skip=!1,r.filters=t;const i=e.source,s=i.resolution,a=i.antialias;if(t.length===0)return r.skip=!0,e;const n=r.bounds;if(n.addRect(e.frame),this._calculateFilterBounds(r,n.rectangle,a,s,0),r.skip)return e;const u=s;this._calculateGlobalFrame(r,0,0,u,i.width,i.height),r.outputRenderSurface=T.getOptimalTexture(n.width,n.height,r.resolution,r.antialias),r.backTexture=U.EMPTY,r.inputTexture=e,this.renderer.renderTarget.finishRenderPass(),this._applyFiltersToTexture(r,!0);const d=r.outputRenderSurface;return d.source.alphaMode="premultiplied-alpha",d}pop(){const e=this.renderer,t=this._popFilterData();t.skip||(e.globalUniforms.pop(),e.renderTarget.finishRenderPass(),this._activeFilterData=t,this._applyFiltersToTexture(t,!1),t.blendRequired&&T.returnTexture(t.backTexture),T.returnTexture(t.inputTexture))}getBackTexture(e,t,r){const i=e.colorTexture.source._resolution,s=T.getOptimalTexture(t.width,t.height,i,!1);let a=t.minX,n=t.minY;r&&(a-=r.minX,n-=r.minY),a=Math.floor(a*i),n=Math.floor(n*i);const u=Math.ceil(t.width*i),l=Math.ceil(t.height*i);return this.renderer.renderTarget.copyToTexture(e,s,{x:a,y:n},{width:u,height:l},{x:0,y:0}),s}applyFilter(e,t,r,i){const s=this.renderer,a=this._activeFilterData,u=a.outputRenderSurface===r,l=s.renderTarget.rootRenderTarget.colorTexture.source._resolution,h=this._findFilterResolution(l);let c=0,d=0;if(u){const f=this._findPreviousFilterOffset();c=f.x,d=f.y}this._updateFilterUniforms(t,r,a,c,d,h,u,i),this._setupBindGroupsAndRender(e,t,s)}calculateSpriteMatrix(e,t){const r=this._activeFilterData,i=e.set(r.inputTexture._source.width,0,0,r.inputTexture._source.height,r.bounds.minX,r.bounds.minY),s=t.worldTransform.copyTo(C.shared),a=t.renderGroup||t.parentRenderGroup;return a&&a.cacheToLocalTransform&&s.prepend(a.cacheToLocalTransform),s.invert(),i.prepend(s),i.scale(1/t.texture.orig.width,1/t.texture.orig.height),i.translate(t.anchor.x,t.anchor.y),i}destroy(){}_setupBindGroupsAndRender(e,t,r){if(r.renderPipes.uniformBatch){const i=r.renderPipes.uniformBatch.getUboResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(i,0)}else this._globalFilterBindGroup.setResource(this._filterGlobalUniforms,0);this._globalFilterBindGroup.setResource(t.source,1),this._globalFilterBindGroup.setResource(t.source.style,2),e.groups[0]=this._globalFilterBindGroup,r.encoder.draw({geometry:Ct,shader:e,state:e._state,topology:"triangle-list"}),r.type===te.WEBGL&&r.renderTarget.finishRenderPass()}_setupFilterTextures(e,t,r,i){if(e.backTexture=U.EMPTY,e.blendRequired){r.renderTarget.finishRenderPass();const s=r.renderTarget.getRenderTarget(e.outputRenderSurface);e.backTexture=this.getBackTexture(s,t,i?.bounds)}e.inputTexture=T.getOptimalTexture(t.width,t.height,e.resolution,e.antialias),r.renderTarget.bind(e.inputTexture,!0),r.globalUniforms.push({offset:t})}_calculateGlobalFrame(e,t,r,i,s,a){const n=e.globalFrame;n.x=t*i,n.y=r*i,n.width=s*i,n.height=a*i}_updateFilterUniforms(e,t,r,i,s,a,n,u){const l=this._filterGlobalUniforms.uniforms,h=l.uOutputFrame,c=l.uInputSize,d=l.uInputPixel,f=l.uInputClamp,g=l.uGlobalFrame,x=l.uOutputTexture;n?(h[0]=r.bounds.minX-i,h[1]=r.bounds.minY-s):(h[0]=0,h[1]=0),h[2]=e.frame.width,h[3]=e.frame.height,c[0]=e.source.width,c[1]=e.source.height,c[2]=1/c[0],c[3]=1/c[1],d[0]=e.source.pixelWidth,d[1]=e.source.pixelHeight,d[2]=1/d[0],d[3]=1/d[1],f[0]=.5*d[2],f[1]=.5*d[3],f[2]=e.frame.width*c[2]-.5*d[2],f[3]=e.frame.height*c[3]-.5*d[3];const p=this.renderer.renderTarget.rootRenderTarget.colorTexture;g[0]=i*a,g[1]=s*a,g[2]=p.source.width*a,g[3]=p.source.height*a,t instanceof U&&(t.source.resource=null);const _=this.renderer.renderTarget.getRenderTarget(t);this.renderer.renderTarget.bind(t,!!u),t instanceof U?(x[0]=t.frame.width,x[1]=t.frame.height):(x[0]=_.width,x[1]=_.height),x[2]=_.isRoot?-1:1,this._filterGlobalUniforms.update()}_findFilterResolution(e){let t=this._filterStackIndex-1;for(;t>0&&this._filterStack[t].skip;)--t;return t>0&&this._filterStack[t].inputTexture?this._filterStack[t].inputTexture.source._resolution:e}_findPreviousFilterOffset(){let e=0,t=0,r=this._filterStackIndex;for(;r>0;){r--;const i=this._filterStack[r];if(!i.skip){e=i.bounds.minX,t=i.bounds.minY;break}}return{x:e,y:t}}_calculateFilterArea(e,t){if(e.renderables?Pt(e.renderables,t):e.filterEffect.filterArea?(t.clear(),t.addRect(e.filterEffect.filterArea),t.applyMatrix(e.container.worldTransform)):e.container.getFastGlobalBounds(!0,t),e.container){const i=(e.container.renderGroup||e.container.parentRenderGroup).cacheToLocalTransform;i&&t.applyMatrix(i)}}_applyFiltersToTexture(e,t){const r=e.inputTexture,i=e.bounds,s=e.filters;if(this._globalFilterBindGroup.setResource(r.source.style,2),this._globalFilterBindGroup.setResource(e.backTexture.source,3),s.length===1)s[0].apply(this,r,e.outputRenderSurface,t);else{let a=e.inputTexture;const n=T.getOptimalTexture(i.width,i.height,a.source._resolution,!1);let u=n,l=0;for(l=0;l<s.length-1;++l){s[l].apply(this,a,u,!0);const c=a;a=u,u=c}s[l].apply(this,a,e.outputRenderSurface,t),T.returnTexture(n)}}_calculateFilterBounds(e,t,r,i,s){const a=this.renderer,n=e.bounds,u=e.filters;let l=1/0,h=0,c=!0,d=!1,f=!1,g=!0;for(let x=0;x<u.length;x++){const p=u[x];if(l=Math.min(l,p.resolution==="inherit"?i:p.resolution),h+=p.padding,p.antialias==="off"?c=!1:p.antialias==="inherit"&&c&&(c=r),p.clipToViewport||(g=!1),!!!(p.compatibleRenderers&a.type)){f=!1;break}if(p.blendRequired&&!(a.backBuffer?.useBackBuffer??!0)){Ce("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."),f=!1;break}f=p.enabled||f,d||(d=p.blendRequired)}if(!f){e.skip=!0;return}if(g&&n.fitBounds(0,t.width/i,0,t.height/i),n.scale(l).ceil().scale(1/l).pad((h|0)*s),!n.isPositive){e.skip=!0;return}e.antialias=c,e.resolution=l,e.blendRequired=d}_popFilterData(){return this._filterStackIndex--,this._filterStack[this._filterStackIndex]}_getPreviousFilterData(){let e,t=this._filterStackIndex-1;for(;t>1&&(t--,e=this._filterStack[t],!!e.skip););return e}_pushFilterData(){let e=this._filterStack[this._filterStackIndex];return e||(e=this._filterStack[this._filterStackIndex]=new St),this._filterStackIndex++,e}}Oe.extension={type:[m.WebGLSystem,m.WebGPUSystem],name:"filter"};const We=class Ie extends ee{constructor(...e){let t=e[0]??{};t instanceof Float32Array&&(O(Ue,"use new MeshGeometry({ positions, uvs, indices }) instead"),t={positions:t,uvs:e[1],indices:e[2]}),t={...Ie.defaultOptions,...t};const r=t.positions||new Float32Array([0,0,1,0,1,1,0,1]);let i=t.uvs;i||(t.positions?i=new Float32Array(r.length):i=new Float32Array([0,0,1,0,1,1,0,1]));const s=t.indices||new Uint32Array([0,1,2,0,2,3]),a=t.shrinkBuffersToFit,n=new D({data:r,label:"attribute-mesh-positions",shrinkToFit:a,usage:w.VERTEX|w.COPY_DST}),u=new D({data:i,label:"attribute-mesh-uvs",shrinkToFit:a,usage:w.VERTEX|w.COPY_DST}),l=new D({data:s,label:"index-mesh-buffer",shrinkToFit:a,usage:w.INDEX|w.COPY_DST});super({attributes:{aPosition:{buffer:n,format:"float32x2",stride:8,offset:0},aUV:{buffer:u,format:"float32x2",stride:8,offset:0}},indexBuffer:l,topology:t.topology}),this.batchMode="auto"}get positions(){return this.attributes.aPosition.buffer.data}set positions(e){this.attributes.aPosition.buffer.data=e}get uvs(){return this.attributes.aUV.buffer.data}set uvs(e){this.attributes.aUV.buffer.data=e}get indices(){return this.indexBuffer.data}set indices(e){this.indexBuffer.data=e}};We.defaultOptions={topology:"triangle-list",shrinkBuffersToFit:!1};let se=We,B=null,P=null;function Ut(o,e){B||(B=V.get().createCanvas(256,128),P=B.getContext("2d",{willReadFrequently:!0}),P.globalCompositeOperation="copy",P.globalAlpha=1),(B.width<o||B.height<e)&&(B.width=ce(o),B.height=ce(e))}function fe(o,e,t){for(let r=0,i=4*t*e;r<e;++r,i+=4)if(o[i+3]!==0)return!1;return!0}function pe(o,e,t,r,i){const s=4*e;for(let a=r,n=r*s+4*t;a<=i;++a,n+=s)if(o[n+3]!==0)return!1;return!0}function Bt(...o){let e=o[0];e.canvas||(e={canvas:o[0],resolution:o[1]});const{canvas:t}=e,r=Math.min(e.resolution??1,1),i=e.width??t.width,s=e.height??t.height;let a=e.output;if(Ut(i,s),!P)throw new TypeError("Failed to get canvas 2D context");P.drawImage(t,0,0,i,s,0,0,i*r,s*r);const u=P.getImageData(0,0,i,s).data;let l=0,h=0,c=i-1,d=s-1;for(;h<s&&fe(u,i,h);)++h;if(h===s)return q.EMPTY;for(;fe(u,i,d);)--d;for(;pe(u,i,l,h,d);)++l;for(;pe(u,i,c,h,d);)--c;return++c,++d,P.globalCompositeOperation="source-over",P.strokeRect(l,h,c-l,d-h),P.globalCompositeOperation="copy",a??(a=new q),a.set(l/r,h/r,(c-l)/r,(d-h)/r),a}const me=new q;class Ft{getCanvasAndContext(e){const{text:t,style:r,resolution:i=1}=e,s=r._getFinalPadding(),a=F.measureText(t||" ",r),n=Math.ceil(Math.ceil(Math.max(1,a.width)+s*2)*i),u=Math.ceil(Math.ceil(Math.max(1,a.height)+s*2)*i),l=W.getOptimalCanvasAndContext(n,u);this._renderTextToCanvas(t,r,s,i,l);const h=r.trim?Bt({canvas:l.canvas,width:n,height:u,resolution:1,output:me}):me.set(0,0,n,u);return{canvasAndContext:l,frame:h}}returnCanvasAndContext(e){W.returnCanvasAndContext(e)}_renderTextToCanvas(e,t,r,i,s){const{canvas:a,context:n}=s,u=lt(t),l=F.measureText(e||" ",t),h=l.lines,c=l.lineHeight,d=l.lineWidths,f=l.maxLineWidth,g=l.fontProperties,x=a.height;if(n.resetTransform(),n.scale(i,i),n.textBaseline=t.textBaseline,t._stroke?.width){const v=t._stroke;n.lineWidth=v.width,n.miterLimit=v.miterLimit,n.lineJoin=v.join,n.lineCap=v.cap}n.font=u;let p,_;const M=t.dropShadow?2:1;for(let v=0;v<M;++v){const A=t.dropShadow&&v===0,S=A?Math.ceil(Math.max(1,x)+r*2):0,G=S*i;if(A){n.fillStyle="black",n.strokeStyle="black";const b=t.dropShadow,st=b.color,at=b.alpha;n.shadowColor=Be.shared.setValue(st).setAlpha(at).toRgbaString();const nt=b.blur*i,le=b.distance*i;n.shadowBlur=nt,n.shadowOffsetX=Math.cos(b.angle)*le,n.shadowOffsetY=Math.sin(b.angle)*le+G}else{if(n.fillStyle=t._fill?de(t._fill,n,l,r*2):null,t._stroke?.width){const b=t._stroke.width*.5+r*2;n.strokeStyle=de(t._stroke,n,l,b)}n.shadowColor="black"}let ne=(c-g.fontSize)/2;c-g.fontSize<0&&(ne=0);const oe=t._stroke?.width??0;for(let b=0;b<h.length;b++)p=oe/2,_=oe/2+b*c+g.ascent+ne,t.align==="right"?p+=f-d[b]:t.align==="center"&&(p+=(f-d[b])/2),t._stroke?.width&&this._drawLetterSpacing(h[b],t,s,p+r,_+r-S,!0),t._fill!==void 0&&this._drawLetterSpacing(h[b],t,s,p+r,_+r-S)}}_drawLetterSpacing(e,t,r,i,s,a=!1){const{context:n}=r,u=t.letterSpacing;let l=!1;if(F.experimentalLetterSpacingSupported&&(F.experimentalLetterSpacing?(n.letterSpacing=`${u}px`,n.textLetterSpacing=`${u}px`,l=!0):(n.letterSpacing="0px",n.textLetterSpacing="0px")),u===0||l){a?n.strokeText(e,i,s):n.fillText(e,i,s);return}let h=i;const c=F.graphemeSegmenter(e);let d=n.measureText(e).width,f=0;for(let g=0;g<c.length;++g){const x=c[g];a?n.strokeText(x,h,s):n.fillText(x,h,s);let p="";for(let _=g+1;_<c.length;++_)p+=c[_];f=n.measureText(p).width,h+=d-f+u,d=f}}}const Y=new Ft,ge="http://www.w3.org/2000/svg",xe="http://www.w3.org/1999/xhtml";class Ee{constructor(){this.svgRoot=document.createElementNS(ge,"svg"),this.foreignObject=document.createElementNS(ge,"foreignObject"),this.domElement=document.createElementNS(xe,"div"),this.styleElement=document.createElementNS(xe,"style");const{foreignObject:e,svgRoot:t,styleElement:r,domElement:i}=this;e.setAttribute("width","10000"),e.setAttribute("height","10000"),e.style.overflow="hidden",t.appendChild(e),e.appendChild(r),e.appendChild(i),this.image=V.get().createImage()}}let _e;function Rt(o,e,t,r){r||(r=_e||(_e=new Ee));const{domElement:i,styleElement:s,svgRoot:a}=r;i.innerHTML=`<style>${e.cssStyle};</style><div style='padding:0'>${o}</div>`,i.setAttribute("style","transform-origin: top left; display: inline-block"),t&&(s.textContent=t),document.body.appendChild(a);const n=i.getBoundingClientRect();a.remove();const u=e.padding*2;return{width:n.width-u,height:n.height-u}}class Mt{constructor(){this.batches=[],this.batched=!1}destroy(){this.batches.forEach(e=>{I.return(e)}),this.batches.length=0}}class Ve{constructor(e,t){this.state=E.for2d(),this.renderer=e,this._adaptor=t,this.renderer.runners.contextChange.add(this)}contextChange(){this._adaptor.contextChange(this.renderer)}validateRenderable(e){const t=e.context,r=!!e._gpuData,i=this.renderer.graphicsContext.updateGpuContext(t);return!!(i.isBatchable||r!==i.isBatchable)}addRenderable(e,t){const r=this.renderer.graphicsContext.updateGpuContext(e.context);e.didViewUpdate&&this._rebuild(e),r.isBatchable?this._addToBatcher(e,t):(this.renderer.renderPipes.batch.break(t),t.add(e))}updateRenderable(e){const r=this._getGpuDataForRenderable(e).batches;for(let i=0;i<r.length;i++){const s=r[i];s._batcher.updateElement(s)}}execute(e){if(!e.isRenderable)return;const t=this.renderer,r=e.context;if(!t.graphicsContext.getGpuContext(r).batches.length)return;const s=r.customShader||this._adaptor.shader;this.state.blendMode=e.groupBlendMode;const a=s.resources.localUniforms.uniforms;a.uTransformMatrix=e.groupTransform,a.uRound=t._roundPixels|e._roundPixels,L(e.groupColorAlpha,a.uColor,0),this._adaptor.execute(this,e)}_rebuild(e){const t=this._getGpuDataForRenderable(e),r=this.renderer.graphicsContext.updateGpuContext(e.context);t.destroy(),r.isBatchable&&this._updateBatchesForRenderable(e,t)}_addToBatcher(e,t){const r=this.renderer.renderPipes.batch,i=this._getGpuDataForRenderable(e).batches;for(let s=0;s<i.length;s++){const a=i[s];r.addToBatch(a,t)}}_getGpuDataForRenderable(e){return e._gpuData[this.renderer.uid]||this._initGpuDataForRenderable(e)}_initGpuDataForRenderable(e){const t=new Mt;return e._gpuData[this.renderer.uid]=t,t}_updateBatchesForRenderable(e,t){const r=e.context,i=this.renderer.graphicsContext.getGpuContext(r),s=this.renderer._roundPixels|e._roundPixels;t.batches=i.batches.map(a=>{const n=I.get(ut);return a.copyTo(n),n.renderable=e,n.roundPixels=s,n})}destroy(){this.renderer=null,this._adaptor.destroy(),this._adaptor=null,this.state=null}}Ve.extension={type:[m.WebGLPipes,m.WebGPUPipes,m.CanvasPipes],name:"graphics"};const Le=class Ye extends se{constructor(...e){super({});let t=e[0]??{};typeof t=="number"&&(O(Ue,"PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead"),t={width:t,height:e[1],verticesX:e[2],verticesY:e[3]}),this.build(t)}build(e){e={...Ye.defaultOptions,...e},this.verticesX=this.verticesX??e.verticesX,this.verticesY=this.verticesY??e.verticesY,this.width=this.width??e.width,this.height=this.height??e.height;const t=this.verticesX*this.verticesY,r=[],i=[],s=[],a=this.verticesX-1,n=this.verticesY-1,u=this.width/a,l=this.height/n;for(let c=0;c<t;c++){const d=c%this.verticesX,f=c/this.verticesX|0;r.push(d*u,f*l),i.push(d/a,f/n)}const h=a*n;for(let c=0;c<h;c++){const d=c%a,f=c/a|0,g=f*this.verticesX+d,x=f*this.verticesX+d+1,p=(f+1)*this.verticesX+d,_=(f+1)*this.verticesX+d+1;s.push(g,x,p,x,_,p)}this.buffers[0].data=new Float32Array(r),this.buffers[1].data=new Float32Array(i),this.indexBuffer.data=new Uint32Array(s),this.buffers[0].update(),this.buffers[1].update(),this.indexBuffer.update()}};Le.defaultOptions={width:100,height:100,verticesX:10,verticesY:10};let Gt=Le;class ae{constructor(){this.batcherName="default",this.packAsQuad=!1,this.indexOffset=0,this.attributeOffset=0,this.roundPixels=0,this._batcher=null,this._batch=null,this._textureMatrixUpdateId=-1,this._uvUpdateId=-1}get blendMode(){return this.renderable.groupBlendMode}get topology(){return this._topology||this.geometry.topology}set topology(e){this._topology=e}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.geometry=null,this._uvUpdateId=-1,this._textureMatrixUpdateId=-1}setTexture(e){this.texture!==e&&(this.texture=e,this._textureMatrixUpdateId=-1)}get uvs(){const t=this.geometry.getBuffer("aUV"),r=t.data;let i=r;const s=this.texture.textureMatrix;return s.isSimple||(i=this._transformedUvs,(this._textureMatrixUpdateId!==s._updateID||this._uvUpdateId!==t._updateID)&&((!i||i.length<r.length)&&(i=this._transformedUvs=new Float32Array(r.length)),this._textureMatrixUpdateId=s._updateID,this._uvUpdateId=t._updateID,s.multiplyUvs(r,i))),i}get positions(){return this.geometry.positions}get indices(){return this.geometry.indices}get color(){return this.renderable.groupColorAlpha}get groupTransform(){return this.renderable.groupTransform}get attributeSize(){return this.geometry.positions.length/2}get indexSize(){return this.geometry.indices.length}}class be{destroy(){}}class Xe{constructor(e,t){this.localUniforms=new R({uTransformMatrix:{value:new C,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),this.localUniformsBindGroup=new Pe({0:this.localUniforms}),this.renderer=e,this._adaptor=t,this._adaptor.init()}validateRenderable(e){const t=this._getMeshData(e),r=t.batched,i=e.batched;if(t.batched=i,r!==i)return!0;if(i){const s=e._geometry;if(s.indices.length!==t.indexSize||s.positions.length!==t.vertexSize)return t.indexSize=s.indices.length,t.vertexSize=s.positions.length,!0;const a=this._getBatchableMesh(e);return a.texture.uid!==e._texture.uid&&(a._textureMatrixUpdateId=-1),!a._batcher.checkAndUpdateTexture(a,e._texture)}return!1}addRenderable(e,t){const r=this.renderer.renderPipes.batch,i=this._getMeshData(e);if(e.didViewUpdate&&(i.indexSize=e._geometry.indices?.length,i.vertexSize=e._geometry.positions?.length),i.batched){const s=this._getBatchableMesh(e);s.setTexture(e._texture),s.geometry=e._geometry,r.addToBatch(s,t)}else r.break(t),t.add(e)}updateRenderable(e){if(e.batched){const t=this._getBatchableMesh(e);t.setTexture(e._texture),t.geometry=e._geometry,t._batcher.updateElement(t)}}execute(e){if(!e.isRenderable)return;e.state.blendMode=re(e.groupBlendMode,e.texture._source);const t=this.localUniforms;t.uniforms.uTransformMatrix=e.groupTransform,t.uniforms.uRound=this.renderer._roundPixels|e._roundPixels,t.update(),L(e.groupColorAlpha,t.uniforms.uColor,0),this._adaptor.execute(this,e)}_getMeshData(e){var t,r;return(t=e._gpuData)[r=this.renderer.uid]||(t[r]=new be),e._gpuData[this.renderer.uid].meshData||this._initMeshData(e)}_initMeshData(e){return e._gpuData[this.renderer.uid].meshData={batched:e.batched,indexSize:0,vertexSize:0},e._gpuData[this.renderer.uid].meshData}_getBatchableMesh(e){var t,r;return(t=e._gpuData)[r=this.renderer.uid]||(t[r]=new be),e._gpuData[this.renderer.uid].batchableMesh||this._initBatchableMesh(e)}_initBatchableMesh(e){const t=new ae;return t.renderable=e,t.setTexture(e._texture),t.transform=e.groupTransform,t.roundPixels=this.renderer._roundPixels|e._roundPixels,e._gpuData[this.renderer.uid].batchableMesh=t,t}destroy(){this.localUniforms=null,this.localUniformsBindGroup=null,this._adaptor.destroy(),this._adaptor=null,this.renderer=null}}Xe.extension={type:[m.WebGLPipes,m.WebGPUPipes,m.CanvasPipes],name:"mesh"};class Dt{execute(e,t){const r=e.state,i=e.renderer,s=t.shader||e.defaultShader;s.resources.uTexture=t.texture._source,s.resources.uniforms=e.localUniforms;const a=i.gl,n=e.getBuffers(t);i.shader.bind(s),i.state.set(r),i.geometry.bind(n.geometry,s.glProgram);const l=n.geometry.indexBuffer.data.BYTES_PER_ELEMENT===2?a.UNSIGNED_SHORT:a.UNSIGNED_INT;a.drawElements(a.TRIANGLES,t.particleChildren.length*6,l,0)}}class At{execute(e,t){const r=e.renderer,i=t.shader||e.defaultShader;i.groups[0]=r.renderPipes.uniformBatch.getUniformBindGroup(e.localUniforms,!0),i.groups[1]=r.texture.getTextureBindGroup(t.texture);const s=e.state,a=e.getBuffers(t);r.encoder.draw({geometry:a.geometry,shader:t.shader||e.defaultShader,state:s,size:t.particleChildren.length*6})}}function ye(o,e=null){const t=o*6;if(t>65535?e||(e=new Uint32Array(t)):e||(e=new Uint16Array(t)),e.length!==t)throw new Error(`Out buffer length is incorrect, got ${e.length} and expected ${t}`);for(let r=0,i=0;r<t;r+=6,i+=4)e[r+0]=i+0,e[r+1]=i+1,e[r+2]=i+2,e[r+3]=i+0,e[r+4]=i+2,e[r+5]=i+3;return e}function kt(o){return{dynamicUpdate:ve(o,!0),staticUpdate:ve(o,!1)}}function ve(o,e){const t=[];t.push(`

        var index = 0;

        for (let i = 0; i < ps.length; ++i)
        {
            const p = ps[i];

            `);let r=0;for(const s in o){const a=o[s];if(e!==a.dynamic)continue;t.push(`offset = index + ${r}`),t.push(a.code);const n=Q(a.format);r+=n.stride/4}t.push(`
            index += stride * 4;
        }
    `),t.unshift(`
        var stride = ${r};
    `);const i=t.join(`
`);return new Function("ps","f32v","u32v",i)}class zt{constructor(e){this._size=0,this._generateParticleUpdateCache={};const t=this._size=e.size??1e3,r=e.properties;let i=0,s=0;for(const h in r){const c=r[h],d=Q(c.format);c.dynamic?s+=d.stride:i+=d.stride}this._dynamicStride=s/4,this._staticStride=i/4,this.staticAttributeBuffer=new k(t*4*i),this.dynamicAttributeBuffer=new k(t*4*s),this.indexBuffer=ye(t);const a=new ee;let n=0,u=0;this._staticBuffer=new D({data:new Float32Array(1),label:"static-particle-buffer",shrinkToFit:!1,usage:w.VERTEX|w.COPY_DST}),this._dynamicBuffer=new D({data:new Float32Array(1),label:"dynamic-particle-buffer",shrinkToFit:!1,usage:w.VERTEX|w.COPY_DST});for(const h in r){const c=r[h],d=Q(c.format);c.dynamic?(a.addAttribute(c.attributeName,{buffer:this._dynamicBuffer,stride:this._dynamicStride*4,offset:n*4,format:c.format}),n+=d.size):(a.addAttribute(c.attributeName,{buffer:this._staticBuffer,stride:this._staticStride*4,offset:u*4,format:c.format}),u+=d.size)}a.addIndex(this.indexBuffer);const l=this.getParticleUpdate(r);this._dynamicUpload=l.dynamicUpdate,this._staticUpload=l.staticUpdate,this.geometry=a}getParticleUpdate(e){const t=Ot(e);return this._generateParticleUpdateCache[t]?this._generateParticleUpdateCache[t]:(this._generateParticleUpdateCache[t]=this.generateParticleUpdate(e),this._generateParticleUpdateCache[t])}generateParticleUpdate(e){return kt(e)}update(e,t){e.length>this._size&&(t=!0,this._size=Math.max(e.length,this._size*1.5|0),this.staticAttributeBuffer=new k(this._size*this._staticStride*4*4),this.dynamicAttributeBuffer=new k(this._size*this._dynamicStride*4*4),this.indexBuffer=ye(this._size),this.geometry.indexBuffer.setDataWithSize(this.indexBuffer,this.indexBuffer.byteLength,!0));const r=this.dynamicAttributeBuffer;if(this._dynamicUpload(e,r.float32View,r.uint32View),this._dynamicBuffer.setDataWithSize(this.dynamicAttributeBuffer.float32View,e.length*this._dynamicStride*4,!0),t){const i=this.staticAttributeBuffer;this._staticUpload(e,i.float32View,i.uint32View),this._staticBuffer.setDataWithSize(i.float32View,e.length*this._staticStride*4,!0)}}destroy(){this._staticBuffer.destroy(),this._dynamicBuffer.destroy(),this.geometry.destroy()}}function Ot(o){const e=[];for(const t in o){const r=o[t];e.push(t,r.code,r.dynamic?"d":"s")}return e.join("_")}var Wt=`varying vec2 vUV;
varying vec4 vColor;

uniform sampler2D uTexture;

void main(void){
    vec4 color = texture2D(uTexture, vUV) * vColor;
    gl_FragColor = color;
}`,It=`attribute vec2 aVertex;
attribute vec2 aUV;
attribute vec4 aColor;

attribute vec2 aPosition;
attribute float aRotation;

uniform mat3 uTranslationMatrix;
uniform float uRound;
uniform vec2 uResolution;
uniform vec4 uColor;

varying vec2 vUV;
varying vec4 vColor;

vec2 roundPixels(vec2 position, vec2 targetSize)
{       
    return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
}

void main(void){
    float cosRotation = cos(aRotation);
    float sinRotation = sin(aRotation);
    float x = aVertex.x * cosRotation - aVertex.y * sinRotation;
    float y = aVertex.x * sinRotation + aVertex.y * cosRotation;

    vec2 v = vec2(x, y);
    v = v + aPosition;

    gl_Position = vec4((uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    if(uRound == 1.0)
    {
        gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
    }

    vUV = aUV;
    vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uColor;
}
`,Te=`
struct ParticleUniforms {
  uProjectionMatrix:mat3x3<f32>,
  uColor:vec4<f32>,
  uResolution:vec2<f32>,
  uRoundPixels:f32,
};

@group(0) @binding(0) var<uniform> uniforms: ParticleUniforms;

@group(1) @binding(0) var uTexture: texture_2d<f32>;
@group(1) @binding(1) var uSampler : sampler;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) color : vec4<f32>,
  };
@vertex
fn mainVertex(
  @location(0) aVertex: vec2<f32>,
  @location(1) aPosition: vec2<f32>,
  @location(2) aUV: vec2<f32>,
  @location(3) aColor: vec4<f32>,
  @location(4) aRotation: f32,
) -> VSOutput {
  
   let v = vec2(
       aVertex.x * cos(aRotation) - aVertex.y * sin(aRotation),
       aVertex.x * sin(aRotation) + aVertex.y * cos(aRotation)
   ) + aPosition;

   let position = vec4((uniforms.uProjectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    let vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uniforms.uColor;

  return VSOutput(
   position,
   aUV,
   vColor,
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) color: vec4<f32>,
  @builtin(position) position: vec4<f32>,
) -> @location(0) vec4<f32> {

    var sample = textureSample(uTexture, uSampler, uv) * color;
   
    return sample;
}`;class Et extends ie{constructor(){const e=ct.from({vertex:It,fragment:Wt}),t=dt.from({fragment:{source:Te,entryPoint:"mainFragment"},vertex:{source:Te,entryPoint:"mainVertex"}});super({glProgram:e,gpuProgram:t,resources:{uTexture:U.WHITE.source,uSampler:new J({}),uniforms:{uTranslationMatrix:{value:new C,type:"mat3x3<f32>"},uColor:{value:new Be(16777215),type:"vec4<f32>"},uRound:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}}}})}}class He{constructor(e,t){this.state=E.for2d(),this.localUniforms=new R({uTranslationMatrix:{value:new C,type:"mat3x3<f32>"},uColor:{value:new Float32Array(4),type:"vec4<f32>"},uRound:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}}),this.renderer=e,this.adaptor=t,this.defaultShader=new Et,this.state=E.for2d()}validateRenderable(e){return!1}addRenderable(e,t){this.renderer.renderPipes.batch.break(t),t.add(e)}getBuffers(e){return e._gpuData[this.renderer.uid]||this._initBuffer(e)}_initBuffer(e){return e._gpuData[this.renderer.uid]=new zt({size:e.particleChildren.length,properties:e._properties}),e._gpuData[this.renderer.uid]}updateRenderable(e){}execute(e){const t=e.particleChildren;if(t.length===0)return;const r=this.renderer,i=this.getBuffers(e);e.texture||(e.texture=t[0].texture);const s=this.state;i.update(t,e._childrenDirty),e._childrenDirty=!1,s.blendMode=re(e.blendMode,e.texture._source);const a=this.localUniforms.uniforms,n=a.uTranslationMatrix;e.worldTransform.copyTo(n),n.prepend(r.globalUniforms.globalUniformData.projectionMatrix),a.uResolution=r.globalUniforms.globalUniformData.resolution,a.uRound=r._roundPixels|e._roundPixels,L(e.groupColorAlpha,a.uColor,0),this.adaptor.execute(this,e)}destroy(){this.defaultShader&&(this.defaultShader.destroy(),this.defaultShader=null)}}class Ne extends He{constructor(e){super(e,new Dt)}}Ne.extension={type:[m.WebGLPipes],name:"particle"};class $e extends He{constructor(e){super(e,new At)}}$e.extension={type:[m.WebGPUPipes],name:"particle"};const je=class qe extends Gt{constructor(e={}){e={...qe.defaultOptions,...e},super({width:e.width,height:e.height,verticesX:4,verticesY:4}),this.update(e)}update(e){this.width=e.width??this.width,this.height=e.height??this.height,this._originalWidth=e.originalWidth??this._originalWidth,this._originalHeight=e.originalHeight??this._originalHeight,this._leftWidth=e.leftWidth??this._leftWidth,this._rightWidth=e.rightWidth??this._rightWidth,this._topHeight=e.topHeight??this._topHeight,this._bottomHeight=e.bottomHeight??this._bottomHeight,this._anchorX=e.anchor?.x,this._anchorY=e.anchor?.y,this.updateUvs(),this.updatePositions()}updatePositions(){const e=this.positions,{width:t,height:r,_leftWidth:i,_rightWidth:s,_topHeight:a,_bottomHeight:n,_anchorX:u,_anchorY:l}=this,h=i+s,c=t>h?1:t/h,d=a+n,f=r>d?1:r/d,g=Math.min(c,f),x=u*t,p=l*r;e[0]=e[8]=e[16]=e[24]=-x,e[2]=e[10]=e[18]=e[26]=i*g-x,e[4]=e[12]=e[20]=e[28]=t-s*g-x,e[6]=e[14]=e[22]=e[30]=t-x,e[1]=e[3]=e[5]=e[7]=-p,e[9]=e[11]=e[13]=e[15]=a*g-p,e[17]=e[19]=e[21]=e[23]=r-n*g-p,e[25]=e[27]=e[29]=e[31]=r-p,this.getBuffer("aPosition").update()}updateUvs(){const e=this.uvs;e[0]=e[8]=e[16]=e[24]=0,e[1]=e[3]=e[5]=e[7]=0,e[6]=e[14]=e[22]=e[30]=1,e[25]=e[27]=e[29]=e[31]=1;const t=1/this._originalWidth,r=1/this._originalHeight;e[2]=e[10]=e[18]=e[26]=t*this._leftWidth,e[9]=e[11]=e[13]=e[15]=r*this._topHeight,e[4]=e[12]=e[20]=e[28]=1-t*this._rightWidth,e[17]=e[19]=e[21]=e[23]=1-r*this._bottomHeight,this.getBuffer("aUV").update()}};je.defaultOptions={width:100,height:100,leftWidth:10,topHeight:10,rightWidth:10,bottomHeight:10,originalWidth:100,originalHeight:100};let Vt=je;class Lt extends ae{constructor(){super(),this.geometry=new Vt}destroy(){this.geometry.destroy()}}class Qe{constructor(e){this._renderer=e}addRenderable(e,t){const r=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,r),this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,t),t._batcher.updateElement(t)}validateRenderable(e){const t=this._getGpuSprite(e);return!t._batcher.checkAndUpdateTexture(t,e._texture)}_updateBatchableSprite(e,t){t.geometry.update(e),t.setTexture(e._texture)}_getGpuSprite(e){return e._gpuData[this._renderer.uid]||this._initGPUSprite(e)}_initGPUSprite(e){const t=e._gpuData[this._renderer.uid]=new Lt,r=t;return r.renderable=e,r.transform=e.groupTransform,r.texture=e._texture,r.roundPixels=this._renderer._roundPixels|e._roundPixels,e.didViewUpdate||this._updateBatchableSprite(e,r),t}destroy(){this._renderer=null}}Qe.extension={type:[m.WebGLPipes,m.WebGPUPipes,m.CanvasPipes],name:"nineSliceSprite"};const Yt={name:"tiling-bit",vertex:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`
            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `},fragment:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            }

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `}},Xt={name:"tiling-bit",vertex:{header:`
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;

        `,main:`
            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `},fragment:{header:`
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `,main:`

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0

        `}};let X,H;class Ht extends ie{constructor(){X??(X=Fe({name:"tiling-sprite-shader",bits:[Tt,Yt,Re]})),H??(H=Me({name:"tiling-sprite-shader",bits:[wt,Xt,Ge]}));const e=new R({uMapCoord:{value:new C,type:"mat3x3<f32>"},uClampFrame:{value:new Float32Array([0,0,1,1]),type:"vec4<f32>"},uClampOffset:{value:new Float32Array([0,0]),type:"vec2<f32>"},uTextureTransform:{value:new C,type:"mat3x3<f32>"},uSizeAnchor:{value:new Float32Array([100,100,.5,.5]),type:"vec4<f32>"}});super({glProgram:H,gpuProgram:X,resources:{localUniforms:new R({uTransformMatrix:{value:new C,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),tilingUniforms:e,uTexture:U.EMPTY.source,uSampler:U.EMPTY.source.style}})}updateUniforms(e,t,r,i,s,a){const n=this.resources.tilingUniforms,u=a.width,l=a.height,h=a.textureMatrix,c=n.uniforms.uTextureTransform;c.set(r.a*u/e,r.b*u/t,r.c*l/e,r.d*l/t,r.tx/e,r.ty/t),c.invert(),n.uniforms.uMapCoord=h.mapCoord,n.uniforms.uClampFrame=h.uClampFrame,n.uniforms.uClampOffset=h.uClampOffset,n.uniforms.uTextureTransform=c,n.uniforms.uSizeAnchor[0]=e,n.uniforms.uSizeAnchor[1]=t,n.uniforms.uSizeAnchor[2]=i,n.uniforms.uSizeAnchor[3]=s,a&&(this.resources.uTexture=a.source,this.resources.uSampler=a.source.style)}}class Nt extends se{constructor(){super({positions:new Float32Array([0,0,1,0,1,1,0,1]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])})}}function $t(o,e){const t=o.anchor.x,r=o.anchor.y;e[0]=-t*o.width,e[1]=-r*o.height,e[2]=(1-t)*o.width,e[3]=-r*o.height,e[4]=(1-t)*o.width,e[5]=(1-r)*o.height,e[6]=-t*o.width,e[7]=(1-r)*o.height}function jt(o,e,t,r){let i=0;const s=o.length/e,a=r.a,n=r.b,u=r.c,l=r.d,h=r.tx,c=r.ty;for(t*=e;i<s;){const d=o[t],f=o[t+1];o[t]=a*d+u*f+h,o[t+1]=n*d+l*f+c,t+=e,i++}}function qt(o,e){const t=o.texture,r=t.frame.width,i=t.frame.height;let s=0,a=0;o.applyAnchorToTexture&&(s=o.anchor.x,a=o.anchor.y),e[0]=e[6]=-s,e[2]=e[4]=1-s,e[1]=e[3]=-a,e[5]=e[7]=1-a;const n=C.shared;n.copyFrom(o._tileTransform.matrix),n.tx/=o.width,n.ty/=o.height,n.invert(),n.scale(o.width/r,o.height/i),jt(e,2,0,n)}const z=new Nt;class Qt{constructor(){this.canBatch=!0,this.geometry=new se({indices:z.indices.slice(),positions:z.positions.slice(),uvs:z.uvs.slice()})}destroy(){this.geometry.destroy(),this.shader?.destroy()}}class Je{constructor(e){this._state=E.default2d,this._renderer=e}validateRenderable(e){const t=this._getTilingSpriteData(e),r=t.canBatch;this._updateCanBatch(e);const i=t.canBatch;if(i&&i===r){const{batchableMesh:s}=t;return!s._batcher.checkAndUpdateTexture(s,e.texture)}return r!==i}addRenderable(e,t){const r=this._renderer.renderPipes.batch;this._updateCanBatch(e);const i=this._getTilingSpriteData(e),{geometry:s,canBatch:a}=i;if(a){i.batchableMesh||(i.batchableMesh=new ae);const n=i.batchableMesh;e.didViewUpdate&&(this._updateBatchableMesh(e),n.geometry=s,n.renderable=e,n.transform=e.groupTransform,n.setTexture(e._texture)),n.roundPixels=this._renderer._roundPixels|e._roundPixels,r.addToBatch(n,t)}else r.break(t),i.shader||(i.shader=new Ht),this.updateRenderable(e),t.add(e)}execute(e){const{shader:t}=this._getTilingSpriteData(e);t.groups[0]=this._renderer.globalUniforms.bindGroup;const r=t.resources.localUniforms.uniforms;r.uTransformMatrix=e.groupTransform,r.uRound=this._renderer._roundPixels|e._roundPixels,L(e.groupColorAlpha,r.uColor,0),this._state.blendMode=re(e.groupBlendMode,e.texture._source),this._renderer.encoder.draw({geometry:z,shader:t,state:this._state})}updateRenderable(e){const t=this._getTilingSpriteData(e),{canBatch:r}=t;if(r){const{batchableMesh:i}=t;e.didViewUpdate&&this._updateBatchableMesh(e),i._batcher.updateElement(i)}else if(e.didViewUpdate){const{shader:i}=t;i.updateUniforms(e.width,e.height,e._tileTransform.matrix,e.anchor.x,e.anchor.y,e.texture)}}_getTilingSpriteData(e){return e._gpuData[this._renderer.uid]||this._initTilingSpriteData(e)}_initTilingSpriteData(e){const t=new Qt;return t.renderable=e,e._gpuData[this._renderer.uid]=t,t}_updateBatchableMesh(e){const t=this._getTilingSpriteData(e),{geometry:r}=t,i=e.texture.source.style;i.addressMode!=="repeat"&&(i.addressMode="repeat",i.update()),qt(e,r.uvs),$t(e,r.positions)}destroy(){this._renderer=null}_updateCanBatch(e){const t=this._getTilingSpriteData(e),r=e.texture;let i=!0;return this._renderer.type===te.WEBGL&&(i=this._renderer.context.supports.nonPowOf2wrapping),t.canBatch=r.textureMatrix.isSimple&&(i||r.source.isPowerOfTwo),t.canBatch}}Je.extension={type:[m.WebGLPipes,m.WebGPUPipes,m.CanvasPipes],name:"tilingSprite"};const Jt={name:"local-uniform-msdf-bit",vertex:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `},fragment:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `,main:`
            outColor = vec4<f32>(calculateMSDFAlpha(outColor, localUniforms.uColor, localUniforms.uDistance));
        `}},Kt={name:"local-uniform-msdf-bit",vertex:{header:`
            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix *= uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `},fragment:{header:`
            uniform float uDistance;
         `,main:`
            outColor = vec4(calculateMSDFAlpha(outColor, vColor, uDistance));
        `}},Zt={name:"msdf-bit",fragment:{header:`
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, shapeColor:vec4<f32>, distance:f32) -> f32 {

                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                var luma: f32 = dot(shapeColor.rgb, vec3<f32>(0.299, 0.587, 0.114));
                var gamma: f32 = mix(1.0, 1.0 / 2.2, luma);
                var coverage: f32 = pow(shapeColor.a * alpha, gamma);

                return coverage;

            }
        `}},er={name:"msdf-bit",fragment:{header:`
            float calculateMSDFAlpha(vec4 msdfColor, vec4 shapeColor, float distance) {

                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);

                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                float luma = dot(shapeColor.rgb, vec3(0.299, 0.587, 0.114));
                float gamma = mix(1.0, 1.0 / 2.2, luma);
                float coverage = pow(shapeColor.a * alpha, gamma);

                return coverage;
            }
        `}};let N,$;class tr extends ie{constructor(e){const t=new R({uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uTransformMatrix:{value:new C,type:"mat3x3<f32>"},uDistance:{value:4,type:"f32"},uRound:{value:0,type:"f32"}});N??(N=Fe({name:"sdf-shader",bits:[ht,ft(e),Jt,Zt,Re]})),$??($=Me({name:"sdf-shader",bits:[pt,mt(e),Kt,er,Ge]})),super({glProgram:$,gpuProgram:N,resources:{localUniforms:t,batchSamplers:gt(e)}})}}class rr extends bt{destroy(){this.context.customShader&&this.context.customShader.destroy(),super.destroy()}}class Ke{constructor(e){this._renderer=e,this._renderer.renderableGC.addManagedHash(this,"_gpuBitmapText")}validateRenderable(e){const t=this._getGpuBitmapText(e);return this._renderer.renderPipes.graphics.validateRenderable(t)}addRenderable(e,t){const r=this._getGpuBitmapText(e);we(e,r),e._didTextUpdate&&(e._didTextUpdate=!1,this._updateContext(e,r)),this._renderer.renderPipes.graphics.addRenderable(r,t),r.context.customShader&&this._updateDistanceField(e)}updateRenderable(e){const t=this._getGpuBitmapText(e);we(e,t),this._renderer.renderPipes.graphics.updateRenderable(t),t.context.customShader&&this._updateDistanceField(e)}_updateContext(e,t){const{context:r}=t,i=xt.getFont(e.text,e._style);r.clear(),i.distanceField.type!=="none"&&(r.customShader||(r.customShader=new tr(this._renderer.limits.maxBatchableTextures)));const s=F.graphemeSegmenter(e.text),a=e._style;let n=i.baseLineOffset;const u=_t(s,a,i,!0),l=a.padding,h=u.scale;let c=u.width,d=u.height+u.offsetY;a._stroke&&(c+=a._stroke.width/h,d+=a._stroke.width/h),r.translate(-e._anchor._x*c-l,-e._anchor._y*d-l).scale(h,h);const f=i.applyFillAsTint?a._fill.color:16777215;let g=i.fontMetrics.fontSize,x=i.lineHeight;a.lineHeight&&(g=a.fontSize/h,x=a.lineHeight/h);let p=(x-g)/2;p-i.baseLineOffset<0&&(p=0);for(let _=0;_<u.lines.length;_++){const M=u.lines[_];for(let v=0;v<M.charPositions.length;v++){const A=M.chars[v],S=i.chars[A];if(S?.texture){const G=S.texture;r.texture(G,f||"black",Math.round(M.charPositions[v]+S.xOffset),Math.round(n+S.yOffset+p),G.orig.width,G.orig.height)}}n+=x}}_getGpuBitmapText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new rr;return e._gpuData[this._renderer.uid]=t,this._updateContext(e,t),t}_updateDistanceField(e){const t=this._getGpuBitmapText(e).context,r=e._style.fontFamily,i=K.get(`${r}-bitmap`),{a:s,b:a,c:n,d:u}=e.groupTransform,l=Math.sqrt(s*s+a*a),h=Math.sqrt(n*n+u*u),c=(Math.abs(l)+Math.abs(h))/2,d=i.baseRenderedFontSize/e._style.fontSize,f=c*i.distanceField.range*(1/d);t.customShader.resources.localUniforms.uniforms.uDistance=f}destroy(){this._renderer=null}}Ke.extension={type:[m.WebGLPipes,m.WebGPUPipes,m.CanvasPipes],name:"bitmapText"};function we(o,e){e.groupTransform=o.groupTransform,e.groupColorAlpha=o.groupColorAlpha,e.groupColor=o.groupColor,e.groupBlendMode=o.groupBlendMode,e.globalDisplayStatus=o.globalDisplayStatus,e.groupTransform=o.groupTransform,e.localDisplayStatus=o.localDisplayStatus,e.groupAlpha=o.groupAlpha,e._roundPixels=o._roundPixels}class ir extends De{constructor(e){super(),this.generatingTexture=!1,this._renderer=e,e.runners.resolutionChange.add(this)}resolutionChange(){const e=this.renderable;e._autoResolution&&e.onViewUpdate()}destroy(){this._renderer.htmlText.returnTexturePromise(this.texturePromise),this.texturePromise=null,this._renderer=null}}function Z(o,e){const{texture:t,bounds:r}=o,i=e._style._getFinalPadding();yt(r,e._anchor,t);const s=e._anchor._x*i*2,a=e._anchor._y*i*2;r.minX-=i-s,r.minY-=i-a,r.maxX-=i-s,r.maxY-=i-a}class Ze{constructor(e){this._renderer=e}validateRenderable(e){return e._didTextUpdate}addRenderable(e,t){const r=this._getGpuText(e);e._didTextUpdate&&(this._updateGpuText(e).catch(i=>{console.error(i)}),e._didTextUpdate=!1,Z(r,e)),this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuText(e);t._batcher.updateElement(t)}async _updateGpuText(e){e._didTextUpdate=!1;const t=this._getGpuText(e);if(t.generatingTexture)return;t.texturePromise&&(this._renderer.htmlText.returnTexturePromise(t.texturePromise),t.texturePromise=null),t.generatingTexture=!0,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;const r=this._renderer.htmlText.getTexturePromise(e);t.texturePromise=r,t.texture=await r;const i=e.renderGroup||e.parentRenderGroup;i&&(i.structureDidChange=!0),t.generatingTexture=!1,Z(t,e)}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new ir(this._renderer);return t.renderable=e,t.transform=e.groupTransform,t.texture=U.EMPTY,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,e._gpuData[this._renderer.uid]=t,t}destroy(){this._renderer=null}}Ze.extension={type:[m.WebGLPipes,m.WebGPUPipes,m.CanvasPipes],name:"htmlText"};function sr(){const{userAgent:o}=V.get().getNavigator();return/^((?!chrome|android).)*safari/i.test(o)}const ar=new Se;function et(o,e,t,r){const i=ar;i.minX=0,i.minY=0,i.maxX=o.width/r|0,i.maxY=o.height/r|0;const s=T.getOptimalTexture(i.width,i.height,r,!1);return s.source.uploadMethodId="image",s.source.resource=o,s.source.alphaMode="premultiply-alpha-on-upload",s.frame.width=e/r,s.frame.height=t/r,s.source.emit("update",s.source),s.updateUvs(),s}function nr(o,e){const t=e.fontFamily,r=[],i={},s=/font-family:([^;"\s]+)/g,a=o.match(s);function n(u){i[u]||(r.push(u),i[u]=!0)}if(Array.isArray(t))for(let u=0;u<t.length;u++)n(t[u]);else n(t);a&&a.forEach(u=>{const l=u.split(":")[1].trim();n(l)});for(const u in e.tagStyles){const l=e.tagStyles[u].fontFamily;n(l)}return r}async function or(o){const t=await(await V.get().fetch(o)).blob(),r=new FileReader;return await new Promise((s,a)=>{r.onloadend=()=>s(r.result),r.onerror=a,r.readAsDataURL(t)})}async function lr(o,e){const t=await or(e);return`@font-face {
        font-family: "${o.fontFamily}";
        font-weight: ${o.fontWeight};
        font-style: ${o.fontStyle};
        src: url('${t}');
    }`}const j=new Map;async function ur(o){const e=o.filter(t=>K.has(`${t}-and-url`)).map(t=>{if(!j.has(t)){const{entries:r}=K.get(`${t}-and-url`),i=[];r.forEach(s=>{const a=s.url,u=s.faces.map(l=>({weight:l.weight,style:l.style}));i.push(...u.map(l=>lr({fontWeight:l.weight,fontStyle:l.style,fontFamily:t},a)))}),j.set(t,Promise.all(i).then(s=>s.join(`
`)))}return j.get(t)});return(await Promise.all(e)).join(`
`)}function cr(o,e,t,r,i){const{domElement:s,styleElement:a,svgRoot:n}=i;s.innerHTML=`<style>${e.cssStyle}</style><div style='padding:0;'>${o}</div>`,s.setAttribute("style",`transform: scale(${t});transform-origin: top left; display: inline-block`),a.textContent=r;const{width:u,height:l}=i.image;return n.setAttribute("width",u.toString()),n.setAttribute("height",l.toString()),new XMLSerializer().serializeToString(n)}function dr(o,e){const t=W.getOptimalCanvasAndContext(o.width,o.height,e),{context:r}=t;return r.clearRect(0,0,o.width,o.height),r.drawImage(o,0,0),t}function hr(o,e,t){return new Promise(async r=>{t&&await new Promise(i=>setTimeout(i,100)),o.onload=()=>{r()},o.src=`data:image/svg+xml;charset=utf8,${encodeURIComponent(e)}`,o.crossOrigin="anonymous"})}class tt{constructor(e){this._renderer=e,this._createCanvas=e.type===te.WEBGPU}getTexture(e){return this.getTexturePromise(e)}getTexturePromise(e){return this._buildTexturePromise(e)}async _buildTexturePromise(e){const{text:t,style:r,resolution:i,textureStyle:s}=e,a=I.get(Ee),n=nr(t,r),u=await ur(n),l=Rt(t,r,u,a),h=Math.ceil(Math.ceil(Math.max(1,l.width)+r.padding*2)*i),c=Math.ceil(Math.ceil(Math.max(1,l.height)+r.padding*2)*i),d=a.image,f=2;d.width=(h|0)+f,d.height=(c|0)+f;const g=cr(t,r,i,u,a);await hr(d,g,sr()&&n.length>0);const x=d;let p;this._createCanvas&&(p=dr(d,i));const _=et(p?p.canvas:x,d.width-f,d.height-f,i);return s&&(_.source.style=s),this._createCanvas&&(this._renderer.texture.initSource(_.source),W.returnCanvasAndContext(p)),I.return(a),_}returnTexturePromise(e){e.then(t=>{this._cleanUp(t)}).catch(()=>{Ce("HTMLTextSystem: Failed to clean texture")})}_cleanUp(e){T.returnTexture(e,!0),e.source.resource=null,e.source.uploadMethodId="unknown"}destroy(){this._renderer=null}}tt.extension={type:[m.WebGLSystem,m.WebGPUSystem,m.CanvasSystem],name:"htmlText"};class fr extends De{constructor(e){super(),this._renderer=e,e.runners.resolutionChange.add(this)}resolutionChange(){const e=this.renderable;e._autoResolution&&e.onViewUpdate()}destroy(){this._renderer.canvasText.returnTexture(this.texture),this._renderer=null}}class rt{constructor(e){this._renderer=e}validateRenderable(e){return e._didTextUpdate}addRenderable(e,t){const r=this._getGpuText(e);e._didTextUpdate&&(this._updateGpuText(e),e._didTextUpdate=!1),this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuText(e);t._batcher.updateElement(t)}_updateGpuText(e){const t=this._getGpuText(e);t.texture&&this._renderer.canvasText.returnTexture(t.texture),e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,t.texture=this._renderer.canvasText.getTexture(e),Z(t,e)}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new fr(this._renderer);return t.renderable=e,t.transform=e.groupTransform,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._gpuData[this._renderer.uid]=t,t}destroy(){this._renderer=null}}rt.extension={type:[m.WebGLPipes,m.WebGPUPipes,m.CanvasPipes],name:"text"};class it{constructor(e){this._renderer=e}getTexture(e,t,r,i){typeof e=="string"&&(O("8.0.0","CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments"),e={text:e,style:r,resolution:t}),e.style instanceof he||(e.style=new he(e.style)),e.textureStyle instanceof J||(e.textureStyle=new J(e.textureStyle)),typeof e.text!="string"&&(e.text=e.text.toString());const{text:s,style:a,textureStyle:n}=e,u=e.resolution??this._renderer.resolution,{frame:l,canvasAndContext:h}=Y.getCanvasAndContext({text:s,style:a,resolution:u}),c=et(h.canvas,l.width,l.height,u);if(n&&(c.source.style=n),a.trim&&(l.pad(a.padding),c.frame.copyFrom(l),c.frame.scale(1/u),c.updateUvs()),a.filters){const d=this._applyFilters(c,a.filters);return this.returnTexture(c),Y.returnCanvasAndContext(h),d}return this._renderer.texture.initSource(c._source),Y.returnCanvasAndContext(h),c}returnTexture(e){const t=e.source;t.resource=null,t.uploadMethodId="unknown",t.alphaMode="no-premultiply-alpha",T.returnTexture(e,!0)}renderTextToCanvas(){O("8.10.0","CanvasTextSystem.renderTextToCanvas: no longer supported, use CanvasTextSystem.getTexture instead")}_applyFilters(e,t){const r=this._renderer.renderTarget.renderTarget,i=this._renderer.filter.generateFilteredTexture({texture:e,filters:t});return this._renderer.renderTarget.bind(r,!1),i}destroy(){this._renderer=null}}it.extension={type:[m.WebGLSystem,m.WebGPUSystem,m.CanvasSystem],name:"canvasText"};y.add(Ae);y.add(ke);y.add(Ve);y.add(vt);y.add(Xe);y.add(Ne);y.add($e);y.add(it);y.add(rt);y.add(Ke);y.add(tt);y.add(Ze);y.add(Je);y.add(Qe);y.add(Oe);y.add(ze);
