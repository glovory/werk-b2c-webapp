import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
//
import { Cx } from '~/utils/dom';

export const CardUser = () => {
  return (
    <Card variant="outlined" className="max-md:rounded-none cursor-progress">
      <Skeleton className="bg-gray-300" variant="rectangular" height={180} width="100%" />
      <CardContent className="flex flex-col max-md:items-center">
        <Skeleton
          className="bg-gray-300"
          animation="wave"
          variant="circular"
          width={140}
          height={140}
          sx={{
            border: '10px solid #fff',
            marginTop: '-80px',
          }}
        />
        <Skeleton className="bg-gray-200 mt-2" width="35%" />
        <Skeleton className="bg-gray-200 my-1" width="15%" />
        <Skeleton className="bg-gray-200" width="40%" />
        <Skeleton className="bg-gray-200 mt-2" width="90%" />
        <Skeleton className="bg-gray-200 mb-2" width="70%" />
        <Skeleton className="bg-gray-200" width="30%" />
      </CardContent>
    </Card>
  );
}

interface CardSectionProps {
  contentSize: number | string
  headerClass?: any
}

export const CardSection = ({
  contentSize,
  headerClass,
}: CardSectionProps) => {
  return (
    <Card variant="outlined" className="max-md:rounded-none cursor-progress">
      <CardHeader
        className={Cx("border-bottom", headerClass)}
        title={<Skeleton className="bg-gray-200" width="30%" />}
      />
      <CardContent>
        <Skeleton className="bg-gray-200" variant="rectangular" height={contentSize} width="100%" />
      </CardContent>
    </Card>
  );
}
