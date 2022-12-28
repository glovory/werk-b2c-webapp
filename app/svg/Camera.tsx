export default function Camera(props: any){
  const style: any = {
    strokeWidth: 0,
    strokeLinecap: "butt",
    strokeLinejoin: "miter",
    fill: "#1234ff",
    vectorEffect: "non-scaling-stroke",
  };
  return (
    <svg
      width={24}
      height={24}
      {...props}
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        {...style}
        fill="none"
        d="M0 0h24v24H0V0Z"
      />
      <path
        {...style}
        fill="#000"
        d="M20 7h-4.05l-1.83-2H9.88L8.05 7H4v12h16V7Z"
      />
      <path
        {...style}
        fill="#000"
        d="M12 18c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Z"
      />
      <path
        {...style}
        fill="#fff"
        d="M4 21h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2Z"
      />
      <path
        {...style}
        d="M4 7h4.05l1.83-2h4.24l1.83 2H20v12H4V7Z"
      />
      <path
        {...style}
        fill="#fff"
        d="M12 8c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5Z"
      />
      <path
        {...style}
        d="M12 16c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3Z"
      />
    </svg>
  );
}
