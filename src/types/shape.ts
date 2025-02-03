// 모든 도형의 공통 속성
export interface BaseShape {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  isSelected?: boolean;
}

// 도형 타입 정의
export type ShapeType = "rectangle" | "circle" | "polygon";

// 사각형 속성
export interface RectangleShape extends BaseShape {
  type: "rectangle";
  width: number;
  height: number;
  borderRadius: number;
}

// 원형 속성
export interface CircleShape extends BaseShape {
  type: "circle";
  radius: number;
}

// 다각형 속성
export interface PolygonShape extends BaseShape {
  type: "polygon";
  radius: number;
  sides: number;
}

// 모든 도형 타입을 포함하는 유니온 타입
export type Shape = RectangleShape | CircleShape | PolygonShape;

// 새로운 도형 생성시 사용할 기본값
export const DEFAULT_SHAPE_PROPS = {
  fill: "#ffffff",
  stroke: "#000000",
  strokeWidth: 1,
  isSelected: false,
} as const;

// 도형별 기본 크기
export const DEFAULT_SHAPE_SIZES = {
  rectangle: {
    width: 100,
    height: 100,
    borderRadius: 0,
  },
  circle: {
    radius: 50,
  },
  polygon: {
    radius: 50,
    sides: 3,
  },
} as const;
