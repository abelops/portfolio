import React, { useEffect, useState } from "react";
import { TweenMax, Power3 } from "gsap";

const CircularProgress = ({progress}) => {
    console.log(progress/100)
//   const [percent, setPercent] = useState(0.567);
    const percent = (progress/100) - 0.001

  useEffect(() => {
    const speed = 10;
    startCircularProgress(percent, speed);
  }, [percent]);

  const startCircularProgress = (percentage, speed) => {
    TweenMax.to({ percent }, speed, {
      percent: percentage,
      ease: Power3.easeOut,
      onUpdate: () => {
        drawProgress(percent);
      }
    });
  };

  const clamp = (n, min, max) => {
    return Math.max(min, Math.min(max, n));
  };

  const drawProgress = (percent) => {
    if (isNaN(percent)) {
      return;
    }
    percent = clamp(parseFloat(percent), 0, 1);
    const angle = clamp(percent * 360, 0, 359.99999);
    const paddedRadius = 49 + 1;
    const radians = (angle * Math.PI) / 180;
    const x = Math.sin(radians) * paddedRadius;
    const y = Math.cos(radians) * -paddedRadius;
    const mid = angle > 180 ? 1 : 0;
    const pathData = `M 0 0 v -${paddedRadius} A ${paddedRadius} ${paddedRadius} 1 ${mid} 1 ${x} ${y} z`;

    const bar = document.getElementsByClassName("progress-radial-bar")[0];
    bar.setAttribute("d", pathData);
  };

  return (
    <div id="dashed-circle-progress">
      <div>
        <svg
          className="progress-radial"
          width="400px"
          height="400px"
          viewBox="0 0 120 120"
          shape-rendering="geometricPrecision"
        >
          <defs>
            <mask
              id="circle_mask"
              x="0"
              y="0"
              width="100"
              height="100"
              maskUnits="userSpaceOnUse"
            >
              <circle
                cx="50"
                cy="50"
                r="51"
                stroke-width="0"
                fill="black"
                opacity="1"
              />
              <circle
                id="bar"
                r="50"
                cx="50"
                cy="50"
                fill="transparent"
                stroke-dasharray="1"
                stroke-dashoffset="1000"
                stroke="white"
                stroke-width="9"
              ></circle>
              <circle
                className="progress-radial-mask-inner"
                cx="50"
                cy="50"
                r="40"
                stroke-width="0"
                fill="black"
                opacity="1"
              />
            </mask>
          </defs>
          <g mask="url(#circle_mask)">
            <circle
              className="progress-radial-track"
              cx="50"
              cy="50"
              r="50"
              opacity="1"
              fill="#323333"
            />
            <path
              className="progress-radial-bar"
              transform="translate(50, 50)"
              d="M 0 0"
              fill="#8fb3b3"
            ></path>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default CircularProgress;
