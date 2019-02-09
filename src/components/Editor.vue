<template lang="pug">
.Editor
    textarea
    .panel
        .title Challenge 1
        .body
            | The join method is used to join the elements of an array together to create a string. It takes an argument for the delimiter that is used to separate the array elements in the string.
            br
            br
            | Here's an example:
            code
                | var arr = ["Hello", "World"];
                br
                | var str = arr.join(" ");
                br
                | // Sets str to "Hello World"
        Button submit
</template>

<script>
import CodeMirror from 'codemirror'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/clike/clike'

export default {
  name: 'Editor',
  mounted () {
    const readOnlyLines = [0,1,2,3]
    const textarea = this.$el.getElementsByTagName('textarea')[0]
    const editor = CodeMirror.fromTextArea(textarea, {
        mode: "text/x-java",
        theme: "monokai",
        styleActiveLine: true,
        lineNumbers: true,
        matchBrackets: true,
        indentUnit: 1,
        indentWithTabs: false,
        autoCloseTags: true,
        autoCloseBrackets: true,
        matchTags: false,
        extraKeys: {"Ctrl-Space": "autocomplete"},
    })

    editor.setSize("100%", "100%");
    
    editor.getDoc().setValue(
    'class Challenge1 {\n\n' +
    '  public static void main (String[] args) {\n\n' +
    '    // write your code here\n\n' +
    '  }\n\n' +
    '}'
    )

    editor.on('beforeChange',function(cm,change) {
        const readOnlyLines = [0, 1, 2, cm.doc.size - 3, cm.doc.size - 2, cm.doc.size - 1]
        if (change.to.line == cm.doc.size - 3 && change.to.ch == 0)
            change.cancel()
        if (~readOnlyLines.indexOf(change.from.line))
            change.cancel()
    })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.Editor
    background: #272822
    height: 100%
    border-radius: 6px
    border: 1px solid #484848
    background: #282828
    over-flow: hidden
    // background-image: linear-gradient(#282828, #242424)
    display: flex
    .CodeMirror
        flex: 1
        background: transparent
        &-scroll
            padding: 32px 0
        &-linenumbers
            background: #363636
            border-right: 1px solid #484848
            background-image: linear-gradient(90deg, transparent, rgba(#363636, .1))
    .panel
        width: 480px
        background: #363636
        border-left: 1px solid #484848
        padding: 12px 12px 24px
        box-sizing: border-box
        display: flex
        flex-direction: column
        .title
            border-bottom: 1px solid rgba(#fff, .1)
            padding: 12px 0
            text-align: center
            font-size: 24px
        .body
            flex: 1
            padding: 24px
            color: rgba(#fff, .87)
            font-weight: 300
            code
                display: block
                background: rgba(#fff, .1)
                width: 100%
                font-size: 16px
                margin: 24px 0
                padding: 6px 18px

</style>
