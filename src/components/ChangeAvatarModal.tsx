import React, { useState } from 'react';
import { X, Camera, Upload, Link, Check, Sparkles, Image as ImageIcon } from 'lucide-react';

interface ChangeAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar: string;
  memberName: string;
  onSaveAvatar: (newAvatarUrl: string) => void;
}

const PRESET_AVATARS = [
  {
    label: 'Corporate Executive 1',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Senior Partner 2',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Wealth Advisor 3',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Business Director 4',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Managing Consultant 5',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Guild Leader 6',
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Investment Associate 7',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Senior Strategist 8',
    url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
  },
];

export const ChangeAvatarModal: React.FC<ChangeAvatarModalProps> = ({
  isOpen,
  onClose,
  currentAvatar,
  memberName,
  onSaveAvatar,
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);
  const [customUrl, setCustomUrl] = useState('');
  const [tab, setTab] = useState<'presets' | 'upload' | 'url'>('presets');
  const [uploadError, setUploadError] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPEG, PNG, WebP, etc.).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSelectedAvatar(reader.result);
      }
    };
    reader.onerror = () => {
      setUploadError('Failed to read image file. Please try another image.');
    };
    reader.readAsDataURL(file);
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim()) {
      setSelectedAvatar(customUrl.trim());
    }
  };

  const handleSave = () => {
    onSaveAvatar(selectedAvatar);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Update Profile Picture</h2>
              <p className="text-xs text-slate-400">{memberName}'s Account Avatar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 text-xs">
          {/* Avatar Preview */}
          <div className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="relative">
              <img
                src={selectedAvatar}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border-4 border-cyan-400 shadow-lg"
              />
              <span className="absolute bottom-0 right-0 p-1.5 bg-slate-900 text-cyan-400 rounded-full border border-slate-700 shadow">
                <Camera className="w-3.5 h-3.5" />
              </span>
            </div>
            <p className="font-bold text-slate-900 mt-2 text-sm">{memberName}</p>
            <p className="text-[11px] text-slate-500">Live Preview of your portal avatar</p>
          </div>

          {/* Source Tabs */}
          <div className="grid grid-cols-3 gap-2 border-b border-slate-200 pb-2">
            <button
              type="button"
              onClick={() => setTab('presets')}
              className={`py-2 px-3 rounded-xl font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                tab === 'presets'
                  ? 'bg-slate-900 text-amber-400 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Presets</span>
            </button>

            <button
              type="button"
              onClick={() => setTab('upload')}
              className={`py-2 px-3 rounded-xl font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                tab === 'upload'
                  ? 'bg-slate-900 text-cyan-400 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload File</span>
            </button>

            <button
              type="button"
              onClick={() => setTab('url')}
              className={`py-2 px-3 rounded-xl font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                tab === 'url'
                  ? 'bg-slate-900 text-cyan-400 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Link className="w-3.5 h-3.5" />
              <span>Image URL</span>
            </button>
          </div>

          {/* TAB 1: PRESETS */}
          {tab === 'presets' && (
            <div className="space-y-3">
              <p className="text-slate-500 text-[11px]">
                Select from our curated gallery of high-resolution executive portraits:
              </p>
              <div className="grid grid-cols-4 gap-3">
                {PRESET_AVATARS.map((item, idx) => {
                  const isChosen = selectedAvatar === item.url;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedAvatar(item.url)}
                      className={`relative rounded-2xl overflow-hidden aspect-square border-2 transition-all group ${
                        isChosen
                          ? 'border-cyan-500 ring-2 ring-cyan-500/30 scale-95 shadow-md'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img
                        src={item.url}
                        alt={item.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      {isChosen && (
                        <div className="absolute inset-0 bg-cyan-950/40 flex items-center justify-center text-white">
                          <Check className="w-5 h-5 drop-shadow" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: UPLOAD FILE */}
          {tab === 'upload' && (
            <div className="space-y-3">
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-cyan-500 transition-colors bg-slate-50">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="font-bold text-slate-700">Choose a photo from your computer or phone</p>
                <p className="text-[11px] text-slate-400 mt-1">PNG, JPG, WebP up to 5MB</p>
                <label className="mt-4 inline-block px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold cursor-pointer transition-colors shadow-sm">
                  <span>Browse Device Files</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
              {uploadError && (
                <p className="text-xs text-red-600 font-semibold">{uploadError}</p>
              )}
            </div>
          )}

          {/* TAB 3: IMAGE URL */}
          {tab === 'url' && (
            <form onSubmit={handleApplyCustomUrl} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Paste Direct Web Image Address (URL)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/my-photo.jpg"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors"
              >
                Apply URL Preview
              </button>
            </form>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold shadow-md flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Profile Picture</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
