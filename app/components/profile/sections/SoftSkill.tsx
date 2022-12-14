
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import LightbulbTwoToneIcon from '@mui/icons-material/LightbulbTwoTone';
import AddIcon from '@mui/icons-material/Add';

interface SoftSkillProps {
  editable?: boolean,
  // list: Array<any>,
  // onSave?: (val: any) => void
  // onDelete?: (val: any, closeConfirm: any, closeModal: any) => void
}

export default function SoftSkill({
  editable,
  // list,
}: SoftSkillProps){
  return (
    <Card variant="outlined" className="max-md:rounded-none w-card">
      <CardHeader
        className="py-3 border-bottom"
        avatar={<LightbulbTwoToneIcon />}
        title="Soft Skill"
        titleTypographyProps={{ className: "text-lg font-medium" }}
        // action={editable && !!list?.length && (
        //   <Button onClick={onOpenModal} color="primary" className="min-w-0 font-bold">
        //     <EditTwoToneIcon fontSize="small" className={isMediaQuery ? "" : "mr-2"} />
        //     {!isMediaQuery && 'Edit Hard Skill'}
        //   </Button>
        // )}
      />

      <div className="py-6 px-4">
        {editable && (
          <div className="grid place-items-center gap-4 text-gray-400 text-sm">
            <p className="rounded-full bg-gray-100 w-20 h-20 grid place-items-center mx-auto">
              <LightbulbTwoToneIcon sx={{ fontSize: 36 }} color="disabled" />
            </p>
            <p className="mb-4">Tell the company about your soft skill.</p>
            <Button variant="outlined" size="large" className="min-w-40p max-md:min-w-full">
              <AddIcon fontSize="small" className="mr-2" />Add Soft Skill
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
