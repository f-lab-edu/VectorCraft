import { IconButton } from "@/components/common/Button/IconButton";
import { TOOLS } from "@/constants/icons";
import { ToolType } from "@/types/components/tools";

interface ToolPanelProps {
  selectedTool: ToolType | null;
  onSelectTool: (tool: ToolType) => void;
}

export const ToolPanel = ({ selectedTool, onSelectTool }: ToolPanelProps) => {
  return (
    <div className="flex flex-col gap-2 p-1">
      {TOOLS.map((tool) => (
        <IconButton
          key={tool.id}
          icon={
            <tool.icon
              className={`w-5 h-5 p-2  rounded ${
                selectedTool === tool.id ? "text-white" : ""
              }`}
            />
          }
          title={tool.title}
          className={selectedTool === tool.id ? "bg-black" : ""}
          onClick={() => onSelectTool(tool.id as ToolType)}
        />
      ))}
    </div>
  );
};
