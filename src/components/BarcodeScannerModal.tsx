import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  X, 
  RefreshCw, 
  Check, 
  Zap, 
  Volume2, 
  VolumeX, 
  AlertCircle, 
  ShoppingBag,
  Sparkles,
  Barcode as BarcodeIcon,
  Plus,
  Minus,
  CheckCircle2
} from 'lucide-react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { Product } from '../types';
import { formatIDR } from '../data/mockData';
import confetti from 'canvas-confetti';

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onProductScanned: (product: Product, quantity?: number) => void;
}

// Web Audio API Beep Generator
const playScanBeep = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, ctx.currentTime); // B5 tone
    osc.frequency.exponentialRampToValueAtTime(1975.53, ctx.currentTime + 0.08); // B6 tone

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (err) {
    console.warn('Audio feedback failed:', err);
  }
};

export const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({
  isOpen,
  onClose,
  products,
  onProductScanned
}) => {
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [continuousMode, setContinuousMode] = useState<boolean>(true);
  const [manualCode, setManualCode] = useState<string>('');
  
  // Last scanned item notification
  const [lastScanned, setLastScanned] = useState<{
    product: Product;
    timestamp: number;
    count: number;
  } | null>(null);

  // Scanned items in current session
  const [sessionScanned, setSessionScanned] = useState<Array<{ product: Product; qty: number }>>([]);

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isScanningRef = useRef<boolean>(false);
  const lastScanTimeRef = useRef<number>(0);

  // Cleanup scanner on unmount or close
  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        if (scannerRef.current.isScanning) {
          await scannerRef.current.stop();
        }
        scannerRef.current.clear();
      } catch (err) {
        console.warn('Error stopping scanner:', err);
      }
      scannerRef.current = null;
    }
    setCameraActive(false);
    isScanningRef.current = false;
  };

  const startScanner = async () => {
    setCameraError(null);
    try {
      await stopScanner();
      
      const element = document.getElementById('camera-reader-box');
      if (!element) return;

      const html5QrCode = new Html5Qrcode('camera-reader-box', {
        formatsToSupport: [
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.EAN_8,
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.CODE_39,
          Html5QrcodeSupportedFormats.QR_CODE,
          Html5QrcodeSupportedFormats.UPC_A,
          Html5QrcodeSupportedFormats.UPC_E
        ],
        verbose: false
      });

      scannerRef.current = html5QrCode;

      const config = {
        fps: 15,
        qrbox: { width: 260, height: 200 },
        aspectRatio: 1.333
      };

      await html5QrCode.start(
        { facingMode: facingMode },
        config,
        (decodedText) => {
          handleBarcodeDetected(decodedText);
        },
        () => {
          // ignore scan frame errors
        }
      );

      setCameraActive(true);
      isScanningRef.current = true;
    } catch (err: unknown) {
      console.error('Camera start error:', err);
      const errMsg = err instanceof Error ? err.message : String(err);
      if (errMsg.includes('NotAllowedError') || errMsg.includes('Permission')) {
        setCameraError('Izin akses kamera ditolak. Silakan izinkan akses kamera di browser Anda.');
      } else if (errMsg.includes('NotFoundError')) {
        setCameraError('Kamera tidak ditemukan di perangkat ini.');
      } else {
        setCameraError('Tidak dapat memulai kamera. Anda dapat menggunakan input SKU cepat di bawah.');
      }
      setCameraActive(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setSessionScanned([]);
      setLastScanned(null);
      // Small timeout to allow DOM element to render
      const timer = setTimeout(() => {
        startScanner();
      }, 250);
      return () => {
        clearTimeout(timer);
        stopScanner();
      };
    } else {
      stopScanner();
    }
  }, [isOpen, facingMode]);

  // Handle scanned barcode text
  const handleBarcodeDetected = (code: string) => {
    const now = Date.now();
    // Debounce scan within 1.2s to prevent multiple accidental trigger for the same barcode
    if (now - lastScanTimeRef.current < 1200) {
      return;
    }
    lastScanTimeRef.current = now;

    const trimmed = code.trim().toLowerCase();
    
    // Find matching product by SKU, ID, or partial SKU
    const matched = products.find(
      (p) =>
        p.sku.toLowerCase() === trimmed ||
        p.id.toLowerCase() === trimmed ||
        trimmed.includes(p.sku.toLowerCase()) ||
        p.sku.toLowerCase().replace(/[^a-z0-9]/g, '') === trimmed.replace(/[^a-z0-9]/g, '')
    );

    if (matched) {
      if (matched.stock <= 0) {
        alert(`Produk "${matched.name}" sedang habis stok.`);
        return;
      }

      if (soundEnabled) {
        playScanBeep();
      }

      // Confetti flash
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.6 },
        colors: ['#805062', '#fec1d6', '#ffd9e4', '#e29578']
      });

      onProductScanned(matched, 1);

      setLastScanned((prev) => ({
        product: matched,
        timestamp: Date.now(),
        count: prev?.product.id === matched.id ? prev.count + 1 : 1
      }));

      setSessionScanned((prev) => {
        const exist = prev.find((item) => item.product.id === matched.id);
        if (exist) {
          return prev.map((item) =>
            item.product.id === matched.id ? { ...item, qty: item.qty + 1 } : item
          );
        }
        return [{ product: matched, qty: 1 }, ...prev];
      });

      if (!continuousMode) {
        onClose();
      }
    } else {
      // Unrecognized barcode feedback
      setCameraError(`Barcode / SKU "${code}" tidak cocok dengan katalog produk.`);
      setTimeout(() => setCameraError(null), 3000);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    handleBarcodeDetected(manualCode.trim());
    setManualCode('');
  };

  const handleQuickSampleScan = (product: Product) => {
    handleBarcodeDetected(product.sku);
  };

  if (!isOpen) return null;

  return (
    <div
      id="barcode-scanner-modal-backdrop"
      className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div
        id="barcode-scanner-card"
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-white/20 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#FBF9F8] border-b border-[#EEEEEE] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#805062] to-[#b37089] text-white flex items-center justify-center shadow-md shadow-[#805062]/20">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-[#1b1c1c]">Pemindai Barcode Skincare</h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live Kamera
                </span>
              </div>
              <p className="text-xs text-[#7e7576]">
                Arahkan kamera ke barcode/SKU pada kemasan skincare
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Matikan Suara Beep' : 'Aktifkan Suara Beep'}
              className={`p-2 rounded-xl text-xs font-semibold transition-colors ${
                soundEnabled ? 'text-[#805062] bg-[#ffd9e4]/60' : 'text-gray-400 hover:bg-gray-100'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body with Viewfinder */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Viewfinder Container */}
          <div className="relative rounded-2xl overflow-hidden bg-black aspect-4/3 sm:aspect-16/10 flex items-center justify-center border-2 border-[#805062]/40 shadow-inner">
            {/* HTML5 QR/Barcode Video Stream Mount */}
            <div id="camera-reader-box" className="w-full h-full object-cover"></div>

            {/* Target Laser Overlay Animation */}
            {cameraActive && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {/* Aiming Corner Brackets */}
                <div className="relative w-64 h-48 sm:w-72 sm:h-52 border-2 border-dashed border-[#fec1d6]/60 rounded-2xl flex items-center justify-center">
                  <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-[#805062] rounded-tl-lg"></div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-[#805062] rounded-tr-lg"></div>
                  <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-[#805062] rounded-bl-lg"></div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-[#805062] rounded-br-lg"></div>

                  {/* Red Laser Scan Line */}
                  <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-rose-500 to-transparent shadow-[0_0_8px_#f43f5e] animate-bounce duration-1000"></div>
                </div>

                <div className="absolute bottom-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-amber-400 animate-pulse" />
                  <span>Scanning aktif &bull; Dekatkan barcode ke garis merah</span>
                </div>
              </div>
            )}

            {/* Error or No Camera Fallback Overlay */}
            {cameraError && (
              <div className="absolute inset-0 bg-gray-900/90 p-4 flex flex-col items-center justify-center text-center text-white z-20">
                <AlertCircle className="w-10 h-10 text-amber-400 mb-2" />
                <p className="font-semibold text-sm max-w-sm mb-3">{cameraError}</p>
                <button
                  onClick={startScanner}
                  className="px-4 py-2 bg-[#805062] hover:bg-[#6b3f50] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Coba Lagi Kamera</span>
                </button>
              </div>
            )}

            {/* Camera Switch Control */}
            <div className="absolute top-3 right-3 z-20 flex gap-2">
              <button
                onClick={() =>
                  setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'))
                }
                title="Ganti Kamera Depan/Belakang"
                className="p-2 rounded-xl bg-black/50 hover:bg-black/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {facingMode === 'environment' ? 'Kamera Belakang' : 'Kamera Depan'}
                </span>
              </button>
            </div>
          </div>

          {/* Flash Feedback Banner when Product Scanned */}
          {lastScanned && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-rose-50 border border-emerald-200 flex items-center justify-between animate-in slide-in-from-top-2 duration-200 shadow-xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-white p-1 border border-emerald-200 shrink-0 overflow-hidden">
                  <img
                    src={lastScanned.product.image}
                    alt={lastScanned.product.name}
                    className="w-full h-full object-cover rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      ✓ Masuk Keranjang
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">
                      {lastScanned.product.sku}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                    {lastScanned.product.name}
                  </h4>
                  <p className="text-xs font-semibold text-[#805062]">
                    {formatIDR(lastScanned.product.price)}
                  </p>
                </div>
              </div>
              <div className="shrink-0 text-right pl-2">
                <span className="text-xs font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs">
                  +{lastScanned.count} item
                </span>
              </div>
            </div>
          )}

          {/* Manual Barcode / SKU Input Form */}
          <form onSubmit={handleManualSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <BarcodeIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="manual-barcode-input"
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="Ketik SKU / Barcode manual (contoh: LIP-BEST-01, BDL-LIP-01)..."
                className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-[#cfc4c5] rounded-xl text-xs sm:text-sm text-[#1b1c1c] focus:outline-none focus:border-[#805062] focus:bg-white transition-all font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#805062] hover:bg-[#6b3f50] text-white rounded-xl text-xs font-bold transition-colors shrink-0 shadow-xs cursor-pointer"
            >
              Input
            </button>
          </form>

          {/* Quick Simulation Barcode Chips */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#805062]" />
                Simulasi Scan Cepat (Pilih Barcode Skincare)
              </span>
              <span className="text-[10px] text-gray-400">Klik untuk langsung scan</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 pt-1 noscrollbar">
              {products.slice(0, 8).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleQuickSampleScan(p)}
                  className="px-2.5 py-1.5 bg-white border border-[#cfc4c5] hover:border-[#805062] hover:bg-[#ffd9e4]/30 rounded-xl text-left shrink-0 transition-all flex items-center gap-2 group shadow-2xs cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-[#805062] group-hover:text-[#6b3f50]">
                      {p.sku}
                    </div>
                    <div className="text-[11px] font-semibold text-gray-800 max-w-[120px] truncate">
                      {p.name.replace(/(\(.*?\))/g, '')}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Scanned Items in Session */}
          {sessionScanned.length > 0 && (
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-700">
                  Item Terpindai Sesi Ini ({sessionScanned.reduce((s, i) => s + i.qty, 0)} pcs):
                </span>
              </div>
              <div className="max-h-28 overflow-y-auto space-y-1.5 pr-1">
                {sessionScanned.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-xs p-2 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-medium text-gray-900 truncate">{item.product.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-bold text-gray-700">{item.qty}x</span>
                      <span className="font-bold text-[#805062]">
                        {formatIDR(item.product.price * item.qty)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#FBF9F8] border-t border-[#EEEEEE] flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
            <input
              type="checkbox"
              checked={continuousMode}
              onChange={(e) => setContinuousMode(e.target.checked)}
              className="rounded text-[#805062] focus:ring-[#805062]"
            />
            <span>Mode Pindai Berkelanjutan (Multi-scan)</span>
          </label>

          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#805062] hover:bg-[#6b3f50] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-[#805062]/20 flex items-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Selesai & Ke Keranjang</span>
          </button>
        </div>
      </div>
    </div>
  );
};
