"use client";
import Image from "next/image";
import useDraw from "@/hooks/useDraw";
import { FC } from "react";
import { ChromePicker } from "react-color";
import { useState, useEffect } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [color, setColor] = useState<string>("#000");
  const [isColorOpen, setIsColorOpen] = useState<boolean>(false);
  const { canvasRef, onMouseDown } = useDraw(drawLine);

  function drawLine({ ctx, prevPoint, currentPoint }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = color;
    const lineWidth = 5;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill;
  }

  useEffect(() => {}, [isColorOpen]);

  return (
    <>
      <div className="absolute top-0 left-[50%] ">
        <div className="flex flex-row">
          <svg
            className="cursor-pointer"
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.53033 3.46967C7.82322 3.76256 7.82322 4.23744 7.53033 4.53033L5.81066 6.25H15C18.1756 6.25 20.75 8.82436 20.75 12C20.75 15.1756 18.1756 17.75 15 17.75H8.00001C7.58579 17.75 7.25001 17.4142 7.25001 17C7.25001 16.5858 7.58579 16.25 8.00001 16.25H15C17.3472 16.25 19.25 14.3472 19.25 12C19.25 9.65279 17.3472 7.75 15 7.75H5.81066L7.53033 9.46967C7.82322 9.76256 7.82322 10.2374 7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L3.46967 7.53033C3.17678 7.23744 3.17678 6.76256 3.46967 6.46967L6.46967 3.46967C6.76256 3.17678 7.23744 3.17678 7.53033 3.46967Z"
              fill="#FFFF"
            />
          </svg>
          <svg
            className="cursor-pointer"
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 7H9.00001C6.23858 7 4 9.23857 4 12C4 14.7614 6.23858 17 9 17H16M20 7L17 4M20 7L17 10"
              stroke="#FFFF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="z-10 ">
        <div className="bg-inherit absolute h-full text-white p-2">
          <div className="flex flex-row ">
            <svg
              onClick={() => setIsColorOpen(!isColorOpen)}
              className="text-white mr-2 cursor-pointer"
              width="50px"
              height="50px"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="m18.8676 12.4803c.7724-.8739 1.178-2.0113 1.1325-3.17608v-.19011c-.1647-1.82396-.8275-3.56779-1.9162-5.04148-1.0886-1.4737-2.5614-2.62071-4.2579-3.316073-1.6964-.6953597-3.5514-.912385-5.36283-.627428-1.81142.284957-3.50979 1.060961-4.91004 2.243461-1.40025 1.18251-2.44867 2.72614-3.031007 4.4627-.5823405 1.73656-.676266 3.59941-.271543 5.38561.404724 1.7862 1.29257 3.4272 2.5668 4.7442 1.27422 1.317 2.88595 2.2595 4.65955 2.7247 1.32188.2384 2.66457.3423 4.00737.3102h1.1522c.3758 0 .7345-.1949.9859-.4739.2515-.2791.3866-.6436.3777-1.0188 0-.3981-.1584-.7798-.4402-1.0613-.2818-.2814-.6613-.4387-1.0598-.4387-.3986 0-.7947-.1671-1.0765-.4485-.2819-.2815-.4402-.6632-.4402-1.0612 0-.3981.1583-.7798.4402-1.0613.2818-.2814.664-.4396 1.0626-.4396h3.3662c1.1629-.0994 2.2427-.6425 3.0152-1.5164zm-6.8675-8.98032c0 .82843-.6716 1.5-1.5 1.5-.82845 0-1.50003-.67157-1.50003-1.5s.67158-1.5 1.50003-1.5c.8284 0 1.5.67157 1.5 1.5zm-6.50003 3.5c.82843 0 1.5-.67157 1.5-1.5s-.67157-1.5-1.5-1.5c-.82842 0-1.5.67157-1.5 1.5s.67158 1.5 1.5 1.5zm-1 5.00002c.82843 0 1.5-.6716 1.5-1.5 0-.82845-.67157-1.50002-1.5-1.50002-.82842 0-1.5.67157-1.5 1.50002 0 .8284.67158 1.5 1.5 1.5zm10.00003-4.00002c.8284 0 1.5-.67157 1.5-1.5s-.6716-1.5-1.5-1.5c-.8285 0-1.5.67157-1.5 1.5s.6715 1.5 1.5 1.5z"
                fill="#FFFFFF"
              />
            </svg>
            <ChromePicker
              className={`${isColorOpen ? "block" : "hidden"}`}
              color={color}
              onChange={(e) => setColor(e.hex)}
            />
          </div>
          <svg
            className="mt-5 cursor-pointer"
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.0302 22H13.9902C13.5702 22 13.2402 21.66 13.2402 21.25C13.2402 20.84 13.5802 20.5 13.9902 20.5H21.0302C21.4502 20.5 21.7802 20.84 21.7802 21.25C21.7802 21.66 21.4502 22 21.0302 22Z"
              fill="#FFFFFF"
            />
            <path
              d="M13.64 16.6894C14.03 17.0794 14.03 17.7094 13.64 18.1094L10.66 21.0894C9.55 22.1994 7.77 22.2594 6.59 21.2694C6.52 21.2094 6.46 21.1494 6.4 21.0894L5.53 20.2194L3.74 18.4294L2.88 17.5694C2.81 17.4994 2.75 17.4294 2.69 17.3594C1.71 16.1794 1.78 14.4194 2.88 13.3194L5.86 10.3394C6.25 9.94938 6.88 9.94938 7.27 10.3394L13.64 16.6894Z"
              fill="#FFFFFF"
            />
            <path
              d="M21.1194 10.6414L16.1194 15.6414C15.7294 16.0314 15.0994 16.0314 14.7094 15.6414L8.33937 9.29141C7.94938 8.90141 7.94938 8.27141 8.33937 7.87141L13.3394 2.88141C14.5094 1.71141 16.4294 1.71141 17.5994 2.88141L21.1194 6.39141C22.2894 7.56141 22.2894 9.47141 21.1194 10.6414Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </div>
      <div className="w-screen h-screen flex justify-center items-center bg-slate-900">
        <canvas
          width={"1700"}
          height={"900"}
          onMouseDown={onMouseDown}
          ref={canvasRef}
          className="border border-black rounded-md cursor- bg-white min-w-[200px] min-h-[400px]"
        />
      </div>
    </>
  );
};

export default page;
