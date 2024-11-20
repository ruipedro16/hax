/**
 * Minified by jsDelivr using Terser v5.19.2.
 * Original file: /npm/ansi_up@6.0.2/ansi_up.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
"use strict";var PacketKind,templateObject_1,templateObject_2,templateObject_3,__makeTemplateObject=this&&this.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e};!function(e){e[e.EOS=0]="EOS",e[e.Text=1]="Text",e[e.Incomplete=2]="Incomplete",e[e.ESC=3]="ESC",e[e.Unknown=4]="Unknown",e[e.SGR=5]="SGR",e[e.OSCURL=6]="OSCURL"}(PacketKind||(PacketKind={}));class AnsiUp{constructor(){this.VERSION="6.0.2",this.setup_palettes(),this._use_classes=!1,this.bold=!1,this.faint=!1,this.italic=!1,this.underline=!1,this.fg=this.bg=null,this._buffer="",this._url_allowlist={http:1,https:1},this._escape_html=!0,this.boldStyle="font-weight:bold",this.faintStyle="opacity:0.7",this.italicStyle="font-style:italic",this.underlineStyle="text-decoration:underline"}set use_classes(e){this._use_classes=e}get use_classes(){return this._use_classes}set url_allowlist(e){this._url_allowlist=e}get url_allowlist(){return this._url_allowlist}set escape_html(e){this._escape_html=e}get escape_html(){return this._escape_html}set boldStyle(e){this._boldStyle=e}get boldStyle(){return this._boldStyle}set faintStyle(e){this._faintStyle=e}get faintStyle(){return this._faintStyle}set italicStyle(e){this._italicStyle=e}get italicStyle(){return this._italicStyle}set underlineStyle(e){this._underlineStyle=e}get underlineStyle(){return this._underlineStyle}setup_palettes(){this.ansi_colors=[[{rgb:[0,0,0],class_name:"ansi-black"},{rgb:[187,0,0],class_name:"ansi-red"},{rgb:[0,187,0],class_name:"ansi-green"},{rgb:[187,187,0],class_name:"ansi-yellow"},{rgb:[0,0,187],class_name:"ansi-blue"},{rgb:[187,0,187],class_name:"ansi-magenta"},{rgb:[0,187,187],class_name:"ansi-cyan"},{rgb:[255,255,255],class_name:"ansi-white"}],[{rgb:[85,85,85],class_name:"ansi-bright-black"},{rgb:[255,85,85],class_name:"ansi-bright-red"},{rgb:[0,255,0],class_name:"ansi-bright-green"},{rgb:[255,255,85],class_name:"ansi-bright-yellow"},{rgb:[85,85,255],class_name:"ansi-bright-blue"},{rgb:[255,85,255],class_name:"ansi-bright-magenta"},{rgb:[85,255,255],class_name:"ansi-bright-cyan"},{rgb:[255,255,255],class_name:"ansi-bright-white"}]],this.palette_256=[],this.ansi_colors.forEach((e=>{e.forEach((e=>{this.palette_256.push(e)}))}));let e=[0,95,135,175,215,255];for(let t=0;t<6;++t)for(let n=0;n<6;++n)for(let i=0;i<6;++i){let s={rgb:[e[t],e[n],e[i]],class_name:"truecolor"};this.palette_256.push(s)}let t=8;for(let e=0;e<24;++e,t+=10){let e={rgb:[t,t,t],class_name:"truecolor"};this.palette_256.push(e)}}escape_txt_for_html(e){return this._escape_html?e.replace(/[&<>"']/gm,(e=>"&"===e?"&amp;":"<"===e?"&lt;":">"===e?"&gt;":'"'===e?"&quot;":"'"===e?"&#x27;":void 0)):e}append_buffer(e){var t=this._buffer+e;this._buffer=t}get_next_packet(){var e={kind:PacketKind.EOS,text:"",url:""},t=this._buffer.length;if(0==t)return e;var n=this._buffer.indexOf("");if(-1==n)return e.kind=PacketKind.Text,e.text=this._buffer,this._buffer="",e;if(n>0)return e.kind=PacketKind.Text,e.text=this._buffer.slice(0,n),this._buffer=this._buffer.slice(n),e;if(0==n){if(t<3)return e.kind=PacketKind.Incomplete,e;var i=this._buffer.charAt(1);if("["!=i&&"]"!=i&&"("!=i)return e.kind=PacketKind.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;if("["==i){this._csi_regex||(this._csi_regex=rgx(templateObject_1||(templateObject_1=__makeTemplateObject(["\n                        ^                           # beginning of line\n                                                    #\n                                                    # First attempt\n                        (?:                         # legal sequence\n                          [                      # CSI\n                          ([<-?]?)              # private-mode char\n                          ([d;]*)                    # any digits or semicolons\n                          ([ -/]?               # an intermediate modifier\n                          [@-~])                # the command\n                        )\n                        |                           # alternate (second attempt)\n                        (?:                         # illegal sequence\n                          [                      # CSI\n                          [ -~]*                # anything legal\n                          ([\0-:])              # anything illegal\n                        )\n                    "],["\n                        ^                           # beginning of line\n                                                    #\n                                                    # First attempt\n                        (?:                         # legal sequence\n                          \\x1b\\[                      # CSI\n                          ([\\x3c-\\x3f]?)              # private-mode char\n                          ([\\d;]*)                    # any digits or semicolons\n                          ([\\x20-\\x2f]?               # an intermediate modifier\n                          [\\x40-\\x7e])                # the command\n                        )\n                        |                           # alternate (second attempt)\n                        (?:                         # illegal sequence\n                          \\x1b\\[                      # CSI\n                          [\\x20-\\x7e]*                # anything legal\n                          ([\\x00-\\x1f:])              # anything illegal\n                        )\n                    "]))));let t=this._buffer.match(this._csi_regex);if(null===t)return e.kind=PacketKind.Incomplete,e;if(t[4])return e.kind=PacketKind.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;""!=t[1]||"m"!=t[3]?e.kind=PacketKind.Unknown:e.kind=PacketKind.SGR,e.text=t[2];var s=t[0].length;return this._buffer=this._buffer.slice(s),e}if("]"==i){if(t<4)return e.kind=PacketKind.Incomplete,e;if("8"!=this._buffer.charAt(2)||";"!=this._buffer.charAt(3))return e.kind=PacketKind.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;this._osc_st||(this._osc_st=rgxG(templateObject_2||(templateObject_2=__makeTemplateObject(["\n                        (?:                         # legal sequence\n                          (\\)                    # ESC                           |                           # alternate\n                          ()                      # BEL (what xterm did)\n                        )\n                        |                           # alternate (second attempt)\n                        (                           # illegal sequence\n                          [\0-]                 # anything illegal\n                          |                           # alternate\n                          [\b-]                 # anything illegal\n                          |                           # alternate\n                          [-]                 # anything illegal\n                        )\n                    "],["\n                        (?:                         # legal sequence\n                          (\\x1b\\\\)                    # ESC \\\n                          |                           # alternate\n                          (\\x07)                      # BEL (what xterm did)\n                        )\n                        |                           # alternate (second attempt)\n                        (                           # illegal sequence\n                          [\\x00-\\x06]                 # anything illegal\n                          |                           # alternate\n                          [\\x08-\\x1a]                 # anything illegal\n                          |                           # alternate\n                          [\\x1c-\\x1f]                 # anything illegal\n                        )\n                    "])))),this._osc_st.lastIndex=0;{let t=this._osc_st.exec(this._buffer);if(null===t)return e.kind=PacketKind.Incomplete,e;if(t[3])return e.kind=PacketKind.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}{let t=this._osc_st.exec(this._buffer);if(null===t)return e.kind=PacketKind.Incomplete,e;if(t[3])return e.kind=PacketKind.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}this._osc_regex||(this._osc_regex=rgx(templateObject_3||(templateObject_3=__makeTemplateObject(["\n                        ^                           # beginning of line\n                                                    #\n                        ]8;                    # OSC Hyperlink\n                        [ -:<-~]*       # params (excluding ;)\n                        ;                           # end of params\n                        ([!-~]{0,512})        # URL capture\n                        (?:                         # ST\n                          (?:\\)                  # ESC                           |                           # alternate\n                          (?:)                    # BEL (what xterm did)\n                        )\n                        ([ -~]+)              # TEXT capture\n                        ]8;;                   # OSC Hyperlink End\n                        (?:                         # ST\n                          (?:\\)                  # ESC                           |                           # alternate\n                          (?:)                    # BEL (what xterm did)\n                        )\n                    "],["\n                        ^                           # beginning of line\n                                                    #\n                        \\x1b\\]8;                    # OSC Hyperlink\n                        [\\x20-\\x3a\\x3c-\\x7e]*       # params (excluding ;)\n                        ;                           # end of params\n                        ([\\x21-\\x7e]{0,512})        # URL capture\n                        (?:                         # ST\n                          (?:\\x1b\\\\)                  # ESC \\\n                          |                           # alternate\n                          (?:\\x07)                    # BEL (what xterm did)\n                        )\n                        ([\\x20-\\x7e]+)              # TEXT capture\n                        \\x1b\\]8;;                   # OSC Hyperlink End\n                        (?:                         # ST\n                          (?:\\x1b\\\\)                  # ESC \\\n                          |                           # alternate\n                          (?:\\x07)                    # BEL (what xterm did)\n                        )\n                    "]))));let n=this._buffer.match(this._osc_regex);if(null===n)return e.kind=PacketKind.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;e.kind=PacketKind.OSCURL,e.url=n[1],e.text=n[2];s=n[0].length;return this._buffer=this._buffer.slice(s),e}if("("==i)return e.kind=PacketKind.Unknown,this._buffer=this._buffer.slice(3),e}}ansi_to_html(e){this.append_buffer(e);for(var t=[];;){var n=this.get_next_packet();if(n.kind==PacketKind.EOS||n.kind==PacketKind.Incomplete)break;n.kind!=PacketKind.ESC&&n.kind!=PacketKind.Unknown&&(n.kind==PacketKind.Text?t.push(this.transform_to_html(this.with_state(n))):n.kind==PacketKind.SGR?this.process_ansi(n):n.kind==PacketKind.OSCURL&&t.push(this.process_hyperlink(n)))}return t.join("")}with_state(e){return{bold:this.bold,faint:this.faint,italic:this.italic,underline:this.underline,fg:this.fg,bg:this.bg,text:e.text}}process_ansi(e){let t=e.text.split(";");for(;t.length>0;){let e=t.shift(),n=parseInt(e,10);if(isNaN(n)||0===n)this.fg=null,this.bg=null,this.bold=!1,this.faint=!1,this.italic=!1,this.underline=!1;else if(1===n)this.bold=!0;else if(2===n)this.faint=!0;else if(3===n)this.italic=!0;else if(4===n)this.underline=!0;else if(21===n)this.bold=!1;else if(22===n)this.faint=!1,this.bold=!1;else if(23===n)this.italic=!1;else if(24===n)this.underline=!1;else if(39===n)this.fg=null;else if(49===n)this.bg=null;else if(n>=30&&n<38)this.fg=this.ansi_colors[0][n-30];else if(n>=40&&n<48)this.bg=this.ansi_colors[0][n-40];else if(n>=90&&n<98)this.fg=this.ansi_colors[1][n-90];else if(n>=100&&n<108)this.bg=this.ansi_colors[1][n-100];else if((38===n||48===n)&&t.length>0){let e=38===n,i=t.shift();if("5"===i&&t.length>0){let n=parseInt(t.shift(),10);n>=0&&n<=255&&(e?this.fg=this.palette_256[n]:this.bg=this.palette_256[n])}if("2"===i&&t.length>2){let n=parseInt(t.shift(),10),i=parseInt(t.shift(),10),s=parseInt(t.shift(),10);if(n>=0&&n<=255&&i>=0&&i<=255&&s>=0&&s<=255){let t={rgb:[n,i,s],class_name:"truecolor"};e?this.fg=t:this.bg=t}}}}}transform_to_html(e){let t=e.text;if(0===t.length)return t;if(t=this.escape_txt_for_html(t),!e.bold&&!e.italic&&!e.underline&&null===e.fg&&null===e.bg)return t;let n=[],i=[],s=e.fg,l=e.bg;e.bold&&n.push(this._boldStyle),e.faint&&n.push(this._faintStyle),e.italic&&n.push(this._italicStyle),e.underline&&n.push(this._underlineStyle),this._use_classes?(s&&("truecolor"!==s.class_name?i.push(`${s.class_name}-fg`):n.push(`color:rgb(${s.rgb.join(",")})`)),l&&("truecolor"!==l.class_name?i.push(`${l.class_name}-bg`):n.push(`background-color:rgb(${l.rgb.join(",")})`))):(s&&n.push(`color:rgb(${s.rgb.join(",")})`),l&&n.push(`background-color:rgb(${l.rgb})`));let a="",r="";return i.length&&(a=` class="${i.join(" ")}"`),n.length&&(r=` style="${n.join(";")}"`),`<span${r}${a}>${t}</span>`}process_hyperlink(e){let t=e.url.split(":");return t.length<1?"":this._url_allowlist[t[0]]?`<a href="${this.escape_txt_for_html(e.url)}">${this.escape_txt_for_html(e.text)}</a>`:""}}function rgx(e,...t){let n=e.raw[0].replace(/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,"");return new RegExp(n)}window.AnsiUp=AnsiUp;function rgxG(e,...t){let n=e.raw[0].replace(/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,"");return new RegExp(n,"g");}