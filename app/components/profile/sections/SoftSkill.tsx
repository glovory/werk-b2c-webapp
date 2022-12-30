
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import LightbulbTwoToneIcon from '@mui/icons-material/LightbulbTwoTone';
import AddIcon from '@mui/icons-material/Add';

export default function SoftSkill(){
  return (
    <Card variant="outlined" className="max-md:rounded-none">
      <CardHeader
        avatar={<LightbulbTwoToneIcon />}
        title="Soft Skill"
        titleTypographyProps={{
          className: "text-lg font-medium",
        }}
        // action={
        //   <Switch defaultChecked />
        // }
        className="border-bottom"
      />

      <div className="py-6 px-4">
        <div className="grid place-items-center gap-4 text-gray-400 text-sm">
          <p className="rounded-full bg-gray-100 w-20 h-20 grid place-items-center mx-auto">
            <LightbulbTwoToneIcon sx={{ fontSize: 36 }} color="disabled" />
          </p>
          <p className="mb-4">Tell the company about your soft skill.</p>
          <Button variant="outlined" size="large" className="min-w-50p">
            <AddIcon fontSize="small" className="mr-2" />Add Soft Skill
          </Button>
        </div>
      </div>
    </Card>
  );
}