import { JSX, useEffect } from "react";
import { ContentEditable as LexicalContentEditable } from "@lexical/react/LexicalContentEditable";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  KEY_TAB_COMMAND,
  $getSelection,
  $isRangeSelection,
} from "lexical";

type Props = {
  placeholder: string;
  value?: string;
  className?: string;
  placeholderClassName?: string;
};

export function ContentEditable({
  placeholder,
  className,
  value,
  placeholderClassName,
}: Props): JSX.Element {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_TAB_COMMAND,
      (event) => {
        event.preventDefault();

        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            selection.insertText("\t"); // 4 spaces ou "\t"
          }
        });

        return true; // handled
      },
      0
    );
  }, [editor]);

  return (
    <LexicalContentEditable
      className={
        className ??
        `ContentEditable__root relative block min-h-72 min-h-full overflow-auto px-4 py-2 focus:outline-none`
      }
      aria-placeholder={placeholder}
      value={value}
      placeholder={
        <div
          className={
            placeholderClassName ??
            `text-muted-foreground pointer-events-none absolute top-0 left-0 overflow-hidden px-4 py-2 text-ellipsis select-none`
          }
        >
          {placeholder}
        </div>
      }
    />
  );
}
