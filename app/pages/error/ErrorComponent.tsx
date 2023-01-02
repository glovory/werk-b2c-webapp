import { useTranslate } from "@pankod/refine-core";
import { Link } from "@remix-run/react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
//
import { Cx } from '~/utils/dom';
import FooterMain from '~/components/FooterMain';

interface ErrorComponentProps {
  className?: string
  code?: number | string
  title?: string
  description?: string
  footer?: boolean
}

const ErrorComponent = ({
  className = "min-h-screen",
  code = 404,
  title = "Not Found",
  description = "Very commonplace on the web. The URL is not recognized;\nthe resource does not exist.",
  footer = true,
}: ErrorComponentProps) => {
  const translate = useTranslate();

  return (
    <div className={Cx("flex flex-col", className)}>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexGrow={1}
        p={2}
      >
        <Grid
          container
          direction="column"
          display="flex"
          alignItems="center"
          textAlign="center"
        >
          <img
            src="/image/misc/illustration_error.png"
            alt="Error"
            width={240}
            height={250}
          />

          <Typography
            variant="h1"
            sx={{ color: '#a0b2ff', fontSize: 100, fontWeight: 700, mt: 3 }}
          >
            {code}
          </Typography>

          <h4 className="font-semibold">
            {title}
          </h4>

          <Typography sx={{ maxWidth: 420, mb: 4 }}>
            {translate(`pages.error.${code}`, description)}
          </Typography>

          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
            className="px-7 font-semibold hover:text-white"
          >
            {translate("pages.error.backHome", "Go to Werk")}
          </Button>
        </Grid>
      </Grid>

      {footer && <FooterMain />}
    </div>
  );
}

export default ErrorComponent;
