"use client";

import { GlobeIcon } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setLanguage(language === "en" ? "yo" : "en")}
          className="relative"
          aria-label={
            language === "en" ? "Switch to Yorùbá" : "Switch to English"
          }
        >
          <GlobeIcon className="size-4" />
          <span className="absolute -bottom-0.5 -right-0.5 rounded-full bg-primary px-1 text-[9px] font-bold leading-tight text-primary-foreground">
            {language === "en" ? "EN" : "YO"}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {language === "en" ? "Switch to Yorùbá" : "Switch to English"}
      </TooltipContent>
    </Tooltip>
  );
}
