"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { SVGGrid } from "@/app/components/ui/SVGGrid";

interface CombinedLoadingHeroProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
  onLoadStateChange?: (isLoaded: boolean) => void;
  onContainerRefReady?: (ref: React.RefObject<HTMLDivElement | null>) => void;
}

const animationConfig = {
  initial: {
    left: 0,
    top: 0,
    scale: 1,
  },
  final: {
    left: 0,
    top: 0,
    scale: 1,
  },
};

export const CombinedLoadingHero = ({
  scrollContainerRef,
  onLoadStateChange,
  onContainerRefReady,
}: CombinedLoadingHeroProps) => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [parallaxTransform, setParallaxTransform] = useState({ x: 0, y: 0 });

  // Refs for animation targets
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingScreenRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroImageInnerRef = useRef<HTMLImageElement>(null);
  const tedxLogoRef = useRef<HTMLDivElement>(null);
  const colorGroupRef = useRef<SVGGElement>(null);
  const xLogoRef = useRef<HTMLImageElement>(null);
  const loadingScreenInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onContainerRefReady?.(containerRef);
  }, [onContainerRefReady]);

  // Mouse parallax effect
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (typeof window === "undefined") return;

    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Calculate normalized mouse position (-1 to 1)
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;

    // Apply parallax movement (adjust multiplier for intensity)
    const parallaxIntensity = 20;
    setParallaxTransform({
      x: x * parallaxIntensity,
      y: y * parallaxIntensity,
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    const handleLoad = () => {
      setIsPageLoaded(true);
      onLoadStateChange?.(true);
    };

    // Check if page is already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("load", handleLoad);
      }
    };
  }, [onLoadStateChange]);

  useEffect(() => {
    if (!isPageLoaded || !containerRef.current || typeof window === "undefined")
      return;

    const oneHundredVh = window.innerHeight;
    const maxAnimationRange = oneHundredVh * 3; // End of all animations
    let animationId: number | null = null;
    let isAnimating = false;

    const updateAnimations = () => {
      if (!loadingScreenRef.current || !scrollContainerRef?.current) {
        isAnimating = false;
        return;
      }

      const scrollTop = scrollContainerRef.current.scrollTop;

      // Early exit if we're way past all animations (efficiency optimization)
      if (scrollTop > maxAnimationRange) {
        isAnimating = false;
        return;
      }

      // Loading screen animation (0 to 1vh)
      if (scrollTop <= oneHundredVh) {
        const progress = Math.min(scrollTop / oneHundredVh, 1);
        const height = (1 - progress) * 100;

        loadingScreenRef.current.style.height = `${height}vh`;

        // X logo fade animation - faster fade
        if (xLogoRef.current) {
          const xOpacity = 1 - progress * 2.5; // Much faster fade out
          xLogoRef.current.style.opacity = `${Math.max(0, xOpacity)}`;
        }

        // Hero image opacity animation
        if (heroImageRef.current) {
          const imageOpacity = 0.5 + progress * 0.5; // From 0.5 to 1.0
          heroImageRef.current.style.opacity = `${imageOpacity}`;
        }
      }

      // TEDx logo animation (1vh to 2vh)
      if (
        scrollTop >= oneHundredVh &&
        scrollTop <= oneHundredVh * 2
      ) {
        // const progress = Math.min((scrollTop - oneHundredVh) / oneHundredVh, 1);

        // // X logo fade animation - faster fade
        // if (colorGroupRef.current) {
        //   colorGroupRef.current.style.opacity = `${progress}`;
        // }
      }

      // TEDx logo fade animation (2vh to 3vh)
      if (
        scrollTop >= oneHundredVh * 2 &&
        scrollTop <= maxAnimationRange
      ) {

      }

      isAnimating = false;
    };

    const onScroll = () => {
      if (isAnimating) return;

      const scrollTop = scrollContainerRef?.current?.scrollTop || 0;

      // Early exit if we're way past the animation range - but keep listener active
      if (scrollTop > maxAnimationRange + oneHundredVh) {
        return;
      }

      isAnimating = true;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }

      animationId = requestAnimationFrame(updateAnimations);
    };

    // Store current ref for cleanup
    const currentScrollContainer = scrollContainerRef?.current;

    // Add scroll listener to the container - keep it active for scroll-up detection
    if (currentScrollContainer) {
      currentScrollContainer.addEventListener("scroll", onScroll, {
        passive: true,
      });
    }

    return () => {
      if (currentScrollContainer) {
        currentScrollContainer.removeEventListener("scroll", onScroll);
      }
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [scrollContainerRef, isPageLoaded]);

  return (
    <>
      <div ref={containerRef} className="h-[300dvh] w-1vw"></div>
      {/* Loading Screen Layer - Height animated on scroll */}
      <div
        ref={loadingScreenRef}
        className="fixed top-0 left-0 pointer-events-none w-full h-screen z-3 overflow-hidden bg-[linear-gradient(to_bottom,#050505_0%,#050505_75%,#050505a3_90%,transparent_100%)]"
      >
        <SVGGrid opacity={0.3} gridSize={40} strokeWidth={0.4} dotSize={0.8} />

        <div
          ref={loadingScreenInnerRef}
          className="w-full h-screen flex items-center justify-around flex-col"
        >
          <Image
            ref={xLogoRef}
            src="/weird_x.png"
            alt="Tedx Logo"
            width={200}
            height={200}
            className="w-[150px] md:w-[270px]"
            loading="eager"
            style={{
              animation:
                "heartbeat 1.5s ease-in-out infinite, heartbeatGlow 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* Hero Section Image Layer - Hidden behind loading screen initially */}
      {/*<div
        ref={heroImageRef}
        className="fixed top-0 opacity-50 left-0 pointer-events-none w-full h-dvh z-2 bg-[#050505] flex items-center justify-center overflow-hidden"
      >
        <Image
          ref={heroImageInnerRef}
          src="/college-x.png"
          alt="Hero Background"
          width={1920}
          height={1080}
          className="w-dvw h-dvh object-center md:object-[0%_23%] object-cover pointer-events-none transition-transform duration-100 ease-out"
          style={{
            transform: `translate(${parallaxTransform.x}px, ${parallaxTransform.y}px) scale(1.1)`,
          }}
          priority
        />
        <div className="absolute inset-0 md:hidden bg-linear-to-br from-black/70 via-black/20 to-transparent pointer-events-none" />
      </div>*/}

      {/* Hero Section TEDx Logo Layer - Zooms out into view */}
      {/* Hidden h1 for accessibility */}
      <h1 className="sr-only">TEDx VJCET - Ideas Worth Spreading</h1>

      <div
        ref={tedxLogoRef}
        className={`fixed top-0 left-0 pointer-events-none inset-0 w-full h-dvh z-2 items-center justify-center`}

      >
        <svg
          id="scrollSvg"
          width="100%"
          height="100%"
          viewBox="0 0 3000 3000"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute pointer-events-none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="collegePattern"
              patternUnits="userSpaceOnUse"
              width="3000"
              height="3000"
            >
              <image
                href="/college-x.png"
                x="0"
                y="0"
                width="3000" // Match the viewBox width
                height="3000" // Match the viewBox height
                preserveAspectRatio="xMidYMid slice" // This centers and crops the image
                style={{ pointerEvents: 'none' }}
              />
            </pattern>

            <mask id="holeMask">
              <rect width="100%" height="100%" fill="white" />
              <g id="maskPaths" fill="black">
                <path d="M787 1597V1449H732V1399H904V1449H848V1597H787" />
                <path d="M914 1597V1399H1081V1449H974V1475H1081V1521H974V1547H1081V1597H914" />
                <path d="M1092 1597L1092 1399H1192.47C1223.09 1399 1246.49 1409.28 1262.03 1429.57C1278.54 1451.11 1282 1478.51 1282 1497.71C1282 1528.86 1273.67 1553.24 1257.23 1570.17C1239.94 1587.97 1214.1 1597 1180.41 1597H1092ZM1151.91 1547.66H1177.02C1216.24 1547.66 1222.1 1515.82 1222.1 1496.85C1222.1 1451.85 1184.15 1448.34 1172.52 1448.34H1151.91V1547.66Z" />
                <path d="M1290 1521L1332.26 1458.62L1291.6 1399H1334.46L1351.75 1429.92L1369.53 1399H1412.39L1371.74 1458.62L1414 1521L1371.11 1521L1351.75 1488.77L1332.87 1521H1290" />
                <path d="M1534.55 1598.24L1462 1402.75H1481.19L1528.11 1531.2C1530.48 1537.85 1533.28 1545.98 1536.53 1555.6C1539.77 1565.22 1543.49 1576.6 1547.7 1589.72H1543.1C1547.22 1576.42 1550.9 1565.01 1554.14 1555.47C1557.38 1545.94 1560.19 1537.85 1562.55 1531.2L1608.69 1402.75H1627.88L1555.85 1598.24H1534.55Z" />
                <path d="M1695.99 1601.11C1679.26 1601.11 1665.72 1596.13 1655.38 1586.16C1645.13 1576.1 1640 1562.06 1640 1544.04V1534.07H1658.27V1544.04C1658.27 1557.07 1661.64 1567.13 1668.39 1574.22C1675.23 1581.3 1684.43 1584.85 1695.99 1584.85C1707.47 1584.85 1716.63 1581.3 1723.46 1574.22C1730.3 1567.13 1733.72 1557.07 1733.72 1544.04V1403H1751.86V1544.04C1751.86 1562.06 1746.73 1576.1 1736.48 1586.16C1726.22 1596.13 1712.73 1601.11 1695.99 1601.11Z" />
                <path d="M1870.43 1602C1853.43 1602 1838.44 1597.8 1825.48 1589.4C1812.51 1581.01 1802.34 1569.29 1794.98 1554.24C1787.71 1539.2 1784.07 1521.66 1784.07 1501.63C1784.07 1481.51 1787.71 1463.93 1794.98 1448.89C1802.25 1433.76 1812.38 1421.99 1825.34 1413.6C1838.4 1405.2 1853.43 1401 1870.43 1401C1880.94 1401 1890.63 1402.66 1899.48 1405.99C1908.41 1409.31 1916.26 1413.95 1923 1419.89C1929.84 1425.75 1935.4 1432.62 1939.7 1440.49C1944.08 1448.28 1947.06 1456.72 1948.63 1465.81H1930.23C1928.83 1458.9 1926.42 1452.56 1923 1446.79C1919.59 1441.02 1915.29 1435.99 1910.12 1431.7C1904.95 1427.33 1898.99 1423.96 1892.25 1421.6C1885.59 1419.24 1878.31 1418.06 1870.43 1418.06C1857.37 1418.06 1845.67 1421.38 1835.33 1428.03C1825.08 1434.68 1816.98 1444.25 1811.02 1456.76C1805.06 1469.18 1802.08 1484.14 1802.08 1501.63C1802.08 1519.13 1805.06 1534.08 1811.02 1546.5C1816.98 1558.92 1825.08 1568.46 1835.33 1575.1C1845.67 1581.66 1857.37 1584.94 1870.43 1584.94C1878.31 1584.94 1885.59 1583.76 1892.25 1581.4C1898.91 1578.95 1904.82 1575.59 1909.99 1571.3C1915.16 1567.01 1919.46 1561.98 1922.87 1556.21C1926.38 1550.44 1928.87 1544.14 1930.36 1537.32H1948.63C1947.15 1546.33 1944.21 1554.77 1939.83 1562.64C1935.45 1570.42 1929.84 1577.29 1923 1583.24C1916.26 1589.1 1908.46 1593.69 1899.61 1597.01C1890.76 1600.34 1881.03 1602 1870.43 1602Z" />
                <path d="M1980.91 1598.24V1402.75H2100.79V1419.02H1999.05V1490.79H2093.42V1507.06H1999.05V1581.98H2101.57V1598.24L1980.91 1598.24Z" />
                <path d="M2121.23 1420.02V1403.75H2267V1420.02H2203.25V1599.24H2185.11V1420.02H2121.23Z" />
              </g>
            </mask>
          </defs>

          {/* The main black background with holes */}
          <rect width="100%" height="100%" fill="black" mask="url(#holeMask)" />

          {/* The image visible only through the holes */}
          <rect width="100%" height="100%" fill="url(#collegePattern)" mask="url(#holeMask)" />

          {/* The color layer on top. Opacity controlled by scroll */}
          <g id="colorGroup" ref={colorGroupRef} style={{ opacity: 1 }}>
            <g fill="#EB0028">
              <path d="M787 1597V1449H732V1399H904V1449H848V1597H787" />
              <path d="M914 1597V1399H1081V1449H974V1475H1081V1521H974V1547H1081V1597H914" />
              <path d="M1092 1597L1092 1399H1192.47C1223.09 1399 1246.49 1409.28 1262.03 1429.57C1278.54 1451.11 1282 1478.51 1282 1497.71C1282 1528.86 1273.67 1553.24 1257.23 1570.17C1239.94 1587.97 1214.1 1597 1180.41 1597H1092ZM1151.91 1547.66H1177.02C1216.24 1547.66 1222.1 1515.82 1222.1 1496.85C1222.1 1451.85 1184.15 1448.34 1172.52 1448.34H1151.91V1547.66Z" />
              <path d="M1290 1521L1332.26 1458.62L1291.6 1399H1334.46L1351.75 1429.92L1369.53 1399H1412.39L1371.74 1458.62L1414 1521L1371.11 1521L1351.75 1488.77L1332.87 1521H1290" />
            </g>
            <g fill="white">
              <path d="M1534.55 1598.24L1462 1402.75H1481.19L1528.11 1531.2C1530.48 1537.85 1533.28 1545.98 1536.53 1555.6C1539.77 1565.22 1543.49 1576.6 1547.7 1589.72H1543.1C1547.22 1576.42 1550.9 1565.01 1554.14 1555.47C1557.38 1545.94 1560.19 1537.85 1562.55 1531.2L1608.69 1402.75H1627.88L1555.85 1598.24H1534.55Z" />
              <path d="M1695.99 1601.11C1679.26 1601.11 1665.72 1596.13 1655.38 1586.16C1645.13 1576.1 1640 1562.06 1640 1544.04V1534.07H1658.27V1544.04C1658.27 1557.07 1661.64 1567.13 1668.39 1574.22C1675.23 1581.3 1684.43 1584.85 1695.99 1584.85C1707.47 1584.85 1716.63 1581.3 1723.46 1574.22C1730.3 1567.13 1733.72 1557.07 1733.72 1544.04V1403H1751.86V1544.04C1751.86 1562.06 1746.73 1576.1 1736.48 1586.16C1726.22 1596.13 1712.73 1601.11 1695.99 1601.11Z" />
              <path d="M1870.43 1602C1853.43 1602 1838.44 1597.8 1825.48 1589.4C1812.51 1581.01 1802.34 1569.29 1794.98 1554.24C1787.71 1539.2 1784.07 1521.66 1784.07 1501.63C1784.07 1481.51 1787.71 1463.93 1794.98 1448.89C1802.25 1433.76 1812.38 1421.99 1825.34 1413.6C1838.4 1405.2 1853.43 1401 1870.43 1401C1880.94 1401 1890.63 1402.66 1899.48 1405.99C1908.41 1409.31 1916.26 1413.95 1923 1419.89C1929.84 1425.75 1935.4 1432.62 1939.7 1440.49C1944.08 1448.28 1947.06 1456.72 1948.63 1465.81H1930.23C1928.83 1458.9 1926.42 1452.56 1923 1446.79C1919.59 1441.02 1915.29 1435.99 1910.12 1431.7C1904.95 1427.33 1898.99 1423.96 1892.25 1421.6C1885.59 1419.24 1878.31 1418.06 1870.43 1418.06C1857.37 1418.06 1845.67 1421.38 1835.33 1428.03C1825.08 1434.68 1816.98 1444.25 1811.02 1456.76C1805.06 1469.18 1802.08 1484.14 1802.08 1501.63C1802.08 1519.13 1805.06 1534.08 1811.02 1546.5C1816.98 1558.92 1825.08 1568.46 1835.33 1575.1C1845.67 1581.66 1857.37 1584.94 1870.43 1584.94C1878.31 1584.94 1885.59 1583.76 1892.25 1581.4C1898.91 1578.95 1904.82 1575.59 1909.99 1571.3C1915.16 1567.01 1919.46 1561.98 1922.87 1556.21C1926.38 1550.44 1928.87 1544.14 1930.36 1537.32H1948.63C1947.15 1546.33 1944.21 1554.77 1939.83 1562.64C1935.45 1570.42 1929.84 1577.29 1923 1583.24C1916.26 1589.1 1908.46 1593.69 1899.61 1597.01C1890.76 1600.34 1881.03 1602 1870.43 1602Z" />
              <path d="M1980.91 1598.24V1402.75H2100.79V1419.02H1999.05V1490.79H2093.42V1507.06H1999.05V1581.98H2101.57V1598.24L1980.91 1598.24Z" />
              <path d="M2121.23 1420.02V1403.75H2267V1420.02H2203.25V1599.24H2185.11V1420.02H2121.23Z" />
            </g>
          </g>
        </svg>
      </div>

      <style jsx>{`
        @keyframes heartbeat {
          0% {
            transform: scale(1);
          }
          14% {
            transform: scale(1.1);
          }
          28% {
            transform: scale(1);
          }
          42% {
            transform: scale(1.1);
          }
          70% {
            transform: scale(1);
          }
        }

        @keyframes heartbeatGlow {
          0% {
            filter: drop-shadow(0 0 15px rgba(238, 41, 34, 0.6));
          }
          14% {
            filter: drop-shadow(0 0 40px rgba(238, 41, 34, 1))
              drop-shadow(0 0 60px rgba(238, 41, 34, 0.8));
          }
          28% {
            filter: drop-shadow(0 0 15px rgba(238, 41, 34, 0.6));
          }
          42% {
            filter: drop-shadow(0 0 40px rgba(238, 41, 34, 1))
              drop-shadow(0 0 60px rgba(238, 41, 34, 0.8));
          }
          70% {
            filter: drop-shadow(0 0 15px rgba(238, 41, 34, 0.6));
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};
