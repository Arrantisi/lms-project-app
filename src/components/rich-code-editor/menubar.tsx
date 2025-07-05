import { cn } from "@/lib/utils";
import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignLeft2,
  IconAlignRight2,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBold,
  IconH1,
  IconH2,
  IconH3,
  IconItalic,
  IconList,
  IconListNumbers,
  IconStrikethrough,
  IconUnderline,
} from "@tabler/icons-react";
import { type Editor } from "@tiptap/react";
import { Toggle } from "../ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";

interface MenubarProps {
  editor: Editor | null;
}

const Menubar = ({ editor }: MenubarProps) => {
  if (!editor) return null;

  return (
    <div className="border border-input border-t-0 border-x-0∑ rouded-t-lg p-2 bg-background flex flex-wrap items-center gap-1">
      <TooltipProvider>
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("bold")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBold().run()
                }
                className={cn(
                  editor.isActive("bold") && "text-muted-foreground bg-muted"
                )}
              >
                <IconBold />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("italic")}
                onPressedChange={() =>
                  editor.chain().focus().toggleItalic().run()
                }
                className={cn(
                  editor.isActive("italic") && "text-muted-foreground bg-muted"
                )}
              >
                <IconItalic />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("underline")}
                onPressedChange={() =>
                  editor.chain().focus().toggleUnderline().run()
                }
                className={cn(
                  editor.isActive("underline") &&
                    "text-muted-foreground bg-muted"
                )}
              >
                <IconUnderline />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Underline</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("strike")}
                onPressedChange={() =>
                  editor.chain().focus().toggleStrike().run()
                }
                className={cn(
                  editor.isActive("strike") && "text-muted-foreground bg-muted"
                )}
              >
                <IconStrikethrough />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Strike</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("heading", { level: 1 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={cn(
                  editor.isActive("heading", { level: 1 }) &&
                    "text-muted-foreground bg-muted"
                )}
              >
                <IconH1 />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>heading 1</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("heading", { level: 2 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={cn(
                  editor.isActive("heading", { level: 2 }) &&
                    "text-muted-foreground bg-muted"
                )}
              >
                <IconH2 />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>heading 1</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("heading", { level: 3 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={cn(
                  editor.isActive("heading", { level: 3 }) &&
                    "text-muted-foreground bg-muted"
                )}
              >
                <IconH3 />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>heading 3</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("bulletList")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBulletList().run()
                }
                className={cn(
                  editor.isActive("bulletList") &&
                    "text-muted-foreground bg-muted"
                )}
              >
                <IconList />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive("orderedList")}
                onPressedChange={() =>
                  editor.chain().focus().toggleOrderedList().run()
                }
                className={cn(
                  editor.isActive("orderedList") &&
                    "text-muted-foreground bg-muted"
                )}
              >
                <IconListNumbers />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>
        </div>
        <div className="w-px h-6 mx-2 bg-border" />
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive({ textAlign: "left" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                className={cn(
                  editor.isActive({ textAlign: "left" }) &&
                    "text-muted-foreground bg-muted"
                )}
              >
                <IconAlignLeft2 />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Align Left</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive({ textAlign: "center" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                className={cn(
                  editor.isActive({ textAlign: "center" }) &&
                    "text-muted-foreground bg-muted"
                )}
              >
                <IconAlignCenter />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Align Center</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size={"sm"}
                pressed={editor.isActive({ textAlign: "right" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                className={cn(
                  editor.isActive({ textAlign: "right" }) &&
                    "text-muted-foreground bg-muted"
                )}
              >
                <IconAlignRight2 />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Align right</TooltipContent>
          </Tooltip>
        </div>
        <div className="w-px bg-border h-6 mx-2" />
        <div className="flex flex-wrap">
          <Button
            size={"sm"}
            variant={"ghost"}
            type="button"
            className="cursor-default"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <IconArrowBackUp />
          </Button>
          <Button
            size={"sm"}
            variant={"ghost"}
            type="button"
            className="cursor-default"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <IconArrowForwardUp />
          </Button>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Menubar;
