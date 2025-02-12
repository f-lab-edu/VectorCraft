import { IconButton } from "@/components/common/Button/IconButton";
import { TOOLS } from "@/constants/icons";

import { useToolStore } from "@/store/useToolStore";
import { ToolType } from "@/types/components/tools";

export const ToolPanel = () => {
  const { selectedTool, setSelectedTool } = useToolStore();

  return (
    <div className="flex flex-col gap-2">
      {TOOLS.map((tool) => (
        <IconButton
          key={tool.id}
          icon={
            <tool.icon
              className={`w-8 h-8 p-2 rounded ${
                selectedTool === tool.id ? "text-white" : ""
              }`}
            />
          }
          title={tool.title}
          className={selectedTool === tool.id ? "bg-black" : ""}
          onClick={() => setSelectedTool(tool.id as ToolType)}
        />
      ))}
    </div>
  );
};
