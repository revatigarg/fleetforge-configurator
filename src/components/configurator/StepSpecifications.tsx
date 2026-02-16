import {
  ConfigState,
  capacityOptions,
  mastHeights,
  powerTypes,
  tireTypes,
  displayPackages,
  calculateUnitPrice,
  PowerType,
  TireType,
  DisplayPackage,
} from "@/data/forkliftData";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import forkliftImage from "@/assets/forklift-base.png";

interface StepSpecificationsProps {
  config: ConfigState;
  onChange: (updates: Partial<ConfigState>) => void;
}

export function StepSpecifications({ config, onChange }: StepSpecificationsProps) {
  const model = config.selectedModel!;
  const availableCapacities = capacityOptions.filter(
    (c) => c >= model.capacityMin && c <= model.capacityMax
  );

  const isElectricDisabled = config.capacity > 6000;
  const isDieselDisabled = config.environment === "Indoor";

  const unitPrice = calculateUnitPrice(config);

  const handleCapacityChange = (capacity: number) => {
    const updates: Partial<ConfigState> = { capacity };
    if (capacity > 6000 && config.powerType === "Electric") {
      updates.powerType = "LPG";
    }
    onChange(updates);
  };

  const handleEnvironmentChange = (env: "Indoor" | "Outdoor") => {
    const updates: Partial<ConfigState> = { environment: env };
    if (env === "Indoor" && config.powerType === "Diesel") {
      updates.powerType = "LPG";
    }
    onChange(updates);
  };

  const handleDisplayChange = (dp: DisplayPackage) => {
    const updates: Partial<ConfigState> = { displayPackage: dp };
    if (dp === "Advanced" && !config.selectedAddons.includes("telematics-hw")) {
      updates.selectedAddons = [...config.selectedAddons, "telematics-hw"];
    }
    onChange(updates);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground">Configure Specifications</h2>
        <p className="text-muted-foreground mt-1">Customize {model.name} to match your operational needs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left panel – controls */}
        <div className="lg:col-span-3 space-y-6">
          {/* Environment */}
          <fieldset className="rounded-lg border border-border p-5 bg-card">
            <Label className="text-sm font-semibold text-foreground mb-3 block">Operating Environment</Label>
            <div className="flex gap-3">
              {(["Indoor", "Outdoor"] as const).map((env) => (
                <button
                  key={env}
                  onClick={() => handleEnvironmentChange(env)}
                  className={`flex-1 py-2.5 px-4 rounded-md border text-sm font-medium transition-colors
                    ${config.environment === env
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                >
                  {env}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Lift Capacity */}
          <fieldset className="rounded-lg border border-border p-5 bg-card">
            <Label className="text-sm font-semibold text-foreground mb-3 block">
              Lift Capacity
            </Label>
            <div className="flex flex-wrap gap-2">
              {availableCapacities.map((cap) => (
                <button
                  key={cap}
                  onClick={() => handleCapacityChange(cap)}
                  className={`py-2 px-4 rounded-md border text-sm font-medium transition-colors
                    ${config.capacity === cap
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                >
                  {cap.toLocaleString()} lb
                </button>
              ))}
            </div>
          </fieldset>

          {/* Power Type */}
          <fieldset className="rounded-lg border border-border p-5 bg-card">
            <Label className="text-sm font-semibold text-foreground mb-3 block">Power Type</Label>
            <div className="flex flex-wrap gap-2">
              {powerTypes.map((pt) => {
                const disabled =
                  (pt.value === "Electric" && isElectricDisabled) ||
                  (pt.value === "Diesel" && isDieselDisabled);
                return (
                  <button
                    key={pt.value}
                    onClick={() => !disabled && onChange({ powerType: pt.value })}
                    disabled={disabled}
                    className={`py-2 px-4 rounded-md border text-sm font-medium transition-colors
                      ${disabled ? "opacity-40 cursor-not-allowed border-border text-muted-foreground" : ""}
                      ${!disabled && config.powerType === pt.value
                        ? "border-primary bg-primary/5 text-primary"
                        : !disabled
                        ? "border-border text-muted-foreground hover:border-primary/40"
                        : ""
                      }`}
                  >
                    {pt.label}
                    {pt.price > 0 && <span className="ml-1 text-xs">+${pt.price.toLocaleString()}</span>}
                  </button>
                );
              })}
            </div>
            {isElectricDisabled && (
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
                <AlertCircle className="w-3.5 h-3.5" /> Electric unavailable above 6,000 lb capacity
              </p>
            )}
            {isDieselDisabled && (
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
                <AlertCircle className="w-3.5 h-3.5" /> Diesel unavailable for indoor operation
              </p>
            )}
          </fieldset>

          {/* Mast Height */}
          <fieldset className="rounded-lg border border-border p-5 bg-card">
            <Label className="text-sm font-semibold text-foreground mb-3 block">Mast Height</Label>
            <div className="flex flex-wrap gap-2">
              {mastHeights.map((mh) => (
                <button
                  key={mh.value}
                  onClick={() => onChange({ mastHeight: mh })}
                  className={`py-2 px-4 rounded-md border text-sm font-medium transition-colors
                    ${config.mastHeight.value === mh.value
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                >
                  {mh.label}
                  {mh.price > 0 && <span className="ml-1 text-xs">+${mh.price.toLocaleString()}</span>}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Tire Type */}
          <fieldset className="rounded-lg border border-border p-5 bg-card">
            <Label className="text-sm font-semibold text-foreground mb-3 block">Tire Type</Label>
            <div className="flex flex-wrap gap-2">
              {tireTypes.map((tt) => (
                <button
                  key={tt.value}
                  onClick={() => onChange({ tireType: tt.value })}
                  className={`py-2 px-4 rounded-md border text-sm font-medium transition-colors
                    ${config.tireType === tt.value
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                >
                  {tt.label}
                  {tt.price > 0 && <span className="ml-1 text-xs">+${tt.price.toLocaleString()}</span>}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Display Package */}
          <fieldset className="rounded-lg border border-border p-5 bg-card">
            <Label className="text-sm font-semibold text-foreground mb-3 block">Operator Display Package</Label>
            <div className="space-y-2">
              {displayPackages.map((dp) => (
                <button
                  key={dp.value}
                  onClick={() => handleDisplayChange(dp.value)}
                  className={`w-full text-left py-3 px-4 rounded-md border transition-colors
                    ${config.displayPackage === dp.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-medium ${config.displayPackage === dp.value ? "text-primary" : "text-foreground"}`}>
                      {dp.label}
                    </span>
                    {dp.price > 0 && (
                      <span className="text-xs text-muted-foreground">+${dp.price.toLocaleString()}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{dp.description}</p>
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Right panel – visual + price */}
        <div className="lg:col-span-2">
          <div className="sticky top-8 space-y-6">
            <div className="rounded-lg border border-border bg-card p-6">
              <img src={forkliftImage} alt={model.name} className="w-full h-auto mb-4" />
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{model.series}</p>
                <h3 className="text-lg font-bold text-foreground">{model.name}</h3>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-5 space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Configuration Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Capacity</span>
                  <span className="font-medium">{config.capacity.toLocaleString()} lb</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Power</span>
                  <span className="font-medium">{config.powerType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mast</span>
                  <span className="font-medium">{config.mastHeight.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tires</span>
                  <span className="font-medium">{config.tireType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Display</span>
                  <span className="font-medium">{config.displayPackage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Environment</span>
                  <Badge variant="secondary" className="text-xs">{config.environment}</Badge>
                </div>
              </div>
              <div className="pt-3 border-t border-border">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-muted-foreground">Unit Price</span>
                  <span className="text-2xl font-bold text-foreground">${unitPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
