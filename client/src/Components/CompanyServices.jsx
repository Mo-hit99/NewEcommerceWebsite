import React from "react";
const companyServices = [
  {
    id: 1,
    title: "Free delivery",
    description:
      "Prototype ideas online, without depending on your local environment.",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Quality guarantee",
    description:
      "Deliver high-quality, engaging blogs, articles, and video tutorials to your audience.",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={22}
        height={22}
        viewBox="0 0 256 256"
        xmlSpace="preserve"
      >
        <defs />
        <g
          style={{
            stroke: "none",
            strokeWidth: 0,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fill: "none",
            fillRule: "nonzero",
            opacity: 1,
          }}
          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
        >
          <path
            d="M 89.328 2.625 L 89.328 2.625 c -1.701 -2.859 -5.728 -3.151 -7.824 -0.568 L 46.532 45.173 c -0.856 1.055 -2.483 0.997 -3.262 -0.115 l -8.382 -11.97 c -2.852 -4.073 -8.789 -4.335 -11.989 -0.531 l 0 0 c -2.207 2.624 -2.374 6.403 -0.408 9.211 l 17.157 24.502 c 2.088 2.982 6.507 2.977 8.588 -0.011 l 4.925 -7.07 L 89.135 7.813 C 90.214 6.272 90.289 4.242 89.328 2.625 z"
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              fill: "rgb(0,0,0)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 6.072 0 11.967 1.19 17.518 3.538 c 2.034 0.861 2.986 3.208 2.125 5.242 c -0.859 2.035 -3.207 2.987 -5.242 2.126 C 54.842 8.978 49.996 8 45 8 C 24.598 8 8 24.598 8 45 c 0 20.402 16.598 37 37 37 c 20.402 0 37 -16.598 37 -37 c 0 -3.248 -0.42 -6.469 -1.249 -9.573 c -0.57 -2.134 0.698 -4.327 2.832 -4.897 c 2.133 -0.571 4.326 0.698 4.896 2.833 C 89.488 37.14 90 41.055 90 45 C 90 69.813 69.813 90 45 90 z"
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              fill: "rgb(0,0,0)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
        </g>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Daily offers",
    description:
      "Easily create and share coding assignments and projects with your students.",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={40}
        height={35}
        viewBox="0 0 256 256"
        xmlSpace="preserve"
        className="-mt-1"
      >
        <defs />
        <g
          style={{
            stroke: "none",
            strokeWidth: 0,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fill: "none",
            fillRule: "nonzero",
            opacity: 1,
          }}
          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
        >
          <path
            d="M 50.023 44.125 c -3.764 0 -6.825 -3.062 -6.825 -6.825 c 0 -3.764 3.062 -6.825 6.825 -6.825 s 6.825 3.062 6.825 6.825 C 56.849 41.063 53.787 44.125 50.023 44.125 z M 50.023 34.475 c -1.558 0 -2.825 1.268 -2.825 2.825 s 1.268 2.825 2.825 2.825 s 2.825 -1.267 2.825 -2.825 S 51.581 34.475 50.023 34.475 z"
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              fill: "rgb(0,0,0)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 48.656 59.525 c -0.482 0 -0.966 -0.174 -1.35 -0.525 c -0.814 -0.746 -0.87 -2.011 -0.124 -2.825 l 22.94 -25.05 c 0.746 -0.814 2.01 -0.871 2.825 -0.125 c 0.814 0.746 0.87 2.011 0.124 2.826 l -22.94 25.05 C 49.737 59.307 49.198 59.525 48.656 59.525 z"
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              fill: "rgb(0,0,0)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 69.528 59.525 c -3.764 0 -6.825 -3.062 -6.825 -6.825 s 3.062 -6.825 6.825 -6.825 s 6.825 3.062 6.825 6.825 S 73.292 59.525 69.528 59.525 z M 69.528 49.875 c -1.558 0 -2.825 1.268 -2.825 2.825 s 1.268 2.825 2.825 2.825 s 2.825 -1.268 2.825 -2.825 S 71.086 49.875 69.528 49.875 z"
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              fill: "rgb(0,0,0)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 59.775 75.225 c -13.186 0 -24.751 -8.432 -28.778 -20.981 c -0.337 -1.052 0.241 -2.178 1.293 -2.516 c 1.052 -0.339 2.178 0.241 2.516 1.293 c 3.495 10.889 13.529 18.204 24.97 18.204 C 74.235 71.225 86 59.46 86 45 S 74.235 18.776 59.775 18.776 c -11.44 0 -21.475 7.315 -24.97 18.203 c -0.338 1.051 -1.462 1.631 -2.516 1.293 c -1.052 -0.337 -1.63 -1.464 -1.293 -2.516 c 4.027 -12.549 15.593 -20.98 28.778 -20.98 C 76.441 14.776 90 28.334 90 45 C 90 61.666 76.441 75.225 59.775 75.225 z"
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              fill: "rgb(0,0,0)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 32.901 47 H 2 c -1.104 0 -2 -0.896 -2 -2 s 0.896 -2 2 -2 h 30.901 c 1.104 0 2 0.896 2 2 S 34.006 47 32.901 47 z"
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              fill: "rgb(0,0,0)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 23.664 35.71 H 10.211 c -1.104 0 -2 -0.896 -2 -2 s 0.896 -2 2 -2 h 13.453 c 1.104 0 2 0.896 2 2 S 24.769 35.71 23.664 35.71 z"
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              fill: "rgb(0,0,0)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 23.664 58.29 H 10.211 c -1.104 0 -2 -0.896 -2 -2 s 0.896 -2 2 -2 h 13.453 c 1.104 0 2 0.896 2 2 S 24.769 58.29 23.664 58.29 z"
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              fill: "rgb(0,0,0)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 28.796 24.42 h -8.322 c -1.104 0 -2 -0.896 -2 -2 s 0.896 -2 2 -2 h 8.322 c 1.104 0 2 0.896 2 2 S 29.9 24.42 28.796 24.42 z"
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              fill: "rgb(0,0,0)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 28.796 69.579 h -8.322 c -1.104 0 -2 -0.896 -2 -2 s 0.896 -2 2 -2 h 8.322 c 1.104 0 2 0.896 2 2 S 29.9 69.579 28.796 69.579 z"
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              fill: "rgb(0,0,0)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
        </g>
      </svg>
    ),
  },
  {
    id: 4,
    title: "100% secure payment",
    description:
      "For issue reproduction while letting your users try your work without installing it.",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={26}
        height={26}
        viewBox="0 0 256 256"
        xmlSpace="preserve"
      >
        <defs />
        <g
          style={{
            stroke: "none",
            strokeWidth: 0,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fill: "none",
            fillRule: "nonzero",
            opacity: 1,
          }}
          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
        >
          <path
            d="M 45 89.997 c -1.05 0 -2.101 -0.166 -3.101 -0.498 C 22.355 83.009 9.727 67.421 9.727 49.788 V 19.479 c 0 -3.604 2.568 -6.687 6.106 -7.331 l 0 0 c 9.65 -1.755 17.704 -5.22 24.621 -10.591 c 2.676 -2.08 6.415 -2.08 9.093 0 c 6.915 5.371 14.969 8.835 24.62 10.59 c 3.538 0.644 6.106 3.727 6.106 7.331 v 30.309 c 0 17.633 -12.629 33.221 -32.173 39.711 C 47.101 89.831 46.051 89.997 45 89.997 z M 17.727 19.934 v 29.854 c 0 14.126 10.478 26.733 26.694 32.119 c 0.373 0.123 0.785 0.123 1.158 0 c 16.216 -5.386 26.694 -17.993 26.694 -32.119 V 19.934 C 61.833 17.969 52.663 14.007 45 8.153 C 37.336 14.008 28.166 17.969 17.727 19.934 z M 17.265 20.019 c 0 0 0.001 0 0.001 0 C 17.266 20.019 17.266 20.019 17.265 20.019 L 17.265 20.019 z"
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              fill: "rgb(0,0,0)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            transform="matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 40.651 60.034 L 40.651 60.034 c -1.226 0 -2.383 -0.562 -3.142 -1.524 l -8.697 -11.034 c -1.367 -1.734 -1.069 -4.25 0.666 -5.617 c 1.733 -1.368 4.25 -1.07 5.618 0.666 l 5.555 7.048 L 54.904 31.49 c 1.367 -1.733 3.881 -2.033 5.618 -0.666 c 1.734 1.368 2.032 3.883 0.665 5.618 L 43.793 58.511 C 43.034 59.473 41.876 60.034 40.651 60.034 z"
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              fill: "rgb(0,0,0)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
        </g>
      </svg>
    ),
  },
];
export default function CompanyServices() {
  return (
    <div className="w-full bg-white">
      <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row p-2 mb-10">
        {companyServices.map((services) => (
          <div
            key={services.id}
            className="flex rounded-xl my-2 p-4 mr-4 shadow-sm w-full sm:w-auto md:w-auto lg:w-auto border"
          >
            <span className="inline-block rounded-lg p-3">
              <div className="inline-flex align-middle justify-center items-center select-none text-black">
                {services.svg}
              </div>
            </span>
            <div>
              <h2 className="mt-2 font-semibold text-base sm:text-lg text-black">
                {services.title}
              </h2>
              <p className="sm:mt-1 block text-sm sm:text-base text-gray-600">
                {services.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
