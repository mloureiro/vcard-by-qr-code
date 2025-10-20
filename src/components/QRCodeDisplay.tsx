import { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';

interface QRCodeDisplayProps {
  data: string;
  size?: number;
}

export function QRCodeDisplay({ data, size = 300 }: QRCodeDisplayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    // Create QR code instance
    const qrCode = new QRCodeStyling({
      width: size,
      height: size,
      data: data,
      margin: 10,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'M',
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 5,
      },
      dotsOptions: {
        type: 'rounded',
        color: '#1f2937',
      },
      backgroundOptions: {
        color: '#ffffff',
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: '#3b82f6',
      },
      cornersDotOptions: {
        type: 'dot',
        color: '#3b82f6',
      },
    });

    // Clear previous QR code if any
    if (ref.current) {
      ref.current.innerHTML = '';
    }

    // Append to DOM
    qrCode.append(ref.current);
    qrCodeRef.current = qrCode;
    setIsReady(true);

    return () => {
      if (ref.current) {
        ref.current.innerHTML = '';
      }
    };
  }, [data, size]);

  const handleDownload = () => {
    if (qrCodeRef.current) {
      qrCodeRef.current.download({
        name: 'qr-code-contact',
        extension: 'png',
      });
    }
  };

  return (
    <div className="space-y-4">
      <div
        ref={ref}
        className="flex items-center justify-center bg-white rounded-lg p-4"
      />

      {isReady && (
        <button
          onClick={handleDownload}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Download QR Code
        </button>
      )}
    </div>
  );
}
