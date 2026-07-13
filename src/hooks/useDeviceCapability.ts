'use client';

import { useState, useEffect } from 'react';

interface DeviceCapability {
  isLowEnd: boolean;
  particleCount: number;
}

const SSR_DEFAULT: DeviceCapability = {
  isLowEnd: false,
  particleCount: 0,
};

export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>(SSR_DEFAULT);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 4;
    const isMobile = window.innerWidth < 768;
    const isLowEnd = cores < 4;

    let particleCount: number;

    if (isMobile) {
      particleCount = 0; // gradient fallback on mobile
    } else if (isLowEnd) {
      particleCount = 800;
    } else {
      particleCount = 2000;
    }

    setCapability({ isLowEnd, particleCount });
  }, []);

  return capability;
}
