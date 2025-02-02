import { IconButton } from "@/components/common/Button/IconButton";
import { ICONS } from "@/constants/icons";

export const LayerPanel = () => {
  return (
    <>
      <div className="text-sm font-bold mb-2">레이어</div>
      <div className="flex items-center bg-white p-2 rounded">
        <span>rect - 1</span>
        <IconButton
          className="ml-auto"
          icon={<ICONS.delete className="w-5 h-5 p-2 rounded" />}
          title="삭제"
        />
      </div>
    </>
  );
};
