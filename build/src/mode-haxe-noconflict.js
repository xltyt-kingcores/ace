ace.define("ace/mode/haxe",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/haxe_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./text").Mode,f=a("../tokenizer").Tokenizer,g=a("./haxe_highlight_rules").HaxeHighlightRules,h=a("./matching_brace_outdent").MatchingBraceOutdent,i=a("./behaviour/cstyle").CstyleBehaviour,j=a("./folding/cstyle").FoldMode,k=function(){this.$tokenizer=new f((new g).getRules()),this.$outdent=new h,this.$behaviour=new i,this.foldingRules=new j};d.inherits(k,e),function(){this.getNextLineIndent=function(a,b,c){var d=this.$getIndent(b),e=this.$tokenizer.getLineTokens(b,a),f=e.tokens;if(f.length&&f[f.length-1].type=="comment")return d;if(a=="start"){var g=b.match(/^.*[\{\(\[]\s*$/);g&&(d+=c)}return d},this.checkOutdent=function(a,b,c){return this.$outdent.checkOutdent(b,c)},this.autoOutdent=function(a,b,c){this.$outdent.autoOutdent(b,c)},this.createWorker=function(a){return null}}.call(k.prototype),b.Mode=k}),ace.define("ace/mode/haxe_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("../lib/lang"),f=a("./doc_comment_highlight_rules").DocCommentHighlightRules,g=a("./text_highlight_rules").TextHighlightRules,h=function(){var a=e.arrayToMap("break|case|cast|catch|class|continue|default|else|enum|extends|for|function|if|implements|import|in|inline|interface|new|override|package|private|public|return|static|super|switch|this|throw|trace|try|typedef|untyped|var|while|Array|Void|Bool|Int|UInt|Float|Dynamic|String|List|Hash|IntHash|Error|Unknown|Type|Std".split("|")),b=e.arrayToMap("null|true|false".split("|"));this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},(new f).getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",merge:!0,next:"comment"},{token:"string.regexp",regex:"[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:function(c){return c=="this"?"variable.language":a.hasOwnProperty(c)?"keyword":b.hasOwnProperty(c)?"constant.language":"identifier"},regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({<]"},{token:"paren.rparen",regex:"[\\])}>]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:".*?\\*\\/",next:"start"},{token:"comment",merge:!0,regex:".+"}]},this.embedRules(f,"doc-",[(new f).getEndRule("start")])};d.inherits(h,g),b.HaxeHighlightRules=h}),ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./text_highlight_rules").TextHighlightRules,f=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},{token:"comment.doc",merge:!0,regex:"\\s+"},{token:"comment.doc",merge:!0,regex:"TODO"},{token:"comment.doc",merge:!0,regex:"[^@\\*]+"},{token:"comment.doc",merge:!0,regex:"."}]}};d.inherits(f,e),function(){this.getStartRule=function(a){return{token:"comment.doc",merge:!0,regex:"\\/\\*(?=\\*)",next:a}},this.getEndRule=function(a){return{token:"comment.doc",merge:!0,regex:"\\*\\/",next:a}}}.call(f.prototype),b.DocCommentHighlightRules=f}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(a,b,c){"use strict";var d=a("../range").Range,e=function(){};((function(){this.checkOutdent=function(a,b){return/^\s+$/.test(a)?/^\s*\}/.test(b):!1},this.autoOutdent=function(a,b){var c=a.getLine(b),e=c.match(/^(\s*\})/);if(!e)return 0;var f=e[1].length,g=a.findMatchingBracket({row:b,column:f});if(!g||g.row==b)return 0;var h=this.$getIndent(a.getLine(g.row));a.replace(new d(b,0,b,f-1),h)},this.$getIndent=function(a){var b=a.match(/^(\s+)/);return b?b[1]:""}})).call(e.prototype),b.MatchingBraceOutdent=e}),ace.define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour"],function(a,b,c){"use strict";var d=a("../../lib/oop"),e=a("../behaviour").Behaviour,f=function(){this.add("braces","insertion",function(a,b,c,d,e){if(e=="{"){var f=c.getSelectionRange(),g=d.doc.getTextRange(f);return g!==""?{text:"{"+g+"}",selection:!1}:{text:"{}",selection:[1,1]}}if(e=="}"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j=="}"){var k=d.$findOpeningBracket("}",{column:h.column+1,row:h.row});if(k!==null)return{text:"",selection:[1,1]}}}else if(e=="\n"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j=="}"){var l=d.findMatchingBracket({row:h.row,column:h.column+1});if(!l)return null;var m=this.getNextLineIndent(a,i.substring(0,i.length-1),d.getTabString()),n=this.$getIndent(d.doc.getLine(l.row));return{text:"\n"+m+"\n"+n,selection:[1,m.length,1,m.length]}}}}),this.add("braces","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&f=="{"){var g=d.doc.getLine(e.start.row),h=g.substring(e.end.column,e.end.column+1);if(h=="}")return e.end.column++,e}}),this.add("parens","insertion",function(a,b,c,d,e){if(e=="("){var f=c.getSelectionRange(),g=d.doc.getTextRange(f);return g!==""?{text:"("+g+")",selection:!1}:{text:"()",selection:[1,1]}}if(e==")"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j==")"){var k=d.$findOpeningBracket(")",{column:h.column+1,row:h.row});if(k!==null)return{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&f=="("){var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if(h==")")return e.end.column++,e}}),this.add("string_dquotes","insertion",function(a,b,c,d,e){if(e=='"'||e=="'"){var f=e,g=c.getSelectionRange(),h=d.doc.getTextRange(g);if(h!=="")return{text:f+h+f,selection:!1};var i=c.getCursorPosition(),j=d.doc.getLine(i.row),k=j.substring(i.column-1,i.column);if(k=="\\")return null;var l=d.getTokens(g.start.row,g.start.row)[0].tokens,m=0,n,o=-1;for(var p=0;p<l.length;p++){n=l[p],n.type=="string"?o=-1:o<0&&(o=n.value.indexOf(f));if(n.value.length+m>g.start.column)break;m+=l[p].value.length}if(!n||o<0&&n.type!=="comment"&&(n.type!=="string"||g.start.column!==n.value.length+m-1&&n.value.lastIndexOf(f)===n.value.length-1))return{text:f+f,selection:[1,1]};if(n&&n.type==="string"){var q=j.substring(i.column,i.column+1);if(q==f)return{text:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&(f=='"'||f=="'")){var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if(h=='"')return e.end.column++,e}})};d.inherits(f,e),b.CstyleBehaviour=f}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(a,b,c){"use strict";var d=a("../../lib/oop"),e=a("../../range").Range,f=a("./fold_mode").FoldMode,g=b.FoldMode=function(){};d.inherits(g,f),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(a,b,c){var d=a.getLine(c),f=d.match(this.foldingStartMarker);if(f){var g=f.index;if(f[1])return this.openingBracketBlock(a,f[1],c,g);var h=a.getCommentFoldRange(c,g+f[0].length);return h.end.column-=2,h}if(b!=="markbeginend")return;var f=d.match(this.foldingStopMarker);if(f){var g=f.index+f[0].length;if(f[2]){var h=a.getCommentFoldRange(c,g);return h.end.column-=2,h}var i={row:c,column:g},j=a.$findOpeningBracket(f[1],i);if(!j)return;return j.column++,i.column--,e.fromPoints(j,i)}}}.call(g.prototype)}),ace.define("ace/mode/folding/fold_mode",["require","exports","module","ace/range"],function(a,b,c){"use strict";var d=a("../../range").Range,e=b.FoldMode=function(){};((function(){this.foldingStartMarker=null,this.foldingStopMarker=null,this.getFoldWidget=function(a,b,c){var d=a.getLine(c);return this.foldingStartMarker.test(d)?"start":b=="markbeginend"&&this.foldingStopMarker&&this.foldingStopMarker.test(d)?"end":""},this.getFoldWidgetRange=function(a,b,c){return null},this.indentationBlock=function(a,b,c){var e=/^\s*/,f=b,g=b,h=a.getLine(b),i=c||h.length,j=h.match(e)[0].length,k=a.getLength();while(++b<k){h=a.getLine(b);var l=h.match(e)[0].length;if(l==h.length)continue;if(l<=j)break;g=b}if(g>f){var m=a.getLine(g).length;return new d(f,i,g,m)}},this.openingBracketBlock=function(a,b,c,e){var f={row:c,column:e+1},g=a.$findClosingBracket(b,f);if(!g)return;var h=a.foldWidgets[g.row];return h==null&&(h=this.getFoldWidget(a,g.row)),h=="start"&&(g.row--,g.column=a.getLine(g.row).length),d.fromPoints(f,g)}})).call(e.prototype)})