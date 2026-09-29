import React, { useState } from 'react';
import { ShieldCheck, Award, FileText, CheckCircle2, X } from 'lucide-react';

interface QualityBadgeProps {
  mode: 'self-declared' | 'certified';
  certificateId?: string | null;
  evidencePhotoUrl?: string | null;
  grade?: string | null;
  compact?: boolean;
  cropName?: string;
}

export const QualityBadge: React.FC<QualityBadgeProps> = ({
  mode,
  certificateId,
  evidencePhotoUrl,
  grade,
  compact = false,
  cropName = 'Produce'
}) => {
  const [showModal, setShowModal] = useState(false);
  const isCertified = mode === 'certified';

  if (compact) {
    if (isCertified) {
      return (
        <span
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs cursor-pointer hover:bg-emerald-100 transition-colors"
          title="Certified under AGMARK visual assaying standards"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>AGMARK Certified</span>
        </span>
      );
    }

    return (
      <span
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200 cursor-pointer hover:bg-amber-100 transition-colors"
        title="Quality self-declared by the farmer"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
        <span>Self-Declared</span>
      </span>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2">
        {isCertified ? (
          <div
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs cursor-pointer hover:border-emerald-400 transition"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold">AGMARK Certified</span>
              {certificateId && (
                <span className="ml-1.5 opacity-75 font-mono text-[11px]">{certificateId}</span>
              )}
            </div>
          </div>
        ) : (
          <div
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-forest-50 text-forest-800 border border-forest-200 cursor-pointer hover:border-forest-300 transition"
          >
            <FileText className="w-3.5 h-3.5 text-forest-600 shrink-0" />
            <span>Self-Declared Quality</span>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-forest-100 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-ink/40 hover:text-ink transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isCertified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {isCertified ? <Award className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="font-display font-bold text-forest-900 text-lg">
                  {isCertified ? 'AGMARK Certified Assaying' : 'Self-Declared Quality Report'}
                </h3>
                <p className="text-xs text-ink/50">
                  {isCertified ? 'Official e-NAM Assaying Protocol' : 'Farmer self-assessment'}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-ink/80 bg-forest-50/50 p-4 rounded-xl border border-forest-100">
              <div className="flex justify-between items-center">
                <span className="text-xs text-ink/55">Crop:</span>
                <span className="font-semibold text-forest-900">{cropName}</span>
              </div>
              {grade && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-ink/55">Grading Standard:</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-xs">{grade}</span>
                </div>
              )}
              {isCertified && certificateId && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-ink/55">Certificate ID:</span>
                  <span className="font-mono text-xs font-bold text-forest-800">{certificateId}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-xs text-ink/55">Verification Node:</span>
                <span className="font-medium text-xs">Nashik Central Digital Assaying Facility</span>
              </div>
            </div>

            {evidencePhotoUrl && (
              <div className="mt-4">
                <p className="text-xs font-semibold text-ink/60 mb-1.5">Inspected Sample Lot:</p>
                <img
                  src={evidencePhotoUrl}
                  alt={cropName}
                  className="w-full h-40 object-cover rounded-xl border border-forest-100"
                />
              </div>
            )}

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="btn-primary text-sm w-full"
              >
                Close Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
