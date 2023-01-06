export default function Move(props: any){
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      preserveAspectRatio="none"
      viewBox="0 0 12 12"
      width={12}
      height={12}
      {...props}
    >
      <path
        d="m11.956 5.915-1.914-1.51a.108.108 0 0 0-.152.02.113.113 0 0 0-.024.067v.968H6.54V2.13h.973c.089 0 .14-.105.084-.176L6.085.042a.105.105 0 0 0-.15-.019.071.071 0 0 0-.019.02L4.405 1.956a.108.108 0 0 0 .086.175h.968V5.46H2.13v-.972a.109.109 0 0 0-.175-.085L.042 5.915a.105.105 0 0 0-.019.15.071.071 0 0 0 .02.018l1.911 1.512c.07.056.176.007.176-.085v-.97h3.33v3.33h-.973a.109.109 0 0 0-.085.176l1.512 1.912a.105.105 0 0 0 .168 0l1.512-1.912a.108.108 0 0 0-.085-.176h-.967V6.54H9.87v.973c0 .089.105.14.176.084l1.911-1.511a.111.111 0 0 0 .02-.155l-.022-.016Z"
        fill="currentColor"
        strokeWidth={0}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
