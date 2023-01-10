import CircularProgress from '@mui/material/CircularProgress';
import CodeTwoToneIcon from '@mui/icons-material/CodeTwoTone';
import WerkLogo from '~/svg/werk';

interface LoadingPageProps {
  noscript?: boolean
}

/**
 * React Component for Loading Page
 * @props noscript = boolean (Default = true)
 * @returns React Component
 */
export default function LoadingPage({
  noscript = true,
}: LoadingPageProps){
  return (
    <div
      data-nosnippet="true"
      aria-hidden="true"
      tabIndex={-1}
      className="grid place-items-center min-h-screen"
    >
      <div className="relative hideSSR">
        <WerkLogo width={28} height={28} className="absolute inset-0 m-auto" focusable="false" />
        <CircularProgress size={60} />
      </div>

      {noscript && (
        <noscript>
          <CodeTwoToneIcon className="block mx-auto" />
          Please enable JavaScript
        </noscript>
      )}
    </div>
  );
}
