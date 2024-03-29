#!/usr/bin/env node

//'use-strict;'
//var http = require('http');
const fs = require('fs');
//const os = require('os');
const path = require('path');
const styles = require('./styles.js');

const epub_dir = process.cwd();
const text_dir = path.join(epub_dir, 'OEBPS/text');
const toc_path = path.join(epub_dir, 'OEBPS/toc.xhtml');
const file_list = fs.readdirSync(text_dir);

const file_contents = []

for (const file of file_list) {
    if (file.includes(".xhtml", -6)) {
        let current_file = { "file_name": file, "file_text": "" }
        const file_path = path.join(text_dir, file)

        current_file.file_text = fs.readFileSync(file_path, 'utf-8')
        file_contents.push(current_file);
    }
}

const reg_reports = [

    { regex: /<span class="[^l][^"]+">[^ ]*[(){};.,'"!?]+<\/span>[a-zA-Z0-9(){}",]/g, header: "Spans Needing A Space:", regex1: `(&#60;span class="[^l][^"]+"&#62;)?[^ ]*[(){};.,\'"!?]+&#60;\/span&#62;([a-z0-9(){}",]\s?[^ ]*)` },

    { regex: /............[^ ]*[a-zA-Z0-9.](<span class="[^nl].*?">|<\/span>)(<span class="[^nl].*?">|<\/span>)?(<span class="[^nl].*?">|<\/span>)?([A-Za-z.,0-9]*)?(<span class="[^nl].*?">|<\/span>)?[A-Za-z0-9][^ ]*............../g, header: '<b>SPANS #2</b>  potentially needing a space:', regex1: `([\w(){};.,\'"!?]+)(&#60;\/span&#62;)([\w]+)` },

    { regex: /............[^ (=]*(<span class="[^nl].*?">)(<\/span>)(<span class="[^nl].*?">|<\/span>)?(<span class="[^nl].*?">|<\/span>)?([A-Za-z.,0-9]*)?(<span class="[^nl].*?">|<\/span>)?[A-Za-z0-9][^ ]*............../g, header: '<b>SPANS #3</b>  potentially needing a space:', regex1: `([\w(){};.,\'"!?]+)(&#60;\/span&#62;)([\w]+)` },


    { regex: /..........([^ ]*\s?[^ ]+)\s+([,;:)])........./g, header: "Punctuation Needing A Preceding Space:", regex1: `([^ ]+)\s+([,;:)])` },

    { regex: /.........,([^&"’”'<0-9 \s—]+)/g, header: "Commas Without A Following Space:", regex1: `,([^\"’”\'&#60;0-9 \s—]+)` },

    { regex: /[^ ]*<\/span>\(\s?[^ ]*/g, header: "Parentheses Needing A Space Removed:", regex1: `(\()\s+([^ ]+)` },

    { regex: /(<p>|<p class="[^p][^"]*").*?\s?[^ ]*[a-z0-9]\s?<\/p>\s*<[^buo]/g, header: "End of a &#60;p&#62; Element without Punctuation:", regex1: `[a-z]\s?&#60;/p&#62;` },

    { regex: /..........[^ ]*\s?<span class=\"([^"]+)\">([^>]+)<\/span><span class="\1">[^ ]*......../g, header: "REDUNDANT TAGS #1:", regex1: `&#60;span class="([^"]+)"&#62;([^&#62;]+)&#60;/span&#62;&#60;span class="\\1"&#62;` },

    { regex: /...........<span class="([^"]*)">([^<]*)<\/span>(\s*)<span class="\1">([^<]*)<\/span>.........../g, header: "REDUNDANT TAGS #2:", regex1: `&#60;span class="([^"]+)"&#62;([^&#62;]+)&#60;/span&#62;&#60;span class="\\1"&#62;` },

    { regex: /...........<\/a><\/sup>[a-z]+\.?/g, header: "&#60;sup&#62; Tags that May Need a Following Space:", regex1: `(&#60;/ a &#62;&#60; /sup&#62;)([a-z].)` },

    { regex: /[^ ]*\s[“"”]\s/g, header: "Quotation Marks that may Need a Space Removed:", regex1: `\s"\s` },

    { regex: /[^ ]*<\/sup> \.[^ ]*/g, header: "Potential Space Between Closing Sup tags and a Period:", regex1: `&#60;/sup&#62; \.` },

    { regex: /.........[^ ]*\s+<sup class="fn"/g, header: "Space Before An Inline Footnote Ref:", regex1: `[^ ]*\s*&#60;sup class="fn"` },

    { regex: /\s[^ ]*\s?[.!?](<[^!][^>]*[^?]>)(<[^!][^>]*[^?]>)?(<[^!][^>]*[^?]>)?(<[^!][^>]*>)?["A-Z][a-zA-Z]+\s/g, header: "Potential Lack of Space after a Period:", regex1: `([\.\?])((&#60;/span&#62;)?(&#60;[^&#62;]*&#62;)?(["A-Z][a-zA-Z]+))` },

    { regex: /\s[A-Z]?[a-z]+[A-Z][a-z]+\s/g, header: "Find Potential Lack of Space between a word and capitalized word:", regex1: `(\s?[A-Z]?[a-z]+)([A-Z][a-z]+)` },

    { regex: /.........\s[^&# ]+;\w........../g, header: "Find Potential Lack of Space after a semicolon:", regex1: `([^0][;])((&#60;/span&#60;)?(&#62;[^&#62;]*&#62;)?([^"’”'&#60;0-9 \s—]+))` },

    { regex: /[^ ]+<\/sup>[a-zA-Z]+\s?[^ ]+/g, header: "Find Potential Lack of Space between an ending sup tag and a capitalized word:", regex1: `([^ ]*\s?&#60;\/sup&#62;)([A-Z][^ ]*)` },

    { regex: /([^ ]\.)\s+([“"])\s/g, header: "Find Potential Lack of Space between a period and beginning quotation marks:", regex1: `([^ ]+\s?\.)([“"][^ ]*)` },

    { regex: /[,:]<[^>]*>[^"’”'<0-9 \s—]+\s?[^ ]*/g, header: "Find Potential Lack of Space After A Comma (with span):", regex1: `([,:])((&#60;[^&#62;]*&#62;)([^"’”\'&#60;0-9 \s—]\s?[^ ]*))` },

    { regex: /\s[^&][a-zA-Z0-9]+;[a-z]/g, header: "Find Potential Lack of Space After A Semicolon (after a digit):", regex1: `([^ ]*\s?\d+;)([a-z]*\s?[^ ]*)` },

    { regex: /[^ ]+\s[^ ]+\s[^ ]+[a-z>]:[^te ][<a-zA-Z][^ ]+\s[^ ]+/g, header: "Find Colons That May Need A Following Space:", regex1: `([^ ]+[a-z]:)([A-Z][^ ]+)` },

    { regex: /[^ ]+\s[bcdefghjklmnopqrestuvwxyz]\s[^ ]+/g, header: "Find isolated consonants:", regex1: `\\s[bcdefghjklmnopqrestuvwxyz]\\s` },

    { regex: /<span class="i">([^A-Z][^<]*[āåâêëėèēîīôöòōûüū][^<]*)<\/span>/g, header: "Find characters potentially needing lang tags:", regex1: `&#60;span class="i"&#62;([^A-Z][^&#60;]*[āåâêëėèēîīôöòōûüū][^&#60;]*)&#60;/span&#62;` },

    //{ regex: /([^ ]*\s?[^ ]+\s?<\/span>)(\([^ ]*)/g, header: ` Find parentheses that may need a space after a span: &#160;&#160;   ([^ ]*\s?[^ ]+\s?&#60;\/span&#62;)(\([^ ]*)   &#160;&#160;` },

    { regex: /(\s[^>/= ]*\s[-–][^</= ]*\s|\s[^>/= ]*[-–]\s[^</= ]*\s)/g, header: "Possible spacing issues around dashes/emdashes:", regex1: `(\s[^&#62;/= ]*\s[-–][^&#60;/= ]*\s|\s[^&#62;/= ]*[-–]\s[^&#60;/= ]*\s)` },

    { regex: /(<a)(( class="url")?( href="http[^"]+")?>(.*?)<\/a>)/g, header: "Find links that may need _target markup:", regex1: `&#60;a(( class="url")?( href="http[^"]+")?&#62;(.*?)&#60;/a&#62;) ADD:  target="_blank" to link` },

    { regex: /.....[^"]http....../g, header: "Find potentially un-tagged web addresses (After line 3):", regex1: `.......[^"]ttp......` },

    { regex: /.................\s(?<!>|o|e|v)v(?:\.|er(?:\.|s(?:\.|es?)?)?|(?:[sv](?:\.|s\.?)?))?( )?\d+.........../g, header: "SCRIPTURE - potentially un-tagged refs:", regex1: `.......\\s(?&#60;!&#62;|o|e|v)v(?:\\.|er(?:\\.|s(?:\.|es?)?)?|(?:[sv](?:\\.|s\\.?)?))?( )?\\d+......` }
]

const spacehound = function () {

    let msg = [];
    for (const [index, i] of reg_reports.entries()) {

        let occurrence_tally = []

        for (const file of file_contents) {

            const regex_occ_list = file.file_text.match(i.regex)

            if (regex_occ_list) {
                for (const occurrence of regex_occ_list) {
                    let text_halves = file.file_text.split(occurrence) //creates array, separting text into two chunks around that span
                    let first_half = text_halves[0].split('\n')
                    let lineNum = first_half.length           //returns number of elements, which would be lines before the span
                    let col = first_half[first_half.length - 1].length + 1   //in the first_half array, the index will be one less than the length (which doesn't start at 0).  the final .length will return the final string member of that

                    occurrence_tally.push(`<input type="checkbox" id="scales" name="scales">
             <label for="scales"></label>${file.file_name} - line:${lineNum} - col:${col} - Occurrence:<br />&#160;&#160;&#160;&#160;&#160;&#160;<span class="franklin">${occurrence.replace(/</gi, '&#60;').replace(/>/gi, '&#62;')}</span>`) //use [regex].exec to return an array where the first group is the entire match, while the second element of each array will be the capture group (in order)
                    //console.log(occurrence);
                }
            }
        }
        msg.push(`<section> <p>${occurrence_tally.length === 0 ? `<span class="green">&#10003;` : `<span class="red">&#9873;&#160;&#160;<label class="read-more-toggle-label" for="read-more-toggle-${index + 1}">${occurrence_tally.length}&#160;&#160;Occurrence${occurrence_tally.length == 1 ? "" : "s"}</label>&#160;&#160;`}</span>&#160;&#160;<span class="montserrat">${i.header}</span><br /><br />&#160;&#160;&#160;&#160;<span class="franklin">${i.regex1}</span> </p><article><input id="read-more-toggle-${index + 1}" class="read-more-toggle" type="checkbox"><div class="read-more-content"> <p>${occurrence_tally.join("<br /><br />\n")}</p></div></article></section>`);
        // console.log(occurrence_tally);
        //console.log(msg.join());
        // console.log(i.header + `${ occurrence_tally.join("\n") }`);
    }

    const sendMsg = `<!DOCTYPE html>
    <html><head><link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.css" />${styles}</head>
    <body>
    <div class="pageBackground stars">
    <header>
    <h1>Spacehound</h1>
    <!-- <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Littlebluedog-1.svg"> -->
    </header>
    <div class="contentBackground"> <div class="contentContainer">` + msg.join("") + `</div></div></div>
    </body>
    </html>`

    return sendMsg;
}

module.exports = spacehound;
