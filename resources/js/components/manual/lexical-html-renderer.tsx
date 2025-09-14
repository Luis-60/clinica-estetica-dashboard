import { useEffect, useState } from "react";
import { createEditor, ParagraphNode, TextNode } from "lexical";
import { $generateHtmlFromNodes } from "@lexical/html";
// import DOMPurify from "dompurify";
import { ListNode, ListItemNode } from "@lexical/list";
import { SerializedEditorState } from "lexical";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";

interface Props {
  text: SerializedEditorState | undefined | string | null | [];
}

export default function LexicalHTMLRenderer({ text: editorSerializedState }: Props) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    // If no state, return empty
    if (!editorSerializedState) {
      setHtml('');
      return;
    }

    const editor = createEditor({
      namespace: 'HTMLRenderer',
      nodes: [
        HeadingNode,
        ParagraphNode,
        TextNode,
        QuoteNode,
        ListNode,
        ListItemNode,
      ],
      onError: (error) => {
        console.error('Editor error:', error);
      },
    });

    try {
      // Certifique-se de que temos um objeto de estado válido
      const stateToUse = typeof editorSerializedState === 'string' 
        ? JSON.parse(editorSerializedState)
        : editorSerializedState;
      
      // Validar se o estado tem a estrutura esperada
      if (!stateToUse?.root?.children) {
        setHtml('');
        return;
      }

      const stringifiedState = JSON.stringify(stateToUse);
      const editorState = editor.parseEditorState(stringifiedState);
      editor.setEditorState(editorState);
      
      editor.update(() => {
        const rawHtml = $generateHtmlFromNodes(editor, null);
        setHtml(rawHtml || ''); // Se rawHtml for undefined, usa string vazia
      });
    } catch (error) {
      console.error('Error setting editor state:', error);
      setHtml('');
    }
  }, [editorSerializedState]);

  return (
    <div 
      className="prose prose-sm dark:prose-invert max-w-none break-words "
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
