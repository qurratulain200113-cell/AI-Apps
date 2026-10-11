import React from 'react';
import { Smartphone, Download, Check } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  onOpenGuide: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ onOpenGuide }) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();

  // If already installed and running standalone
  if (isInstalled) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-md">
        <Check className="w-3.5 h-3.5 text-emerald-600" />
        <span>App Installed</span>
      </span>
    );
  }

  const handleClick = async () => {
    if (isInstallable) {
      const installed = await install();
      if (!installed) {
        onOpenGuide();
      }
    } else {
      onOpenGuide();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-md transition-colors shadow-xs"
      title="Install as Android App or view APK setup guide"
    >
      <Smartphone className="w-3.5 h-3.5" />
      <span>{isInstallable ? 'Install App' : 'Get Mobile App / APK'}</span>
    </button>
  );
};
