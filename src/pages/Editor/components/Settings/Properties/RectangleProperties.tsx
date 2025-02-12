import { NumberInput } from "@/components/common/Input/NumberInput";
import { ColorInput } from "@/components/common/Input/ColorInput";
import { useToolStore } from "@/store/useToolStore";

export const RectangleProperties = () => {
  const { toolSettings, updateToolSettings } = useToolStore();
  const settings = toolSettings.rectangle;

  return (
    <div className="space-y-4">
      <h3 className="font-bold">사각형 설정</h3>
      <div className="space-y-2">
        <NumberInput
          label="가로"
          value={settings.width}
          onChange={(value) =>
            updateToolSettings("rectangle", { width: value })
          }
          min={10}
          max={1000}
        />
        <NumberInput
          label="세로"
          value={settings.height}
          onChange={(value) =>
            updateToolSettings("rectangle", { height: value })
          }
          min={10}
          max={1000}
        />
        <NumberInput
          label="테두리 두께"
          value={settings.strokeWidth}
          onChange={(value) =>
            updateToolSettings("rectangle", { strokeWidth: value })
          }
          min={0}
          max={10}
        />
        <ColorInput
          label="채우기 색상"
          value={settings.fill}
          onChange={(value) => updateToolSettings("rectangle", { fill: value })}
        />
        <ColorInput
          label="테두리 색상"
          value={settings.stroke}
          onChange={(value) =>
            updateToolSettings("rectangle", { stroke: value })
          }
        />
      </div>
    </div>
  );
};
