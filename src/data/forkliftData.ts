export interface ForkliftModel {
  id: string;
  name: string;
  series: string;
  capacityRange: string;
  capacityMin: number;
  capacityMax: number;
  environment: string[];
  basePrice: number;
  description: string;
}

export const forkliftModels: ForkliftModel[] = [
  {
    id: "cx-3000",
    name: "CX-3000",
    series: "Compact Series",
    capacityRange: "3,000 – 5,000 lb",
    capacityMin: 3000,
    capacityMax: 5000,
    environment: ["Indoor", "Outdoor"],
    basePrice: 28500,
    description: "Versatile compact forklift ideal for warehouse aisles and dock operations. Low maintenance, high maneuverability.",
  },
  {
    id: "hx-6000",
    name: "HX-6000",
    series: "Heavy Duty Series",
    capacityRange: "5,000 – 8,000 lb",
    capacityMin: 5000,
    capacityMax: 8000,
    environment: ["Indoor", "Outdoor"],
    basePrice: 42000,
    description: "High-performance unit for demanding logistics environments. Built for continuous multi-shift operation.",
  },
  {
    id: "mx-10000",
    name: "MX-10000",
    series: "Max Capacity Series",
    capacityRange: "8,000 – 12,000 lb",
    capacityMin: 8000,
    capacityMax: 12000,
    environment: ["Outdoor"],
    basePrice: 61000,
    description: "Maximum capacity for heavy industrial loads. Reinforced chassis, advanced hydraulics, all-terrain capability.",
  },
];

export const capacityOptions = [3000, 4000, 5000, 6000, 7000, 8000, 10000, 12000];

export const mastHeights = [
  { label: "Standard – 188\"", value: 188, price: 0 },
  { label: "Extended – 216\"", value: 216, price: 2200 },
  { label: "Triple Stage – 240\"", value: 240, price: 4800 },
];

export type PowerType = "Electric" | "LPG" | "Diesel";
export const powerTypes: { label: string; value: PowerType; price: number }[] = [
  { label: "Electric", value: "Electric", price: 3500 },
  { label: "LPG", value: "LPG", price: 0 },
  { label: "Diesel", value: "Diesel", price: 1200 },
];

export type TireType = "Cushion" | "Pneumatic" | "Solid Pneumatic";
export const tireTypes: { label: string; value: TireType; price: number }[] = [
  { label: "Cushion", value: "Cushion", price: 0 },
  { label: "Pneumatic", value: "Pneumatic", price: 800 },
  { label: "Solid Pneumatic", value: "Solid Pneumatic", price: 1400 },
];

export type DisplayPackage = "Standard" | "Enhanced" | "Advanced";
export const displayPackages: { label: string; value: DisplayPackage; price: number; description: string }[] = [
  { label: "Standard Display", value: "Standard", price: 0, description: "Basic operational gauges and indicators" },
  { label: "Enhanced Display", value: "Enhanced", price: 1200, description: "LCD screen with diagnostics and hour meter" },
  { label: "Advanced Display", value: "Advanced", price: 2800, description: "Full color touchscreen with fleet integration. Includes Telematics hardware." },
];

export interface Addon {
  id: string;
  name: string;
  description: string;
  oneTimePrice: number;
  monthlyPrice: number;
  tag?: string;
}

export const addons: Addon[] = [
  {
    id: "telematics-hw",
    name: "Telematics Hardware",
    description: "GPS tracking, impact detection, and usage monitoring hardware module.",
    oneTimePrice: 1800,
    monthlyPrice: 0,
  },
  {
    id: "telematics-sub",
    name: "Telematics Subscription",
    description: "Cloud dashboard, real-time alerts, utilization reports, and fleet analytics.",
    oneTimePrice: 0,
    monthlyPrice: 89,
    tag: "Recurring",
  },
  {
    id: "extended-warranty",
    name: "Extended Warranty",
    description: "5-year comprehensive warranty covering powertrain, hydraulics, and electronics.",
    oneTimePrice: 3200,
    monthlyPrice: 0,
  },
  {
    id: "maintenance-plan",
    name: "Preventive Maintenance Plan",
    description: "Scheduled maintenance visits, fluid analysis, and priority parts availability.",
    oneTimePrice: 0,
    monthlyPrice: 149,
    tag: "Recurring",
  },
];

export const fleetDiscounts = [
  { min: 1, max: 2, discount: 0, label: "Standard pricing" },
  { min: 3, max: 5, discount: 0.03, label: "3% fleet discount" },
  { min: 6, max: 10, discount: 0.06, label: "6% fleet discount" },
  { min: 11, max: 15, discount: 0.08, label: "8% fleet discount" },
  { min: 16, max: 20, discount: 0.12, label: "12% volume discount" },
];

export function getFleetDiscount(qty: number) {
  return fleetDiscounts.find((d) => qty >= d.min && qty <= d.max) || fleetDiscounts[0];
}

export interface ConfigState {
  step: number;
  selectedModel: ForkliftModel | null;
  capacity: number;
  mastHeight: typeof mastHeights[number];
  powerType: PowerType;
  tireType: TireType;
  displayPackage: DisplayPackage;
  environment: "Indoor" | "Outdoor";
  selectedAddons: string[];
  quantity: number;
}

export const initialConfig: ConfigState = {
  step: 0,
  selectedModel: null,
  capacity: 5000,
  mastHeight: mastHeights[0],
  powerType: "LPG",
  tireType: "Cushion",
  displayPackage: "Standard",
  environment: "Indoor",
  selectedAddons: [],
  quantity: 1,
};

export function calculateUnitPrice(config: ConfigState): number {
  if (!config.selectedModel) return 0;
  const base = config.selectedModel.basePrice;
  const capacityUpcharge = Math.max(0, (config.capacity - config.selectedModel.capacityMin) / 1000) * 1800;
  const mast = config.mastHeight.price;
  const power = powerTypes.find((p) => p.value === config.powerType)?.price || 0;
  const tire = tireTypes.find((t) => t.value === config.tireType)?.price || 0;
  const display = displayPackages.find((d) => d.value === config.displayPackage)?.price || 0;
  const addonOneTime = addons
    .filter((a) => config.selectedAddons.includes(a.id))
    .reduce((sum, a) => sum + a.oneTimePrice, 0);
  return base + capacityUpcharge + mast + power + tire + display + addonOneTime;
}

export function calculateMonthlyRecurring(config: ConfigState): number {
  return addons
    .filter((a) => config.selectedAddons.includes(a.id))
    .reduce((sum, a) => sum + a.monthlyPrice, 0);
}
