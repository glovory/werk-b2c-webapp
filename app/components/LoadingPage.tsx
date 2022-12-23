import CircularProgress from '@mui/material/CircularProgress';
import CodeTwoToneIcon from '@mui/icons-material/CodeTwoTone';

export default function LoadingPage(){
  return (
    <div className="grid place-items-center min-h-screen">
      <div data-nosnippet="true" id="loader" className="relative">
        <img src="/image/logo/werk-logo-symbol.svg" alt="Werk" className="absolute inset-0 m-auto" />
        <CircularProgress size={60} />
      </div>

      <noscript data-nosnippet="true" className="text-center">
        <style
          dangerouslySetInnerHTML={{
            __html: `#loader{display:none}`
          }}
        />
        <CodeTwoToneIcon className="block mx-auto" />
        Please enable JavaScript
      </noscript>
    </div>
  );
}
