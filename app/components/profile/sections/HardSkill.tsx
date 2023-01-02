
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import ConstructionTwoToneIcon from '@mui/icons-material/ConstructionTwoTone';
import AddIcon from '@mui/icons-material/Add';

interface HardSkillProps {
  isLoggedInUser?: boolean,
  // list: Array<any>,
  // onSave?: (val: any) => void
  // onDelete?: (val: any, closeConfirm: any, closeModal: any) => void
}

export default function HardSkill({
  isLoggedInUser,
  // list,
}: HardSkillProps){
  return (
    <Card variant="outlined" className="max-md:rounded-none w-card">
      <CardHeader
        className="py-3 border-bottom"
        avatar={<ConstructionTwoToneIcon />}
        title="Hard Skill"
        titleTypographyProps={{
          className: "text-lg font-medium",
        }}
        // action={
        //   isLoggedInUser && <Switch defaultChecked />
        // }
      />

      <div className="py-6 px-4">
        {isLoggedInUser && (
          <div className="grid place-items-center gap-4 text-gray-400 text-sm">
            <p className="rounded-full bg-gray-100 w-20 h-20 grid place-items-center mx-auto">
              <ConstructionTwoToneIcon sx={{ fontSize: 36 }} color="disabled" />
            </p>
            <p className="mb-4">Tell the company about your hard skill.</p>
            <Button variant="outlined" size="large" className="min-w-40p max-md:min-w-60p">
              <AddIcon fontSize="small" className="mr-2" />Add Hard Skill
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
