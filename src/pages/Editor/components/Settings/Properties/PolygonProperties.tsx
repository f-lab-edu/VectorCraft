import { ColorInput } from "@/components/common/Input/ColorInput";
import { NumberInput } from "@/components/common/Input/NumberInput";

import { useToolStore } from "@/store/useToolStore";

export const PolygonProperties = () => {
  const { toolSettings, updateToolSettings } = useToolStore();
  const settings = toolSettings.polygon;

  return (
    <div className="space-y-4">
      <NumberInput
        label="반지름"
        value={settings.radius}
        onChange={(value) => updateToolSettings("polygon", { radius: value })}
        min={1}
        max={1000}
      />
      <NumberInput
        label="변의 개수"
        value={settings.sides}
        onChange={(value) => updateToolSettings("polygon", { sides: value })}
        min={3}
        max={12}
      />
      <ColorInput
        label="백그라운드 색상"
        value={settings.fill}
        onChange={(value) => updateToolSettings("polygon", { fill: value })}
      />
      <ColorInput
        label="테두리 색상"
        value={settings.stroke}
        onChange={(value) => updateToolSettings("polygon", { stroke: value })}
      />
      <NumberInput
        label="테두리 두께"
        value={settings.strokeWidth}
        onChange={(value) =>
          updateToolSettings("polygon", { strokeWidth: value })
        }
        min={0}
        max={100}
      />
    </div>
  );
};
