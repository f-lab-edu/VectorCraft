import { SettingsPanelProps } from "@/types/components/settings";

import { RectangleProperties } from "./Properties/RectangleProperties";
import { CircleProperties } from "./Properties/CircleProperties";
import { PolygonProperties } from "./Properties/PolygonProperties";
import { ColorInput } from "@/components/common/Input/ColorInput";
import { useToolStore } from "@/store/useToolStore";
import { ToolType } from "@/types/components/tools";
import { ComponentType, useMemo } from "react";
import { CursorProperties } from "./Properties/CursorProperties";

const ToolComponents: Record<ToolType, ComponentType> = {
  cursor: CursorProperties,
  rectangle: RectangleProperties,
  circle: CircleProperties,
  polygon: PolygonProperties,
};

export const SettingsPanel = ({
  backgroundColor,
  onChangeBackgroundColor,
}: SettingsPanelProps) => {
  const selectedTool = useToolStore((state) => state.selectedTool);

  const toolSettingsComponent = useMemo(() => {
    const Component = ToolComponents[selectedTool];
    return Component ? <Component /> : null;
  }, [selectedTool]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">속성</h2>
      <div className="space-y-2">
        <ColorInput
          label="배경색"
          value={backgroundColor}
          onChange={onChangeBackgroundColor}
        />
      </div>

      {toolSettingsComponent}
    </div>
  );
};
