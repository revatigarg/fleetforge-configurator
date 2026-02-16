import { useState, useCallback } from "react";
import { ConfigState, initialConfig, ForkliftModel } from "@/data/forkliftData";
import { StepIndicator } from "@/components/configurator/StepIndicator";
import { StepSelectModel } from "@/components/configurator/StepSelectModel";
import { StepSpecifications } from "@/components/configurator/StepSpecifications";
import { StepAddons } from "@/components/configurator/StepAddons";
import { StepFleetPricing } from "@/components/configurator/StepFleetPricing";
import { StepSummary } from "@/components/configurator/StepSummary";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const STEPS = ["Base Model", "Specifications", "Add-ons", "Fleet & Pricing", "Summary"];

const Index = () => {
  const [config, setConfig] = useState<ConfigState>(initialConfig);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const updateConfig = useCallback((updates: Partial<ConfigState>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const goToStep = (step: number) => {
    setConfig((prev) => ({ ...prev, step }));
  };

  const nextStep = () => {
    setCompletedSteps((prev) => (prev.includes(config.step) ? prev : [...prev, config.step]));
    goToStep(config.step + 1);
  };

  const prevStep = () => goToStep(Math.max(0, config.step - 1));

  const selectModel = (model: ForkliftModel) => {
    updateConfig({
      selectedModel: model,
      capacity: model.capacityMin,
    });
  };

  const canProceed = () => {
    if (config.step === 0) return config.selectedModel !== null;
    return true;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">Fleet Configurator</h1>
            <p className="text-xs text-muted-foreground">Industrial Forklift Solutions</p>
          </div>
          {config.selectedModel && (
            <div className="text-right hidden sm:block">
              <p className="text-xs text-muted-foreground">Configuring</p>
              <p className="text-sm font-semibold text-foreground">{config.selectedModel.name}</p>
            </div>
          )}
        </div>
      </header>

      {/* Step indicator */}
      <div className="border-b border-border bg-card/50 px-6">
        <StepIndicator
          steps={STEPS}
          currentStep={config.step}
          onStepClick={goToStep}
          completedSteps={completedSteps}
        />
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {config.step === 0 && (
          <StepSelectModel selectedModel={config.selectedModel} onSelect={selectModel} />
        )}
        {config.step === 1 && (
          <StepSpecifications config={config} onChange={updateConfig} />
        )}
        {config.step === 2 && (
          <StepAddons config={config} onChange={updateConfig} />
        )}
        {config.step === 3 && (
          <StepFleetPricing config={config} onChange={updateConfig} />
        )}
        {config.step === 4 && (
          <StepSummary config={config} onEdit={goToStep} />
        )}
      </main>

      {/* Footer navigation */}
      <div className="border-t border-border bg-card sticky bottom-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={config.step === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>

          {config.step < STEPS.length - 1 && (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="gap-2"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
