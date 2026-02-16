import { useEffect, useRef, useState } from "react";
import {
  ConfigState,
  forkliftColors,
  mastHeights,
  calculateUnitPrice,
} from "@/data/forkliftData";
import forkliftImage from "@/assets/forklift-base.png";
import {
  Zap,
  Fuel,
  Flame,
  Radio,
  Monitor,
  Gauge,
  ArrowUpDown,
  Circle,
} from "lucide-react";

interface ForkliftPreviewProps {
  config: ConfigState;
}

export function ForkliftPreview({ config }: ForkliftPreviewProps) {
  const model = config.selectedModel!;
  const colorData = forkliftColors.find((c) => c.value === config.color)!;
  const unitPrice = calculateUnitPrice(config);

  // Track which values changed for animation triggers
  const [animKey, setAnimKey] = useState(0);
  const prevConfigRef = useRef(config);
  useEffect(() => {
    const prev = prevConfigRef.current;
    if (
      prev.color !== config.color ||
      prev.mastHeight !== config.mastHeight ||
      prev.tireType !== config.tireType ||
      prev.powerType !== config.powerType ||
      prev.displayPackage !== config.displayPackage
    ) {
      setAnimKey((k) => k + 1);
    }
    prevConfigRef.current = config;
  }, [config]);

  const mastScale =
    config.mastHeight.value === 188
      ? 1
      : config.mastHeight.value === 216
      ? 1.06
      : 1.12;

  const hasTelematics = config.selectedAddons.includes("telematics-hw");
  const hasAdvancedDisplay = config.displayPackage === "Advanced";
  const hasEnhancedDisplay = config.displayPackage === "Enhanced" || hasAdvancedDisplay;

  const PowerIcon =
    config.powerType === "Electric"
      ? Zap
      : config.powerType === "Diesel"
      ? Flame
      : Fuel;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Preview area */}
      <div className="relative bg-gradient-to-b from-secondary/40 to-secondary/10 p-6">
        {/* Model badge */}
        <div className="absolute top-4 left-4 z-10">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
            {model.series}
          </p>
          <p className="text-sm font-bold text-foreground">{model.name}</p>
        </div>

        {/* Price badge */}
        <div className="absolute top-4 right-4 z-10 text-right">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Unit Price</p>
          <p className="text-lg font-bold text-foreground transition-all duration-300">
            ${unitPrice.toLocaleString()}
          </p>
        </div>

        {/* Forklift image container */}
        <div className="relative mx-auto max-w-md py-8">
          {/* Main forklift with color filter and mast scale */}
          <div
            className="transition-all duration-700 ease-out origin-bottom"
            style={{
              filter: colorData.css === "none" ? undefined : colorData.css,
              transform: `scaleY(${mastScale})`,
            }}
          >
            <img
              key={animKey}
              src={forkliftImage}
              alt={`${model.name} - ${colorData.label}`}
              className="w-full h-auto animate-scale-in"
              style={{ animationDuration: "0.5s" }}
            />
          </div>

          {/* Feature overlays */}
          {/* Telematics antenna indicator */}
          {hasTelematics && (
            <div
              className="absolute animate-indicator-pop"
              style={{ top: "18%", right: "22%" }}
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center backdrop-blur-sm">
                  <Radio className="w-4 h-4 text-primary" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-success animate-pulse-subtle" />
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap">
                  <span className="text-[9px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                    GPS Active
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Advanced display indicator */}
          {hasEnhancedDisplay && (
            <div
              className="absolute animate-indicator-pop"
              style={{ top: "28%", left: "42%", animationDelay: "0.1s" }}
            >
              <div className="w-8 h-8 rounded-full bg-info/15 border border-info/30 flex items-center justify-center backdrop-blur-sm">
                <Monitor className="w-4 h-4 text-info" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap">
                <span className="text-[9px] font-medium text-info bg-info/10 px-1.5 py-0.5 rounded">
                  {hasAdvancedDisplay ? "Touchscreen" : "LCD"}
                </span>
              </div>
            </div>
          )}

          {/* Power type indicator */}
          <div
            className="absolute animate-indicator-pop"
            style={{ bottom: "28%", right: "15%", animationDelay: "0.15s" }}
          >
            <div className="w-7 h-7 rounded-full bg-card/80 border border-border flex items-center justify-center backdrop-blur-sm">
              <PowerIcon className="w-3.5 h-3.5 text-foreground" />
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap">
              <span className="text-[9px] font-medium text-muted-foreground bg-card/80 px-1.5 py-0.5 rounded border border-border">
                {config.powerType}
              </span>
            </div>
          </div>

          {/* Tire indicator */}
          <div
            className="absolute animate-indicator-pop"
            style={{ bottom: "8%", left: "20%", animationDelay: "0.2s" }}
          >
            <div className="w-7 h-7 rounded-full bg-card/80 border border-border flex items-center justify-center backdrop-blur-sm">
              <Circle className="w-3.5 h-3.5 text-foreground" />
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap">
              <span className="text-[9px] font-medium text-muted-foreground bg-card/80 px-1.5 py-0.5 rounded border border-border">
                {config.tireType}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Spec readout strip */}
      <div className="border-t border-border bg-card px-5 py-3">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-0.5">
              <Gauge className="w-3 h-3" />
              <span className="text-[10px] uppercase tracking-wider font-medium">Capacity</span>
            </div>
            <p className="text-sm font-bold text-foreground transition-all duration-300">
              {config.capacity.toLocaleString()} lb
            </p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-0.5">
              <ArrowUpDown className="w-3 h-3" />
              <span className="text-[10px] uppercase tracking-wider font-medium">Mast</span>
            </div>
            <p className="text-sm font-bold text-foreground transition-all duration-300">
              {config.mastHeight.value}"
            </p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-0.5">
              <PowerIcon className="w-3 h-3" />
              <span className="text-[10px] uppercase tracking-wider font-medium">Power</span>
            </div>
            <p className="text-sm font-bold text-foreground transition-all duration-300">
              {config.powerType}
            </p>
          </div>
        </div>
      </div>

      {/* Color selector strip */}
      <div className="border-t border-border bg-card/50 px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground">Color</span>
          <div className="flex gap-2">
            {forkliftColors.map((c) => (
              <button
                key={c.value}
                onClick={() => {
                  // Dispatch color change via custom event
                  window.dispatchEvent(
                    new CustomEvent("forklift-color-change", { detail: c.value })
                  );
                }}
                className={`w-6 h-6 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                  config.color === c.value
                    ? "border-primary ring-2 ring-primary/20 scale-110"
                    : "border-border"
                }`}
                style={{ backgroundColor: c.swatch }}
                title={c.label}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-auto">{colorData.label}</span>
        </div>
      </div>
    </div>
  );
}
