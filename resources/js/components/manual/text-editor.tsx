"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ListItemNode, ListNode } from "@lexical/list";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { AnimatePresence, motion } from "framer-motion";
import {
  EditorState,
  ParagraphNode,
  TextNode
} from "lexical";
import { useState } from "react";
import { FloatingLinkContext } from "../editor/context/floating-link-context";
import { ContentEditable } from "../editor/editor-ui/content-editable";
import { BlockFormatDropDown } from "../editor/plugins/toolbar/block-format-toolbar-plugin";
import { FormatBulletedList } from "../editor/plugins/toolbar/block-format/format-bulleted-list";
import { FormatNumberedList } from "../editor/plugins/toolbar/block-format/format-numbered-list";
import { FormatParagraph } from "../editor/plugins/toolbar/block-format/format-paragraph";
import { FormatQuote } from "../editor/plugins/toolbar/block-format/format-quote";
import { ElementFormatToolbarPlugin } from "../editor/plugins/toolbar/element-format-toolbar-plugin";
import { FontBackgroundToolbarPlugin } from "../editor/plugins/toolbar/font-background-toolbar-plugin";
import { FontColorToolbarPlugin } from "../editor/plugins/toolbar/font-color-toolbar-plugin";
import { FontFamilyToolbarPlugin } from "../editor/plugins/toolbar/font-family-toolbar-plugin";
import { FontFormatToolbarPlugin } from "../editor/plugins/toolbar/font-format-toolbar-plugin";
import { FontSizeToolbarPlugin } from "../editor/plugins/toolbar/font-size-toolbar-plugin";
import { HistoryToolbarPlugin } from "../editor/plugins/toolbar/history-toolbar-plugin";
import { ToolbarPlugin } from "../editor/plugins/toolbar/toolbar-plugin";
import { editorTheme } from "../editor/themes/editor-theme";

function prepareInitialState(editorSerializedState: any) {
  if (!editorSerializedState) return null;

  try {
    if (typeof editorSerializedState === "string") {
      const parsed = JSON.parse(editorSerializedState);
      return (editor: any) => editor.parseEditorState(parsed);
    }

    if (
      typeof editorSerializedState === "object" &&
      editorSerializedState.root
    ) {
      return (editor: any) => editor.parseEditorState(editorSerializedState);
    }

    return null;
  } catch (error) {
    console.error("Error preparing initial state:", error);
    return null;
  }
}

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes: [
    HeadingNode,
    ParagraphNode,
    TextNode,
    QuoteNode,
    ListNode,
    ListItemNode,
  ],
  onError: (error: Error) => {
    console.error(error);
  },
};

interface Props {
  activeToolbar?: boolean;
  value?: EditorState;
  onChange?: (editorState: EditorState) => void;
  placeholder?: string;
}

export default function TextEditor({
  activeToolbar,
  value,
  onChange,
  placeholder,
}: Props) {
  return (
    <div className="bg-background w-full overflow-hidden rounded-lg border editor-container">
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          ...(value ? { editorState: JSON.stringify(value) } : {}),
          onError: (error) => console.error("Lexical error:", error),
        }}
      >
        <TooltipProvider>
          <FloatingLinkContext>
            <Plugins
              placeholder={placeholder}
              activeToolbar={activeToolbar ?? true}
            />
          </FloatingLinkContext>
          <OnChangePlugin
            ignoreSelectionChange={true}
            onChange={(editorState) => {
              onChange?.(editorState);
            }}
          />
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}

export function Plugins({ activeToolbar, placeholder = "" }: Props) {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className="relative">
      {/* toolbar plugins */}
      <AnimatePresence>
        {activeToolbar && (
          <motion.div
            key={"nada"}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.3 } }}
            exit={{ y: -10, opacity: 0, transition: { duration: 0.15 } }}
          >
            <ToolbarPlugin>
              {({ blockType }) => (
                <div className="vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto border-b p-1">
                  <HistoryToolbarPlugin />
                  <ElementFormatToolbarPlugin />

                  <FontFamilyToolbarPlugin />
                  <FontSizeToolbarPlugin />

                  <FontFormatToolbarPlugin format="bold" />
                  <FontFormatToolbarPlugin format="italic" />
                  <FontFormatToolbarPlugin format="underline" />
                  <FontFormatToolbarPlugin format="strikethrough" />

                  <FontColorToolbarPlugin />
                  <FontBackgroundToolbarPlugin />

                  <BlockFormatDropDown>
                    <FormatParagraph />
                    <FormatNumberedList />
                    <FormatBulletedList />
                    <FormatQuote />
                  </BlockFormatDropDown>

                  {/* <LinkToolbarPlugin /> */}
                </div>
              )}
            </ToolbarPlugin>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative group">
        <ListPlugin />
        <CheckListPlugin />
        <HistoryPlugin />
        <RichTextPlugin
          contentEditable={
            <div className="group-focus-within:ring-ring/50 group-focus-within:ring-[3px] group-focus-within:border-ring border">
              <div className="" ref={onRef}>
                <ContentEditable
                  placeholder={placeholder}
                  className="ContentEditable__root relative block h-72 min-h-72 overflow-auto px-4 py-2 focus:outline-none"
                />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        {/* <AutoLinkPlugin matchers={[]} />
        <LinkPlugin />
        <ClickableLinkPlugin />
        <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} /> */}
      </div>
    </div>
  );
}
