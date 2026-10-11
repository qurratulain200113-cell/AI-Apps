import React, { useState } from 'react';
import {
  X,
  Smartphone,
  Download,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Info,
} from 'lucide-react';

interface AndroidInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  appUrl: string;
}

export const AndroidInstallModal: React.FC<AndroidInstallModalProps> = ({
  isOpen,
  onClose,
  appUrl,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Install as Android App &amp; APK Guide
              </h2>
              <p className="text-xs text-slate-500">
                Install directly on your phone or generate a standalone APK package
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-6 text-xs text-slate-600 leading-relaxed">
          {/* Direct Solution: Standalone Offline App */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-900 text-white">
                Best Method: No Server or APK Needed
              </span>
              <span className="text-xs font-bold text-blue-950">
                100% Guaranteed to Work Offline
              </span>
            </div>
            <p className="text-blue-950 font-medium mb-3">
              You do not need to build an APK or deal with server links. The entire application is self-contained in a single offline file:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-slate-700 bg-white p-3.5 rounded-lg border border-blue-100">
              <li>
                Click the <strong>&quot;Download .html&quot;</strong> button in the top navigation bar to save <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-900 font-mono">employee-performance-calculator.html</code> to your device.
              </li>
              <li>
                <strong>On Computer:</strong> Double-click the file to open and use it immediately in Chrome, Edge, or Safari.
              </li>
              <li>
                <strong>On Android Phone:</strong> Send the file to your phone (via WhatsApp, Google Drive, or Email), open it in Google Chrome, then tap the Chrome menu (<strong className="font-mono">⋮</strong>) $\rightarrow$ <strong>&quot;Add to Home Screen&quot;</strong>. It will install as an app on your phone with zero setup!
              </li>
            </ol>
          </div>

          {/* Explanation for 404 / PWABuilder Error */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-700 text-white">
                Why PWABuilder gave &quot;Page not found / No Manifest&quot;
              </span>
            </div>
            <p className="text-amber-950 font-medium mb-2">
              The development preview link is inside a private AI Studio development sandbox. External services like PWABuilder cannot access private preview links from the outside.
            </p>
            <p className="text-slate-700 leading-relaxed">
              If you want to use PWABuilder to compile an APK:
            </p>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-700 mt-2 bg-white p-3 rounded-lg border border-amber-100">
              <li>Click <strong>&quot;Share&quot;</strong> in the Google AI Studio top bar to publish the app.</li>
              <li>Once published, the public link becomes active and reachable on the open web.</li>
              <li>Then you can paste that public link into PWABuilder to generate an APK.</li>
            </ol>
          </div>

          {/* Advantages */}
          <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 space-y-2">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Privacy &amp; Security Advantages:
            </div>
            <ul className="text-[11px] text-slate-600 space-y-1 pl-4 list-disc">
              <li><strong>100% Local Data:</strong> All employee evaluations and calculations run securely in your device browser.</li>
              <li><strong>No Installation Hassle:</strong> No need to allow unknown APK sources or bypass Android security warnings.</li>
              <li><strong>Zero Dependencies:</strong> Requires no server, no subscriptions, and works forever without internet.</li>
            </ul>
          </div>
        </div>


        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied!' : 'Copy Mobile Link'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-950 rounded-lg transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
