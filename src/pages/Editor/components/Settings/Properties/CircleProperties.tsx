import { ColorInput } from "@/components/common/Input/ColorInput";
import { NumberInput } from "@/components/common/Input/NumberInput";

import { useToolStore } from "@/store/useToolStore";

export const CircleProperties = () => {
  const { toolSettings, updateToolSettings } = useToolStore();
  const settings = toolSettings.circle;
  return (
    <div className="space-y-4">
      <NumberInput
        label="반지름"
        value={settings.radius}
        onChange={(value) => updateToolSettings("circle", { radius: value })}
        min={1}
        max={1000}
      />
      <ColorInput
        label="백그라운드 색상"
        value={settings.fill}
        onChange={(value) => updateToolSettings("circle", { fill: value })}
      />
      <ColorInput
        label="테두리 색상"
        value={settings.stroke}
        onChange={(value) => updateToolSettings("circle", { stroke: value })}
      />
      <NumberInput
        label="테두리 두께"
        value={settings.strokeWidth}
        onChange={(value) =>
          updateToolSettings("circle", { strokeWidth: value })
        }
        min={0}
        max={100}
      />
    </div>
  );
};
